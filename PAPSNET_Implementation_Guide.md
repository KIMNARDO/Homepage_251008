# PAPSNET Homepage Implementation Guide

## Quick Start Guide

### 1. Project Setup

```bash
# Create new Next.js project
npx create-next-app@latest papsnet-homepage --typescript --tailwind --app

# Navigate to project
cd papsnet-homepage

# Install required dependencies
npm install lucide-react framer-motion @tailwindcss/forms @tailwindcss/typography
npm install -D @tailwindcss/aspect-ratio @tailwindcss/container-queries

# Install Korean font support
npm install @fontsource/pretendard

# Copy the Tailwind configuration
cp papsnet-tailwind.config.js tailwind.config.js

# Copy components
cp -r components/* ./src/components/
```

### 2. Font Setup

Create `app/layout.tsx`:

```typescript
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/500.css';
import '@fontsource/pretendard/600.css';
import '@fontsource/pretendard/700.css';
import './globals.css';

export const metadata = {
  title: 'PAPSNET - 디지털 혁신을 위한 최적의 솔루션',
  description: '기업의 디지털 전환을 위한 통합 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-primary bg-papsnet-primary-900 text-white">
        {children}
      </body>
    </html>
  );
}
```

### 3. Global Styles Setup

Update `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-papsnet-gray-900;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-papsnet-gray-700 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-papsnet-gray-600;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Selection colors */
  ::selection {
    @apply bg-papsnet-accent-electric/30 text-white;
  }
}

@layer components {
  /* Button base styles */
  .btn {
    @apply inline-flex items-center justify-center gap-2
           px-6 py-3 rounded-xl font-semibold
           transition-all duration-300
           transform hover:-translate-y-0.5
           focus:outline-none focus:ring-2 focus:ring-offset-2
           focus:ring-papsnet-accent-electric;
  }

  .btn-primary {
    @apply bg-gradient-electric text-white
           shadow-lg shadow-papsnet-accent-electric/20
           hover:shadow-xl hover:shadow-papsnet-accent-electric/30;
  }

  .btn-secondary {
    @apply bg-white/5 text-papsnet-gray-200
           border border-papsnet-gray-700
           hover:bg-white/10 hover:border-papsnet-accent-electric/50;
  }

  /* Card styles */
  .card {
    @apply bg-gradient-card backdrop-blur-sm
           border border-papsnet-primary-600/30
           rounded-2xl p-6
           transition-all duration-300
           hover:border-papsnet-accent-electric/50
           hover:shadow-xl hover:shadow-papsnet-accent-electric/10;
  }

  /* Glass morphism utilities */
  .glass {
    @apply bg-white/5 backdrop-blur-xl border border-white/10;
  }

  .glass-dark {
    @apply bg-papsnet-primary-900/70 backdrop-blur-xl border border-white/5;
  }
}

@layer utilities {
  /* Text gradient utility */
  .text-gradient {
    @apply bg-clip-text text-transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Animation utilities */
  .animate-in {
    animation-fill-mode: both;
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}
```

## Component Architecture

### Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── IntegrationSection.tsx
│   │   └── CTASection.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Carousel.tsx
│   └── common/
│       ├── Logo.tsx
│       ├── LanguageSwitcher.tsx
│       └── ScrollToTop.tsx
```

### Example Component: Feature Card

```typescript
// components/ui/FeatureCard.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  ctaText?: string;
  ctaHref?: string;
  variant?: 'default' | 'highlighted' | 'compact';
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  ctaText,
  ctaHref,
  variant = 'default'
}) => {
  const variants = {
    default: 'p-8',
    highlighted: 'p-10 border-papsnet-accent-electric/50 shadow-glow-blue',
    compact: 'p-6'
  };

  return (
    <div className={`card group ${variants[variant]}`}>
      {/* Icon */}
      <div className="
        w-14 h-14 mb-6
        bg-gradient-electric
        rounded-xl
        flex items-center justify-center
        shadow-lg shadow-papsnet-accent-electric/20
        group-hover:scale-110
        transition-transform duration-300
      ">
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-white mb-3">
        {title}
      </h3>

      <p className="text-papsnet-gray-300 mb-6">
        {description}
      </p>

      {/* Feature List */}
      {features && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-papsnet-accent-electric mt-1">✓</span>
              <span className="text-papsnet-gray-400 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      {ctaText && ctaHref && (
        <a
          href={ctaHref}
          className="
            inline-flex items-center gap-2
            text-papsnet-accent-electric
            font-medium text-sm
            group-hover:gap-3
            transition-all duration-300
          "
        >
          {ctaText}
          <span>→</span>
        </a>
      )}
    </div>
  );
};

