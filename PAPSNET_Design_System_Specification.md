# PAPSNET (주)팹스넷 Design System & UI/UX Implementation Specification
Version 1.0 | Date: 2025-01-21

## Executive Summary

This document provides a comprehensive design system and UI/UX implementation plan for PAPSNET Co., Ltd. (주식회사 팹스넷), based on modern web design principles and adapted from the Graphite website architecture. The system maintains enterprise-grade professionalism while incorporating modern, innovative design elements suitable for a technology company.

---

## 1. BRAND IDENTITY & DESIGN PHILOSOPHY

### 1.1 Company Information
- **Company Name (Korean)**: 주식회사 팹스넷
- **Company Name (English)**: PAPSNET Co., Ltd.
- **Industry**: Technology Solutions & Digital Transformation
- **Target Audience**: Enterprise clients, developers, IT professionals

### 1.2 Design Philosophy
- **Professional Excellence**: Conveying trust and reliability through clean, structured design
- **Innovation Forward**: Modern design elements showcasing technological advancement
- **User-Centric**: Intuitive navigation and clear information hierarchy
- **Global Ready**: Bilingual support (Korean/English) with cultural sensitivity

---

## 2. DESIGN SYSTEM FOUNDATION

### 2.1 Color Palette

```css
/* Primary Colors */
--papsnet-primary-900: #0A1628;      /* Deep Navy - Primary brand color */
--papsnet-primary-800: #162B4D;      /* Navy Blue */
--papsnet-primary-700: #1E3A5F;      /* Medium Navy */
--papsnet-primary-600: #2C4F7C;      /* Royal Blue */
--papsnet-primary-500: #3B66A0;      /* Primary Blue */
--papsnet-primary-400: #4C7CBF;      /* Light Blue */
--papsnet-primary-300: #6B93D6;      /* Sky Blue */
--papsnet-primary-200: #9FBFFF;      /* Pale Blue */
--papsnet-primary-100: #E8F2FF;      /* Ice Blue */

/* Accent Colors */
--papsnet-accent-electric: #00D4FF;  /* Electric Blue - CTAs, highlights */
--papsnet-accent-cyber: #00FFD1;     /* Cyber Mint - Success states */
--papsnet-accent-glow: #7B61FF;      /* Purple Glow - Innovation features */
--papsnet-accent-warm: #FF6B6B;      /* Warm Red - Alerts, important */

/* Neutral Colors */
--papsnet-gray-900: #0F0F10;         /* Near Black */
--papsnet-gray-800: #1A1A1D;         /* Dark Gray */
--papsnet-gray-700: #2E2E33;         /* Charcoal */
--papsnet-gray-600: #4A4A52;         /* Medium Gray */
--papsnet-gray-500: #6B6B76;         /* Gray */
--papsnet-gray-400: #9191A1;         /* Light Gray */
--papsnet-gray-300: #B8B8C8;         /* Pale Gray */
--papsnet-gray-200: #E1E1E8;         /* Light Silver */
--papsnet-gray-100: #F5F5F7;         /* Off White */
--papsnet-white: #FFFFFF;            /* Pure White */

/* Semantic Colors */
--papsnet-success: #00C896;          /* Success Green */
--papsnet-warning: #FFA500;          /* Warning Orange */
--papsnet-error: #FF4757;            /* Error Red */
--papsnet-info: #00A8E8;             /* Info Blue */

/* Background Gradients */
--papsnet-gradient-hero: linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #2C4F7C 100%);
--papsnet-gradient-card: linear-gradient(180deg, rgba(10, 22, 40, 0.8) 0%, rgba(30, 58, 95, 0.4) 100%);
--papsnet-gradient-glow: radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
```

### 2.2 Typography System

