import type { IProductService } from "@/domain/services/product.service";
import type { Product, ProductCategory } from "@/domain/models/product.types";
import type { PaginatedResponse } from "@/domain/models/common.types";
import { apiFetch } from "@/infrastructure/api/client";
import {
  mapProduct,
  mapPaginatedResponse,
  type ApiProductResponse,
  type ApiPaginatedResponse,
} from "@/infrastructure/api/mappers";

export class ProductRepository implements IProductService {
  async getAllProducts(
    locale: string = "es",
    page: number = 1,
    pageSize: number = 50
  ): Promise<PaginatedResponse<Product>> {
    const response = await apiFetch<ApiPaginatedResponse<ApiProductResponse>>("/products", {
      locale,
      params: { page, page_size: pageSize },
    });
    return mapPaginatedResponse(response, mapProduct);
  }

  async getProductsByCategory(
    category: ProductCategory,
    locale: string = "es",
    page: number = 1,
    pageSize: number = 50
  ): Promise<PaginatedResponse<Product>> {
    const response = await apiFetch<ApiPaginatedResponse<ApiProductResponse>>("/products", {
      locale,
      params: { category, page, page_size: pageSize },
    });
    return mapPaginatedResponse(response, mapProduct);
  }

  async getCategories(): Promise<string[]> {
    return apiFetch<string[]>("/products/categories");
  }
}

export const productRepository = new ProductRepository();
