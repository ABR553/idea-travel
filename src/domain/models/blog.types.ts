export type BlogCategory = "guia" | "presupuesto" | "epoca" | "consejos" | "lista";

export interface BlogPostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  publishedAt: string | null;
  relatedPackSlug: string | null;
  availableLocales: string[];
}

export interface BlogPost extends BlogPostListItem {
  content: string;
}
