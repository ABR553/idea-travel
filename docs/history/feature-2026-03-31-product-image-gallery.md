# Feature: Product Image Gallery

**Fecha:** 2026-03-31
**Proyecto:** idea-travel

## Descripción

`ProductCard` ahora soporta galería de imágenes con navegación prev/next y dots indicadores. Cuando un producto tiene una sola imagen el comportamiento es idéntico al anterior (sin controles visibles).

## Archivos modificados

- `src/domain/models/product.types.ts` — campo `images: string[]` en `Product`
- `src/infrastructure/api/mappers.ts` — `ApiProductResponse.images?: string[]` + mapeo en `mapProduct`
- `src/components/molecules/ProductCard.tsx` — galería con estado local (`activeIndex`), botones prev/next y dots

## Decisiones técnicas

- La galería combina `[product.image, ...product.images]` para que `image` sea siempre la primera vista.
- Los botones prev/next son visibles sólo en hover (`group-hover:opacity-100`) para no añadir ruido visual.
- Los dots permiten saltar directamente a cualquier imagen. El dot activo se ensancha (`w-3`) como indicador visual sin necesidad de color adicional.
- `images?: string[]` en `ApiProductResponse` (opcional) garantiza compatibilidad con backends que no devuelvan el campo todavía.
