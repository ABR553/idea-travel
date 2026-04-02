export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
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
