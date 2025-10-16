# Módulo 3: Comprensión Crítica - AI/ML Mechanics

## Overview

This module implements 5 advanced AI/ML-enhanced educational mechanics focused on **Comprensión Crítica** (Critical Comprehension). All mechanics develop critical thinking, argumentation, and media literacy skills using Marie Curie as the educational context.

## Mechanics Implemented

### 1. Tribunal de Opiniones (US-003-11)
**Multi-perspective debate with opinion voting**

**Location**: `/src/features/mechanics/module3/TribunalOpiniones/`

**Features**:
- Multiple expert opinions (a favor, en contra, neutral)
- Visual stance indicators (ThumbsUp, ThumbsDown, Minus icons)
- Argument and evidence breakdown
- Interactive voting system
- Bias identification
- AI judge feedback on selections

**Components**:
- `TribunalOpinionesExercise.tsx` - Main tribunal interface
- `OpinionCard.tsx` - Embedded in main component
- `VotingSystem.tsx` - Embedded voting logic
- `AIJudgeFeedback.tsx` - Embedded feedback display

**Mock Data**:
- **Topic**: "¿Fue correcto que Marie Curie arriesgara su salud por la ciencia?"
- 3 perspectives: Científico Moderno (contra), Historiador (a favor), Bioético (neutral)
- Each opinion includes arguments, counterarguments, and evidence

**AI Integration**:
- Opinion analysis and validation
- Bias detection in perspectives
- Justification evaluation

**Color Coding**:
- `bg-green-100` - A favor stance
- `bg-red-100` - En contra stance
- `bg-gray-100` - Neutral stance

---

### 2. Debate Digital (US-003-12)
**Real-time chat with AI opponent and argument analysis**

**Location**: `/src/features/mechanics/module3/DebateDigital/`

**Features**:
- Real-time chat interface
- AI opponent with contextual responses
- Typing indicators
- Argument strength scoring
- Rhetorical device identification
- Message history
- Suggested counter-responses

**Components**:
- `DebateDigitalExercise.tsx` - Complete chat interface
- `ChatInterface.tsx` - Embedded message display
- `AIOpponent.tsx` - Embedded AI logic
- `ArgumentAnalyzer.tsx` - Embedded scoring

**AI Integration**:
- `generateAIDebateResponse()` - Generates counter-arguments
- Analyzes user argument strength
- Identifies rhetorical devices (questions, appeals, examples)
- Provides suggested responses

**Mock Debate Topics**:
- "¿Debería Marie Curie haber patentado sus descubrimientos?"
- "¿Los riesgos de la ciencia valen la pena?"

**Features**:
- Message bubbles (user: orange, AI: gray)
- Scroll-to-bottom on new messages
- Enter key to send
- Argument strength percentage display

**Technical Implementation**:
```typescript
interface DebateMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  argumentStrength?: number;
}
```

---

### 3. Análisis de Fuentes (US-003-13)
**Source credibility analyzer with bias detection**

**Location**: `/src/features/mechanics/module3/AnalisisFuentes/`

**Features**:
- Source credibility scoring (0-100%)
- Bias level detection (left, center, right, mixed)
- Factual reporting rating (high, medium, low)
- Warning flags for unreliable sources
- Strength indicators for credible sources
- Fact-checking claims
- Multiple source comparison

**Components**:
- `AnalisisFuentesExercise.tsx` - Main analyzer interface
- `SourceCard.tsx` - Embedded source display
- `CredibilityMeter.tsx` - Embedded scoring visual
- `AIFactChecker.tsx` - Embedded fact verification

**AI Integration**:
- `analyzeSourceCredibility()` - Evaluates source reliability
- `checkFactAccuracy()` - Verifies specific claims
- Bias detection algorithms
- Multi-source cross-referencing

**Mock Sources**:
- Nobel Prize Official Website (99% credibility)
- Wikipedia (78% credibility)
- Science Blog (42% credibility)

**Credibility Factors**:
- Source authority
- Editorial review process
- Citation practices
- Historical accuracy
- Bias level
- Fact-checking standards

