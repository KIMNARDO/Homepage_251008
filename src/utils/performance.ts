/**
 * Performance utilities for optimization and monitoring
 */

// Lazy load images with intersection observer
export const lazyLoadImage = (img: HTMLImageElement) => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        const src = image.dataset.src;

        if (src) {
          image.src = src;
          image.classList.remove('lazy');
          image.classList.add('loaded');
          observer.unobserve(image);
        }
      }
    });
  });

  imageObserver.observe(img);
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;

  document.head.appendChild(link);
};

// Web Vitals monitoring
export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFID(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): T => {
  let timeout: ReturnType<typeof setTimeout> | null;

  return ((...args: any[]) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  }) as T;
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;

  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get device type based on screen size
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;

  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Check if device supports hover
export const supportsHover = (): boolean => {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};

// Measure element performance
export const measureElementPerformance = (element: HTMLElement) => {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log(`Element: ${entry.name}, Duration: ${entry.duration}ms`);
    });
  });

  observer.observe({ entryTypes: ['measure'] });

  const elementId = element.id || element.className || 'unknown-element';
  performance.mark(`${elementId}-start`);

  return () => {
    performance.mark(`${elementId}-end`);
    performance.measure(elementId, `${elementId}-start`, `${elementId}-end`);
  };
};
