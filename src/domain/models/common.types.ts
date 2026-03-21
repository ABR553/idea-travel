export interface PriceRange {
  from: number;
  to: number;
  currency: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface SeoMetadata {
  title: string;
  description: string;
  ogImage?: string;
}
