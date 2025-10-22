import React from 'react';
import { cn } from '@shared/utils/cn';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export type StatusType = 'active' | 'inactive' | 'suspended';

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
}

const statusStyles: Record<StatusType, {
  bg: string;
  text: string;
  border: string;
  icon: React.ElementType;
  label: string;
}> = {
  active: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    icon: CheckCircle2,
    label: 'Activo',
  },
  inactive: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    icon: XCircle,
    label: 'Inactivo',
  },
  suspended: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: AlertCircle,
    label: 'Suspendido',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showIcon = true,
}) => {
  const style = statusStyles[status];
  const Icon = style.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        style.bg,
        style.text,
        style.border,
        className
      )}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{style.label}</span>
    </span>
  );
};
