import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';
import { cn } from '@shared/utils/cn';

export interface TimerWidgetProps {
  initialTime: number; // in seconds
  onTimeUp?: () => void;
  countDown?: boolean;
  showWarning?: boolean;
  warningThreshold?: number; // seconds
  className?: string;
  autoStart?: boolean;
}

export const TimerWidget: React.FC<TimerWidgetProps> = ({
  initialTime,
  onTimeUp,
  countDown = false,
  showWarning = true,
  warningThreshold = 30,
  className = '',
  autoStart = true
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (countDown) {
          if (prev <= 1) {
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        } else {
          return prev + 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, countDown, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isWarning = countDown && showWarning && timeLeft <= warningThreshold && timeLeft > 0;

  const timerLabel = `Tiempo ${countDown ? 'restante' : 'transcurrido'}: ${formatTime(timeLeft)}`;

  return (
    <motion.div
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={timerLabel}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold',
        isWarning ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700',
        className
      )}
    >
      {isWarning ? (
        <AlertCircle className="w-5 h-5 animate-pulse" aria-hidden="true" />
      ) : (
        <Clock className="w-5 h-5" aria-hidden="true" />
      )}
      <span aria-hidden="true">{formatTime(timeLeft)}</span>
      {isWarning && <span className="sr-only">Tiempo casi agotado</span>}
    </motion.div>
  );
};
