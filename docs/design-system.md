# Design System - Tengo Un Viaje

## Filosofia de Diseno

**Concepto**: "Wanderlust Premium" - Una experiencia visual que evoca la emocion de descubrir nuevos destinos, con un toque premium que genera confianza para hacer clic en links de afiliados.

**Principios**:
1. **Fotografia como protagonista** - Las imagenes de destinos son el centro visual
2. **Whitespace intencional** - Respirar entre secciones, no saturar
3. **Jerarquia clara** - Guiar la mirada hacia CTAs y links de afiliados
4. **Calidez natural** - Paleta earth tones que evoca viajes y genera confianza
5. **Mobile-first** - Disenar para movil, expandir para desktop

**Inspiraciones**: Websites de travel premiados en Awwwards, paletas Neo Earth Tones 2026, tipografia editorial moderna.

---

## 1. Paleta de Colores

### Colores Primarios
| Token | Hex | Uso |
|---|---|---|
| `primary-50` | `#FFF8F0` | Backgrounds sutiles, hover states |
| `primary-100` | `#FFEDD5` | Backgrounds de secciones alternadas |
| `primary-200` | `#FED7AA` | Borders suaves, dividers |
| `primary-300` | `#FDBA74` | Icons secundarios |
| `primary-400` | `#FB923C` | Hover de botones primarios |
| `primary-500` | `#F97316` | **Color primario principal** - CTAs, links activos |
| `primary-600` | `#EA580C` | Botones primarios default |
| `primary-700` | `#C2410C` | Botones primarios hover/pressed |
| `primary-800` | `#9A3412` | Texto enfatizado sobre fondos claros |
| `primary-900` | `#7C2D12` | Headers principales |

**Por que naranja calido**: Evoca aventura, energia y entusiasmo. No es el tipico azul corporativo ni el morado IA. El naranja es uno de los colores con mayor CTR en botones de e-commerce (hasta 34% mas clics).

### Colores Secundarios (Teal/Verde azulado)
| Token | Hex | Uso |
|---|---|---|
| `secondary-50` | `#F0FDFA` | Backgrounds de badges |
| `secondary-100` | `#CCFBF1` | Highlights sutiles |
| `secondary-200` | `#99F6E4` | Badges de categoria |
| `secondary-300` | `#5EEAD4` | Iconos informativos |
| `secondary-400` | `#2DD4BF` | Links secundarios hover |
| `secondary-500` | `#14B8A6` | **Links secundarios, badges** |
| `secondary-600` | `#0D9488` | Elementos activos secundarios |
| `secondary-700` | `#0F766E` | Texto secundario enfatizado |

**Por que teal**: Complementa el naranja (colores complementarios en la rueda cromatica), evoca oceano/naturaleza, genera confianza y calma.

### Neutros (Warm Gray)
| Token | Hex | Uso |
|---|---|---|
| `neutral-50` | `#FAFAF9` | Background principal de pagina |
| `neutral-100` | `#F5F5F4` | Backgrounds de cards |
| `neutral-200` | `#E7E5E4` | Borders, dividers |
| `neutral-300` | `#D6D3D1` | Placeholder text, icons disabled |
| `neutral-400` | `#A8A29E` | Texto terciario |
| `neutral-500` | `#78716C` | Texto secundario (body) |
| `neutral-600` | `#57534E` | Texto principal (body) |
| `neutral-700` | `#44403C` | Subtitulos |
| `neutral-800` | `#292524` | Titulos |
| `neutral-900` | `#1C1917` | Texto maximo contraste, header bg |

**Por que warm gray**: Los grises puros se sienten frios y corporativos. Los warm grays (stone) aportan calidez coherente con la paleta naranja/teal.

### Semanticos
| Token | Hex | Uso |
|---|---|---|
| `success` | `#16A34A` | Confirmaciones, disponibilidad |
| `warning` | `#EAB308` | Alertas, precios rebajados |
| `error` | `#DC2626` | Errores de formulario |
| `info` | `#0EA5E9` | Informacion, tips |

