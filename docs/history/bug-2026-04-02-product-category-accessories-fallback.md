# Bug: todos los productos muestran la etiqueta "Accesorios"

**Fecha:** 2026-04-02
**Proyecto:** Frontend (idea-travel)
**Tipo:** Bug de integración (contrato API vs validador frontend)

## Síntoma

Todos los productos en la página `/tienda` mostraban la etiqueta "Accesorios" en el badge de categoría, independientemente de su categoría real en el backend.

## Causa raíz

En `src/infrastructure/api/mappers.ts`, la función `validateCategory()` valida el valor de `category` recibido del backend contra un set de categorías conocidas. El fallback cuando la categoría no está en el set es `"accessories"`.

El backend contiene productos con categorías `maletas` y `mochilas_cabina` que **no estaban incluidas** en `VALID_CATEGORIES`. Al no estar reconocidas, el 100% de esos productos caía al fallback `"accessories"`.

```ts
// Antes (bug):
const VALID_CATEGORIES = new Set(["luggage", "electronics", "accessories", "comfort", "photography"]);
//   ↑ faltaban: "maletas", "mochilas_cabina"

function validateCategory(category: string): Product["category"] {
  return VALID_CATEGORIES.has(category as Product["category"])
    ? (category as Product["category"])
    : "accessories"; // ← fallback para categorías desconocidas
}
```

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/infrastructure/api/mappers.ts` | Añadidas `maletas` y `mochilas_cabina` a `VALID_CATEGORIES` |
| `src/messages/es.json` | Añadidas traducciones `maletas` y `mochilas_cabina` en namespace `shop` |
| `src/messages/en.json` | Añadidas traducciones `maletas` y `mochilas_cabina` en namespace `shop` |
| `src/components/organisms/CategoryFilter.tsx` | Añadidas a `ALL_CATEGORIES` para que sean filtros navegables |
| `src/app/[locale]/tienda/page.tsx` | Añadidas a `validCategories` para aceptar el query param de filtro |

## Origen

Bug de integración: el `ProductCategory` type en `product.types.ts` ya incluía `maletas` y `mochilas_cabina`, pero el validador del mapper y los archivos de mensajes no se actualizaron cuando se añadieron estas categorías al backend.

## Commit

`fix: add missing product categories maletas and mochilas_cabina to validator`
