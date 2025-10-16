# GLIT Platform v2 - Detective Theme

Plataforma educativa gamificada con React 19.2 + Vite 7.1 + TypeScript 5.9

## Características

- **React 19.2.0** - Latest concurrent features
- **React Router 7.9.4** - Routing moderno con lazy loading
- **Vite 7.1.10** - Build tool ultra-rápido
- **TypeScript 5.9.3** - Type safety completo
- **Tailwind CSS 4.1.14** - Utility-first styling
- **Framer Motion 12.23.24** - Animaciones fluidas
- **Lucide React 0.545.0** - Iconografía moderna

## Sistema de Routing

### Rutas de Autenticación
- `/` - Redirige automáticamente a login o dashboard
- `/login` - Página de inicio de sesión
- `/register` - Página de registro

### Rutas Protegidas
- `/dashboard` - Dashboard principal con módulos
- `/module/:moduleId` - Detalle de módulo con ejercicios
- `/profile` - Perfil de usuario

### 404
- `*` - Página no encontrada

## Componentes Base

### Detective Components
- `DetectiveButton` - Botón con variantes (primary, gold, blue, green, purple)
- `DetectiveCard` - Card con animaciones
- `InputDetective` - Input con validación
- `ProgressBar` - Barra de progreso
- `RankBadge` - Badge de rango Maya

### Layout Components
- `GamifiedHeader` - Header con sistema de gamificación completo
- `LoadingFallback` - Componente de carga
- `ProtectedRoute` - Componente para rutas protegidas
- `RootRedirect` - Redireccionamiento automático

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Servidor en: http://localhost:3000

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Estructura del Proyecto

```
glit-platform-v2/
├── src/
│   ├── apps/
│   │   └── student/
│   │       └── pages/          # Páginas de la aplicación
│   ├── shared/
│   │   ├── components/
│   │   │   ├── base/          # Componentes base
│   │   │   └── layout/        # Componentes de layout
│   │   ├── hooks/             # Custom hooks
│   │   ├── styles/            # Estilos globales
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Utilidades
│   ├── App.tsx                # Routing principal
│   └── main.tsx               # Entry point
├── public/                    # Archivos estáticos
├── index.html                 # HTML template
├── package.json               # Dependencias
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite config
└── tailwind.config.js         # Tailwind config
```

## Path Aliases

- `@/` - `./src/`
- `@shared/` - `./src/shared/`
- `@apps/` - `./src/apps/`
- `@features/` - `./src/features/`

## Detective Theme

El proyecto usa un sistema de diseño completo "Detective Theme" con:
- Colores naranja/oro principal
- Sistema de rangos Maya (5 niveles)
- Animaciones fluidas con Framer Motion
- Componentes reutilizables

## Próximos Pasos

1. Integrar con backend API real
2. Implementar sistema de autenticación con Zustand
3. Agregar páginas de ejercicios
4. Implementar sistema de achievements
5. Agregar sistema de notificaciones en tiempo real

---

**Versión**: 2.0  
**Última actualización**: 2025-10-16  
**Basado en**: routing-and-pages.md y component-system.md
