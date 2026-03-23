"use client";

import { useState, useEffect, useCallback } from "react";

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "idea-travel-cookie-consent";

const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
};

const ALL_ACCEPTED: CookieConsent = {
  essential: true,
  analytics: true,
  marketing: true,
};

function getStoredConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as CookieConsent;
  } catch {
    return null;
  }
}

function storeConsent(consent: CookieConsent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  const [hasDecided, setHasDecided] = useState(true); // true para evitar flash del banner en SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      setHasDecided(true);
    } else {
      setHasDecided(false);
    }
    setMounted(true);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent(ALL_ACCEPTED);
    storeConsent(ALL_ACCEPTED);
    setHasDecided(true);
  }, []);

  const rejectNonEssential = useCallback(() => {
    setConsent(DEFAULT_CONSENT);
    storeConsent(DEFAULT_CONSENT);
    setHasDecided(true);
  }, []);

  return { consent, hasDecided, mounted, acceptAll, rejectNonEssential } as const;
}
