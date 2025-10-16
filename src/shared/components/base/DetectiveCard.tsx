import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@shared/utils/cn';

export interface DetectiveCardProps {
  variant?: 'default' | 'gold' | 'exercise' | 'mystery';
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const variantClasses = {
  default: 'detective-card',
  gold: 'card-gold',
  exercise: 'card-exercise',
  mystery: 'card-mystery',
};

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

export const DetectiveCard: React.FC<DetectiveCardProps> = ({
  variant = 'default',
  children,
  className,
  hoverable = true,
  onClick,
  padding = 'md',
}) => {
  const Component = onClick ? motion.div : 'div';
  const isExerciseCard = variant === 'exercise';
  const motionProps = onClick
    ? {
        whileHover: { scale: 1.02, y: isExerciseCard ? -4 : -2 },
        whileTap: { scale: 0.98 },
        onClick,
      }
    : {};

  return (
    <Component
      {...motionProps}
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        hoverable && 'hover-lift',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </Component>
  );
};
