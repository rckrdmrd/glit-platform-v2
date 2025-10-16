import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { fetchTribunal } from './tribunalOpinionesAPI';
import type { TribunalExercise, Opinion } from './tribunalOpinionesTypes';

const stanceIcons = { a_favor: ThumbsUp, en_contra: ThumbsDown, neutral: Minus };
const stanceColors = { a_favor: 'bg-green-100 border-green-400', en_contra: 'bg-red-100 border-red-400', neutral: 'bg-gray-100 border-gray-400' };

export const TribunalOpinionesExercise: React.FC = () => {
  const [tribunal, setTribunal] = useState<TribunalExercise | null>(null);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTribunal();
  }, []);

  const loadTribunal = async () => {
    try {
      const data = await fetchTribunal('tribunal-1');
      setTribunal(data);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (opinionId: string) => {
    setVotes((prev) => ({ ...prev, selected: opinionId }));
  };

  if (loading || !tribunal) return <div className="flex items-center justify-center h-screen">Cargando tribunal...</div>;

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-detective-blue to-detective-orange rounded-detective p-6 mb-6 text-white">
          <div className="flex items-center gap-3 mb-2"><Scale className="w-8 h-8" /><h1 className="text-detective-3xl font-bold">Tribunal de Opiniones</h1></div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4"><p className="font-medium mb-2">Tema: {tribunal.topic}</p><p className="text-detective-lg">{tribunal.question}</p></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {tribunal.opinions.map((opinion) => {
            const StanceIcon = stanceIcons[opinion.stance];
            return (
              <motion.div key={opinion.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.02 }} onClick={() => handleVote(opinion.id)} className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${stanceColors[opinion.stance]} ${votes.selected === opinion.id ? 'ring-4 ring-detective-orange' : ''}`}>
                <div className="flex items-center gap-2 mb-3"><StanceIcon className="w-6 h-6" /><span className="font-bold uppercase text-detective-sm">{opinion.stance.replace('_', ' ')}</span></div>
                <h4 className="text-detective-base font-semibold mb-2">{opinion.author}</h4>
                <p className="text-detective-sm mb-4">{opinion.text}</p>
                <div className="mb-3"><h5 className="text-detective-xs font-semibold mb-2">Argumentos:</h5><ul className="space-y-1">{opinion.arguments.map((arg, idx) => (<li key={idx} className="text-detective-xs flex items-start gap-1"><span>•</span><span>{arg}</span></li>))}</ul></div>
                <div><h5 className="text-detective-xs font-semibold mb-2">Evidencia:</h5><ul className="space-y-1">{opinion.evidence.map((ev, idx) => (<li key={idx} className="text-detective-xs italic">{ev}</li>))}</ul></div>
              </motion.div>
            );
          })}
        </div>

        {votes.selected && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg p-6 shadow-card">
            <h3 className="text-detective-lg font-semibold text-detective-blue mb-3">Tu Selección</h3>
            <p className="text-detective-base">Has votado por la opinión de: <strong>{tribunal.opinions.find((o) => o.id === votes.selected)?.author}</strong></p>
            <button className="mt-4 px-6 py-3 bg-detective-orange text-white rounded-lg font-medium">Confirmar Voto</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TribunalOpinionesExercise;
