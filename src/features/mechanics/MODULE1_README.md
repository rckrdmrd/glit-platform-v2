# Módulo 1: Comprensión Literal - Mecánicas Educativas

Este módulo implementa 5 mecánicas interactivas diseñadas para trabajar la comprensión literal de textos sobre Marie Curie.

## 📚 Mecánicas Implementadas

### 1. Crucigrama Científico (US-003-01)

**Descripción**: Crucigrama interactivo con vocabulario científico relacionado con los descubrimientos de Marie Curie.

**Componentes**:
- `CrucigramaExercise.tsx` - Componente principal del ejercicio
- `CrucigramaGrid.tsx` - Grid interactivo con entrada de texto
- `CrucigramaClue.tsx` - Lista de pistas horizontales y verticales
- `crucigramaTypes.ts` - Interfaces TypeScript
- `crucigramaSchemas.ts` - Validación Zod
- `crucigramaMockData.ts` - 3 ejercicios de ejemplo

**Características**:
- ✅ Grid interactivo con validación en tiempo real
- ✅ Navegación con teclado (flechas, backspace)
- ✅ Auto-guardado de progreso
- ✅ Sistema de pistas con costo en ML Coins
- ✅ Validación automática de palabras completadas
- ✅ Scoring basado en precisión y tiempo

**Props de `CrucigramaExercise`**:
```typescript
interface CrucigramaExerciseProps {
  exercise: CrucigramaData;
  onComplete?: () => void;
}
```

**Uso**:
```tsx
import { CrucigramaExercise } from '@features/mechanics/module1/Crucigrama/CrucigramaExercise';
import { mockCrucigramaExercises } from '@features/mechanics/module1/Crucigrama/crucigramaMockData';

<CrucigramaExercise
  exercise={mockCrucigramaExercises[0]}
  onComplete={() => console.log('Completado!')}
/>
```

**Mock Data**: 3 crucigramas sobre descubrimientos, biografía y legado científico de Marie Curie.

---

### 2. Línea de Tiempo (US-003-02)

**Descripción**: Ordena eventos cronológicos mediante drag & drop con física realista.

**Componentes**:
- `TimelineExercise.tsx` - Componente principal
- `TimelineEvent.tsx` - Tarjeta de evento individual
- `TimelineDragDrop.tsx` - Utilidades drag & drop
- `timelineTypes.ts` - Interfaces TypeScript
- `timelineSchemas.ts` - Validación Zod
- `timelineMockData.ts` - 3 ejercicios de ejemplo

**Características**:
- ✅ Drag & drop con Framer Motion Reorder
- ✅ Animaciones fluidas con física
- ✅ Validación de orden cronológico
- ✅ Botón "Mezclar" para reiniciar
- ✅ Feedback visual de progreso
- ✅ Scoring por precisión de orden

**Props de `TimelineExercise`**:
```typescript
interface TimelineExerciseProps {
  exercise: TimelineData;
  onComplete?: () => void;
}
```

**Uso**:
```tsx
import { TimelineExercise } from '@features/mechanics/module1/Timeline/TimelineExercise';
import { mockTimelineExercises } from '@features/mechanics/module1/Timeline/timelineMockData';

<TimelineExercise
  exercise={mockTimelineExercises[0]}
  onComplete={() => console.log('Completado!')}
/>
```

**Mock Data**: 3 líneas de tiempo sobre vida, descubrimientos y reconocimientos de Marie Curie.

---

### 3. Sopa de Letras (US-003-03)

**Descripción**: Encuentra palabras relacionadas con Marie Curie en un grid de letras.

**Componentes**:
- `SopaLetrasExercise.tsx` - Componente principal
- `SopaLetrasGrid.tsx` - Grid interactivo de letras
- `WordList.tsx` - Lista de palabras a encontrar
- `sopaLetrasTypes.ts` - Interfaces TypeScript
- `sopaLetrasSchemas.ts` - Validación Zod
- `sopaLetrasMockData.ts` - Mock data

**Características**:
- ✅ Grid interactivo con selección de celdas
- ✅ Búsqueda en múltiples direcciones (horizontal, vertical, diagonal)
- ✅ Highlight de palabras encontradas
- ✅ Timer con modo desafío
- ✅ Lista de progreso con checkmarks
- ✅ Scoring por velocidad y precisión

**Props de `SopaLetrasExercise`**:
```typescript
interface SopaLetrasExerciseProps {
  exercise: SopaLetrasData;
  onComplete?: () => void;
}
```

**Uso**:
```tsx
import { SopaLetrasExercise } from '@features/mechanics/module1/SopaLetras/SopaLetrasExercise';
import { mockSopaLetrasExercises } from '@features/mechanics/module1/SopaLetras/sopaLetrasMockData';

<SopaLetrasExercise
  exercise={mockSopaLetrasExercises[0]}
  onComplete={() => console.log('Completado!')}
/>
```

**Mock Data**: Vocabulario científico relacionado con radioactividad, elementos y conceptos de Marie Curie.

---

### 4. Mapa Conceptual (US-003-04)

**Descripción**: Crea conexiones entre conceptos relacionados con Marie Curie.

