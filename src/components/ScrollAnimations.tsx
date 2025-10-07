import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
// Using react-intersection-observer instead

// Custom hook for animated counters
export function useAnimatedCounter(end: number, duration: number = 2) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return { count, setIsVisible };
}

// Animated counter component
interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { count, setIsVisible } = useAnimatedCounter(end, duration);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView, setIsVisible]);

  return (
    <div ref={ref} className={className}>
      {prefix}{count}{suffix}
    </div>
  );
}

// Stagger animation container
interface StaggerProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function StaggerContainer({ children, delay = 0.1, className = '' }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Progress bar that fills on scroll
interface ProgressBarProps {
  height?: string;
  color?: string;
  backgroundColor?: string;
  className?: string;
}

export function ProgressBar({
  height = '4px',
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  className = ''
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const animateProgress = () => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    };

    const interval = setInterval(animateProgress, 20);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div
      ref={ref}
      className={`relative w-full ${className}`}
      style={{ height, backgroundColor }}
    >
      <motion.div
        className="absolute left-0 top-0 h-full"
        style={{ backgroundColor: color }}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

// 3D flip card animation
interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className = '' }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsFlipped(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className={`relative h-64 w-full cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 h-full w-full rounded-lg bg-white shadow-lg border border-gray-200"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-br from-electric-500 to-emerald-500 shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

// Parallax scroll component
interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxElement({ children, offset = 50, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale animation on scroll
interface ScaleOnScrollProps {
  children: React.ReactNode;
  scale?: [number, number];
  className?: string;
}

export function ScaleOnScroll({
  children,
  scale = [0.8, 1],
  className = ''
}: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [scale[0], scale[1], scale[0]]);

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleValue }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Reveal animation (slide up from bottom)
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  distance = 50,
  className = ''
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide in from side animation
interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.8,
  distance = 100,
  className = ''
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const x = direction === 'left' ? -distance : distance;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating elements with different patterns
interface FloatingProps {
  children: React.ReactNode;
  pattern?: 'gentle' | 'wave' | 'circle';
  duration?: number;
  className?: string;
}

export function FloatingElement({
  children,
  pattern = 'gentle',
  duration = 3,
  className = ''
}: FloatingProps) {
  const getAnimation = () => {
    switch (pattern) {
      case 'wave':
        return {
          y: [0, -15, 0],
          x: [0, 10, 0],
        };
      case 'circle':
        return {
          x: [0, 10, 0, -10, 0],
          y: [0, -10, -20, -10, 0],
        };
      default:
        return {
          y: [0, -10, 0],
        };
    }
  };

  return (
    <motion.div
      animate={getAnimation()}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default {
  AnimatedCounter,
  StaggerContainer,
  ProgressBar,
  FlipCard,
  ParallaxElement,
  ScaleOnScroll,
  Reveal,
  SlideIn,
  FloatingElement,
  useAnimatedCounter,
};