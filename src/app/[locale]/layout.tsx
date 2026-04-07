import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { CookieBanner } from "@/components/organisms/CookieBanner";
import { GoogleAnalytics } from "@/components/atoms/GoogleAnalytics";
import { PageTracker } from "@/components/atoms/PageTracker";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";
import "@/styles/globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
  },
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${plusJakarta.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('idea-travel-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <meta name="google-site-verification" content="_K9jSkqzqdZjEt2CF7W9JRkDxlhldYzQD98VmKb2kD8" />
        <meta name="color-scheme" content="light dark" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://m.media-amazon.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#0C0A09] text-neutral-600 dark:text-neutral-300 antialiased transition-colors duration-[var(--duration-normal)]">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2"
          >
            {locale === "es" ? "Saltar al contenido principal" : "Skip to main content"}
          </a>
          <Header />
          <main id="main-content" className="flex-1 pt-[calc(2rem+4rem)]">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <GoogleAnalytics />
          <PageTracker />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
