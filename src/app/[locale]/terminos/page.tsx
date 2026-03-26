import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms" });

  const headingClass = "font-[family-name:var(--font-heading)] text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3";
  const listClass = "list-disc pl-6 space-y-2 mt-3";

  return (
    <article className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <header className="mb-10">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
          {t("title")}
        </h1>
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          {t("lastUpdated", { date: "26/03/2026" })}
        </p>
      </header>

      <div className="space-y-8 text-neutral-600 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 className={headingClass}>{t("introTitle")}</h2>
          <p>{t("introText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("acceptanceTitle")}</h2>
          <p>{t("acceptanceText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("serviceTitle")}</h2>
          <p>{t("serviceText")}</p>
          <ul className={listClass}>
            <li>{t("service1")}</li>
            <li>{t("service2")}</li>
            <li>{t("service3")}</li>
            <li>{t("service4")}</li>
          </ul>
        </section>

        <section>
          <h2 className={headingClass}>{t("intellectualPropertyTitle")}</h2>
          <p>{t("intellectualPropertyText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("affiliateTitle")}</h2>
          <p>{t("affiliateText")}</p>
          <ul className={listClass}>
            <li>{t("affiliate1")}</li>
            <li>{t("affiliate2")}</li>
            <li>{t("affiliate3")}</li>
          </ul>
        </section>

        <section>
          <h2 className={headingClass}>{t("userTitle")}</h2>
          <p>{t("userText")}</p>
          <ul className={listClass}>
            <li>{t("user1")}</li>
            <li>{t("user2")}</li>
            <li>{t("user3")}</li>
          </ul>
        </section>

        <section>
          <h2 className={headingClass}>{t("liabilityTitle")}</h2>
          <p>{t("liabilityText")}</p>
          <ul className={listClass}>
            <li>{t("liability1")}</li>
            <li>{t("liability2")}</li>
            <li>{t("liability3")}</li>
          </ul>
        </section>

        <section>
          <h2 className={headingClass}>{t("linksTitle")}</h2>
          <p>{t("linksText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("lawTitle")}</h2>
          <p>{t("lawText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("changesTitle")}</h2>
          <p>{t("changesText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("contactTitle")}</h2>
          <p>{t("contactText")}</p>
        </section>

        <section className="border-t border-neutral-200 dark:border-neutral-700 pt-8 mt-8">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t("relatedText").split(locale === "es" ? "politica de privacidad" : "privacy policy")[0]}
            <Link href="/privacidad" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-2 transition-colors">
              {locale === "es" ? "politica de privacidad" : "privacy policy"}
            </Link>
            {t("relatedText").split(locale === "es" ? "politica de privacidad" : "privacy policy")[1]}
          </p>
        </section>
      </div>
    </article>
  );
}
