import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/atoms/Button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <p className="text-6xl font-extrabold text-primary-500 font-[family-name:var(--font-heading)] mb-4">
          {t("code")}
        </p>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] mb-4">
          {t("title")}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8">
          {t("description")}
        </p>
        <Link href="/">
          <Button>{t("backHome")}</Button>
        </Link>
      </div>
    </div>
  );
}
