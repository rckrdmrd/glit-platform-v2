# Módulo 4: Lectura Digital - Mecánicas Educativas

Este módulo implementa 4 mecánicas interactivas diseñadas para desarrollar competencias de lectura digital sobre Marie Curie.

## 📱 Mecánicas Implementadas

### 1. Quiz TikTok (US-003-18)

**Descripción**: Quiz interactivo con formato vertical tipo TikTok, optimizado para móviles.

**Componentes**:
- `QuizTikTokExercise.tsx` - Componente principal mobile-first
- `TikTokCard.tsx` - Tarjeta de pregunta vertical
- `SwipeGesture.tsx` - Utilidades de gestos
- `quizTikTokTypes.ts` - Interfaces TypeScript
- `quizTikTokSchemas.ts` - Validación Zod
- `quizTikTokMockData.ts` - Mock data

**Características**:
- ✅ UI vertical 100vh mobile-first
- ✅ Swipe gestures para navegación
- ✅ Backgrounds de colores dinámicos
- ✅ Transiciones suaves entre preguntas
- ✅ Indicador de progreso (X/Y)
- ✅ Botones de navegación up/down
- ✅ Scoring por velocidad y precisión

**Props de `QuizTikTokExercise`**:
```typescript
interface QuizTikTokExerciseProps {
  exercise: QuizTikTokData;
  onComplete?: () => void;
}
```

**Uso**:
```tsx
import { QuizTikTokExercise } from '@features/mechanics/module4/QuizTikTok/QuizTikTokExercise';
import { mockQuizTikTokExercises } from '@features/mechanics/module4/QuizTikTok/quizTikTokMockData';

<QuizTikTokExercise
  exercise={mockQuizTikTokExercises[0]}
  onComplete={() => console.log('Completado!')}
/>
```

**Mock Data**: 3 preguntas rápidas sobre Marie Curie con backgrounds de colores vibrantes.

**Mobile Features**:
- Portrait mode optimizado
- Touch-friendly buttons
- Swipe natural con física
- Pantalla completa sin distracciones

---

### 2. Navegación Hipertextual (US-003-19)

**Descripción**: Exploración de documentos interconectados sobre Marie Curie con navegación hipertextual.

**Componentes**:
- `NavegacionHipertextualExercise.tsx` - Componente principal
- `HypertextDocument.tsx` - Documento con enlaces
- `NavigationBreadcrumbs.tsx` - Breadcrumbs de navegación
- `navegacionHipertextualTypes.ts` - Interfaces TypeScript
- `navegacionHipertextualSchemas.ts` - Validación Zod
- `navegacionHipertextualMockData.ts` - Mock data

**Características**:
- ✅ Navegación por enlaces hipertextuales
- ✅ Breadcrumbs de ruta visitada
- ✅ Tracking de nodos visitados
- ✅ Sistema de nodos interconectados
- ✅ Objetivo de navegación (nodo target)
- ✅ Historial de navegación visual

**Props de `NavegacionHipertextualExercise`**:
```typescript
interface NavegacionHipertextualExerciseProps {
  exercise: NavegacionHipertextualData;
  onComplete?: () => void;
}
```

**Uso**:
```tsx
import { NavegacionHipertextualExercise } from '@features/mechanics/module4/NavegacionHipertextual/NavegacionHipertextualExercise';
import { mockNavegacionHipertextualExercises } from '@features/mechanics/module4/NavegacionHipertextual/navegacionHipertextualMockData';

<NavegacionHipertextualExercise
  exercise={mockNavegacionHipertextualExercises[0]}
  onComplete={() => console.log('Navegación completada!')}
/>
```

**Mock Data**: Red de documentos sobre la biografía de Marie Curie (Inicio → Infancia → Estudios).

**Pedagogía**:
- Desarrolla habilidades de navegación digital
- Comprensión de estructura hipertextual
- Toma de decisiones en lectura no lineal

---

### 3. Análisis de Memes (US-003-20)

**Descripción**: Herramienta de análisis visual para identificar elementos clave en memes sobre Marie Curie.

**Componentes**:
- `AnalisisMemesExercise.tsx` - Componente principal
- `MemeAnnotator.tsx` - Canvas de anotación
- `AnnotationMarker.tsx` - Marcador de anotación
- `analisisMemesTypes.ts` - Interfaces TypeScript
- `analisisMemesSchemas.ts` - Validación Zod
- `analisisMemesMockData.ts` - Mock data

**Características**:
- ✅ Imagen interactiva con modo de anotación
- ✅ Marcadores con tooltips informativos
- ✅ Categorías de análisis (texto, contexto, humor, crítica)
- ✅ Sistema de coordenadas X,Y
- ✅ Modo "Añadir Anotación" con cursor crosshair
- ✅ Validación de anotaciones esperadas

**Props de `AnalisisMemesExercise`**:
```typescript
interface AnalisisMemesExerciseProps {
  exercise: AnalisisMemesData;
  onComplete?: () => void;
}
```

**Uso**:
```tsx
import { AnalisisMemesExercise } from '@features/mechanics/module4/AnalisisMemes/AnalisisMemesExercise';
import { mockAnalisisMemesExercises } from '@features/mechanics/module4/AnalisisMemes/analisisMemesMockData';

<AnalisisMemesExercise
  exercise={mockAnalisisMemesExercises[0]}
  onComplete={() => console.log('Análisis completado!')}
/>
```

**Mock Data**: Meme sobre Marie Curie trabajando con elementos radioactivos.

