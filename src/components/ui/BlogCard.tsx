import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  image?: {
    src: string;
    alt: string;
  };
  tags?: string[];
  featured?: boolean;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  slug,
  author,
  publishedAt,
  readTime,
  category,
  image,
  tags,
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
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      } ${className}`}
    >
      {/* Image */}
      {image && (
        <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>

          {featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-block bg-yellow-500/20 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                특집
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category (if no image) */}
        {!image && (
          <div className="mb-3">
            <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          <Link to={`/blog/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            {/* Author */}
            <div className="flex items-center space-x-2">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <UserIcon className="w-4 h-4" />
              )}
              <span>{author.name}</span>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{publishedAt}</span>
            </div>

            {/* Read time */}
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Read more link */}
          <Link
            to={`/blog/${slug}`}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium flex items-center group/link"
          >
            읽기
            <svg
              className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.article>
  );
};

export default BlogCard;