# AchievementMilestones Component

Componente para mostrar los próximos objetivos y logros del estudiante en el dashboard.

## Ubicación
`/home/isem/workspace/glit-platform-v2/src/apps/student/components/dashboard/AchievementMilestones.tsx`

## Características

### 1. Título
- **Texto:** "Próximos Objetivos"
- **Icono:** Target (lucide-react)
- **Subtitle:** "Completa estos hitos para ganar recompensas"

### 2. Milestones
Cada milestone muestra:
- **Icono:** Target, Trophy o Star
- **Título y descripción** del objetivo
- **Progress bar animada** (0-100%)
- **Badge de estado:** "En progreso" (naranja) o "Completado" (verde)
- **Reward info:** XP y ML Coins

### 3. Layout
- Lista vertical con cards pequeñas
- Progress bar con animación Framer Motion
- Colores:
  - **Naranja:** En progreso
  - **Verde:** Completado
  - **Púrpura:** XP rewards
  - **Amarillo:** ML Coins rewards

## Props

```typescript
interface Milestone {
  id: string;                  // Identificador único
  title: string;               // Título del objetivo
  description: string;         // Descripción corta
  progress: number;            // Progreso actual
  total: number;               // Total requerido
  completed: boolean;          // Estado de completado
  reward: {
    xp: number;               // Recompensa en XP
    mlCoins: number;          // Recompensa en ML Coins
  };
  icon: 'target' | 'trophy' | 'star';  // Icono del milestone
}

interface AchievementMilestonesProps {
  milestones: Milestone[];     // Array de milestones
}
```

## Uso

```tsx
import { AchievementMilestones } from './components/dashboard';

const milestones = [
  {
    id: 'milestone-1',
    title: 'Primera Semana Completa',
    description: 'Completa 5 casos en una semana',
    progress: 3,
    total: 5,
    completed: false,
    reward: {
      xp: 100,
      mlCoins: 50,
    },
    icon: 'target',
  },
  {
    id: 'milestone-2',
    title: 'Detective Experto',
    description: 'Alcanza 1000 puntos de experiencia',
    progress: 750,
    total: 1000,
    completed: false,
    reward: {
      xp: 200,
      mlCoins: 100,
    },
    icon: 'trophy',
  },
  {
    id: 'milestone-3',
    title: 'Racha de Fuego',
    description: 'Mantén una racha de 7 días',
    progress: 7,
    total: 7,
    completed: true,
    reward: {
      xp: 150,
      mlCoins: 75,
    },
    icon: 'star',
  },
];

function Dashboard() {
  return (
    <div>
      <AchievementMilestones milestones={milestones} />
    </div>
  );
}
```

## Animaciones

### Entrada del componente
- **Header:** fade-in desde arriba
- **Cards:** fade-in + slide-up con delay escalonado (0.1s entre cada una)

### Progress Bar
- **Animación:** width de 0% a valor actual
- **Duración:** 0.8s
- **Easing:** easeOut
- **Delay:** 0.2s + (index * 0.1s)

### Hover
- **Cards:** shadow aumenta de sm a md
- **Transición:** 300ms

## Estados

### Con Milestones
Muestra lista vertical de cards con todos los milestones.

### Sin Milestones (Empty State)
Muestra:
- Icono Target gris
- Mensaje: "No hay objetivos disponibles"
- Submensaje: "Los objetivos aparecerán mientras progresas"

## Colores

### Progress Bar
- **En progreso:** gradient naranja (from-orange-500 to-orange-600)
- **Completado:** gradient verde (from-green-500 to-green-600)

### Iconos
- **En progreso:** text-orange-600, bg-orange-100
- **Completado:** text-green-600, bg-green-100

### Badges
- **En progreso:** bg-orange-100, text-orange-700
- **Completado:** bg-green-100, text-green-700

### Rewards
- **XP:** bg-purple-100, text-purple-600/700
- **ML Coins:** bg-yellow-100, text-yellow-600/700

## Dependencias

- **React:** ^18.0.0
- **Framer Motion:** Animaciones
- **lucide-react:** Iconos (Target, Trophy, Star, Coins, Zap)
- **@/lib/utils:** Función `cn` para className condicional

## Referencia Base

Basado en el componente Achievement Milestones de:
`/home/isem/documents/workspace/projects/glit/glit-platform/apps/student/src/components/StatsGrid.tsx`

Líneas 276-327 del archivo original.

## Notas de Implementación

1. **Código completo:** El componente incluye toda la funcionalidad sin placeholders
2. **Animaciones suaves:** Framer Motion para todas las animaciones
3. **Responsive:** Funciona en mobile, tablet y desktop
4. **Accesible:** Textos claros y estructura semántica
5. **Optimizado:** Cálculo de porcentaje eficiente
6. **Manejo de casos edge:** Estado vacío incluido
