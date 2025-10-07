import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: {
    amount: string;
    period: string;
    currency?: string;
  };
  features: PricingFeature[];
  cta: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'ghost';
  };
  badge?: string;
  popular?: boolean;
  className?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  features,
  cta,
  badge,
  popular = false,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative ${className}`}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-6 py-2 rounded-full">
            가장 인기
          </div>
        </div>
      )}

      <div
        className={`relative h-full bg-gradient-to-b from-gray-900 to-gray-900/50 border rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl ${
          popular
            ? 'border-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30'
            : 'border-gray-800 hover:border-gray-700'
        }`}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {badge}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-400 mb-6">{description}</p>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline justify-center">
              <span className="text-sm text-gray-400 mr-1">
                {price.currency || '₩'}
              </span>
              <span className="text-5xl font-bold text-white">
                {price.amount}
              </span>
              <span className="text-gray-400 ml-2">
                {price.period}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            variant={cta.variant || (popular ? 'primary' : 'secondary')}
            href={cta.href}
            className="w-full mb-8"
          >
            {cta.text}
          </Button>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">포함된 기능</h4>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                feature.included ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                  feature.included
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-700 text-gray-500'
                }`}
              >
                {feature.included ? (
                  <CheckIcon className="w-3 h-3" />
                ) : (
                  <span className="text-xs">×</span>
                )}
              </div>
              <span
                className={`text-sm ${
                  feature.included ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-400 text-center">
            모든 요금제는 14일 무료 체험 포함
          </p>
        </div>

        {/* Hover effect overlay */}
        {popular && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </div>
    </motion.div>
  );
};

export default PricingCard;