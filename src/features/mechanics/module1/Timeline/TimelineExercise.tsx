import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { ExerciseContainer } from '@shared/components/mechanics/ExerciseContainer';
import { ScoreDisplay } from '@shared/components/mechanics/ScoreDisplay';
import { TimerWidget } from '@shared/components/mechanics/TimerWidget';
import { HintSystem } from '@shared/components/mechanics/HintSystem';
import { FeedbackModal } from '@shared/components/mechanics/FeedbackModal';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { TimelineEvent } from './TimelineEvent';
import { TimelineData, TimelineEvent as TimelineEventType } from './timelineTypes';
import { calculateScore } from '@shared/components/mechanics/mechanicsTypes';
import { FeedbackData } from '@shared/components/mechanics/mechanicsTypes';
import { Check, Shuffle } from 'lucide-react';

export interface TimelineExerciseProps {
  exercise: TimelineData;
  onComplete?: () => void;
  onProgressUpdate?: (progress: any) => void;
}

export const TimelineExercise: React.FC<TimelineExerciseProps> = ({ exercise, onComplete, onProgressUpdate }) => {
  const [events, setEvents] = useState<TimelineEventType[]>([...exercise.events].sort(() => Math.random() - 0.5));
  const [startTime] = useState(new Date());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [availableCoins, setAvailableCoins] = useState(100);

  // Notify parent of progress updates
  React.useEffect(() => {
    if (onProgressUpdate) {
      const userOrder = events.map(e => e.id);
      const correctCount = userOrder.filter((id, idx) => id === exercise.correctOrder[idx]).length;
      onProgressUpdate({
        currentStep: correctCount,
        totalSteps: exercise.events.length,
        score: Math.floor((correctCount / exercise.events.length) * 100),
        hintsUsed,
        timeSpent: Math.floor((new Date().getTime() - startTime.getTime()) / 1000),
      });
    }
  }, [events, hintsUsed]);

  const handleCheck = async () => {
    const userOrder = events.map(e => e.id);
    const correct = userOrder.join(',') === exercise.correctOrder.join(',');
    const correctCount = userOrder.filter((id, idx) => id === exercise.correctOrder[idx]).length;

    const attempt = {
      exerciseId: exercise.id,
      startTime,
      endTime: new Date(),
      answers: { order: userOrder },
      correctAnswers: correctCount,
      totalQuestions: exercise.events.length,
      hintsUsed,
      difficulty: exercise.difficulty
    };

    const score = await calculateScore(attempt);

    setFeedback({
      type: correct ? 'success' : 'error',
      title: correct ? '¡Línea de Tiempo Correcta!' : 'Orden Incorrecto',
      message: correct
        ? '¡Excelente! Has ordenado todos los eventos correctamente.'
        : `${correctCount} de ${exercise.events.length} eventos están en la posición correcta.`,
      score: correct ? score : undefined,
      showConfetti: correct
    });
    setShowFeedback(true);
  };

  const handleShuffle = () => {
    setEvents([...events].sort(() => Math.random() - 0.5));
  };

  return (
    <ExerciseContainer exercise={exercise}>
      <DetectiveCard variant="default" padding="md" className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TimerWidget initialTime={0} countDown={false} showWarning={false} />
          <div className="flex items-center gap-3">
            <HintSystem hints={exercise.hints} onUseHint={(h) => { setHintsUsed(prev => prev + 1); setAvailableCoins(prev => prev - h.cost); }} availableCoins={availableCoins} />
            <DetectiveButton variant="blue" onClick={handleShuffle} icon={<Shuffle />}>Mezclar</DetectiveButton>
            <DetectiveButton variant="gold" onClick={handleCheck} icon={<Check />}>Verificar</DetectiveButton>
          </div>
        </div>
      </DetectiveCard>

      <DetectiveCard variant="default" padding="lg">
        <h3 className="text-lg font-bold mb-4">Arrastra los eventos para ordenarlos cronológicamente</h3>
        <Reorder.Group axis="y" values={events} onReorder={setEvents} className="space-y-3">
          {events.map((event, index) => (
            <Reorder.Item key={event.id} value={event}>
              <TimelineEvent event={event} index={index} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </DetectiveCard>

      {feedback && (
        <FeedbackModal isOpen={showFeedback} feedback={feedback} onClose={() => { setShowFeedback(false); if (feedback.type === 'success') onComplete?.(); }} onRetry={() => { setShowFeedback(false); handleShuffle(); }} />
      )}
    </ExerciseContainer>
  );
};

export default TimelineExercise;
