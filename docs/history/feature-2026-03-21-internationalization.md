# Feature: Internacionalizacion (i18n) completa

- **Fecha**: 2026-03-21
- **Solicitado como**: Manejar internacionalizacion en la pagina, tanto las rutas como los textos fijos. Enviar header de locale a los endpoints mock.

## Descripcion
Implementacion completa de internacionalizacion con `next-intl` para soportar multiples idiomas (es/en). Incluye:
- Rutas con prefijo de locale (`/es/...`, `/en/...`)
- Rutas traducidas (`/es/vuelos` vs `/en/flights`, `/es/tienda` vs `/en/shop`)
- Todos los textos fijos de la UI traducidos via archivos JSON de mensajes
- Selector de idioma en el Header (desktop y mobile)
- Header `Accept-Language` enviado a los repositorios/endpoints mock
- Datos mock traducidos al ingles (packs y productos)
- SEO multilingue: hreflang, metadata por locale, sitemap con alternates
- `<html lang>` dinamico segun locale

## Archivos creados
- `src/i18n/routing.ts` - Configuracion de locales, pathnames traducidos
- `src/i18n/request.ts` - getRequestConfig para cargar mensajes
- `src/i18n/navigation.ts` - Link, redirect, usePathname, useRouter wrappeados
- `src/messages/es.json` - Traducciones espanol (todos los textos de UI)
- `src/messages/en.json` - Traducciones ingles
- `src/middleware.ts` - Middleware next-intl para deteccion y reescritura de locale
- `src/infrastructure/mocks/packs.mock.en.ts` - Datos mock de packs en ingles
- `src/infrastructure/mocks/products.mock.en.ts` - Datos mock de productos en ingles
- `src/app/[locale]/layout.tsx` - Layout con NextIntlClientProvider y html lang dinamico
- `src/app/[locale]/page.tsx` - Home page con traducciones
- `src/app/[locale]/packs/page.tsx` - Listado packs traducido
- `src/app/[locale]/packs/[slug]/page.tsx` - Detalle pack traducido
- `src/app/[locale]/vuelos/page.tsx` - Pagina vuelos traducida
- `src/app/[locale]/tienda/page.tsx` - Pagina tienda traducida
- `src/app/[locale]/not-found.tsx` - 404 traducida
- `src/app/[locale]/loading.tsx` - Loading state
- `docs/history/feature-2026-03-21-internationalization.md` - Este archivo

## Archivos modificados
- `next.config.ts` - Integrado plugin createNextIntlPlugin
- `package.json` - Dependencia next-intl anadida
- `src/app/layout.tsx` - Simplificado a shell minimo (children pass-through)
- `src/domain/services/pack.service.ts` - Parametro locale opcional en metodos
- `src/domain/services/product.service.ts` - Parametro locale opcional en metodos
- `src/infrastructure/repositories/pack.repository.ts` - Acepta locale, simula header Accept-Language
- `src/infrastructure/repositories/product.repository.ts` - Acepta locale, simula header Accept-Language
- `src/components/organisms/Header.tsx` - Traducciones + boton de cambio de idioma
- `src/components/organisms/Footer.tsx` - Traducciones via useTranslations
- `src/components/organisms/Hero.tsx` - Traducciones via useTranslations
- `src/components/organisms/FlightSearchForm.tsx` - Traducciones via useTranslations
- `src/components/organisms/CategoryFilter.tsx` - Traducciones + router i18n
- `src/components/molecules/PackCard.tsx` - Link i18n + traducciones
- `src/components/molecules/AccommodationCard.tsx` - Traducciones tier labels
- `src/components/molecules/ExperienceCard.tsx` - Traducciones
- `src/components/molecules/ProductCard.tsx` - Traducciones categorias y boton Amazon
- `src/components/molecules/Breadcrumbs.tsx` - URLs con prefijo de locale
- `src/app/sitemap.ts` - Genera URLs para ambos locales con hreflang alternates
- `src/lib/format.ts` - formatPrice/formatPriceDecimal aceptan locale

## Decisiones tecnicas
- **next-intl**: Elegido por ser la libreria mas madura y recomendada para Next.js App Router i18n. Soporte nativo de Server Components, ~2KB bundle, pathnames traducidos.
- **Pathnames pattern**: Rutas internas usan el path en espanol (`/vuelos`, `/tienda`) y next-intl las reescribe a `/flights` y `/shop` para el locale ingles.
- **Mocks traducidos**: Se creo un archivo mock completo por idioma en vez de un overlay, simulando lo que seria un backend real que devuelve datos traducidos segun el header Accept-Language.
- **Repository pattern con locale**: Los repositorios reciben locale como parametro y simulan enviar un header HTTP. En produccion, esto se traduce en un `fetch` con `headers: { 'Accept-Language': locale }`.
- **Static rendering**: Se usa `setRequestLocale()` en todas las paginas y `generateStaticParams` con locales para habilitar static rendering.

## SEO
- `<html lang>` dinamico: `es` o `en` segun locale
- Metadata con `alternates.languages` en cada pagina (hreflang)
- Open Graph `locale`: `es_ES` o `en_US`
- Sitemap multilingue con `xhtml:link rel="alternate" hreflang`
- JSON-LD presente en todas las paginas

## Verificacion
- Todas las paginas responden HTTP 200 en ambos idiomas
- `/` redirige (307) a `/es` (locale por defecto)
- `/en/flights` y `/en/shop` funcionan (rutas traducidas)
- `<html lang="en">` y `<html lang="es">` correctos
- Contenido traducido verificado en home, packs, detail, vuelos, tienda
- JSON-LD presente en paginas
- `rel="nofollow sponsored"` presente en links de afiliados
- Sitemap contiene URLs para ambos locales con hreflang alternates
- Headers `Accept-Language` se envian correctamente en los repositorios

## Notas adicionales
- Para anadir un nuevo idioma: agregar al array `locales` en `routing.ts`, crear `messages/<locale>.json`, crear mocks `*.mock.<locale>.ts`, y actualizar repositorios
- Los slugs de packs se mantienen iguales entre idiomas (son URL-safe y universales)
- Algunas imagenes de Unsplash devuelven 404 (issue preexistente, no relacionado con i18n)
