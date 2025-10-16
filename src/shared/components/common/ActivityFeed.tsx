import React from 'react';
import { DetectiveCard } from '../base/DetectiveCard';
import { LucideIcon } from 'lucide-react';

export interface Activity {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  icon: LucideIcon;
  title: string;
  description?: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  title?: string;
  maxItems?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  title = 'Actividad Reciente',
  maxItems = 5,
}) => {
  const typeColors = {
    success: 'text-green-500 bg-green-500/10',
    warning: 'text-yellow-500 bg-yellow-500/10',
    info: 'text-blue-500 bg-blue-500/10',
    error: 'text-red-500 bg-red-500/10',
  };

  const displayActivities = activities.slice(0, maxItems);

  return (
    <DetectiveCard>
      <h3 className="text-lg font-bold text-detective-text mb-4">{title}</h3>
      <div className="space-y-3">
        {displayActivities.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No hay actividad reciente</p>
        ) : (
          displayActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-detective-bg-secondary rounded-lg hover:bg-opacity-80 transition-colors"
              >
                <div className={`p-2 rounded-lg ${typeColors[activity.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-detective-text font-medium">{activity.title}</p>
                  {activity.description && (
                    <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </DetectiveCard>
  );
};