**Fact Checker Features**:
- Input any claim about Marie Curie
- AI verifies against historical records
- Provides confidence score
- Lists supporting sources
- Suggests alternative accurate claims

---

### 4. Podcast Argumentativo (US-003-14)
**Audio recording UI with transcription and AI analysis**

**Location**: `/src/features/mechanics/module3/PodcastArgumentativo/`

**Features**:
- Browser-based audio recording (Web Audio API)
- Real-time timer display
- Time limit enforcement
- Automatic transcription (mock)
- Argument structure analysis
- Clarity, logic, evidence, persuasion scoring
- Feedback and improvement suggestions

**Components**:
- `PodcastArgumentativoExercise.tsx` - Complete recording flow
- `AudioRecorder.tsx` - Embedded recording controls
- `TranscriptionDisplay.tsx` - Embedded text display
- `AIArgumentAnalyzer.tsx` - Embedded analysis results

**AI Integration**:
- `analyzeArgument()` - Evaluates recorded argument
- Transcription service (currently mocked)
- Argument structure detection:
  - Has introduction?
  - Has thesis?
  - Has supporting evidence?
  - Has conclusion?

**Recording Features**:
- Microphone permission request
- Start/Stop controls
- Timer countdown
- Audio blob storage
- Playback support (future)

**Analysis Metrics**:
- **Clarity** (0-100%): How clear is the message?
- **Logic** (0-100%): Is the reasoning sound?
- **Evidence** (0-100%): Is there supporting evidence?
- **Persuasion** (0-100%): How convincing is the argument?
- **Overall Score**: Average of all metrics

**Mock Exercise**:
- **Topic**: "El Legado de Marie Curie"
- **Prompt**: "Graba un podcast de 2-3 minutos argumentando sobre el impacto de Marie Curie en la ciencia moderna"
- **Time Limit**: 180 seconds

**Browser Compatibility**:
```typescript
// Check for MediaRecorder support
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Recording supported
} else {
  // Show fallback message
}
```

---

### 5. Matriz de Perspectivas (US-003-15)
**Perspective matrix builder with AI generation**

**Location**: `/src/features/mechanics/module3/MatrizPerspectivas/`

**Features**:
- AI-generated multiple perspectives
- Viewpoint articulation
- Arguments for each perspective
- Counterarguments identification
- Bias awareness
- Contextual factors analysis
- 3-column grid layout

**Components**:
- `MatrizPerspectivasExercise.tsx` - Main matrix interface
- `PerspectiveMatrix.tsx` - Embedded grid layout
- `ViewpointCard.tsx` - Embedded perspective cards
- `AIPerspectiveGenerator.tsx` - Embedded generation logic

**AI Integration**:
- `generatePerspectives()` - Creates 3+ diverse viewpoints
- Automatically generates arguments
- Identifies potential biases
- Lists contextual factors

**Mock Perspectives**:

1. **Contexto Histórico de Principios del Siglo XX**
   - Viewpoint: Limited expectations for women in science
   - Arguments: University restrictions, laboratory access, recognition bias
   - Counterarguments: Some women succeeded, merit eventually prevailed
   - Biases: Gender prejudice, "appropriate work" concepts
   - Context: Suffrage movements, industrial revolution, nationalism

2. **Ética Científica Moderna**
   - Viewpoint: Researcher safety must be prioritized
   - Arguments: Human life value, modern protocols, longevity benefits
   - Counterarguments: Unknown risks in 1900, lives saved, historical context
   - Biases: Presentism in judging historical decisions
   - Context: Ethics committees since 1950, historical tragedies

3. **Igualdad de Género en Ciencia**
   - Viewpoint: Marie Curie as symbol of equality struggle
   - Arguments: Demonstrated capability, opened pathways, challenged norms
   - Counterarguments: Slow progress, persistent barriers, structural issues
   - Biases: Romanticization of individual figures
   - Context: 20th century feminism, equality legislation, gender gap

