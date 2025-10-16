export interface Story {
  id: string;
  title: string;
  beginning: string;
  context: string;
  difficulty: 'facil' | 'medio' | 'dificil' | 'experto';
}

export interface Prediction {
  id: string;
  storyId: string;
  userPrediction: string;
  aiContinuation: string | null;
  accuracy: number;
  feedback: string;
}

export interface NarrativeProgress {
  storyId: string;
  predictions: Prediction[];
  score: number;
}
