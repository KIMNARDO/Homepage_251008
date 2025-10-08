# Body Section Design Document

## 1. Body Section Types

### Section 1: Product/Service Showcase
- **목적**: 제품이나 서비스를 시각적으로 강조
- **구성요소**:
  - Title (제목)
  - Subtitle (부제목)
  - Description (설명)
  - Media (이미지/동영상)
  - CTA Button (행동 유도 버튼)
  - Features List (특징 목록)

### Section 2: Features/Benefits Grid
- **목적**: 핵심 기능이나 이점을 그리드 형태로 표시
- **구성요소**:
  - Section Title
  - Grid Items (각각):
    - Icon/Image
    - Title
    - Description
  - Layout: 2x2, 3x3, 4x2 등 선택 가능

### Section 3: Content Block (Rich Content)
- **목적**: 자유로운 형태의 콘텐츠 블록
- **구성요소**:
  - Rich Text Editor
  - Multiple Media (이미지/동영상 여러 개)
  - Code Blocks (선택사항)
  - Blockquotes (인용구)
  - Lists (목록)

## 2. Data Model Schema

```typescript
interface BodySection {
  id: string;
  type: 'showcase' | 'features' | 'content' | 'testimonial' | 'stats' | 'cta';
  order: number;
  isPublished: boolean;

  // Common Fields
  title: string;
  subtitle?: string;

  // Type-specific data
  data: ShowcaseData | FeaturesData | ContentData | TestimonialData | StatsData | CTAData;

  // AI Generation Metadata
  aiGenerated?: {
    provider: 'openai' | 'claude' | 'gemini';
    timestamp: string;
    prompt: string;
    model: string;
  };

  // Media
  media: Media[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

interface Media {
  id: string;
  type: 'image' | 'video' | 'gif';
  url: string;
  thumbnail?: string;
  alt?: string;
  caption?: string;

  // AI Generated Media
  aiGenerated?: {
    provider: 'openai-dalle' | 'stability-ai' | 'gemini-imagen';
    prompt: string;
    timestamp: string;
  };

  // Upload metadata
  size: number;
  mimeType: string;
  dimensions?: { width: number; height: number; };
}

interface ShowcaseData {
  description: string;
  features: string[];
  ctaText?: string;
  ctaLink?: string;
  layout: 'left-media' | 'right-media' | 'center';
}

interface FeaturesData {
  items: {
    id: string;
    title: string;
    description: string;
    icon?: string;
    image?: Media;
  }[];
  columns: 2 | 3 | 4;
}

interface ContentData {
  richContent: string; // HTML
  media: Media[];
  codeBlocks?: { language: string; code: string; }[];
}
```

## 3. AI Integration Design

### 3.1 Text Generation (OpenAI, Claude, Gemini)

**API Configuration**:
```typescript
interface AIConfig {
  provider: 'openai' | 'claude' | 'gemini';
  apiKey: string;
  model?: string; // gpt-4, claude-3-opus, gemini-pro
}
```

**Text Generation Workflow**:
1. User selects AI provider (OpenAI/Claude/Gemini)
2. User inputs prompt or content brief
3. System calls selected AI API
4. Generated content appears in editor (editable)
5. User can regenerate or manually edit

**Supported Features**:
- Title/Subtitle generation
- Description generation
- Feature list generation
- Full section content generation
- Tone/Style selection (professional, casual, technical)

### 3.2 Image Generation (DALL-E, Stable Diffusion)

**Image Generation Workflow**:
1. User enters image description/prompt
2. Selects AI provider (OpenAI DALL-E / Stability AI)
3. Selects size (1024x1024, 1792x1024, etc.)
4. Selects style (photorealistic, illustration, 3D render)
5. System generates image
6. Image automatically uploaded to media library
7. User can use directly or edit prompt and regenerate

**Supported Providers**:
- **OpenAI DALL-E 3**: High quality, creative images
- **Stability AI (SDXL)**: Artistic, customizable
- **Gemini Imagen**: Google's image generation

### 3.3 Video Support
- **Direct Upload**: MP4, WebM, MOV (max 100MB)
- **Thumbnail Auto-generation**: First frame or custom
- **Optimization**: Automatic compression and format conversion

## 4. Backend API Endpoints

