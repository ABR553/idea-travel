import type { PaginatedResponse } from "@/domain/models/common.types";
import type { BlogPostListItem, BlogPost } from "@/domain/models/blog.types";

export interface IBlogService {
  getPosts(
    locale?: string,
    page?: number,
    pageSize?: number,
    category?: string
  ): Promise<PaginatedResponse<BlogPostListItem>>;

  getPostBySlug(slug: string, locale?: string): Promise<BlogPost | null>;

  getCategories(): Promise<string[]>;
}