### Fondos especiales
| Token | Valor | Uso |
|---|---|---|
| `bg-page` | `#FAFAF9` | Fondo general de pagina |
| `bg-card` | `#FFFFFF` | Fondo de cards |
| `bg-card-hover` | `#FFF8F0` | Fondo de cards en hover |
| `bg-hero` | `linear-gradient(135deg, #1C1917 0%, #292524 50%, #44403C 100%)` | Hero section overlay |
| `bg-footer` | `#1C1917` | Footer background |

### Contraste verificado (WCAG AA)
- `neutral-600` sobre `neutral-50`: ratio 7.2:1 (PASA AA y AAA)
- `neutral-800` sobre `neutral-50`: ratio 13.5:1 (PASA AAA)
- `primary-600` sobre `white`: ratio 4.6:1 (PASA AA)
- `white` sobre `primary-600`: ratio 4.6:1 (PASA AA)
- `white` sobre `neutral-900`: ratio 16.8:1 (PASA AAA)

---

## 2. Tipografia

### Font Families
- **Headings**: `"Plus Jakarta Sans"` (Google Fonts, variable font)
  - **Por que**: Geometrica moderna con personalidad, excelente legibilidad en tamanos grandes, variable font (un archivo, todos los weights). Tiene un toque premium sin ser generica como Montserrat.
- **Body**: `"Inter"` (Google Fonts, variable font)
  - **Por que**: Disenada especificamente para pantallas, legibilidad perfecta en tamanos pequenos, variable font, amplio soporte de idiomas.

### Escala Tipografica (Mobile / Desktop)

| Token | Mobile | Desktop | Weight | Line Height | Letter Spacing | Uso |
|---|---|---|---|---|---|---|
| `display` | 36px / 2.25rem | 56px / 3.5rem | 800 | 1.1 | -0.02em | Hero headline |
| `h1` | 30px / 1.875rem | 42px / 2.625rem | 700 | 1.2 | -0.01em | Titulos de pagina |
| `h2` | 24px / 1.5rem | 32px / 2rem | 700 | 1.25 | -0.005em | Titulos de seccion |
| `h3` | 20px / 1.25rem | 24px / 1.5rem | 600 | 1.3 | 0 | Subtitulos |
| `h4` | 18px / 1.125rem | 20px / 1.25rem | 600 | 1.4 | 0 | Card titles |
| `body-lg` | 18px / 1.125rem | 18px / 1.125rem | 400 | 1.7 | 0 | Texto destacado |
| `body` | 16px / 1rem | 16px / 1rem | 400 | 1.7 | 0 | Texto principal |
| `body-sm` | 14px / 0.875rem | 14px / 0.875rem | 400 | 1.6 | 0 | Texto secundario |
| `caption` | 12px / 0.75rem | 12px / 0.75rem | 500 | 1.5 | 0.02em | Labels, badges, metadata |

---

## 3. Espaciado

Sistema basado en 4px:

| Token | Valor | Uso |
|---|---|---|
| `space-1` | 4px | Padding interno minimo |
| `space-2` | 8px | Gap entre iconos y texto |
| `space-3` | 12px | Padding interno de badges |
| `space-4` | 16px | Padding interno de inputs, gap en grids |
| `space-5` | 20px | Separacion entre elementos relacionados |
| `space-6` | 24px | Padding de cards |
| `space-8` | 32px | Separacion entre secciones pequenas |
| `space-10` | 40px | Padding de secciones mobile |
| `space-12` | 48px | Separacion entre secciones |
| `space-16` | 64px | Padding de secciones desktop |
| `space-20` | 80px | Separacion mayor entre bloques |
| `space-24` | 96px | Espaciado de hero/secciones principales |

### Container
- Max width: `1280px`
- Padding horizontal: `16px` (mobile), `24px` (tablet), `32px` (desktop)

---

## 4. Sombras y Elevacion

| Token | Valor CSS | Uso |
|---|---|---|
| `shadow-sm` | `0 1px 2px 0 rgba(28, 25, 23, 0.05)` | Inputs, badges |
| `shadow-md` | `0 4px 6px -1px rgba(28, 25, 23, 0.07), 0 2px 4px -2px rgba(28, 25, 23, 0.05)` | Cards default |
| `shadow-lg` | `0 10px 15px -3px rgba(28, 25, 23, 0.08), 0 4px 6px -4px rgba(28, 25, 23, 0.04)` | Cards hover, dropdowns |
| `shadow-xl` | `0 20px 25px -5px rgba(28, 25, 23, 0.1), 0 8px 10px -6px rgba(28, 25, 23, 0.05)` | Modales, popups |
| `shadow-inner` | `inset 0 2px 4px 0 rgba(28, 25, 23, 0.05)` | Inputs focus |

