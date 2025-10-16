import React from 'react';
import { cn } from '@shared/utils/cn';

export interface CategoryBadgeProps {
  type: 'cause' | 'effect' | 'groupA' | 'groupB' | 'custom';
  label?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const typeConfig = {
  cause: {
    bg: 'bg-blue-500',
    label: 'C',
  },
  effect: {
    bg: 'bg-orange-500',
    label: 'E',
  },
  groupA: {
    bg: 'bg-blue-500',
    label: 'A',
  },
  groupB: {
    bg: 'bg-orange-500',
    label: 'B',
  },
  custom: {
    bg: 'bg-gray-500',
    label: '?',
  },
};

const sizeClasses = {
  sm: 'w-4 h-4 text-xs',
  md: 'w-5 h-5 text-xs',
  lg: 'w-6 h-6 text-sm',
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  type,
  label,
  color,
  size = 'md',
  className,
}) => {
  const config = typeConfig[type];
  const displayLabel = label || config.label;
  const bgColor = color || config.bg;

  return (
    <div
      className={cn(
        // Base styles
        'rounded-full flex items-center justify-center',
        'text-white font-bold flex-shrink-0',

        // Size
        sizeClasses[size],

        // Color
        bgColor,

        className
      )}
    >
      {displayLabel}
    </div>
  );
};

export default CategoryBadge;
