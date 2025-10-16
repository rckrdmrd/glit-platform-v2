# Auxiliary Mechanics (4 Mechanics)

This module contains 4 **auxiliary educational mechanics** that support and enhance the main learning modules with specialized multimedia and interactive experiences.

## Overview

These auxiliary mechanics provide additional ways for students to engage with Marie Curie content through audio comprehension, visual collages, animated text, and social action campaigns.

## Mechanics Implemented

### 1. Comprensión Auditiva (US-003-24)
**Location**: `/auxiliar/ComprensiónAuditiva/`

**Description**: Audio-based comprehension exercise with synchronized questions that unlock as the audio plays.

**Features**:
- Custom audio player with playback controls
- Time-synchronized questions (unlock at specific timestamps)
- Multiple-choice question format
- Progress tracking by audio timestamp
- Immediate answer selection
- Results view with correct/incorrect feedback
- Score calculation
- Visual locking indicators for unreached questions

**Question Structure**:
```typescript
interface Question {
  id: string;
  time: number; // Unlock time in seconds
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
}
```

**Sample Questions**:
1. Where was Marie Curie born? (Unlocks at 10s)
2. What element did Marie Curie discover? (Unlocks at 30s)
3. How many Nobel Prizes did she win? (Unlocks at 50s)

**Usage**:
```typescript
import { ComprensiónAuditivaExercise } from '@/features/mechanics/auxiliar/ComprensiónAuditiva';

<ComprensiónAuditivaExercise />
```

**Scoring**:
- Formula: (Correct Answers / Total Questions) × 100
- Visual results display
- Breakdown of correct vs incorrect

**Audio Format Support**:
- MP3, WAV, OGG
- Future: Podcast-style episodes about Marie Curie
- Narrations, interviews, documentary audio

---

### 2. Collage Prensa (US-003-25)
**Location**: `/auxiliar/CollagePrensa/`

**Description**: Newspaper-style collage builder for creating visual compositions about Marie Curie's achievements.

**Features**:
- Canvas-based collage editor (vintage newspaper theme)
- Element types: Headlines, text blocks, images
- Drag-and-drop positioning
- Newspaper header ("LE JOURNAL SCIENTIFIQUE - Paris, 1903")
- Image upload with preview
- Element selection and editing
- Historical newspaper aesthetic
- Export functionality (PNG, JPG, PDF)

**Element Types**:

**Headlines**:
- Large bold text
- Newspaper-style formatting
- Default: "MARIE CURIE GANA PREMIO NOBEL"

**Text Blocks**:
- Body text for articles
- Bordered containers
- Editable content

**Images**:
- Upload photos, diagrams, illustrations
- Border styling
- Positioning and sizing

**Layout**:
```
┌─────────────────────────────────────┐
│   LE JOURNAL SCIENTIFIQUE           │
│         Paris, 1903                 │
├─────────────────────────────────────┤
│                                     │
│  [Draggable Elements]               │
│  - Headlines                        │
│  - Text blocks                      │
│  - Images                           │
│                                     │
└─────────────────────────────────────┘
```

**Usage**:
```typescript
import { CollagePrensaExercise } from '@/features/mechanics/auxiliar/CollagePrensa';

<CollagePrensaExercise />
```

**Export Options**:
- PNG (high resolution)
- JPG (compressed)
- PDF (print-ready)

**Historical Context**:
- Vintage newspaper aesthetic
- Period-appropriate typography
- 1900s press style

---

### 3. Texto en Movimiento (US-003-26)
**Location**: `/auxiliar/TextoEnMovimiento/`

**Description**: Animated text creator using Framer Motion for dynamic text animations about Marie Curie.

**Features**:
- 8 pre-built animation types
- Customizable duration (0.5s - 5s)
- Font size control (16px - 96px)
- Color palette selection (6 colors)
- Sequence builder (multiple text elements)
- Play/pause animation preview
- Dark canvas for visibility
- Animation timeline visualization

**Animation Types**:
1. **Aparecer (Fade In)**: Opacity 0 → 1
2. **Deslizar Arriba**: Slide from bottom
3. **Deslizar Abajo**: Slide from top
4. **Deslizar Izquierda**: Slide from left
5. **Deslizar Derecha**: Slide from right
6. **Escalar**: Scale from 0 to 1
7. **Rotar**: Rotate from -180° to 0°
8. **Rebotar**: Spring-based bounce effect

