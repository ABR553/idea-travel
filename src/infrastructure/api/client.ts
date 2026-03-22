const API_URL_FALLBACK = "http://localhost:8100";

// Bracket notation prevents Next.js webpack DefinePlugin from inlining
// the value at build time, ensuring it reads the real env var at runtime
function getApiBaseUrl(): string {
  return process.env['API_URL'] || API_URL_FALLBACK;
}

interface FetchOptions {
  locale?: string;
  params?: Record<string, string | number | boolean | undefined>;
  revalidate?: number | false;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly url: string
  ) {
    super(`API error: ${status} ${statusText} - ${url}`);
    this.name = "ApiError";
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }
}

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(path, getApiBaseUrl());
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { locale, params, revalidate = 3600 } = options;

  const queryParams = { ...params };
  if (locale) {
    queryParams.locale = locale;
  }

  const url = buildUrl(`/api/v1${path}`, queryParams);

  console.log(`[API] Fetching: ${url} (API_URL=${getApiBaseUrl()})`);

  const fetchOptions: RequestInit = revalidate === false
    ? { cache: "no-store" }
    : { next: { revalidate } };

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      console.error(`[API] Error ${res.status} ${res.statusText}: ${url}`);
      throw new ApiError(res.status, res.statusText, url);
    }

    const data = await res.json() as T;
    console.log(`[API] Success: ${url}`, JSON.stringify(data).slice(0, 500));
    return data;
  } catch (error) {
    console.error(`[API] Fetch failed: ${url}`, error instanceof Error ? error.message : error);
    throw error;
  }
}
