import type { Product } from "@/domain/models/product.types";
import { ProductCard } from "@/components/molecules/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-[fadeInUp_var(--duration-slower)_var(--ease-out)_both]"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
