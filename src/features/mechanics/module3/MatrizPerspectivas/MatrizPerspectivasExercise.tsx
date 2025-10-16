import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid3x3, Sparkles, Eye } from 'lucide-react';
import { fetchMatrixExercise, getAIPerspectives } from './matrizPerspectivasAPI';
import type { MatrixExercise, Perspective } from './matrizPerspectivasTypes';

export const MatrizPerspectivasExercise: React.FC = () => {
  const [exercise, setExercise] = useState<MatrixExercise | null>(null);
  const [perspectives, setPerspectives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadExercise();
  }, []);

  const loadExercise = async () => {
    try {
      const data = await fetchMatrixExercise('matrix-1');
      setExercise(data);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!exercise) return;
    setGenerating(true);
    try {
      const persp = await getAIPerspectives(exercise.topic, exercise.perspectiveCount);
      setPerspectives(persp);
    } finally {
      setGenerating(false);
    }
  };

  if (loading || !exercise) return <div className="flex items-center justify-center h-screen">Cargando ejercicio...</div>;

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-detective-blue to-detective-orange rounded-detective p-6 mb-6 text-white">
          <div className="flex items-center gap-3 mb-2"><Grid3x3 className="w-8 h-8" /><h1 className="text-detective-3xl font-bold">Matriz de Perspectivas</h1></div>
          <p className="text-detective-lg mb-2">{exercise.topic}</p>
          <p className="text-detective-base opacity-90">{exercise.description}</p>
        </motion.div>

        <div className="mb-6 text-center">
          <button onClick={handleGenerate} disabled={generating} className="px-8 py-4 bg-detective-orange text-white rounded-lg font-medium hover:bg-detective-orange-dark disabled:bg-gray-300 flex items-center gap-3 mx-auto shadow-lg">
            <Sparkles className="w-6 h-6" />{generating ? 'Generando Perspectivas...' : 'Generar Perspectivas con IA'}
          </button>
        </div>

        {perspectives.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {perspectives.map((persp, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.15 }} className="bg-white rounded-lg p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4"><Eye className="w-5 h-5 text-detective-orange" /><h3 className="text-detective-lg font-semibold text-detective-blue">{persp.perspective}</h3></div>
                <div className="mb-4 p-3 bg-blue-50 rounded-lg"><p className="text-detective-sm font-medium text-blue-900">{persp.viewpoint}</p></div>
                <div className="mb-4"><h4 className="text-detective-sm font-semibold text-detective-blue mb-2">Argumentos</h4><ul className="space-y-1">{persp.arguments.map((arg: string, i: number) => (<li key={i} className="text-detective-xs flex items-start gap-1"><span className="text-green-600">+</span><span>{arg}</span></li>))}</ul></div>
                <div className="mb-4"><h4 className="text-detective-sm font-semibold text-detective-blue mb-2">Contraargumentos</h4><ul className="space-y-1">{persp.counterarguments.map((counter: string, i: number) => (<li key={i} className="text-detective-xs flex items-start gap-1"><span className="text-red-600">−</span><span>{counter}</span></li>))}</ul></div>
                {persp.biases && persp.biases.length > 0 && (
                  <div className="mb-4"><h4 className="text-detective-sm font-semibold text-detective-blue mb-2">Sesgos Posibles</h4><ul className="space-y-1">{persp.biases.map((bias: string, i: number) => (<li key={i} className="text-detective-xs text-yellow-800">⚠ {bias}</li>))}</ul></div>
                )}
                {persp.contextualFactors && persp.contextualFactors.length > 0 && (
                  <div><h4 className="text-detective-sm font-semibold text-detective-blue mb-2">Factores Contextuales</h4><ul className="space-y-1">{persp.contextualFactors.map((factor: string, i: number) => (<li key={i} className="text-detective-xs text-gray-600">• {factor}</li>))}</ul></div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {perspectives.length === 0 && !generating && (
          <div className="text-center py-12 bg-white rounded-lg shadow-card">
            <Grid3x3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-detective-base text-detective-text-secondary">Genera perspectivas con IA para comenzar el análisis</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatrizPerspectivasExercise;
