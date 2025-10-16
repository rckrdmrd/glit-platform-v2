import React from 'react';
import { cn } from '@shared/utils/cn';

export interface InputDetectiveProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success' | 'warning';
}

export const InputDetective: React.FC<InputDetectiveProps> = ({
  label,
  error,
  success,
  helperText,
  icon,
  size = 'md',
  variant = 'default',
  className,
  ...props
}) => {
  const getSizeClasses = () => {
    const sizes = {
      sm: 'py-2 px-3 text-sm',
      md: 'py-3 px-4 text-base',
      lg: 'py-4 px-5 text-lg',
    };
    return sizes[size];
  };

  const getVariantClasses = () => {
    if (error || variant === 'error') {
      return 'border-red-500 focus:border-red-500 focus:ring-red-500';
    }
    if (success || variant === 'success') {
      return 'border-green-500 focus:border-green-500 focus:ring-green-500';
    }
    if (variant === 'warning') {
      return 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500';
    }
    return 'border-gray-300 focus:border-orange-500 focus:ring-orange-500';
  };

  return (
    <div className="w-full">
      {label && (
        <label className="text-detective-body mb-2 block font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-detective-text-secondary">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={cn(
            'w-full border-2 rounded-lg outline-none transition-all',
            'focus:ring-2 focus:ring-opacity-20',
            getSizeClasses(),
            getVariantClasses(),
            icon && 'pl-10',
            className
          )}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
      {success && !error && (
        <p className="text-green-500 text-sm mt-1">
          {success}
        </p>
      )}
      {helperText && !error && !success && (
        <p className="text-detective-text-secondary text-sm mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};
