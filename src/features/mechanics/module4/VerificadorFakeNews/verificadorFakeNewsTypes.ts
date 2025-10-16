export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  source: string;
  date: string;
  url?: string;
}

export interface Claim {
  id: string;
  text: string;
  context: string;
  position: {
    start: number;
    end: number;
  };
}

export interface FactCheckResult {
  claimId: string;
  verdict: 'true' | 'false' | 'partially-true' | 'unverified' | 'misleading';
  confidence: number; // 0-1
  sources: SourceReference[];
  explanation: string;
}

export interface SourceReference {
  name: string;
  url: string;
  credibilityScore: number; // 0-100
  type: 'academic' | 'news' | 'government' | 'encyclopedia' | 'other';
}

export interface VerificationSession {
  articleId: string;
  claims: Claim[];
  results: FactCheckResult[];
  startTime: Date;
  endTime?: Date;
  score?: number;
}

export interface VerificadorExercise {
  id: string;
  article: NewsArticle;
  expectedClaims: Claim[];
  difficulty: 'facil' | 'medio' | 'dificil' | 'experto';
  timeLimit?: number; // seconds
}
