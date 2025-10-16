import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@shared/utils/cn';

export interface DetectiveButtonProps {
  variant?: 'primary' | 'secondary' | 'gold' | 'blue' | 'green' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  as?: string;
}

const sizeClasses = {
  sm: 'py-1 px-3 text-detective-sm',
  md: 'py-2 px-4 text-detective-base',
  lg: 'py-3 px-6 text-detective-lg',
};

const variantClasses = {
  primary: 'btn-detective',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-2 border-gray-500',
  gold: 'btn-gold',
  blue: 'btn-blue',
  green: 'btn-green',
  purple: 'btn-purple',
};

export const DetectiveButton: React.FC<DetectiveButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  children,
  icon,
  loading = false,
  className,
  type = 'button',
}) => {
  return (
    <motion.button
      type={type}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        'inline-flex items-center justify-center gap-2',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && !loading && icon}
      {children}
    </motion.button>
  );
};
