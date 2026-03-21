"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Experience } from "@/domain/models/pack.types";
import { Badge } from "@/components/atoms/Badge";
import { Rating } from "@/components/atoms/Rating";
import { formatPrice } from "@/lib/format";
import { trackExperienceClick } from "@/lib/track-click";

interface ExperienceCardProps {
  experience: Experience;
}

const providerLabels: Record<string, string> = {
  getyourguide: "GetYourGuide",
  civitatis: "Civitatis",
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const t = useTranslations("packDetail");
  const isTrending = (experience.clicksLast24h ?? 0) >= 5;

  return (
    <a
      href={experience.affiliateUrl}
      rel="noopener nofollow sponsored"
      target="_blank"
      onClick={() => trackExperienceClick(experience.id)}
      className="group block bg-white dark:bg-neutral-800 rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-md)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-in-out)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
        />
        {isTrending && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-primary-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.1.876-4.053 2.426-5.574C8.97 8.972 10.349 7.26 11 4c.298 1.492 1.042 2.834 2.018 3.96C14.876 10.152 17 12.15 17 16.5c0 .95-.12 1.6-.34 2.25A7.003 7.003 0 0 1 12 23zm0-3c1.657 0 3-1.343 3-3 0-1.953-1.06-3.07-2.25-4.5-.56.932-1.12 1.432-1.74 2.012C10.373 15.13 9.5 16.18 9.5 17.5c0 1.38 1.12 2.5 2.5 2.5z" />
            </svg>
            {t("trending")}
          </span>
        )}
        <Badge variant="provider" className="absolute top-3 right-3">
          {providerLabels[experience.provider]}
        </Badge>
      </div>
      <div className="p-5">
        <h4 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 mb-2 font-[family-name:var(--font-heading)] group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
          {experience.title}
        </h4>
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-3">
          <span>{experience.duration}</span>
          <span aria-hidden="true">&middot;</span>
          <Rating value={experience.rating} />
        </div>
        <div className="flex items-center justify-between">
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
