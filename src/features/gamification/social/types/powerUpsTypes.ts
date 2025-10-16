/**
 * Power-up Types
 * Defines all types for the power-up system
 */

export type PowerUpType = 'core' | 'advanced';
export type PowerUpStatus = 'available' | 'active' | 'cooldown' | 'locked';

export interface PowerUpEffect {
  type: 'hint' | 'vision' | 'retry' | 'time' | 'multiplier' | 'complete' | 'boost' | 'protection';
  value: number;
  description: string;
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  type: PowerUpType;
  price: number;
  icon: string;
  effect: PowerUpEffect;
  duration?: number; // in minutes (null for instant effects)
  cooldown?: number; // in minutes
  status: PowerUpStatus;
  activatedAt?: Date;
  expiresAt?: Date;
  cooldownEndsAt?: Date;
  usageCount: number;
  maxUsages?: number;
  owned: boolean;
  quantity: number;
}

export interface ActivePowerUp {
  powerUpId: string;
  name: string;
  icon: string;
  expiresAt: Date;
  remainingTime: number; // in seconds
  effect: PowerUpEffect;
}

export interface PowerUpUsageConfirmation {
  powerUp: PowerUp;
  confirmed: boolean;
  timestamp?: Date;
}

export interface PowerUpInventory {
  owned: PowerUp[];
  active: ActivePowerUp[];
  totalSpent: number;
  totalUsages: number;
}