**Componentes**:
- `MapaConceptualExercise.tsx` - Componente principal
- `ConceptNode.tsx` - Nodo de concepto draggable
- `ConnectionLine.tsx` - Línea de conexión SVG
- `mapaConceptualTypes.ts` - Interfaces TypeScript
- `mapaConceptualSchemas.ts` - Validación Zod
- `mapaConceptualMockData.ts` - Mock data

**Características**:
- ✅ Nodos arrastrables con Framer Motion
- ✅ Conexiones visuales con SVG
- ✅ Sistema de categorías por color
- ✅ Validación de conexiones correctas
- ✅ Export de mapa conceptual
- ✅ Scoring por relaciones correctas

**Props de `MapaConceptualExercise`**:
```typescript
interface MapaConceptualExerciseProps {
  exercise: MapaConceptualData;
  onComplete?: () => void;
}
```

**Uso**:
```tsx
import { MapaConceptualExercise } from '@features/mechanics/module1/MapaConceptual/MapaConceptualExercise';
import { mockMapaConceptualExercises } from '@features/mechanics/module1/MapaConceptual/mapaConceptualMockData';

<MapaConceptualExercise
  exercise={mockMapaConceptualExercises[0]}
  onComplete={() => console.log('Completado!')}
/>
```

**Mock Data**: Mapa conceptual sobre descubrimientos de Marie Curie conectando persona, fenómeno, elementos y premios.

---

### 5. Emparejamiento (US-003-05)

**Descripción**: Juego de memoria para emparejar fechas con eventos de la vida de Marie Curie.

**Componentes**:
- `EmparejamientoExercise.tsx` - Componente principal
- `MatchingCard.tsx` - Tarjeta con flip animation
- `emparejamientoTypes.ts` - Interfaces TypeScript
- `emparejamientoSchemas.ts` - Validación Zod
- `emparejamientoMockData.ts` - Mock data

**Características**:
- ✅ Tarjetas con animación de flip
- ✅ Sistema de matching con feedback visual
- ✅ Barajar automático al iniciar
- ✅ Contador de intentos
- ✅ Animaciones Framer Motion
- ✅ Scoring por intentos y tiempo

**Props de `EmparejamientoExercise`**:
```typescript
interface EmparejamientoExerciseProps {
  exercise: EmparejamientoData;
  onComplete?: () => void;
}
```

**Uso**:
```tsx
import { EmparejamientoExercise } from '@features/mechanics/module1/Emparejamiento/EmparejamientoExercise';
import { mockEmparejamientoExercises } from '@features/mechanics/module1/Emparejamiento/emparejamientoMockData';

<EmparejamientoExercise
  exercise={mockEmparejamientoExercises[0]}
  onComplete={() => console.log('Completado!')}
/>
```

**Mock Data**: Emparejamiento de fechas y eventos importantes de la vida de Marie Curie.

---

## 🎯 Características Compartidas

Todas las mecánicas de Módulo 1 incluyen:

- **ExerciseContainer**: Wrapper con título, descripción, dificultad y tiempo estimado
- **TimerWidget**: Contador de tiempo con alertas
- **ProgressTracker**: Barra de progreso visual
- **HintSystem**: Sistema de pistas con costo en ML Coins
- **FeedbackModal**: Modal de retroalimentación con confeti
- **ScoreDisplay**: Visualización de puntaje, ML Coins y XP
- **Detective Theme**: Integración completa con el tema visual

## 🔌 API Integration Points

Todas las mecánicas están preparadas para integración backend:

```typescript
// Mock functions ready for backend replacement
calculateScore(attempt: ExerciseAttempt): Promise<ScoreResult>
saveProgress(exerciseId: string, progress: unknown): Promise<void>
loadProgress(exerciseId: string): Promise<unknown | null>
```

## 📱 Responsive Design

- Mobile-first approach
- Grid adaptativo (1-4 columnas según viewport)
- Touch-optimized para tablets y móviles
- Keyboard navigation en desktop

## ♿ Accessibility

- ARIA labels en todos los componentes interactivos
- Navegación por teclado
- Alto contraste en textos
- Focus indicators visibles

## 🎨 Detective Theme Integration

- Colores de ranks Maya (Detective, Sargento, Teniente, Capitán, Comisario)
- Botones Detective (primary, gold, blue, green, purple)
- Cards Detective con hover effects
- Animaciones Framer Motion consistentes

## 📊 Scoring System

Sistema unificado de scoring para todas las mecánicas:

```typescript
interface ScoreResult {
  baseScore: number;      // 0-100 por precisión
  timeBonus: number;      // Bonus por velocidad
  accuracyBonus: number;  // Bonus por alta precisión (>90%)
  totalScore: number;     // Score total
  mlCoins: number;        // ML Coins ganados
  xpGained: number;       // Experiencia ganada
}
```

## 🧪 Testing

Para probar las mecánicas:

```bash
# Desarrollo
npm run dev

# Type checking
npm run type-check

# Build
npm run build
```

---

**Autor**: Senior Frontend Developer
**Fecha**: 2025-10-16
**Versión**: 1.0.0
**Stack**: React 19, TypeScript 5.9, Framer Motion 12, Tailwind CSS 4, Zod 4
