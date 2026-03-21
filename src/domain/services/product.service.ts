import type { Product, ProductCategory } from "@/domain/models/product.types";
import type { PaginatedResponse } from "@/domain/models/common.types";

export interface IProductService {
  getAllProducts(locale?: string, page?: number, pageSize?: number): Promise<PaginatedResponse<Product>>;
  getProductsByCategory(category: ProductCategory, locale?: string, page?: number, pageSize?: number): Promise<PaginatedResponse<Product>>;
  getCategories(): Promise<string[]>;
}
