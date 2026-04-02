import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { CategoryFilter } from "@/components/organisms/CategoryFilter";
import { projectRepository } from "@/infrastructure/repositories/project.repository";
import { AffiliateDisclosure } from "@/components/molecules/AffiliateDisclosure";
import { AmazonPrimeBanner } from "@/components/molecules/AmazonPrimeBanner";
import { CURRENT_PROJECT_SLUG } from "@/domain/models/project.types";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

interface TiendaPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ params }: TiendaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: locale === "es" ? "/es/tienda" : "/en/shop",
      languages: {
        es: "/es/tienda",
        en: "/en/shop",
        "x-default": "/es/tienda",
      },
    },
  };
}

export default async function TiendaPage({ params, searchParams }: TiendaPageProps) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("shop");
  const tCommon = await getTranslations("common");

  let categories: string[] = [];
  try {
    categories = await projectRepository.getProjectCategories(CURRENT_PROJECT_SLUG);
  } catch {
    // API unavailable during build
  }

  const selectedCategory = category && categories.includes(category) ? category : "all";

  let filteredProducts: Awaited<ReturnType<typeof projectRepository.getProjectProducts>>["data"] = [];
  try {
    const productsResponse = await projectRepository.getProjectProducts(
      CURRENT_PROJECT_SLUG,
      locale,
      1,
      50,
      selectedCategory !== "all" ? { category: selectedCategory } : undefined
    );
    filteredProducts = productsResponse.data;
  } catch {
    // API unavailable during build
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs
        items={[
          { name: tCommon("breadcrumbHome"), url: "/" },
          { name: t("title"), url: "/tienda" },
        ]}
      />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-3xl mb-4">
          {t("description")}
        </p>
      </div>

      <AffiliateDisclosure variant="banner" />

      <CategoryFilter selected={selectedCategory} categories={categories} />

      <AmazonPrimeBanner />

      <ProductGrid products={filteredProducts} />

      <p className="mt-8 text-xs text-neutral-400 dark:text-neutral-500">
        {t("priceDisclaimer")}
      </p>
    </div>
  );
}
