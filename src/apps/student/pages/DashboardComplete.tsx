import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GamifiedHeader } from '@shared/components/layout/GamifiedHeader';
import { EnhancedStatsGrid } from '../components/dashboard/EnhancedStatsGrid';
import { MissionsPanel } from '../components/dashboard/MissionsPanel';
import { ModulesSection } from '../components/dashboard/ModulesSection';
import { RecentActivityPanel } from '../components/dashboard/RecentActivityPanel';
import { RankProgressWidget } from '../components/dashboard/RankProgressWidget';
import { MLCoinsWidget } from '../components/dashboard/MLCoinsWidget';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useDashboardData } from '../hooks/useDashboardData';
import { useMissions } from '@/features/gamification/missions/hooks/useMissions';
import { useUserModules } from '../hooks/useUserModules';
import { useRecentActivities } from '../hooks/useRecentActivities';

export default function DashboardComplete() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Real data from backend
  const {
    coins,
    rank,
    achievements,
    progress,
    recentAchievements,
    loading,
    error,
    isRefreshing,
    refresh
  } = useDashboardData();

  // Missions data from backend
  const {
    allMissions,
    activeMissions,
    loading: missionsLoading,
    error: missionsError,
  } = useMissions();

  // Modules data from backend
  const {
    modules: userModules,
    loading: modulesLoading,
    error: modulesError,
  } = useUserModules();

  // Activities data from backend
  const {
    activities: userActivities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useRecentActivities(5); // Get 5 most recent activities

  // Transform data for components
  const statsData = progress ? {
    casesResolved: progress.completedExercises,
    currentStreak: progress.currentStreak,
    totalTime: Math.floor(progress.totalTimeSpent / 60), // Convert seconds to minutes
    totalXP: rank?.currentXP || 0,
    rankPosition: rank?.progress || 0,
  } : null;

  const rankData = rank ? {
    currentRank: rank.currentRank,
    currentXP: rank.currentXP,
    nextRankXP: rank.nextRankXP,
    multiplier: rank.multiplier,
    rankIcon: rank.rankIcon,
    progress: rank.progress,
    nextRank: 'Next Rank', // TODO: Get from backend
    xpCurrent: rank.currentXP,
    xpRequired: rank.nextRankXP,
  } : null;

  const coinsData = coins ? {
    balance: coins.balance,
    todayEarned: coins.todayEarned,
    todaySpent: coins.todaySpent,
    recentTransactions: coins.recentTransactions,
    current: coins.balance,
    earned: coins.todayEarned,
    spent: coins.todaySpent,
    trend: (coins.todayEarned > coins.todaySpent ? 'up' : 'down') as 'up' | 'down',
  } : null;

  // Missions data from missions API - use active missions or all if none are tracked
  const missionsData = activeMissions.length > 0 ? activeMissions : allMissions.slice(0, 3);

  // Modules data from modules API
  const modulesData = userModules || [];

  // Activities data from activities API
  const activitiesData = userActivities || [];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <GamifiedHeader user={user || undefined} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-300 text-red-800 rounded-lg p-4 mb-6"
          >
            <p className="font-semibold">{error}</p>
            <button
              onClick={refresh}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Reintentar
            </button>
          </motion.div>
        )}

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Left Column - Progress Card, Modules, Activity, and Missions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Detective Stats - Progress Card (arriba de módulos) */}
            <EnhancedStatsGrid
              stats={statsData || { casesResolved: 0, currentStreak: 0, totalTime: 0, totalXP: 0, rankPosition: 0 }}
              loading={loading}
              error={error ? new Error(error) : null}
              compact={false}
            />

            {/* Modules Section */}
            <ModulesSection
              modules={modulesData}
              loading={modulesLoading}
              error={modulesError}
              onModuleClick={(id) => navigate(`/module/${id}`)}
            />

            {/* Recent Activity */}
            <RecentActivityPanel
              activities={activitiesData}
              loading={activitiesLoading}
              error={activitiesError}
              maxItems={5}
            />

            {/* Active Missions Panel (abajo de actividades) */}
            <MissionsPanel
              missions={missionsData}
              loading={missionsLoading}
              error={missionsError ? new Error(missionsError) : null}
              onMissionClick={(id) => navigate(`/missions`)}
            />
          </div>

          {/* Right Column - Rank and ML Coins */}
          <div className="lg:col-span-1 space-y-6">
            {/* Rank Progress Widget */}
            <RankProgressWidget data={rankData} loading={loading} />

            {/* ML Coins Widget */}
            <MLCoinsWidget data={coinsData} loading={loading} />
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-16" />
    </div>
  );
}
