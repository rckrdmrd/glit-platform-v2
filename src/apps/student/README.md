# Student Dashboard - US-005-02 (35 SP)

Dashboard estudiantil responsive con enfoque mobile-first que integra gamificación y progreso en tiempo real.

## Características Principales

### Mobile-First Design
- Bottom Navigation con 5 secciones principales
- Swipe gestures para navegación natural
- Pull-to-refresh para actualizar datos
- Touch-optimized interactions (44px mínimo WCAG 2.1 AA)
- Feedback visual en todas las interacciones

### Progressive Enhancement
- **Mobile (320px-767px)**: Layout en columna única, bottom navigation
- **Tablet (768px-1023px)**: Grid 2 columnas, sidebar colapsable
- **Desktop (1024px-1399px)**: Grid 3 columnas, sidebar permanente, keyboard shortcuts
- **Wide (1400px+)**: Grid 4 columnas, panel de actividad lateral

### Gamification Integration
- ML Coins wallet con transacciones en tiempo real
- Rank progression visual con iconografía Maya
- Achievement notifications con animaciones
- Progress celebrations (modals y toasts)

## Estructura de Archivos

```
student/
├── components/
│   ├── dashboard/
│   │   ├── BottomNavigation.tsx        # Navegación móvil sticky
│   │   ├── MLCoinsWidget.tsx           # Widget de ML Coins
│   │   ├── RankProgressWidget.tsx      # Progreso de rango Maya
│   │   ├── ModuleGridCard.tsx          # Card de módulo educativo
│   │   ├── QuickActionsPanel.tsx       # Panel de acciones rápidas
│   │   ├── RecentActivityFeed.tsx      # Feed de actividad reciente
│   │   ├── ProgressStats.tsx           # Estadísticas de progreso
│   │   └── ResponsiveLayout.tsx        # Layout adaptativo principal
│   ├── notifications/
│   │   ├── AchievementToast.tsx        # Toast de logros desbloqueados
│   │   └── CelebrationModal.tsx        # Modal de celebración
│   └── interactions/
│       └── SwipeableContainer.tsx      # Container con swipe gestures
├── hooks/
│   ├── useSwipeGesture.ts              # Hook para gestos táctiles
│   ├── useResponsiveLayout.ts          # Hook para breakpoints
│   └── useDashboardData.ts             # Hook para datos del dashboard
├── pages/
│   └── DashboardHome.tsx               # Página principal del dashboard
└── README.md
```

## Componentes Implementados (12+)

### Dashboard Components
1. **BottomNavigation** - Navegación móvil con 5 ítems y animaciones
2. **MLCoinsWidget** - Wallet de ML Coins con transacciones recientes
3. **RankProgressWidget** - Visualización de rango Maya con progreso
4. **ModuleGridCard** - Card responsive de módulo educativo
5. **QuickActionsPanel** - Panel de acciones rápidas (4 acciones)
6. **RecentActivityFeed** - Feed de actividad reciente con timeline
7. **ProgressStats** - Estadísticas detalladas con gráficos
8. **ResponsiveLayout** - Layout wrapper con breakpoints

### Notification Components
9. **AchievementToast** - Toast animado para logros (stack máx 3)
10. **CelebrationModal** - Modal de celebración con confetti

### Interaction Components
11. **SwipeableContainer** - Container con swipe gestures
12. **DashboardGrid** - Grid adaptativo por breakpoint
13. **DashboardSection** - Section wrapper reutilizable

## Hooks Personalizados

### useSwipeGesture
Maneja gestos táctiles para navegación:
```typescript
const { elementRef, isSwiping } = useSwipeableElement({
  onSwipeLeft: () => console.log('Swipe left'),
  onSwipeRight: () => console.log('Swipe right'),
  threshold: 50
});
```

### useResponsiveLayout
Detecta breakpoints y orientación:
```typescript
const {
  breakpoint,    // 'mobile' | 'tablet' | 'desktop' | 'wide'
  orientation,   // 'portrait' | 'landscape'
  isMobile,
  isTablet,
  isDesktop,
  isWide,
  width,
  height
} = useResponsiveLayout();
```

### useDashboardData
Fetch y gestión de datos del dashboard:
```typescript
const {
  coins,           // MLCoinsData
  rank,            // RankData
  achievements,    // AchievementData[]
  progress,        // ProgressData
  loading,
  refresh
} = useDashboardData(userId);
```

