import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import clsx from 'clsx';

interface CarouselProps {
  children: React.ReactNode[];
  options?: EmblaOptionsType;
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  options = { loop: true, align: 'start' },
  className,
  showDots = true,
  showArrows = true,
  autoplay = false,
  autoplayDelay = 4000,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const autoplayInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, autoplayDelay);

    // Pause autoplay on user interaction
    const handleUserInteraction = () => {
      clearInterval(autoplayInterval);
    };

    emblaApi.on('pointerDown', handleUserInteraction);

    return () => {
      clearInterval(autoplayInterval);
      emblaApi.off('pointerDown', handleUserInteraction);
    };
  }, [emblaApi, autoplay, autoplayDelay]);

  return (
    <div className={clsx('relative', className)}>
      {/* Carousel container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {children.map((child, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <motion.button
            className={clsx(
              'absolute left-4 top-1/2 -translate-y-1/2 z-10',
              'w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full',
              'flex items-center justify-center text-white',
              'hover:bg-white/20 focus:bg-white/20 focus:outline-none',
              'transition-all duration-200',
              !canScrollPrev && 'opacity-50 cursor-not-allowed'
            )}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            whileHover={{ scale: canScrollPrev ? 1.1 : 1 }}
            whileTap={{ scale: canScrollPrev ? 0.95 : 1 }}
            aria-label="이전 슬라이드"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            className={clsx(
              'absolute right-4 top-1/2 -translate-y-1/2 z-10',
              'w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full',
              'flex items-center justify-center text-white',
              'hover:bg-white/20 focus:bg-white/20 focus:outline-none',
              'transition-all duration-200',
              !canScrollNext && 'opacity-50 cursor-not-allowed'
            )}
            onClick={scrollNext}
            disabled={!canScrollNext}
            whileHover={{ scale: canScrollNext ? 1.1 : 1 }}
            whileTap={{ scale: canScrollNext ? 0.95 : 1 }}
            aria-label="다음 슬라이드"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && children.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {children.map((_, index) => (
            <motion.button
              key={index}
              className={clsx(
                'w-2 h-2 rounded-full transition-all duration-200',
                selectedIndex === index
                  ? 'bg-white scale-125'
                  : 'bg-white/40 hover:bg-white/60'
              )}
              onClick={() => scrollTo(index)}
              whileHover={{ scale: selectedIndex === index ? 1.25 : 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;