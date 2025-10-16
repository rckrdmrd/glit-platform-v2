import React, { useState } from 'react';
import { ExerciseContainer } from '@shared/components/mechanics/ExerciseContainer';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { InteractiveCard } from './InteractiveCard';
import { DataVisualization } from './DataVisualization';
import { InfografiaInteractivaData } from './infografiaInteractivaTypes';

export const InfografiaInteractivaExercise: React.FC<{ exercise: InfografiaInteractivaData; onComplete?: () => void }> = ({ exercise, onComplete }) => {
  const [cards, setCards] = useState(exercise.cards);

  const handleCardClick = (cardId: string) => {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, revealed: !c.revealed } : c));
    const allRevealed = cards.every(c => c.revealed || c.id === cardId);
    if (allRevealed) {
      setTimeout(() => onComplete?.(), 1000);
    }
  };

  return (
    <ExerciseContainer exercise={exercise}>
      <DetectiveCard variant="default" padding="lg">
        <DataVisualization cards={cards} onCardClick={handleCardClick} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {cards.map(card => (
            <InteractiveCard key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
          ))}
        </div>
      </DetectiveCard>
    </ExerciseContainer>
  );
};
