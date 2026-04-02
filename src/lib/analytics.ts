/**
 * Google Analytics 4 - utilidades de tracking.
 * Solo envia eventos si el usuario ha aceptado cookies de analytics.
 */

const CONSENT_KEY = "idea-travel-cookie-consent";

function hasAnalyticsConsent(): boolean {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return false;
    const consent = JSON.parse(stored);
    return consent.analytics === true;
  } catch {
    return false;
  }
}

function getGtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as Record<string, unknown>).gtag as ((...args: unknown[]) => void) | null ?? null;
}

export type AffiliateProvider = "amazon" | "booking" | "civitatis" | "getyourguide" | "iati" | "discovercars" | "travelpayouts";

interface AffiliateClickParams {
  provider: AffiliateProvider;
  item_name?: string;
  destination?: string;
  url?: string;
}

interface PackViewParams {
  pack_name: string;
  pack_slug: string;
  destination_count?: number;
}

export function trackAffiliateClick(params: AffiliateClickParams): void {
  if (!hasAnalyticsConsent()) return;
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", "affiliate_click", params);
}

export function trackPackView(params: PackViewParams): void {
  if (!hasAnalyticsConsent()) return;
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", "pack_view", params);
}

export function trackPageView(url: string): void {
  if (!hasAnalyticsConsent()) return;
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", "page_view", { page_path: url });
}
