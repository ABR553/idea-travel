# Feature: Home page shows maletas and mochilas_cabina products

**Date:** 2026-04-02
**Proyecto:** idea-travel

## Descripcion
The home page "Popular Products" section now shows products from the `maletas` and `mochilas_cabina` categories (up to 4 from each, 8 total) instead of a generic all-products query.

## Archivos modificados
- `src/domain/models/product.types.ts` — added `maletas` and `mochilas_cabina` to `ProductCategory` union type and their Spanish labels to `PRODUCT_CATEGORY_LABELS`
- `src/app/[locale]/page.tsx` — replaced `getAllProducts(locale, 1, 4)` with two parallel `getProductsByCategory` calls merged into one array

## Decisiones tecnicas
- Both category fetches run in parallel via `Promise.all` to avoid sequential latency.
- Up to 4 products per category (8 total) are passed to `ProductGrid` on the home page.
- `getProductsByCategory` already existed in `ProductRepository`; no repository changes needed.

## Verificacion
- Home page renders products from `maletas` and `mochilas_cabina` categories
- If one category has no products, the other still renders correctly (empty array merges gracefully)
