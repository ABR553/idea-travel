# Bug: API 422 con locale=favicon.ico

- **Fecha**: 2026-03-22
- **Tipo**: routing/logica
- **Reportado como**: Error 422 Unprocessable Entity con locale=favicon.ico en packs/featured y products

## Causa raiz
El navegador solicita `/favicon.ico`. El middleware de next-intl lo excluye correctamente (su matcher ignora paths con punto). Sin embargo, al no existir el archivo en `public/`, Next.js lo rutea al dynamic segment `[locale]` con `locale="favicon.ico"`. La pagina hace llamadas API con ese locale invalido y el backend responde 422.

## Archivos modificados
- `public/favicon.ico` (NUEVO) - Favicon valido 16x16 para que Next.js lo sirva directamente desde public/ sin pasar por el router

## Solucion aplicada
Crear un `favicon.ico` en el directorio `public/`. Cuando el navegador lo solicita, Next.js lo sirve como archivo estatico sin pasar por el App Router, evitando que `[locale]` capture la peticion.

## Verificacion
Requiere re-deploy. Los logs no deben mostrar mas peticiones con `locale=favicon.ico`.
