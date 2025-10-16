import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Puzzle, Check, GripVertical } from 'lucide-react';
import { fetchPuzzleExercise, validateAssembly } from './puzzleContextoAPI';
import type { PuzzleExercise, ContextPiece } from './puzzleContextoTypes';

const categoryColors = {
  historical: 'bg-blue-100 border-blue-400',
  scientific: 'bg-green-100 border-green-400',
  personal: 'bg-purple-100 border-purple-400',
  social: 'bg-orange-100 border-orange-400',
};

export const PuzzleContextoExercise: React.FC = () => {
  const [puzzle, setPuzzle] = useState<PuzzleExercise | null>(null);
  const [pieces, setPieces] = useState<ContextPiece[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPuzzle();
  }, []);

  const loadPuzzle = async () => {
    try {
      const data = await fetchPuzzleExercise('puzzle-1');
      setPuzzle(data);
      setPieces(data.pieces);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async () => {
    const assembled = pieces.map((p) => ({ id: p.id, content: p.content }));
    const res = await validateAssembly(assembled);
    setResult(res);
  };

  if (loading || !puzzle) {
    return <div className="flex items-center justify-center h-screen">Cargando puzzle...</div>;
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
            <Puzzle className="w-8 h-8" />
            <h1 className="text-detective-3xl font-bold">{puzzle.title}</h1>
          </div>
          <p className="text-detective-base">{puzzle.description}</p>
        </motion.div>

        <div className="bg-white rounded-lg p-6 shadow-card mb-4">
          <h3 className="text-detective-lg font-semibold text-detective-blue mb-4">
            Arrastra para Ordenar el Contexto
          </h3>
          <Reorder.Group axis="y" values={pieces} onReorder={setPieces} className="space-y-3">
            {pieces.map((piece, idx) => (
              <Reorder.Item key={piece.id} value={piece}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border-2 cursor-move flex items-start gap-3 ${categoryColors[piece.category]}`}
                >
                  <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-detective-xs font-bold uppercase px-2 py-1 bg-white rounded">
                        {piece.category}
                      </span>
                      <span className="text-detective-xs text-gray-600">Posición: {idx + 1}</span>
                    </div>
                    <p className="text-detective-sm">{piece.content}</p>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        <button
          onClick={handleValidate}
          className="w-full px-6 py-3 bg-detective-orange text-white rounded-lg font-medium hover:bg-detective-orange-dark transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Validar Orden
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-6 rounded-lg ${result.isCorrect ? 'bg-green-50 border-2 border-green-400' : 'bg-yellow-50 border-2 border-yellow-400'}`}
          >
            <h4 className="text-detective-lg font-bold mb-2">
              {result.isCorrect ? '¡Perfecto!' : 'Buen intento'}
            </h4>
            <p className="text-detective-base mb-3">{result.feedback}</p>
            <div className="text-3xl font-bold text-detective-orange">
              Puntuación: {result.score}/100
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PuzzleContextoExercise;
