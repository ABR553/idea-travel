# Bug: DYNAMIC_SERVER_USAGE en /[locale]/packs/[slug]

- **Fecha**: 2026-03-22
- **Tipo**: SSR/build
- **Reportado como**: rutas de pack detail dan error DYNAMIC_SERVER_USAGE: couldn't be rendered statically because it used no-store fetch

## Causa raiz
`getPackBySlug` en `pack.repository.ts` usaba `revalidate: false`, que en `client.ts` se traduce a `{ cache: "no-store" }`. Esto marca el fetch como dinamico. Sin embargo, la pagina `/[locale]/packs/[slug]` tiene `generateStaticParams` que intenta pre-renderizarla estaticamente. Next.js no permite mezclar static generation con `no-store` fetch — lanza `DYNAMIC_SERVER_USAGE`.

## Archivos modificados
- `src/infrastructure/repositories/pack.repository.ts` - Cambiado `revalidate: false` a `revalidate: 3600` en `getPackBySlug` para usar ISR en vez de no-store

## Solucion aplicada
Usar ISR (revalidate cada 3600 segundos) en vez de `no-store`, coherente con el resto de fetches del proyecto que usan `revalidate: 3600` por defecto.

## Verificacion
Requiere re-deploy en Railway. La ruta `/es/packs/ruta-por-italia` debe cargar sin error DYNAMIC_SERVER_USAGE.
