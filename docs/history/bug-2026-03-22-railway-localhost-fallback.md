# Bug: API fetch usa localhost:8100 en Railway en vez de la URL de produccion

- **Fecha**: 2026-03-22
- **Tipo**: build/deploy
- **Reportado como**: en railway ya funciona, pero esta tirando para el localhost:8100, pero la variable si esta bien puesta en las variables de railway

## Causa raiz
Next.js webpack DefinePlugin reemplaza literalmente `process.env.API_URL` (dot notation) con su valor en tiempo de build. Como el archivo `.env` esta en `.gitignore`, no existe durante el Docker build en Railway. Las service variables de Railway solo estan disponibles en runtime del contenedor, no durante `docker build`. Al no existir la variable durante `npm run build`, el fallback `"http://localhost:8100"` queda hardcodeado en el JavaScript compilado.

El primer intento de fix (agregar `ARG`/`ENV` al Dockerfile) no funciono porque Railway no inyecta automaticamente las service variables como Docker build args.

## Archivos modificados
- `src/infrastructure/api/client.ts` - Cambiado de `process.env.API_URL` (dot notation, inlineable por webpack) a `process.env['API_URL']` (bracket notation, no inlineable) dentro de una funcion `getApiBaseUrl()` que se ejecuta en cada llamada
- `src/lib/track-click.ts` - Mismo cambio para `process.env['NEXT_PUBLIC_API_URL']`
- `Dockerfile` - Se mantienen los ARGs como respaldo

## Solucion aplicada
Se cambio el acceso a las variables de entorno de dot notation (`process.env.API_URL`) a bracket notation (`process.env['API_URL']`) dentro de una funcion getter. Webpack DefinePlugin solo reemplaza patrones de dot notation en el AST, asi que bracket notation fuerza la lectura real de `process.env` en runtime de Node.js, donde Railway SI inyecta las variables.

## Verificacion
Requiere re-deploy en Railway. Los logs deben mostrar `API_URL=https://idea-travel-backend-production.up.railway.app` en vez de `http://localhost:8100`.
