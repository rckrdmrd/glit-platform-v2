/**
 * ColorfulCard Component
 *
 * Wrapper around EnhancedCard that automatically applies vibrant colors
 * based on an ID or index. This makes cards more visually appealing
 * with minimal code changes.
 *
 * Usage:
 * <ColorfulCard id="unique-id" hover={true} padding="md">
 *   ... card content ...
 * </ColorfulCard>
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@shared/utils/cn';
import { getColorSchemeById, getColorSchemeByIndex, type ColorScheme } from '@shared/utils/colorPalette';

export interface ColorfulCardProps {
  children: React.ReactNode;

  // Color selection (provide one)
  id?: string; // Use ID for consistent colors across renders
  index?: number; // Use index for position-based colors
  colorScheme?: ColorScheme; // Or provide a specific color scheme

  // Card styling
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;

  // Animation
  animate?: boolean;
  animationDelay?: number;

  // Gradient customization
  useGradientBorder?: boolean;
  useGradientBackground?: boolean;
}

export function ColorfulCard({
  children,
  id,
  index,
  colorScheme: providedColorScheme,
  hover = true,
  padding = 'md',
  className,
  onClick,
  animate = true,
  animationDelay = 0,
  useGradientBorder = true,
  useGradientBackground = true,
}: ColorfulCardProps) {
  // Get color scheme based on provided ID, index, or custom scheme
  const colorScheme = useMemo(() => {
    if (providedColorScheme) return providedColorScheme;
    if (id) return getColorSchemeById(id);
    if (index !== undefined) return getColorSchemeByIndex(index);
    // Default to index 0 if nothing provided
    return getColorSchemeByIndex(0);
  }, [id, index, providedColorScheme]);

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const cardContent = (
    <div
      className={cn(
        'relative bg-white rounded-xl shadow-md overflow-hidden',
        'border-2 transition-all duration-300',
        useGradientBorder ? colorScheme.border : 'border-gray-200',
        useGradientBorder ? colorScheme.shadow : '',
        paddingClasses[padding],
        hover && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {useGradientBackground && (
        <div
          className={cn(
            'absolute inset-0 opacity-5',
            'bg-gradient-to-br',
            colorScheme.iconGradient
          )}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (!animate) {
    return cardContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{
        duration: 0.4,
        delay: animationDelay,
        ease: 'easeOut',
      }}
    >
      {cardContent}
    </motion.div>
  );
}

/**
 * ColorfulIconCard - Card with a prominent colored icon
 */
interface ColorfulIconCardProps extends ColorfulCardProps {
  icon: React.ComponentType<{ className?: string }>;
  iconSize?: 'sm' | 'md' | 'lg';
}

export function ColorfulIconCard({
  icon: Icon,
  iconSize = 'md',
  children,
  ...props
}: ColorfulIconCardProps) {
  const colorScheme = useMemo(() => {
    if (props.colorScheme) return props.colorScheme;
    if (props.id) return getColorSchemeById(props.id);
    if (props.index !== undefined) return getColorSchemeByIndex(props.index);
    return getColorSchemeByIndex(0);
  }, [props.id, props.index, props.colorScheme]);

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconContainerSizes = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  return (
    <ColorfulCard {...props}>
      <div className="flex items-start gap-4 mb-4">
        <div
          className={cn(
            iconContainerSizes[iconSize],
            'rounded-xl flex items-center justify-center',
            'bg-gradient-to-br shadow-md flex-shrink-0',
            colorScheme.iconGradient
          )}
        >
          <Icon className={cn(iconSizes[iconSize], 'text-white')} />
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </ColorfulCard>
  );
}

export default ColorfulCard;