**Animation Configuration**:
```typescript
interface AnimatedText {
  id: string;
  text: string;
  animation: string; // Animation type ID
  duration: number; // Animation duration in seconds
  color: string; // Hex color code
  fontSize: number; // Font size in pixels
}
```

**Color Palette**:
- Detective Orange (`#f97316`)
- Detective Blue (`#1e3a8a`)
- Detective Gold (`#f59e0b`)
- Green (`#10b981`)
- Red (`#ef4444`)
- Purple (`#8b5cf6`)

**Usage**:
```typescript
import { TextoEnMovimientoExercise } from '@/features/mechanics/auxiliar/TextoEnMovimiento';

<TextoEnMovimientoExercise />
```

**Playback**:
- Sequential animation (text 1 → text 2 → text 3)
- Configurable delays between texts
- Infinite loop mode
- Manual play/pause control

**Use Cases**:
- Opening titles for presentations
- Key concept highlights
- Quote animations
- Timeline events

---

### 4. Call to Action (US-003-27)
**Location**: `/auxiliar/CallToAction/`

**Description**: Social action campaign builder for creating petitions and awareness campaigns inspired by Marie Curie's legacy.

**Features**:
- Campaign creation form (title, cause, description)
- Pre-defined causes (5 options related to women in STEM)
- Petition goal setting (50-1000 signatures)
- Tag system (9 available tags)
- Signature collection mechanism
- Progress bars for signature goals
- Social sharing buttons (mock)
- Campaign listing with active campaigns
- Impact statistics dashboard

**Campaign Structure**:
```typescript
interface Campaign {
  id: string;
  title: string;
  cause: string;
  description: string;
  goal: number; // Signature goal
  signatures: number; // Current signatures
  tags: string[]; // Hashtags
}
```

**Pre-defined Causes**:
1. Más mujeres en STEM
2. Becas científicas para mujeres
3. Reconocimiento a científicas
4. Educación científica inclusiva
5. Igualdad en investigación

**Available Tags**:
- Ciencia
- Educación
- Igualdad
- Marie Curie
- Mujeres
- Investigación
- Nobel
- Física
- Química

**Usage**:
```typescript
import { CallToActionExercise } from '@/features/mechanics/auxiliar/CallToAction';

<CallToActionExercise />
```

**Impact Metrics**:
- Total campaigns created
- Total signatures collected
- Completed campaigns (reached goal)
- Campaign success rate

**Campaign Actions**:
1. **Sign**: Add signature to petition
2. **Share**: Mock social media sharing
3. **View**: See campaign details

**Campaign Guidelines**:
- Be specific in proposals
- Explain why it matters
- Connect with Marie Curie's legacy
- Propose concrete actions
- Inspire others to act

---

## Technical Implementation

### Stack Used
- **React 19.2.0** with TypeScript
- **Framer Motion 12.23.24** (for Texto en Movimiento)
- **Tailwind CSS 4.1.14** (Detective Theme)
- **Lucide React** for icons

### Shared Components
All mechanics leverage shared media components:
- `FileUploader` (for Collage Prensa)
- `ExportButton` (for collage export)

### State Management
- React `useState` for local state
- No global state needed (self-contained)

## Media Handling

### Audio Files (Comprensión Auditiva)
**Current**: Mock audio with data URL
**Production**:
- MP3 format recommended
- Hosted on CDN
- Transcripts for accessibility
- Multiple audio tracks per topic

**Integration Point**:
```typescript
// comprensiónAuditivaAPI.ts
export async function getAudioExercise(topic: string): Promise<AudioExercise> {
  // Fetch audio URL and questions from backend
  return {
    audioUrl: 'https://cdn.example.com/marie-curie-bio.mp3',
    questions: [...]
  };
}
```

### Images (Collage Prensa)
**Current**: Client-side upload with object URLs
**Production**:
- Cloud storage (S3)
- Image optimization pipeline
- Thumbnail generation
- CDN delivery

### Animations (Texto en Movimiento)
**Current**: Client-side Framer Motion rendering
**Production**:
- Export to video format (MP4)
- Server-side rendering for export
- Animation templates library

## Export Functionality

### Collage Prensa Export
**Client-Side**:
```typescript
// Using html2canvas
const canvas = await html2canvas(collageElement);
const imageUrl = canvas.toDataURL('image/png');
```

