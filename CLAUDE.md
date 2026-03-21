# Idea Travel - Proyecto Frontend SEO

## Descripcion del Proyecto
Plataforma de viajes con React + Next.js optimizada para SEO que incluye:
1. **Packs de viaje** - Viajes con rutas, alojamientos (barato/estandar/caro) y experiencias con deep links de afiliados (GetYourGuide, Civitatis)
2. **Buscador de vuelos** - Formulario inteligente para busqueda de vuelos
3. **Tienda de Amazon** - Productos de viaje con links de afiliado de Amazon

## Stack Tecnologico
- **Framework**: Next.js 14+ (App Router) con React 18+
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Contenedores**: Docker + Docker Compose
- **SEO**: Server-Side Rendering, metadata dinamica, structured data (JSON-LD)

## Arquitectura
- Arquitectura hexagonal simplificada para el frontend
- Principios SOLID
- Patrones: Repository pattern para data fetching, Strategy para diferentes proveedores de afiliados
- Componentes atomicos (Atomic Design)

## Comandos del Proyecto

### Workflow de Desarrollo
Ejecutar en este orden:
1. `/research` - Investigacion tecnica sobre la mejor forma de implementar el proyecto
2. `/plan` - Genera un plan tecnico paso a paso basado en la investigacion
3. `/ui-design` - Agente UI/UX experto que define el sistema de diseno ANTES de implementar
4. `/implement` - Implementa el plan siguiendo SOLID, patrones de diseno y el sistema de diseno definido
5. `/code-review` - Revision de codigo y calidad

### Trabajo del dia a dia
- `/feature <descripcion>` - Nueva funcionalidad (ejecuta flujo completo: research > plan > design > implement > verify)
- `/bug <descripcion>` - Diagnosticar y corregir bugs (logica, estilos, SEO, SSR, accesibilidad, etc.)
- `/improve <descripcion>` - Mejoras de codigo, funcionalidad, visual, SEO, rendimiento o accesibilidad
- `/cost` - Estimar coste en dolares de la sesion actual

### Comandos Docker
```bash
docker-compose up --build    # Levantar proyecto
docker-compose down          # Parar proyecto
```

## Convenciones
- Nombres de componentes en PascalCase
- Hooks personalizados con prefijo `use`
- Archivos de tipos en `.types.ts`
- Servicios en carpeta `services/`
- No usar `any` en TypeScript
- Commits en ingles, codigo y comentarios en espanol donde sea necesario
- Componentes server-first (RSC) por defecto, client components solo cuando sea necesario
