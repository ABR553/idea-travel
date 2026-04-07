"use client";

import { useEffect } from "react";
import { trackPackView } from "@/lib/analytics";

interface PackViewTrackerProps {
  packName: string;
  packSlug: string;
  destinationCount: number;
}

/**
 * Componente invisible que dispara el evento pack_view en GA4 al montarse.
 * Se usa en la pagina de detalle del pack (Server Component).
 */
export function PackViewTracker({ packName, packSlug, destinationCount }: PackViewTrackerProps) {
  useEffect(() => {
    trackPackView({
      pack_name: packName,
      pack_slug: packSlug,
      destination_count: destinationCount,
    });
  }, [packName, packSlug, destinationCount]);

  return null;
}
