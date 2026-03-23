import type { IBlogService } from "@/domain/services/blog.service";
import type { BlogPostListItem, BlogPost } from "@/domain/models/blog.types";
import type { PaginatedResponse } from "@/domain/models/common.types";
import { apiFetch, ApiError } from "@/infrastructure/api/client";

interface ApiBlogListResponse {
  data: BlogPostListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export class BlogRepository implements IBlogService {
  async getPosts(
    locale: string = "es",
    page: number = 1,
    pageSize: number = 10,
    category?: string
  ): Promise<PaginatedResponse<BlogPostListItem>> {
    const params: Record<string, string | number> = { page, page_size: pageSize };
    if (category) params.category = category;

    const response = await apiFetch<ApiBlogListResponse>("/blog", {
      locale,
      params,
    });
    return {
      data: response.data,
      total: response.total,
      page: response.page,
      pageSize: response.pageSize,
    };
  }

  async getPostBySlug(slug: string, locale: string = "es"): Promise<BlogPost | null> {
    try {
      return await apiFetch<BlogPost>(`/blog/${slug}`, { locale });
    } catch (error) {
      if (error instanceof ApiError && error.isNotFound) {
        return null;
      }
      throw error;
    }
  }

  async getCategories(): Promise<string[]> {
    return apiFetch<string[]>("/blog/categories");
  }
}

export const blogRepository = new BlogRepository();
