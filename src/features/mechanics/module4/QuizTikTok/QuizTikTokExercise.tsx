import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExerciseContainer } from '@shared/components/mechanics/ExerciseContainer';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { FeedbackModal } from '@shared/components/mechanics/FeedbackModal';
import { TikTokCard } from './TikTokCard';
import { QuizTikTokData } from './quizTikTokTypes';
import { calculateScore, FeedbackData } from '@shared/components/mechanics/mechanicsTypes';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const QuizTikTokExercise: React.FC<{ exercise: QuizTikTokData; onComplete?: () => void }> = ({ exercise, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [startTime] = useState(new Date());

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'down' && currentIndex < exercise.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'up' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentIndex < exercise.questions.length - 1) {
        handleSwipe('down');
      } else {
        handleCheck(newAnswers);
      }
    }, 300);
  };

  const handleCheck = async (finalAnswers: number[]) => {
    const correct = finalAnswers.filter((ans, idx) => ans === exercise.questions[idx].correctAnswer).length;
    const score = await calculateScore({
      exerciseId: exercise.id, startTime, endTime: new Date(), answers: { answers: finalAnswers }, correctAnswers: correct, totalQuestions: exercise.questions.length, hintsUsed: 0, difficulty: exercise.difficulty
    });

    setFeedback({
      type: correct === exercise.questions.length ? 'success' : 'error',
      title: correct === exercise.questions.length ? '¡Perfect!' : 'Buen intento',
      message: `Respondiste correctamente ${correct} de ${exercise.questions.length} preguntas.`,
      score: correct === exercise.questions.length ? score : undefined,
      showConfetti: correct === exercise.questions.length
    });
    setShowFeedback(true);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-full max-w-md h-screen bg-black overflow-hidden">
        <AnimatePresence mode="wait">
          <TikTokCard
            key={currentIndex}
            question={exercise.questions[currentIndex]}
            onAnswer={handleAnswer}
            selectedAnswer={answers[currentIndex]}
          />
        </AnimatePresence>
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-4 z-10">
          <DetectiveButton variant="primary" onClick={() => handleSwipe('up')} disabled={currentIndex === 0} icon={<ChevronUp />}>Up</DetectiveButton>
          <DetectiveButton variant="primary" onClick={() => handleSwipe('down')} disabled={currentIndex === exercise.questions.length - 1} icon={<ChevronDown />}>Down</DetectiveButton>
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
          {currentIndex + 1} / {exercise.questions.length}
        </div>
      </div>
      {feedback && <FeedbackModal isOpen={showFeedback} feedback={feedback} onClose={() => { setShowFeedback(false); if (feedback.type === 'success') onComplete?.(); }} />}
    </div>
  );
};
