import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { CategoryFilter } from "@/components/organisms/CategoryFilter";
import { productRepository } from "@/infrastructure/repositories/product.repository";
import type { ProductCategory } from "@/domain/models/product.types";

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
    },
    alternates: {
      languages: {
        es: "/es/tienda",
        en: "/en/shop",
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

  const validCategories = ["luggage", "electronics", "accessories", "comfort", "photography"];
  const selectedCategory = category && validCategories.includes(category) ? category : "all";

  let filteredProducts: Awaited<ReturnType<typeof productRepository.getAllProducts>>["data"] = [];
  try {
    const productsResponse =
      selectedCategory === "all"
        ? await productRepository.getAllProducts(locale)
        : await productRepository.getProductsByCategory(selectedCategory as ProductCategory, locale);
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

      <CategoryFilter selected={selectedCategory} />

      <ProductGrid products={filteredProducts} />
    </div>
  );
}
