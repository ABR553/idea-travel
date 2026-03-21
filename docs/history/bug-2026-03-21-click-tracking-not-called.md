# Bug: No se llamaban los endpoints POST de click tracking

- **Fecha**: 2026-03-21
- **Tipo**: logica
- **Reportado como**: nadie esta llamando al nuevo endpoint de http://localhost:8100/docs los 2 POST para aumentar el clicks_last_24h

## Causa raiz
Los componentes `AccommodationCard` y `ExperienceCard` usaban enlaces `<a>` directos a las URLs de afiliados sin ningun handler de click. Los endpoints `POST /api/v1/clicks/accommodations/{id}` y `POST /api/v1/clicks/experiences/{id}` del backend existian pero nunca eran invocados desde el frontend.

## Archivos modificados
- `src/lib/track-click.ts` - **Nuevo**: funciones fire-and-forget `trackAccommodationClick` y `trackExperienceClick` que hacen POST al backend
- `src/components/molecules/AccommodationCard.tsx` - Agregado `"use client"`, import de `trackAccommodationClick`, y `onClick` en el enlace de booking
- `src/components/molecules/ExperienceCard.tsx` - Agregado `"use client"`, import de `trackExperienceClick`, y `onClick` en el enlace principal

## Solucion aplicada
1. Creada `src/lib/track-click.ts` con dos funciones que hacen `fetch POST` fire-and-forget (el `.catch(() => {})` evita errores no manejados si el backend falla)
2. Ambas tarjetas convertidas a Client Components (`"use client"`) para poder usar `onClick`
3. Se agrega `onClick` handler que dispara el tracking sin bloquear la navegacion al enlace de afiliado

## Verificacion
- TypeScript compila sin errores nuevos (los existentes en Footer/Header son pre-existentes)
- El `onClick` no usa `preventDefault`, asi que la navegacion al affiliate URL sigue funcionando normalmente
- El POST es fire-and-forget: no bloquea UX ni falla si el backend esta caido
