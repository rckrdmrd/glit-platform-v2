export interface FormalEmail {
  id: string;
  to: string;
  subject: string;
  body: string;
  greeting: string;
  closing: string;
  signature: string;
}

export interface ToneAnalysis {
  formality: number; // 0-100
  clarity: number;
  professionalism: number;
  suggestions: string[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  purpose: string;
  template: Partial<FormalEmail>;
}