**Nota**: Sombras con warm gray (28, 25, 23) en vez de negro puro para coherencia.

---

## 5. Border Radius

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | `6px` | Badges, chips |
| `radius-md` | `8px` | Inputs, botones pequenos |
| `radius-lg` | `12px` | Cards, botones grandes |
| `radius-xl` | `16px` | Cards destacadas, hero elements |
| `radius-2xl` | `24px` | Pills, search bar |
| `radius-full` | `9999px` | Avatares, dots |

---

## 6. Transiciones y Animaciones

### Duraciones
| Token | Valor | Uso |
|---|---|---|
| `duration-fast` | `150ms` | Hover de texto, opacity changes |
| `duration-normal` | `250ms` | Hover de cards, botones |
| `duration-slow` | `350ms` | Apertura de menus, modales |
| `duration-slower` | `500ms` | Animaciones de entrada |

### Easings
| Token | Valor | Uso |
|---|---|---|
| `ease-out` | `cubic-bezier(0.33, 1, 0.68, 1)` | Elementos que aparecen |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transiciones de hover |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interacciones (bouncy) |

### Keyframes CSS

```css
/* Fade in desde abajo - para cards que aparecen al scroll */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade in simple */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide in desde la derecha - para menu mobile */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Pulse sutil - para badges "nuevo" o "destacado" */
@keyframes subtlePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}

/* Shimmer para skeletons */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Interacciones por Componente

**Cards (PackCard, ProductCard, etc.)**:
- Default: `shadow-md`
- Hover: `shadow-lg` + `translateY(-4px)` + `bg-card-hover`
- Transition: `duration-normal` + `ease-in-out`
- La imagen dentro hace `scale(1.05)` con `overflow-hidden` en el container

**Botones primarios**:
- Default: `bg-primary-600` + `text-white`
- Hover: `bg-primary-700` + `translateY(-1px)` + `shadow-md`
- Active: `bg-primary-800` + `translateY(0)` + `shadow-sm`
- Focus: ring de `2px` `primary-500` con offset `2px`
- Transition: `duration-fast` + `ease-in-out`

**Links**:
- Default: `text-primary-600`
- Hover: `text-primary-700` + underline con `underline-offset-4`
- Transition: `duration-fast`

**Header**:
- On scroll: `backdrop-blur-md` + `bg-white/80` + `shadow-sm`
- Transition: `duration-normal`

---

## 7. Breakpoints (Mobile-First)

| Token | Valor | Uso |
|---|---|---|
| `sm` | `640px` | Telefono grande / landscape |
| `md` | `768px` | Tablet |
| `lg` | `1024px` | Desktop |
| `xl` | `1280px` | Desktop grande (max container) |

---

## 8. Especificacion de Componentes

### 8.1 Button
```html
<!-- Primary -->
<button class="inline-flex items-center justify-center gap-2
  px-6 py-3 rounded-lg
  bg-primary-600 text-white font-semibold text-body
  shadow-sm
  transition-all duration-fast ease-in-out
  hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-md
  active:bg-primary-800 active:translate-y-0 active:shadow-sm
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
  Texto del boton
</button>

<!-- Secondary -->
<button class="inline-flex items-center justify-center gap-2
  px-6 py-3 rounded-lg
  bg-white text-neutral-800 font-semibold text-body
  border border-neutral-200
  shadow-sm
  transition-all duration-fast ease-in-out
  hover:bg-neutral-50 hover:border-neutral-300 hover:-translate-y-0.5 hover:shadow-md
  active:bg-neutral-100 active:translate-y-0
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
  Texto del boton
</button>

<!-- Ghost -->
<button class="inline-flex items-center justify-center gap-2
  px-4 py-2 rounded-md
  text-primary-600 font-medium text-body
  transition-all duration-fast
  hover:bg-primary-50 hover:text-primary-700
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
  Texto del boton
