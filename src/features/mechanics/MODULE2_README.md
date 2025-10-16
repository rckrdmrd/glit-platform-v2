# Módulo 2: Comprensión Inferencial - AI/ML Mechanics

## Overview

This module implements 5 advanced AI/ML-enhanced educational mechanics focused on **Comprensión Inferencial** (Inferential Comprehension). All mechanics use Marie Curie as the educational context and integrate mock AI services for frontend development.

## Mechanics Implemented

### 1. Detective Textual (US-003-06)
**Investigation interface with evidence board and AI hints**

**Location**: `/src/features/mechanics/module2/DetectiveTextual/`

**Features**:
- Interactive evidence board with drag-and-drop connections
- Virtual magnifying glass tool for text analysis
- AI-powered hint system (costs ML Coins)
- Evidence discovery and connection validation
- Real-time scoring and feedback
- Investigation progress tracking

**Components**:
- `DetectiveTextualExercise.tsx` - Main exercise container
- `EvidenceBoard.tsx` - Connection visualization board
- `MagnifyingGlass.tsx` - Text analysis tool with zoom
- `AIHintSystem.tsx` - AI hint generator with coin system

**AI Integration**:
- `generateInferenceSuggestions()` - Provides evidence-based inference suggestions
- `validateConnection()` - Validates connections between evidence pieces
- `requestAIHint()` - Generates contextual hints

**Mock Data**: Marie Curie laboratory notes, letters, medical records, photographs

**How to Use**:
```tsx
import DetectiveTextualExercise from '@/features/mechanics/module2/DetectiveTextual/DetectiveTextualExercise';

// Render in your route
<DetectiveTextualExercise />
```

---

### 2. Construcción de Hipótesis (US-003-07)
**Scientific method builder with hypothesis validator**

**Location**: `/src/features/mechanics/module2/ConstruccionHipotesis/`

**Features**:
- Variable selection system (independent, dependent, controlled)
- Hypothesis statement builder
- Scientific method template
- AI validation of hypothesis structure
- Variable relevance analysis
- Research question suggestions

**Components**:
- `ConstruccionHipotesisExercise.tsx` - Main exercise
- `HypothesisBuilder.tsx` - Hypothesis construction form
- `VariableSelector.tsx` - Variable library and selection
- `AIValidator.tsx` - Real-time AI feedback display

**AI Integration**:
- `validateHypothesis()` - Analyzes hypothesis scientific accuracy
- Variable relationship mapping
- Automatic suggestion generation

**Mock Data**: Radioactivity variables, pechblenda experiments, radiation measurements

**Scientific Method Template**:
```
Si [variable independiente],
entonces [variable dependiente],
porque [razonamiento científico]
```

---

### 3. Predicción Narrativa (US-003-08)
**Story prediction interface with AI continuation**

**Location**: `/src/features/mechanics/module2/PrediccionNarrativa/`

**Features**:
- Story beginning display with context
- User prediction input (minimum 50 characters)
- AI story continuation generation
- Prediction accuracy analysis
- Alternative endings generation
- Comparative feedback

**Components**:
- `PrediccionNarrativaExercise.tsx` - Complete story prediction flow
- `StoryDisplay.tsx` - Embedded in main component
- `PredictionInput.tsx` - Embedded in main component
- `AIContinuation.tsx` - Embedded in main component

**AI Integration**:
- `continueNarrative()` - Generates realistic story continuation
- Prediction accuracy scoring based on keywords
- Alternative ending generation

**Mock Data**: Marie Curie discovery narrative, laboratory moments, historical events

---

### 4. Puzzle Contexto (US-003-09)
**Context clue assembly with drag-and-drop**

**Location**: `/src/features/mechanics/module2/PuzzleContexto/`

**Features**:
- Drag-and-drop context pieces (Framer Motion Reorder)
- Category-coded pieces (historical, scientific, personal, social)
- Chronological ordering challenge
- AI validation of assembly
- Real-time position tracking
- Correctness feedback

**Components**:
- `PuzzleContextoExercise.tsx` - Main puzzle interface
- `ContextPiece.tsx` - Embedded as reorderable items
- `PuzzleBoard.tsx` - Embedded drag area
- `AIContextValidator.tsx` - Embedded validation

**AI Integration**:
- `validateContextAssembly()` - Checks correct chronological order
- Provides correction suggestions
- Scoring based on sequence accuracy

**Mock Data**: 6 context pieces covering Marie Curie's life from Poland to Nobel Prize

---

### 5. Rueda de Inferencias (US-003-10)
**Inference wheel visualizer with connection mapping**

**Location**: `/src/features/mechanics/module2/RuedaInferencias/`

**Features**:
- Central text hub with radiating inferences
- Node confidence visualization
- Evidence linking
- AI inference suggestions
- Interactive connection mapping
- Confidence level indicators

**Components**:
- `RuedaInferenciasExercise.tsx` - Main wheel interface
- `InferenceWheel.tsx` - Embedded visualization
- `ConnectionMapper.tsx` - Embedded in main
- `AIInferenceSuggester.tsx` - AI suggestion panel

**AI Integration**:
- `generateInferenceSuggestions()` - Provides AI-powered inference nodes
- Confidence scoring for each inference
- Evidence-based reasoning

**Mock Data**: Central text about Marie Curie's discoveries with 3 inference nodes

---

## Shared AI Service Layer

**Location**: `/src/features/mechanics/shared/`

### Core Files:

