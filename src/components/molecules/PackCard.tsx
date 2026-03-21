import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PackListItem } from "@/domain/models/pack.types";
import { Badge } from "@/components/atoms/Badge";
import { formatPrice } from "@/lib/format";

interface PackCardProps {
  pack: PackListItem;
}

export function PackCard({ pack }: PackCardProps) {
  const t = useTranslations("packs");

  return (
    <article className="group relative bg-white dark:bg-neutral-800 rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-md)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-in-out)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 hover:bg-primary-50/30 dark:hover:bg-neutral-700/50">
      <Link href={{ pathname: "/packs/[slug]", params: { slug: pack.slug } }} className="block" aria-label={`${t("viewPack")}: ${pack.title}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={pack.coverImage}
            alt={pack.destinations.map((d) => d.name).join(", ")}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-in-out)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
          {pack.featured && (
            <Badge variant="default" className="absolute top-4 left-4">
              {t("featured")}
            </Badge>
          )}
          <div className="absolute bottom-4 right-4 text-white text-right">
            <span className="block text-xs opacity-80">{t("fromPrice")}</span>
            <span className="block text-xl font-bold font-[family-name:var(--font-heading)]">
              {formatPrice(pack.price.from, pack.price.currency)}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2 font-[family-name:var(--font-heading)] group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors duration-[var(--duration-fast)]">
            {pack.title}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">
            {pack.shortDescription}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {pack.destinations.map((dest) => (
              <span
                key={dest.name}
                className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 rounded-[var(--radius-sm)]"
              >
                {dest.name}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
            <span>{pack.duration}</span>
            <span className="text-primary-600 font-semibold group-hover:underline underline-offset-4">
              {t("viewPack")} &rarr;
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