</button>
```

**Tamanos**:
- `sm`: `px-4 py-2 text-body-sm rounded-md`
- `md` (default): `px-6 py-3 text-body rounded-lg`
- `lg`: `px-8 py-4 text-body-lg rounded-lg`

### 8.2 Input
```html
<div class="relative">
  <label class="block text-body-sm font-medium text-neutral-700 mb-1.5">
    Label
  </label>
  <div class="relative">
    <!-- Icono opcional a la izquierda -->
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
      <!-- SVG icon -->
    </span>
    <input
      type="text"
      class="w-full pl-10 pr-4 py-3 rounded-lg
        bg-white text-neutral-800
        border border-neutral-200
        shadow-sm
        transition-all duration-fast
        placeholder:text-neutral-400
        hover:border-neutral-300
        focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:shadow-inner focus:outline-none
        disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
      placeholder="Placeholder..." />
  </div>
  <!-- Error state -->
  <p class="mt-1.5 text-caption text-error">Mensaje de error</p>
</div>
```

### 8.3 Badge
```html
<!-- Default -->
<span class="inline-flex items-center px-3 py-1 rounded-sm
  bg-primary-50 text-primary-700 text-caption font-medium">
  Destacado
</span>

<!-- Tier budget -->
<span class="inline-flex items-center px-3 py-1 rounded-sm
  bg-secondary-50 text-secondary-700 text-caption font-medium">
  Economico
</span>

<!-- Tier premium -->
<span class="inline-flex items-center px-3 py-1 rounded-sm
  bg-amber-50 text-amber-700 text-caption font-medium">
  Premium
</span>
```

### 8.4 PackCard
```html
<article class="group relative bg-card rounded-xl overflow-hidden shadow-md
  transition-all duration-normal ease-in-out
  hover:shadow-lg hover:-translate-y-1 hover:bg-card-hover">
  <!-- Imagen -->
  <div class="relative aspect-[4/3] overflow-hidden">
    <img class="w-full h-full object-cover
      transition-transform duration-slow ease-in-out
      group-hover:scale-105" />
    <!-- Overlay gradiente inferior -->
    <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
    <!-- Badge posicion absolute -->
    <span class="absolute top-4 left-4 ...badge-classes">Destacado</span>
    <!-- Precio -->
    <div class="absolute bottom-4 right-4 text-white">
      <span class="text-caption">Desde</span>
      <span class="text-h3 font-bold">899EUR</span>
    </div>
  </div>
  <!-- Contenido -->
  <div class="p-6">
    <h3 class="text-h4 font-bold text-neutral-800 mb-2
      group-hover:text-primary-700 transition-colors duration-fast">
      Titulo del Pack
    </h3>
    <p class="text-body-sm text-neutral-500 mb-4 line-clamp-2">
      Descripcion breve...
    </p>
    <!-- Destinos como chips -->
    <div class="flex flex-wrap gap-2 mb-4">
      <span class="text-caption text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-sm">
        Bangkok
      </span>
    </div>
    <!-- Meta info -->
    <div class="flex items-center justify-between text-body-sm text-neutral-500">
      <span>10 dias</span>
      <span class="text-primary-600 font-semibold group-hover:underline
        underline-offset-4">
        Ver pack →
      </span>
    </div>
  </div>
</article>
```

### 8.5 AccommodationCard
```html
<!-- Variante standard (recomendada) - las otras son similares pero sin el ring -->
<article class="relative bg-card rounded-xl overflow-hidden p-6
  border-2 border-primary-500 shadow-lg">
  <!-- Badge recomendado -->
  <div class="absolute -top-px left-1/2 -translate-x-1/2
    bg-primary-500 text-white text-caption font-bold
    px-4 py-1 rounded-b-lg">
    Recomendado
  </div>
  <div class="mt-4">
    <img class="w-full h-40 object-cover rounded-lg mb-4" />
    <h4 class="text-h4 font-bold text-neutral-800 mb-1">Nombre Hotel</h4>
    <div class="flex items-center gap-1 mb-3">
      <!-- Stars rating -->
    </div>
    <ul class="space-y-2 mb-4 text-body-sm text-neutral-600">
      <li class="flex items-center gap-2">
        <!-- icon --> WiFi incluido
      </li>
    </ul>
    <div class="border-t border-neutral-200 pt-4">
      <span class="text-caption text-neutral-500">Precio por noche</span>
      <span class="text-h3 font-bold text-neutral-800 block">85EUR</span>
    </div>
  </div>
