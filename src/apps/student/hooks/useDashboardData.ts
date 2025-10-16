import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/services/api/apiClient';
import { useAuth } from '@/features/auth/hooks/useAuth';

export interface MLCoinsData {
  balance: number;
  todayEarned: number;
  todaySpent: number;
  recentTransactions: {
    id: string;
    type: 'earned' | 'spent';
    amount: number;
    description: string;
    timestamp: string;
  }[];
}

export interface RankData {
  currentRank: string;
  currentXP: number;
  nextRankXP: number;
  multiplier: number;
  rankIcon: string;
  progress: number;
}

export interface AchievementData {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  required?: number;
}

export interface ProgressData {
  totalModules: number;
  completedModules: number;
  totalExercises: number;
  completedExercises: number;
  averageScore: number;
  totalTimeSpent: number;
  currentStreak: number;
  longestStreak: number;
}

interface DashboardData {
  coins: MLCoinsData | null;
  rank: RankData | null;
  achievements: AchievementData[];
  progress: ProgressData | null;
  recentAchievements: AchievementData[];
}

export function useDashboardData() {
  const { user, isAuthenticated } = useAuth();

  const [data, setData] = useState<DashboardData>({
    coins: null,
    rank: null,
    achievements: [],
    progress: null,
    recentAchievements: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = useCallback(async (isRefresh = false) => {
    // Don't fetch if no user is authenticated
    if (!isAuthenticated || !user?.id) {
      setLoading(false);
      return;
    }

    const userId = user.id;
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      // Fetch all data in parallel
      const [coinsRes, rankRes, achievementsRes, progressRes] = await Promise.all([
        apiClient.get(`/gamification/coins/${userId}`),
        apiClient.get(`/gamification/ranks/user/${userId}`),
        apiClient.get(`/gamification/achievements/${userId}`),
        apiClient.get(`/educational/progress/user/${userId}`),
      ]);

      // Extract data from backend response structure { success: true, data: {...} }
      const achievementsData = achievementsRes.data.data;
      const recentUnlocked = achievementsData
        .filter((a: AchievementData) => a.unlocked && a.unlockedAt)
        .sort((a: AchievementData, b: AchievementData) =>
          new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime()
        )
        .slice(0, 5);

      setData({
        coins: coinsRes.data.data,
        rank: rankRes.data.data,
        achievements: achievementsData,
        progress: progressRes.data.data,
        recentAchievements: recentUnlocked,
      });
    } catch (err) {
      // For development, use mock data
      console.warn('API error, using mock data:', err);
      setData(getMockDashboardData());
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refresh = useCallback(() => {
    return fetchDashboardData(true);
  }, [fetchDashboardData]);

  return {
    ...data,
    loading,
    error,
    isRefreshing,
    refresh,
  };
}

// Mock data for development
function getMockDashboardData(): DashboardData {
  return {
    coins: {
      balance: 350,
      todayEarned: 75,
      todaySpent: 25,
      recentTransactions: [
        {
          id: '1',
          type: 'earned',
          amount: 50,
          description: 'Completado: Crucigrama Científico',
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'earned',
          amount: 25,
          description: 'Racha de 5 días',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: '3',
          type: 'spent',
          amount: 25,
          description: 'Comprado: Pista extra',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
      ],
    },
    rank: {
      currentRank: 'BATAB',
      currentXP: 750,
      nextRankXP: 1000,
      multiplier: 1.5,
      rankIcon: '🏹',
      progress: 75,
    },
    achievements: [
      {
        id: '1',
        name: 'Primer Descubrimiento',
        description: 'Completa tu primer ejercicio',
        rarity: 'common',
        icon: '🔍',
        unlocked: true,
        unlockedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '2',
        name: 'Detective Dedicado',
        description: 'Mantén una racha de 7 días',
        rarity: 'rare',
        icon: '📅',
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Maestro del Tiempo',
        description: 'Completa 10 líneas de tiempo',
        rarity: 'epic',
        icon: '⏰',
        unlocked: false,
        progress: 6,
        required: 10,
      },
    ],
    progress: {
      totalModules: 5,
      completedModules: 2,
      totalExercises: 63,
      completedExercises: 28,
      averageScore: 87.5,
      totalTimeSpent: 12450,
      currentStreak: 7,
      longestStreak: 14,
    },
    recentAchievements: [
      {
        id: '2',
        name: 'Detective Dedicado',
        description: 'Mantén una racha de 7 días',
        rarity: 'rare',
        icon: '📅',
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      },
    ],
  };
}
