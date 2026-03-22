const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8100";

export function trackAccommodationClick(accommodationId: string): void {
  fetch(`${API_BASE_URL}/api/v1/clicks/accommodations/${accommodationId}`, {
    method: "POST",
  }).catch(() => {});
}

export function trackExperienceClick(experienceId: string): void {
  fetch(`${API_BASE_URL}/api/v1/clicks/experiences/${experienceId}`, {
    method: "POST",
  }).catch(() => {});
}
