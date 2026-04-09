"use client";

import { useTranslations } from "next-intl";
import type { Accommodation, AccommodationTier } from "@/domain/models/pack.types";
import { Rating } from "@/components/atoms/Rating";
import { formatPrice } from "@/lib/format";
import { trackAccommodationClick } from "@/lib/track-click";
import { trackAffiliateClick } from "@/lib/analytics";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const tierConfig: Record<AccommodationTier, {
  gradient: string;
  borderClass: string;
  badgeClass: string;
  hasLabel: boolean;
}> = {
  budget: {
    gradient: "from-secondary-500 to-secondary-600",
    borderClass: "border border-neutral-200 dark:border-neutral-700",
    badgeClass: "bg-secondary-50 dark:bg-secondary-900/40 text-secondary-700 dark:text-secondary-300",
    hasLabel: false,
  },
  standard: {
    gradient: "from-primary-500 to-primary-600",
    borderClass: "border-2 border-primary-500 shadow-[var(--shadow-lg)]",
    badgeClass: "bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300",
    hasLabel: true,
  },
  premium: {
    gradient: "from-amber-500 to-amber-600",
    borderClass: "border border-amber-300 dark:border-amber-600",
    badgeClass: "bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
    hasLabel: false,
  },
};

function BudgetBuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 21h20M6 21V8l6-3 6 3v13M10 12h1M13 12h1M10 16h1M13 16h1" />
    </svg>
  );
}

function StandardBuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 21h20M4 21V7l8-4 8 4v14M9 10h1M14 10h1M9 13h1M14 13h1M9 16h1M14 16h1M11 21v-4h2v4" />
    </svg>
  );
}

function PremiumBuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 21h20M5 21V6l7-3 7 3v15M10 9h1M13 9h1M10 12h1M13 12h1M10 15h1M13 15h1M10 18h4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v-1M11 1.5l1-0.5 1 0.5" />
    </svg>
  );
}

const tierIcons: Record<AccommodationTier, React.FC<{ className?: string }>> = {
  budget: BudgetBuildingIcon,
  standard: StandardBuildingIcon,
  premium: PremiumBuildingIcon,
};

export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const t = useTranslations("accommodation");
  const tDetail = useTranslations("packDetail");

  const config = tierConfig[accommodation.tier];
  const isTrending = (accommodation.clicksLast24h ?? 0) >= 5;
  const TierIcon = tierIcons[accommodation.tier];

  return (
    <article
      className={`relative bg-white dark:bg-neutral-800 rounded-[var(--radius-xl)] overflow-hidden ${config.borderClass} transition-all duration-[var(--duration-normal)] ease-[var(--ease-in-out)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1`}
    >
      {/* Label "Recomendado" solo para standard */}
      {config.hasLabel && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10 bg-primary-500 text-white text-xs font-bold px-4 py-1 rounded-b-[var(--radius-lg)]">
          {t("standard")}
        </div>
      )}

      {/* Gradient header con icono decorativo (reemplaza la imagen) */}
      <div className={`relative h-28 bg-gradient-to-br ${config.gradient} flex items-center justify-center overflow-hidden`}>
        {/* Patron decorativo - circulos concentricos */}
        <div className="absolute inset-0 opacity-10 dark:opacity-[0.08]" aria-hidden="true">
          <div className="absolute -right-8 -top-8 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute -right-4 -top-4 w-24 h-24 border-2 border-white rounded-full" />
          <div className="absolute right-16 bottom-2 w-16 h-16 border border-white rounded-full" />
        </div>
        {/* Icono de hotel */}
        <TierIcon className="w-12 h-12 text-white/90" />
        {/* Trending badge */}
        {isTrending && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.1.876-4.053 2.426-5.574C8.97 8.972 10.349 7.26 11 4c.298 1.492 1.042 2.834 2.018 3.96C14.876 10.152 17 12.15 17 16.5c0 .95-.12 1.6-.34 2.25A7.003 7.003 0 0 1 12 23zm0-3c1.657 0 3-1.343 3-3 0-1.953-1.06-3.07-2.25-4.5-.56.932-1.12 1.432-1.74 2.012C10.373 15.13 9.5 16.18 9.5 17.5c0 1.38 1.12 2.5 2.5 2.5z" />
            </svg>
            {tDetail("trending")}
          </span>
        )}
        {/* Tier badge */}
        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-[var(--radius-sm)]">
          {t(accommodation.tier)}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] leading-tight mb-1">
          {accommodation.name}
        </h4>
        <Rating value={accommodation.rating} className="mb-3" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">
          {accommodation.description}
        </p>

        {/* Amenities como chips horizontales */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {accommodation.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-xs text-neutral-600 dark:text-neutral-300"
            >
              <svg className="w-3 h-3 text-secondary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {amenity}
            </span>
          ))}
        </div>

        {/* Precio + CTA */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 flex items-end justify-between gap-2">
          <div>
            <span className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)]">
              {formatPrice(accommodation.pricePerNight, accommodation.currency)}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{tDetail("perNight")}</span>
          </div>
          {accommodation.bookingUrl && (
            <a
              href={accommodation.bookingUrl}
              rel="noopener nofollow sponsored"
              target="_blank"
              onClick={() => {
                trackAccommodationClick(accommodation.id);
                trackAffiliateClick({ provider: "booking", item_name: accommodation.name, url: accommodation.bookingUrl });
              }}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline underline-offset-4 transition-colors shrink-0"
            >
              {tDetail("bookNow")} &rarr;
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
