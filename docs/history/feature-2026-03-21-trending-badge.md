# Feature: Badge "Trending" en tarjetas de alojamiento y experiencia

- **Fecha**: 2026-03-21
- **Solicitado como**: hay un nuevo campo llamado clicks_last_24h para cada accommodation y experience, usalo en cada tarjeta indicando que es el ultimo uso en 24h si ese numero es mayor o igual 5

## Descripcion
Muestra un badge "Popular ahora" / "Trending" en las tarjetas de alojamiento y experiencia cuando el campo `clicks_last_24h` es >= 5. El badge incluye un icono de llama y se posiciona sobre la imagen en la esquina superior izquierda.

## Archivos creados
Ninguno

## Archivos modificados
- `src/domain/models/pack.types.ts` - Campo opcional `clicksLast24h?: number` en `Accommodation` y `Experience`
- `src/infrastructure/api/mappers.ts` - Campo `clicks_last_24h` en `ApiAccommodation` y `ApiExperience`, mapeado a camelCase
- `src/messages/es.json` - Traduccion `packDetail.trending`: "Popular ahora"
- `src/messages/en.json` - Traduccion `packDetail.trending`: "Trending"
- `src/components/molecules/AccommodationCard.tsx` - Badge trending con icono llama sobre la imagen
- `src/components/molecules/ExperienceCard.tsx` - Badge trending con icono llama sobre la imagen

## Decisiones tecnicas
- Campo opcional (`clicksLast24h?: number`) para no romper datos existentes sin el campo
- Umbral hardcodeado en >= 5 directamente en los componentes (logica simple, no requiere abstraccion)
- Badge con `rounded-full`, `bg-primary-500`, icono SVG de llama inline para consistencia con el design system
- Posicion `absolute top-3 left-3` sobre la imagen; en ExperienceCard convive con el badge de provider (derecha)

## Verificacion
- Tipos compilables: campo opcional no rompe interfaces existentes
- Mappers actualizados para pasar el campo desde la API
- Traducciones en ambos idiomas (es/en)
