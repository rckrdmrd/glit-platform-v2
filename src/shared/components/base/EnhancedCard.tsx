/**
 * EnhancedCard Component
 *
 * Reusable card component based on MissionCard styling patterns.
 * Provides a flexible, animated card with multiple variants and hover effects.
 *
 * Features:
 * - Multiple color variants (default, primary, success, warning, danger, info)
 * - Configurable padding levels (none, sm, md, lg)
 * - Optional hover animation with elevation effect
 * - Smooth transitions and entrance animations
 * - Framer Motion powered animations
 * - Responsive and accessible
 * - Click handler support
 *
 * Based on MissionCard design patterns:
 * - Border-based variant system
 * - Shadow effects for depth
 * - Smooth transitions
 * - Motion animations
 *
 * @example
 * ```tsx
 * <EnhancedCard variant="primary" hover>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </EnhancedCard>
 * ```
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@shared/utils/cn';

/**
 * Props for the EnhancedCard component
 */
export interface EnhancedCardProps {
  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * Visual variant of the card
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

  /**
   * Enable hover elevation effect
   * @default true
   */
  hover?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Padding size
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Get variant-specific styles (border and shadow)
 */
function getVariantStyles(variant: EnhancedCardProps['variant'] = 'default') {
  const variantMap = {
    default: {
      border: 'border-gray-300',
      shadow: '',
    },
    primary: {
      border: 'border-blue-400',
      shadow: 'shadow-blue-200',
    },
    success: {
      border: 'border-green-400',
      shadow: 'shadow-green-200',
    },
    warning: {
      border: 'border-yellow-400',
      shadow: 'shadow-yellow-200',
    },
    danger: {
      border: 'border-red-400',
      shadow: 'shadow-red-200',
    },
    info: {
      border: 'border-cyan-400',
      shadow: 'shadow-cyan-200',
    },
  };

  return variantMap[variant];
}

/**
 * Get padding class based on size
 */
function getPaddingClass(padding: EnhancedCardProps['padding'] = 'md') {
  const paddingMap = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return paddingMap[padding];
}

/**
 * EnhancedCard Component
 *
 * A flexible, reusable card component with animation support and multiple variants.
 */
export function EnhancedCard({
  children,
  variant = 'default',
  hover = true,
  className,
  onClick,
  padding = 'md',
}: EnhancedCardProps) {
  const variantStyles = getVariantStyles(variant);
  const paddingClass = getPaddingClass(padding);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={hover ? { y: -5 } : undefined}
      onClick={onClick}
      className={cn(
        // Base styles from MissionCard
        'bg-white rounded-xl shadow-md overflow-hidden',
        'border-2 transition-all duration-300',
        // Variant styles
        variantStyles.border,
        variantStyles.shadow,
        // Padding
        paddingClass,
        // Clickable cursor
        onClick && 'cursor-pointer',
        // Custom classes
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/**
 * Export types for external use
 */
export type { EnhancedCardProps as EnhancedCardPropsType };

/**
 * Default export
 */
export default EnhancedCard;
