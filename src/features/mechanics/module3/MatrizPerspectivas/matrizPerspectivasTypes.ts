export interface Perspective {
  id: string;
  viewpoint: string;
  arguments: string[];
  counterarguments: string[];
  biases: string[];
}

export interface MatrixExercise {
  id: string;
  topic: string;
  description: string;
  perspectiveCount: number;
}
