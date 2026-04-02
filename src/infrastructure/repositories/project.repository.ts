import type { Project } from "@/domain/models/project.types";
import type { Product } from "@/domain/models/product.types";
import type { PaginatedResponse } from "@/domain/models/common.types";
import { apiFetch } from "@/infrastructure/api/client";
import {
  mapProject,
  mapProduct,
  mapPaginatedResponse,
  type ApiProjectResponse,
  type ApiProductResponse,
  type ApiPaginatedResponse,
} from "@/infrastructure/api/mappers";

export class ProjectRepository {
  async getAllProjects(): Promise<Project[]> {
    const response = await apiFetch<ApiProjectResponse[]>("/projects");
    return response.map(mapProject);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const response = await apiFetch<ApiProjectResponse>(`/projects/${slug}`);
      return mapProject(response);
    } catch {
      return null;
    }
  }

  async getProjectCategories(slug: string): Promise<string[]> {
    return apiFetch<string[]>(`/projects/${slug}/products/categories`);
  }

  async getProjectProducts(
    slug: string,
    locale: string = "es",
    page: number = 1,
    pageSize: number = 50,
    params?: {
      category?: string;
      min_price?: number;
      max_price?: number;
      min_rating?: number;
      sort_by?: string;
    }
  ): Promise<PaginatedResponse<Product>> {
    const response = await apiFetch<ApiPaginatedResponse<ApiProductResponse>>(
      `/projects/${slug}/products`,
      { locale, params: { page, page_size: pageSize, ...params } }
    );
    return mapPaginatedResponse(response, mapProduct);
  }
}

export const projectRepository = new ProjectRepository();
