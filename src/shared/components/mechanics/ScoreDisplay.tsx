import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Coins, Star } from 'lucide-react';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';

export interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  mlCoins?: number;
  xp?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  maxScore = 100,
  mlCoins,
  xp,
  className = '',
  size = 'md'
}) => {
  const percentage = (score / maxScore) * 100;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <DetectiveCard variant="gold" padding="sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trophy className={`${iconSizes[size]} text-yellow-500`} />
            <div className={sizeClasses[size]}>
              <span className="font-bold text-detective-text">{score}</span>
              <span className="text-detective-text-secondary">/{maxScore}</span>
            </div>
          </div>

          {mlCoins !== undefined && (
            <div className="flex items-center gap-2">
              <Coins className={`${iconSizes[size]} text-yellow-600`} />
              <span className={`font-bold text-yellow-700 ${sizeClasses[size]}`}>
                +{mlCoins} ML
              </span>
            </div>
          )}

          {xp !== undefined && (
            <div className="flex items-center gap-2">
              <Star className={`${iconSizes[size]} text-blue-500`} />
              <span className={`font-bold text-blue-700 ${sizeClasses[size]}`}>
                +{xp} XP
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="progress-xp mt-3">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </DetectiveCard>
    </motion.div>
  );
};
