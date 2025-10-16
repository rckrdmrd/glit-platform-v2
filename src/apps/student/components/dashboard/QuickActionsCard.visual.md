# QuickActionsCard - Vista Visual

## Estructura del Componente

```
┌─────────────────────────────────────────────────────────────────────┐
│ DetectiveCard (wrapper)                                             │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Header Section                                               │  │
│  │  Acciones Rápidas                                           │  │
│  │  Accesos directos a tus actividades principales            │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Grid Layout (3 columnas en desktop, 1 en mobile)           │  │
│  │                                                             │  │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐             │  │
│  │  │  Button 1 │  │  Button 2 │  │  Button 3 │             │  │
│  │  │  NARANJA  │  │   AZUL    │  │ AMARILLO  │             │  │
│  │  │           │  │           │  │           │             │  │
│  │  │    🎯     │  │    📊     │  │    ⚡     │             │  │
│  │  │ PlayCircle│  │ BarChart  │  │    Zap    │             │  │
│  │  │           │  │           │  │           │             │  │
│  │  │ Continuar │  │    Ver    │  │   Reto    │             │  │
│  │  │   Caso    │  │ Progreso  │  │  Diario   │             │  │
│  │  │           │  │           │  │           │             │  │
│  │  │ Último    │  │    75%    │  │¡Disponible│             │  │
│  │  │   caso    │  │completado │  │           │             │  │
│  │  │           │  │           │  │ [¡Nuevo!] │             │  │
│  │  └───────────┘  └───────────┘  └───────────┘             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Footer                                                       │  │
│  │ Completa actividades diarias para ganar más recompensas     │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## Layout Responsivo

### Desktop (md+)
```
┌───────────────────────────────────────────────────────┐
│  Header                                               │
│                                                       │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │  Continuar│  │    Ver    │  │   Reto    │       │
│  │    Caso   │  │ Progreso  │  │  Diario   │       │
│  └───────────┘  └───────────┘  └───────────┘       │
│                                                       │
│  Footer                                               │
└───────────────────────────────────────────────────────┘
```

### Mobile (< md)
```
┌───────────────┐
│  Header       │
│               │
│  ┌───────────┐│
│  │ Continuar ││
│  │   Caso    ││
│  └───────────┘│
│               │
│  ┌───────────┐│
│  │    Ver    ││
│  │ Progreso  ││
│  └───────────┘│
│               │
│  ┌───────────┐│
│  │   Reto    ││
│  │  Diario   ││
│  └───────────┘│
│               │
│  Footer       │
└───────────────┘
```

## Anatomía de un Botón

```
┌─────────────────────────────┐
│         Button              │
│ padding: 24px (p-6)         │
│ min-height: 140px           │
│ border: 2px solid           │
│                             │
│    ┌───────────────┐        │
│    │  Icon Ring    │        │
│    │  (animated)   │        │
│    │               │        │
│    │      🎯       │        │
│    │   PlayCircle  │        │
│    └───────────────┘        │
│                             │
│    Continuar Caso           │
│    (Label - Bold)           │
│                             │
│    Último caso              │
│    (Sublabel - Small)       │
│                             │
│    [¡Nuevo!]                │
│    (Optional Badge)         │
│                             │
└─────────────────────────────┘
```

## Estados Visuales

### Estado Normal
```
┌─────────────────┐
│   bg-orange-50  │
│ border-orange-200
│                 │
│      🎯         │
│   Continuar     │
│     Caso        │
│                 │
└─────────────────┘
```

### Estado Hover
```
┌─────────────────┐↑ y: -4px
│   bg-orange-50  │  scale: 1.05
│ border-orange-200  shadow-lg
│                 │
│      🎯         │
│   Continuar     │
│     Caso        │
│                 │
└─────────────────┘
```

### Estado Deshabilitado (Reto Completado)
```
┌─────────────────┐
│  bg-yellow-50   │ opacity: 60%
│ border-yellow-200 disabled
│                 │
│      ⚡         │
│   Reto Diario   │
│ Completado hoy  │
│                 │
└─────────────────┘
```

## Paleta de Colores

### Botón 1: Continuar Caso (Naranja)
- **Icon**: `text-orange-600` (#ea580c)
- **Background**: `bg-orange-50` (#fff7ed)
- **Border**: `border-orange-200` (#fed7aa)

### Botón 2: Ver Progreso (Azul)
- **Icon**: `text-blue-600` (#2563eb)
- **Background**: `bg-blue-50` (#eff6ff)
- **Border**: `border-blue-200` (#bfdbfe)

### Botón 3: Reto Diario (Amarillo)
- **Icon**: `text-yellow-600` (#ca8a04)
- **Background**: `bg-yellow-50` (#fefce8)
- **Border**: `border-yellow-200` (#fef08a)
- **Badge**: `bg-yellow-500` (#eab308) + `text-white`

## Animaciones

### 1. Entrada del Componente
```
Botón 1: delay 0ms    ━━━━━━━━━━▶
Botón 2: delay 100ms     ━━━━━━━━━━▶
Botón 3: delay 200ms        ━━━━━━━━━━▶