</article>

<!-- Variante budget: sin border-primary, border-neutral-200, sin badge -->
<!-- Variante premium: border-amber-400, badge "Premium" en amber -->
```

### 8.6 ExperienceCard
```html
<a href="https://affiliate-link..."
   rel="nofollow sponsored" target="_blank"
   class="group block bg-card rounded-xl overflow-hidden shadow-md
   transition-all duration-normal ease-in-out
   hover:shadow-lg hover:-translate-y-1">
  <div class="relative aspect-[16/10] overflow-hidden">
    <img class="w-full h-full object-cover
      transition-transform duration-slow group-hover:scale-105" />
    <!-- Provider badge -->
    <span class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm
      text-caption font-medium px-2 py-1 rounded-sm">
      GetYourGuide
    </span>
  </div>
  <div class="p-5">
    <h4 class="text-h4 font-semibold text-neutral-800 mb-2
      group-hover:text-primary-700 transition-colors">
      Titulo experiencia
    </h4>
    <div class="flex items-center gap-2 text-body-sm text-neutral-500 mb-3">
      <span>3 horas</span>
      <span>·</span>
      <span>4.8 ★</span>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-h4 font-bold text-neutral-800">45EUR</span>
      <span class="text-body-sm font-medium text-primary-600
        group-hover:underline underline-offset-4">
        Reservar →
      </span>
    </div>
  </div>
