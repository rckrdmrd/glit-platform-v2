export interface Variable {
  id: string;
  name: string;
  type: 'independent' | 'dependent' | 'controlled';
  description: string;
  unit?: string;
}

export interface Hypothesis {
  id: string;
  statement: string;
  variables: Variable[];
  prediction: string;
  reasoning: string;
}

export interface HypothesisExercise {
  id: string;
  title: string;
  context: string;
  scientificQuestion: string;
  availableVariables: Variable[];
  difficulty: 'facil' | 'medio' | 'dificil' | 'experto';
}

export interface HypothesisProgress {
  exerciseId: string;
  hypothesis: Hypothesis | null;
  validationResult: any | null;
  score: number;
  attempts: number;
}
