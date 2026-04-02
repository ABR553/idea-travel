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
    "/tienda": {
      es: "/tienda",
      en: "/shop",
    },
    "/sobre-nosotros": {
      es: "/sobre-nosotros",
      en: "/about-us",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/privacidad": {
      es: "/privacidad",
      en: "/privacy",
    },
    "/terminos": {
      es: "/terminos",
      en: "/terms",
    },
    "/cookies": "/cookies",
  },
});
