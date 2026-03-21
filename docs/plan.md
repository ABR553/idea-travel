# Plan Tecnico - Idea Travel

## Fase 0: Setup Inicial
**Complejidad: Baja**

### 0.1 Inicializar proyecto Next.js
- **Archivos**: `package.json`, `tsconfig.json`, `next.config.ts`
- **Que hace**: Crear proyecto Next.js 15 con TypeScript, Tailwind CSS, App Router
- **Comando**: `npx create-next-app@latest . --typescript --tailwind --app --src-dir --eslint`
- **Patron**: N/A
- **Dependencias**: Ninguna
- **Criterio**: `npm run dev` arranca sin errores

### 0.2 Configurar TypeScript estricto
- **Archivos**: `tsconfig.json`
- **Que hace**: Activar strict mode, noUncheckedIndexedAccess, exactOptionalPropertyTypes
- **Patron**: N/A
- **Dependencias**: 0.1
- **Criterio**: Compilacion exitosa con strict mode

### 0.3 Configurar ESLint y Prettier
- **Archivos**: `.eslintrc.json`, `.prettierrc`
- **Que hace**: Reglas de linting y formateo consistentes
- **Dependencias**: 0.1
- **Criterio**: `npm run lint` pasa sin errores

### 0.4 Estructura de carpetas
- **Archivos**: Crear directorios vacios con `.gitkeep` o archivos index
- **Que hace**: Crear toda la estructura de src/ segun arquitectura definida
- **Patron**: Hexagonal + Atomic Design
- **Dependencias**: 0.1
- **Criterio**: Estructura completa creada

```
src/
  app/
    packs/[slug]/
    vuelos/
    tienda/
  components/atoms/
  components/molecules/
  components/organisms/
  components/templates/
  domain/models/
  domain/services/
  infrastructure/repositories/
  infrastructure/adapters/
  infrastructure/mocks/
  hooks/
  lib/
  styles/
```

### 0.5 Configurar Docker
- **Archivos**: `Dockerfile`, `docker-compose.yml`, `.dockerignore`
- **Que hace**: Setup de Docker multi-stage con hot reload (ya creados, verificar que funcionen)
- **Dependencias**: 0.1
- **Criterio**: `docker-compose up --build` levanta el proyecto y hot reload funciona

### 0.6 Configurar Next.js para produccion
- **Archivos**: `next.config.ts`
- **Que hace**: Activar standalone output, optimizacion de imagenes, headers de seguridad
- **Dependencias**: 0.1
- **Criterio**: `npm run build` genera output standalone

### 0.7 Git init
- **Archivos**: `.gitignore`
- **Que hace**: Inicializar repositorio git con .gitignore adecuado
- **Dependencias**: 0.1
- **Criterio**: `.gitignore` incluye node_modules, .next, .env*.local, etc.

---

## Fase 1: Arquitectura Base
**Complejidad: Media**

### 1.1 Modelos del dominio
- **Archivos**:
  - `src/domain/models/pack.types.ts`
  - `src/domain/models/flight.types.ts`
  - `src/domain/models/product.types.ts`
  - `src/domain/models/common.types.ts`
- **Que hace**: Definir todas las interfaces TypeScript del dominio
- **Patron**: Interface Segregation Principle (ISP)
- **Dependencias**: 0.4
- **Criterio**: Interfaces completas, sin `any`, cubren todos los datos necesarios

```typescript
// pack.types.ts
interface Pack {
  id: string;
  slug: string;
  title: string;
  description: string;
  destinations: Destination[];
  route: RouteStep[];
  accommodations: Accommodation[];  // siempre 3: budget, standard, premium
  experiences: Experience[];
  coverImage: string;
  duration: string;
  price: PriceRange;
  featured: boolean;
}

interface Destination {
  name: string;
  country: string;
  description: string;
  image: string;
}

interface RouteStep {
  day: number;
  title: string;
  description: string;
  destination: string;
}

interface Accommodation {
  id: string;
  name: string;
  tier: 'budget' | 'standard' | 'premium';
  description: string;
  pricePerNight: number;
  image: string;
  amenities: string[];
  rating: number;
}

interface Experience {
  id: string;
  title: string;
  description: string;
  provider: 'getyourguide' | 'civitatis';
  affiliateUrl: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
}

// flight.types.ts
interface FlightSearch {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: PassengerCount;
  class: FlightClass;
  tripType: 'roundtrip' | 'oneway';
}

type FlightClass = 'economy' | 'business' | 'first';

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

// product.types.ts
interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;   // nuestra descripcion, NO de Amazon
  category: ProductCategory;
  price: number;
  affiliateUrl: string;
  image: string;
  rating: number;
}

type ProductCategory = 'luggage' | 'electronics' | 'accessories' | 'comfort' | 'photography';
```

