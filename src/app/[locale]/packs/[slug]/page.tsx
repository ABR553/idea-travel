import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { packRepository } from "@/infrastructure/repositories/pack.repository";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { AccommodationCard } from "@/components/molecules/AccommodationCard";
import { ExperienceCard } from "@/components/molecules/ExperienceCard";
import { Badge } from "@/components/atoms/Badge";
import { formatPrice } from "@/lib/format";
import { generateTouristTripJsonLd } from "@/lib/seo";
import { routing } from "@/i18n/routing";

interface PackPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  try {
    const { data: packs } = await packRepository.getAllPacks();
    return routing.locales.flatMap((locale) =>
      packs.map((pack) => ({ locale, slug: pack.slug }))
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PackPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "packDetail" });
  const pack = await packRepository.getPackBySlug(slug, locale);
  if (!pack) return { title: t("notFound") };

  return {
    title: pack.title,
    description: pack.shortDescription,
    openGraph: {
      title: `${pack.title} | Tengo Un Viaje`,
      description: pack.shortDescription,
      images: [{ url: pack.coverImage, width: 1200, height: 630, alt: pack.title }],
      locale: locale === "en" ? "en_US" : "es_ES",
    },
    alternates: {
      canonical: `/${locale}/packs/${slug}`,
      languages: {
        es: `/es/packs/${slug}`,
        en: `/en/packs/${slug}`,
        "x-default": `/es/packs/${slug}`,
      },
    },
  };
}

export default async function PackDetailPage({ params }: PackPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("packDetail");
  const tPacks = await getTranslations("packs");
  const tCommon = await getTranslations("common");

  const pack = await packRepository.getPackBySlug(slug, locale);
  if (!pack) notFound();

  const jsonLd = generateTouristTripJsonLd(pack);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end bg-neutral-900">
        <Image
          src={pack.coverImage}
          alt={pack.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-neutral-900/30" />
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pb-12 w-full">
          {pack.featured && <Badge className="mb-4">{tPacks("featured")}</Badge>}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] mb-3">
            {pack.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-neutral-300">
            <span>{pack.duration}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{pack.destinations.map((d) => d.name).join(" → ")}</span>
            <span aria-hidden="true">&middot;</span>
            <span>
              {tPacks("fromPrice")}{" "}
              <strong className="text-white">
                {formatPrice(pack.price.from, pack.price.currency)}
              </strong>
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { name: tCommon("breadcrumbHome"), url: "/" },
            { name: tPacks("title"), url: "/packs" },
            { name: pack.title, url: `/packs/${pack.slug}` },
          ]}
        />

        {/* Description */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-4">
            {t("aboutTrip")}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            {pack.description}
          </p>
        </section>

        {/* Day-by-day route */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-8">
            {t("dailyRoute")}
          </h2>
          <div className="space-y-6">
            {pack.route.map((step) => (
              <div key={step.day} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {step.day}
                  </div>
                  {step.day < pack.route.length && (
                    <div className="w-0.5 flex-1 bg-primary-200 dark:bg-primary-800 mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{step.description}</p>
                  <Badge variant="budget" className="mt-2">
                    {step.destination}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Destinations with accommodations & experiences */}
        {pack.destinations.map((destination, index) => (
          <section key={`${index}-${destination.name}`} className="mb-16">
            {/* Destination header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-16 h-16 rounded-[var(--radius-lg)] overflow-hidden shrink-0">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)]">
                  {destination.name}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {destination.country}
                </p>
              </div>
            </div>

            {destination.description && (
              <p className="text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl">
                {destination.description}
              </p>
            )}

            {/* Accommodations */}
            {destination.accommodations.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-4">
                  {t("accommodations")}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                  {t("accommodationsDescription")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {destination.accommodations.map((acc) => (
                    <AccommodationCard key={acc.id} accommodation={acc} />
                  ))}
                </div>
              </div>
            )}

            {/* Experiences */}
            {destination.experiences.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-4">
                  {t("experiences")}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                  {t("experiencesDescription")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.experiences.map((exp) => (
                    <ExperienceCard key={exp.id} experience={exp} />
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}

      </div>
    </>
  );
}
