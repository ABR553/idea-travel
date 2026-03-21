# Feature: Backend URL como variable de entorno

- **Fecha**: 2026-03-21
- **Solicitado como**: cambiar url del backend a variable de entorno y poner https://idea-travel-backend-production.up.railway.app:8000 como base, si no existe entonces localhost:8100 de default

## Descripcion
Centraliza la URL del backend en un archivo `.env` para que Next.js la cargue automaticamente. La URL de produccion apunta a Railway y el fallback en codigo sigue siendo `http://localhost:8100`.

## Archivos creados
- `.env` - Variables de entorno con la URL de produccion de Railway (`API_URL` y `NEXT_PUBLIC_API_URL`)

## Archivos modificados
- `docker-compose.yml` - Ahora lee las variables del `.env` con fallback a `host.docker.internal:8100` para desarrollo local con Docker

## Decisiones tecnicas
- Se usan dos variables: `API_URL` (server-side en `client.ts`) y `NEXT_PUBLIC_API_URL` (client-side en `track-click.ts`), siguiendo la convencion de Next.js donde las variables accesibles desde el cliente deben tener prefijo `NEXT_PUBLIC_`
- El `.env` no esta en `.gitignore` (solo `.env*.local` lo esta), permitiendo que los valores por defecto de produccion se compartan via git
- Para desarrollo local, se puede crear un `.env.local` que sobreescriba con `http://localhost:8100`

## Verificacion
- Los archivos `client.ts` y `track-click.ts` ya leian `process.env.API_URL` y `process.env.NEXT_PUBLIC_API_URL` respectivamente con fallback a localhost:8100 — no requirieron cambios
- El `docker-compose.yml` ahora interpola las variables del `.env` con fallback propio para Docker
