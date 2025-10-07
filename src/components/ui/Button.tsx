import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { ButtonProps } from '@/types';

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    href,
    external = false,
    type = 'button',
    icon,
    style,
    onClick,
    ...props
  }, ref) => {
    const baseClasses = clsx(
      'inline-flex items-center justify-center font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        // Variants
        'bg-white text-black hover:bg-gray-100 active:bg-gray-200 focus:ring-white': variant === 'primary',
        'bg-transparent text-white border border-white/20 hover:bg-white/10 active:bg-white/20 focus:ring-white': variant === 'secondary',
        'bg-transparent text-white hover:bg-white/10 active:bg-white/20 focus:ring-white': variant === 'ghost',
        'border border-white/30 text-white bg-transparent hover:bg-white/10 active:bg-white/20 focus:ring-white': variant === 'outline',
        'bg-transparent text-white hover:text-blue-300 focus:ring-white/60': variant === 'text',

        // Sizes
        'px-3 py-1.5 text-sm rounded-lg gap-1.5': size === 'sm',
        'px-4 py-2 text-sm rounded-lg gap-2': size === 'md',
        'px-6 py-3 text-base rounded-xl gap-2.5': size === 'lg',
      },
      className
    );

    const content = (
      <>
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        )}
        {icon && <span className="mr-2 flex items-center">{icon}</span>}
        {children}
        {external && (
          <svg
            className="w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </>
    );

    if (href) {
      const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

      return (
        <motion.a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          style={style}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          aria-disabled={disabled}
          {...linkProps}
          {...props}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={baseClasses}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        type={type}
        style={style}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
