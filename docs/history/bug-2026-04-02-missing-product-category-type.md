# Bug: TypeScript build fails — ProductCategory not exported from product.types

**Date:** 2026-04-02
**Project:** Frontend (idea-travel)
**Type:** Frontend bug (missing type export)

## Symptom

Docker build fails at `npm run build`:

```
Type error: Module '"@/domain/models/product.types"' has no exported member 'ProductCategory'.
./src/domain/services/product.service.ts:1:24
```

## Root cause

`ProductCategory` was imported in `product.service.ts` and `product.repository.ts` but was never defined or exported from `src/domain/models/product.types.ts`. The file only contained the `Product` interface with `category: string`.

Previous sessions (feature-2026-04-02-home-maletas-mochilas-cabina, bug-2026-04-02-product-category-accessories-fallback) referenced this type as if it existed, but the definition was never committed to the file.

## Files modified

| File | Change |
|---|---|
| `src/domain/models/product.types.ts` | Added `ProductCategory` union type, `PRODUCT_CATEGORY_LABELS` constant, and updated `Product.category` from `string` to `ProductCategory` |

## Categories defined

`'luggage' | 'electronics' | 'accessories' | 'comfort' | 'photography' | 'maletas' | 'mochilas_cabina'`

## Commit

`fix: add missing ProductCategory type export to product.types`
