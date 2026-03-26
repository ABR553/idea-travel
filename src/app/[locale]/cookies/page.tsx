import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface CookiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CookiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiesPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CookiesPage({ params }: CookiesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cookiesPage" });

  const headingClass = "font-[family-name:var(--font-heading)] text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3";
  const subheadingClass = "font-[family-name:var(--font-heading)] text-lg font-medium text-neutral-700 dark:text-neutral-200 mb-2 mt-4";
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
          <h2 className={headingClass}>{t("typesTitle")}</h2>
          <p>{t("typesText")}</p>

          <h3 className={subheadingClass}>{t("essentialTitle")}</h3>
          <p>{t("essentialText")}</p>
          <ul className={listClass}>
            <li>{t("essentialCookie1")}</li>
            <li>{t("essentialCookie2")}</li>
          </ul>

          <h3 className={subheadingClass}>{t("analyticsTitle")}</h3>
          <p>{t("analyticsText")}</p>
          <ul className={listClass}>
            <li>{t("analyticsCookie1")}</li>
          </ul>
          <p className="mt-3">{t("analyticsPurpose")}</p>

          <h3 className={subheadingClass}>{t("marketingTitle")}</h3>
          <p>{t("marketingText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("thirdPartyTitle")}</h2>
          <p>{t("thirdPartyText")}</p>
          <ul className={listClass}>
            <li>{t("thirdParty1")}</li>
            <li>{t("thirdParty2")}</li>
            <li>{t("thirdParty3")}</li>
            <li>{t("thirdParty4")}</li>
            <li>{t("thirdParty5")}</li>
          </ul>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">{t("thirdPartyNote")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("managementTitle")}</h2>
          <p>{t("managementText")}</p>
          <ul className={listClass}>
            <li>{t("management1")}</li>
            <li>{t("management2")}</li>
          </ul>

          <h3 className={subheadingClass}>{t("browserTitle")}</h3>
          <ul className={listClass}>
            <li>{t("browserChrome")}</li>
            <li>{t("browserFirefox")}</li>
            <li>{t("browserSafari")}</li>
            <li>{t("browserEdge")}</li>
          </ul>
        </section>

        <section>
          <h2 className={headingClass}>{t("retentionTitle")}</h2>
          <p>{t("retentionText")}</p>
          <ul className={listClass}>
            <li>{t("retention1")}</li>
            <li>{t("retention2")}</li>
            <li>{t("retention3")}</li>
          </ul>
        </section>

        <section>
          <h2 className={headingClass}>{t("legalTitle")}</h2>
          <p>{t("legalText")}</p>
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
