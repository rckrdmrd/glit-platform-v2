# Module 4: Additional Reading Mechanics (5 Mechanics)

This module contains 5 educational mechanics for **Módulo 4 - Lectura Digital**, all themed around Marie Curie and critical digital literacy.

## Overview

These mechanics focus on developing advanced reading and writing skills in digital environments, with an emphasis on formal communication, fact-checking, literary interaction, and critical analysis.

## Mechanics Implemented

### 1. Verificador Fake News (US-003-16)
**Location**: `/module4/VerificadorFakeNews/`

**Description**: Fact-checking dashboard that teaches students to identify fake news and verify claims about Marie Curie.

**Features**:
- Article parser with text selection
- Claim extraction interface
- Mock fact-checking API integration
- Source credibility scoring
- Multiple verdict types (true, false, partially-true, misleading, unverified)
- Visual indicators for verified claims

**Components**:
- `VerificadorFakeNewsExercise.tsx` - Main exercise container
- `ArticleParser.tsx` - Article reader with claim extraction
- `FactCheckDashboard.tsx` - Results panel with verification status
- `verificadorFakeNewsTypes.ts` - TypeScript interfaces
- `verificadorFakeNewsSchemas.ts` - Zod validation schemas
- `verificadorFakeNewsMockData.ts` - Sample articles and results

**Mock Articles**:
1. Marie Curie's radioactivity discovery (mixed accuracy)
2. First female professor at La Sorbonne (accurate)
3. Radium as miracle cure (completely false)

**Usage**:
```typescript
import { VerificadorFakeNewsExercise } from '@/features/mechanics/module4/VerificadorFakeNews';

<VerificadorFakeNewsExercise />
```

---

### 2. Email Formal (NEW)
**Location**: `/module4/EmailFormal/`

**Description**: Formal email composer with tone analysis and templates for academic/professional communication.

**Features**:
- Email composition interface (To, Subject, Body)
- Pre-built templates (information request, formal thanks, academic invitation)
- Real-time tone analysis (formality, clarity, professionalism)
- Suggestion system for improvements
- Marie Curie themed contexts

**Tone Analysis Metrics**:
- **Formality**: Detection of formal words (estimado, cordialmente, atentamente)
- **Clarity**: Content length and structure validation
- **Professionalism**: Greeting and closing validation

**Templates**:
1. Information request about Marie Curie
2. Formal thanks for scientific conference
3. Academic invitation to women in science event

**Usage**:
```typescript
import { EmailFormalExercise } from '@/features/mechanics/module4/EmailFormal';

<EmailFormalExercise />
```

---

### 3. Chat Literario (NEW)
**Location**: `/module4/ChatLiterario/`

**Description**: Literary chat room simulation where students converse with AI representations of Marie and Pierre Curie.

**Features**:
- Real-time chat interface
- Character switching (Marie Curie / Pierre Curie)
- Contextual AI responses about scientific discoveries
- Message history with timestamps
- Character avatars and color coding

**AI Responses**:
- Marie: Discusses radioactivity, perseverance, women in science, Nobel Prizes
- Pierre: Talks about collaboration, research methodology, invisible rays

**Usage**:
```typescript
import { ChatLiterarioExercise } from '@/features/mechanics/module4/ChatLiterario';

<ChatLiterarioExercise />
```

---

### 4. Ensayo Argumentativo (NEW)
**Location**: `/module4/EnsayoArgumentativo/`

**Description**: Structured essay writer with guidance for argumentative essays about Marie Curie and scientific topics.

**Features**:
- 5-section essay structure (Introduction, 3 Arguments, Conclusion)
- Word count tracking per section
- Progress visualization
- Topic selection (4 Marie Curie themes)
- Thesis statement builder
- Real-time suggestions
- Color-coded sections

**Essay Structure**:
1. **Introduction** (min 100 words) - Context and thesis
2. **Argument 1** (min 80 words) - First supporting argument
3. **Argument 2** (min 80 words) - Second supporting argument
4. **Argument 3** (min 80 words) - Third supporting argument
5. **Conclusion** (min 100 words) - Summary and reinforcement

