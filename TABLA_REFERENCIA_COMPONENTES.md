# TABLA DE REFERENCIA RÁPIDA - COMPONENTES EDUCATIVOS

## COMPONENTES UI - REFERENCIA RÁPIDA

| Componente | Ubicación | Props Clave | Variantes | Uso Principal |
|---|---|---|---|---|
| **ExerciseContainer** | `mechanics/ExerciseContainer.tsx` | exercise, children, onComplete | - | Envolvente para ejercicios |
| **ProgressTracker** | `mechanics/ProgressTracker.tsx` | current, total, variant | bar, steps, circular | Visualizar progreso |
| **ProgressBar** | `base/ProgressBar.tsx` | progress, variant, height | detective, xp | Barra lineal de progreso |
| **RankBadge** | `base/RankBadge.tsx` | rank, size, showIcon | 9 rangos | Badge de rango simple |
| **RankBadgeAdvanced** | `ranks/RankBadgeAdvanced.tsx` | rank, prestigeLevel, animated | xs-xl | Badge de rango avanzado |
| **RankProgressBar** | `ranks/RankProgressBar.tsx` | currentXP, xpToNextLevel, showMilestones | detective/rank/gold | Progreso XP hacia siguiente rango |
| **RankUpModal** | `ranks/RankUpModal.tsx` | isOpen, onClose | - | Celebración de ascenso de rango |
| **ModulesSection** | `dashboard/ModulesSection.tsx` | modules, loading, error | - | Grilla de módulos |
| **ModuleCard** | `dashboard/ModulesSection.tsx` | module, index | - | Card individual de módulo |
| **RankProgressWidget** | `dashboard/RankProgressWidget.tsx` | data, loading | - | Widget rango compacto |
| **RanksSection** | `gamification/RanksSection.tsx` | data | - | Vista completa rangos |
| **ExercisePlayer** | `exercises/ExercisePlayer.tsx` | exercise, userId, userRango | - | Reproductor de ejercicio |

---

## PÁGINAS - MAPA COMPLETO

| Página | Ruta | Componentes Principales | Funcionalidad |
|---|---|---|---|
| **Dashboard** | `/dashboard` | ModulesSection, RankProgressWidget, ProgressStats | Dashboard principal estudiante |
| **Module Detail** | `/module/:moduleId` | ModuleCard[], ProgressBar, Competencies | Detalles módulo + ejercicios |
| **Exercise** | `/module/:moduleId/exercise/:exerciseId` | Dynamic Mechanic, ProgressTracker, HintSystem | Reproductor ejercicio |
| **Gamification** | `/gamification` | RankProgressWidget, RanksSection | Vista de rangos y gamificación |
| **Achievements** | `/achievements` | Achievement Cards, Badges | Logros del usuario |
| **Leaderboard** | `/leaderboard` | RankBadge, User Stats | Ranking de estudiantes |
| **Missions** | `/missions` | MissionCard[] | Misiones disponibles |

---

## SISTEMA DE ENUMERACIONES

### Dificultad
```typescript
type Difficulty = 'facil' | 'medio' | 'dificil' | 'experto';
```

### Estado de Módulo
```typescript
type ModuleStatus = 'locked' | 'available' | 'in_progress' | 'completed';
```

### Rangos Maya
```typescript
type RankType = 'al_mehen' | 'chilan' | 'batab' | 'halach_uinik' | 
                'kukulkan' | 'nacom' | 'holcatte' | 'guerrero' | 'mercenario';
```

### Variantes Progress
```typescript
type ProgressVariant = 'bar' | 'steps' | 'circular';
```

### Tamaños
```typescript
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Height = 'sm' | 'md' | 'lg';
```

---

## EJERCICIOS POR MÓDULO

| Módulo | Tipo | Cantidad | Ejemplos |
|---|---|---|---|
| **1 - Literal** | Comprensión | 5 | Crucigrama, Timeline, Sopa de Letras |
| **2 - Inferencial** | Análisis | 5 | Detective Textual, Hipótesis, Predicción |
| **3 - Crítica** | Evaluación | 5 | Análisis de Fuentes, Debate, Tribunal |
| **4 - Digital** | Multimedial | 9 | Fake News, Quiz TikTok, Memes, Email |
| **5 - Creativa** | Producción | 3 | Diario Multimedia, Comic, Video |
| **Auxiliar** | Soporte | 4 | Call to Action, Collage, Audio |
| **TOTAL** | | 31+ | - |

