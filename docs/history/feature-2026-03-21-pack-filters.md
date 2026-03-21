# Feature: Filtros en pagina de Packs de Viaje

- **Fecha**: 2026-03-21
- **Solicitado como**: En la parte de los pack de viajes quiero filtros por cantidad de dias, cantidad de destinos, rango de precio. Todas esas variables vendrian en el endpoint de back para cada pack.

## Descripcion
Filtros interactivos en la pagina de listado de packs (`/packs`) que permiten filtrar por duracion (dias), numero de destinos y rango de precio. Los filtros se aplican via URL searchParams (server-side), manteniendo coherencia con el patron ya usado en la tienda.

## Archivos creados
- `src/components/organisms/PackFilters.tsx` - Componente client con chips agrupados por categoria (Duracion, Destinos, Precio)

## Archivos modificados
- `src/app/[locale]/packs/page.tsx` - Acepta searchParams, aplica filtrado server-side, muestra contador de resultados y mensaje si no hay resultados
- `src/messages/es.json` - Traducciones de filtros (labels, opciones, mensajes)
- `src/messages/en.json` - Traducciones de filtros en ingles

## Decisiones tecnicas
- **Filtrado server-side**: Los filtros se pasan como `searchParams` (`?days=1to7&price=under1000`), igual que la tienda usa `?category=`. Esto permite URLs compartibles y SSR.
- **Datos existentes**: No se necesitaron cambios en el modelo Pack ni en los mocks. `durationDays`, `destinations.length` y `price.from` ya estaban disponibles.
- **Patron reutilizado**: El componente PackFilters sigue el mismo patron visual y tecnico que CategoryFilter (chips/pills con estado activo).
- **Rangos definidos**: Dias (1-7, 8-10, 11+), Destinos (1-2, 3-4, 5+), Precio (<1000, 1000-1500, >1500 EUR).

## Verificacion
- Todas las paginas existentes siguen respondiendo HTTP 200
- Filtro dias=11plus muestra solo Japon (12 dias)
- Filtro days=1to7 muestra Marruecos e Islandia (7 dias)
- Filtro price=under1000 muestra packs con precio desde < 1000 EUR
- Filtros combinados funcionan correctamente
- Mensaje "No packs found" aparece cuando no hay resultados
- Funciona en ambos idiomas (es/en)
- "Clear filters" limpia todos los filtros
