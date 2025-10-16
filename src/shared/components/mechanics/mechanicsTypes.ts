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
  type: 'success' | 'error' | 'info';
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

// API Integration Points (Mock)
export const calculateScore = async (attempt: ExerciseAttempt): Promise<ScoreResult> => {
  // Mock implementation - will connect to backend later
  const timeSpent = attempt.endTime && attempt.startTime
    ? (attempt.endTime.getTime() - attempt.startTime.getTime()) / 1000
    : 0;

  const accuracy = attempt.totalQuestions > 0
    ? attempt.correctAnswers / attempt.totalQuestions
    : 0;

  const baseScore = Math.floor(accuracy * 100);
  const timeBonus = Math.max(0, Math.floor((300 - timeSpent) / 10)); // Bonus for speed
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
