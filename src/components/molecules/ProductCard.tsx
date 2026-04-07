"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Product } from "@/domain/models/product.types";

function formatCategory(cat: string): string {
  return cat.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
import { Badge } from "@/components/atoms/Badge";
import { Rating } from "@/components/atoms/Rating";
import { formatPriceDecimal } from "@/lib/format";
import { trackAffiliateClick } from "@/lib/analytics";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("shop");

  // Galería: usa images del backend; fallback a image si images está vacío
  const allImages = product.images.filter((img): img is string => Boolean(img)).length > 0
    ? product.images.filter((img): img is string => Boolean(img))
    : [product.image].filter((img): img is string => Boolean(img));
  const [activeIndex, setActiveIndex] = useState(0);

  const hasManyImages = allImages.length > 1;

  const prev = () => setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveIndex((i) => (i + 1) % allImages.length);

  return (
    <article className="group bg-white dark:bg-neutral-800 rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-md)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-in-out)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-700">
        <Image
          src={allImages[activeIndex] ?? ''}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3">
          {formatCategory(product.category)}
        </Badge>

        {hasManyImages && (
          <>
            <button
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-fast)] hover:bg-white dark:hover:bg-neutral-900 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-fast)] hover:bg-white dark:hover:bg-neutral-900 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Indicadores de punto */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-[var(--duration-fast)] ${
                    i === activeIndex
                      ? "bg-neutral-800 dark:bg-white w-3"
                      : "bg-neutral-400 dark:bg-neutral-500"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 mb-2 line-clamp-2 font-[family-name:var(--font-heading)]">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-3">
          {product.description}
        </p>
        <Rating value={product.rating} className="mb-4" />
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
            {formatPriceDecimal(product.price, product.currency)}
          </span>
          <a
            href={product.link ?? product.affiliateUrl}
            rel="noopener nofollow sponsored"
            target="_blank"
            onClick={() => trackAffiliateClick({ provider: "amazon", item_name: product.name, url: product.link ?? product.affiliateUrl })}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-[var(--radius-lg)] bg-[#FF9900] text-white text-sm font-semibold transition-all duration-[var(--duration-fast)] hover:bg-[#E88B00] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-2"
          >
            {t("viewOnAmazon")}
          </a>
        </div>
      </div>
    </article>
  );
}
