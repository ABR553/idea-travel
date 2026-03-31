export type ProductCategory =
  | "luggage"
  | "electronics"
  | "accessories"
  | "comfort"
  | "photography";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  currency: string;
  affiliateUrl: string;
  image: string;
  images: string[];
  rating: number;
  externalId?: string | null;
  projectId?: string | null;
  link?: string | null;
}

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  luggage: "Equipaje",
  electronics: "Electronica",
  accessories: "Accesorios",
  comfort: "Confort",
  photography: "Fotografia",
};
