import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExerciseContainer } from '@shared/components/mechanics/ExerciseContainer';
import { ScoreDisplay } from '@shared/components/mechanics/ScoreDisplay';
import { TimerWidget } from '@shared/components/mechanics/TimerWidget';
import { ProgressTracker } from '@shared/components/mechanics/ProgressTracker';
import { HintSystem } from '@shared/components/mechanics/HintSystem';
import { FeedbackModal } from '@shared/components/mechanics/FeedbackModal';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { CrucigramaGrid } from './CrucigramaGrid';
import { CrucigramaClue } from './CrucigramaClue';
import { CrucigramaData, CrucigramaCell } from './crucigramaTypes';
import { calculateScore, saveProgress } from '@shared/components/mechanics/mechanicsTypes';
import { Check, RotateCcw } from 'lucide-react';
import { FeedbackData } from '@shared/components/mechanics/mechanicsTypes';

export interface CrucigramaExerciseProps {
  exercise: CrucigramaData;
  onComplete?: () => void;
  onProgressUpdate?: (progress: any) => void;
}

export const CrucigramaExercise: React.FC<CrucigramaExerciseProps> = ({
  exercise,
  onComplete,
  onProgressUpdate
}) => {
  const [grid, setGrid] = useState<CrucigramaCell[][]>(
    exercise.grid.map((row) =>
      row.map((cell) => ({ ...cell, userInput: cell.userInput || '' }))
    )
  );
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [completedClues, setCompletedClues] = useState<Set<string>>(new Set());
  const [hintsUsed, setHintsUsed] = useState(0);
  const [availableCoins, setAvailableCoins] = useState(100);
  const [startTime] = useState(new Date());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [currentScore, setCurrentScore] = useState(0);

  // Check if a clue is completed
  const checkClue = (clueId: string) => {
    const clue = exercise.clues.find((c) => c.id === clueId);
    if (!clue) return false;

    let userAnswer = '';
    if (clue.direction === 'horizontal') {
      for (let i = 0; i < clue.answer.length; i++) {
        const cell = grid[clue.startRow][clue.startCol + i];
        userAnswer += cell.userInput || '';
      }
    } else {
      for (let i = 0; i < clue.answer.length; i++) {
        const cell = grid[clue.startRow + i][clue.startCol];
        userAnswer += cell.userInput || '';
      }
    }

    return userAnswer === clue.answer;
  };

  // Update completed clues
  useEffect(() => {
    const newCompleted = new Set<string>();
    exercise.clues.forEach((clue) => {
      if (checkClue(clue.id)) {
        newCompleted.add(clue.id);
      }
    });
    setCompletedClues(newCompleted);

    // Auto-save progress
    saveProgress(exercise.id, { grid, completedClues: Array.from(newCompleted) });

    // Notify parent component of progress
    if (onProgressUpdate) {
      onProgressUpdate({
        currentStep: newCompleted.size,
        totalSteps: exercise.clues.length,
        score: Math.floor((newCompleted.size / exercise.clues.length) * 100),
        hintsUsed,
        timeSpent: Math.floor((new Date().getTime() - startTime.getTime()) / 1000),
      });
    }
  }, [grid, hintsUsed]);

  const handleCellInput = (row: number, col: number, value: string) => {
    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));
    newGrid[row][col].userInput = value.toUpperCase();
    setGrid(newGrid);
  };

  const handleUseHint = (hint: { id: string; text: string; cost: number }) => {
    setHintsUsed((prev) => {
      const newHintsUsed = prev + 1;
      // Notify parent of hints used change
      if (onProgressUpdate) {
        onProgressUpdate({
          currentStep: completedClues.size,
          totalSteps: exercise.clues.length,
          score: Math.floor((completedClues.size / exercise.clues.length) * 100),
          hintsUsed: newHintsUsed,
          timeSpent: Math.floor((new Date().getTime() - startTime.getTime()) / 1000),
        });
      }
      return newHintsUsed;
    });
    setAvailableCoins((prev) => prev - hint.cost);
    alert(`Pista: ${hint.text}`);
  };

  const handleCheck = async () => {
    const isComplete = completedClues.size === exercise.clues.length;

    if (isComplete) {
      const attempt = {
        exerciseId: exercise.id,
        startTime,
        endTime: new Date(),
        answers: { grid },
        correctAnswers: completedClues.size,
        totalQuestions: exercise.clues.length,
        hintsUsed,
        difficulty: exercise.difficulty
      };

      const score = await calculateScore(attempt);
      setCurrentScore(score.totalScore);

      setFeedback({
        type: 'success',
        title: '¡Crucigrama Completado!',
        message: '¡Excelente trabajo! Has completado todas las palabras correctamente.',
        score,
        showConfetti: true
      });
      setShowFeedback(true);
    } else {
      setFeedback({
        type: 'error',
        title: 'Crucigrama Incompleto',
        message: `Has completado ${completedClues.size} de ${exercise.clues.length} palabras. ¡Sigue intentando!`,
      });
      setShowFeedback(true);
    }
  };

  const handleReset = () => {
    setGrid(
      exercise.grid.map((row) =>
        row.map((cell) => ({ ...cell, userInput: '' }))
      )
    );
    setCompletedClues(new Set());
    setSelectedCell(null);
  };

  return (
    <ExerciseContainer exercise={exercise}>
      {/* Header Controls */}
      <DetectiveCard variant="default" padding="md" className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <TimerWidget initialTime={0} countDown={false} showWarning={false} />
            <ProgressTracker
              current={completedClues.size}
              total={exercise.clues.length}
              variant="bar"
              className="w-64"
            />
          </div>
          <div className="flex items-center gap-3">
            <HintSystem
              hints={exercise.hints}
              onUseHint={handleUseHint}
              availableCoins={availableCoins}
            />
            <DetectiveButton
              variant="blue"
              onClick={handleReset}
              icon={<RotateCcw className="w-5 h-5" />}
            >
              Reiniciar
            </DetectiveButton>
            <DetectiveButton
              variant="gold"
              onClick={handleCheck}
              icon={<Check className="w-5 h-5" />}
            >
              Verificar
            </DetectiveButton>
          </div>
        </div>
        {currentScore > 0 && (
          <div className="mt-4">
            <ScoreDisplay score={currentScore} maxScore={100} size="sm" />
          </div>
        )}
      </DetectiveCard>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Grid */}
        <div className="lg:col-span-2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CrucigramaGrid
              grid={grid}
              selectedCell={selectedCell}
              onCellClick={(row, col) => setSelectedCell({ row, col })}
              onCellInput={handleCellInput}
            />
          </motion.div>
        </div>

        {/* Clues */}
        <div className="space-y-4">
          <CrucigramaClue
            clues={exercise.clues}
            completedClues={completedClues}
            direction="horizontal"
          />
          <CrucigramaClue
            clues={exercise.clues}
            completedClues={completedClues}
            direction="vertical"
          />
        </div>
      </div>

      {/* Feedback Modal */}
      {feedback && (
        <FeedbackModal
          isOpen={showFeedback}
          feedback={feedback}
          onClose={() => {
            setShowFeedback(false);
            if (feedback.type === 'success') {
              onComplete?.();
            }
          }}
          onRetry={() => {
            setShowFeedback(false);
            handleReset();
          }}
        />
      )}
    </ExerciseContainer>
  );
};

export default CrucigramaExercise;
