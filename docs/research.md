# Investigacion Tecnica - Idea Travel

## 1. Resumen Ejecutivo

Este proyecto requiere una plataforma de viajes optimizada para SEO que monetice a traves de programas de afiliados (GetYourGuide, Civitatis, Amazon Associates). Las decisiones clave son:

- **Next.js 15 con App Router** como framework principal por su SSR nativo, metadata API, y Server Components
- **TypeScript estricto** para seguridad de tipos
- **Tailwind CSS** para estilos con design tokens custom
- **Arquitectura Hexagonal + Atomic Design adaptado** para separar dominio de infraestructura
- **Docker multi-stage** para desarrollo y produccion
- **SEO-first**: JSON-LD, metadata dinamica, semantic HTML, Core Web Vitals optimizados

## 2. Stack Recomendado

| Tecnologia | Version | Justificacion |
|---|---|---|
| Next.js | 15.x | App Router maduro, Server Components, metadata API, generateStaticParams |
| React | 18.x+ | RSC support, Suspense, streaming |
| TypeScript | 5.x | Strict mode, satisfies operator, template literals |
| Tailwind CSS | 3.4+ | JIT, design tokens via config, purge automatico |
| Node.js | 20 LTS | Soporte largo, performance |
| Docker | Multi-stage | Dev con hot reload, prod optimizado con standalone |

### Por que Next.js 15 y no alternativas
- **vs Astro**: Next.js tiene mejor soporte para interactividad (formularios de vuelos) y mejor ecosistema React
- **vs Remix**: Next.js tiene mayor adopcion, mejor documentacion de SEO, y metadata API mas madura
- **vs Nuxt**: React tiene mayor pool de talento y componentes disponibles

## 3. Arquitectura Propuesta

### Hexagonal + Atomic Design Adaptado

```
src/
  app/                      # Next.js App Router (adaptadores de entrada)
    layout.tsx              # Root layout con metadata global
    page.tsx                # Home page
    packs/
      page.tsx              # Listado de packs
      [slug]/page.tsx       # Detalle de pack
    vuelos/page.tsx         # Buscador de vuelos
    tienda/page.tsx         # Tienda Amazon
    robots.ts               # Generado dinamicamente
    sitemap.ts              # Generado dinamicamente

  components/               # Atomic Design
    atoms/                  # Button, Input, Badge, Typography, Skeleton
    molecules/              # PackCard, AccommodationCard, ExperienceCard, ProductCard
    organisms/              # Header, Footer, Hero, PackGrid, FlightSearchForm
    templates/              # PageLayout, PackDetailLayout

  domain/                   # Nucleo de negocio (sin dependencias externas)
    models/                 # Interfaces: Pack, Flight, Product, Accommodation, Experience
    services/               # Puertos/interfaces de servicios

  infrastructure/           # Adaptadores de salida
    repositories/           # Implementaciones de repositorios (mock/API)
    adapters/               # Adaptadores de datos externos
    mocks/                  # Datos mock realistas

  hooks/                    # Custom hooks (useFlightSearch, etc.)
  lib/                      # Utilidades (formatPrice, generateJsonLd, seo helpers)
  styles/                   # globals.css, design tokens
```

### Patrones de Diseno

1. **Repository Pattern**: Abstraccion para data fetching - permite cambiar de mock a API real sin tocar componentes
2. **Strategy Pattern**: Para manejar diferentes proveedores de afiliados (GetYourGuide, Civitatis, Amazon) con una interfaz comun
3. **Adapter Pattern**: Normalizar datos de diferentes fuentes/APIs
4. **Factory Pattern**: Crear tarjetas de diferentes tipos dinamicamente
5. **Composite Pattern**: Componentes atomicos que se componen en organismos

### Nota sobre Atomic Design en 2025
La comunidad reconoce que Atomic Design puro puede ser rigido para apps complejas. Adoptamos una version pragmatica:
- Usamos atoms, molecules, organisms y templates
- NO usamos la capa "pages" de Atomic Design (la reemplaza App Router)
- Combinamos con hexagonal para separar dominio de presentacion

## 4. Estrategia SEO Completa