### 1.2 Interfaces de servicios (puertos)
- **Archivos**:
  - `src/domain/services/pack.service.ts`
  - `src/domain/services/product.service.ts`
- **Que hace**: Definir interfaces de servicios (puertos en hexagonal)
- **Patron**: Dependency Inversion Principle (DIP)
- **Dependencias**: 1.1
- **Criterio**: Interfaces claras que no dependen de implementacion

```typescript
// pack.service.ts
interface IPackService {
  getAllPacks(): Promise<Pack[]>;
  getPackBySlug(slug: string): Promise<Pack | null>;
  getFeaturedPacks(): Promise<Pack[]>;
}

// product.service.ts
interface IProductService {
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: ProductCategory): Promise<Product[]>;
}
```

### 1.3 Datos mock realistas
- **Archivos**:
  - `src/infrastructure/mocks/packs.mock.ts`
  - `src/infrastructure/mocks/products.mock.ts`
- **Que hace**: Crear datos mock con contenido realista (minimo 6 packs, 12 productos)
- **Patron**: Adapter Pattern
- **Dependencias**: 1.1
- **Criterio**: Datos variados, precios coherentes, destinos reales, descripciones atractivas

Packs sugeridos:
1. Tailandia 10 dias (Bangkok, Chiang Mai, islas)
2. Japon 12 dias (Tokyo, Kyoto, Osaka)
3. Marruecos 7 dias (Marrakech, Fez, Sahara)
4. Italia 8 dias (Roma, Florencia, Venecia)
5. Peru 10 dias (Lima, Cusco, Machu Picchu)
6. Islandia 7 dias (Reykjavik, Golden Circle, glaciares)

### 1.4 Repositorios (implementaciones)
- **Archivos**:
  - `src/infrastructure/repositories/pack.repository.ts`
  - `src/infrastructure/repositories/product.repository.ts`
- **Que hace**: Implementar repositorios que usan mocks (luego se pueden cambiar por API)
- **Patron**: Repository Pattern + Open/Closed Principle
- **Dependencias**: 1.2, 1.3
- **Criterio**: Implementan las interfaces de servicio, devuelven datos mock

### 1.5 Helpers y utilidades
- **Archivos**:
  - `src/lib/seo.ts` (generateJsonLd, generateBreadcrumbJsonLd)
  - `src/lib/format.ts` (formatPrice, formatDate, formatDuration)
  - `src/lib/constants.ts` (SITE_NAME, SITE_URL, DEFAULT_METADATA)
- **Que hace**: Funciones helper reutilizables
- **Patron**: Single Responsibility Principle
- **Dependencias**: 1.1
- **Criterio**: Funciones puras, bien tipadas, sin side effects

### 1.6 Layout principal
- **Archivos**:
  - `src/app/layout.tsx` (root layout con metadata global, fuentes, estructura HTML)
  - `src/app/not-found.tsx` (pagina 404 custom)
  - `src/app/loading.tsx` (loading state global)
- **Que hace**: Definir estructura HTML base con semantic markup, metadata global, fuentes
- **Patron**: Composite Pattern
- **Dependencias**: 1.5, design-system.md
- **Criterio**: HTML semantico, metadata completa, fuentes cargadas con swap

### 1.7 SEO base
- **Archivos**:
  - `src/app/robots.ts`
  - `src/app/sitemap.ts`
- **Que hace**: Generar robots.txt y sitemap.xml dinamicamente
- **Patron**: N/A
- **Dependencias**: 1.5
- **Criterio**: robots.txt permite crawling correcto, sitemap incluye todas las rutas

---

## Fase 2: Packs de Viaje
**Complejidad: Alta**

### 2.1 Componentes atomicos para packs
- **Archivos**:
  - `src/components/atoms/Button.tsx`
  - `src/components/atoms/Badge.tsx`
  - `src/components/atoms/Typography.tsx`
  - `src/components/atoms/Skeleton.tsx`
  - `src/components/atoms/Rating.tsx`
- **Que hace**: Componentes base reutilizables con variantes
- **Patron**: Single Responsibility, Open/Closed (variantes via props)
- **Dependencias**: Fase 1, design-system.md
- **Criterio**: Componentes con props tipadas, variantes, estados, accesibles

### 2.2 PackCard (molecula)
- **Archivos**: `src/components/molecules/PackCard.tsx`
- **Que hace**: Tarjeta de pack para listados con imagen, destinos, precio, CTA
- **Patron**: Composite Pattern
- **Dependencias**: 2.1
- **Criterio**: Responsive, accesible, hover effects, link a detalle

