"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import type { Locale } from "@/i18n/routing";

const NAV_LINKS = [
  { href: "/packs" as const, key: "packs" },
  { href: "/tienda" as const, key: "shop" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("nav");
  const tLang = useTranslations("languageSwitcher");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  function switchLocale(newLocale: Locale) {
    router.replace(
      // @ts-expect-error -- pathname y params siempre coinciden para la ruta actual
      { pathname, params },
      { locale: newLocale }
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-[var(--duration-normal)] ${
          isScrolled
            ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-[var(--shadow-sm)]"
            : "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-neutral-900 dark:text-white font-[family-name:var(--font-heading)]">
            Idea<span className="text-primary-500">Travel</span>
          </Link>
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-base font-medium transition-colors duration-[var(--duration-fast)] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary-500 after:transition-all after:duration-[var(--duration-normal)] ${
                    pathname === link.href || pathname?.startsWith(link.href + "/")
                      ? "text-primary-600 dark:text-primary-400 after:w-full"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 after:w-0 hover:after:w-full"
                  }`}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => switchLocale(locale === "es" ? "en" : "es")}
              className="px-2 py-1 text-xs font-medium rounded-[var(--radius-md)] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-[var(--duration-fast)] uppercase"
              aria-label={tLang("label")}
            >
              {locale === "es" ? "EN" : "ES"}
            </button>
            <ThemeToggle />
            <Link
              href="/packs"
              className="inline-flex items-center px-4 py-2 rounded-[var(--radius-lg)] bg-primary-600 text-white text-sm font-semibold transition-all duration-[var(--duration-fast)] hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            >
              {t("explorePacks")}
            </Link>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => switchLocale(locale === "es" ? "en" : "es")}
              className="px-2 py-1 text-xs font-medium rounded-[var(--radius-md)] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors uppercase"
              aria-label={tLang("label")}
            >
              {locale === "es" ? "EN" : "ES"}
            </button>
            <ThemeToggle />
            <button
              className="p-2 text-neutral-700 dark:text-neutral-300 rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 animate-[slideInRight_var(--duration-slow)_var(--ease-out)]">
          <ul className="py-4 px-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-3 rounded-[var(--radius-md)] text-base font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                      : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
