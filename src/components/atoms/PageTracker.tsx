"use client";

import { usePageTracking } from "@/hooks/usePageTracking";

/**
 * Componente invisible que trackea page_view en GA4 en navegacion SPA.
 * Se monta en el layout raiz.
 */
export function PageTracker() {
  usePageTracking();
  return null;
}
