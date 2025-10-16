import { BaseExercise } from '@shared/components/mechanics/mechanicsTypes';

export interface MemeAnnotation {
  id: string;
  x: number;
  y: number;
  text: string;
  category: 'texto' | 'contexto' | 'humor' | 'critica';
}

export interface AnalisisMemesData extends BaseExercise {
  memeUrl: string;
  memeTitle: string;
  expectedAnnotations: MemeAnnotation[];
}
