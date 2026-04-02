export interface Project {
  id: string;
  slug: string;
  name: string;
  tagId: string;
}

/**
 * Slug del proyecto activo en esta instancia del frontend.
 * Constante fija — no usar variables de entorno.
 */
export const CURRENT_PROJECT_SLUG = "tengounviaje-21" as const;
