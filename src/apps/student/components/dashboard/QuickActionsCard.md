# QuickActionsCard

Componente de tarjeta de acciones rápidas para el dashboard de estudiante. Proporciona tres botones de acción principales con iconos, labels, sublabels y efectos visuales interactivos.

## Ubicación

```
/home/isem/workspace/glit-platform-v2/src/apps/student/components/dashboard/QuickActionsCard.tsx
```

## Características

### 1. Tres Botones de Acción

- **Continuar Caso** (PlayCircle icon, naranja)
  - Permite al usuario continuar con su caso actual
  - Muestra el título del caso en el sublabel
  - Color: naranja (#ea580c)

- **Ver Progreso** (BarChart icon, azul)
  - Navega a la vista de progreso del usuario
  - Muestra el porcentaje de completación
  - Color: azul (#2563eb)

- **Reto Diario** (Zap icon, amarillo)
  - Inicia el reto diario del usuario
  - Muestra si está disponible o completado
  - Badge "¡Nuevo!" cuando está disponible
  - Color: amarillo (#ca8a04)

### 2. Características de Cada Botón

- **Icon grande**: Icono de 8x8 con animación de pulso
- **Label descriptivo**: Texto bold con color del tema
- **Sublabel**: Información adicional contextual
- **Hover effect**: Scale 1.05 + elevación de 4px + sombra
- **Animación de entrada**: Fade in con delay escalonado
- **Estados**: Normal, hover, activo, deshabilitado

### 3. Layout Responsivo

- **Desktop (md+)**: Grid de 3 columnas
- **Mobile**: Grid de 1 columna
- **Gap**: 4 unidades (16px)
- **Wrapper**: DetectiveCard con padding medium

## Props

```typescript
interface QuickActionsCardProps {
  onContinueCase: () => void;        // Handler para continuar caso
  onViewProgress: () => void;         // Handler para ver progreso
  onDailyChallenge: () => void;       // Handler para reto diario
  currentCaseTitle?: string;          // Título del caso actual (default: "Último caso")
  completionPercentage?: number;      // Porcentaje de completación (default: 0)
  challengeAvailable?: boolean;       // Si el reto está disponible (default: true)
}
```

## Uso Básico

```tsx
import { QuickActionsCard } from '@apps/student/components/dashboard';

function Dashboard() {
  const handleContinueCase = () => {
    navigate('/cases/current');
  };

  const handleViewProgress = () => {
    navigate('/progress');
  };

  const handleDailyChallenge = () => {
    navigate('/challenges/daily');
  };

  return (
    <QuickActionsCard
      onContinueCase={handleContinueCase}
      onViewProgress={handleViewProgress}
      onDailyChallenge={handleDailyChallenge}
    />
  );
}
```

## Uso con Datos Personalizados

```tsx
import { QuickActionsCard } from '@apps/student/components/dashboard';

function Dashboard() {
  const userProgress = {
    currentCase: "El Misterio de la Biblioteca",
    completionPercentage: 75,
    hasCompletedDailyChallenge: false,
  };

  return (
    <QuickActionsCard
      onContinueCase={() => navigate('/cases/current')}
      onViewProgress={() => navigate('/progress')}
      onDailyChallenge={() => navigate('/challenges/daily')}
      currentCaseTitle={userProgress.currentCase}
      completionPercentage={userProgress.completionPercentage}
      challengeAvailable={!userProgress.hasCompletedDailyChallenge}
    />
  );
}
```

## Integración con Dashboard

```tsx
function StudentDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Columna principal */}
      <div className="lg:col-span-2 space-y-6">
        <StatsGrid stats={stats} />
        <ModulesSection modules={modules} />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <QuickActionsCard
          onContinueCase={handleContinueCase}
          onViewProgress={handleViewProgress}
          onDailyChallenge={handleDailyChallenge}
          currentCaseTitle={currentCase.title}
          completionPercentage={userProgress.completion}
          challengeAvailable={!dailyChallengeCompleted}
        />
        <MissionsPanel missions={missions} />
      </div>
    </div>
  );
}
```

## Dependencias

- `react`: ^18.0.0
- `framer-motion`: ^10.0.0
- `lucide-react`: ^0.263.0
- `@shared/components/base/DetectiveCard`
- `@shared/utils/cn`

## Iconos Utilizados

- **PlayCircle**: lucide-react (Continuar Caso)
- **BarChart**: lucide-react (Ver Progreso)
- **Zap**: lucide-react (Reto Diario)

## Animaciones

### Entrada
- Fade in con opacidad 0 → 1
- Slide up con y: 20 → 0
- Delay escalonado de 0.1s entre botones

### Hover
- Scale: 1.0 → 1.05
- Elevación: y: 0 → -4px
- Shadow: aumenta de sm a lg

### Iconos
- Pulso continuo: scale 1.0 → 1.1 → 1.0
- Duración: 2s
- Delay escalonado de 0.3s entre iconos

### Badge "¡Nuevo!"
- Bounce: y: 0 → -2 → 0
- Duración: 1.5s
- Loop infinito

## Estilos

### Colores

```typescript
// Naranja (Continuar Caso)
color: 'text-orange-600'
bgColor: 'bg-orange-50'
borderColor: 'border-orange-200'

// Azul (Ver Progreso)
color: 'text-blue-600'
bgColor: 'bg-blue-50'
borderColor: 'border-blue-200'

// Amarillo (Reto Diario)
color: 'text-yellow-600'
bgColor: 'bg-yellow-50'
borderColor: 'border-yellow-200'
```

### Dimensiones

- **Altura mínima del botón**: 140px
- **Padding del botón**: 24px (p-6)
- **Icon size**: 32px (w-8 h-8)
- **Border**: 2px solid
- **Border radius**: 8px (rounded-lg)

## Accesibilidad

- Botones nativos `<button>` para navegación por teclado
- Atributo `disabled` cuando el reto no está disponible
- Opacity reducida (60%) para estados deshabilitados
- Tamaños de touch target adecuados (>44px)
- Labels descriptivos y claros

## Estados

### Normal
- Colores base según el tema
- Border de 2px
- Sin sombra

### Hover
- Scale 1.05
- Elevación de 4px
- Shadow large
- Transición suave

### Active/Tap
- Scale 0.95
- Shadow small

### Disabled (Reto Diario Completado)
- Opacity 60%
- No interactivo
- Sublabel cambia a "Completado hoy"

## Performance

- Animaciones optimizadas con `framer-motion`
- Lazy loading de iconos desde `lucide-react`
- Uso de `cn()` para optimización de classnames
- No re-renders innecesarios (callbacks estables)

## Testing

```typescript
describe('QuickActionsCard', () => {
  it('debería renderizar los 3 botones', () => {
    // Test implementation
  });

  it('debería llamar onContinueCase al hacer click', () => {
    // Test implementation
  });

  it('debería mostrar el badge cuando challengeAvailable es true', () => {
    // Test implementation
  });

  it('debería deshabilitar el botón cuando challengeAvailable es false', () => {
    // Test implementation
  });
});
```

## Mejoras Futuras

- [ ] Agregar loading states para cada acción
- [ ] Implementar tooltips con más información
- [ ] Agregar sonidos al hacer click
- [ ] Personalización de colores mediante props
- [ ] Agregar más acciones configurables
- [ ] Implementar modo compacto
- [ ] Agregar analytics tracking
- [ ] Soporte para keyboard shortcuts

## Referencia

Basado en el componente Quick Actions de:
- `/home/isem/documents/workspace/projects/glit/glit-platform/apps/student/src/pages/DashboardPage.tsx` (líneas 370-394)

## Changelog

### v1.0.0 (2025-10-16)
- Implementación inicial
- 3 botones de acción con iconos de lucide-react
- Animaciones con framer-motion
- Layout responsivo
- Integración con DetectiveCard
- Soporte para props personalizables
- Estados hover y disabled
