import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Plus, Sparkles } from 'lucide-react';
import { fetchInferenceWheel, getAISuggestions } from './ruedaInferenciasAPI';
import type { InferenceWheel, InferenceNode } from './ruedaInferenciasTypes';

export const RuedaInferenciasExercise: React.FC = () => {
  const [wheel, setWheel] = useState<InferenceWheel | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWheel();
  }, []);

  const loadWheel = async () => {
    try {
      const data = await fetchInferenceWheel();
      setWheel(data);
      const sug = await getAISuggestions(['evidence-1', 'evidence-2']);
      setSuggestions(sug);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !wheel) return <div className="flex items-center justify-center h-screen">Cargando...</div>;

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-detective-blue to-detective-orange rounded-detective p-6 mb-6 text-white">
          <div className="flex items-center gap-3"><Network className="w-8 h-8" /><h1 className="text-detective-3xl font-bold">Rueda de Inferencias</h1></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-card">
            <h3 className="text-detective-lg font-semibold text-detective-blue mb-4">Texto Central</h3>
            <div className="mb-6 p-6 bg-detective-bg-secondary rounded-lg border-2 border-detective-orange">
              <p className="text-detective-base text-center font-medium">{wheel.centralText}</p>
            </div>
            <h4 className="text-detective-base font-semibold text-detective-blue mb-3">Inferencias</h4>
            <div className="space-y-3">
              {wheel.nodes.map((node) => (
                <div key={node.id} className="p-4 bg-blue-50 rounded-lg border border-blue-300">
                  <p className="text-detective-sm mb-2">{node.text}</p>
                  <div className="flex items-center gap-2 text-detective-xs text-gray-600">
                    <span>Confianza:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-full rounded-full" style={{ width: `${node.confidence * 100}%` }} /></div>
                    <span>{Math.round(node.confidence * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4"><Sparkles className="w-5 h-5 text-detective-gold" /><h3 className="text-detective-lg font-semibold text-detective-blue">Sugerencias IA</h3></div>
            <div className="space-y-3">
              {suggestions.map((sug, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="p-4 bg-green-50 rounded-lg border border-green-300">
                  <p className="text-detective-sm font-medium mb-2">{sug.inference}</p>
                  <p className="text-detective-xs text-gray-600 mb-2">{sug.reasoning}</p>
                  <div className="flex items-center gap-2 text-detective-xs"><span>Confianza:</span><div className="flex-1 bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-full rounded-full" style={{ width: `${sug.confidence * 100}%` }} /></div><span>{Math.round(sug.confidence * 100)}%</span></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuedaInferenciasExercise;
