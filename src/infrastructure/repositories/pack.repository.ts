import type { IPackService } from "@/domain/services/pack.service";
import type { PackListItem, PackDetail, PackFiltersParams } from "@/domain/models/pack.types";
import type { PaginatedResponse } from "@/domain/models/common.types";
import { apiFetch, ApiError } from "@/infrastructure/api/client";
import {
  mapPackListItem,
  mapPackDetail,
  mapPaginatedResponse,
  type ApiPackListResponse,
  type ApiPackResponse,
  type ApiPaginatedResponse,
} from "@/infrastructure/api/mappers";

export class PackRepository implements IPackService {
  async getAllPacks(
    locale: string = "es",
    page: number = 1,
    pageSize: number = 50,
    filters: PackFiltersParams = {}
  ): Promise<PaginatedResponse<PackListItem>> {
    const params: Record<string, string | number | boolean | undefined> = {
      page,
      page_size: pageSize,
      featured: filters.featured,
      min_price: filters.minPrice,
      max_price: filters.maxPrice,
      min_days: filters.minDays,
      max_days: filters.maxDays,
      min_destinations: filters.minDestinations,
      max_destinations: filters.maxDestinations,
      search: filters.search,
      sort_by: filters.sortBy,
    };

    const response = await apiFetch<ApiPaginatedResponse<ApiPackListResponse>>("/packs", {
      locale,
      params,
    });
    return mapPaginatedResponse(response, mapPackListItem);
  }

  async getPackBySlug(slug: string, locale: string = "es"): Promise<PackDetail | null> {
    try {
      const response = await apiFetch<ApiPackResponse>(`/packs/${slug}`, { locale, revalidate: 3600 });
      return mapPackDetail(response);
    } catch (error) {
      if (error instanceof ApiError && error.isNotFound) {
        return null;
      }
      throw error;
    }
  }

  async getFeaturedPacks(locale: string = "es"): Promise<PackListItem[]> {
    const response = await apiFetch<ApiPackListResponse[]>("/packs/featured", { locale });
    return response.map(mapPackListItem);
  }
}

export const packRepository = new PackRepository();
