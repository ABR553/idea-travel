# Bug: API fetch usa localhost:8100 en Railway en vez de la URL de produccion

- **Fecha**: 2026-03-22
- **Tipo**: build/deploy
- **Reportado como**: en railway ya funciona, pero esta tirando para el localhost:8100, pero la variable si esta bien puesta en las variables de railway [API] Fetch failed: http://localhost:8100/api/v1/packs?page=1&page_size=50&locale=es fetch failed

## Causa raiz
Next.js reemplaza (inline) los valores de `process.env.API_URL` y `process.env.NEXT_PUBLIC_API_URL` **en tiempo de build** via webpack DefinePlugin. Como el archivo `.env` esta en `.gitignore`, no existe en el repositorio cuando Railway clona y construye la imagen Docker. Las variables de entorno de Railway solo estan disponibles en runtime del contenedor, pero no durante `docker build`. Al no existir la variable durante `npm run build`, `process.env.API_URL` se evalua como `undefined` y el operador `??` usa el fallback `"http://localhost:8100"`, que queda hardcodeado en el JavaScript generado.

## Archivos modificados
- `Dockerfile` - Agregados `ARG API_URL`, `ARG NEXT_PUBLIC_API_URL` y sus correspondientes `ENV` en el stage de build para que las variables de Railway esten disponibles durante `npm run build`

## Solucion aplicada
Se anadieron instrucciones `ARG` y `ENV` en el stage builder del Dockerfile para que Railway inyecte las variables de entorno como build args durante la construccion de la imagen Docker. Esto permite que Next.js inline los valores correctos de produccion durante el build.

## Verificacion
Requiere re-deploy en Railway. Tras el deploy, los logs deben mostrar `[API] Fetching: https://idea-travel-backend-production.up.railway.app/api/v1/packs...` en vez de `http://localhost:8100/...`.

## Notas adicionales
- Railway pasa automaticamente las service variables como Docker build args cuando se usan instrucciones `ARG` en el Dockerfile
- Este patron aplica a cualquier variable de entorno que Next.js necesite durante el build (no solo API_URL)