### 2.3 AccommodationCard (molecula)
- **Archivos**: `src/components/molecules/AccommodationCard.tsx`
- **Que hace**: Tarjeta de alojamiento con 3 variantes (budget/standard/premium)
- **Patron**: Strategy Pattern (visual por tier)
- **Dependencias**: 2.1
- **Criterio**: Variante standard destacada como "recomendada"

### 2.4 ExperienceCard (molecula)
- **Archivos**: `src/components/molecules/ExperienceCard.tsx`
- **Que hace**: Tarjeta de experiencia con deep link de afiliado
- **Patron**: Strategy Pattern (por proveedor)
- **Dependencias**: 2.1
- **Criterio**: Links con rel="nofollow sponsored", target="_blank", disclosure visible

### 2.5 PackGrid (organismo)
- **Archivos**: `src/components/organisms/PackGrid.tsx`
- **Que hace**: Grid responsive de PackCards
- **Patron**: Composite Pattern
- **Dependencias**: 2.2
- **Criterio**: Layout responsive, animaciones de entrada

### 2.6 Pagina listado de packs
- **Archivos**: `src/app/packs/page.tsx`
- **Que hace**: Pagina SSG que muestra todos los packs
- **Patron**: N/A
- **Dependencias**: 2.5, 1.4, 1.5
- **Criterio**: Metadata, JSON-LD, semantic HTML, loading state

### 2.7 Pagina detalle de pack
- **Archivos**: `src/app/packs/[slug]/page.tsx`
- **Que hace**: Pagina detalle con ruta, alojamientos, experiencias
- **Patron**: generateStaticParams para SSG
- **Dependencias**: 2.3, 2.4, 1.4, 1.5
- **Criterio**: Metadata dinamica, JSON-LD TouristTrip, breadcrumbs, semantic HTML completo

Secciones de la pagina de detalle:
1. Hero con imagen y titulo del pack
2. Descripcion y resumen (duracion, destinos, precio desde)
3. Ruta dia a dia (timeline visual)
4. Alojamientos (3 tarjetas: budget, standard, premium)
5. Experiencias (grid de ExperienceCards con links de afiliados)
6. Disclosure de afiliados

---

## Fase 3: Buscador de Vuelos
**Complejidad: Media**

### 3.1 Componentes de formulario
- **Archivos**:
  - `src/components/atoms/Input.tsx`
  - `src/components/atoms/Select.tsx`
  - `src/components/atoms/DatePicker.tsx`
  - `src/components/molecules/PassengerSelector.tsx`
- **Que hace**: Inputs accesibles con labels, validacion visual, iconos
- **Patron**: Single Responsibility
- **Dependencias**: 2.1 (reutilizar atoms existentes), design-system.md
- **Criterio**: Accesibles, con aria-labels, validacion visual, responsive

### 3.2 FlightSearchForm (organismo)
- **Archivos**: `src/components/organisms/FlightSearchForm.tsx`
- **Que hace**: Formulario completo de busqueda de vuelos ("use client")
- **Patron**: Observer Pattern (estado reactivo del formulario)
- **Dependencias**: 3.1
- **Criterio**: Validacion completa, UX fluida, accesible, responsive

Campos:
- Tipo de viaje (ida y vuelta / solo ida)
- Origen (input con placeholder)
- Destino (input con placeholder)
- Fecha ida (date picker)
- Fecha vuelta (date picker, condicional)
- Pasajeros (adultos, ninos, bebes con +/-)
- Clase (economy, business, first)
- Boton buscar

### 3.3 Hook useFlightSearch
- **Archivos**: `src/hooks/useFlightSearch.ts`
- **Que hace**: Gestiona estado del formulario y validacion
- **Patron**: Custom Hook (Single Responsibility)
- **Dependencias**: 1.1
- **Criterio**: Estado tipado, validacion, submit handler

### 3.4 Pagina de vuelos
- **Archivos**: `src/app/vuelos/page.tsx`
- **Que hace**: Pagina con formulario de busqueda centrado
- **Patron**: N/A
- **Dependencias**: 3.2, 1.5
- **Criterio**: Metadata SEO, semantic HTML, formulario funcional

---

## Fase 4: Tienda Amazon
**Complejidad: Media**

### 4.1 ProductCard (molecula)
- **Archivos**: `src/components/molecules/ProductCard.tsx`
- **Que hace**: Tarjeta de producto con imagen, descripcion propia, precio, link Amazon
- **Patron**: Single Responsibility
- **Dependencias**: 2.1
- **Criterio**: Link con rel="nofollow sponsored", disclosure, responsive

