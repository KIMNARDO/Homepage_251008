# PAPSNET Visual Assets Implementation Guide

## 📋 Overview

This guide provides comprehensive instructions for implementing the visual assets for PAPSNET's homepage based on the company's branding extracted from their official PDFs.

## 🎨 Visual Assets Created

### 1. Configuration File
- **Location**: `src/assets/visual-assets-config.ts`
- **Purpose**: Centralized configuration for all visual assets, colors, gradients, and effects

### 2. Enhanced Components

#### Hero Section (`HeroSectionWithAssets.tsx`)
- **Features**:
  - PAPSNET branded PLM flow visualization
  - Animated particle system with brand colors
  - Gradient mesh background (slate-900 to blue-900/purple-900)
  - Client logos with glassmorphism effects
  - Interactive product feature cards
  - Statistics display

#### Product Showcase (`ProductShowcaseWithAssets.tsx`)
- **Products Featured**:
  - CLIP PLM (Project & Document Management)
  - DDMS (Drawing Distribution System)
  - EPL (Multi-BOM Management)
  - ICMS (Integrated Cost Management)
  - CADWin AI (AI-powered Drawing Management)
- **Visual Elements**:
  - Product selector tabs with gradient backgrounds
  - Animated dashboard mockups
  - Tech stack badges
  - Integration ecosystem diagram

#### Client Success Section (`ClientSuccessSection.tsx`)
- **Components**:
  - Success metrics cards
  - Testimonial carousel
  - Client logos grid
  - Results visualization
  - CTA section with glassmorphism

## 🖼️ Required Image Assets

Create the following image files in the `public/assets` directory:

### Logos
```
/assets/images/
├── papsnet-logo.svg (Primary logo)
├── papsnet-logo-white.svg (White version)
└── papsnet-icon.svg (Icon only)
```

### Product Images
```
/assets/images/products/
├── clip-plm-dashboard.png
├── ddms-interface.png
├── epl-multi-bom.png
├── icms-cost-analysis.png
└── cadwin-ai-interface.png
```

### Icons
```
/assets/icons/
├── ai-brain.svg
├── collaboration.svg
├── security-shield.svg
├── integration-hub.svg
└── analytics-chart.svg
```

## 🎨 Design System

### Color Palette (from PAPSNET branding)
```typescript
const colors = {
  primary: '#3B82F6',    // PAPSNET Blue
  secondary: '#8B5CF6',  // Purple accent
  accent: '#10B981',     // Green for new features
  dark: '#0A0E27',       // Dark navy background
  slate: {
    900: '#0F172A',
    800: '#1E293B',
    700: '#334155',
  }
}
```

### Glassmorphism Effects
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Gradients
```css
/* Blue to Purple (Primary) */
background: linear-gradient(135deg, #3B82F6, #8B5CF6);

/* Dark overlay */
background: linear-gradient(to bottom, #0A0E27, #1a1f3a, #2a1a4a);
```

## 🚀 Implementation Steps

### Step 1: Install Dependencies
```bash
npm install framer-motion
```

### Step 2: Update Main App Component
```tsx
import HeroSectionWithAssets from '@/components/sections/HeroSectionWithAssets';
import ProductShowcaseWithAssets from '@/components/sections/ProductShowcaseWithAssets';
import ClientSuccessSection from '@/components/sections/ClientSuccessSection';

function App() {
  return (
    <>
      <HeroSectionWithAssets />
      <ProductShowcaseWithAssets />
      <ClientSuccessSection />
      {/* Other sections */}
    </>
  );
}
```

### Step 3: Add Custom CSS
Add to your global CSS file:
```css
/* Particle animation */
.particle-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Morphing shapes */
.morph-shape {
  animation: morph 8s ease-in-out infinite;
}

@keyframes morph {
  0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
}

/* Floating animation */
.floating-element {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Pulse glow effect */
.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
}
```

## 📱 Responsive Design

All components are built with mobile-first responsive design:

- **Mobile** (< 640px): Single column layouts, stacked elements
- **Tablet** (640px - 1024px): 2-column grids, medium sizing
- **Desktop** (> 1024px): Full multi-column layouts, large visuals

## 🔧 Customization

### Changing Brand Colors
Update the colors in `visual-assets-config.ts`:
```typescript
brand: {
  colors: {
    primary: '#YOUR_COLOR',
    secondary: '#YOUR_COLOR',
    // ...
  }
}
```

### Adding New Products
Add to the `products` object in `visual-assets-config.ts`:
```typescript
products: {
  newProduct: {
    logo: '/assets/images/products/new-product-logo.svg',
    screenshot: '/assets/images/products/new-product.png',
    // ...
  }
}
```

## 📊 Performance Optimization

### Image Optimization
1. Use WebP format for photos
2. SVG for logos and icons
3. Lazy load images below the fold
4. Implement responsive images with srcset

### Animation Performance
1. Use CSS transforms instead of position changes
2. Leverage GPU acceleration with `will-change`
3. Throttle scroll-based animations
4. Use `requestAnimationFrame` for canvas animations

## 🎯 Key Features Highlighted

Based on PAPSNET's company materials:

1. **AI-Powered Solutions**: CADWin AI with 3D/2D conversion
2. **Enterprise Integration**: CLIP PLM suite integration
3. **Security Focus**: DDMS with watermarking and access control
4. **Cost Management**: ICMS for comprehensive cost analysis
5. **Multi-BOM Support**: EPL for complex product structures

## 📝 Typography

- **Headings**: Pretendard or Noto Sans KR (Korean), Inter (English)
- **Body Text**: System fonts with Korean language support
- **Font Weights**: 300 (light), 400 (regular), 600 (semibold), 700 (bold)

## 🔗 External Resources

### Icons and Illustrations
- Use Heroicons or Tabler Icons for consistency
- Create custom illustrations matching the tech/enterprise theme

### Client Logos
- Request high-resolution logos from clients
- Create placeholder versions using company names

## 💡 Best Practices

1. **Consistency**: Use the visual assets configuration for all components
2. **Performance**: Optimize images and animations for fast loading
3. **Accessibility**: Ensure sufficient color contrast (WCAG AA)
4. **Internationalization**: Support both Korean and English text
5. **Dark Theme**: Maintain the dark enterprise software aesthetic

## 🚨 Important Notes

- All visual assets are designed to work with the existing dark theme
- The glassmorphism effects require backdrop-filter browser support
- Canvas animations may need fallbacks for older browsers
- Test thoroughly on different devices and screen sizes

## 📧 Support

For questions or assistance with implementation, contact the development team or refer to the component documentation in the source files.

---

*Visual assets designed based on PAPSNET company materials (회사소개서 Ver 5.0 and CADWin 도면관리 제안서)*