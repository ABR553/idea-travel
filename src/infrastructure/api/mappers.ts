import type { PriceRange, PaginatedResponse } from "@/domain/models/common.types";
import type {
  PackListItem,
  PackDetail,
  Destination,
  DestinationDetail,
  Accommodation,
  AccommodationTier,
  Experience,
  ExperienceProvider,
  RouteStep,
} from "@/domain/models/pack.types";
import type { Product } from "@/domain/models/product.types";

// --- API response types (snake_case) ---

interface ApiPriceRange {
  from: number;
  to: number;
  currency: string;
}

interface ApiDestination {
  name: string;
  country: string;
  description: string;
  image: string;
}

interface ApiAccommodation {
  id: string;
  name: string;
  tier: string;
  description: string;
  price_per_night: number;
  currency: string;
  image: string;
  amenities: string[];
  rating: number;
  booking_url?: string | null;
  clicks_last_24h?: number;
}

interface ApiExperience {
  id: string;
  title: string;
  description: string;
  provider: string;
  affiliate_url: string;
  price: number;
  currency: string;
  duration: string;
  image: string;
  rating: number;
  clicks_last_24h?: number;
}

interface ApiDestinationDetail extends ApiDestination {
  accommodations: ApiAccommodation[];
  experiences: ApiExperience[];
}

interface ApiRouteStep {
  day: number;
  title: string;
  description: string;
  destination: string;
}

export interface ApiPackListResponse {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  destinations: ApiDestination[];
  cover_image: string;
  duration: string;
  duration_days: number;
  price: ApiPriceRange;
  featured: boolean;
}

export interface ApiPackResponse {
  id: string;
  slug: string;
  title: string;
  description: string;
  short_description: string;
  destinations: ApiDestinationDetail[];
  route: ApiRouteStep[];
  cover_image: string;
  duration: string;
  duration_days: number;
  price: ApiPriceRange;
  featured: boolean;
}

export interface ApiProductResponse {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  affiliate_url: string;
  image: string;
  rating: number;
}

export interface ApiPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// --- Validators ---

const VALID_TIERS = new Set<AccommodationTier>(["budget", "standard", "premium"]);
const VALID_PROVIDERS = new Set<ExperienceProvider>(["getyourguide", "civitatis"]);
const VALID_CATEGORIES = new Set<Product["category"]>(["luggage", "electronics", "accessories", "comfort", "photography"]);

function validateTier(tier: string): AccommodationTier {
  return VALID_TIERS.has(tier as AccommodationTier) ? (tier as AccommodationTier) : "standard";
}

function validateProvider(provider: string): ExperienceProvider {
  return VALID_PROVIDERS.has(provider as ExperienceProvider) ? (provider as ExperienceProvider) : "getyourguide";
}

function validateCategory(category: string): Product["category"] {
  return VALID_CATEGORIES.has(category as Product["category"]) ? (category as Product["category"]) : "accessories";
}

// --- Mappers ---

function mapPriceRange(api: ApiPriceRange): PriceRange {
  return { from: api.from, to: api.to, currency: api.currency };
}

function mapDestination(api: ApiDestination): Destination {
  return {
    name: api.name,
    country: api.country,
    description: api.description,
    image: api.image,
  };
}

function mapAccommodation(api: ApiAccommodation): Accommodation {
  return {
    id: api.id,
    name: api.name,
    tier: validateTier(api.tier),
    description: api.description,
    pricePerNight: api.price_per_night,
    currency: api.currency,
    image: api.image,
    amenities: api.amenities,
    rating: api.rating,
    bookingUrl: api.booking_url ?? undefined,
    clicksLast24h: api.clicks_last_24h,
  };
}

function mapExperience(api: ApiExperience): Experience {
  return {
    id: api.id,
    title: api.title,
    description: api.description,
    provider: validateProvider(api.provider),
    affiliateUrl: api.affiliate_url,
    price: api.price,
    currency: api.currency,
    duration: api.duration,
    image: api.image,
    rating: api.rating,
    clicksLast24h: api.clicks_last_24h,
  };
}

function mapDestinationDetail(api: ApiDestinationDetail): DestinationDetail {
  return {
    ...mapDestination(api),
    accommodations: api.accommodations.map(mapAccommodation),
    experiences: api.experiences.map(mapExperience),
  };
}

function mapRouteStep(api: ApiRouteStep): RouteStep {
  return {
    day: api.day,
    title: api.title,
    description: api.description,
    destination: api.destination,
  };
}

export function mapPackListItem(api: ApiPackListResponse): PackListItem {
  return {
    id: api.id,
    slug: api.slug,
    title: api.title,
    shortDescription: api.short_description,
    destinations: api.destinations.map(mapDestination),
    coverImage: api.cover_image,
    duration: api.duration,
    durationDays: api.duration_days,
    price: mapPriceRange(api.price),
    featured: api.featured,
  };
}

export function mapPackDetail(api: ApiPackResponse): PackDetail {
  return {
    id: api.id,
    slug: api.slug,
    title: api.title,
    description: api.description,
    shortDescription: api.short_description,
    destinations: api.destinations.map(mapDestinationDetail),
    route: api.route.map(mapRouteStep),
    coverImage: api.cover_image,
    duration: api.duration,
    durationDays: api.duration_days,
    price: mapPriceRange(api.price),
    featured: api.featured,
  };
}

export function mapProduct(api: ApiProductResponse): Product {
  return {
    id: api.id,
    slug: api.slug,
    name: api.name,
    description: api.description,
    category: validateCategory(api.category),
    price: api.price,
    currency: api.currency,
    affiliateUrl: api.affiliate_url,
    image: api.image,
    rating: api.rating,
  };
}

export function mapPaginatedResponse<TApi, TDomain>(
  api: ApiPaginatedResponse<TApi>,
  mapper: (item: TApi) => TDomain
): PaginatedResponse<TDomain> {
  return {
    data: api.data.map(mapper),
    total: api.total,
    page: api.page,
    pageSize: api.pageSize,
  };
}
