# Bug: Footer Link type error with next-intl typed routes

- **Fecha**: 2026-03-22
- **Tipo**: tipos TypeScript
- **Reportado como**: Type error: Type '"#"' is not assignable to type for Link href in Footer.tsx

## Causa raiz
El componente `Link` de `next-intl` (`@/i18n/navigation`) solo acepta rutas definidas en el routing tipado (`/`, `/packs`, `/vuelos`, `/tienda`). Los links legales del footer usaban `href="#"` que no es una ruta valida del sistema.

## Archivos modificados
- `src/components/organisms/Footer.tsx` - Cambiados los 3 links legales (privacy, terms, cookies) de `<Link>` a `<a>` nativo

## Solucion aplicada
Reemplazar `<Link href="#">` por `<a href="#">` en los links legales que no apuntan a rutas de la app. El `Link` de next-intl es solo para rutas internas tipadas.

## Verificacion
El error de tipos desaparece ya que `<a>` nativo acepta cualquier href valido.

## Notas adicionales
Cuando se creen las paginas legales (/privacidad, /terminos, /cookies), se deben anadir al routing tipado y cambiar estos `<a>` de vuelta a `<Link>`.
