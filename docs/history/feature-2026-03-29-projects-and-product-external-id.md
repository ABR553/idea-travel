# Feature: Project integration and computed product link in shop

**Date:** 2026-03-29

## Description

Integrated the new `Project` model from the backend. The shop (`/tienda`) now fetches products via the project-specific endpoint (`/projects/idea-travel/products`). Products carry a computed `link` field from the backend, which is used as the purchase URL in `ProductCard` (with fallback to `affiliateUrl`).

## Files created

- `src/domain/models/project.types.ts` — `Project` interface + `CURRENT_PROJECT_SLUG = "idea-travel"` constant
- `src/infrastructure/repositories/project.repository.ts` — `ProjectRepository` with `getAllProjects`, `getProjectBySlug`, `getProjectProducts`

## Files modified

- `src/domain/models/product.types.ts` — Added `externalId?`, `projectId?`, `link?` to `Product`
- `src/infrastructure/api/mappers.ts` — Added `ApiProjectResponse`, `mapProject`; updated `ApiProductResponse` and `mapProduct` with new fields
- `src/app/[locale]/tienda/page.tsx` — Uses `projectRepository.getProjectProducts(CURRENT_PROJECT_SLUG, ...)` instead of `productRepository`
- `src/components/molecules/ProductCard.tsx` — Buy button uses `product.link ?? product.affiliateUrl`

## Key technical decisions

1. `CURRENT_PROJECT_SLUG` is a **code constant** (`"idea-travel"`), not an environment variable.
2. `link` falls back to `affiliateUrl` in `ProductCard` so the shop keeps working even if products have no project assigned.
3. `ProjectRepository.getProjectBySlug` catches errors and returns `null` (graceful handling for 404).
4. TypeScript strict: no `any`, all new fields typed correctly.

## Verification

- `npx tsc --noEmit` → no errors
- Shop fetches from `/api/v1/projects/idea-travel/products` with locale + optional category filter
- `ProductCard` buy button uses computed link when available
