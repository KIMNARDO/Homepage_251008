// Base types
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

// Navigation types
export interface NavigationItem {
  text: string;
  href: string;
  external?: boolean;
  badge?: string;
}

export interface NavigationSection {
  title: string;
  links: NavigationItem[];
}

// Button types
export interface ButtonProps extends BaseComponent {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

// Card types
export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: {
    src: string;
    alt: string;
  };
  cta?: {
    text: string;
    href: string;
    external?: boolean;
  };
}

// Company types
export interface CompanyLogo {
  name: string;
  src: string;
  alt: string;
  href?: string;
}

export interface Testimonial {
  id: string;
  company: string;
  title: string;
  quote?: string;
  author?: {
    name: string;
    position: string;
    avatar?: string;
  };
  href?: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  version: string;
  description: string;
  features: string[];
  category: 'PLM' | 'DDMS' | 'EPL' | 'PMS' | 'PDM' | 'ICMS' | 'WMS' | 'MES';
  image?: string;
}

// Project types
export interface Project {
  id: string;
  company: string;
  product: string;
  version: string;
  period: string;
  industry: string;
  status: 'completed' | 'ongoing' | 'planned';
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

// SEO types
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  interests?: string[];
  source?: string;
}

// Error types
export interface APIError {
  message: string;
  code?: string;
  status?: number;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Responsive breakpoints
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

// Theme types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Carousel types
export interface CarouselOptions {
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  responsive?: Array<{
    breakpoint: number;
    settings: Partial<CarouselOptions>;
  }>;
}

// Video types
export interface VideoProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}
