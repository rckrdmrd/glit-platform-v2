import { BaseExercise } from '@shared/components/mechanics/mechanicsTypes';

export interface InfoCard {
  id: string;
  title: string;
  content: string;
  position: { x: number; y: number };
  icon: string;
  revealed: boolean;
}

export interface InfografiaInteractivaData extends BaseExercise {
  cards: InfoCard[];
  backgroundImage?: string;
}
