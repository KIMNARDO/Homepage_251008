import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface CaseStudyCardProps {
  id: string;
  title: string;
  company: string;
  industry: string;
  summary: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  image?: {
    src: string;
    alt: string;
  };
  logo?: {
    src: string;
    alt: string;
  };
  href: string;
  featured?: boolean;
  className?: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  id,
  title,
  company,
  industry,
  summary,
  results,
  image,
  logo,
  href,
  featured = false,
  className = '',
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`group relative bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 ${
        featured ? 'md:col-span-2' : ''
      } ${className}`}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            추천 사례
          </span>
        </div>
      )}

      {/* Image */}
      {image && (
        <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Company logo overlay */}
          {logo && (
            <div className="absolute bottom-4 left-4">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto bg-white p-1 rounded"
              />
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <BuildingOfficeIcon className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">{company}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400 text-sm">{industry}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            <Link to={href} className="hover:underline">
              {title}
            </Link>
          </h3>
        </div>

        {/* Summary */}
        <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
          {summary}
        </p>

        {/* Results */}
        {results && results.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">주요 성과</h4>
            <div className="grid grid-cols-2 gap-4">
              {results.slice(0, featured ? 4 : 2).map((result, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {result.value}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    {result.metric}
                  </div>
                  <div className="text-xs text-green-400">
                    {result.improvement}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <span className="text-sm text-gray-400">
            성공 사례 보기
          </span>

          <Link
            to={href}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium flex items-center group/link"
          >
            자세히 보기
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.article>
  );
};

export default CaseStudyCard;