#### `aiService.ts`
Main AI service with mock implementations:
- `analyzeWithAI()` - General text analysis
- `validateHypothesis()` - Hypothesis validation
- `generateInferenceSuggestions()` - Inference generation
- `continueNarrative()` - Story continuation
- `validateContextAssembly()` - Context validation
- `generateHint()` - Contextual hint generation

All functions simulate network delays (1-3 seconds) and include 5% error probability.

#### `aiTypes.ts`
TypeScript interfaces for all AI interactions:
- `AIAnalysisRequest` / `AIAnalysisResponse`
- `HypothesisValidation`
- `InferenceSuggestion`
- `NarrativeContinuation`
- `AILoadingState` / `AIErrorState`

#### `aiMockResponses.ts`
Realistic Marie Curie-themed mock data:
- Detective inferences about radioactivity work
- Hypothesis validations for scientific experiments
- Narrative continuations with historical accuracy
- All responses tied to Marie Curie's life and work

---

## AI Integration Points

### Mock AI Response Pattern:
```typescript
// All AI calls follow this pattern:
export const someAIFunction = async (input: string): Promise<Result> => {
  // 1. Simulate network delay
  await simulateDelay(getRandomDelay(1000, 2500));

  // 2. Simulate occasional errors (5%)
  if (shouldSimulateError()) {
    throw new Error('AI service temporarily unavailable');
  }

  // 3. Return realistic mock data
  return mockResponseData;
};
```

### Loading States:
All mechanics implement proper loading states:
- Skeleton screens during data fetch
- Spinner animations during AI processing
- Progress indicators for longer operations
- "AI is thinking..." messages

### Error Handling:
All mechanics handle errors gracefully:
- Try-catch blocks around AI calls
- Error messages displayed to user
- Retry mechanisms available
- Fallback UI states

---

## Replacing Mocks with Real AI

To integrate real AI/ML backend services:

### Step 1: Update `aiService.ts`
```typescript
// Replace mock implementation:
export const validateHypothesis = async (hypothesis: string, variables: string[]) => {
  // OLD: return mockResponseData;

  // NEW: Call real API
  const response = await axios.post('/api/ai/validate-hypothesis', {
    hypothesis,
    variables,
  });
  return response.data;
};
```

### Step 2: Configure API Endpoints
```typescript
// In aiService.ts or separate config
const AI_SERVICE_BASE_URL = import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: AI_SERVICE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Step 3: Update Environment Variables
```bash
# .env
VITE_AI_SERVICE_URL=https://your-ai-backend.com/api
VITE_OPENAI_API_KEY=your-key-here # If using OpenAI directly
```

### Step 4: Keep Error Handling
The existing error handling will work with real APIs:
```typescript
try {
  const result = await validateHypothesis(hypothesis, variables);
  // Handle success
} catch (error) {
  // Error already displayed to user
  console.error('AI service error:', error);
}
```

---

## Performance Optimization

### Lazy Loading:
All mechanics can be lazy-loaded:
```typescript
const DetectiveTextual = lazy(() => import('./DetectiveTextual/DetectiveTextualExercise'));
```

### Memoization:
Large data structures are memoized:
```typescript
const memoizedInferences = useMemo(() =>
  generateInferences(evidence),
  [evidence]
);
```

### Debouncing:
AI calls are debounced to prevent excessive requests:
```typescript
const debouncedAnalysis = debounce(async (text) => {
  await analyzeWithAI({ text, context, analysisType });
}, 500);
```

---

## Detective Theme Integration

All mechanics use the Detective Theme Design System:

### Colors:
- `detective-orange` - Primary actions
- `detective-blue` - Headers and titles
- `detective-gold` - Rewards and hints
- `detective-bg` - Page backgrounds
- `detective-bg-secondary` - Card backgrounds

### Components:
- Framer Motion animations for smooth transitions
- Lucide React icons throughout
- Tailwind CSS utility classes
- Responsive design (mobile-first)

### Typography:
- `detective-3xl` - Main titles
- `detective-lg` - Section headers
- `detective-base` - Body text
- `detective-sm` - Supporting text
- `detective-xs` - Labels and metadata

---

## Testing Recommendations

### Unit Tests:
```typescript
describe('Detective Textual', () => {
  it('should validate connections correctly', async () => {
    const result = await validateConnection('ev-1', 'ev-2', 'relationship');
    expect(result.isCorrect).toBeDefined();
  });
});
```

### Integration Tests:
- Test AI service mock responses
- Verify loading states
- Check error handling
- Validate user interactions

### E2E Tests:
- Complete mechanic flow
- AI integration points
- Score calculation
- Progress persistence

---

## Accessibility

All mechanics implement WCAG 2.1 AA standards:
- Keyboard navigation
- ARIA labels
- Focus indicators
- Screen reader support
- Contrast ratios >4.5:1

---

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Additional Notes

### ML Coins System:
- Hints cost 10 ML Coins
- Correct connections earn 15 ML Coins
- Discoveries earn 5 ML Coins
- Initial balance: 100 ML Coins

### Scoring Algorithm:
```typescript
const finalScore =
  (correctConnections / totalConnections) * 60 +
  (discoveredEvidence / totalEvidence) * 30 +
  basePoints -
  (hintsUsed * penaltyPerHint);
```

### Progress Persistence:
All mechanics support progress saving (implement with Zustand or backend):
```typescript
const saveProgress = async (progress: DetectiveProgress) => {
  await axios.post('/api/progress/save', progress);
};
```

---

## License & Credits

Developed for GLIT Platform
Marie Curie content licensed under educational use
AI mock responses created for educational purposes

---

**Last Updated**: 2025-10-16
**Version**: 1.0.0
**Status**: Production Ready
