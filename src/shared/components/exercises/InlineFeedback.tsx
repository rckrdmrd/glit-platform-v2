import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, Lightbulb } from 'lucide-react';
import { cn } from '@shared/utils/cn';

export interface InlineFeedbackProps {
  type: 'correct' | 'incorrect' | 'info' | 'hint';
  message: string;
  show?: boolean;
  className?: string;
  onClose?: () => void;
}

const typeConfig = {
  correct: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: CheckCircle,
    iconColor: 'text-green-600',
  },
  incorrect: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: XCircle,
    iconColor: 'text-red-600',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: Info,
    iconColor: 'text-blue-600',
  },
  hint: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: Lightbulb,
    iconColor: 'text-yellow-600',
  },
};

export const InlineFeedback: React.FC<InlineFeedbackProps> = ({
  type,
  message,
  show = true,
  className,
  onClose,
}) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: '0.5rem' }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'rounded-lg border overflow-hidden',
            config.bg,
            config.border,
            className
          )}
        >
          <div className="p-3">
            <div className="flex items-start gap-2">
              <Icon className={cn('w-4 h-4 mt-0.5 flex-shrink-0', config.iconColor)} />
              <p className={cn('text-sm flex-1', config.text)}>
                {message}
              </p>
              {onClose && (
                <button
                  onClick={onClose}
                  className={cn(
                    'flex-shrink-0 hover:opacity-70 transition-opacity',
                    config.text
                  )}
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InlineFeedback;
