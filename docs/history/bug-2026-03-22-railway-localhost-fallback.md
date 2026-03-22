# Bug: API fetch usa localhost:8100 en Railway en vez de la URL de produccion

- **Fecha**: 2026-03-22
- **Tipo**: build/deploy
- **Reportado como**: en railway ya funciona, pero esta tirando para el localhost:8100

## Causa raiz
Next.js webpack DefinePlugin reemplaza `process.env.API_URL` y `process.env.NEXT_PUBLIC_API_URL` con sus valores **en tiempo de build**. Como `.env` esta en `.gitignore`, no existe en el repo cuando Railway clona y construye la imagen Docker. Al no existir los valores durante `npm run build`, webpack inline `undefined` y el fallback `localhost:8100` queda hardcodeado en el JavaScript compilado.

Ademas, Next.js standalone mode tiene problemas conocidos con variables de entorno en runtime (GitHub issues #53367, #46296, #38119):
- El standalone build NO copia archivos `.env` al output
- `serverRuntimeConfig` no funciona en standalone
- Bracket notation `process.env['VAR']` tampoco bypasa el DefinePlugin (webpack lo trata igual que dot notation con string literals)

### Intentos fallidos
1. **ARG/ENV en Dockerfile** - Railway no inyecta service variables como Docker build args automaticamente
2. **Bracket notation** `process.env['API_URL']` - Webpack DefinePlugin tambien reemplaza bracket notation con string literals

## Archivos modificados
- `.env.production` (NUEVO) - Variables de entorno de produccion committeadas al repo para que Next.js las lea durante `npm run build`
- `.gitignore` - Agregado `!.env.production` para excluirlo del ignore
- `src/infrastructure/api/client.ts` - Revertido a dot notation simple (ya no necesita hacks)
- `src/lib/track-click.ts` - Revertido a dot notation simple

## Solucion aplicada
Crear un archivo `.env.production` committeado al repositorio con las URLs de produccion. Next.js lee automaticamente `.env.production` cuando `NODE_ENV=production` (que es el caso en el Dockerfile durante `npm run build`). Esto garantiza que webpack inline los valores correctos de produccion en el JavaScript compilado.

La URL del backend (`https://idea-travel-backend-production.up.railway.app`) no es un secreto — es un endpoint publico — asi que es seguro committearla.

## Verificacion
Requiere re-deploy en Railway. Los logs deben mostrar:
`[API] Fetching: https://idea-travel-backend-production.up.railway.app/api/v1/packs...`

## Notas adicionales
- Si se cambia la URL del backend en produccion, se debe actualizar `.env.production` y re-deployar
- Los ARGs en el Dockerfile se mantienen como respaldo
- Este es un problema conocido del ecosistema Next.js standalone + Docker (multiples GitHub issues abiertas)
