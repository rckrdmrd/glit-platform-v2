import React, { useState } from 'react';
import { ExerciseContainer } from '@shared/components/mechanics/ExerciseContainer';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { HypertextDocument } from './HypertextDocument';
import { NavigationBreadcrumbs } from './NavigationBreadcrumbs';
import { NavegacionHipertextualData } from './navegacionHipertextualTypes';
import { ChevronRight } from 'lucide-react';

export const NavegacionHipertextualExercise: React.FC<{ exercise: NavegacionHipertextualData; onComplete?: () => void }> = ({ exercise, onComplete }) => {
  const [currentNodeId, setCurrentNodeId] = useState(exercise.startNodeId);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([exercise.startNodeId]);
  const currentNode = exercise.nodes.find(n => n.id === currentNodeId);

  const handleLinkClick = (targetId: string) => {
    setCurrentNodeId(targetId);
    setVisitedNodes(prev => [...prev, targetId]);
    if (targetId === exercise.targetNodeId) {
      setTimeout(() => onComplete?.(), 1000);
    }
  };

  return (
    <ExerciseContainer exercise={exercise}>
      <DetectiveCard variant="default" padding="md" className="mb-4">
        <NavigationBreadcrumbs visitedNodes={visitedNodes} nodes={exercise.nodes} />
      </DetectiveCard>
      <DetectiveCard variant="default" padding="lg">
        {currentNode && <HypertextDocument node={currentNode} onLinkClick={handleLinkClick} />}
      </DetectiveCard>
    </ExerciseContainer>
  );
};
