# Module 5: Production Mechanics (3 Mechanics)

This module contains 3 **multimedia production mechanics** for **Módulo 5 - Producción Lectora**, enabling students to create rich multimedia content about Marie Curie.

## Overview

These mechanics transform students from consumers to creators, allowing them to produce multimedia journals, digital comics, and video letters about their learning journey with Marie Curie.

## Mechanics Implemented

### 1. Diario Multimedia (US-003-21)
**Location**: `/module5/DiarioMultimedia/`

**Description**: Rich multimedia diary where students document their learning with text, images, videos, and audio.

**Features**:
- WYSIWYG-style text editor with basic formatting (bold, italic, headings)
- Multi-format media upload (images, videos, audio)
- File uploader with drag & drop support
- Privacy settings (public/private entries)
- Entry management (create, view, delete)
- Live preview mode
- Entry statistics tracker

**Media Support**:
- **Images**: JPG, PNG, GIF (max 50MB)
- **Videos**: MP4, WEBM (max 50MB)
- **Audio**: MP3, WAV, OGG (max 50MB)

**Entry Structure**:
```typescript
interface DiaryEntry {
  id: string;
  date: Date;
  title: string;
  content: string; // Markdown-style formatting
  media: UploadedFile[];
  isPrivate: boolean;
}
```

**Formatting Commands**:
- `**text**` - Bold
- `*text*` - Italic
- `# text` - Heading

**Usage**:
```typescript
import { DiarioMultimediaExercise } from '@/features/mechanics/module5/DiarioMultimedia';

<DiarioMultimediaExercise />
```

**Statistics Tracked**:
- Total entries
- Entries with multimedia
- Private entries count

---

### 2. Cómic Digital (US-003-22)
**Location**: `/module5/ComicDigital/`

**Description**: Digital comic strip creator with panel layouts, speech bubbles, and character elements for visual storytelling about Marie Curie.

**Features**:
- Multiple panel layouts (full, half, third)
- Speech bubble types (speech, thought, caption)
- Background themes (laboratory, university, ceremony, research)
- Panel sequencing
- Text overlays and descriptions
- Export functionality
- Panel selection and editing

**Panel Layouts**:
1. **Full Panel**: Single full-width panel
2. **Half Panel**: 2 panels side by side
3. **Third Panel**: 3 panels in a row

**Speech Bubble Types**:
- **Speech** (💬): Standard dialogue
- **Thought** (💭): Internal monologue
- **Caption** (📝): Narration box

**Background Themes**:
1. Laboratory (gray) - Science workspace
2. University (blue) - Academic setting
3. Ceremony (yellow) - Awards and recognition
4. Research (purple) - Investigation scenes

**Usage**:
```typescript
import { ComicDigitalExercise } from '@/features/mechanics/module5/ComicDigital';

<ComicDigitalExercise />
```

**Export Options**:
- PNG image
- PDF document
- Shareable link

---

### 3. Video Carta (US-003-23)
**Location**: `/module5/VideoCarta/`

**Description**: Video recording tool with filters for students to create video messages about their Marie Curie learning journey.

**Features**:
- Real-time video recording using browser MediaRecorder API
- Live camera preview with filters
- Video filters (sepia, grayscale, vintage)
- Recording controls (start, stop, pause)
- Video playback with custom player
- Download recorded video
- Re-record functionality
- Recording tips and guidelines

**Video Filters**:
1. **None**: Original camera feed
2. **Sepia (Antiguo)**: Old photograph effect
3. **Blanco y Negro**: Black and white
4. **Vintage**: High contrast with brightness boost

**Browser Permissions**:
- Camera access required
- Microphone access required
- Graceful permission denial handling
- Clear permission request prompts

**Recording Guidelines**:
- Present your topic at the start
- Speak clearly and with enthusiasm
- Mention 3 facts about Marie Curie
- Conclude with personal reflection
- Recommended duration: 1-3 minutes

**Usage**:
```typescript
import { VideoCartaExercise } from '@/features/mechanics/module5/VideoCarta';

<VideoCartaExercise />
```

**Output Format**:
- WebM video format
- Configurable quality
- Browser-native compression

---

## Shared Media Components

All Module 5 mechanics utilize shared media components from `/src/shared/components/media/`:

### FileUploader
```typescript
<FileUploader
  acceptedTypes={['image/*', 'video/*', 'audio/*']}
  maxSizeMB={50}
  onUpload={handleUpload}
  multiple
/>
```

### VideoPlayer
```typescript
<VideoPlayer
  src={videoUrl}
  controls
  onTimeUpdate={(current, duration) => {}}
  onEnded={() => {}}
/>
```

### AudioRecorder
```typescript
<AudioRecorder
  onRecordingComplete={(blob, url) => {}}
  maxDurationSeconds={300}
/>
```

### ExportButton
```typescript
<ExportButton
  onExport={(format) => {}}
  availableFormats={['png', 'jpg', 'pdf']}
/>
```

## Media Handling Approach

### File Upload
- **Client-side validation**: Size limits, file type checking
- **Preview generation**: URL.createObjectURL() for instant preview
- **Mock backend**: No actual server upload in demo
- **Prepared API endpoints**: Ready for backend integration

### File Size Limits
- Images: 10MB recommended, 50MB maximum
- Videos: 50MB maximum
- Audio: 10MB recommended, 50MB maximum

