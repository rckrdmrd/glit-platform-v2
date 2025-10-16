import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, Trophy, Sparkles } from 'lucide-react';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { ScoreDisplay } from './ScoreDisplay';
import { FeedbackData } from './mechanicsTypes';

export interface FeedbackModalProps {
  isOpen: boolean;
  feedback: FeedbackData;
  onClose: () => void;
  onRetry?: () => void;
  onNext?: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  feedback,
  onClose,
  onRetry,
  onNext
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && feedback.showConfetti) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, feedback.showConfetti]);

  const getIcon = () => {
    switch (feedback.type) {
      case 'success':
        return <CheckCircle2 className="w-16 h-16 text-green-500" />;
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500" />;
      case 'info':
        return <Info className="w-16 h-16 text-blue-500" />;
    }
  };

  const getColor = () => {
    switch (feedback.type) {
      case 'success':
        return 'text-green-700';
      case 'error':
        return 'text-red-700';
      case 'info':
        return 'text-blue-700';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Confetti Effect */}
          {showConfetti && (
            <div className="fixed inset-0 z-50 pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: '50vw',
                    y: '50vh',
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: [0, 1, 0],
                    rotate: Math.random() * 360
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeOut'
                  }}
                  className="absolute w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"
                />
              ))}
            </div>
          )}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
          >
            <DetectiveCard variant="gold" padding="lg">
              <div className="text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="flex justify-center mb-4"
                >
                  {getIcon()}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`text-2xl font-bold mb-2 ${getColor()}`}
                >
                  {feedback.title}
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-detective-text mb-6"
                >
                  {feedback.message}
                </motion.p>

                {/* Score Display */}
                {feedback.score && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    <ScoreDisplay
                      score={feedback.score.totalScore}
                      maxScore={100}
                      mlCoins={feedback.score.mlCoins}
                      xp={feedback.score.xpGained}
                      size="lg"
                    />

                    {/* Score Breakdown */}
                    <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-blue-600 font-semibold">Base</div>
                        <div className="text-lg font-bold text-blue-800">
                          {feedback.score.baseScore}
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-green-600 font-semibold">Tiempo</div>
                        <div className="text-lg font-bold text-green-800">
                          +{feedback.score.timeBonus}
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-purple-600 font-semibold">Precisión</div>
                        <div className="text-lg font-bold text-purple-800">
                          +{feedback.score.accuracyBonus}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  {feedback.type === 'success' && onNext && (
                    <DetectiveButton
                      variant="gold"
                      size="lg"
                      onClick={onNext}
                      icon={<Sparkles className="w-5 h-5" />}
                      className="flex-1"
                    >
                      Siguiente
                    </DetectiveButton>
                  )}

                  {feedback.type === 'error' && onRetry && (
                    <DetectiveButton
                      variant="primary"
                      size="lg"
                      onClick={onRetry}
                      icon={<Trophy className="w-5 h-5" />}
                      className="flex-1"
                    >
                      Reintentar
                    </DetectiveButton>
                  )}

                  <DetectiveButton
                    variant={feedback.type === 'success' ? 'blue' : 'primary'}
                    size="lg"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cerrar
                  </DetectiveButton>
                </motion.div>
              </div>
            </DetectiveCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
