import Link from "next/link";
import { getLocale } from "next-intl/server";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export async function Breadcrumbs({ items }: BreadcrumbsProps) {
  const locale = await getLocale();
  const jsonLd = generateBreadcrumbJsonLd(items);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const localizedUrl = item.url === "/" ? `/${locale}` : `/${locale}${item.url}`;
          return (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span className="text-neutral-800 dark:text-neutral-100 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={localizedUrl}
                  className="hover:text-primary-600 transition-colors duration-[var(--duration-fast)]"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
