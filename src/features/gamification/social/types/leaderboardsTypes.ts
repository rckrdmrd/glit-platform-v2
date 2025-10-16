/**
 * Leaderboard Types
 * Defines all types for the leaderboard system
 */

export type LeaderboardType = 'global' | 'school' | 'grade' | 'friends';
export type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'all-time';
export type RankChange = 'up' | 'down' | 'same' | 'new';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  rankBadge: string;
  score: number;
  xp: number;
  mlCoins: number;
  change: number; // rank change from previous period
  changeType: RankChange;
  isCurrentUser: boolean;
  school?: string;
  grade?: number;
}

export interface LeaderboardData {
  type: LeaderboardType;
  timePeriod: TimePeriod;
  entries: LeaderboardEntry[];
  userRank?: number;
  totalParticipants: number;
  lastUpdated: Date;
  season?: string;
}

export interface LeaderboardFilter {
  type: LeaderboardType;
  timePeriod: TimePeriod;
  school?: string;
  grade?: number;
  limit?: number;
}

export interface UserLeaderboardStats {
  globalRank: number;
  schoolRank?: number;
  gradeRank?: number;
  friendsRank?: number;
  bestRank: number;
  totalScore: number;
  percentile: number;
}