**Topics**:
- Marie Curie's legacy in modern science
- Women in science: barriers and achievements
- Importance of basic scientific research
- Ethics in scientific experimentation

**Usage**:
```typescript
import { EnsayoArgumentativoExercise } from '@/features/mechanics/module4/EnsayoArgumentativo';

<EnsayoArgumentativoExercise />
```

---

### 5. Reseña Crítica (NEW)
**Location**: `/module4/ResenaCritica/`

**Description**: Critical review writer with criteria checklist and rating system for works about Marie Curie.

**Features**:
- Star rating system (1-5 stars)
- Work selection (4 Marie Curie biographies/books)
- Structured review sections (Summary, Critical Analysis, Recommendation)
- Criteria checklist (5 evaluation dimensions)
- Automatic scoring (0-100)
- Character count tracking

**Evaluation Criteria**:
1. Historical accuracy
2. Writing clarity
3. Analysis depth
4. Topic relevance
5. Source usage

**Works Available**:
- "Marie Curie: A Life" by Susan Quinn
- "Radioactive: Marie & Pierre Curie" by Lauren Redniss
- "Madame Curie: A Biography" by Ève Curie
- "Marie Curie and Her Daughters" by Shelley Emling

**Scoring Formula**:
- Criteria checklist: 6 points each (max 30)
- Summary length: up to 20 points
- Analysis length: up to 30 points
- Recommendation length: up to 20 points

**Usage**:
```typescript
import { ResenaCriticaExercise } from '@/features/mechanics/module4/ResenaCritica';

<ResenaCriticaExercise />
```

---

## Technical Stack

- **React 19.2.0** with TypeScript 5.9.3
- **Tailwind CSS 4.1.14** with Detective Theme
- **Zod 4.1.12** for validation
- **Lucide React** for icons
- **React Hook Form 7.65.0** (optional for forms)

## Shared Components

All mechanics use the Detective Theme color scheme and components:
- Detective orange (`#f97316`) for primary actions
- Detective blue (`#1e3a8a`) for secondary elements
- Detective gold (`#f59e0b`) for highlights
- Rounded corners (`rounded-detective`)
- Card shadows (`shadow-card`)

## API Integration Points

All mechanics are **frontend-only** with mock data. Backend integration points prepared:

### Verificador Fake News
```typescript
// verificadorFakeNewsAPI.ts
export async function verifyClaimAPI(claim: Claim): Promise<FactCheckResult> {
  // Integration point for Google Fact Check API
  // or custom fact-checking service
}
```

### Email Formal
```typescript
// emailFormalAPI.ts
export async function analyzeToneAPI(content: string): Promise<ToneAnalysis> {
  // Integration point for NLP tone analysis (OpenAI, Google NLP)
}
```

### Chat Literario
```typescript
// chatLiterarioAPI.ts
export async function getChatResponse(message: string, character: string): Promise<string> {
  // Integration point for GPT-4 or custom chat AI
}
```

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- High contrast text
- Focus indicators
- Semantic HTML

## Mobile Responsive

All mechanics are fully responsive:
- Mobile: Single column layout
- Tablet: Flexible grid
- Desktop: Multi-column with sidebars

## Future Enhancements

1. **Verificador Fake News**:
   - Real Google Fact Check API integration
   - Custom fact database for Marie Curie
   - Browser extension for live fact-checking

2. **Email Formal**:
   - AI-powered tone improvement suggestions
   - Email sending simulation
   - Template customization

3. **Chat Literario**:
   - Voice chat integration
   - More historical characters
   - Conversation history export

4. **Ensayo Argumentativo**:
   - AI essay feedback
   - Plagiarism checking
   - Citation manager

5. **Reseña Crítica**:
   - Peer review system
   - Publication to class feed
   - Compare reviews feature

## Testing

Run type checking:
```bash
npm run type-check
```

All mechanics are type-safe with zero TypeScript errors.

## Support

For issues or questions, refer to the main GLIT Platform documentation.
