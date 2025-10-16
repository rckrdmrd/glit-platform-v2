export interface Source {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  type: 'academic' | 'news' | 'blog' | 'social';
}

export interface SourceAnalysis {
  sourceId: string;
  credibilityScore: number;
  biasLevel: string;
  factualReporting: string;
}