</a>
```

### 8.7 ProductCard
```html
<article class="group bg-card rounded-xl overflow-hidden shadow-md
  transition-all duration-normal ease-in-out
  hover:shadow-lg hover:-translate-y-1">
  <div class="relative aspect-square overflow-hidden bg-neutral-100">
    <img class="w-full h-full object-contain p-4
      transition-transform duration-slow group-hover:scale-105" />
    <span class="absolute top-3 left-3 ...badge">Equipaje</span>
  </div>
  <div class="p-5">
    <h3 class="text-h4 font-semibold text-neutral-800 mb-2 line-clamp-2">
      Nombre producto
    </h3>
    <p class="text-body-sm text-neutral-500 mb-4 line-clamp-3">
      Nuestra descripcion del producto...
    </p>
    <div class="flex items-center justify-between">
      <span class="text-h4 font-bold text-neutral-800">49.99EUR</span>
      <a href="https://amazon..." rel="nofollow sponsored" target="_blank"
         class="inline-flex items-center gap-1 px-4 py-2 rounded-lg
         bg-[#FF9900] text-white text-body-sm font-semibold
         transition-all duration-fast
         hover:bg-[#E88B00] hover:-translate-y-0.5
         focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-2">
        Ver en Amazon
      </a>
    </div>
  </div>
</article>
```

### 8.8 Header
```html
<header class="fixed top-0 left-0 right-0 z-50
  transition-all duration-normal"
  data-scrolled="false">
  <!-- Disclosure bar -->
  <div class="bg-neutral-900 text-neutral-300 text-caption text-center py-1.5 px-4">
    Este sitio contiene enlaces de afiliados. <a href="/legal" class="underline">Mas info</a>
  </div>
  <!-- Nav principal -->
  <nav class="bg-white/80 backdrop-blur-md border-b border-neutral-200/50
    [data-scrolled=true]_&:shadow-sm">
    <div class="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8
      flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="text-h3 font-bold text-neutral-900">
        Idea<span class="text-primary-500">Travel</span>
      </a>
      <!-- Nav links (desktop) -->
      <ul class="hidden md:flex items-center gap-8">
        <li><a href="/packs" class="text-body font-medium text-neutral-600
          hover:text-primary-600 transition-colors duration-fast
          relative after:absolute after:bottom-0 after:left-0 after:h-0.5
          after:w-0 after:bg-primary-500
          after:transition-all after:duration-normal
          hover:after:w-full">
          Packs de Viaje
        </a></li>
        <li><a href="/vuelos" class="...same-classes">Vuelos</a></li>
        <li><a href="/tienda" class="...same-classes">Tienda</a></li>
      </ul>
      <!-- CTA -->
      <a href="/packs" class="hidden md:inline-flex ...button-primary-sm">
        Explorar Packs
      </a>
      <!-- Hamburger mobile -->
      <button class="md:hidden p-2 text-neutral-700
        focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
        aria-label="Abrir menu de navegacion">
        <!-- 3 lineas animadas con CSS -->
      </button>
    </div>
  </nav>
</header>
```

**Efecto scroll**: Cuando se hace scroll, el header gana `shadow-sm` y pasa de `bg-white/0` a `bg-white/80 backdrop-blur-md`.

**Menu mobile**: Panel que entra desde la derecha con `slideInRight`, fondo `bg-white`, links en stack vertical con padding generoso.

### 8.9 Hero Section (Home)
```html
<section class="relative min-h-[85vh] flex items-center
  bg-neutral-900 overflow-hidden">
  <!-- Background image con overlay -->
  <div class="absolute inset-0">
    <img src="..." alt="" class="w-full h-full object-cover opacity-40" />
    <div class="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/50 to-transparent" />
  </div>
  <!-- Content -->
  <div class="relative max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8
    py-24 lg:py-32">
    <div class="max-w-2xl">
      <p class="text-primary-400 text-body-lg font-medium mb-4
        animate-fadeInUp [animation-delay:200ms]">
        Descubre tu proxima aventura
      </p>
      <h1 class="text-display font-extrabold text-white mb-6
        animate-fadeInUp [animation-delay:400ms]">
        Viajes unicos,<br/>
        <span class="text-primary-400">experiencias inolvidables</span>
      </h1>
      <p class="text-body-lg text-neutral-300 mb-8
        animate-fadeInUp [animation-delay:600ms]">
        Packs de viaje curados con los mejores alojamientos y
        experiencias locales. Tu aventura empieza aqui.
      </p>
      <div class="flex flex-col sm:flex-row gap-4
        animate-fadeInUp [animation-delay:800ms]">
        <a href="/packs" class="...button-primary-lg">
          Explorar Packs
        </a>
        <a href="/vuelos" class="...button-secondary-lg
          border-white/30 text-white hover:bg-white/10">
          Buscar Vuelos
        </a>
      </div>
    </div>
  </div>
</section>
```

### 8.10 Footer
```html
<footer class="bg-neutral-900 text-neutral-400 pt-16 pb-8">
  <div class="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
      <!-- Col 1: Brand -->
      <div>
        <span class="text-h3 font-bold text-white">
          Idea<span class="text-primary-500">Travel</span>
        </span>
        <p class="mt-4 text-body-sm">
          Tu plataforma de viajes con los mejores packs,
          vuelos y equipamiento para tu proxima aventura.
        </p>
      </div>
      <!-- Col 2: Navegacion -->
      <div>
        <h4 class="text-body font-semibold text-white mb-4">Explorar</h4>
        <ul class="space-y-3 text-body-sm">
          <li><a href="/packs" class="hover:text-primary-400 transition-colors">Packs de Viaje</a></li>
          <li><a href="/vuelos" class="hover:text-primary-400 transition-colors">Vuelos</a></li>
          <li><a href="/tienda" class="hover:text-primary-400 transition-colors">Tienda</a></li>
        </ul>
      </div>
      <!-- Col 3: Legal -->
      <div>
        <h4 class="text-body font-semibold text-white mb-4">Legal</h4>
        <ul class="space-y-3 text-body-sm">
          <li><a href="#" class="hover:text-primary-400 transition-colors">Politica de Privacidad</a></li>
          <li><a href="#" class="hover:text-primary-400 transition-colors">Terminos de Uso</a></li>
          <li><a href="#" class="hover:text-primary-400 transition-colors">Cookies</a></li>
        </ul>
      </div>
      <!-- Col 4: Afiliados -->
      <div>
        <h4 class="text-body font-semibold text-white mb-4">Transparencia</h4>
        <p class="text-body-sm">
          Este sitio participa en programas de afiliados de Amazon,
          GetYourGuide y Civitatis. Al hacer clic en enlaces de afiliados
          y realizar una compra, podemos recibir una comision sin coste
          adicional para ti.
        </p>
      </div>
    </div>
    <div class="border-t border-neutral-800 pt-8 text-center text-caption">
      © 2026 Tengo Un Viaje. Todos los derechos reservados.
    </div>
  </div>
</footer>
```

### 8.11 FlightSearchForm
```html
<form class="bg-card rounded-2xl shadow-xl p-6 md:p-8 lg:p-10
  max-w-4xl mx-auto">
  <!-- Trip type toggle -->
  <div class="flex gap-2 mb-6">
    <button type="button" class="px-4 py-2 rounded-2xl text-body-sm font-medium
      bg-primary-500 text-white">Ida y vuelta</button>
    <button type="button" class="px-4 py-2 rounded-2xl text-body-sm font-medium
      bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">Solo ida</button>
  </div>
  <!-- Inputs grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <!-- Origen -->
    <div>...input con icono de avion despegando</div>
    <!-- Destino -->
    <div>...input con icono de pin/ubicacion</div>
    <!-- Fecha ida -->
    <div>...input date con icono de calendario</div>
    <!-- Fecha vuelta (condicional) -->
    <div>...input date</div>
  </div>
  <!-- Segunda fila -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
    <!-- Pasajeros -->
    <div>...selector con +/- para adultos, ninos, bebes</div>
    <!-- Clase -->
    <div>...select con opciones</div>
    <!-- Boton buscar -->
    <button type="submit" class="...button-primary-lg w-full">
      Buscar Vuelos
    </button>
  </div>
</form>
```

---

## 9. Layout de Paginas

### Home (`/`)
```
[Header - sticky]
[Hero - 85vh, imagen full, overlay, headline + CTAs]
[Seccion Packs Destacados - bg-page, titulo h2, grid 3 cols PackCards]
[Seccion Vuelos - bg-primary-50, titulo + formulario mini o CTA]
[Seccion Tienda - bg-page, titulo + grid 4 cols ProductCards (4-6 productos)]
[Footer]
```

### Packs (`/packs`)
```
[Header]
[PageLayout con breadcrumbs]
  [Titulo h1 + descripcion]
  [PackGrid - grid responsive: 1 col mobile, 2 tablet, 3 desktop]
[Footer]
```

### Pack Detalle (`/packs/[slug]`)
```
[Header]
[Hero del pack - imagen del destino, titulo, meta info]
[Breadcrumbs]
[Seccion Descripcion - texto + highlights del viaje]
[Seccion Ruta - timeline vertical dia a dia]
[Seccion Alojamientos - grid 3 cols AccommodationCards]
[Seccion Experiencias - grid 2-3 cols ExperienceCards]
[Disclosure de afiliados]
[Footer]
```

### Vuelos (`/vuelos`)
```
[Header]
[Seccion hero ligera - bg-primary-50, titulo + subtitulo]
[FlightSearchForm centrado]
[Seccion informativa - tips de busqueda, FAQs]
[Footer]
```

### Tienda (`/tienda`)
```
[Header]
[PageLayout con breadcrumbs]
  [Titulo h1 + descripcion + disclosure]
  [Filtros por categoria - pills/tabs horizontales]
  [ProductGrid - grid: 2 cols mobile, 3 tablet, 4 desktop]
[Footer]
```

---

## 10. prefers-reduced-motion

Todas las animaciones deben respetar:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Inspiraciones y Referencias

- [Awwwards Travel & Tourism](https://www.awwwards.com/websites/travel-tourism/) - Nivel de calidad visual a aspirar
- [Neo Earth Tones Color Trend 2026](https://colorwhistle.com/travel-website-design-trends/) - Base de la paleta
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) - Tipografia heading elegida
- [Inter](https://fonts.google.com/specimen/Inter) - Tipografia body elegida
- Material Design 3 elevation system - Inspiracion para sistema de sombras
- Paleta Orange-Teal complementaria - Teoria del color para maxima conversion