Opacity: 0 → 1
Y: 20px → 0px
Duration: 300ms
```

### 2. Pulso de Iconos
```
Icon 1: delay 0ms
Scale: 1.0 → 1.1 → 1.0  (loop infinito, 2s)

Icon 2: delay 300ms
Scale: 1.0 → 1.1 → 1.0  (loop infinito, 2s)

Icon 3: delay 600ms
Scale: 1.0 → 1.1 → 1.0  (loop infinito, 2s)
```

### 3. Badge Bounce
```
Y: 0 → -2px → 0  (loop infinito, 1.5s)
```

### 4. Hover Effect
```
Scale: 1.0 → 1.05
Y: 0 → -4px
Shadow: none → lg
Duration: 200ms
```

### 5. Tap Effect
```
Scale: 1.0 → 0.95
Duration: 100ms
```

## Flujo de Interacción

```
Usuario ve el dashboard
         ↓
Componente se renderiza con animación de entrada
         ↓
Iconos comienzan a pulsar con delays escalonados
         ↓
Usuario hace hover sobre un botón
         ↓
Botón escala y se eleva (scale 1.05, y: -4px)
         ↓
Usuario hace click
         ↓
Botón comprime (scale 0.95)
         ↓
Se ejecuta el handler (onClick)
         ↓
Navegación o acción correspondiente
```

## Props y Valores por Defecto

```typescript
// Ejemplo de uso
<QuickActionsCard
  // Handlers (requeridos)
  onContinueCase={() => navigate('/cases/current')}
  onViewProgress={() => navigate('/progress')}
  onDailyChallenge={() => navigate('/challenges/daily')}

  // Opcionales con defaults
  currentCaseTitle="El Misterio de la Biblioteca"  // default: "Último caso"
  completionPercentage={75}                        // default: 0
  challengeAvailable={true}                        // default: true
/>
```

## Casos de Uso Visuales

### Caso 1: Usuario Nuevo (Sin Progreso)
```
┌───────────┐  ┌───────────┐  ┌───────────┐
│ Continuar │  │    Ver    │  │   Reto    │
│   Caso    │  │ Progreso  │  │  Diario   │
│           │  │           │  │           │
│ Primera   │  │    0%     │  │¡Disponible│
│ Aventura  │  │completado │  │ [¡Nuevo!] │
└───────────┘  └───────────┘  └───────────┘
```

### Caso 2: Usuario Activo (Progreso Medio)
```
┌───────────┐  ┌───────────┐  ┌───────────┐
│ Continuar │  │    Ver    │  │   Reto    │
│   Caso    │  │ Progreso  │  │  Diario   │
│           │  │           │  │           │
│ Misterio  │  │   65%     │  │¡Disponible│
│Biblioteca │  │completado │  │ [¡Nuevo!] │
└───────────┘  └───────────┘  └───────────┘
```

### Caso 3: Usuario Avanzado (Reto Completado)
```
┌───────────┐  ┌───────────┐  ┌───────────┐
│ Continuar │  │    Ver    │  │   Reto    │ 60% opacity
│   Caso    │  │ Progreso  │  │  Diario   │ (disabled)
│           │  │           │  │           │
│ Detective │  │   90%     │  │Completado │
│  Experto  │  │completado │  │    hoy    │
└───────────┘  └───────────┘  └───────────┘
```

## Integración en Dashboard

```
Dashboard Layout
├── Header (GamifiedHeader)
├── Main Content
│   ├── StatsGrid
│   ├── ModulesSection
│   └── RecentActivity
└── Sidebar
    ├── QuickActionsCard ← AQUÍ
    └── MissionsPanel
```

## Medidas Exactas

- **Card width**: 100% (w-full)
- **Card padding**: 24px (p-6)
- **Button height**: min 140px
- **Button padding**: 24px (p-6)
- **Grid gap**: 16px (gap-4)
- **Icon size**: 32x32px (w-8 h-8)
- **Icon ring padding**: 12px (p-3)
- **Border width**: 2px
- **Border radius**: 8px (rounded-lg)
- **Label font**: 16px bold
- **Sublabel font**: 12px regular
- **Badge font**: 12px bold

## Breakpoints

- **Mobile**: < 768px (< md)
  - Grid: 1 columna
  - Stack vertical

- **Desktop**: ≥ 768px (md+)
  - Grid: 3 columnas
  - Layout horizontal
