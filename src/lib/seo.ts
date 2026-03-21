import type { PackDetail } from "@/domain/models/pack.types";
import type { Product } from "@/domain/models/product.types";
import { SITE_NAME, SITE_URL } from "./constants";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function generateTouristTripJsonLd(pack: PackDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pack.title,
    description: pack.description,
    touristType: "Adventure",
    itinerary: {
      "@type": "ItemList",
      numberOfItems: pack.route.length,
      itemListElement: pack.route.map((step) => ({
        "@type": "ListItem",
        position: step.day,
        name: step.title,
        description: step.description,
      })),
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: pack.price.from,
      highPrice: pack.price.to,
      priceCurrency: pack.price.currency,
    },
  };
}

export function generateProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      bestRating: 5,
    },
  };
}
