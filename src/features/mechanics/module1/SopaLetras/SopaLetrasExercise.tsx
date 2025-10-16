import React, { useState } from 'react';
import { ExerciseContainer } from '@shared/components/mechanics/ExerciseContainer';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { FeedbackModal } from '@shared/components/mechanics/FeedbackModal';
import { SopaLetrasGrid } from './SopaLetrasGrid';
import { WordList } from './WordList';
import { SopaLetrasData } from './sopaLetrasTypes';
import { calculateScore, FeedbackData } from '@shared/components/mechanics/mechanicsTypes';
import { Check } from 'lucide-react';

export interface SopaLetrasExerciseProps {
  exercise: SopaLetrasData;
  onComplete?: () => void;
  onProgressUpdate?: (progress: any) => void;
}

export const SopaLetrasExercise: React.FC<SopaLetrasExerciseProps> = ({ exercise, onComplete, onProgressUpdate }) => {
  const [words, setWords] = useState(exercise.words);
  const [selectedCells, setSelectedCells] = useState<{row:number,col:number}[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [startTime] = useState(new Date());
  const [hintsUsed] = useState(0);

  // Notify parent of progress updates
  React.useEffect(() => {
    if (onProgressUpdate) {
      const foundWords = words.filter(w => w.found).length;
      onProgressUpdate({
        currentStep: foundWords,
        totalSteps: words.length,
        score: Math.floor((foundWords / words.length) * 100),
        hintsUsed,
        timeSpent: Math.floor((new Date().getTime() - startTime.getTime()) / 1000),
      });
    }
  }, [words, hintsUsed]);

  const handleCellSelect = (row: number, col: number) => {
    setSelectedCells(prev => [...prev, {row, col}]);
  };

  const handleCheck = async () => {
    const foundWords = words.filter(w => w.found).length;
    const isComplete = foundWords === words.length;
    const score = await calculateScore({
      exerciseId: exercise.id, startTime, endTime: new Date(), answers: {words}, correctAnswers: foundWords, totalQuestions: words.length, hintsUsed: 0, difficulty: exercise.difficulty
    });

    setFeedback({
      type: isComplete ? 'success' : 'error',
      title: isComplete ? '¡Completado!' : 'Faltan palabras',
      message: isComplete ? '¡Encontraste todas las palabras!' : `Encontraste ${foundWords} de ${words.length} palabras.`,
      score: isComplete ? score : undefined,
      showConfetti: isComplete
    });
    setShowFeedback(true);
  };

  return (
    <ExerciseContainer exercise={exercise}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SopaLetrasGrid grid={exercise.grid} selectedCells={selectedCells} onCellSelect={handleCellSelect} />
        </div>
        <div>
          <WordList words={words} />
          <DetectiveButton variant="gold" onClick={handleCheck} icon={<Check />} className="w-full mt-4">Verificar</DetectiveButton>
        </div>
      </div>
      {feedback && <FeedbackModal isOpen={showFeedback} feedback={feedback} onClose={() => { setShowFeedback(false); if(feedback.type === 'success') onComplete?.(); }} />}
    </ExerciseContainer>
  );
};

export default SopaLetrasExercise;
