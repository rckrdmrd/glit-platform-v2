/**
 * Types for Verdadero/Falso (True/False) Exercise
 * Module 1 - Exercise 2
 */

export interface VerdaderoFalsoStatement {
  id: string;
  statement: string;
  correctAnswer: boolean;
  explanation?: string;
  userAnswer?: boolean | null;
}

export interface VerdaderoFalsoData {
  id: string;
  title: string;
  description: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  estimatedTime: number;
  topic: string;
  hints: Array<{
    id: string;
    text: string;
    cost: number;
  }>;
  statements: VerdaderoFalsoStatement[];
  contextText?: string;
}

export interface VerdaderoFalsoExerciseProps {
  exercise: VerdaderoFalsoData;
  onComplete?: () => void;
  onProgressUpdate?: (progress: any) => void;
}
