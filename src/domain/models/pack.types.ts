import type { PriceRange } from "./common.types";

export interface Destination {
  name: string;
  country: string;
  description: string;
  image: string;
}

export interface DestinationDetail extends Destination {
  accommodations: Accommodation[];
  experiences: Experience[];
}

export interface RecommendedProduct {
  slug: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  affiliateUrl: string;
  contextText: string | null;
}

export interface RouteStep {
  day: number;
  title: string;
  description: string;
  destination: string;
  detailedDescription: string | null;
  recommendedProducts: RecommendedProduct[];
}

export type AccommodationTier = "budget" | "standard" | "premium";

export interface Accommodation {
  id: string;
  name: string;
  tier: AccommodationTier;
  description: string;
  pricePerNight: number;
  currency: string;
  image: string;
  amenities: string[];
  rating: number;
  bookingUrl?: string;
  clicksLast24h?: number;
}

export type ExperienceProvider = "getyourguide" | "civitatis";

export interface Experience {
  id: string;
  title: string;
  description: string;
  provider: ExperienceProvider;
  affiliateUrl: string;
  price: number;
  currency: string;
  duration: string;
  image: string;
  rating: number;
  clicksLast24h?: number;
}

export interface PackListItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  destinations: Destination[];
  coverImage: string;
  duration: string;
  durationDays: number;
  price: PriceRange;
  featured: boolean;
}

export type PackSortBy = "price_asc" | "price_desc" | "duration_asc" | "duration_desc";

export interface PackFiltersParams {
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minDays?: number;
  maxDays?: number;
  minDestinations?: number;
  maxDestinations?: number;
  search?: string;
  sortBy?: PackSortBy;
}

export interface PackDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  destinations: DestinationDetail[];
  route: RouteStep[];
  coverImage: string;
  duration: string;
  durationDays: number;
  price: PriceRange;
  featured: boolean;
}
