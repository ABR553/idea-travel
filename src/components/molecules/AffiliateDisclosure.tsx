import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface AffiliateDisclosureProps {
  variant?: "inline" | "banner";
}

export function AffiliateDisclosure({ variant = "inline" }: AffiliateDisclosureProps) {
  const t = useTranslations("common");

  if (variant === "banner") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800/50">
        <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block mr-1.5 -mt-0.5 text-neutral-400 dark:text-neutral-500"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          {t("affiliateDisclosure")}{" "}
          <Link
            href="/sobre-nosotros"
            className="underline underline-offset-2 text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-[var(--duration-fast)]"
          >
            {t("moreInfo")}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <p className="text-xs text-neutral-500 dark:text-neutral-400">
      {t("affiliateDisclosure")}
    </p>
  );
}
