import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@shared/utils/cn';

export interface ProgressBarProps {
  progress: number; // 0-100
  variant?: 'detective' | 'xp';
  showLabel?: boolean;
  label?: string;
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

const heightClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3',
};

const variantClasses = {
  detective: 'progress-detective',
  xp: 'progress-xp',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'detective',
  showLabel = false,
  label,
  className,
  height = 'md',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-detective-small">
            {label || 'Progreso'}
          </span>
          <span className="text-detective-small font-medium">
            {clampedProgress}%
          </span>
        </div>
      )}
      <div className={cn(variantClasses[variant], heightClasses[height])}>
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
