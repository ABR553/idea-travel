import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { packRepository } from "@/infrastructure/repositories/pack.repository";
import { blogRepository } from "@/infrastructure/repositories/blog.repository";
import { routing, type Locale } from "@/i18n/routing";
import { localizedPath } from "@/i18n/pathnames";

type StaticPage = {
  key: keyof typeof routing.pathnames;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
  lastModified: Date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let packs: Awaited<ReturnType<typeof packRepository.getAllPacks>>["data"] = [];
  try {
    const result = await packRepository.getAllPacks();
    packs = result.data;
  } catch {
    // API unavailable during build
  }

  // Fetch the blog list in every locale. A post is considered available in locale X
  // if the /blog listing in X returns it. This is resilient to the backend list
  // endpoint omitting per-post available_locales (in which case the mapper yields []).
  const blogIndex = new Map<string, {
    slug: string;
    publishedAt: string | null;
    locales: Set<Locale>;
  }>();
  for (const locale of routing.locales) {
    try {
      const result = await blogRepository.getPosts(locale, 1, 100);
      for (const post of result.data) {
        const existing = blogIndex.get(post.slug);
        if (existing) {
          existing.locales.add(locale);
        } else {
          blogIndex.set(post.slug, {
            slug: post.slug,
            publishedAt: post.publishedAt,
            locales: new Set([locale]),
          });
        }
      }
    } catch {
      // API unavailable during build for this locale
    }
  }

  const locales = routing.locales;
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const staticPages: StaticPage[] = [
    { key: "/", priority: 1, changeFrequency: "daily", lastModified: now },
    { key: "/packs", priority: 0.9, changeFrequency: "weekly", lastModified: now },
    { key: "/tienda", priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { key: "/blog", priority: 0.8, changeFrequency: "weekly", lastModified: now },
    { key: "/sobre-nosotros", priority: 0.3, changeFrequency: "monthly", lastModified: weekAgo },
    { key: "/privacidad", priority: 0.2, changeFrequency: "monthly", lastModified: weekAgo },
    { key: "/terminos", priority: 0.2, changeFrequency: "monthly", lastModified: weekAgo },
    { key: "/cookies", priority: 0.2, changeFrequency: "monthly", lastModified: weekAgo },
  ];

  const buildLocaleUrl = (locale: Locale, path: string) => {
    const suffix = path === "/" ? "" : path;
    return `${SITE_URL}/${locale}${suffix}`;
  };

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      const path = localizedPath(page.key, locale);
      entries.push({
        url: buildLocaleUrl(locale, path),
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, buildLocaleUrl(l, localizedPath(page.key, l))])
          ),
        },
      });
    }
  }

  for (const pack of packs) {
    const available = pack.availableLocales.length > 0
      ? locales.filter((l) => pack.availableLocales.includes(l))
      : [];
    if (available.length === 0) continue;

    for (const locale of available) {
      entries.push({
        url: `${SITE_URL}/${locale}/packs/${pack.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            available.map((l) => [l, `${SITE_URL}/${l}/packs/${pack.slug}`])
          ),
        },
      });
    }
  }

  for (const post of blogIndex.values()) {
    const available = [...post.locales];
    if (available.length === 0) continue;

    const lastModified = post.publishedAt ? new Date(post.publishedAt) : new Date();
    for (const locale of available) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            available.map((l) => [l, `${SITE_URL}/${l}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
