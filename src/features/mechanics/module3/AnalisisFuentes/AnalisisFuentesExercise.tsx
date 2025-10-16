import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, ExternalLink, Shield, AlertTriangle } from 'lucide-react';
import { fetchSources, analyzeSource, checkClaim } from './analisisFuentesAPI';
import type { Source } from './analisisFuentesTypes';
import type { SourceCredibility, FactCheckResult } from '../../shared/aiTypes';

export const AnalisisFuentesExercise: React.FC = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [analysis, setAnalysis] = useState<SourceCredibility | null>(null);
  const [claim, setClaim] = useState('');
  const [factCheck, setFactCheck] = useState<FactCheckResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    try {
      const data = await fetchSources();
      setSources(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (source: Source) => {
    setSelectedSource(source);
    setAnalyzing(true);
    try {
      const result = await analyzeSource(source.url);
      setAnalysis(result);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFactCheck = async () => {
    if (!claim.trim()) return;
    setAnalyzing(true);
    try {
      const result = await checkClaim(claim);
      setFactCheck(result);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Cargando fuentes...</div>;

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-detective-blue to-detective-orange rounded-detective p-6 mb-6 text-white">
          <div className="flex items-center gap-3"><FileSearch className="w-8 h-8" /><h1 className="text-detective-3xl font-bold">Análisis de Fuentes</h1></div>
          <p className="text-detective-base">Evalúa la credibilidad de fuentes sobre Marie Curie</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h3 className="text-detective-lg font-semibold text-detective-blue">Fuentes Disponibles</h3>
            {sources.map((source) => (
              <motion.div key={source.id} whileHover={{ scale: 1.02 }} onClick={() => handleAnalyze(source)} className="bg-white rounded-lg p-4 shadow-card cursor-pointer hover:shadow-card-hover transition-all">
                <div className="flex items-start justify-between mb-2"><h4 className="text-detective-base font-semibold">{source.title}</h4><ExternalLink className="w-4 h-4 text-detective-orange" /></div>
                <p className="text-detective-xs text-detective-text-secondary mb-2">{source.url}</p>
                <p className="text-detective-sm text-detective-text">{source.excerpt}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-detective-bg text-detective-xs rounded">{source.type}</span>
              </motion.div>
            ))}
          </div>

          {selectedSource && analysis && (
            <div className="space-y-4">
              <h3 className="text-detective-lg font-semibold text-detective-blue">Análisis de Credibilidad</h3>
              <div className="bg-white rounded-lg p-6 shadow-card">
                <div className="flex items-center justify-between mb-4"><h4 className="text-detective-base font-semibold">{selectedSource.title}</h4><div className="flex items-center gap-2"><Shield className="w-5 h-5 text-detective-gold" /><span className="text-2xl font-bold text-detective-orange">{Math.round(analysis.credibilityScore * 100)}%</span></div></div>
                <div className="space-y-3">
                  <div><span className="text-detective-sm font-medium">Nivel de Sesgo:</span><span className="ml-2 px-3 py-1 bg-gray-100 rounded text-detective-sm">{analysis.biasLevel}</span></div>
                  <div><span className="text-detective-sm font-medium">Reporte Factual:</span><span className="ml-2 px-3 py-1 bg-gray-100 rounded text-detective-sm">{analysis.factualReporting}</span></div>
                  {analysis.warnings.length > 0 && (<div><h5 className="text-detective-sm font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-600" />Advertencias</h5><ul className="space-y-1">{analysis.warnings.map((w, idx) => (<li key={idx} className="text-detective-xs text-yellow-800">• {w}</li>))}</ul></div>)}
                  {analysis.strengths.length > 0 && (<div><h5 className="text-detective-sm font-semibold mb-2">Fortalezas</h5><ul className="space-y-1">{analysis.strengths.map((s, idx) => (<li key={idx} className="text-detective-xs text-green-800">• {s}</li>))}</ul></div>)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-card">
          <h3 className="text-detective-lg font-semibold text-detective-blue mb-4">Verificador de Afirmaciones</h3>
          <div className="flex gap-3 mb-4"><input type="text" value={claim} onChange={(e) => setClaim(e.target.value)} placeholder="Ingresa una afirmación sobre Marie Curie..." className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-detective-orange" /><button onClick={handleFactCheck} disabled={!claim.trim() || analyzing} className="px-6 py-3 bg-detective-orange text-white rounded-lg font-medium hover:bg-detective-orange-dark disabled:bg-gray-300">Verificar</button></div>
          {factCheck && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-lg ${factCheck.isAccurate ? 'bg-green-50 border-2 border-green-400' : 'bg-red-50 border-2 border-red-400'}`}>
              <h4 className="font-semibold mb-2">{factCheck.isAccurate ? '✓ Afirmación Precisa' : '✗ Afirmación Inexacta'}</h4>
              <p className="text-detective-sm mb-3">{factCheck.explanation}</p>
              <div className="text-detective-xs"><strong>Confianza:</strong> {Math.round(factCheck.confidence * 100)}%</div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalisisFuentesExercise;
