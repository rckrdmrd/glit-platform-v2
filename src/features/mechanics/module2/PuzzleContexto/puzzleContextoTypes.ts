export interface ContextPiece {
  id: string;
  content: string;
  correctPosition: number;
  category: 'historical' | 'scientific' | 'personal' | 'social';
}

export interface PuzzleExercise {
  id: string;
  title: string;
  description: string;
  pieces: ContextPiece[];
  difficulty: 'facil' | 'medio' | 'dificil' | 'experto';
}
