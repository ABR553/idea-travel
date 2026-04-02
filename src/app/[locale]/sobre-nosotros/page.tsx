import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AffiliateDisclosure } from "@/components/molecules/AffiliateDisclosure";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === "es" ? "/es/sobre-nosotros" : "/en/about-us",
      languages: {
        es: "/es/sobre-nosotros",
        en: "/en/about-us",
        "x-default": "/es/sobre-nosotros",
      },
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <article className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <header className="mb-10">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {t("subtitle")}
        </p>
      </header>

      <div className="space-y-8 text-neutral-600 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
            {t("missionTitle")}
          </h2>
          <p>{t("missionText")}</p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
            {t("howItWorksTitle")}
          </h2>
          <p>{t("howItWorksText")}</p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
            {t("affiliateTitle")}
          </h2>
          <p className="mb-4">{t("affiliateText")}</p>
          <AffiliateDisclosure variant="banner" />
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
            {t("contactTitle")}
          </h2>
          <p>{t("contactText")}</p>
        </section>
      </div>
    </article>
  );
}