### 4.2 ProductGrid (organismo)
- **Archivos**: `src/components/organisms/ProductGrid.tsx`
- **Que hace**: Grid de productos por categorias
- **Patron**: Composite Pattern
- **Dependencias**: 4.1
- **Criterio**: Filtrado por categoria, responsive

### 4.3 Pagina de tienda
- **Archivos**: `src/app/tienda/page.tsx`
- **Que hace**: Pagina con productos por categorias
- **Patron**: N/A
- **Dependencias**: 4.2, 1.4, 1.5
- **Criterio**: Metadata, JSON-LD Product, filtros por categoria, disclosure de afiliados

---

## Fase 5: Componentes Globales y Home
**Complejidad: Media-Alta**

### 5.1 Header (organismo)
- **Archivos**: `src/components/organisms/Header.tsx`
- **Que hace**: Navegacion sticky con blur, logo, links, menu mobile, disclosure bar
- **Patron**: Composite Pattern
- **Dependencias**: 2.1, design-system.md
- **Criterio**: Sticky, responsive, menu hamburger animado, disclosure visible, accesible

### 5.2 Footer (organismo)
- **Archivos**: `src/components/organisms/Footer.tsx`
- **Que hace**: Footer con links, disclosure legal, info
- **Patron**: Single Responsibility
- **Dependencias**: 2.1
- **Criterio**: Links funcionales, disclosure, semantic HTML

### 5.3 Hero (organismo)
- **Archivos**: `src/components/organisms/Hero.tsx`
- **Que hace**: Hero section impactante para home
- **Patron**: Single Responsibility
- **Dependencias**: 2.1, design-system.md
- **Criterio**: Visualmente impactante, CTA claro, responsive, accesible

### 5.4 Breadcrumbs (molecula)
- **Archivos**: `src/components/molecules/Breadcrumbs.tsx`
- **Que hace**: Breadcrumbs con JSON-LD structured data
- **Patron**: N/A
- **Dependencias**: 1.5
- **Criterio**: JSON-LD BreadcrumbList, semantic nav, accesible

### 5.5 Home page
- **Archivos**: `src/app/page.tsx`
- **Que hace**: Pagina principal con Hero + Packs destacados + CTA vuelos + Productos populares
- **Patron**: Composite Pattern
- **Dependencias**: 5.1, 5.2, 5.3, 2.5, 4.2
- **Criterio**: Above the fold impactante, metadata completa, JSON-LD WebSite, LCP optimizado

Layout del Home:
1. Hero section con headline + CTA
2. Seccion "Packs Destacados" (3-4 packs featured)
3. Seccion "Encuentra tu vuelo" (mini formulario o CTA a /vuelos)
4. Seccion "Equipate para tu viaje" (4-6 productos populares)
5. Footer

### 5.6 Template PageLayout
- **Archivos**: `src/components/templates/PageLayout.tsx`
- **Que hace**: Template reutilizable para paginas interiores (titulo, breadcrumbs, contenido)
- **Patron**: Template Pattern
- **Dependencias**: 5.1, 5.2, 5.4
- **Criterio**: Consistencia entre paginas, semantic HTML

---

## Fase 6: Optimizacion y Verificacion
**Complejidad: Baja-Media**

### 6.1 Optimizacion de imagenes
- **Archivos**: Componentes que usan imagenes
- **Que hace**: Verificar uso de next/image, sizes, priority en LCP, placeholder blur
- **Dependencias**: Todas las fases anteriores
- **Criterio**: Todas las imagenes usan next/image con dimensiones

### 6.2 Loading states
- **Archivos**:
  - `src/app/loading.tsx`
  - `src/app/packs/loading.tsx`
  - `src/app/tienda/loading.tsx`
- **Que hace**: Skeleton loaders para cada seccion
- **Dependencias**: 2.1 (Skeleton atom)
- **Criterio**: Loading states coherentes con el layout final

### 6.3 Error boundaries
- **Archivos**:
  - `src/app/error.tsx`
  - `src/app/packs/[slug]/not-found.tsx`
- **Que hace**: Paginas de error y 404 con diseno coherente
- **Dependencias**: 5.6
- **Criterio**: UX amigable, links de navegacion, coherente con diseno

### 6.4 Verificacion Docker
- **Que hace**: Verificar que `docker-compose up --build` funciona correctamente
- **Dependencias**: Todo
- **Criterio**: Proyecto arranca, hot reload funciona, paginas cargan correctamente

### 6.5 Verificacion SEO final
- **Que hace**: Verificar metadata, JSON-LD, semantic HTML, heading hierarchy en todas las paginas
- **Dependencias**: Todo
- **Criterio**: Cada pagina tiene metadata unica, JSON-LD valido, h1>h2>h3 correcto