### Metadata API (Next.js)
- **Metadata estatica**: Export `metadata` en layouts/pages para contenido fijo
- **Metadata dinamica**: `generateMetadata()` en paginas de detalle (packs, productos)
- **Open Graph**: Titulo, descripcion, imagen para cada pagina
- **Twitter Cards**: summary_large_image para packs de viaje

### JSON-LD Structured Data
Esquemas Schema.org a implementar:

```typescript
// Para packs de viaje
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Ruta por Tailandia",
  "description": "...",
  "touristType": "Adventure",
  "itinerary": {
    "@type": "ItemList",
    "itemListElement": [...]
  }
}

// Para productos Amazon
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Maleta Samsonite...",
  "offers": { "@type": "Offer", ... }
}

// Para la organizacion
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Idea Travel",
  "url": "..."
}

// Breadcrumbs
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  ...
}
```

### Rendering Strategy por Seccion
| Seccion | Estrategia | Justificacion |
|---|---|---|
| Home | SSG + ISR | Contenido semi-estatico, revalidar cada hora |
| Packs listado | SSG + ISR | Los packs cambian poco, revalidar cada hora |
| Pack detalle | SSG con generateStaticParams | Una pagina por pack, totalmente estatica |
| Vuelos | SSR/CSR hibrido | Formulario interactivo, pero la pagina base es SSR |
| Tienda | SSG + ISR | Productos cambian poco |