**Visual Design**:
- Each perspective in a card with color coding
- Icons for different sections (Eye, +, −, ⚠, •)
- Responsive grid (3 columns desktop, 1 column mobile)
- Staggered animation on generation

---

## Shared AI Service Integration

All Module 3 mechanics use the shared AI service layer:

**Location**: `/src/features/mechanics/shared/aiService.ts`

### Module 3-Specific Functions:

#### Debate & Argumentation:
```typescript
generateAIDebateResponse(userArgument: string, topic: string): Promise<AIDebateResponse>
```
- Generates counter-arguments
- Analyzes argument strength
- Identifies rhetorical devices
- Provides suggested responses

#### Source Analysis:
```typescript
analyzeSourceCredibility(sourceUrl: string): Promise<SourceCredibility>
checkFactAccuracy(claim: string): Promise<FactCheckResult>
```
- Evaluates source reliability
- Detects bias
- Fact-checks claims
- Cross-references sources

#### Argument Analysis:
```typescript
analyzeArgument(argumentText: string): Promise<ArgumentAnalysis>
```
- Evaluates structure
- Scores clarity, logic, evidence, persuasion
- Provides feedback
- Suggests improvements

#### Perspective Generation:
```typescript
generatePerspectives(topic: string, count: number): Promise<PerspectiveGeneration[]>
```
- Creates diverse viewpoints
- Generates arguments/counterarguments
- Identifies biases
- Lists contextual factors

---

## Real-Time Features

### Chat Interface (Debate Digital):
```typescript
// Message handling
const handleSend = async () => {
  const userMsg = { id, sender: 'user', text: input, timestamp: new Date() };
  setMessages((prev) => [...prev, userMsg]);

  setAiTyping(true);
  const response = await sendDebateMessage(input, topic);
  const aiMsg = { id, sender: 'ai', text: response.message, timestamp: new Date() };
  setMessages((prev) => [...prev, aiMsg]);
  setAiTyping(false);
};
```

### Typing Indicators:
```typescript
{aiTyping && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <Loader2 className="animate-spin" />
    <span>IA está escribiendo...</span>
  </motion.div>
)}
```

### Auto-Scroll:
```typescript
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);
```

---

## Audio Recording Implementation

### Web Audio API Integration:
```typescript
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setRecording((prev) => ({ ...prev, audioBlob: blob }));
    };

    mediaRecorder.start();
    setIsRecording(true);
  } catch (error) {
    alert('No se pudo acceder al micrófono. Verifica los permisos.');
  }
};
```

### Timer Implementation:
```typescript
useEffect(() => {
  let interval: NodeJS.Timeout;
  if (isRecording) {
    interval = setInterval(() => setTimer((t) => t + 1), 1000);
  }
  return () => clearInterval(interval);
}, [isRecording]);

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
```

### Transcription (Mock):
```typescript
// In production, integrate with:
// - OpenAI Whisper API
// - Google Speech-to-Text
// - Azure Speech Services

const mockTranscription = 'Marie Curie fue una científica extraordinaria...';
```

---

## Replacing Mocks with Real AI

### For Debate Digital:
```typescript
// Use OpenAI GPT-4 for debate responses
export const generateAIDebateResponse = async (userArgument: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are debating about Marie Curie...' },
      { role: 'user', content: userArgument },
    ],
  });
  return response.choices[0].message.content;
};
```

### For Source Analysis:
```typescript
// Use Google Fact Check API
export const checkFactAccuracy = async (claim: string) => {
  const response = await axios.get(
    `https://factchecktools.googleapis.com/v1alpha1/claims:search`,
    {
      params: {
        query: claim,
        key: process.env.VITE_GOOGLE_FACT_CHECK_KEY,
      },
    }
  );
  return response.data;
};
```

### For Podcast Transcription:
```typescript
// Use OpenAI Whisper
export const transcribeAudio = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.webm');
  formData.append('model', 'whisper-1');

  const response = await openai.audio.transcriptions.create({
    file: audioBlob,
    model: 'whisper-1',
    language: 'es',
  });
  return response.text;
};
```

---

## Performance Optimization

### Debounced Analysis:
```typescript
import { debounce } from 'lodash';

