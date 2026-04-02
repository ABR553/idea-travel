import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/organisms/Hero";
import { PackGrid } from "@/components/organisms/PackGrid";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { Button } from "@/components/atoms/Button";
import { packRepository } from "@/infrastructure/repositories/pack.repository";
import { productRepository } from "@/infrastructure/repositories/product.repository";
import { AffiliateDisclosure } from "@/components/molecules/AffiliateDisclosure";
import { generateWebsiteJsonLd, generateOrganizationJsonLd, generateBreadcrumbJsonLd, generateItemListJsonLd, generateFAQJsonLd } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/lib/constants";

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
      url: `/${locale}`,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: tCommon("siteName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title", { siteName: tCommon("siteName") }),
      description: tCommon("siteDescription"),
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/es",
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
    const [maletasRes, mochilasCabinaRes] = await Promise.all([
      productRepository.getProductsByCategory("maletas", locale, 1, 4),
      productRepository.getProductsByCategory("mochilas_cabina", locale, 1, 4),
    ]);
    popularProducts = [...maletasRes.data, ...mochilasCabinaRes.data];
  } catch {
    // API unavailable during build
  }
  const websiteJsonLd = generateWebsiteJsonLd();
  const organizationJsonLd = generateOrganizationJsonLd();
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: locale === "es" ? "Inicio" : "Home", url: `/${locale}` },
  ]);
  const itemListJsonLd = featuredPacks.length > 0
    ? generateItemListJsonLd(
        featuredPacks.map((pack, i) => ({
          name: pack.title,
          url: `/${locale}/packs/${pack.slug}`,
          image: pack.coverImage,
          position: i + 1,
        }))
      )
    : null;
  const faqJsonLd = generateFAQJsonLd(
    locale === "es"
      ? [
          { question: "Que es un pack de viaje?", answer: "Un pack de viaje es una ruta completa curada con alojamientos seleccionados para diferentes presupuestos y las mejores experiencias locales en cada destino." },
          { question: "Los precios incluyen vuelos?", answer: "Los precios indicados son orientativos para alojamiento y experiencias. Los vuelos se buscan por separado para que puedas encontrar la mejor oferta desde tu ciudad de origen." },
          { question: "Como funcionan los enlaces de afiliado?", answer: "Cuando reservas a traves de nuestros enlaces, recibimos una pequena comision sin ningun coste adicional para ti. Esto nos permite mantener la web y seguir creando contenido de calidad." },
        ]
      : [
          { question: "What is a travel pack?", answer: "A travel pack is a complete curated route with selected accommodations for different budgets and the best local experiences at each destination." },
          { question: "Do prices include flights?", answer: "Listed prices are indicative for accommodations and experiences. Flights are searched separately so you can find the best deal from your city of origin." },
          { question: "How do affiliate links work?", answer: "When you book through our links, we receive a small commission at no additional cost to you. This allows us to maintain the website and keep creating quality content." },
        ]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
        <div className="mt-8">
          <AffiliateDisclosure variant="inline" />
        </div>
      </section>
    </>
  );
}
