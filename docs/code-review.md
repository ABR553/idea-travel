# Code Review - Idea Travel (API Integration)

## Resumen Ejecutivo
**Estado general: APROBADO CON OBSERVACIONES**
- Issues criticos: 2
- Warnings: 4
- Sugerencias: 4

La integracion con el API esta bien estructurada: client centralizado, mappers tipados, repository pattern mantenido, y la vista de pack detail adaptada correctamente al nuevo modelo de datos (accommodations/experiences por destino). Los issues criticos son corregibles rapidamente.

---

## Issues Criticos (deben corregirse)

### [CR-001] `getPackBySlug` silencia todos los errores de API
- **Archivo**: `src/infrastructure/repositories/pack.repository.ts:28-33`
- **Severidad**: CRITICA
- **Descripcion**: El bloque `catch` devuelve `null` para CUALQUIER error (500, timeout, network, etc.), no solo para 404. Esto significa que si la API devuelve un error 500, el usuario ve una pagina 404 en vez de un error real. Oculta problemas de infraestructura y dificulta el debugging.
- **Solucion**: Diferenciar entre errores 404 (devolver null) y otros errores (propagar la excepcion). Verificar el status code antes de decidir.
```typescript
async getPackBySlug(slug: string, locale: string = "es"): Promise<PackDetail | null> {
  try {
    const response = await apiFetch<ApiPackResponse>(`/packs/${slug}`, { locale });
    return mapPackDetail(response);
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) {
      return null;
    }
    throw error;
  }
}
```
- **Principio**: Fail-fast, observabilidad

### [CR-002] Mock files usan `any[]` violando convencion del proyecto
- **Archivo**: `src/infrastructure/mocks/packs.mock.ts:3`, `src/infrastructure/mocks/packs.mock.en.ts:3`
- **Severidad**: CRITICA
- **Descripcion**: CLAUDE.md establece "No usar `any` en TypeScript". Los archivos mock ahora tienen `eslint-disable-next-line @typescript-eslint/no-explicit-any` con `any[]`. Aunque los mocks ya no se usan en los repositorios, siguen en el codebase con `any`.
- **Solucion**: Eliminar los archivos mock o actualizar el tipo para que sea coherente. La opcion mas limpia es eliminarlos ya que los datos vienen del API.
- **Principio**: Convencion del proyecto, TypeScript estricto

---

## Warnings (deberian corregirse)

### [CR-W01] Type assertions inseguras en mappers
- **Archivo**: `src/infrastructure/api/mappers.ts:135,151,216`
- **Severidad**: WARNING
- **Descripcion**: Los mappers usan `as AccommodationTier`, `as ExperienceProvider` y `as Product["category"]` sin validar que el valor del API sea realmente valido. Si el API devuelve un tier `"luxury"` o un provider `"viator"`, el mapper lo acepta silenciosamente creando un tipo incorrecto en runtime.
- **Solucion**: Validar contra los valores permitidos o usar un fallback:
```typescript
const VALID_TIERS = new Set(["budget", "standard", "premium"]);
tier: VALID_TIERS.has(api.tier) ? api.tier as AccommodationTier : "standard",
```
- **Principio**: Defensive programming, type safety en boundaries

### [CR-W02] `destination.name` como React key no es garantia de unicidad
- **Archivo**: `src/app/[locale]/packs/[slug]/page.tsx:151`
- **Severidad**: WARNING
- **Descripcion**: `key={destination.name}` asume que no habra dos destinos con el mismo nombre en un pack. Si un pack tuviese, por ejemplo, dos visitas a la misma ciudad, React podria renderizar incorrectamente.
- **Solucion**: Usar el indice combinado con el nombre: `key={\`${index}-${destination.name}\`}`
- **Principio**: React reconciliation, robustez

### [CR-W03] `Content-Type: application/json` en peticiones GET
- **Archivo**: `src/infrastructure/api/client.ts:31-33`
- **Severidad**: WARNING
- **Descripcion**: Se envia el header `Content-Type: application/json` en todas las peticiones, pero todas son GET (sin body). Aunque la mayoria de APIs lo ignoran, es semanticamente incorrecto y algunos proxies/WAFs pueden rechazarlo.
- **Solucion**: Eliminar el header `Content-Type` ya que no se envian bodies. Solo es necesario en POST/PUT/PATCH.
- **Principio**: Correctitud HTTP

### [CR-W04] Falta `rel="noopener"` en link de booking de AccommodationCard
- **Archivo**: `src/components/molecules/AccommodationCard.tsx:85`
- **Severidad**: WARNING
- **Descripcion**: El nuevo link de booking tiene `rel="nofollow sponsored"` y `target="_blank"` pero no incluye `noopener`. Aunque navegadores modernos lo aplican automaticamente, la best practice es ser explicito para evitar que `window.opener` sea accesible en navegadores legacy.
- **Solucion**: Cambiar a `rel="noopener nofollow sponsored"`. Aplica tambien a ExperienceCard y ProductCard (pre-existente).
- **Principio**: Seguridad, defense in depth

---

## Sugerencias (nice to have)

### [CR-S01] Anadir error.tsx para degradacion graceful ante caida del API
- **Descripcion**: Si el API no responde, todos los Server Components lanzan una excepcion no manejada. Un `error.tsx` en `app/[locale]/` mostraria un mensaje amigable en vez de un crash.

### [CR-S02] Eliminar archivos mock obsoletos
- **Archivos**: `src/infrastructure/mocks/packs.mock.ts`, `packs.mock.en.ts`, `products.mock.ts`, `products.mock.en.ts`
- **Descripcion**: Estos archivos ya no son importados por ningun repositorio. Eliminarlos reduce el tamano del codebase y evita confusion.

### [CR-S03] Loading states por seccion (packs, tienda)
- **Descripcion**: Solo hay un `loading.tsx` global. Con datos del API (potencialmente lentos), seria util tener skeletons especificos para `/packs` y `/tienda`.

### [CR-S04] Tests para los mappers
- **Descripcion**: Los mappers son funciones puras ideales para unit testing. Un test que valide el mapeo snake_case->camelCase con datos de ejemplo daria confianza ante cambios futuros en la API.

---

## Lo que esta bien hecho

1. **API Client limpio**: `apiFetch` centralizado con locale, params tipados, y revalidacion ISR coherente con el backend
2. **Mappers exhaustivos**: Cada modelo API tiene su mapper, manteniendo la separacion entre tipos de infraestructura y dominio
3. **Repository pattern preservado**: Los repositorios cambiaron de mocks a API sin tocar ni un componente de presentacion - exactamente el valor del patron
4. **Generics bien usados**: `mapPaginatedResponse<TApi, TDomain>` es un mapper generico reutilizable y bien tipado
5. **Vista de pack detail por destino**: La restructuracion muestra accommodations y experiences agrupados por destino con heading hierarchy correcta (h2 destino > h3 accommodations/experiences)
6. **Paginacion sin over-engineering**: Se usa `pageSize=50` para filtros client-side sin anadir complejidad innecesaria de UI de paginacion
7. **`bookingUrl` en AccommodationCard**: Se agrego soporte para el nuevo campo con link de afiliado condicionalmente renderizado
8. **Parallel data fetching**: Home page usa `Promise.all` para featured packs y productos en paralelo
9. **SEO intacto**: JSON-LD, metadata, sitemap, y heading hierarchy siguen funcionando correctamente con los nuevos tipos
10. **Docker config correcta**: `API_URL=http://host.docker.internal:8100` para comunicacion container-to-host
