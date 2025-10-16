import React from 'react';
import { cn } from '@shared/utils/cn';

export interface DetectiveContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export const DetectiveContainer: React.FC<DetectiveContainerProps> = ({
  children,
  className,
  padding = true,
}) => {
  return (
    <div
      className={cn(
        'detective-container',
        padding && 'py-8',
        className
      )}
    >
      {children}
    </div>
  );
};
