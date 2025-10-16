export interface InferenceNode {
  id: string;
  text: string;
  evidence: string[];
  confidence: number;
  position: { x: number; y: number };
}

export interface InferenceConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  relationship: string;
}

export interface InferenceWheel {
  id: string;
  centralText: string;
  nodes: InferenceNode[];
  connections: InferenceConnection[];
}
