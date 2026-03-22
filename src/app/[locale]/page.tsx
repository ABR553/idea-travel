import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/organisms/Hero";
import { PackGrid } from "@/components/organisms/PackGrid";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { Button } from "@/components/atoms/Button";
import { packRepository } from "@/infrastructure/repositories/pack.repository";
import { productRepository } from "@/infrastructure/repositories/product.repository";
import { generateWebsiteJsonLd } from "@/lib/seo";

export const revalidate = 60;

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("title", { siteName: tCommon("siteName") }),
    description: tCommon("siteDescription"),
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_ES",
      siteName: tCommon("siteName"),
      title: t("title", { siteName: tCommon("siteName") }),
      description: tCommon("siteDescription"),
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  let featuredPacks: Awaited<ReturnType<typeof packRepository.getFeaturedPacks>> = [];
  let popularProducts: Awaited<ReturnType<typeof productRepository.getAllProducts>>["data"] = [];
  try {
    featuredPacks = await packRepository.getFeaturedPacks(locale);
  } catch {
    // API unavailable during build
  }
  try {
    const productsResponse = await productRepository.getAllProducts(locale, 1, 4);
    popularProducts = productsResponse.data;
  } catch {
    // API unavailable during build
  }
  const jsonLd = generateWebsiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {/* Featured Packs */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-4">
            {t("featuredTitle")}
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            {t("featuredDescription")}
          </p>
        </div>
        <PackGrid packs={featuredPacks} />
        <div className="text-center mt-12">
          <Link href="/packs">
            <Button variant="secondary" size="lg">
              {t("viewAllPacks")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Flight CTA */}
      <section className="bg-primary-50 dark:bg-neutral-900 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-4">
            {t("flightCtaTitle")}
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            {t("flightCtaDescription")}
          </p>
          <Link href="/vuelos">
            <Button size="lg">{t("flightCtaButton")}</Button>
          </Link>
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-4">
            {t("productsTitle")}
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            {t("productsDescription")}
          </p>
        </div>
        <ProductGrid products={popularProducts} />
        <div className="text-center mt-12">
          <Link href="/tienda">
            <Button variant="secondary" size="lg">
              {t("viewAllShop")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
