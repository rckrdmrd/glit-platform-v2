/**
 * CompletionModal Component
 * Displays exercise completion with XP/ML Coins animations, achievements, and next steps
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import {
  Trophy,
  Star,
  Coins,
  RotateCcw,
  ChevronRight,
  ArrowLeft,
  Award,
  Target,
  Clock,
  Zap,
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface CompletionModalProps {
  isOpen: boolean;
  success: boolean;
  score: number;
  maxScore: number;
  xpGained: number;
  mlCoinsGained: number;
  timeSpent: number;
  hintsUsed: number;
  achievements?: Achievement[];
  moduleId: string;
  onClose: () => void;
  onRetry: () => void;
  onNextExercise?: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  success,
  score,
  maxScore,
  xpGained,
  mlCoinsGained,
  timeSpent,
  hintsUsed,
  achievements = [],
  moduleId,
  onClose,
  onRetry,
  onNextExercise,
}) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedXP, setAnimatedXP] = useState(0);
  const [animatedCoins, setAnimatedCoins] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && success) {
      setShowConfetti(true);

      // Animate XP counter
      const xpInterval = setInterval(() => {
        setAnimatedXP((prev) => {
          if (prev >= xpGained) {
            clearInterval(xpInterval);
            return xpGained;
          }
          return prev + Math.ceil(xpGained / 30);
        });
      }, 30);

      // Animate Coins counter
      const coinsInterval = setInterval(() => {
        setAnimatedCoins((prev) => {
          if (prev >= mlCoinsGained) {
            clearInterval(coinsInterval);
            return mlCoinsGained;
          }
          return prev + Math.ceil(mlCoinsGained / 30);
        });
      }, 30);

      // Stop confetti after 5 seconds
      const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

      return () => {
        clearInterval(xpInterval);
        clearInterval(coinsInterval);
        clearTimeout(confettiTimer);
      };
    } else {
      setAnimatedXP(0);
      setAnimatedCoins(0);
      setShowConfetti(false);
    }
  }, [isOpen, success, xpGained, mlCoinsGained]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScorePercentage = () => Math.round((score / maxScore) * 100);

  const getPerformanceMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return '¡Excelente trabajo!';
    if (percentage >= 75) return '¡Muy bien hecho!';
    if (percentage >= 60) return '¡Buen trabajo!';
    if (percentage >= 50) return 'Aprobado';
    return 'Sigue intentando';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-purple-500 to-pink-500';
      case 'epic':
        return 'from-purple-500 to-indigo-500';
      case 'rare':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Confetti */}
        {showConfetti && success && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
          />
        )}

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative bg-white dark:bg-gray-800 rounded-detective shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div
            className={`p-8 rounded-t-detective ${
              success
                ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                : 'bg-gradient-to-br from-orange-500 to-red-600'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                {success ? (
                  <Trophy className="w-12 h-12 text-white" />
                ) : (
                  <Target className="w-12 h-12 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {success ? '¡Ejercicio Completado!' : 'Ejercicio Enviado'}
              </h2>
              <p className="text-white/90 text-lg">{getPerformanceMessage()}</p>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Score Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="relative inline-block">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                    className="text-gray-200"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 70 * (1 - score / maxScore),
                    }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className={success ? 'text-green-500' : 'text-orange-500'}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-detective-text">{score}</span>
                  <span className="text-sm text-detective-text-secondary">/ {maxScore}</span>
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-detective-text">
                {getScorePercentage()}%
              </p>
            </motion.div>

            {/* Rewards */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4"
              >
                {/* XP Gained */}
                <div className="bg-gradient-to-br from-detective-orange to-orange-600 rounded-detective p-6 text-white text-center">
                  <Star className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm opacity-90 mb-1">XP Ganado</p>
                  <motion.p
                    className="text-3xl font-bold"
                    key={animatedXP}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    +{animatedXP}
                  </motion.p>
                </div>

                {/* ML Coins Gained */}
                <div className="bg-gradient-to-br from-detective-gold to-yellow-600 rounded-detective p-6 text-white text-center">
                  <Coins className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm opacity-90 mb-1">ML Coins</p>
                  <motion.p
                    className="text-3xl font-bold"
                    key={animatedCoins}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    +{animatedCoins}
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-detective p-6 space-y-3"
            >
              <h3 className="font-bold text-detective-text mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-detective-orange" />
                Estadísticas del Ejercicio
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-detective-blue" />
                  <span className="text-detective-text-secondary">Tiempo:</span>
                  <span className="font-semibold text-detective-text ml-auto">
                    {formatTime(timeSpent)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-detective-gold" />
                  <span className="text-detective-text-secondary">Pistas usadas:</span>
                  <span className="font-semibold text-detective-text ml-auto">{hintsUsed}</span>
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            {achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <h3 className="font-bold text-detective-text flex items-center gap-2">
                  <Award className="w-5 h-5 text-detective-gold" />
                  ¡Logros Desbloqueados!
                </h3>
                <div className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`bg-gradient-to-r ${getRarityColor(
                        achievement.rarity
                      )} p-4 rounded-detective text-white`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div>
                          <p className="font-bold">{achievement.name}</p>
                          <p className="text-sm opacity-90">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <DetectiveButton
                variant="secondary"
                onClick={() => navigate(`/module/${moduleId}`)}
                icon={<ArrowLeft className="w-4 h-4" />}
                className="flex-1"
              >
                Volver al Módulo
              </DetectiveButton>

              {!success && (
                <DetectiveButton
                  variant="blue"
                  onClick={onRetry}
                  icon={<RotateCcw className="w-4 h-4" />}
                  className="flex-1"
                >
                  Reintentar
                </DetectiveButton>
              )}

              {onNextExercise && (
                <DetectiveButton
                  variant="primary"
                  onClick={onNextExercise}
                  icon={<ChevronRight className="w-4 h-4" />}
                  className="flex-1"
                >
                  Siguiente Ejercicio
                </DetectiveButton>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
