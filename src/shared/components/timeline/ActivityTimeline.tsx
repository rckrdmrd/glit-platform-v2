/**
 * GLIT Platform V2 - Activity Timeline Component
 *
 * Reusable timeline component for displaying user activity logs.
 * Features:
 * - Vertical timeline with connecting line
 * - Success/error state indicators
 * - Timestamp formatting in Spanish
 * - Empty state support
 * - Loading state
 * - Full TypeScript support
 *
 * @example
 * ```tsx
 * <ActivityTimeline
 *   activities={[
 *     {
 *       id: '1',
 *       action: 'Inicio de sesión',
 *       resource: 'Autenticación',
 *       details: 'Acceso desde dispositivo móvil',
 *       timestamp: '2025-10-16T10:00:00Z',
 *       success: true,
 *     },
 *   ]}
 *   loading={false}
 *   emptyMessage="No hay actividad registrada"
 * />
 * ```
 */

import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Activity log entry interface
 */
export interface ActivityLog {
  /** Unique identifier for the activity */
  id: string;
  /** Action performed (e.g., 'Inicio de sesión', 'Actualización de perfil') */
  action: string;
  /** Resource type affected (e.g., 'Autenticación', 'Usuario') */
  resource: string;
  /** Optional additional details about the activity */
  details?: string;
  /** Optional error message if the activity failed */
  error?: string;
  /** ISO 8601 timestamp of when the activity occurred */
  timestamp: string;
  /** Whether the activity completed successfully */
  success: boolean;
}

/**
 * ActivityTimeline component props
 */
export interface ActivityTimelineProps {
  /** Array of activity logs to display */
  activities: ActivityLog[];
  /** Whether the timeline is currently loading */
  loading?: boolean;
  /** Custom message to display when there are no activities */
  emptyMessage?: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Formats an ISO date string to Spanish locale format
 * @param dateString - ISO 8601 date string
 * @returns Formatted date string in Spanish
 */
function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Fecha no válida';
  }
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * ActivityTimeline - Displays a vertical timeline of user activities
 *
 * This component renders activity logs in a timeline format with:
 * - Visual indicators (green checkmark for success, red X for failure)
 * - Connecting lines between activities
 * - Formatted timestamps
 * - Support for additional details and error messages
 * - Empty state when no activities are available
 * - Loading state with skeleton UI
 */
export function ActivityTimeline({
  activities,
  loading = false,
  emptyMessage = 'No hay actividad registrada',
}: ActivityTimelineProps): JSX.Element {
  // ============================================================================
  // LOADING STATE
  // ============================================================================

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex space-x-3 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ============================================================================
  // EMPTY STATE
  // ============================================================================

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  // ============================================================================
  // TIMELINE RENDER
  // ============================================================================

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {/* Connecting line */}
              {activityIdx !== activities.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}

              {/* Activity entry */}
              <div className="relative flex space-x-3">
                {/* Status icon */}
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                      activity.success ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    aria-label={activity.success ? 'Exitoso' : 'Fallido'}
                  >
                    {activity.success ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <XCircle className="w-5 h-5 text-white" />
                    )}
                  </span>
                </div>

                {/* Activity details */}
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div className="flex-1">
                    {/* Action and resource */}
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {activity.action}
                      </span>{' '}
                      en {activity.resource}
                    </p>

                    {/* Additional details */}
                    {activity.details && (
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.details}
                      </p>
                    )}

                    {/* Error message */}
                    {activity.error && (
                      <p className="text-sm text-red-600 mt-1 font-medium">
                        Error: {activity.error}
                      </p>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    {formatDate(activity.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityTimeline;
