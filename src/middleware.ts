import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware({ ...routing, alternateLinks: false });

export default function middleware(req: NextRequest) {
  const response = intlMiddleware(req);
  // Upgrade next-intl's 307 temporary redirects (e.g. / → /es, /packs/x → /es/packs/x)
  // to 308 permanent so Google consolidates signals onto the localized URL.
  if (response.status === 307) {
    const location = response.headers.get("location");
    if (location) {
      const permanent = NextResponse.redirect(new URL(location, req.url), 308);
      const setCookie = response.headers.get("set-cookie");
      if (setCookie) permanent.headers.set("set-cookie", setCookie);
      return permanent;
    }
  }
  return response;
}

export const config = {
  matcher: [
    "/",
    "/(es|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
