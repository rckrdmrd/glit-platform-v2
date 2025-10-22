// ============================================
// SHARED TYPES FOR ALL EDUCATIONAL MECHANICS
// ============================================

export type MayaRank = 'detective' | 'sargento' | 'teniente' | 'capitan' | 'comisario';

export type DifficultyLevel = 'facil' | 'medio' | 'dificil' | 'experto';

export interface ScoreResult {
  baseScore: number;
  timeBonus: number;
  accuracyBonus: number;
  totalScore: number;
  mlCoins: number;
  xpGained: number;
}

export interface ExerciseAttempt {
  exerciseId: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  answers: Record<string, unknown>;
  correctAnswers: number;
  totalQuestions: number;
  hintsUsed: number;
  difficulty: DifficultyLevel;
}

export interface Hint {
  id: string;
  text: string;
  cost: number; // ML Coins cost
}

export interface FeedbackData {
  type: 'success' | 'error' | 'info' | 'partial';
  title: string;
  message: string;
  score?: ScoreResult;
  showConfetti?: boolean;
}

export interface BaseExercise {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: number; // in seconds
  topic: string;
  hints: Hint[];
}

// API Integration Points
export const calculateScore = async (attempt: ExerciseAttempt): Promise<ScoreResult> => {
  try {
    // Import mechanicsAPI to submit exercise
    const { submitExercise } = await import('@/features/mechanics/shared/api/mechanicsAPI');

    const timeSpent = attempt.endTime && attempt.startTime
      ? Math.floor((attempt.endTime.getTime() - attempt.startTime.getTime()) / 1000)
      : 0;

    console.log('[calculateScore] attempt.answers:', attempt.answers);

    // Submit to real backend API
    const result = await submitExercise({
      mechanicId: attempt.exerciseId,
      answers: attempt.answers,
      timeSpent,
      hintsUsed: attempt.hintsUsed,
      metadata: {
        startedAt: attempt.startTime,
      }
    });

    // Transform SubmissionResponse to ScoreResult
    const accuracy = result.totalQuestions > 0
      ? result.correctAnswers / result.totalQuestions
      : 0;

    const baseScore = Math.floor(accuracy * 100);
    const timeBonus = result.bonuses?.speedBonus ? 30 : 0;
    const accuracyBonus = result.bonuses?.perfectScore ? 50 : (accuracy >= 0.7 ? 25 : 0);

    return {
      baseScore,
      timeBonus,
      accuracyBonus,
      totalScore: result.score,
      mlCoins: result.mlCoinsEarned,
      xpGained: result.xpEarned
    };
  } catch (error) {
    console.error('[calculateScore] Error submitting exercise:', error);

    // Fallback to mock calculation if API fails
    const timeSpent = attempt.endTime && attempt.startTime
      ? (attempt.endTime.getTime() - attempt.startTime.getTime()) / 1000
      : 0;

    const accuracy = attempt.totalQuestions > 0
      ? attempt.correctAnswers / attempt.totalQuestions
      : 0;

    const baseScore = Math.floor(accuracy * 100);
    const timeBonus = Math.max(0, Math.floor((300 - timeSpent) / 10));
    const accuracyBonus = accuracy >= 0.9 ? 50 : accuracy >= 0.7 ? 25 : 0;
    const hintPenalty = attempt.hintsUsed * 5;

    const totalScore = Math.max(0, baseScore + timeBonus + accuracyBonus - hintPenalty);
    const mlCoins = Math.floor(totalScore / 10);
    const xpGained = Math.floor(totalScore / 2);

    return {
      baseScore,
      timeBonus,
      accuracyBonus,
      totalScore,
      mlCoins,
      xpGained
    };
  }
};

export const saveProgress = async (exerciseId: string, progress: unknown): Promise<void> => {
  // Mock implementation - will connect to backend later
  localStorage.setItem(`exercise_${exerciseId}_progress`, JSON.stringify(progress));
};

export const loadProgress = async (exerciseId: string): Promise<unknown | null> => {
  // Mock implementation - will connect to backend later
  const saved = localStorage.getItem(`exercise_${exerciseId}_progress`);
  return saved ? JSON.parse(saved) : null;
};
