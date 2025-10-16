import { BaseExercise } from '@shared/components/mechanics/mechanicsTypes';

export interface HypertextNode {
  id: string;
  title: string;
  content: string;
  links: { targetId: string; label: string }[];
}

export interface NavegacionHipertextualData extends BaseExercise {
  nodes: HypertextNode[];
  startNodeId: string;
  targetNodeId: string;
}
