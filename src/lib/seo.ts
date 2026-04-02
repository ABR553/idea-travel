import type { PackDetail } from "@/domain/models/pack.types";
import type { Product } from "@/domain/models/product.types";
import type { BlogPostListItem, BlogPost } from "@/domain/models/blog.types";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from "./constants";

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

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description: SITE_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@tengounviaje.com",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ["es", "en"],
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/es/packs?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateItemListJsonLd(items: { name: string; url: string; image?: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
      ...(item.image && { image: item.image }),
    })),
  };
}

export function generateFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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

export function generateBlogListJsonLd(posts: BlogPostListItem[], locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/${locale}/blog`,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage,
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      datePublished: post.publishedAt,
    })),
  };
}

export function generateBlogPostJsonLd(post: BlogPost, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    url: `${SITE_URL}/${locale}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
