export type ProductCategory =
  | "luggage"
  | "electronics"
  | "accessories"
  | "comfort"
  | "photography"
  | "maletas"
  | "mochilas_cabina";

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  luggage: "Maletas",
  electronics: "Electrónica",
  accessories: "Accesorios",
  comfort: "Confort",
  photography: "Fotografía",
  maletas: "Maletas",
  mochilas_cabina: "Mochilas de cabina",
};

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
