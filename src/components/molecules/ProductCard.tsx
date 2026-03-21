import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Product } from "@/domain/models/product.types";
import { Badge } from "@/components/atoms/Badge";
import { Rating } from "@/components/atoms/Rating";
import { formatPriceDecimal } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("shop");

  return (
    <article className="group bg-white dark:bg-neutral-800 rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-md)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-in-out)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-700">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3">
          {t(product.category)}
        </Badge>
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
            href={product.affiliateUrl}
            rel="noopener nofollow sponsored"
            target="_blank"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-[var(--radius-lg)] bg-[#FF9900] text-white text-sm font-semibold transition-all duration-[var(--duration-fast)] hover:bg-[#E88B00] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-2"
          >
            {t("viewOnAmazon")}
          </a>
        </div>
      </div>
    </article>
  );
}
