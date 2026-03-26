"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const GA_ID = process.env["NEXT_PUBLIC_GA_ID"];

export function GoogleAnalytics() {
  const { consent, mounted } = useCookieConsent();

  useEffect(() => {
    if (!GA_ID || !mounted) return;
    const w = window as unknown as Record<string, unknown>;
    if (typeof w.gtag !== "function") return;
    const gtag = w.gtag as (...args: unknown[]) => void;

    if (consent.analytics) {
      gtag("consent", "update", {
        analytics_storage: "granted",
      });
      gtag("config", GA_ID, { page_path: window.location.pathname });
    } else {
      gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  }, [consent.analytics, mounted]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'denied',
          });
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
