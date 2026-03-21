const LOCALE_MAP: Record<string, string> = {
  es: "es-ES",
  en: "en-US",
};

function getIntlLocale(locale?: string): string {
  return locale ? (LOCALE_MAP[locale] ?? "es-ES") : "es-ES";
}

export function formatPrice(price: number, currency: string = "EUR", locale?: string): string {
  return new Intl.NumberFormat(getIntlLocale(locale), {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceDecimal(price: number, currency: string = "EUR", locale?: string): string {
  return new Intl.NumberFormat(getIntlLocale(locale), {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
