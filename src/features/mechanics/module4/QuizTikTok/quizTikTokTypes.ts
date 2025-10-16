import { BaseExercise } from '@shared/components/mechanics/mechanicsTypes';

export interface TikTokQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  backgroundVideo?: string;
  backgroundColor?: string;
}

export interface QuizTikTokData extends BaseExercise {
  questions: TikTokQuestion[];
}
