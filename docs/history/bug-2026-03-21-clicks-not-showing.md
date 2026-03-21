# Bug: Badge trending no aparece aunque clicks_last_24h >= 5 en BD

- **Fecha**: 2026-03-21
- **Tipo**: datos/cache
- **Reportado como**: no sale nada relacionado al clicks_last_24h despues de count 5 y en bd esta correcto

## Causa raiz
`apiFetch` en `client.ts` usaba `next: { revalidate: 3600 }` para TODAS las llamadas, incluyendo el pack detail. Esto hacia que Next.js cacheara la respuesta de la API durante 1 hora, sirviendo datos obsoletos de `clicks_last_24h` aunque la BD estuviera actualizada.

## Archivos modificados
- `src/infrastructure/api/client.ts` - Agregado parametro `revalidate` opcional a `FetchOptions`, con soporte para `false` (no-store) y valores numericos personalizados
- `src/infrastructure/repositories/pack.repository.ts` - `getPackBySlug` ahora usa `revalidate: false` para obtener datos frescos (los clicks cambian constantemente)

## Solucion aplicada
1. Se extendio `FetchOptions` con `revalidate?: number | false` (default 3600 para mantener compatibilidad)
2. Cuando `revalidate: false`, se usa `cache: "no-store"` en vez de `next: { revalidate }`
3. El pack detail ahora siempre pide datos frescos al backend, asegurando que `clicks_last_24h` refleje el valor real

## Verificacion
- API devuelve `clicks_last_24h` con valores 7 y 9 para un pack
- Antes del fix: frontend mostraba 0 y 0 (datos cacheados)
- Despues del fix: frontend muestra 7 y 9, y 2 badges "Popular ahora" aparecen correctamente
