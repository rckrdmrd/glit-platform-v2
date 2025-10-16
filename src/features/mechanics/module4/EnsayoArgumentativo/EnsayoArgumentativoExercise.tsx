import React, { useState } from 'react';
import { FileText, CheckCircle, List, Lightbulb } from 'lucide-react';

interface EssaySection {
  title: string;
  content: string;
  wordCount: number;
}

export const EnsayoArgumentativoExercise: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [thesis, setThesis] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [argument1, setArgument1] = useState('');
  const [argument2, setArgument2] = useState('');
  const [argument3, setArgument3] = useState('');
  const [conclusion, setConclusion] = useState('');

  const topics = [
    'El legado de Marie Curie en la ciencia moderna',
    'Las mujeres en la ciencia: barreras y logros',
    'La importancia de la investigación científica básica',
    'Ética en la experimentación científica',
  ];

  const essayStructure = [
    { section: 'Introducción', min: 100, color: 'bg-blue-100 border-blue-300' },
    { section: 'Argumento 1', min: 80, color: 'bg-green-100 border-green-300' },
    { section: 'Argumento 2', min: 80, color: 'bg-yellow-100 border-yellow-300' },
    { section: 'Argumento 3', min: 80, color: 'bg-purple-100 border-purple-300' },
    { section: 'Conclusión', min: 100, color: 'bg-orange-100 border-orange-300' },
  ];

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const totalWords = countWords(introduction) + countWords(argument1) +
                     countWords(argument2) + countWords(argument3) + countWords(conclusion);

  const calculateProgress = () => {
    const sections = [introduction, argument1, argument2, argument3, conclusion];
    const completed = sections.filter(s => countWords(s) >= 80).length;
    return (completed / sections.length) * 100;
  };

  const getSuggestions = () => {
    const suggestions: string[] = [];
    if (!thesis) suggestions.push('Define una tesis clara antes de comenzar');
    if (countWords(introduction) < 100) suggestions.push('Desarrolla más la introducción (mínimo 100 palabras)');
    if (countWords(argument1) < 80) suggestions.push('Fortalece el primer argumento');
    if (countWords(argument2) < 80) suggestions.push('Desarrolla el segundo argumento');
    if (countWords(argument3) < 80) suggestions.push('Expande el tercer argumento');
    if (countWords(conclusion) < 100) suggestions.push('Amplía la conclusión');
    return suggestions;
  };

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-detective shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-detective-orange" />
            <h1 className="text-3xl font-bold text-detective-text">Ensayo Argumentativo</h1>
          </div>
          <p className="text-detective-text-secondary">
            Desarrolla un ensayo argumentativo sobre Marie Curie y temas científicos relacionados.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-detective shadow-card p-6 space-y-4">
              <div>
                <label className="block text-detective-text font-medium mb-2">Tema del ensayo:</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none"
                >
                  <option value="">Selecciona un tema...</option>
                  {topics.map((t, idx) => (
                    <option key={idx} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-detective-text font-medium mb-2">Tesis (Idea principal):</label>
                <input
                  type="text"
                  value={thesis}
                  onChange={(e) => setThesis(e.target.value)}
                  placeholder="Ejemplo: Marie Curie revolucionó la ciencia moderna..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-detective shadow-card p-6 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-detective-text font-medium mb-2">
                  <span className="w-3 h-3 bg-blue-400 rounded-full" />
                  Introducción ({countWords(introduction)} palabras, mín. 100)
                </label>
                <textarea
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  rows={6}
                  placeholder="Presenta el tema, contexto histórico y tu tesis..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-detective-text font-medium mb-2">
                  <span className="w-3 h-3 bg-green-400 rounded-full" />
                  Argumento 1 ({countWords(argument1)} palabras, mín. 80)
                </label>
                <textarea
                  value={argument1}
                  onChange={(e) => setArgument1(e.target.value)}
                  rows={5}
                  placeholder="Desarrolla tu primer argumento con evidencia..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-detective-text font-medium mb-2">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                  Argumento 2 ({countWords(argument2)} palabras, mín. 80)
                </label>
                <textarea
                  value={argument2}
                  onChange={(e) => setArgument2(e.target.value)}
                  rows={5}
                  placeholder="Presenta tu segundo argumento..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-detective-text font-medium mb-2">
                  <span className="w-3 h-3 bg-purple-400 rounded-full" />
                  Argumento 3 ({countWords(argument3)} palabras, mín. 80)
                </label>
                <textarea
                  value={argument3}
                  onChange={(e) => setArgument3(e.target.value)}
                  rows={5}
                  placeholder="Desarrolla tu tercer argumento..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-detective-text font-medium mb-2">
                  <span className="w-3 h-3 bg-orange-400 rounded-full" />
                  Conclusión ({countWords(conclusion)} palabras, mín. 100)
                </label>
                <textarea
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  rows={6}
                  placeholder="Resume tus argumentos y refuerza tu tesis..."
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-detective shadow-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <List className="w-5 h-5 text-detective-orange" />
                <h3 className="font-bold text-detective-text">Progreso</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-3xl font-bold text-detective-orange">{totalWords}</p>
                  <p className="text-detective-text-secondary text-sm">Palabras totales</p>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-detective-text-secondary text-sm">Completado</span>
                    <span className="font-bold text-detective-blue">{Math.round(calculateProgress())}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-detective-blue h-3 rounded-full transition-all"
                      style={{ width: `${calculateProgress()}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-detective shadow-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-detective-gold" />
                <h3 className="font-bold text-detective-text">Guía</h3>
              </div>
              <div className="space-y-2">
                {essayStructure.map((item, idx) => (
                  <div key={idx} className={`p-3 border-2 rounded-detective ${item.color}`}>
                    <p className="font-medium text-detective-text text-sm">{item.section}</p>
                    <p className="text-detective-text-secondary text-xs">Mínimo: {item.min} palabras</p>
                  </div>
                ))}
              </div>
            </div>

            {getSuggestions().length > 0 && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-detective p-4">
                <p className="font-medium text-detective-text mb-2">Sugerencias:</p>
                <ul className="space-y-1">
                  {getSuggestions().map((suggestion, idx) => (
                    <li key={idx} className="text-detective-text-secondary text-sm flex items-start gap-2">
                      <span className="text-yellow-600">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {getSuggestions().length === 0 && totalWords > 0 && (
              <div className="bg-green-50 border-2 border-green-200 rounded-detective p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="font-medium text-green-800">¡Ensayo completo!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
