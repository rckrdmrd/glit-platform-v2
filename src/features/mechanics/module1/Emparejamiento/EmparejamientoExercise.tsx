import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExerciseContainer } from '@shared/components/mechanics/ExerciseContainer';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { FeedbackModal } from '@shared/components/mechanics/FeedbackModal';
import { MatchingCard } from './MatchingCard';
import { EmparejamientoData, MatchingCard as CardType } from './emparejamientoTypes';
import { calculateScore, FeedbackData } from '@shared/components/mechanics/mechanicsTypes';
import { Check } from 'lucide-react';

export const EmparejamientoExercise: React.FC<{ exercise: EmparejamientoData; onComplete?: () => void }> = ({ exercise, onComplete }) => {
  const [cards, setCards] = useState(exercise.cards.sort(() => Math.random() - 0.5));
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [startTime] = useState(new Date());

  const handleCardClick = (cardId: string) => {
    if (!selectedCard) {
      setSelectedCard(cardId);
    } else {
      const card1 = cards.find(c => c.id === selectedCard);
      const card2 = cards.find(c => c.id === cardId);
      if (card1 && card2 && card1.matchId === card2.matchId) {
        setCards(cards.map(c => c.id === card1.id || c.id === card2.id ? { ...c, isMatched: true } : c));
      }
      setSelectedCard(null);
    }
  };

  const handleCheck = async () => {
    const matched = cards.filter(c => c.isMatched).length;
    const total = cards.length;
    const isComplete = matched === total;
    const score = await calculateScore({
      exerciseId: exercise.id, startTime, endTime: new Date(), answers: { cards }, correctAnswers: matched / 2, totalQuestions: total / 2, hintsUsed: 0, difficulty: exercise.difficulty
    });

    setFeedback({
      type: isComplete ? 'success' : 'error',
      title: isComplete ? '¡Completado!' : 'Faltan parejas',
      message: isComplete ? '¡Emparejaste todas las tarjetas correctamente!' : `Emparejaste ${matched / 2} de ${total / 2} parejas.`,
      score: isComplete ? score : undefined,
      showConfetti: isComplete
    });
    setShowFeedback(true);
  };

  return (
    <ExerciseContainer exercise={exercise}>
      <DetectiveCard variant="default" padding="lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {cards.map(card => (
            <MatchingCard key={card.id} card={card} isSelected={selectedCard === card.id} onClick={() => handleCardClick(card.id)} />
          ))}
        </div>
        <DetectiveButton variant="gold" icon={<Check />} onClick={handleCheck} className="w-full">Verificar</DetectiveButton>
      </DetectiveCard>
      {feedback && <FeedbackModal isOpen={showFeedback} feedback={feedback} onClose={() => { setShowFeedback(false); if (feedback.type === 'success') onComplete?.(); }} />}
    </ExerciseContainer>
  );
};

export default EmparejamientoExercise;