### Section Management
```
POST   /api/admin/sections              - Create new section
GET    /api/admin/sections              - Get all sections
GET    /api/admin/sections/:id          - Get section by ID
PUT    /api/admin/sections/:id          - Update section
DELETE /api/admin/sections/:id          - Delete section
PATCH  /api/admin/sections/:id/publish  - Toggle publish status
POST   /api/admin/sections/reorder      - Reorder sections
```

### AI Integration
```
POST   /api/admin/ai/text-generate      - Generate text content
POST   /api/admin/ai/image-generate     - Generate image
POST   /api/admin/ai/config             - Save AI API keys
GET    /api/admin/ai/config             - Get AI configuration
```

### Media Management
```
POST   /api/admin/media/upload          - Upload media file
DELETE /api/admin/media/:id             - Delete media
POST   /api/admin/media/optimize        - Optimize image/video
```

### Public Endpoints
```
GET    /api/public/sections             - Get published sections (homepage)
```

## 5. Frontend Components

### Admin Panel Components
1. **SectionManager.tsx** - Main section management interface
2. **SectionEditor.tsx** - Individual section editor
3. **AIContentGenerator.tsx** - AI text generation UI
4. **AIImageGenerator.tsx** - AI image generation UI
5. **MediaUploader.tsx** - Drag & drop media upload
6. **RichTextEditor.tsx** - Rich content editor (TinyMCE/Quill)

### Homepage Components
1. **BodySectionRenderer.tsx** - Renders sections based on type
2. **ShowcaseSection.tsx** - Section Type 1
3. **FeaturesSection.tsx** - Section Type 2
4. **ContentSection.tsx** - Section Type 3
5. **MediaViewer.tsx** - Image/Video viewer with optimization

## 6. Real-time Sync Architecture

### WebSocket Integration (Optional)
- Real-time updates when admin edits content
- Instant preview on homepage without refresh

### Event-Driven Updates (Current)
- CustomEvent 'sectionsUpdated' fired on save
- Homepage listens and re-fetches sections
- Smooth transition animations

## 7. Security & Performance

### Security
- API key encryption at rest
- Rate limiting on AI API calls
- Media file validation (type, size, content)
- CORS configuration
- Admin-only access to sensitive endpoints

### Performance
- Lazy loading for images/videos
- CDN integration for media files
- Image optimization (WebP conversion)
- Caching strategy (Redis/memory)
- Pagination for large section lists

## 8. Implementation Phases

### Phase 1: Core Infrastructure (Current)
- [x] Basic section CRUD
- [x] Data model design
- [ ] Backend API implementation

### Phase 2: Media Management
- [ ] File upload system
- [ ] Image optimization
- [ ] Video processing
- [ ] Thumbnail generation

### Phase 3: AI Integration
- [ ] OpenAI text generation
- [ ] Claude text generation
- [ ] Gemini text generation
- [ ] DALL-E image generation
- [ ] Stable Diffusion integration

### Phase 4: Advanced Features
- [ ] Rich text editor
- [ ] Drag & drop section reordering
- [ ] Preview mode
- [ ] Version history
- [ ] A/B testing support

## 9. Environment Variables

```env
# AI API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=AI...

# Media Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=104857600  # 100MB
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/gif,image/webp
ALLOWED_VIDEO_TYPES=video/mp4,video/webm,video/quicktime

# Optional: Cloud Storage
AWS_S3_BUCKET=
AWS_S3_REGION=
CLOUDFLARE_R2_BUCKET=
```

## 10. User Workflow Example

### Creating a New Body Section with AI:

1. **Admin navigates to Body Sections Manager**
2. **Clicks "Create New Section"**
3. **Selects Section Type**: "Product Showcase"
4. **Uses AI to generate content**:
   - Clicks "Generate with AI"
   - Selects provider: "Claude"
   - Enters prompt: "Write about our PLM solution benefits for manufacturing companies"
   - Reviews generated content, makes edits
5. **Adds media**:
   - Option 1: Uploads company image directly
   - Option 2: Uses AI image generation:
     - Prompt: "Modern manufacturing facility with digital screens showing PLM software"
     - Selects DALL-E 3
     - Generates and reviews
6. **Configures section settings**:
   - Sets display order
   - Toggles publish status
7. **Saves section**
8. **Homepage automatically updates** with new section

This design provides a comprehensive, AI-powered content management system for your homepage!
