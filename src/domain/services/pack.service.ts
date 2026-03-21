import type { PackListItem, PackDetail, PackFiltersParams } from "@/domain/models/pack.types";
import type { PaginatedResponse } from "@/domain/models/common.types";

export interface IPackService {
  getAllPacks(locale?: string, page?: number, pageSize?: number, filters?: PackFiltersParams): Promise<PaginatedResponse<PackListItem>>;
  getPackBySlug(slug: string, locale?: string): Promise<PackDetail | null>;
  getFeaturedPacks(locale?: string): Promise<PackListItem[]>;
}