```css
/* Font Families */
--font-primary: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
--font-display: 'Montserrat', 'Pretendard', sans-serif;
--font-mono: 'JetBrains Mono', 'D2Coding', monospace;

/* Font Sizes - Desktop */
--text-hero-title: 72px;      /* Hero headlines */
--text-display-lg: 56px;      /* Section titles */
--text-display-md: 48px;      /* Feature titles */
--text-display-sm: 40px;      /* Subsection titles */
--text-headline-lg: 32px;     /* Large headlines */
--text-headline-md: 28px;     /* Medium headlines */
--text-headline-sm: 24px;     /* Small headlines */
--text-title-lg: 20px;        /* Large titles */
--text-title-md: 18px;        /* Medium titles */
--text-body-lg: 16px;         /* Large body text */
--text-body-md: 14px;         /* Regular body text */
--text-body-sm: 13px;         /* Small body text */
--text-caption: 12px;         /* Captions, labels */
--text-overline: 11px;        /* Overlines, badges */

/* Font Weights */
--font-thin: 100;
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;

/* Line Heights */
--line-height-tight: 1.1;
--line-height-snug: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;

/* Letter Spacing */
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;
```

### 2.3 Spacing System

```css
/* Base Unit: 8px */
--space-0: 0px;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-7: 28px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-14: 56px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
--space-40: 160px;
--space-48: 192px;
--space-56: 224px;
--space-64: 256px;

/* Container Padding */
--container-padding-mobile: 16px;
--container-padding-tablet: 24px;
--container-padding-desktop: 32px;
--container-padding-wide: 48px;

/* Section Spacing */
--section-spacing-mobile: 48px;
--section-spacing-tablet: 64px;
--section-spacing-desktop: 96px;
--section-spacing-xl: 128px;
```

### 2.4 Border & Radius System

```css
/* Border Radius */
--radius-none: 0px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-3xl: 32px;
--radius-full: 9999px;

/* Border Widths */
--border-none: 0px;
--border-thin: 1px;
--border-medium: 2px;
--border-thick: 4px;

/* Border Styles */
--border-solid: solid;
--border-dashed: dashed;
--border-dotted: dotted;

/* Glass Morphism Borders */
--border-glass: 1px solid rgba(255, 255, 255, 0.1);
--border-glass-hover: 1px solid rgba(255, 255, 255, 0.2);
```

### 2.5 Shadow System

```css
/* Elevation Shadows */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.04);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Glow Effects */
--shadow-glow-blue: 0 0 40px rgba(0, 212, 255, 0.3);
--shadow-glow-purple: 0 0 40px rgba(123, 97, 255, 0.3);
--shadow-glow-mint: 0 0 40px rgba(0, 255, 209, 0.3);

/* Inset Shadows */
--shadow-inner-sm: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-inner-md: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
```

---

## 3. COMPONENT SPECIFICATIONS

### 3.1 Header Component

```typescript
interface HeaderComponent {
  structure: {
    container: 'sticky' | 'fixed';
    height: {
      mobile: '60px';
      tablet: '72px';
      desktop: '80px';
    };
    background: 'glass-morphism';
    backdrop_filter: 'blur(12px)';
  };

  elements: {
    logo: {
      width: '140px';
      height: '32px';
      variants: ['light', 'dark'];
    };

    navigation: {
      items: [
        { label: '제품', href: '/products' },
        { label: '솔루션', href: '/solutions' },
        { label: '고객사례', href: '/cases' },
        { label: '가격', href: '/pricing' },
        { label: '문서', href: '/docs' },
        { label: '블로그', href: '/blog' },
        { label: '문의', href: '/contact' }
      ];
      style: 'horizontal-desktop' | 'hamburger-mobile';
    };

    cta_buttons: {
      secondary: {
        text: '로그인';
        style: 'ghost';
      };
      primary: {
        text: '무료 체험';
        style: 'gradient';
      };
    };
  };
}
```

### 3.2 Hero Section