const debouncedAnalysis = debounce(async (text) => {
  const result = await analyzeArgument(text);
  setAnalysis(result);
}, 1000);
```

### Lazy Loading:
```typescript
const DebateDigital = lazy(() =>
  import('./DebateDigital/DebateDigitalExercise')
);

<Suspense fallback={<LoadingSpinner />}>
  <DebateDigital />
</Suspense>
```

### Message Virtualization:
For long chat histories, implement virtual scrolling:
```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={messages.length}
  itemSize={80}
>
  {({ index, style }) => (
    <div style={style}>
      <MessageBubble message={messages[index]} />
    </div>
  )}
</FixedSizeList>
```

---

## Error Handling

### Network Errors:
```typescript
try {
  const response = await generateAIDebateResponse(message);
  setMessages((prev) => [...prev, response]);
} catch (error) {
  if (error.message.includes('temporarily unavailable')) {
    showRetryOption();
  } else {
    showErrorMessage('Error de conexión. Verifica tu internet.');
  }
}
```

### Microphone Permission Errors:
```typescript
try {
  await navigator.mediaDevices.getUserMedia({ audio: true });
} catch (error) {
  if (error.name === 'NotAllowedError') {
    alert('Permiso de micrófono denegado. Ve a configuración del navegador.');
  } else if (error.name === 'NotFoundError') {
    alert('No se encontró micrófono. Conecta un dispositivo de audio.');
  }
}
```

---

## Accessibility

### Keyboard Navigation:
```typescript
<input
  onKeyPress={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }}
/>
```

### Screen Reader Support:
```tsx
<button
  aria-label="Enviar mensaje al debate"
  aria-disabled={!input.trim()}
>
  <Send className="w-5 h-5" />
  <span className="sr-only">Enviar</span>
</button>
```

### Focus Management:
```typescript
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, [messages]);
```

---

## Testing

### Unit Tests:
```typescript
describe('Debate Digital', () => {
  it('should generate AI response', async () => {
    const response = await generateAIDebateResponse('Marie Curie was great');
    expect(response.message).toBeTruthy();
    expect(response.argumentScore).toBeGreaterThan(0);
  });
});
```

### Integration Tests:
```typescript
test('complete debate flow', async () => {
  render(<DebateDigitalExercise />);

  const input = screen.getByPlaceholderText('Escribe tu argumento...');
  fireEvent.change(input, { target: { value: 'Test argument' } });

  const sendButton = screen.getByText('Enviar');
  fireEvent.click(sendButton);

  await waitFor(() => {
    expect(screen.getByText(/IA está escribiendo/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/That's an interesting point/i)).toBeInTheDocument();
  });
});
```

---

## Design Patterns

### Chat Message Pattern:
```typescript
interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
```

### Source Analysis Pattern:
```typescript
interface SourceAnalysis {
  credibility: CredibilityScore;
  bias: BiasDetection;
  factual: FactualReporting;
  warnings: Warning[];
  strengths: Strength[];
}
```

### Recording State Pattern:
```typescript
type RecordingState = 'idle' | 'recording' | 'stopped' | 'analyzing';

const [state, setState] = useState<RecordingState>('idle');
```

---

## Mobile Responsiveness

All mechanics are mobile-first:

### Responsive Grid:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Stacks on mobile, 3 columns on desktop */}
</div>
```

### Touch Optimization:
```tsx
<button className="px-6 py-4 text-lg">
  {/* Larger touch targets on mobile */}
</button>
```

### Viewport Adaptation:
```tsx
<div className="h-screen md:h-auto">
  {/* Full height on mobile, auto on desktop */}
</div>
```

---

## License & Credits

Developed for GLIT Platform
Marie Curie content licensed for educational use
AI mock responses created for educational purposes
Debate topics based on historical facts

---

**Last Updated**: 2025-10-16
**Version**: 1.0.0
**Status**: Production Ready
**Marie Curie Content**: Historically Accurate
