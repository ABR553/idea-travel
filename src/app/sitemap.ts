import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { packRepository } from "@/infrastructure/repositories/pack.repository";
import { blogRepository } from "@/infrastructure/repositories/blog.repository";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let packs: Awaited<ReturnType<typeof packRepository.getAllPacks>>["data"] = [];
  try {
    const result = await packRepository.getAllPacks();
    packs = result.data;
  } catch {
    // API unavailable during build
  }

  let blogPosts: Awaited<ReturnType<typeof blogRepository.getPosts>>["data"] = [];
  try {
    const result = await blogRepository.getPosts("es", 1, 100);
    blogPosts = result.data;
  } catch {
    // API unavailable during build
  }
  const locales = routing.locales;

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const staticPages = [
    { path: "", priority: 1, changeFrequency: "daily" as const, lastModified: now },
    { path: "/packs", priority: 0.9, changeFrequency: "weekly" as const, lastModified: now },
    { path: "/tienda", priority: 0.7, changeFrequency: "weekly" as const, lastModified: now },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const, lastModified: now },
    { path: "/sobre-nosotros", priority: 0.3, changeFrequency: "monthly" as const, lastModified: weekAgo },
    { path: "/privacidad", priority: 0.2, changeFrequency: "monthly" as const, lastModified: weekAgo },
    { path: "/terminos", priority: 0.2, changeFrequency: "monthly" as const, lastModified: weekAgo },
    { path: "/cookies", priority: 0.2, changeFrequency: "monthly" as const, lastModified: weekAgo },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      let localizedPath = page.path;
      if (locale === "en") {
        localizedPath = localizedPath.replace("/tienda", "/shop");
      }

      entries.push({
        url: `${SITE_URL}/${locale}${localizedPath}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => {
              let altPath = page.path;
              if (l === "en") {
                altPath = altPath.replace("/tienda", "/shop");
              }
              return [l, `${SITE_URL}/${l}${altPath}`];
            })
          ),
        },
      });
    }
  }

  for (const pack of packs) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/packs/${pack.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/packs/${pack.slug}`])
          ),
        },
      });
    }
  }

  for (const post of blogPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
