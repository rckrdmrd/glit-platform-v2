export interface Opinion {
  id: string;
  author: string;
  stance: 'a_favor' | 'en_contra' | 'neutral';
  text: string;
  arguments: string[];
  evidence: string[];
}

export interface TribunalExercise {
  id: string;
  topic: string;
  question: string;
  opinions: Opinion[];
}
