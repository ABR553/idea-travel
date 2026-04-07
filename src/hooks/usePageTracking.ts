"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

/**
 * Hook que trackea page_view en GA4 cada vez que cambia la ruta (navegacion SPA).
 * Se monta una vez en el layout raiz.
 */
export function usePageTracking(): void {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      trackPageView(pathname);
      prevPathname.current = pathname;
    }
  }, [pathname]);
}