### Checklist SEO Tecnico
- [x] `robots.ts` dinamico
- [x] `sitemap.ts` dinamico con todas las rutas
- [x] Canonical URLs en cada pagina
- [x] Semantic HTML (article, section, nav, main, aside, header, footer)
- [x] Heading hierarchy (h1 > h2 > h3, sin saltos)
- [x] Alt texts descriptivos en imagenes
- [x] Core Web Vitals optimizados (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- [x] Lazy loading con next/image
- [x] Font display swap
- [x] Minimo JavaScript del lado del cliente

## 5. Diseno y UX

### Tendencias Travel 2025-2026
- **Inmersion visual**: Imagenes full-width, overlays con gradientes, fotografia como protagonista
- **Tipografia bold**: Titulares grandes y expresivos, sans-serif modernas
- **Asimetria controlada**: Layouts no predecibles pero coherentes
- **Micro-interacciones CSS**: Hover effects con transforms, transiciones suaves
- **Whitespace generoso**: Respirar entre secciones
- **Mobile-first**: 57%+ del trafico es movil

### Paleta de Colores (sugerida para investigar mas en /ui-design)
- Inspiracion en naturaleza, aventura, confianza
- Evitar gradientes morados tipicos de IA
- Colores que evocan destinos: azules oceano, verdes bosque, arena calida

### Tipografias (sugerida para investigar mas en /ui-design)
- Variable fonts para reducir carga (un archivo, multiples weights)
- Combinacion serif premium (headings) + sans-serif legible (body)
- font-display: swap obligatorio

### Accesibilidad WCAG 2.1 AA
- Contraste minimo 4.5:1 para texto normal, 3:1 para texto grande
- Focus indicators visibles y personalizados
- Skip to content link
- Aria-labels en todos los elementos interactivos sin texto visible
- prefers-reduced-motion para desactivar animaciones
- Navegacion completa por teclado
- Labels asociados a inputs de formulario

## 6. Estructura de Afiliados

### Google y Links de Afiliados
- **No hay penalizacion automatica** por usar links de afiliados (Google lo ha confirmado)
- **Mejor practica**: Usar `rel="sponsored"` (mas semantico que nofollow para afiliados)
- **Tambien aceptable**: `rel="nofollow sponsored"` (doble atributo por seguridad)
- **Obligatorio**: Contenido original y de valor (no thin affiliate content)
- **Disclosure**: Legalmente requerido, visible antes de los links

### Implementacion Tecnica
```html
<a href="https://getyourguide.com/..."
   rel="nofollow sponsored"
   target="_blank">
  Ver experiencia
</a>
```

### Proveedores de Afiliados
| Proveedor | Comision | Cookie | Integracion |
|---|---|---|---|
| GetYourGuide | Variable | Via link | Deep links con parametro de afiliado |
| Civitatis | 8-10% | 30 dias | Links con ID de afiliado al final |
| Amazon Associates | 1-10% segun categoria | 24h | Links de producto con tag de asociado |

### Estrategia Anti-Penalizacion
1. Contenido original y extenso en cada pack (no copiar de proveedores)
2. Descripciones propias para productos Amazon
3. Valor anadido: comparativas, opiniones, rutas curadas
4. Disclosure de afiliados visible en header/footer y antes de links
5. Balance de links: no todo link debe ser de afiliado

## 7. Docker Setup

### Dockerfile Multi-Stage
- **Stage deps**: Instalar dependencias con `npm ci`
- **Stage dev**: Para desarrollo con hot reload
- **Stage builder**: Build de produccion
- **Stage runner**: Imagen minima de produccion con standalone output

### Docker Compose (Desarrollo)
```yaml
services:
  app:
    build:
      context: .
      target: dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules    # Named volume para evitar conflictos
      - /app/.next           # Named volume para cache de build
    environment:
      - WATCHPACK_POLLING=true  # Necesario para hot reload en Docker/Windows
```

### Claves para Hot Reload
- `WATCHPACK_POLLING=true` es CRITICO en Windows/Docker
- Named volumes para node_modules y .next evitan conflictos de version
- Target `dev` en el Dockerfile usa `npm run dev`

## 8. Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigacion |
|---|---|---|
| Thin affiliate content penalizado por Google | Alto | Contenido original, extenso y de valor en cada pagina |
| Core Web Vitals bajos por imagenes | Medio | next/image, lazy loading, formatos WebP/AVIF |
| Hot reload no funciona en Docker/Windows | Medio | WATCHPACK_POLLING=true, volumes correctos |
| Over-engineering con hexagonal | Bajo | Version simplificada, no purista |
| Accesibilidad insuficiente | Medio | Checklist WCAG 2.1 AA en code review |

## 9. Referencias

### Next.js y SEO
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Complete Next.js SEO Guide](https://www.adeelhere.com/blog/2025-12-09-complete-nextjs-seo-guide-from-zero-to-hero)
- [Next.js SEO Best Practices 2025](https://www.averagedevs.com/blog/nextjs-seo-best-practices)
- [Next.js Core Web Vitals Optimization](https://eastondev.com/blog/en/posts/dev/20251219-nextjs-core-web-vitals/)

### Structured Data
- [Schema.org TouristTrip](https://schema.org/TouristTrip)
- [Schema.org TravelAction](https://schema.org/TravelAction)
- [11 Schema Markup Strategies for Travel](https://blackbearmedia.io/11-powerful-schema-markup-strategies-for-travel-websites/)

### Afiliados y SEO
- [Google and Affiliate Links 2025](https://theseoguidebook.com/google-affiliate-links-2025/)
- [Nofollow Links in Affiliate Marketing](https://www.postaffiliatepro.com/faq/nofollow-links-affiliate-marketing/)
- [Civitatis Affiliate Program](https://www.civitatis.com/en/affiliates/)
- [GetYourGuide Affiliate Program](https://partner.getyourguide.com/)

### Arquitectura
- [Atomic Hexagonal Architecture with React](https://newlight77.medium.com/the-atomic-hexagonal-architecture-on-the-frontend-with-react-6337a56e56e3)
- [Hexagonal Architecture in Frontend](https://www.dimitri-dumont.fr/en/blog/hexagonal-architecture-front-end)
- [Atomic Design in 2025](https://dev.to/m_midas/atomic-design-and-its-relevance-in-frontend-in-2025-32e9)

### Diseno y UX
- [Travel Website Design Trends 2026](https://colorwhistle.com/travel-website-design-trends/)
- [Web Design Trends 2026](https://reallygooddesigns.com/web-design-trends-2026/)
- [Awwwards Travel Tourism](https://www.awwwards.com/websites/travel-tourism/)

### Accesibilidad
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)

### Docker
- [Next.js Docker Hot Reload](https://medium.com/@elifront/best-next-js-docker-compose-hot-reload-production-ready-docker-setup-28a9125ba1dc)
- [Next.js Docker Configuration](https://oneuptime.com/blog/post/2026-01-24-nextjs-docker-configuration/view)
