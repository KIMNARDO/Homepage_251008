import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {/* Home link */}
      <Link
        to="/"
        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
        aria-label="홈으로 이동"
      >
        <HomeIcon className="w-4 h-4" />
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRightIcon className="w-4 h-4 text-gray-500" />
          {item.href && index < items.length - 1 ? (
            <Link
              to={item.href}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={
                index === items.length - 1
                  ? 'text-white font-medium'
                  : 'text-gray-400'
              }
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;