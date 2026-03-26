import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// TODO: Actualizar "Tengo Un Viaje" con el nombre legal real cuando se constituya como autonomo o empresa
export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });

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
          <h2 className={headingClass}>{t("controllerTitle")}</h2>
          <p>{t("controllerText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("dataTitle")}</h2>
          <p>{t("dataText")}</p>
          <ul className={listClass}>
            <li>{t("dataCookies")}</li>
            <li>{t("dataAffiliate")}</li>
          </ul>
        </section>

        <section>
          <h2 className={headingClass}>{t("purposeTitle")}</h2>
          <p>{t("purposeText")}</p>
          <ul className={listClass}>
            <li>{t("purpose1")}</li>
            <li>{t("purpose2")}</li>
          </ul>
        </section>

        <section>
          <h2 className={headingClass}>{t("legalBasisTitle")}</h2>
          <p>{t("legalBasisText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("cookiesTitle")}</h2>
          <p>{t("cookiesText")}</p>
          <ul className={listClass}>
            <li>{t("cookiesEssential")}</li>
            <li>{t("cookiesAnalytics")}</li>
          </ul>
          <p className="mt-3">
            {t("cookiesMoreInfo").split(locale === "es" ? "pagina de cookies" : "cookies page")[0]}
            <Link href="/cookies" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-2 transition-colors">
              {locale === "es" ? "pagina de cookies" : "cookies page"}
            </Link>
            {t("cookiesMoreInfo").split(locale === "es" ? "pagina de cookies" : "cookies page")[1]}
          </p>
        </section>

        <section>
          <h2 className={headingClass}>{t("affiliateTitle")}</h2>
          <p>{t("affiliateText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("rightsTitle")}</h2>
          <p>{t("rightsText")}</p>
          <ul className={listClass}>
            <li><strong>{t("rightAccess").split(":")[0]}:</strong>{t("rightAccess").split(":").slice(1).join(":")}</li>
            <li><strong>{t("rightRectification").split(":")[0]}:</strong>{t("rightRectification").split(":").slice(1).join(":")}</li>
            <li><strong>{t("rightErasure").split(":")[0]}:</strong>{t("rightErasure").split(":").slice(1).join(":")}</li>
            <li><strong>{t("rightPortability").split(":")[0]}:</strong>{t("rightPortability").split(":").slice(1).join(":")}</li>
            <li><strong>{t("rightObjection").split(":")[0]}:</strong>{t("rightObjection").split(":").slice(1).join(":")}</li>
          </ul>
          <p className="mt-3">{t("rightsContact")}</p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{t("rightsAuthority")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("retentionTitle")}</h2>
          <p>{t("retentionText")}</p>
        </section>

        <section>
          <h2 className={headingClass}>{t("changesTitle")}</h2>
          <p>{t("changesText")}</p>
        </section>
      </div>
    </article>
  );
}
