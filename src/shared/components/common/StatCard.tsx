import React from 'react';
import { LucideIcon } from 'lucide-react';
import { DetectiveCard } from '../base/DetectiveCard';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'yellow';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/30 text-blue-500',
    green: 'from-green-500/10 to-green-600/5 border-green-500/30 text-green-500',
    orange: 'from-orange-500/10 to-orange-600/5 border-orange-500/30 text-orange-500',
    red: 'from-red-500/10 to-red-600/5 border-red-500/30 text-red-500',
    purple: 'from-purple-500/10 to-purple-600/5 border-purple-500/30 text-purple-500',
    yellow: 'from-yellow-500/10 to-yellow-600/5 border-yellow-500/30 text-yellow-500',
  };

  const changeTypeClasses = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-gray-500',
  };

  return (
    <DetectiveCard className={`bg-gradient-to-br ${colorClasses[color].split(' ').slice(0, 2).join(' ')} border ${colorClasses[color].split(' ')[2]}`}>
      <div className="flex items-center gap-3">
        <div className={`p-3 bg-${color}-500/20 rounded-lg`}>
          <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[3]}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-detective-text">{value}</p>
          {change && (
            <p className={`text-xs ${changeTypeClasses[changeType]} mt-1`}>
              {change}
            </p>
          )}
        </div>
      </div>
    </DetectiveCard>
  );
};
