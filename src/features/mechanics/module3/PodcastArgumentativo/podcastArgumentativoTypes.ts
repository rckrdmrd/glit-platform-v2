export interface Recording {
  id: string;
  audioBlob: Blob | null;
  transcription: string;
  analysis: any | null;
  duration: number;
}

export interface PodcastExercise {
  id: string;
  topic: string;
  prompt: string;
  timeLimit: number;
}
