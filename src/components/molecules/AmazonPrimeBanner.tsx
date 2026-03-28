import { getTranslations } from "next-intl/server";

const AMAZON_PRIME_URL =
  "https://www.amazon.es/amazonprime?_encoding=UTF8&primeCampaignId=prime_assoc_ft&tag=tengounviaje-21";

export async function AmazonPrimeBanner() {
  const t = await getTranslations("shop");

  return (
    <div className="my-6 rounded-[var(--radius-lg)] overflow-hidden bg-[#232F3E] flex flex-col sm:flex-row items-center gap-4 px-6 py-5 shadow-md">
      {/* Icono Prime */}
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#FF9900]/20">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-[#FF9900]"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Texto */}
      <div className="flex-1 text-center sm:text-left">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FF9900] block mb-0.5">
          {t("primeBannerBadge")}
        </span>
        <p className="text-white font-semibold text-base leading-snug">
          {t("primeBannerTitle")}
        </p>
        <p className="text-neutral-400 text-sm mt-0.5">{t("primeBannerSubtitle")}</p>
      </div>

      {/* CTA */}
      <a
        href={AMAZON_PRIME_URL}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="flex-shrink-0 inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#e88b00] active:bg-[#d47e00] text-[#1C1917] font-bold text-sm px-5 py-2.5 rounded-[var(--radius-md)] transition-colors duration-[var(--duration-fast)] whitespace-nowrap min-h-[44px]"
      >
        {t("primeBannerCta")}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
