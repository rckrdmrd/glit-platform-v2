import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@shared/utils/cn';

export interface DropZoneProps {
  id: string;
  children?: React.ReactNode;
  onDrop?: (itemId: string, zoneId: string) => void;
  accepts?: string[];
  isEmpty?: boolean;
  variant?: 'default' | 'timeline' | 'matching';
  className?: string;
  minHeight?: string;
  disabled?: boolean;
}

const variantClasses = {
  default: {
    base: 'bg-white border-dashed border-gray-300',
    hover: 'border-blue-400 bg-blue-50 transform scale-105',
    empty: 'bg-gray-50',
  },
  timeline: {
    base: 'bg-white border-2 border-gray-300',
    hover: 'border-blue-400 bg-blue-50',
    empty: 'bg-gray-50',
  },
  matching: {
    base: 'bg-white border-2 border-orange-200',
    hover: 'border-orange-400 bg-orange-50',
    empty: 'bg-orange-50/30',
  },
};

export const DropZone: React.FC<DropZoneProps> = ({
  id,
  children,
  onDrop,
  accepts,
  isEmpty = true,
  variant = 'default',
  className,
  minHeight = '60px',
  disabled = false,
}) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (!isOver) {
      setIsOver(true);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;

    // Only set isOver to false if we're leaving the dropzone itself,
    // not when entering a child element
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (
      x < rect.left ||
      x >= rect.right ||
      y < rect.top ||
      y >= rect.bottom
    ) {
      setIsOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;

    e.preventDefault();
    setIsOver(false);

    const itemId = e.dataTransfer.getData('text/plain');

    // Check if item is accepted
    if (accepts && accepts.length > 0) {
      // In a real implementation, you'd check the item type against accepts
      // For now, we'll accept all items
    }

    if (onDrop && itemId) {
      onDrop(itemId, id);
    }
  };

  const variantStyle = variantClasses[variant];

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{ minHeight }}
      className={cn(
        // Base styles
        'rounded-lg transition-all duration-200',
        'flex items-center justify-center',
        'p-2',

        // Variant styles
        variantStyle.base,
        isEmpty && variantStyle.empty,

        // Hover/over styles
        isOver && !disabled && variantStyle.hover,

        // Disabled styles
        disabled && 'opacity-50 cursor-not-allowed',

        className
      )}
    >
      <AnimatePresence mode="wait">
        {isEmpty && !children ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-400 text-sm text-center"
          >
            {isOver ? 'Suelta aquí' : 'Arrastra un elemento aquí'}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DropZone;
