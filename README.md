# PAPSNET Homepage

A modern React application built for PAPSNET (주식회사 팹스넷), featuring a complete PLM solutions homepage with responsive design, accessibility features, and performance optimizations.

## 🚀 Features

- **Modern React 18** with TypeScript
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Accessibility** - WCAG 2.1 AA compliant
- **Performance Optimized** - Code splitting, lazy loading, and optimized assets
- **SEO Friendly** - Meta tags, structured data, and sitemap
- **Animations** - Smooth animations with Framer Motion
- **Cross-browser Compatible** - Supports all modern browsers

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Custom Properties
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **SEO**: React Helmet Async
- **Carousel**: Embla Carousel
- **Build Tool**: Vite
- **Linting**: ESLint, TypeScript

## 📦 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Layout components (Header, Footer)
│   ├── sections/        # Page sections (Hero, Features, etc.)
│   └── ui/             # Basic UI components (Button, Container, etc.)
├── data/               # Static data and content
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── styles/             # Global styles and CSS
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets (images, videos, etc.)
```

## 🎯 Key Components

### Header Component
- Sticky navigation with scroll effects
- Mobile-responsive hamburger menu
- Smooth animations and transitions

### Hero Section
- Video player with custom controls
- Feature tabs showcase
- Call-to-action buttons
- Company logo carousel

### AI Features Section
- Interactive feature cards
- Gradient backgrounds
- Hover animations

### Social Proof Section
- Customer testimonials carousel
- Company logos
- Statistics display

### Features Section
- Alternating layout design
- Image galleries
- Feature descriptions with CTAs

### Integration Section
- Technology stack showcase
- Integration workflow visualization
- Benefits grid

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm 9.0 or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/papsnet/homepage.git
cd homepage
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

### Colors
- **Primary**: Black (#000000)
- **Text**: White (#ffffff)
- **Accent**: Blue gradient (#3b82f6 to #1e40af)
- **Border**: Light gray (oklch(0.922 0 0))

### Typography
- **Primary Font**: Matter (fallback: Inter, system fonts)
- **Font Sizes**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px
- **Font Weights**: 300, 400, 500, 600, 700

### Spacing
- **Base Unit**: 4px
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

## 🔧 Performance Optimizations

- **Code Splitting**: Dynamic imports for route-based splitting
- **Lazy Loading**: Images and components loaded on demand
- **Bundle Optimization**: Vendor chunks and tree shaking
- **Image Optimization**: WebP format and responsive images
- **Caching**: Browser caching strategies
- **Preloading**: Critical resources preloaded

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📈 SEO Features

- Meta tags optimization
- Open Graph and Twitter Card support
- Structured data (JSON-LD)
- Sitemap generation
- Canonical URLs
- robots.txt configuration

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Chrome Mobile (latest)

## 📄 License

Copyright © 2025 PAPSNET Co., Ltd. All rights reserved.

## 🤝 Contributing

This is a private project for PAPSNET. For internal development guidelines and contribution processes, please refer to the internal documentation.

## 📞 Support

For technical support or questions:
- Email: kimnardo@papsnet.net
- Phone: (070) 500-1144
- Website: www.papsnet.net

## 🏢 About PAPSNET

PAPSNET (주식회사 팹스넷) is a leading provider of PLM (Product Lifecycle Management) solutions in South Korea, specializing in:

- **CLIP PLM**: Comprehensive product lifecycle management
- **CLIP DDMS**: Drawing distribution management system
- **CLIP EPL**: Multi-BOM management solution
- **CLIP ICMS**: Integrated cost management system
- **CADWin AI**: AI-powered CAD analysis tools

Founded in 2021, PAPSNET serves automotive, semiconductor, and medical device industries with innovative engineering solutions.