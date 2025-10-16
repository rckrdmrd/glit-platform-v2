import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@shared/utils/cn';

export interface OptionButtonProps {
  children: React.ReactNode;
  selected?: boolean;
  feedback?: 'correct' | 'incorrect' | null;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'small';
  icon?: React.ReactNode;
  showFeedbackIcon?: boolean;
}

const getFeedbackClasses = (selected: boolean, feedback: 'correct' | 'incorrect' | null) => {
  if (!selected) {
    return 'border-gray-300 hover:border-gray-400 bg-white';
  }

  if (feedback === 'correct') {
    return 'border-green-500 bg-green-50';
  }

  if (feedback === 'incorrect') {
    return 'border-red-500 bg-red-50';
  }

  // Selected but no feedback yet
  return 'border-detective-orange bg-detective-bg';
};

const variantClasses = {
  default: 'p-4 text-base',
  small: 'p-2 text-sm',
};

export const OptionButton: React.FC<OptionButtonProps> = ({
  children,
  selected = false,
  feedback = null,
  onClick,
  disabled = false,
  className,
  variant = 'default',
  icon,
  showFeedbackIcon = true,
}) => {
  const feedbackClasses = getFeedbackClasses(selected, feedback);

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        // Base styles
        'w-full text-left rounded-lg border-2 transition-all duration-200',
        variantClasses[variant],

        // Feedback-based styles
        feedbackClasses,

        // Disabled styles
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',

        // Focus styles
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-detective-orange',

        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3 flex-1">
          {icon && (
            <div className="mt-0.5 flex-shrink-0">
              {icon}
            </div>
          )}
          <span className="flex-1">{children}</span>
        </div>

        {/* Feedback icon */}
        {showFeedbackIcon && selected && feedback && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="flex-shrink-0 ml-2"
          >
            {feedback === 'correct' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </motion.div>
        )}
      </div>
    </motion.button>
  );
};

export default OptionButton;
