import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { packRepository } from "@/infrastructure/repositories/pack.repository";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: packs } = await packRepository.getAllPacks();
  const locales = routing.locales;

  const staticPages = [
    { path: "", priority: 1, changeFrequency: "daily" as const },
    { path: "/packs", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/tienda", priority: 0.7, changeFrequency: "weekly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      let localizedPath = page.path;
      if (locale === "en") {
        localizedPath = localizedPath
          .replace("/vuelos", "/flights")
          .replace("/tienda", "/shop");
      }

      entries.push({
        url: `${SITE_URL}/${locale}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => {
              let altPath = page.path;
              if (l === "en") {
                altPath = altPath
                  .replace("/vuelos", "/flights")
                  .replace("/tienda", "/shop");
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

  return entries;
}
