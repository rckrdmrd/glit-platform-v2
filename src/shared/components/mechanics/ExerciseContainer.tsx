import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { cn } from '@shared/utils/cn';
import { BaseExercise } from './mechanicsTypes';
import { Book, Clock, Award } from 'lucide-react';

export interface ExerciseContainerProps {
  exercise: BaseExercise;
  children: React.ReactNode;
  onComplete?: () => void;
  showHeader?: boolean;
  className?: string;
}

export const ExerciseContainer: React.FC<ExerciseContainerProps> = ({
  exercise,
  children,
  onComplete,
  showHeader = true,
  className
}) => {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!isStarted) {
      setIsStarted(true);
    }
  }, [isStarted]);

  const difficultyColors = {
    facil: 'text-green-600 bg-green-100',
    medio: 'text-yellow-600 bg-yellow-100',
    dificil: 'text-orange-600 bg-orange-100',
    experto: 'text-red-600 bg-red-100'
  };

  const difficultyLabels = {
    facil: 'Fácil',
    medio: 'Medio',
    dificil: 'Difícil',
    experto: 'Experto'
  };

  return (
    <div className={cn('min-h-screen bg-detective-gradient py-8', className)}>
      <div className="detective-container">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <DetectiveCard variant="gold" padding="md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Book className="w-6 h-6 text-detective-orange" />
                    <h1 className="text-detective-title">{exercise.title}</h1>
                  </div>
                  <p className="text-detective-small mb-3">{exercise.description}</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Award className={cn('w-4 h-4')} />
                      <span className={cn('px-3 py-1 rounded-full text-sm font-medium', difficultyColors[exercise.difficulty])}>
                        {difficultyLabels[exercise.difficulty]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-detective-small">
                      <Clock className="w-4 h-4" />
                      <span>{Math.ceil(exercise.estimatedTime / 60)} min</span>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {exercise.topic}
                    </div>
                  </div>
                </div>
              </div>
            </DetectiveCard>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
