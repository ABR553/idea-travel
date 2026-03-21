import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FlightSearchForm } from "@/components/organisms/FlightSearchForm";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";

interface VuelosPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: VuelosPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "flights" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    alternates: {
      languages: {
        es: "/es/vuelos",
        en: "/en/flights",
      },
    },
  };
}

export default async function VuelosPage({ params }: VuelosPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("flights");
  const tCommon = await getTranslations("common");

  const tips = [
    {
      key: "tip1",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      key: "tip2",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      key: "tip3",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
    },
  ];

  return (
    <>
      {/* Hero ligera */}
      <section className="bg-primary-50 dark:bg-neutral-900 pt-8 pb-16 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: tCommon("breadcrumbHome"), url: "/" },
              { name: t("title"), url: "/vuelos" },
            ]}
          />
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-4">
              {t("heading")}
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
          <FlightSearchForm />
        </div>
      </section>

      {/* Tips section */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-8 text-center">
          {t("tipsTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <article
              key={tip.key}
              className="bg-white dark:bg-neutral-800 rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-md)]"
            >
              <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={tip.icon}
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-2">
                {t(`${tip.key}Title`)}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t(`${tip.key}Description`)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
