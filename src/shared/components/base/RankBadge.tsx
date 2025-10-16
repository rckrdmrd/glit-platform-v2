import React from 'react';
import { Crown } from 'lucide-react';
import { cn } from '@shared/utils/cn';

export type RankType = 'al_mehen' | 'chilan' | 'batab' | 'halach_uinik' | 'kukulkan' | 'nacom' | 'holcatte' | 'guerrero' | 'mercenario';

export interface RankBadgeProps {
  rank: RankType;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Rank-specific gradient classes based on the requirements
const rankGradients: Record<RankType, string> = {
  // New Maya rank system with specific gradients
  al_mehen: 'bg-gradient-to-r from-gray-400 to-gray-600',
  chilan: 'bg-gradient-to-r from-green-400 to-green-600',
  batab: 'bg-gradient-to-r from-blue-400 to-blue-600',
  halach_uinik: 'bg-gradient-to-r from-purple-500 to-pink-600',
  kukulkan: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600',
  // Legacy ranks using detective theme classes
  nacom: 'rank-badge-detective',
  holcatte: 'rank-badge-teniente',
  guerrero: 'rank-badge-capitan',
  mercenario: 'rank-badge-comisario',
};

const rankLabels: Record<RankType, string> = {
  al_mehen: 'AL MEHEN',
  chilan: 'CHILAN',
  batab: 'BATAB',
  halach_uinik: 'HALACH UINIK',
  kukulkan: 'KUKULKAN',
  nacom: 'NACOM',
  holcatte: 'HOLCATTE',
  guerrero: 'GUERRERO',
  mercenario: 'MERCENARIO',
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export const RankBadge: React.FC<RankBadgeProps> = ({
  rank,
  showIcon = true,
  size = 'md',
  className,
}) => {
  const isNewRank = ['al_mehen', 'chilan', 'batab', 'halach_uinik', 'kukulkan'].includes(rank);

  return (
    <span
      className={cn(
        rankGradients[rank],
        sizeClasses[size],
        'inline-flex items-center gap-1.5 font-semibold rounded-full',
        isNewRank ? 'text-white shadow-lg' : '',
        className
      )}
    >
      {showIcon && <Crown className={iconSizes[size]} />}
      {rankLabels[rank]}
    </span>
  );
};