```typescript
interface HeroSection {
  layout: 'split-screen' | 'centered' | 'asymmetric';

  content: {
    announcement_badge: {
      text: 'NEW: PAPSNET AI 출시';
      icon: 'sparkles';
      link: '/blog/papsnet-ai-launch';
    };

    headline: {
      primary: '디지털 혁신을 위한';
      gradient_text: '최적의 솔루션';
      secondary: 'PAPSNET';
      animation: 'type-writer' | 'fade-in' | 'slide-up';
    };

    subheadline: {
      text: '기업의 디지털 전환을 위한 통합 플랫폼으로 생산성을 극대화하세요';
    };

    cta_group: {
      primary: {
        text: '무료 체험 시작';
        icon: 'arrow-right';
        style: 'gradient-button';
      };
      secondary: {
        text: '데모 요청';
        icon: 'play-circle';
        style: 'outline-button';
      };
    };

    social_proof: {
      logos: ['samsung', 'lg', 'sk', 'hyundai', 'posco'];
      text: '1,000+ 기업이 신뢰하는 솔루션';
    };

    visual: {
      type: 'video' | '3d-animation' | 'interactive-demo';
      autoplay: true;
      controls: 'minimal';
    };
  };
}
```

### 3.3 Feature Cards

```typescript
interface FeatureCard {
  variants: 'default' | 'highlighted' | 'compact';

  structure: {
    icon: {
      size: '48px';
      style: 'gradient' | 'solid' | 'outline';
      animation: 'pulse' | 'rotate' | 'bounce';
    };

    content: {
      title: string;
      description: string;
      features?: string[];
      cta?: {
        text: string;
        href: string;
      };
    };

    visual: {
      type: 'screenshot' | 'illustration' | 'code-snippet';
      position: 'right' | 'bottom' | 'background';
    };
  };

  interactions: {
    hover: 'lift' | 'glow' | 'reveal';
    click: 'expand' | 'navigate' | 'modal';
  };
}
```

### 3.4 Testimonial Carousel

```typescript
interface TestimonialCarousel {
  layout: 'cards' | 'quotes' | 'case-studies';

  items: {
    company: {
      name: string;
      logo: string;
      industry: string;
    };

    quote: {
      text: string;
      metrics?: {
        label: string;
        value: string;
      }[];
    };

    author: {
      name: string;
      position: string;
      avatar?: string;
    };
  }[];

  navigation: {
    type: 'dots' | 'arrows' | 'thumbnails';
    autoplay: boolean;
    interval: number;
  };
}
```

### 3.5 Footer Component

```typescript
interface FooterComponent {
  structure: 'multi-column' | 'centered' | 'minimal';

  sections: {
    brand: {
      logo: string;
      tagline: string;
      social_links: {
        platform: string;
        url: string;
        icon: string;
      }[];
    };

    navigation: {
      columns: {
        title: string;
        links: {
          label: string;
          href: string;
          badge?: string;
        }[];
      }[];
    };

    newsletter: {
      title: string;
      description: string;
      form: {
        placeholder: string;
        button_text: string;
      };
    };

    bottom_bar: {
      copyright: string;
      legal_links: string[];
      language_selector: boolean;
    };
  };
}
```

---

## 4. RESPONSIVE DESIGN SPECIFICATIONS

### 4.1 Breakpoint System

```css
/* Breakpoints */
--breakpoint-xs: 320px;   /* Small phones */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
--breakpoint-3xl: 1920px; /* Ultra-wide */

/* Container Max Widths */
--container-xs: 100%;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### 4.2 Mobile-First Approach

```css
/* Mobile Base Styles (Default) */
.component {
  padding: var(--space-4);
  font-size: var(--text-body-md);
  grid-template-columns: 1fr;
}