### Supported Formats

**Images**:
- JPG/JPEG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- GIF (`.gif`)
- WebP (`.webp`)

**Videos**:
- MP4 (`.mp4`)
- WebM (`.webm`)
- OGG (`.ogg`)

**Audio**:
- MP3 (`.mp3`)
- WAV (`.wav`)
- OGG (`.ogg`)
- WebM Audio (`.webm`)

## Export Functionality

### Export Formats Available
1. **PNG Image**: For comics, collages, screenshots
2. **JPG Image**: Compressed image export
3. **PDF Document**: Print-ready documents
4. **JSON Data**: Structured data export
5. **HTML File**: Web-ready content

### Export Implementation

**Client-Side Export** (Current):
```typescript
// Using html2canvas or dom-to-image
const canvas = await html2canvas(element);
const dataUrl = canvas.toDataURL('image/png');
downloadFile(dataUrl, 'export.png');
```

**Server-Side Export** (Future):
```typescript
// API endpoint for processing
POST /api/export
{
  type: 'comic',
  format: 'pdf',
  content: {...}
}
```

## API Integration Points

All mechanics are **frontend-only** with mock processing. Backend integration points:

### Diario Multimedia
```typescript
// diarioMultimediaAPI.ts
export async function uploadMedia(file: File): Promise<string> {
  // S3 or cloud storage upload
  // Returns: Public URL of uploaded file
}

export async function saveDiaryEntry(entry: DiaryEntry): Promise<void> {
  // POST to /api/diary/entries
}
```

### Cómic Digital
```typescript
// comicDigitalAPI.ts
export async function exportComic(
  panels: ComicPanel[],
  format: 'png' | 'pdf'
): Promise<Blob> {
  // Server-side rendering with Puppeteer or similar
}
```

### Video Carta
```typescript
// videoCartaAPI.ts
export async function uploadVideo(blob: Blob): Promise<string> {
  // Video processing and upload
  // Optional: Transcoding to multiple formats
  // Returns: Video URL
}
```

## Browser Permissions

### Camera Access (Video Carta)
```typescript
try {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });
  // Handle stream
} catch (err) {
  // Show permission denied error
  // Provide instructions for enabling
}
```

### Microphone Access (Diario Multimedia, Video Carta)
- Clear permission request message
- Fallback UI if denied
- Instructions for browser settings

### File System Access
- No special permissions required
- Standard file input/upload

## Performance Optimization

### File Upload
- Client-side compression before upload (future)
- Progress indicators for large files
- Chunked upload for videos (future)

### Video Recording
- Maximum recording duration: 5 minutes
- Auto-stop when limit reached
- Memory cleanup after recording

### Image Handling
- Lazy loading for entry thumbnails
- Responsive image sizing
- Object URL cleanup to prevent memory leaks

## Browser Compatibility

### Full Support:
- ✅ Chrome 90+ (MediaRecorder, FileReader)
- ✅ Firefox 88+ (MediaRecorder, FileReader)
- ✅ Safari 14+ (Limited MediaRecorder)
- ✅ Edge 90+ (Full support)

### Limited Support:
- ⚠️ Safari < 14: No MediaRecorder API
- ⚠️ iOS Safari: Video recording limitations

### Fallbacks:
- Video recording: Show "not supported" message on incompatible browsers
- File upload: Works on all modern browsers

## Mobile Responsive Design

All mechanics adapt to mobile screens:

**Diario Multimedia**:
- Single column layout on mobile
- Touch-optimized file upload
- Simplified editor toolbar

**Cómic Digital**:
- Vertical tool panel on mobile
- Touch gestures for element positioning
- Simplified bubble controls

**Video Carta**:
- Full-screen camera on mobile
- Large touch-friendly buttons
- Simplified filter selection

## Accessibility

- Keyboard navigation for all controls
- Screen reader labels for media elements
- High contrast mode support
- Focus indicators on interactive elements
- Alternative text for images

## Testing

### Type Checking
```bash
npm run type-check
```

### Manual Testing Checklist
- [ ] File upload with various formats
- [ ] Media preview generation
- [ ] Recording permissions (allow/deny)
- [ ] Export functionality
- [ ] Mobile responsive layout
- [ ] Browser compatibility

## Future Enhancements

### Diario Multimedia
- Collaborative editing
- Rich text editor upgrade (TipTap or Draft.js)
- Cloud auto-save
- Entry search and filtering
- Tag system

### Cómic Digital
- Character library with pre-made sprites
- Panel templates
- Background image library
- Collaborative comic creation
- Animation preview

### Video Carta
- Real-time effects and stickers
- Green screen support
- Multi-camera angles
- Live streaming integration
- Video editing tools (trim, cut, merge)

## Production Considerations

### Backend Requirements
1. **File Storage**: S3-compatible object storage
2. **Video Processing**: FFmpeg for transcoding
3. **Image Processing**: Sharp or ImageMagick
4. **CDN**: CloudFlare or AWS CloudFront
5. **Database**: PostgreSQL for metadata

### Estimated Costs (Monthly)
- Storage (100GB): ~$2-5
- Bandwidth (500GB): ~$10-20
- Processing (100hrs): ~$15-30
- **Total**: $30-60/month for 1000 active users

## Support

For issues or questions, refer to the main GLIT Platform documentation or contact the development team.
