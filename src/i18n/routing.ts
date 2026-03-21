import { defineRouting } from "next-intl/routing";

export type Locale = "es" | "en";

export const routing = defineRouting({
  locales: ["es", "en"] as const,
  defaultLocale: "es",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/packs": "/packs",
    "/packs/[slug]": "/packs/[slug]",
    "/vuelos": {
      es: "/vuelos",
      en: "/flights",
    },
    "/tienda": {
      es: "/tienda",
      en: "/shop",
    },
  },
});
