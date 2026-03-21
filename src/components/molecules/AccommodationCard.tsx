"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Accommodation } from "@/domain/models/pack.types";
import { Badge } from "@/components/atoms/Badge";
import { Rating } from "@/components/atoms/Rating";
import { formatPrice } from "@/lib/format";
import { trackAccommodationClick } from "@/lib/track-click";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const t = useTranslations("accommodation");
  const tDetail = useTranslations("packDetail");

  const tierConfig = {
    budget: {
      badge: t("budget"),
      badgeVariant: "budget" as const,
      borderClass: "border border-neutral-200 dark:border-neutral-700",
      label: null,
    },
    standard: {
      badge: t("standard"),
      badgeVariant: "standard" as const,
      borderClass: "border-2 border-primary-500 shadow-[var(--shadow-lg)]",
      label: t("standard"),
    },
    premium: {
      badge: t("premium"),
      badgeVariant: "premium" as const,
      borderClass: "border border-amber-300 dark:border-amber-600",
      label: null,
    },
  };

  const config = tierConfig[accommodation.tier];
  const isTrending = (accommodation.clicksLast24h ?? 0) >= 5;

  return (
    <article
      className={`relative bg-white dark:bg-neutral-800 rounded-[var(--radius-xl)] overflow-hidden p-6 ${config.borderClass}`}
    >
      {config.label && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-4 py-1 rounded-b-[var(--radius-lg)]">
          {config.label}
        </div>
      )}
      <div className={config.label ? "mt-4" : ""}>
        <div className="relative w-full h-40 rounded-[var(--radius-lg)] overflow-hidden mb-4">
          <Image
            src={accommodation.image}
            alt={accommodation.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          {isTrending && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-primary-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.1.876-4.053 2.426-5.574C8.97 8.972 10.349 7.26 11 4c.298 1.492 1.042 2.834 2.018 3.96C14.876 10.152 17 12.15 17 16.5c0 .95-.12 1.6-.34 2.25A7.003 7.003 0 0 1 12 23zm0-3c1.657 0 3-1.343 3-3 0-1.953-1.06-3.07-2.25-4.5-.56.932-1.12 1.432-1.74 2.012C10.373 15.13 9.5 16.18 9.5 17.5c0 1.38 1.12 2.5 2.5 2.5z" />
              </svg>
              {tDetail("trending")}
            </span>
          )}
        </div>
        <div className="flex items-start justify-between mb-1">
          <h4 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
            {accommodation.name}
          </h4>
          <Badge variant={config.badgeVariant}>{config.badge}</Badge>
        </div>
        <Rating value={accommodation.rating} className="mb-3" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{accommodation.description}</p>
        <ul className="space-y-2 mb-4">
          {accommodation.amenities.slice(0, 4).map((amenity) => (
            <li key={amenity} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              <svg className="w-4 h-4 text-secondary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {amenity}
            </li>
          ))}
        </ul>
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 flex items-end justify-between gap-2">
          <div>
            <span className="text-2xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
              {formatPrice(accommodation.pricePerNight, accommodation.currency)}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{tDetail("perNight")}</span>
          </div>
          {accommodation.bookingUrl && (
            <a
              href={accommodation.bookingUrl}
              rel="noopener nofollow sponsored"
              target="_blank"
              onClick={() => trackAccommodationClick(accommodation.id)}
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