**Categorías de Análisis**:
- **Texto**: Elementos textuales del meme
- **Contexto**: Referencias históricas/culturales
- **Humor**: Elementos cómicos
- **Crítica**: Mensajes críticos o reflexivos

---

### 4. Infografía Interactiva (US-003-17)

**Descripción**: Exploración de infografía sobre logros de Marie Curie con tarjetas revelables.

**Componentes**:
- `InfografiaInteractivaExercise.tsx` - Componente principal
- `InteractiveCard.tsx` - Tarjeta click-to-reveal
- `DataVisualization.tsx` - Visualización de datos
- `infografiaInteractivaTypes.ts` - Interfaces TypeScript
- `infografiaInteractivaSchemas.ts` - Validación Zod
- `infografiaInteractivaMockData.ts` - Mock data

**Características**:
- ✅ Tarjetas interactivas click-to-reveal
- ✅ Visualización de progreso de exploración
- ✅ Mapa visual con posiciones X,Y
- ✅ Animaciones de reveal con Framer Motion
- ✅ Gradientes de color atractivos
- ✅ Iconos representativos (trophy, atom, etc.)

**Props de `InfografiaInteractivaExercise`**:
```typescript
interface InfografiaInteractivaExerciseProps {
  exercise: InfografiaInteractivaData;
  onComplete?: () => void;
}
```

**Uso**:
```tsx
import { InfografiaInteractivaExercise } from '@features/mechanics/module4/InfografiaInteractiva/InfografiaInteractivaExercise';
import { mockInfografiaInteractivaExercises } from '@features/mechanics/module4/InfografiaInteractiva/infografiaInteractivaMockData';

<InfografiaInteractivaExercise
  exercise={mockInfografiaInteractivaExercises[0]}
  onComplete={() => console.log('Exploración completada!')}
/>
```

**Mock Data**: Infografía sobre los principales logros de Marie Curie (Premios Nobel, Descubrimientos).

**Interactividad**:
- Click para revelar contenido
- Progress tracker visual
- Mapa de exploración
- Completación al revelar todas las tarjetas

---

## 🎯 Características Compartidas

Todas las mecánicas de Módulo 4 incluyen:

- **ExerciseContainer**: Wrapper con metadata del ejercicio
- **Detective Theme**: Integración completa con el tema visual
- **Responsive Design**: Optimizado para mobile y desktop
- **Framer Motion**: Animaciones fluidas y profesionales
- **FeedbackModal**: Retroalimentación con scoring
- **Accessibility**: Navegación por teclado y ARIA labels

## 📱 Mobile-First Design

Módulo 4 está especialmente optimizado para dispositivos móviles:

- **Quiz TikTok**: Vertical UI nativa de móvil
- **Navegación Hipertextual**: Touch-friendly links
- **Análisis Memes**: Touch para añadir anotaciones
- **Infografía**: Tarjetas grandes touch-optimized

## 🎨 Visual Design

### Quiz TikTok
- Backgrounds de colores vibrantes
- Tipografía grande y legible
- Botones grandes para touch
- Indicadores de progreso minimalistas

### Navegación Hipertextual
- Breadcrumbs claros
- Enlaces con hover effects
- Contenido bien espaciado
- Iconos de navegación

### Análisis Memes
- Marcadores rojos destacados
- Tooltips informativos
- Cursor crosshair en modo añadir
- Categorías por color

### Infografía Interactiva
- Gradientes atractivos (blue → purple)
- Iconos de estado (eye/eye-off)
- Animaciones smooth
- Progress tracker visual

## 🔌 API Integration Points

Todas las mecánicas están preparadas para integración backend:

```typescript
// Mock functions ready for backend replacement
calculateScore(attempt: ExerciseAttempt): Promise<ScoreResult>
saveProgress(exerciseId: string, progress: unknown): Promise<void>
loadProgress(exerciseId: string): Promise<unknown | null>
```

## 📊 Scoring System

Sistema de scoring adaptado para lectura digital:

```typescript
interface ScoreResult {
  baseScore: number;      // Precisión en respuestas/anotaciones
  timeBonus: number;      // Bonus por velocidad (Quiz TikTok)
  accuracyBonus: number;  // Bonus por análisis completo
  totalScore: number;     // Score total
  mlCoins: number;        // ML Coins ganados
  xpGained: number;       // Experiencia ganada
}
```

## 🎓 Competencias Desarrolladas

**Quiz TikTok**:
- Lectura rápida y comprensión
- Toma de decisiones ágil
- Familiaridad con formato vertical

**Navegación Hipertextual**:
- Navegación no lineal
- Comprensión de estructura de información
- Orientación en documentos complejos

**Análisis Memes**:
- Análisis visual crítico
- Identificación de elementos culturales
- Comprensión de humor y crítica social

**Infografía Interactiva**:
- Exploración autónoma
- Síntesis de información visual
- Retención de datos clave

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

## 📱 Consideraciones Mobile

### Quiz TikTok
- Testeado en viewport de 375px - 428px
- Swipe gestures nativos
- Fullscreen sin scroll
- Orientación portrait obligatoria

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- ARIA labels en todos los controles
- Keyboard navigation (excepto Quiz TikTok que es touch-first)
- Alto contraste en textos
- Focus indicators visibles
- Screen reader friendly

---

**Autor**: Senior Frontend Developer
**Fecha**: 2025-10-16
**Versión**: 1.0.0
**Stack**: React 19, TypeScript 5.9, Framer Motion 12, Tailwind CSS 4, Zod 4
**Especialización**: Mobile-First, Touch Interactions, Digital Reading
