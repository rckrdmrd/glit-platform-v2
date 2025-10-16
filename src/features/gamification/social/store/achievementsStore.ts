/**
 * Achievements Store
 * Zustand store for managing achievement state
 */

import { create } from 'zustand';
import type { Achievement, AchievementUnlockNotification, AchievementStats } from '../types/achievementsTypes';
import { allAchievements } from '../mockData/achievementsMockData';

interface AchievementsStore {
  achievements: Achievement[];
  unlockedAchievements: Achievement[];
  recentUnlocks: AchievementUnlockNotification[];
  stats: AchievementStats;
  selectedCategory: string | null;

  // Actions
  unlockAchievement: (achievementId: string) => void;
  updateProgress: (achievementId: string, current: number) => void;
  dismissNotification: (achievementId: string) => void;
  filterByCategory: (category: string | null) => void;
  refreshAchievements: () => void;
}

const calculateStats = (achievements: Achievement[]): AchievementStats => {
  const unlocked = achievements.filter((a) => a.isUnlocked);
  const progressAchievements = unlocked.filter((a) => a.category === 'progress');
  const masteryAchievements = unlocked.filter((a) => a.category === 'mastery');
  const socialAchievements = unlocked.filter((a) => a.category === 'social');
  const hiddenAchievements = unlocked.filter((a) => a.category === 'hidden');

  return {
    totalAchievements: achievements.length,
    unlockedAchievements: unlocked.length,
    progressAchievements: progressAchievements.length,
    masteryAchievements: masteryAchievements.length,
    socialAchievements: socialAchievements.length,
    hiddenAchievements: hiddenAchievements.length,
    totalMlCoinsEarned: unlocked.reduce((sum, a) => sum + a.mlCoinsReward, 0),
    totalXpEarned: unlocked.reduce((sum, a) => sum + a.xpReward, 0),
  };
};

export const useAchievementsStore = create<AchievementsStore>((set) => ({
  achievements: allAchievements,
  unlockedAchievements: allAchievements.filter((a) => a.isUnlocked),
  recentUnlocks: [],
  stats: calculateStats(allAchievements),
  selectedCategory: null,

  unlockAchievement: (achievementId: string) => {
    set((state) => {
      const achievement = state.achievements.find((a) => a.id === achievementId);
      if (!achievement || achievement.isUnlocked) return state;

      const updatedAchievement: Achievement = {
        ...achievement,
        isUnlocked: true,
        unlockedAt: new Date(),
      };

      const updatedAchievements = state.achievements.map((a) =>
        a.id === achievementId ? updatedAchievement : a
      );

      const notification: AchievementUnlockNotification = {
        achievement: updatedAchievement,
        timestamp: new Date(),
        showConfetti: updatedAchievement.rarity === 'epic' || updatedAchievement.rarity === 'legendary',
      };

      return {
        achievements: updatedAchievements,
        unlockedAchievements: updatedAchievements.filter((a) => a.isUnlocked),
        recentUnlocks: [notification, ...state.recentUnlocks],
        stats: calculateStats(updatedAchievements),
      };
    });
  },

  updateProgress: (achievementId: string, current: number) => {
    set((state) => {
      const updatedAchievements = state.achievements.map((a) => {
        if (a.id === achievementId && a.progress) {
          const newProgress = { ...a.progress, current };

          // Auto-unlock if progress complete
          if (newProgress.current >= newProgress.required && !a.isUnlocked) {
            return {
              ...a,
              progress: newProgress,
              isUnlocked: true,
              unlockedAt: new Date(),
            };
          }

          return { ...a, progress: newProgress };
        }
        return a;
      });

      return {
        achievements: updatedAchievements,
        unlockedAchievements: updatedAchievements.filter((a) => a.isUnlocked),
        stats: calculateStats(updatedAchievements),
      };
    });
  },

  dismissNotification: (achievementId: string) => {
    set((state) => ({
      recentUnlocks: state.recentUnlocks.filter((n) => n.achievement.id !== achievementId),
    }));
  },

  filterByCategory: (category: string | null) => {
    set({ selectedCategory: category });
  },

  refreshAchievements: () => {
    set((state) => ({
      stats: calculateStats(state.achievements),
    }));
  },
}));
