"use client";

import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Link } from "@/i18n/navigation";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const { hasDecided, mounted, acceptAll, rejectNonEssential } = useCookieConsent();

  if (!mounted || hasDecided) return null;

  return (
    <div
      role="dialog"
      aria-label={t("ariaLabel")}
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 animate-[fadeInUp_var(--duration-slower)_var(--ease-out)_both]"
    >
      <div className="mx-auto max-w-4xl px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white/95 p-4 shadow-[var(--shadow-xl)] backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/95 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            {/* Icono cookie */}
            <div className="hidden sm:block shrink-0 rounded-[var(--radius-lg)] bg-primary-50 p-2.5 dark:bg-primary-900/30">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-500"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <path d="M8.5 8.5v.01" />
                <path d="M16 15.5v.01" />
                <path d="M12 12v.01" />
                <path d="M11 17v.01" />
                <path d="M7 14v.01" />
              </svg>
            </div>

            {/* Texto */}
            <div className="flex-1 min-w-0">
              <p className="font-[family-name:var(--font-heading)] text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                {t("title")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {t("description")}{" "}
                <Link
                  href="/cookies"
                  className="underline underline-offset-2 text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-[var(--duration-fast)]"
                >
                  {t("learnMore")}
                </Link>
              </p>
            </div>

            {/* Botones */}
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <button
                onClick={rejectNonEssential}
                className="rounded-[var(--radius-md)] border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-[var(--duration-fast)] hover:bg-neutral-50 hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:border-neutral-500"
              >
                {t("rejectNonEssential")}
              </button>
              <button
                onClick={acceptAll}
                className="rounded-[var(--radius-md)] bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all duration-[var(--duration-fast)] hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 dark:bg-primary-600 dark:hover:bg-primary-500"
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