export default FeatureCard;
```

## Responsive Design Implementation

### Breakpoint Usage

```tsx
// Responsive grid example
<div className="
  grid
  grid-cols-1          // Mobile: 1 column
  sm:grid-cols-2       // Small tablets: 2 columns
  lg:grid-cols-3       // Desktop: 3 columns
  xl:grid-cols-4       // Large screens: 4 columns
  gap-6
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Responsive typography
<h1 className="
  text-3xl             // Mobile
  sm:text-4xl          // Tablet
  lg:text-5xl          // Desktop
  xl:text-hero-title   // Large screens
  font-bold
">
  Heading Text
</h1>

// Responsive spacing
<section className="
  py-12                // Mobile
  sm:py-16             // Tablet
  lg:py-24             // Desktop
  xl:py-32             // Large screens
">
  Content
</section>
```

## Animation Implementation

### Scroll-Triggered Animations

```typescript
// hooks/useScrollAnimation.ts
import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// Usage in component
const FeatureSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`
        transform transition-all duration-1000
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      Content
    </section>
  );
};
```

### Framer Motion Animations

```typescript
// components/AnimatedCard.tsx
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="card"
    >
      {children}
    </motion.div>
  );
};
```

## Performance Optimization

### Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

// Component usage
import Image from 'next/image';

<Image
  src="/hero-image.webp"
  alt="Hero"
  width={1920}
  height={1080}
  priority
  className="w-full h-auto"
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 75vw,
         50vw"
/>
```

### Code Splitting

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(
  () => import('@/components/HeavyChart'),
  {
    loading: () => <div className="skeleton h-64" />,
    ssr: false
  }
);
```

## Accessibility Implementation

### Focus Management

```typescript
// components/AccessibleButton.tsx
const AccessibleButton = ({ children, onClick, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="
        btn btn-primary
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-papsnet-accent-electric
        focus:ring-offset-papsnet-primary-900
      "
    >
      {children}
    </button>
  );
};
```

### Skip Links

```typescript
// components/SkipLink.tsx
const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="
        sr-only
        focus:not-sr-only
        focus:absolute
        focus:top-4
        focus:left-4
        focus:z-50
        focus:px-4
        focus:py-2
        focus:bg-papsnet-primary-900
        focus:text-white
        focus:rounded-lg
        focus:outline-none
        focus:ring-2
        focus:ring-papsnet-accent-electric
      "
    >
      Skip to main content
    </a>
  );
};
```

## Testing Checklist

### Pre-Launch Checklist

- [ ] **Responsive Design**
  - [ ] Mobile (320px - 640px)
  - [ ] Tablet (640px - 1024px)
  - [ ] Desktop (1024px+)
  - [ ] Ultra-wide (1920px+)

- [ ] **Cross-Browser Testing**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)
  - [ ] Samsung Internet

- [ ] **Performance**
  - [ ] Lighthouse score > 90
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
  - [ ] Bundle size < 500KB

- [ ] **Accessibility**
  - [ ] WCAG 2.1 AA compliance
  - [ ] Keyboard navigation
  - [ ] Screen reader testing
  - [ ] Color contrast ratios
  - [ ] Focus indicators

- [ ] **SEO**
  - [ ] Meta tags
  - [ ] Open Graph tags
  - [ ] Structured data
  - [ ] XML sitemap
  - [ ] Robots.txt

- [ ] **Internationalization**
  - [ ] Korean language
  - [ ] English language
  - [ ] RTL support ready
  - [ ] Date/time formats
  - [ ] Currency formats

## Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.papsnet.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://papsnet.com
```

### Performance Monitoring

```typescript
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
```

## Support & Resources

### Documentation Links
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### PAPSNET Design Resources
- Design System: `/PAPSNET_Design_System_Specification.md`
- Tailwind Config: `/papsnet-tailwind.config.js`
- Components: `/components/`

---

*Implementation Guide Version: 1.0*
*Last Updated: 2025-01-21*
*Prepared for: PAPSNET Co., Ltd. (주식회사 팹스넷)*