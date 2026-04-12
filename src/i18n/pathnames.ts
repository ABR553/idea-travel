import { routing, type Locale } from "./routing";

type PathnameKey = keyof typeof routing.pathnames;

export function localizedPath(key: PathnameKey, locale: Locale): string {
  const entry = routing.pathnames[key];
  if (typeof entry === "string") return entry;
  return entry[locale];
}
