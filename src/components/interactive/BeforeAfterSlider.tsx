import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeContent?: React.ReactNode;
  afterContent?: React.ReactNode;
  className?: string;
  initialPosition?: number;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeContent,
  afterContent,
  className,
  initialPosition = 50
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const x = useMotionValue(initialPosition);
  const sliderPosition = useTransform(x, [0, 100], ['0%', '100%']);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    x.set(Math.max(0, Math.min(100, newX)));
  }, [isDragging, x]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const newX = ((touch.clientX - rect.left) / rect.width) * 100;
    x.set(Math.max(0, Math.min(100, newX)));
  }, [isDragging, x]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Default content if no images provided
  const defaultBeforeContent = (
    <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
      <div className="text-center text-gray-600">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-2">Traditional PLM</h3>
        <ul className="text-sm space-y-1">
          <li>• Manual processes</li>
          <li>• Disconnected systems</li>
          <li>• Limited visibility</li>
          <li>• Reactive approach</li>
        </ul>
      </div>
    </div>
  );

  const defaultAfterContent = (
    <div className="h-full w-full bg-gradient-to-br from-electric-400 to-emerald-400 flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-xl font-semibold mb-2">CLIP PLM</h3>
        <ul className="text-sm space-y-1">
          <li>• AI-powered automation</li>
          <li>• Integrated ecosystem</li>
          <li>• Real-time insights</li>
          <li>• Predictive analytics</li>
        </ul>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={cn('relative bg-white rounded-xl shadow-lg overflow-hidden', className)}
    >
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          Transform Your Product Lifecycle Management
        </h3>
        <p className="text-sm text-gray-600 text-center mt-2">
          Drag the slider to see the difference
        </p>
      </div>

      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative h-80 overflow-hidden cursor-ew-resize select-none"
      >
        {/* Before Content */}
        <div className="absolute inset-0">
          {beforeImage ? (
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            beforeContent || defaultBeforeContent
          )}

          {/* Before Label */}
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {beforeLabel}
          </div>
        </div>

        {/* After Content (clipped) */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(${sliderPosition} 0%, 100% 0%, 100% 100%, ${sliderPosition} 100%)`
          }}
        >
          {afterImage ? (
            <img
              src={afterImage}
              alt={afterLabel}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            afterContent || defaultAfterContent
          )}

          {/* After Label */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {afterLabel}
          </div>
        </motion.div>

        {/* Slider Handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
          style={{ left: sliderPosition }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Handle Button */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center cursor-ew-resize"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-1 text-gray-400">
              <ChevronLeft size={16} />
              <ChevronRight size={16} />
            </div>
          </motion.div>
        </motion.div>

        {/* Drag Overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-transparent cursor-ew-resize" />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-4">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Drag to compare</span>
          <motion.button
            onClick={() => x.set(50)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 bg-electric-600 text-white rounded-lg hover:bg-electric-700 transition-colors"
          >
            Reset
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}