---

## ANIMACIONES COMUNES

### Framer Motion Patterns
```typescript
// Entrada fade + scale
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}

// Progreso suave
initial={{ width: 0 }}
animate={{ width: `${progress}%` }}
transition={{ duration: 0.5, ease: 'easeOut' }}

// Efecto shine infinito
animate={{ x: ['-100%', '200%'] }}
transition={{ repeat: Infinity, duration: 2 }}
```

---

## COLORES POR RANGO (Tailwind)

| Rango | Gradiente | HEX |
|---|---|---|
| **Al Mehen** | from-gray-400 to-gray-600 | #9CA3AF |
| **Chilan** | from-green-400 to-green-600 | #4ADE80 |
| **Batab** | from-blue-400 to-blue-600 | #3B82F6 |
| **Halach Uinik** | from-purple-500 to-pink-600 | #A855F7 |
| **Kukulkan** | from-yellow-400 to-red-600 | #FBBF24 |

---

## HOOKS CUSTOM - UBICACIONES

| Hook | Ubicación | Retorna |
|---|---|---|
| `useModules()` | `shared/hooks/useModules.ts` | Module[] |
| `useModuleDetail(id)` | `shared/hooks/useModules.ts` | Module + Exercise[] |
| `useUserModules()` | `student/hooks/useUserModules.ts` | UserModule[] |
| `useExerciseState()` | `student/hooks/useExerciseState.ts` | ExerciseState |
| `useExerciseAttempts()` | `shared/hooks/useExerciseAttempts.ts` | AttemptManager |
| `useRank()` | `gamification/ranks/hooks/useRank.ts` | RankData |
| `useProgression()` | `gamification/ranks/hooks/useProgression.ts` | ProgressionData |

---

## APIS EDUCACIONALES

**Endpoint Base:** `/api/educational/`

| Endpoint | Método | Descripción |
|---|---|---|
| `/modules` | GET | Listar módulos disponibles |
| `/modules/:id` | GET | Obtener detalle módulo |
| `/modules/:id/exercises` | GET | Ejercicios del módulo |
| `/exercises/:id` | GET | Detalle de ejercicio |
| `/exercises/:id/submit` | POST | Enviar respuestas |
| `/exercises/:id/progress` | POST | Guardar progreso |
| `/exercises/:id/hints` | GET | Obtener pistas |

---

## ESTADOS COMUNES

### ExerciseProgress
```typescript
interface ExerciseProgress {
  currentStep: number;
  totalSteps: number;
  score: number;
  hintsUsed: number;
  timeSpent: number;
}
```

### ModuleData
```typescript
interface ModuleData {
  id: string;
  title: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  progress: number; // 0-100
  completedExercises: number;
  totalExercises: number;
  xpReward: number;
}
```

### RankData
```typescript
interface RankData {
  currentRank: string;
  currentLevel: number;
  currentXP: number;
  nextRankXP: number;
  multiplier: number;
  prestigeLevel: number;
}
```

---

## INTEGRACIÓN CON TAILWIND

### Clases Temáticas Detective
```
.detective-container      // Max-width contenedor
.detective-text           // Color de texto
.detective-text-secondary // Texto secundario
.detective-orange         // Color primario
.detective-blue           // Color secundario
.detective-bg             // Fondo
.progress-detective       // Barra de progreso
.rank-badge-*             // Badges por rango
```

---

## RESPONSIVIDAD

### Breakpoints Utilizados
```
sm: 640px   - Móvil
md: 768px   - Tablet
lg: 1024px  - Desktop
xl: 1280px  - Desktop grande
```

### Grid Layouts
- Modules: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Exercises: `grid-cols-1 md:grid-cols-2`
- Stats: `grid-cols-2 md:grid-cols-4`

---

## PERFORMANCE

### Code Splitting
- Pages: Lazy-loaded con `lazy()` + `Suspense`
- Mechanics: Dinámicamente cargadas por tipo
- Components: Tree-shakeable con ES modules

### Optimizaciones
- `useMemo` para estilos complejos
- Animaciones con GPU (transform, opacity)
- Imágenes optimizadas con Next.js (si aplica)
- Virtualization para listas largas (módulos/ejercicios)

