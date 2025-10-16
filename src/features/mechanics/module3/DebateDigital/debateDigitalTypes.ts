export interface DebateMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  argumentStrength?: number;
}

export interface DebateSession {
  id: string;
  topic: string;
  messages: DebateMessage[];
  userScore: number;
}