**Server-Side** (Future):
```typescript
// POST /api/export/collage
{
  elements: CompositeElement[],
  format: 'png' | 'jpg' | 'pdf'
}
```

### Texto en Movimiento Export
**Future Enhancement**:
- Export to MP4 video
- GIF animation export
- Embed code for websites

## Browser Compatibility

### Comprensión Auditiva
- ✅ All modern browsers (HTML5 audio)
- ✅ Mobile: iOS Safari, Android Chrome

### Collage Prensa
- ✅ Chrome, Firefox, Safari, Edge
- ⚠️ Canvas positioning may vary slightly

### Texto en Movimiento
- ✅ Framer Motion supported browsers
- ✅ Hardware-accelerated animations
- ⚠️ Performance depends on device GPU

### Call to Action
- ✅ Universal compatibility
- ✅ Fully responsive

## Accessibility

### Comprensión Auditiva
- Audio transcripts (future)
- Closed captions
- Keyboard controls for audio player
- Screen reader support for questions

### Collage Prensa
- Alt text for images (future)
- Keyboard navigation for element selection
- High contrast mode

### Texto en Movimiento
- Reduced motion option (future)
- Pause controls
- Text size controls

### Call to Action
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators

## Mobile Responsive

All mechanics are fully responsive:

**Comprensión Auditiva**:
- Vertical question stacking
- Touch-friendly buttons
- Mobile audio controls

**Collage Prensa**:
- Single column toolbox
- Touch gestures for element positioning
- Simplified interface

**Texto en Movimiento**:
- Vertical settings panel
- Touch-optimized controls
- Mobile-friendly canvas

**Call to Action**:
- Card-based campaign layout
- Touch-friendly form inputs
- Mobile-optimized sharing

## Performance Optimization

### Comprensión Auditiva
- Audio preloading
- Lazy question rendering
- Efficient time tracking

### Collage Prensa
- Element caching
- Optimized re-renders
- Efficient positioning calculations

### Texto en Movimiento
- Hardware-accelerated CSS transforms
- Framer Motion optimization
- Minimal re-renders

### Call to Action
- Efficient list rendering
- Optimistic UI updates
- Debounced form inputs

## API Integration Points

### Comprensión Auditiva
```typescript
// API endpoints
GET /api/audio-exercises/:id
POST /api/audio-exercises/:id/submit
```

### Collage Prensa
```typescript
// API endpoints
POST /api/collages/create
GET /api/collages/:id
POST /api/collages/:id/export
```

### Texto en Movimiento
```typescript
// API endpoints
POST /api/animations/create
GET /api/animations/:id
POST /api/animations/:id/export
```

### Call to Action
```typescript
// API endpoints
POST /api/campaigns/create
GET /api/campaigns
POST /api/campaigns/:id/sign
POST /api/campaigns/:id/share
```

## Future Enhancements

### Comprensión Auditiva
- Podcast-style series about scientists
- Interactive transcripts with word highlighting
- Speech-to-text for student responses
- Multilingual audio tracks

### Collage Prensa
- Pre-made template library
- Collaborative collage creation
- Historical newspaper archives integration
- Print ordering service

### Texto en Movimiento
- Video export (MP4, GIF)
- Sound effects integration
- Advanced easing functions
- Text effects (outline, shadow, gradient)

### Call to Action
- Real petition signing with verified emails
- Social media API integration (Twitter, Facebook)
- Campaign analytics dashboard
- Email notification system
- Achievement badges for advocacy

## Testing

### Type Checking
```bash
npm run type-check
```

### Manual Testing
- [ ] Audio playback across browsers
- [ ] Question unlocking timing
- [ ] Collage element positioning
- [ ] Animation smoothness
- [ ] Campaign creation flow
- [ ] Mobile responsiveness

## Educational Value

### Comprensión Auditiva
**Skills**: Listening comprehension, note-taking, audio analysis

### Collage Prensa
**Skills**: Visual composition, information organization, creative expression

### Texto en Movimiento
**Skills**: Visual communication, timing, emphasis, storytelling

### Call to Action
**Skills**: Persuasive writing, social awareness, civic engagement, advocacy

## Support

For issues or questions, refer to the main GLIT Platform documentation.

---

**Note**: All auxiliary mechanics are production-ready with mock data and prepared for backend integration.
