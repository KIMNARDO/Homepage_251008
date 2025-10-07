import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface ProductCardProps {
  title: string;
  description: string;
  version?: string;
  category?: string;
  features?: string[];
  image?: {
    src: string;
    alt: string;
  };
  badge?: string;
  href: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  version,
  category,
  features,
  image,
  badge,
  href,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`group relative bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 ${className}`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="mb-6 overflow-hidden rounded-lg">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          {version && (
            <span className="text-sm font-medium text-gray-400 bg-gray-800 px-2 py-1 rounded">
              v{version}
            </span>
          )}
        </div>

        {category && (
          <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full mb-3">
            {category}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6 leading-relaxed">
        {description}
      </p>

      {/* Features */}
      {features && features.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-3">주요 기능</h4>
          <ul className="space-y-2">
            {features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-300">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                {feature}
              </li>
            ))}
            {features.length > 4 && (
              <li className="text-sm text-gray-400 italic">
                +{features.length - 4}개 추가 기능
              </li>
            )}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <Link
          to={href}
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium flex items-center group/link"
        >
          자세히 보기
          <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>

        <Button
          variant="primary"
          size="sm"
          href={href}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          시작하기
        </Button>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;