"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

interface PackFiltersProps {
  selectedDays: string;
  selectedDestinations: string;
  selectedPrice: string;
  selectedSort: string;
  selectedSearch: string;
}

const DAYS_OPTIONS = ["all", "1to7", "8to10", "11plus"] as const;
const DESTINATIONS_OPTIONS = ["all", "1to2", "3to4", "5plus"] as const;
const PRICE_OPTIONS = ["all", "under1000", "1000to1500", "over1500"] as const;
const SORT_OPTIONS = ["all", "price_asc", "price_desc", "duration_asc", "duration_desc"] as const;

const DAYS_LABELS: Record<string, string> = {
  all: "allDays",
  "1to7": "days1to7",
  "8to10": "days8to10",
  "11plus": "days11plus",
};

const DESTINATIONS_LABELS: Record<string, string> = {
  all: "allDestinations",
  "1to2": "destinations1to2",
  "3to4": "destinations3to4",
  "5plus": "destinations5plus",
};

const PRICE_LABELS: Record<string, string> = {
  all: "allPrices",
  under1000: "priceUnder1000",
  "1000to1500": "price1000to1500",
  over1500: "priceOver1500",
};

const SORT_LABELS: Record<string, string> = {
  all: "sortDefault",
  price_asc: "sortPriceAsc",
  price_desc: "sortPriceDesc",
  duration_asc: "sortDurationAsc",
  duration_desc: "sortDurationDesc",
};

function buildQuery(
  days: string,
  destinations: string,
  price: string,
  sort: string,
  search: string
): string {
  const params = new URLSearchParams();
  if (days !== "all") params.set("days", days);
  if (destinations !== "all") params.set("destinations", destinations);
  if (price !== "all") params.set("price", price);
  if (sort !== "all") params.set("sort", sort);
  if (search) params.set("search", search);
  const qs = params.toString();
  return qs ? `/packs?${qs}` : "/packs";
}

export function PackFilters({
  selectedDays,
  selectedDestinations,
  selectedPrice,
  selectedSort,
  selectedSearch,
}: PackFiltersProps) {
  const t = useTranslations("packs");
  const router = useRouter();

  const hasActiveFilters =
    selectedDays !== "all" ||
    selectedDestinations !== "all" ||
    selectedPrice !== "all" ||
    selectedSort !== "all" ||
    selectedSearch !== "";

  function navigate(
    days: string,
    destinations: string,
    price: string,
    sort: string,
    search: string
  ) {
    const url = buildQuery(days, destinations, price, sort, search);
    router.push(url as "/packs");
  }

  function handleSearch(value: string) {
    navigate(selectedDays, selectedDestinations, selectedPrice, selectedSort, value);
  }

  const chipBase =
    "px-3 py-1.5 rounded-[var(--radius-2xl)] text-sm font-medium transition-colors duration-[var(--duration-fast)]";
  const chipActive = "bg-primary-500 text-white";
  const chipInactive =
    "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700";

  return (
    <div className="mb-10 space-y-4">
      {/* Search */}
      <div className="flex flex-wrap items-center gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSearch(formData.get("search") as string);
          }}
          className="flex-1 min-w-[200px] max-w-md"
        >
          <input
            type="text"
            name="search"
            defaultValue={selectedSearch}
            placeholder={t("searchPlaceholder")}
            className="w-full px-4 py-2 rounded-[var(--radius-lg)] border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </form>
      </div>

      {/* Days filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 min-w-[80px]">
          {t("filterDays")}
        </span>
        {DAYS_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() =>
              navigate(opt, selectedDestinations, selectedPrice, selectedSort, selectedSearch)
            }
            className={`${chipBase} ${selectedDays === opt ? chipActive : chipInactive}`}
          >
            {t(DAYS_LABELS[opt] ?? "allDays")}
          </button>
        ))}
      </div>

      {/* Destinations filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 min-w-[80px]">
          {t("filterDestinations")}
        </span>
        {DESTINATIONS_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() =>
              navigate(selectedDays, opt, selectedPrice, selectedSort, selectedSearch)
            }
            className={`${chipBase} ${selectedDestinations === opt ? chipActive : chipInactive}`}
          >
            {t(DESTINATIONS_LABELS[opt] ?? "allDestinations")}
          </button>
        ))}
      </div>

      {/* Price filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 min-w-[80px]">
          {t("filterPrice")}
        </span>
        {PRICE_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() =>
              navigate(selectedDays, selectedDestinations, opt, selectedSort, selectedSearch)
            }
            className={`${chipBase} ${selectedPrice === opt ? chipActive : chipInactive}`}
          >
            {t(PRICE_LABELS[opt] ?? "allPrices")}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 min-w-[80px]">
          {t("sortBy")}
        </span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() =>
              navigate(selectedDays, selectedDestinations, selectedPrice, opt, selectedSearch)
            }
            className={`${chipBase} ${selectedSort === opt ? chipActive : chipInactive}`}
          >
            {t(SORT_LABELS[opt] ?? "sortDefault")}
          </button>
        ))}
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <div className="pt-2">
          <button
            onClick={() => navigate("all", "all", "all", "all", "")}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline underline-offset-4 font-medium"
          >
            {t("clearFilters")}
          </button>
        </div>
      )}
    </div>
  );
}
