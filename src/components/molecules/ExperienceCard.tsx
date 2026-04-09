"use client";

import { useTranslations } from "next-intl";
import type { Experience } from "@/domain/models/pack.types";
import { Rating } from "@/components/atoms/Rating";
import { formatPrice } from "@/lib/format";
import { trackExperienceClick } from "@/lib/track-click";
import { trackAffiliateClick } from "@/lib/analytics";

interface ExperienceCardProps {
  experience: Experience;
}

const defaultProviderConfig = {
  label: "GetYourGuide",
  gradient: "from-[#FF5533] to-[#E6442B]",
};

const providerConfig: Record<string, { label: string; gradient: string }> = {
  getyourguide: defaultProviderConfig,
  civitatis: {
    label: "Civitatis",
    gradient: "from-[#00A5E0] to-[#0088BD]",
  },
};

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 0v2m0 16v2M2 12h2m16 0h2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.5 9.5-5 2 2 5 5-2-2-5Z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const t = useTranslations("packDetail");
  const isTrending = (experience.clicksLast24h ?? 0) >= 5;
  const config = providerConfig[experience.provider] ?? defaultProviderConfig;
  const ProviderIcon = experience.provider === "civitatis" ? MapPinIcon : CompassIcon;

  return (
    <a
      href={experience.affiliateUrl}
      rel="noopener nofollow sponsored"
      target="_blank"
      onClick={() => {
        trackExperienceClick(experience.id);
        trackAffiliateClick({ provider: experience.provider, item_name: experience.title, url: experience.affiliateUrl });
      }}
      className="group block bg-white dark:bg-neutral-800 rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-md)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-in-out)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1"
    >
      {/* Provider-branded gradient header */}
      <div className={`relative h-24 bg-gradient-to-br ${config.gradient} flex items-center justify-between px-5 overflow-hidden`}>
        {/* Patron diagonal decorativo */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 11px)",
          }}
          aria-hidden="true"
        />
        {/* Icono decorativo grande */}
        <ProviderIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 text-white/15" />
        {/* Provider name */}
        <span className="relative text-white font-bold text-sm tracking-wide">
          {config.label}
        </span>
        {/* Trending badge */}
        {isTrending && (
          <span className="relative inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.1.876-4.053 2.426-5.574C8.97 8.972 10.349 7.26 11 4c.298 1.492 1.042 2.834 2.018 3.96C14.876 10.152 17 12.15 17 16.5c0 .95-.12 1.6-.34 2.25A7.003 7.003 0 0 1 12 23zm0-3c1.657 0 3-1.343 3-3 0-1.953-1.06-3.07-2.25-4.5-.56.932-1.12 1.432-1.74 2.012C10.373 15.13 9.5 16.18 9.5 17.5c0 1.38 1.12 2.5 2.5 2.5z" />
            </svg>
            {t("trending")}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h4 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 mb-1.5 font-[family-name:var(--font-heading)] leading-tight group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
          {experience.title}
        </h4>
        {experience.description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2 leading-relaxed">
            {experience.description}
          </p>
        )}
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-3">
          <svg className="w-4 h-4 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 6v6l4 2" />
          </svg>
          <span>{experience.duration}</span>
          <span aria-hidden="true">&middot;</span>
          <Rating value={experience.rating} />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-700">
          <span className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
            {formatPrice(experience.price, experience.currency)}
          </span>
          <span className="text-sm font-medium text-primary-600 group-hover:underline underline-offset-4">
            {t("bookNow")} &rarr;
          </span>
        </div>
      </div>
    </a>
  );
}
