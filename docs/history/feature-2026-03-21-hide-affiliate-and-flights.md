# Feature: Ocultar textos de afiliados y ruta de vuelos

- **Fecha**: 2026-03-21
- **Solicitado como**: quita los comentarios y textos de todo lo relacionado a que estas usando programa de afiliados y esconde de momento la ruta de los vuelos

## Descripcion
Se eliminan todos los textos visibles al usuario sobre programas de afiliados (disclosures, banners, secciones de transparencia) y se oculta la ruta de vuelos de la navegacion y sitemap. Los links de afiliados siguen funcionando con `rel="nofollow sponsored"`, solo se quitan los textos informativos.

## Archivos creados
Ninguno

## Archivos modificados
- `src/components/organisms/Header.tsx` - Eliminado banner superior de affiliate disclosure, eliminado link de vuelos de NAV_LINKS, eliminado import `tCommon` no usado
- `src/components/organisms/Footer.tsx` - Eliminado link de vuelos, eliminada seccion de transparencia con affiliate disclosure, eliminado import `tCommon`, eliminado `id="footer-disclosure"`, grid ajustado de 4 a 3 columnas
- `src/app/[locale]/packs/[slug]/page.tsx` - Eliminado `<aside>` de disclosure al final de la pagina
- `src/app/[locale]/tienda/page.tsx` - Eliminado snippet de affiliate disclosure bajo la descripcion
- `src/app/sitemap.ts` - Eliminada entrada `/vuelos` del sitemap

## Decisiones tecnicas
- Las traducciones (`affiliateDisclosure`, `affiliateInfo`) se mantienen en los JSON por si se reactivan en el futuro
- La constante `AFFILIATE_DISCLOSURE` en constants.ts se mantiene
- La pagina `src/app/[locale]/vuelos/` NO se elimina, solo se oculta de navegacion y sitemap (accesible por URL directa)
- Los `rel="nofollow sponsored"` en links de afiliados se mantienen (buena practica SEO)
- La ruta `/vuelos` sigue en `i18n/routing.ts` para que no rompa si alguien accede directamente

## Verificacion
- TypeScript compila sin errores nuevos (los pre-existentes en Footer con rutas "#" no son de este cambio)
- Vuelos eliminado de Header, Footer y sitemap
- Disclosure eliminado de Header, Footer, Pack detail y Tienda
