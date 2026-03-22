# Bug: Home page no muestra featured packs ni productos

- **Fecha**: 2026-03-22
- **Tipo**: SSR/datos
- **Reportado como**: los packs si salen en /packs, pero los featured en el home no

## Causa raiz
Dos problemas combinados:

1. **Promise.all atomico**: `getFeaturedPacks` y `getAllProducts` estaban en un solo `Promise.all` dentro de un `try/catch`. Si una llamada fallaba, ambas se perdian y la pagina renderizaba con arrays vacios.

2. **Pagina estatica sin revalidacion rapida**: La home se pre-renderiza durante `npm run build` en Docker. Si la API no es alcanzable durante el build (el contenedor Docker puede no tener acceso de red al backend externo), el `try/catch` silencia el error y cachea la pagina vacia. Con `revalidate: 3600` por defecto, la pagina tardaria 1 hora en reintentar.

La pagina `/packs` funciona porque usa `searchParams`, lo cual la convierte en dinamica (fetch en cada request).

## Archivos modificados
- `src/app/[locale]/page.tsx` - Separado `Promise.all` en try/catches individuales + agregado `export const revalidate = 60` para revalidacion rapida

## Solucion aplicada
1. Cada llamada API tiene su propio try/catch: si products falla, featured packs sigue mostrando (y viceversa)
2. `revalidate = 60` asegura que si el build fallo, la pagina se revalida en 60 segundos tras la primera visita

## Verificacion
Requiere re-deploy. Tras el deploy, visitar `/es` y verificar que los featured packs aparecen.