/* Tablet Enhancement */
@media (min-width: 768px) {
  .component {
    padding: var(--space-6);
    font-size: var(--text-body-lg);
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop Enhancement */
@media (min-width: 1024px) {
  .component {
    padding: var(--space-8);
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Wide Screen Optimization */
@media (min-width: 1536px) {
  .component {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 4.3 Responsive Typography Scale

```css
/* Fluid Typography using clamp() */
--text-hero-responsive: clamp(40px, 5vw + 1rem, 72px);
--text-display-responsive: clamp(32px, 4vw + 1rem, 56px);
--text-headline-responsive: clamp(24px, 3vw + 0.5rem, 40px);
--text-body-responsive: clamp(14px, 1.5vw, 18px);
```

---

## 5. INTERACTION & ANIMATION PATTERNS

### 5.1 Micro-Interactions

```css
/* Button Interactions */
.button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-blue);
}

.button:active {
  transform: translateY(0);
  transition: all 0.1s;
}

/* Card Hover Effects */
.card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-2xl);
  border-color: var(--papsnet-accent-electric);
}

/* Link Underline Animation */
.link {
  position: relative;
  text-decoration: none;
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--papsnet-accent-electric);
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}
```

### 5.2 Page Transitions

```javascript
// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Animation classes
.animate-in {
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 5.3 Loading States

```css
/* Skeleton Screens */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--papsnet-gray-800) 25%,
    var(--papsnet-gray-700) 50%,
    var(--papsnet-gray-800) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Spinner */
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--papsnet-gray-700);
  border-top-color: var(--papsnet-accent-electric);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 6. ACCESSIBILITY REQUIREMENTS (WCAG 2.1 AA)

### 6.1 Color Contrast Requirements

```yaml
text_contrast:
  normal_text:
    minimum: 4.5:1
    recommended: 7:1
  large_text:
    minimum: 3:1
    recommended: 4.5:1

color_combinations:
  - background: '#0A1628'
    text: '#FFFFFF'
    ratio: 15.2:1
    status: 'AAA Compliant'

  - background: '#1E3A5F'
    text: '#FFFFFF'
    ratio: 8.4:1
    status: 'AAA Compliant'

  - background: '#FFFFFF'
    text: '#0A1628'
    ratio: 15.2:1
    status: 'AAA Compliant'
```

### 6.2 Keyboard Navigation

```css
/* Focus Indicators */
:focus-visible {
  outline: 2px solid var(--papsnet-accent-electric);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 9999;
  padding: var(--space-2) var(--space-4);
  background: var(--papsnet-primary-900);
  color: var(--papsnet-white);
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
```

### 6.3 ARIA Attributes

```html
<!-- Navigation -->
<nav role="navigation" aria-label="Main navigation">
  <ul role="list">
    <li role="listitem">
      <a href="/products" aria-current="page">제품</a>
    </li>
  </ul>
</nav>

<!-- Buttons -->
<button
  type="button"
  aria-label="Open menu"
  aria-expanded="false"
  aria-controls="mobile-menu"
>
  <span class="sr-only">메뉴 열기</span>
</button>

<!-- Forms -->
<form role="form" aria-label="Contact form">
  <label for="email" class="required">
    이메일 <span aria-label="required">*</span>
  </label>
  <input
    type="email"
    id="email"
    required
    aria-required="true"
    aria-describedby="email-error"
  />
  <span id="email-error" role="alert" aria-live="polite"></span>
</form>
```

### 6.4 Screen Reader Support

```css
/* Visually Hidden but Screen Reader Accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Announce Changes */
.aria-live {
  position: relative;
  aria-live: polite;
  aria-atomic: true;
}
```

---

## 7. PERFORMANCE OPTIMIZATION

### 7.1 Core Web Vitals Targets

```yaml
performance_metrics:
  LCP (Largest Contentful Paint):
    target: < 2.5s
    good: < 2.0s
    optimization:
      - Preload critical resources
      - Optimize hero images
      - Use responsive images

  FID (First Input Delay):
    target: < 100ms
    good: < 50ms
    optimization:
      - Code splitting
      - Lazy loading
      - Web workers for heavy tasks

  CLS (Cumulative Layout Shift):
    target: < 0.1
    good: < 0.05
    optimization:
      - Set explicit dimensions
      - Reserve space for dynamic content
      - Avoid inserting content above existing content
```

### 7.2 Asset Optimization

```javascript
// Image Optimization
const imageConfig = {
  formats: ['webp', 'avif', 'jpg'],
  sizes: [320, 640, 768, 1024, 1280, 1536],
  quality: {
    webp: 85,
    avif: 80,
    jpg: 90
  }
};

// Critical CSS Inlining
<style>
  /* Critical above-the-fold styles */
  :root {
    --papsnet-primary-900: #0A1628;
    /* ... other critical variables */
  }

  body {
    margin: 0;
    font-family: var(--font-primary);
    background: var(--papsnet-primary-900);
  }
</style>

// Lazy Loading Implementation
<img
  loading="lazy"
  src="placeholder.jpg"
  data-src="actual-image.webp"
  alt="Description"
/>
```

### 7.3 Bundle Optimization

```javascript
// Webpack Configuration
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
};

// Route-based Code Splitting
const HomePage = lazy(() => import('./pages/Home'));
const ProductPage = lazy(() => import('./pages/Product'));
```

---

## 8. DESIGN TOKENS

### 8.1 Token Structure

```json
{
  "tokens": {
    "color": {
      "primary": {
        "$value": "#0A1628",
        "$type": "color",
        "description": "Primary brand color"
      },
      "accent": {
        "electric": {
          "$value": "#00D4FF",
          "$type": "color",
          "description": "Electric blue for CTAs"
        }
      }
    },
    "typography": {
      "heading": {
        "hero": {
          "$value": {
            "fontFamily": "Montserrat",
            "fontSize": "72px",
            "fontWeight": "700",
            "lineHeight": "1.1",
            "letterSpacing": "-0.02em"
          },
          "$type": "typography"
        }
      }
    },
    "spacing": {
      "base": {
        "$value": "8px",
        "$type": "dimension"
      },
      "scale": {
        "xs": { "$value": "{spacing.base} * 0.5" },
        "sm": { "$value": "{spacing.base} * 1" },
        "md": { "$value": "{spacing.base} * 2" },
        "lg": { "$value": "{spacing.base} * 3" },
        "xl": { "$value": "{spacing.base} * 4" }
      }
    },
    "animation": {
      "duration": {
        "fast": { "$value": "200ms" },
        "normal": { "$value": "300ms" },
        "slow": { "$value": "500ms" }
      },
      "easing": {
        "ease-in-out": { "$value": "cubic-bezier(0.4, 0, 0.2, 1)" }
      }
    }
  }
}
```

---

## 9. IMPLEMENTATION ROADMAP

### 9.1 Phase 1: Foundation (Week 1-2)
- Set up design token system
- Implement color palette and typography
- Create base component library
- Establish responsive grid system

### 9.2 Phase 2: Core Components (Week 3-4)
- Header and navigation
- Hero section with animations
- Feature cards and sections
- Footer component

### 9.3 Phase 3: Advanced Features (Week 5-6)
- Interactive elements and micro-interactions
- Carousel and testimonial components
- Form components with validation
- Modal and overlay systems

### 9.4 Phase 4: Optimization (Week 7-8)
- Performance optimization
- Accessibility audit and fixes
- Cross-browser testing
- Documentation and style guide

---

## 10. TECHNICAL IMPLEMENTATION NOTES

### 10.1 Technology Stack

```yaml
frontend_framework:
  primary: Next.js 14+
  alternatives:
    - Vue 3 + Nuxt 3
    - React 18 + Vite

styling:
  css_framework: Tailwind CSS v3
  css_in_js: Emotion / Styled Components
  preprocessor: PostCSS

state_management:
  global: Zustand / Redux Toolkit
  server_state: TanStack Query

animation:
  library: Framer Motion
  scroll: Lottie / GSAP

build_tools:
  bundler: Webpack 5 / Vite
  compiler: SWC / ESBuild

testing:
  unit: Jest + Testing Library
  e2e: Cypress / Playwright
  visual: Chromatic / Percy
```

### 10.2 Component Architecture

```typescript
// Base Component Structure
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  as?: React.ElementType;
  theme?: 'light' | 'dark' | 'auto';
}

// Compound Component Pattern
const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter
};

// Usage
<Card.Root>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Content</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card.Root>
```

### 10.3 CSS Architecture

```scss
// BEM with CSS Modules
.component {
  &__element {
    property: value;

    &--modifier {
      property: value;
    }
  }
}

// Utility-First with Tailwind
<div className="
  flex
  items-center
  justify-between
  p-4
  bg-papsnet-primary-900
  hover:bg-papsnet-primary-800
  transition-colors
  duration-300
">

// CSS Custom Properties for Theming
.themed-component {
  background: var(--theme-background);
  color: var(--theme-text);

  @media (prefers-color-scheme: dark) {
    --theme-background: var(--papsnet-gray-900);
    --theme-text: var(--papsnet-white);
  }
}
```

---

## 11. QUALITY ASSURANCE CHECKLIST

### 11.1 Design Consistency
- [ ] All components follow design token system
- [ ] Consistent spacing and alignment
- [ ] Typography hierarchy maintained
- [ ] Color palette properly applied
- [ ] Icons and imagery consistent

### 11.2 Responsiveness
- [ ] Mobile-first implementation
- [ ] All breakpoints tested
- [ ] Touch targets minimum 44x44px
- [ ] Readable typography on all devices
- [ ] Images optimized for different screens

### 11.3 Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation functional
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] ARIA attributes implemented

### 11.4 Performance
- [ ] Core Web Vitals passing
- [ ] Images lazy loaded
- [ ] Code split by route
- [ ] CSS/JS minified
- [ ] Caching implemented

### 11.5 Cross-browser
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers tested

---

## 12. MAINTENANCE & EVOLUTION

### 12.1 Version Control
- Semantic versioning for design system
- Change log maintenance
- Breaking change notifications
- Migration guides

### 12.2 Documentation
- Component documentation with examples
- Design token documentation
- Accessibility guidelines
- Performance best practices

### 12.3 Continuous Improvement
- User feedback integration
- Analytics-driven optimization
- Regular accessibility audits
- Performance monitoring

---

## APPENDIX A: Component Examples

### Button Component Variations

```html
<!-- Primary Button -->
<button class="btn btn--primary btn--lg">
  <span>무료 체험 시작</span>
  <svg class="btn__icon"><!-- Arrow icon --></svg>
</button>

<!-- Ghost Button -->
<button class="btn btn--ghost btn--md">
  <span>더 알아보기</span>
</button>

<!-- Gradient Button -->
<button class="btn btn--gradient btn--xl">
  <span>지금 시작하기</span>
</button>
```

### Card Component Structure

```html
<article class="card card--featured">
  <div class="card__header">
    <div class="card__icon">
      <svg><!-- Icon --></svg>
    </div>
    <h3 class="card__title">AI 기반 자동화</h3>
  </div>
  <div class="card__body">
    <p class="card__description">
      인공지능을 활용한 업무 자동화로 생산성을 극대화하세요
    </p>
    <ul class="card__features">
      <li>자동 문서 분류</li>
      <li>지능형 데이터 추출</li>
      <li>실시간 분석</li>
    </ul>
  </div>
  <div class="card__footer">
    <a href="/features/ai" class="card__cta">
      자세히 보기 →
    </a>
  </div>
</article>
```

---

## APPENDIX B: Animation Specifications

### Entrance Animations

```css
/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Slide In Right */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

---

## CONCLUSION

This comprehensive design system provides PAPSNET with a modern, scalable, and accessible foundation for their digital presence. The system balances professional enterprise aesthetics with innovative design elements, ensuring the brand stands out while maintaining trustworthiness.

The modular approach allows for easy maintenance and evolution, while the detailed specifications ensure consistent implementation across all touchpoints. By following these guidelines, PAPSNET can deliver an exceptional user experience that drives engagement and conversion.

### Next Steps
1. Review and approve design specifications
2. Set up development environment with chosen tech stack
3. Begin implementation following the phased roadmap
4. Conduct regular reviews and iterations
5. Launch with comprehensive testing and optimization

---

*Document Version: 1.0*
*Last Updated: 2025-01-21*
*Prepared for: PAPSNET Co., Ltd. (주식회사 팹스넷)*