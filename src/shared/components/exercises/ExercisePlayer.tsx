/**
 * ExercisePlayer Component
 *
 * Componente completo que integra:
 * - ExerciseFactory para renderizar el ejercicio
 * - useExerciseAttempts para gestión de intentos
 * - Sistema de scoring y feedback
 * - TODO de configuración desde BD
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle, Trophy, Lightbulb, Zap } from 'lucide-react';
import type { Exercise } from '@shared/types';
import { createExercise, type ExerciseResult } from '@shared/factories/ExerciseFactory';
import { useExerciseAttempts } from '@shared/hooks/useExerciseAttempts';

// ============================================================================
// TYPES
// ============================================================================

export interface ExercisePlayerProps {
  exercise: Exercise; // ALL config from DB
  userId: string;
  userRango?: string;
  userMLCoins?: number;
  onExerciseComplete?: (result: ExerciseResult) => void;
  onBack?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ExercisePlayer({
  exercise,
  userId,
  userRango,
  userMLCoins = 0,
  onExerciseComplete,
  onBack,
}: ExercisePlayerProps) {
  // ========== Exercise Attempts Hook (configurable from DB) ==========
  const {
    currentAttempt,
    maxAttempts,
    remainingAttempts,
    canRetry,
    isLastAttempt,
    hasReachedLimit,
    canAttemptNow,
    nextRetryAvailable,
    submitAttempt,
    getBestScore,
    getAverageScore,
    isLoading: attemptsLoading,
    error: attemptsError,
  } = useExerciseAttempts({
    exercise,
    userId,
    onMaxAttemptsReached: () => {
      setShowMaxAttemptsModal(true);
    },
    onRetryDelayActive: (nextAvailable) => {
      setRetryDelayEnd(nextAvailable);
    },
  });

  // ========== State ==========
  const [exerciseComponent, setExerciseComponent] = useState<React.ReactElement | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastResult, setLastResult] = useState<ExerciseResult | null>(null);
  const [showMaxAttemptsModal, setShowMaxAttemptsModal] = useState(false);
  const [retryDelayEnd, setRetryDelayEnd] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [comodinesUsed, setComodinesUsed] = useState<string[]>([]);

  // ========== Configuration from DB (NO hardcoded values) ==========
  const maxPoints = exercise.max_points ?? 100;
  const passingScore = exercise.passing_score ?? 70;
  const xpReward = exercise.xp_reward ?? 20;
  const mlCoinsReward = exercise.ml_coins_reward ?? 5;
  const bonusMultiplier = exercise.bonus_multiplier ?? 1.0;
  const timeLimit = exercise.time_limit_minutes;
  const enableHints = exercise.enable_hints ?? true;
  const hints = exercise.hints || [];
  const hintCost = exercise.hint_cost_ml_coins ?? 5;
  const comodinesAllowed = exercise.comodines_allowed || [];
  const comodinesConfig = exercise.comodines_config || {};

  // ========== Load Exercise Component ==========
  useEffect(() => {
    const loadExercise = async () => {
      try {
        const component = await createExercise(
          exercise,
          handleExerciseComplete
        );
        setExerciseComponent(component);
      } catch (error) {
        console.error('Error loading exercise:', error);
      }
    };

    loadExercise();
  }, [exercise.id]);

  // ========== Timer for Time Limit ==========
  useEffect(() => {
    if (!timeLimit || hasReachedLimit) return;

    setTimeRemaining(timeLimit * 60); // Convert to seconds

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          // Auto-submit with 0 score on timeout
          handleExerciseComplete({
            exerciseId: exercise.id,
            score: 0,
            maxScore: maxPoints,
            timeSpent: timeLimit * 60,
            isCorrect: false,
            hintsUsed,
            comodinesUsed,
            submittedAnswers: null,
            xpEarned: 0,
            mlCoinsEarned: 0,
            metadata: { timedOut: true },
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLimit, hasReachedLimit]);

  // ========== Handle Exercise Complete ==========
  const handleExerciseComplete = async (result: ExerciseResult) => {
    // Submit attempt (enforces max_attempts, retry_delay from DB)
    const success = await submitAttempt(result);

    if (success) {
      setLastResult(result);
      setShowFeedback(true);
      onExerciseComplete?.(result);
    }
  };

  // ========== Handle Hint Request ==========
  const handleUseHint = () => {
    if (!enableHints || hintsUsed >= hints.length) return;
    if (userMLCoins < hintCost) {
      alert(`Necesitas ${hintCost} ML coins para usar una pista. Tienes ${userMLCoins}.`);
      return;
    }

    setHintsUsed((prev) => prev + 1);
    // TODO: Deduct ML coins via API
  };

  // ========== Handle Comodin Request ==========
  const handleUseComodin = (comodinType: string) => {
    if (!comodinesAllowed.includes(comodinType as any)) return;

    const config = comodinesConfig[comodinType];
    if (!config?.enabled) return;
    if (userMLCoins < config.cost) {
      alert(`Necesitas ${config.cost} ML coins para usar ${comodinType}.`);
      return;
    }

    setComodinesUsed((prev) => [...prev, comodinType]);
    // TODO: Deduct ML coins via API
    // TODO: Apply comodin effect
  };

  // ========== Format Time ==========
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ========== Render Loading ==========
  if (attemptsLoading || !exerciseComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-detective-orange mx-auto mb-4"></div>
          <p className="text-detective-text-secondary">Cargando ejercicio...</p>
        </div>
      </div>
    );
  }

  // ========== Render Error ==========
  if (attemptsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-red-800 mb-2 text-center">Error</h3>
          <p className="text-sm text-red-700 text-center">{attemptsError}</p>
        </div>
      </div>
    );
  }

  // ========== Render Max Attempts Reached ==========
  if (hasReachedLimit) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-yellow-800 mb-2 text-center">
            Límite de Intentos Alcanzado
          </h3>
          <p className="text-sm text-yellow-700 text-center mb-4">
            Has alcanzado el límite de {maxAttempts} intento{maxAttempts > 1 ? 's' : ''} para este ejercicio.
          </p>
          <div className="bg-white rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700">Mejor puntuación: {getBestScore()} / {maxPoints}</p>
            <p className="text-sm text-gray-600">Puntuación promedio: {getAverageScore()} / {maxPoints}</p>
          </div>
          {onBack && (
            <button onClick={onBack} className="btn-detective w-full">
              Volver a Módulos
            </button>
          )}
        </div>
      </div>
    );
  }

  // ========== Render Retry Delay ==========
  if (!canAttemptNow && retryDelayEnd) {
    const now = new Date();
    const delay = Math.ceil((retryDelayEnd.getTime() - now.getTime()) / 1000);

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-8 max-w-md">
          <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-800 mb-2 text-center">
            Tiempo de Espera
          </h3>
          <p className="text-sm text-blue-700 text-center mb-4">
            Debes esperar antes de realizar otro intento.
          </p>
          <div className="bg-white rounded-lg p-4 mb-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{formatTime(delay)}</p>
            <p className="text-sm text-gray-600">hasta el próximo intento</p>
          </div>
          {onBack && (
            <button onClick={onBack} className="btn-detective w-full">
              Volver a Módulos
            </button>
          )}
        </div>
      </div>
    );
  }

  // ========== Main Render ==========
  return (
    <div className="min-h-screen bg-detective-bg p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-detective-text">{exercise.title}</h2>
              {exercise.subtitle && (
                <p className="text-sm text-detective-text-secondary">{exercise.subtitle}</p>
              )}
            </div>
            {onBack && (
              <button onClick={onBack} className="text-detective-text-secondary hover:text-detective-text">
                ← Volver
              </button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Attempt Counter */}
            <div className="bg-detective-bg-secondary rounded-lg p-3">
              <p className="text-xs text-detective-text-secondary">Intento</p>
              <p className="text-lg font-bold text-detective-text">
                {currentAttempt + 1} / {maxAttempts}
              </p>
            </div>

            {/* Remaining Attempts */}
            <div className="bg-detective-bg-secondary rounded-lg p-3">
              <p className="text-xs text-detective-text-secondary">Restantes</p>
              <p className="text-lg font-bold text-detective-orange">
                {remainingAttempts}
              </p>
            </div>

            {/* Time Limit */}
            {timeLimit && timeRemaining !== null && (
              <div className={`rounded-lg p-3 ${timeRemaining < 60 ? 'bg-red-100' : 'bg-blue-100'}`}>
                <p className="text-xs text-detective-text-secondary">Tiempo</p>
                <p className={`text-lg font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-blue-600'}`}>
                  {formatTime(timeRemaining)}
                </p>
              </div>
            )}

            {/* Rewards */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-3">
              <p className="text-xs text-detective-text-secondary">Recompensa</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-orange-600">{xpReward} XP</span>
                <span className="text-xs text-gray-500">|</span>
                <span className="text-sm font-bold text-yellow-600">{mlCoinsReward} ML</span>
              </div>
            </div>
          </div>

          {/* Last Attempt Warning */}
          {isLastAttempt && !hasReachedLimit && (
            <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-sm font-semibold text-yellow-800">
                  ¡Último intento! Asegúrate de revisar tu respuesta antes de enviar.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Hints Section */}
        {enableHints && hints.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-detective-text flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Pistas Disponibles ({hints.length - hintsUsed} restantes)
              </h3>
              <button
                onClick={handleUseHint}
                disabled={hintsUsed >= hints.length || userMLCoins < hintCost}
                className="btn-detective text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Usar Pista ({hintCost} ML)
              </button>
            </div>
            {hintsUsed > 0 && (
              <div className="space-y-2">
                {hints.slice(0, hintsUsed).map((hint, index) => (
                  <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                    <p className="text-sm text-yellow-800">💡 {hint}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Comodines Section */}
        {comodinesAllowed.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-detective-text flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-purple-500" />
              Comodines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {comodinesAllowed.map((comodin) => {
                const config = comodinesConfig[comodin];
                const isUsed = comodinesUsed.includes(comodin);
                const canUse = config?.enabled && userMLCoins >= (config?.cost || 0) && !isUsed;

                return (
                  <button
                    key={comodin}
                    onClick={() => handleUseComodin(comodin)}
                    disabled={!canUse}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isUsed
                        ? 'bg-gray-100 border-gray-300 opacity-50'
                        : canUse
                        ? 'bg-purple-50 border-purple-300 hover:bg-purple-100'
                        : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <p className="font-semibold text-sm capitalize">{comodin.replace('_', ' ')}</p>
                    <p className="text-xs text-gray-600">{config?.cost || 0} ML coins</p>
                    {isUsed && <p className="text-xs text-green-600 mt-1">✓ Usado</p>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Exercise Component (from Factory) */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {exerciseComponent}
        </div>

        {/* Feedback Modal */}
        <AnimatePresence>
          {showFeedback && lastResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowFeedback(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  {lastResult.isCorrect ? (
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  ) : (
                    <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                  )}

                  <h3 className="text-2xl font-bold text-detective-text mb-2">
                    {lastResult.isCorrect ? '¡Excelente!' : 'Sigue Intentando'}
                  </h3>

                  <div className="bg-detective-bg rounded-lg p-4 mb-4">
                    <p className="text-4xl font-bold text-detective-orange mb-2">
                      {lastResult.score} / {maxPoints}
                    </p>
                    <p className="text-sm text-detective-text-secondary">
                      {lastResult.score >= passingScore ? '¡Aprobado!' : 'No alcanzaste el puntaje mínimo'}
                    </p>
                  </div>

                  {lastResult.isCorrect && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-3">
                        <Trophy className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-orange-700">+{lastResult.xpEarned} XP</p>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-3">
                        <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                        <p className="text-lg font-bold text-yellow-700">+{lastResult.mlCoinsEarned} ML</p>
                      </div>
                    </div>
                  )}

                  {!lastResult.isCorrect && canRetry && remainingAttempts > 0 && (
                    <p className="text-sm text-detective-text-secondary mb-4">
                      Tienes {remainingAttempts} intento{remainingAttempts > 1 ? 's' : ''} restante{remainingAttempts > 1 ? 's' : ''}
                    </p>
                  )}

                  <button
                    onClick={() => setShowFeedback(false)}
                    className="btn-detective w-full"
                  >
                    {lastResult.isCorrect || !canRetry ? 'Continuar' : 'Intentar de Nuevo'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
