const API_URL_FALLBACK = "http://localhost:8100";

// Bracket notation prevents Next.js webpack DefinePlugin from inlining
// the value at build time, ensuring it reads the real env var at runtime
function getApiBaseUrl(): string {
  return process.env['NEXT_PUBLIC_API_URL'] || API_URL_FALLBACK;
}

export function trackAccommodationClick(accommodationId: string): void {
  fetch(`${getApiBaseUrl()}/api/v1/clicks/accommodations/${accommodationId}`, {
    method: "POST",
  }).catch(() => {});
}

export function trackExperienceClick(experienceId: string): void {
  fetch(`${getApiBaseUrl()}/api/v1/clicks/experiences/${experienceId}`, {
    method: "POST",
  }).catch(() => {});
}
