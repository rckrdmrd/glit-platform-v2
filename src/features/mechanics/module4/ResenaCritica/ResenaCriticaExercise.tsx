import React, { useState } from 'react';
import { Star, BookOpen, CheckSquare } from 'lucide-react';

export const ResenaCriticaExercise: React.FC = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [criteria, setCriteria] = useState({
    accuracy: false,
    clarity: false,
    depth: false,
    relevance: false,
    sources: false,
  });

  const works = [
    'Marie Curie: A Life - Susan Quinn',
    'Radioactive: Marie & Pierre Curie - Lauren Redniss',
    'Madame Curie: A Biography - Ève Curie',
    'Marie Curie and Her Daughters - Shelley Emling',
  ];

  const calculateScore = () => {
    const criteriaCount = Object.values(criteria).filter(Boolean).length;
    const contentScore = (summary.length > 100 ? 20 : 0) + (analysis.length > 150 ? 30 : 0) + (recommendation.length > 50 ? 20 : 0);
    const ratingScore = rating * 6;
    return Math.min(criteriaCount * 6 + contentScore + ratingScore, 100);
  };

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-detective shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-detective-orange" />
            <h1 className="text-3xl font-bold text-detective-text">Reseña Crítica</h1>
          </div>
          <p className="text-detective-text-secondary">
            Escribe una reseña crítica sobre una obra relacionada con Marie Curie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-detective shadow-card p-6 space-y-4">
              <div>
                <label className="block text-detective-text font-medium mb-2">Obra a reseñar:</label>
                <select
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none"
                >
                  <option value="">Selecciona una obra...</option>
                  {works.map((work, idx) => (
                    <option key={idx} value={work}>{work}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-detective-text font-medium mb-2">Calificación:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-10 h-10 ${star <= rating ? 'fill-detective-gold text-detective-gold' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-2xl font-bold text-detective-text">{rating}/5</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-detective shadow-card p-6 space-y-4">
              <div>
                <label className="block text-detective-text font-medium mb-2">
                  Resumen ({summary.length} caracteres, mín. 100)
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                  placeholder="Resume brevemente la obra..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-detective-text font-medium mb-2">
                  Análisis Crítico ({analysis.length} caracteres, mín. 150)
                </label>
                <textarea
                  value={analysis}
                  onChange={(e) => setAnalysis(e.target.value)}
                  rows={8}
                  placeholder="Analiza aspectos positivos y negativos, estilo, precisión histórica..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-detective-text font-medium mb-2">
                  Recomendación ({recommendation.length} caracteres, mín. 50)
                </label>
                <textarea
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  rows={3}
                  placeholder="¿A quién recomendarías esta obra y por qué?"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-detective shadow-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="w-5 h-5 text-detective-orange" />
                <h3 className="font-bold text-detective-text">Criterios</h3>
              </div>
              <div className="space-y-3">
                {Object.entries({
                  accuracy: 'Precisión histórica',
                  clarity: 'Claridad de escritura',
                  depth: 'Profundidad del análisis',
                  relevance: 'Relevancia del tema',
                  sources: 'Uso de fuentes',
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={criteria[key as keyof typeof criteria]}
                      onChange={(e) => setCriteria({...criteria, [key]: e.target.checked})}
                      className="w-5 h-5 text-detective-orange focus:ring-detective-orange border-gray-300 rounded"
                    />
                    <span className="text-detective-text">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-detective-orange to-detective-gold text-white rounded-detective shadow-lg p-6">
              <h3 className="text-xl font-bold mb-2">Puntuación</h3>
              <p className="text-5xl font-bold mb-2">{calculateScore()}/100</p>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all"
                  style={{ width: `${calculateScore()}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
