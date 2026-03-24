"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-400 pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <span className="text-lg md:text-xl font-bold text-white font-[family-name:var(--font-heading)] whitespace-nowrap">
              Tengo Un <span className="text-primary-500">Viaje</span>
            </span>
            <p className="mt-4 text-sm">
              {t("description")}
            </p>
          </div>
          <div>
            <h4 className="text-base font-semibold text-white mb-4">{t("explore")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/packs" className="hover:text-primary-400 transition-colors">
                  {tNav("packs")}
                </Link>
              </li>
              <li>
                <Link href="/tienda" className="hover:text-primary-400 transition-colors">
                  {tNav("shop")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold text-white mb-4">{t("legal")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/sobre-nosotros" className="hover:text-primary-400 transition-colors">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-primary-400 transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-primary-400 transition-colors">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary-400 transition-colors">
                  {t("cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 pt-8 text-center text-xs">
          &copy; {new Date().getFullYear()} Tengo Un Viaje. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