## Breakpoints Responsive

```typescript
const breakpoints = {
  mobile: '320px-767px',    // Bottom nav, 1 columna
  tablet: '768px-1023px',   // Sidebar colapsable, 2 columnas
  desktop: '1024px-1399px', // Sidebar fijo, 3 columnas
  wide: '1400px+'           // Panel lateral, 4 columnas
};
```

## Keyboard Shortcuts (Desktop+)

- `g h` - Home (Dashboard)
- `g m` - Modules (Módulos)
- `g p` - Profile (Perfil)
- `g g` - Gamification (Gamificación)
- `g s` - Settings (Configuración)

## Integración con Backend

### Endpoints Utilizados
```typescript
GET /api/gamification/coins/:userId          // Balance de ML Coins
GET /api/gamification/ranks/user/:userId     // Rango actual y progreso
GET /api/gamification/achievements/:userId   // Logros desbloqueados
GET /api/progress/user/:userId               // Progreso general
GET /api/educational/modules                 // Módulos disponibles
```

### Mock Data
Actualmente usa datos mock para desarrollo. Para producción, descomentar las llamadas API reales en `useDashboardData.ts`.

## Gamification System

### ML Coins
- Balance en tiempo real con animaciones spring
- Transacciones recientes (últimas 5)
- Ganancia/gasto del día
- Contador animado con Framer Motion

### Rank System (Maya)
Sistema de rangos basado en jerarquía Maya:

1. **NACOM** (Detective Novato) - Azul
2. **BATAB** (Sargento) - Verde
3. **HOLCATTE** (Teniente) - Naranja
4. **GUERRERO** (Capitán) - Púrpura
5. **MERCENARIO** (Comisario) - Dorado

Cada rango tiene:
- Icono Maya único
- Multiplicador de ML Coins
- Gradiente de color distintivo
- Badge animado

### Achievements
Sistema de logros con rareza:
- **Common** (Gris) - Logros básicos
- **Rare** (Azul) - Logros poco comunes
- **Epic** (Naranja) - Logros épicos
- **Legendary** (Dorado) - Logros legendarios

## Animaciones y Transiciones

### Framer Motion
- Spring physics para contador de coins
- Staggered animations para listas
- Page transitions suaves
- Gesture animations para swipe
- Confetti particles en celebraciones

### Efectos Visuales
- Ripple effect en botones
- Glow effects por rareza
- Progress bars animadas
- Hover states avanzados
- Loading skeletons

## Accesibilidad (WCAG 2.1 AA)

- Touch targets mínimo 44px
- Skip links para navegación por teclado
- ARIA labels en navegación
- Focus indicators visibles
- Tab order lógico
- Screen reader friendly
- Color contrast ratios conformes

## Uso

### Importar Dashboard
```typescript
import DashboardHome from '@apps/student/pages/DashboardHome';

// En tu router
<Route path="/" element={<DashboardHome />} />
```

### Usar Componentes Individuales
```typescript
import { MLCoinsWidget } from '@apps/student/components/dashboard/MLCoinsWidget';
import { useDashboardData } from '@apps/student/hooks/useDashboardData';

function MyComponent() {
  const { coins, loading } = useDashboardData('user-123');

  return <MLCoinsWidget data={coins} loading={loading} />;
}
```

## Performance

### Optimizaciones
- Lazy loading de componentes
- Memoization con React.memo
- useCallback para handlers
- Debounce en swipe gestures
- Skeleton loading states
- Image optimization

### Bundle Size
- Framer Motion: ~55KB gzipped
- Lucide React: ~20KB gzipped (tree-shakeable)
- Total componentes: ~45KB gzipped

## Testing

### Unit Tests (TODO)
```bash
npm run test
```

### E2E Tests (TODO)
```bash
npm run test:e2e
```

## Próximos Pasos

1. Implementar autenticación real con Supabase
2. Conectar endpoints reales de backend
3. Añadir tests unitarios y E2E
4. Implementar sistema de notificaciones push
5. Añadir modo offline con service workers
6. Implementar analytics de uso

## Tecnologías

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **React Router** - Routing
- **Axios** - HTTP client
- **Zustand** - State management (opcional)

## Créditos

Desarrollado como parte de US-005-02: Dashboard Estudiante Responsive (35 SP)
Sistema de gamificación basado en jerarquía Maya
Detective Theme - GLIT Platform v2
