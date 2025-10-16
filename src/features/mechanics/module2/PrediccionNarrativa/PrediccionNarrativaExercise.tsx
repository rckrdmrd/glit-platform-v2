import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Send, Sparkles, Loader2 } from 'lucide-react';
import { fetchStory, submitPrediction } from './prediccionNarrativaAPI';
import type { Story } from './prediccionNarrativaTypes';
import type { NarrativeContinuation } from '../../shared/aiTypes';

export const PrediccionNarrativaExercise: React.FC = () => {
  const [story, setStory] = useState<Story | null>(null);
  const [userPrediction, setUserPrediction] = useState('');
  const [result, setResult] = useState<NarrativeContinuation | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadStory();
  }, []);

  const loadStory = async () => {
    try {
      const data = await fetchStory('story-curie-1');
      setStory(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!story || userPrediction.length < 50) return;
    setSubmitting(true);
    try {
      const res = await submitPrediction(story.beginning, userPrediction);
      setResult(res);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !story) {
    return <div className="flex items-center justify-center h-screen">Cargando historia...</div>;
  }

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-detective-blue to-detective-orange rounded-detective p-6 mb-6 text-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-detective-3xl font-bold">{story.title}</h1>
          </div>
          <p className="text-detective-base opacity-90">{story.context}</p>
        </motion.div>

        <div className="bg-white rounded-lg p-8 shadow-card mb-6">
          <h3 className="text-detective-lg font-semibold text-detective-blue mb-4">
            Comienzo de la Historia
          </h3>
          <p className="text-detective-base text-detective-text leading-relaxed mb-6 whitespace-pre-line">
            {story.beginning}
          </p>
          <div className="border-t-2 border-detective-orange pt-6">
            <label className="block text-detective-base font-medium text-detective-text mb-3">
              ¿Qué crees que sucederá a continuación?
            </label>
            <textarea
              value={userPrediction}
              onChange={(e) => setUserPrediction(e.target.value)}
              placeholder="Escribe tu predicción sobre cómo continuará la historia de Marie Curie..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-detective-orange resize-none"
              rows={8}
              disabled={submitting}
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-detective-sm text-detective-text-secondary">
                {userPrediction.length} / 50 caracteres mínimo
              </span>
              <button
                onClick={handleSubmit}
                disabled={submitting || userPrediction.length < 50}
                className="px-6 py-3 bg-detective-orange text-white rounded-lg font-medium hover:bg-detective-orange-dark transition-colors disabled:bg-gray-300 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Predicción
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-300">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h3 className="text-detective-lg font-bold text-detective-blue">
                  Continuación Real de la Historia
                </h3>
              </div>
              <p className="text-detective-base text-detective-text leading-relaxed whitespace-pre-line">
                {result.continuation}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-card">
              <h4 className="text-detective-lg font-semibold text-detective-blue mb-4">
                Análisis de tu Predicción
              </h4>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-detective-sm text-detective-text-secondary">
                    Precisión de Predicción
                  </span>
                  <span className="text-detective-lg font-bold text-detective-orange">
                    {Math.round(result.predictionAccuracy * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.predictionAccuracy * 100}%` }}
                    className="h-full bg-gradient-to-r from-detective-orange to-detective-gold rounded-full"
                  />
                </div>
              </div>
              <p className="text-detective-base text-detective-text mb-4">{result.explanation}</p>
              {result.alternativeEndings.length > 0 && (
                <div>
                  <h5 className="text-detective-base font-semibold text-detective-blue mb-3">
                    Finales Alternativos Posibles
                  </h5>
                  <ul className="space-y-2">
                    {result.alternativeEndings.map((ending, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-detective-sm">
                        <span className="text-detective-orange font-bold">•</span>
                        <span>{ending}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PrediccionNarrativaExercise;
