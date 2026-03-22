# Bug: Build fails on Railway - fetch ECONNREFUSED in generateStaticParams

- **Fecha**: 2026-03-22
- **Tipo**: build/deploy
- **Reportado como**: TypeError: fetch failed with ECONNREFUSED during Docker build on Railway

## Causa raiz
`generateStaticParams` en `src/app/[locale]/packs/[slug]/page.tsx` llama a `packRepository.getAllPacks()` que hace fetch a la API backend. Durante el build de Docker en Railway, el backend no es accesible desde el contenedor de build, causando ECONNREFUSED.

## Archivos modificados
- `src/app/[locale]/packs/[slug]/page.tsx` - Envuelto `generateStaticParams` en try-catch, retorna array vacio si la API no esta disponible

## Solucion aplicada
Try-catch en `generateStaticParams`: si el fetch falla, retorna `[]`. Esto hace que las paginas de packs se generen bajo demanda (SSR) en lugar de estaticamente durante el build, lo cual es correcto para contenido dinamico que viene de una API externa.

## Verificacion
- Verificado que el layout.tsx tiene su propio generateStaticParams que no hace fetch (solo genera locales)
- No hay otros generateStaticParams con fetch en el proyecto
