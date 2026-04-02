import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PackGrid } from "@/components/organisms/PackGrid";
import { PackFilters } from "@/components/organisms/PackFilters";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { packRepository } from "@/infrastructure/repositories/pack.repository";
import type { PackFiltersParams, PackSortBy } from "@/domain/models/pack.types";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

interface PacksPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    days?: string;
    destinations?: string;
    price?: string;
    sort?: string;
    search?: string;
  }>;
}

export async function generateMetadata({ params }: PacksPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "packs" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      title: `${t("title")} | Tengo Un Viaje`,
      description: t("metaDescription"),
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | Tengo Un Viaje`,
      description: t("metaDescription"),
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `/${locale}/packs`,
      languages: {
        es: "/es/packs",
        en: "/en/packs",
        "x-default": "/es/packs",
      },
    },
  };
}

const VALID_DAYS = ["1to7", "8to10", "11plus"];
const VALID_DESTINATIONS = ["1to2", "3to4", "5plus"];
const VALID_PRICES = ["under1000", "1000to1500", "over1500"];
const VALID_SORTS = ["price_asc", "price_desc", "duration_asc", "duration_desc"];

function buildApiFilters(
  days: string,
  destinations: string,
  price: string,
  sort: string,
  search: string
): PackFiltersParams {
  const filters: PackFiltersParams = {};

  if (days === "1to7") { filters.minDays = 1; filters.maxDays = 7; }
  else if (days === "8to10") { filters.minDays = 8; filters.maxDays = 10; }
  else if (days === "11plus") { filters.minDays = 11; }

  if (destinations === "1to2") { filters.minDestinations = 1; filters.maxDestinations = 2; }
  else if (destinations === "3to4") { filters.minDestinations = 3; filters.maxDestinations = 4; }
  else if (destinations === "5plus") { filters.minDestinations = 5; }

  if (price === "under1000") { filters.maxPrice = 999; }
  else if (price === "1000to1500") { filters.minPrice = 1000; filters.maxPrice = 1500; }
  else if (price === "over1500") { filters.minPrice = 1501; }

  if (sort !== "all" && VALID_SORTS.includes(sort)) {
    filters.sortBy = sort as PackSortBy;
  }

  if (search && search.length >= 2) {
    filters.search = search;
  }

  return filters;
}

export default async function PacksPage({ params, searchParams }: PacksPageProps) {
  const { locale } = await params;
  const { days, destinations, price, sort, search } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("packs");
  const tCommon = await getTranslations("common");

  const selectedDays = days && VALID_DAYS.includes(days) ? days : "all";
  const selectedDestinations = destinations && VALID_DESTINATIONS.includes(destinations) ? destinations : "all";
  const selectedPrice = price && VALID_PRICES.includes(price) ? price : "all";
  const selectedSort = sort && VALID_SORTS.includes(sort) ? sort : "all";
  const selectedSearch = search ?? "";

  const apiFilters = buildApiFilters(selectedDays, selectedDestinations, selectedPrice, selectedSort, selectedSearch);
  let packs: Awaited<ReturnType<typeof packRepository.getAllPacks>>["data"] = [];
  let total = 0;
  try {
    const result = await packRepository.getAllPacks(locale, 1, 50, apiFilters);
    packs = result.data;
    total = result.total;
  } catch {
    // API unavailable during build
  }

  const hasActiveFilters =
    selectedDays !== "all" ||
    selectedDestinations !== "all" ||
    selectedPrice !== "all" ||
    selectedSort !== "all" ||
    selectedSearch !== "";

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs
        items={[
          { name: tCommon("breadcrumbHome"), url: "/" },
          { name: t("title"), url: "/packs" },
        ]}
      />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-3xl">
          {t("description")}
        </p>
      </div>

      <PackFilters
        selectedDays={selectedDays}
        selectedDestinations={selectedDestinations}
        selectedPrice={selectedPrice}
        selectedSort={selectedSort}
        selectedSearch={selectedSearch}
      />

      {hasActiveFilters && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          {t("resultsCount", { count: total })}
        </p>
      )}

      {packs.length > 0 ? (
        <PackGrid packs={packs} />
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            {t("noResults")}
          </p>
        </div>
      )}
    </div>
  );
}
