"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/atoms/Button";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section className="relative min-h-[85vh] flex items-center bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
          alt="Viajero con mochila explorando un destino de viaje"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/50 to-transparent" />
      </div>
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-primary-400 text-lg font-medium mb-4 animate-[fadeInUp_var(--duration-slower)_var(--ease-out)_200ms_both]">
            {t("heroSubtitle")}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-6 leading-[1.1] font-[family-name:var(--font-heading)] animate-[fadeInUp_var(--duration-slower)_var(--ease-out)_400ms_both]">
            {t("heroTitle1")}
            <br />
            <span className="text-primary-400">{t("heroTitle2")}</span>
          </h1>
          <p className="text-lg text-neutral-300 mb-8 animate-[fadeInUp_var(--duration-slower)_var(--ease-out)_600ms_both]">
            {t("heroDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-[fadeInUp_var(--duration-slower)_var(--ease-out)_800ms_both]">
            <Link href="/packs">
              <Button size="lg">{t("heroCtaPacks")}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
