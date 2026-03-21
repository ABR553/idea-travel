# Feature: Preparar proyecto para deploy en Railway

- **Fecha**: 2026-03-22
- **Solicitado como**: prepara el proyecto para hacerle deploy a traves de railway, crea todo lo necesario para eso

## Descripcion
Configuracion del proyecto para deployment en Railway usando el Dockerfile existente con stage de produccion (standalone output de Next.js).

## Archivos creados
- `railway.json` - Config as Code de Railway: build con Dockerfile, healthcheck, restart policy
- `.env.example` - Documentacion de variables de entorno necesarias (API_URL, NEXT_PUBLIC_API_URL)

## Archivos modificados
- `Dockerfile` - Agregado `ENV HOSTNAME="0.0.0.0"` en stage de produccion para que Railway pueda acceder al servidor

## Decisiones tecnicas
- Se usa `railway.json` (Config as Code) en lugar de configurar desde el dashboard para mantener la configuracion versionada en git
- Healthcheck apunta a `/` con timeout de 120s
- Restart policy `ON_FAILURE` con max 5 reintentos para resiliencia
- `HOSTNAME=0.0.0.0` es necesario porque Railway requiere que el servidor escuche en todas las interfaces, no solo localhost
- No se usa Nixpacks/Railpack: el Dockerfile multi-stage existente ya produce una imagen optimizada con standalone output

## Notas adicionales
- El backend ya esta desplegado en Railway: `idea-travel-backend-production.up.railway.app`
- Las variables de entorno `API_URL` y `NEXT_PUBLIC_API_URL` deben configurarse en el dashboard de Railway (Variables section)
- El Dockerfile usa `node:20-alpine` para imagenes ligeras
- `NEXT_PUBLIC_*` vars se necesitan en build time, configurarlas antes del primer deploy
