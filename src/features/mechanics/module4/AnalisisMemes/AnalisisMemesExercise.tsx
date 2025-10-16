import React, { useState } from 'react';
import { ExerciseContainer } from '@shared/components/mechanics/ExerciseContainer';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { MemeAnnotator } from './MemeAnnotator';
import { AnalisisMemesData, MemeAnnotation } from './analisisMemesTypes';
import { Plus } from 'lucide-react';

export const AnalisisMemesExercise: React.FC<{ exercise: AnalisisMemesData; onComplete?: () => void }> = ({ exercise, onComplete }) => {
  const [annotations, setAnnotations] = useState<MemeAnnotation[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddAnnotation = (x: number, y: number) => {
    const newAnnotation: MemeAnnotation = {
      id: `ann-${Date.now()}`,
      x,
      y,
      text: 'Nueva anotación',
      category: 'texto'
    };
    setAnnotations(prev => [...prev, newAnnotation]);
    setIsAdding(false);
  };

  return (
    <ExerciseContainer exercise={exercise}>
      <DetectiveCard variant="default" padding="md" className="mb-4">
        <DetectiveButton variant="gold" icon={<Plus />} onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancelar' : 'Añadir Anotación'}
        </DetectiveButton>
      </DetectiveCard>
      <MemeAnnotator memeUrl={exercise.memeUrl} annotations={annotations} onAddAnnotation={handleAddAnnotation} isAddingMode={isAdding} />
    </ExerciseContainer>
  );
};
