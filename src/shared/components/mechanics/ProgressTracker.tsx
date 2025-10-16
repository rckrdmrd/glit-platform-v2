import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@shared/utils/cn';

export interface ProgressTrackerProps {
  current: number;
  total: number;
  showPercentage?: boolean;
  showSteps?: boolean;
  className?: string;
  variant?: 'bar' | 'steps' | 'circular';
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  current,
  total,
  showPercentage = true,
  showSteps = true,
  className = '',
  variant = 'bar'
}) => {
  const percentage = (current / total) * 100;

  if (variant === 'steps') {
    return (
      <div className={cn('flex items-center justify-between', className)}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {i < current ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </motion.div>
            {i < total - 1 && (
              <div className={cn(
                'h-1 w-8 mx-1',
                i < current - 1 ? 'bg-green-500' : 'bg-gray-300'
              )} />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'circular') {
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={cn('relative inline-flex items-center justify-center', className)}>
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          <motion.circle
            cx="48"
            cy="48"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-detective-orange"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-2xl font-bold text-detective-text">{current}</span>
          <span className="text-sm text-detective-text-secondary">/{total}</span>
        </div>
      </div>
    );
  }

  // Default: bar variant
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        {showSteps && (
          <span className="text-sm font-medium text-detective-text">
            {current} de {total} completados
          </span>
        )}
        {showPercentage && (
          <span className="text-sm font-bold text-detective-orange">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div className="progress-detective">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
