/**
 * Detective Textual Types
 * Investigation interface with evidence board and AI hints
 */

export interface Evidence {
  id: string;
  type: 'document' | 'letter' | 'photo' | 'note' | 'artifact';
  title: string;
  content: string;
  date?: string;
  imageUrl?: string;
  discovered: boolean;
  relevance: number;
}

export interface EvidenceConnection {
  id: string;
  fromEvidenceId: string;
  toEvidenceId: string;
  relationship: string;
  userCreated: boolean;
  isCorrect?: boolean;
}

export interface Investigation {
  id: string;
  title: string;
  description: string;
  mystery: string;
  availableEvidence: Evidence[];
  correctConnections: EvidenceConnection[];
  difficulty: 'facil' | 'medio' | 'dificil' | 'experto';
}

export interface DetectiveProgress {
  investigationId: string;
  discoveredEvidence: string[];
  connections: EvidenceConnection[];
  hypotheses: string[];
  hintsUsed: number;
  timeSpent: number;
  score: number;
}

export interface MagnifyingGlassState {
  active: boolean;
  position: { x: number; y: number };
  zoomLevel: number;
  focusedText?: string;
}

export interface AIHint {
  id: string;
  type: 'connection' | 'evidence' | 'analysis';
  message: string;
  cost: number;
  revealed: boolean;
}
