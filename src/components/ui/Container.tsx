import React from 'react';
import clsx from 'clsx';
import type { BaseComponent } from '@/types';

interface ContainerProps extends BaseComponent {
  size?: 'default' | 'wide' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'default',
  padding = 'md',
  ...props
}) => {
  const classes = clsx(
    'w-full mx-auto',
    {
      // Container sizes
      'max-w-7xl': size === 'default',
      'max-w-8xl': size === 'wide',
      'max-w-none': size === 'full',

      // Padding
      'px-0': padding === 'none',
      'px-4 sm:px-6': padding === 'sm',
      'px-4 sm:px-6 lg:px-8': padding === 'md',
      'px-6 sm:px-8 lg:px-12': padding === 'lg',
    },
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;