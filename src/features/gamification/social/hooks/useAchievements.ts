/**
 * useAchievements Hook
 * Custom hook for achievement operations
 */

import { useEffect } from 'react';
import { useAchievementsStore } from '../store/achievementsStore';
import type { Achievement } from '../types/achievementsTypes';

export const useAchievements = () => {
  const {
    achievements,
    unlockedAchievements,
    recentUnlocks,
    stats,
    selectedCategory,
    unlockAchievement,
    updateProgress,
    dismissNotification,
    filterByCategory,
    refreshAchievements,
  } = useAchievementsStore();

  const getAchievementsByCategory = (category: string): Achievement[] => {
    return achievements.filter((a) => a.category === category);
  };

  const getFilteredAchievements = (): Achievement[] => {
    if (!selectedCategory) return achievements;
    return achievements.filter((a) => a.category === selectedCategory);
  };

  const getAchievementsByRarity = (rarity: string): Achievement[] => {
    return achievements.filter((a) => a.rarity === rarity);
  };

  const getLockedAchievements = (): Achievement[] => {
    return achievements.filter((a) => !a.isUnlocked);
  };

  const getProgressPercentage = (): number => {
    if (stats.totalAchievements === 0) return 0;
    return Math.round((stats.unlockedAchievements / stats.totalAchievements) * 100);
  };

  return {
    achievements,
    unlockedAchievements,
    recentUnlocks,
    stats,
    selectedCategory,
    unlockAchievement,
    updateProgress,
    dismissNotification,
    filterByCategory,
    refreshAchievements,
    getAchievementsByCategory,
    getFilteredAchievements,
    getAchievementsByRarity,
    getLockedAchievements,
    getProgressPercentage,
  };
};
