import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
  async headers() {
    // Non-HTML assets that Google crawls (because they're referenced from <head>)
    // but should not appear in search results. Keeps them reachable for PWA /
    // social previews while removing them from GSC's "Crawled — not indexed".
    const noindex = { key: "X-Robots-Tag", value: "noindex" };
    return [
      { source: "/manifest.json", headers: [noindex] },
      { source: "/opengraph-image", headers: [noindex] },
      { source: "/icon.png", headers: [noindex] },
    ];
  },
};

export default withNextIntl(nextConfig);
