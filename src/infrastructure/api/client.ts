const API_BASE_URL = process.env.API_URL ?? "http://localhost:8100";

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
  const url = new URL(path, API_BASE_URL);
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

  const fetchOptions: RequestInit = revalidate === false
    ? { cache: "no-store" }
    : { next: { revalidate } };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new ApiError(res.status, res.statusText, url);
  }

  return res.json() as Promise<T>;
}
