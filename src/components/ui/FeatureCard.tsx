import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import Button from '@/components/ui/Button';
import type { FeatureCard as FeatureCardType } from '@/types';

interface FeatureCardProps extends FeatureCardType {
  className?: string;
  variant?: 'default' | 'highlighted' | 'compact';
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  image,
  cta,
  className,
  variant = 'default',
  index = 0,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
  };

  const cardClasses = clsx(
    'group relative overflow-hidden transition-all duration-300',
    {
      // Variant styles
      'bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-white/20 hover:scale-105': variant === 'default',
      'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 rounded-2xl p-6 md:p-8 hover:from-blue-500/30 hover:to-purple-600/30 hover:scale-105': variant === 'highlighted',
      'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 hover:border-white/20': variant === 'compact',
    },
    className
  );

  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: variant === 'compact' ? 1.02 : 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Icon */}
      {icon && (
        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-500/20 border border-blue-400/30 rounded-xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl md:text-3xl">{icon}</span>
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="mb-4 md:mb-6 overflow-hidden rounded-lg">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <h3 className={clsx(
          'font-semibold text-white mb-3 md:mb-4 group-hover:text-blue-300 transition-colors duration-300',
          {
            'text-xl md:text-2xl': variant === 'default' || variant === 'highlighted',
            'text-lg md:text-xl': variant === 'compact',
          }
        )}>
          {title}
        </h3>

        <p className={clsx(
          'text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300',
          {
            'text-base md:text-lg mb-6 md:mb-8': variant === 'default' || variant === 'highlighted',
            'text-sm md:text-base mb-4 md:mb-6': variant === 'compact',
          }
        )}>
          {description}
        </p>

        {/* CTA Button */}
        {cta && (
          <Button
            variant="ghost"
            href={cta.href}
            external={cta.external}
            className="text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-transform duration-200"
          >
            {cta.text}
            <svg
              className="w-4 h-4 ml-2"
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
          </Button>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

      {/* AI badge for AI-related features */}
      {title.toLowerCase().includes('ai') && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          AI
        </div>
      )}
    </motion.div>
  );
};

export default FeatureCard;