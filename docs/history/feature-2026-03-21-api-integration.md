# Feature: Integracion con API backend (idea-travel-backend)

- **Fecha**: 2026-03-21
- **Solicitado como**: Integrar con el API que expone idea-travel-backend basandose en el Swagger, adaptar la vista de pack porque el API ahora devuelve por cada destino un listado de accommodations y otro de experiencias. Los endpoints estan paginados.

## Descripcion
Se reemplazo completamente el sistema de datos mock por integracion real con el API REST de `idea-travel-backend` (http://localhost:8100). Los cambios principales son:

1. **Reestructuracion del modelo de datos**: Accommodations y experiences pasan de estar a nivel de pack a estar anidados dentro de cada destino (`DestinationDetail`).
2. **API client centralizado**: Nuevo modulo que maneja fetch, locale y mapeo snake_case->camelCase.
3. **Soporte de paginacion**: Todos los endpoints de listado usan `PaginatedResponse<T>`.
4. **Vista de pack detail adaptada**: Muestra accommodations y experiences agrupados por destino.

## Archivos creados
- `src/infrastructure/api/client.ts` - Cliente HTTP centralizado con soporte de locale y revalidacion ISR
- `src/infrastructure/api/mappers.ts` - Tipos de respuesta API (snake_case) y funciones de mapeo a tipos de dominio (camelCase)

## Archivos modificados
- `src/domain/models/pack.types.ts` - Nuevos tipos: `PackListItem`, `PackDetail`, `DestinationDetail`; eliminado tipo `Pack` monolitico; agregado `bookingUrl` a `Accommodation`
- `src/domain/models/common.types.ts` - Nuevo tipo `PaginatedResponse<T>`
- `src/domain/services/pack.service.ts` - Interface actualizada con paginacion y tipos split
- `src/domain/services/product.service.ts` - Interface actualizada con paginacion y `getCategories()`
- `src/infrastructure/repositories/pack.repository.ts` - Reescrito: fetch al API en vez de mocks
- `src/infrastructure/repositories/product.repository.ts` - Reescrito: fetch al API en vez de mocks
- `src/components/molecules/PackCard.tsx` - Usa `PackListItem` en vez de `Pack`
- `src/components/molecules/AccommodationCard.tsx` - Soporte para `bookingUrl` con link de afiliado
- `src/components/organisms/PackGrid.tsx` - Usa `PackListItem` en vez de `Pack`
- `src/app/[locale]/packs/[slug]/page.tsx` - Vista reestructurada: accommodations y experiences por destino
- `src/app/[locale]/packs/page.tsx` - Usa respuesta paginada del API
- `src/app/[locale]/page.tsx` - Usa API para featured packs y productos
- `src/app/[locale]/tienda/page.tsx` - Usa API con filtrado por categoria server-side
- `src/app/sitemap.ts` - Adaptado a respuesta paginada
- `src/lib/seo.ts` - Usa tipo `PackDetail` en vez de `Pack`
- `docker-compose.yml` - Agregada env var `API_URL=http://host.docker.internal:8100`
- `src/infrastructure/mocks/packs.mock.ts` - Tipo `any` (ya no se usa)
- `src/infrastructure/mocks/packs.mock.en.ts` - Tipo `any` (ya no se usa)

## Decisiones tecnicas
- **Mapeo explicito snake_case->camelCase**: En vez de usar una libreria de transformacion automatica, se crean interfaces API explicitamente tipadas y funciones de mapeo manuales. Esto da control total y type-safety.
- **pageSize=50 por defecto**: Para los listados donde se aplican filtros client-side (packs), se pide un page_size grande para obtener todos los datos de una vez, ya que el API no soporta filtros de dias/destinos/precio.
- **ISR con revalidate=3600**: El API client usa `next: { revalidate: 3600 }` para aprovechar el cache de ISR de Next.js, coherente con el `Cache-Control: s-maxage=3600` del backend.
- **Featured packs no paginados**: El endpoint `/packs/featured` devuelve un array directo, no paginado.
- **Mocks preservados pero sin tipo**: Los archivos mock se mantienen por referencia pero ya no se importan desde los repositorios.

## SEO
- JSON-LD `TouristTrip` adaptado al nuevo tipo `PackDetail`
- Metadata y JSON-LD siguen funcionando en todas las paginas
- `nofollow sponsored` verificado en 12 links de afiliados en pack detail

## Verificacion
- TypeScript compila sin errores nuevos (errores pre-existentes en Header/Footer)
- API health check OK
- Todas las paginas devuelven HTTP 200: `/es`, `/es/packs`, `/es/tienda`, `/es/packs/{slug}`
- Pack multi-destino (ruta-por-italia, 4 destinos) renderiza correctamente todos los destinos
- JSON-LD presente en todas las paginas
- Links de afiliados con `rel="nofollow sponsored"` verificados

## Notas adicionales
- La variable `API_URL` debe configurarse en el entorno. Para Docker usa `http://host.docker.internal:8100`, para desarrollo local `http://localhost:8100` (valor por defecto).
- Los filtros de packs (dias, destinos, precio) siguen siendo client-side ya que el API no soporta esos parametros. Si el catalogo crece, se deberia considerar implementar estos filtros en el backend.
- Los archivos mock pueden eliminarse en el futuro si ya no se necesitan como referencia.
