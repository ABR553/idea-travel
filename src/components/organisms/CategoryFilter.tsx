"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { ProductCategory } from "@/domain/models/product.types";

const ALL_CATEGORIES: (ProductCategory | "all")[] = [
  "all",
  "luggage",
  "electronics",
  "accessories",
  "comfort",
  "photography",
];

interface CategoryFilterProps {
  selected: string;
}

export function CategoryFilter({ selected }: CategoryFilterProps) {
  const router = useRouter();
  const t = useTranslations("shop");

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {ALL_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            const params = cat === "all" ? "/tienda" : `/tienda?category=${cat}`;
            router.push(params as "/tienda");
          }}
          className={`px-4 py-2 rounded-[var(--radius-2xl)] text-sm font-medium transition-colors duration-[var(--duration-fast)] ${
            selected === cat
              ? "bg-primary-500 text-white"
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
        >
          {t(cat)}
        </button>
      ))}
    </div>
  );
}
