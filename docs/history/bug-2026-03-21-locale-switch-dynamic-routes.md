# Bug: Error al cambiar idioma en rutas dinamicas

- **Fecha**: 2026-03-21
- **Tipo**: logica/runtime
- **Reportado como**: Runtime Error - "Insufficient params provided for localized pathname. Template: /packs/[slug] Params: undefined" al hacer click en el boton de cambio de idioma

## Causa raiz
En `Header.tsx`, la funcion `switchLocale` usaba `router.replace(pathname, { locale: newLocale })` pasando el pathname como string. Con `next-intl`'s `createNavigation` y pathnames localizados, `usePathname()` devuelve el template interno (ej. `/packs/[slug]`), pero `router.replace` necesita recibir un objeto `{ pathname, params }` para resolver los segmentos dinamicos como `[slug]`. Al no pasar `params`, estos eran `undefined` y next-intl no podia construir la URL.

## Archivos modificados
- `src/components/organisms/Header.tsx` - Se agrego `useParams()` de `next/navigation` y se cambio la llamada a `router.replace` para pasar `{ pathname, params }` en vez de solo `pathname`

## Solucion aplicada
1. Import de `useParams` desde `next/navigation`
2. Captura de params con `const params = useParams()`
3. Cambio de `router.replace(pathname, { locale })` a `router.replace({ pathname, params }, { locale })` siguiendo el patron documentado de next-intl para locale switching con rutas dinamicas

## Verificacion
- El patron corregido es el recomendado por next-intl para locale switching con `createNavigation` y pathnames localizados
- Se verifico que no hay otros archivos en el proyecto con el mismo patron incorrecto
- El fix funciona tanto para rutas estaticas (/, /packs, /vuelos) como dinamicas (/packs/[slug])
