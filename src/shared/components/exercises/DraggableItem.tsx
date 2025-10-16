import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@shared/utils/cn';

export interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
  variant?: 'blue' | 'orange' | 'green' | 'purple' | 'gray';
  onDragStart?: (id: string) => void;
  onDragEnd?: () => void;
  disabled?: boolean;
  className?: string;
  isConnected?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses = {
  blue: {
    base: 'bg-blue-100 border-blue-300',
    hover: 'hover:bg-blue-200 hover:border-blue-400',
    connected: 'bg-blue-50 border-blue-300 opacity-60',
  },
  orange: {
    base: 'bg-orange-100 border-orange-300',
    hover: 'hover:bg-orange-200 hover:border-orange-400',
    connected: 'bg-orange-50 border-orange-300 opacity-60',
  },
  green: {
    base: 'bg-green-100 border-green-300',
    hover: 'hover:bg-green-200 hover:border-green-400',
    connected: 'bg-green-50 border-green-300 opacity-60',
  },
  purple: {
    base: 'bg-purple-100 border-purple-300',
    hover: 'hover:bg-purple-200 hover:border-purple-400',
    connected: 'bg-purple-50 border-purple-300 opacity-60',
  },
  gray: {
    base: 'bg-white border-gray-300',
    hover: 'hover:bg-gray-50 hover:border-gray-400',
    connected: 'bg-gray-50 border-gray-300 opacity-60',
  },
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  children,
  variant = 'blue',
  onDragStart,
  onDragEnd,
  disabled = false,
  className,
  isConnected = false,
  size = 'md',
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);

    if (onDragStart) {
      onDragStart(id);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (onDragEnd) {
      onDragEnd();
    }
  };

  const variantStyle = variantClasses[variant];
  const baseClasses = isConnected ? variantStyle.connected : variantStyle.base;

  return (
    <motion.div
      draggable={!disabled && !isConnected}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isDragging ? 0.5 : 1,
        x: 0,
        rotate: isDragging ? 2 : 0,
      }}
      transition={{ delay: 0.1 }}
      whileHover={!disabled && !isConnected ? { scale: 1.02 } : {}}
      className={cn(
        // Base styles
        'rounded-lg border-2 transition-all duration-200',
        sizeClasses[size],
        baseClasses,

        // Hover styles
        !disabled && !isConnected && variantStyle.hover,
        !disabled && !isConnected && 'hover:shadow-md',

        // Cursor styles
        !disabled && !isConnected && 'cursor-move',
        disabled && 'cursor-not-allowed opacity-50',
        isConnected && 'cursor-default',

        // Transform on drag
        isDragging && 'border-blue-400',

        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default DraggableItem;
