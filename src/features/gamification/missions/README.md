# Missions System - GLIT Platform

Complete missions feature with daily, weekly, and special missions system.

## 📁 Structure

```
missions/
├── types/
│   └── missionsTypes.ts          (165 lines) - TypeScript interfaces
├── hooks/
│   └── useMissions.ts            (581 lines) - Main hook with API integration
├── components/
│   ├── MissionsPageHero.tsx      (225 lines) - Hero section with stats
│   ├── MissionTabs.tsx           (205 lines) - Tab navigation
│   ├── MissionCard.tsx           (425 lines) - Individual mission card
│   ├── MissionGrid.tsx           (211 lines) - Responsive grid layout
│   ├── ActiveMissionTracker.tsx  (249 lines) - Sidebar tracker
│   ├── RewardsPreview.tsx        (215 lines) - Rewards banner
│   └── index.ts                  (12 lines)  - Barrel exports
└── index.ts                      (14 lines)  - Feature exports
```

**Main Page**: `/src/apps/student/pages/MissionsPage.tsx` (228 lines)

## 🎯 Features

### Mission Types
- **Daily Missions**: 3 missions, reset at midnight
- **Weekly Missions**: 5-8 missions, reset Monday 00:00
- **Special Missions**: Event-based, limited time

### Mission Categories
- 🎓 **Exercises**: Complete programming exercises
- ⚡ **XP**: Earn experience points
- ⏰ **Time**: Study time goals
- 👥 **Social**: Community interactions
- 🏆 **Achievements**: Unlock achievements
- 🔥 **Streak**: Maintain daily streaks

### Mission Statuses
1. **Not Started** (Gray) - Available but not initiated
2. **In Progress** (Blue) - Started, tracking progress
3. **Completed** (Green) - Ready to claim rewards
4. **Claimed** (Gold) - Rewards collected

### Difficulty Levels
- 🟢 **Easy**: Quick tasks, small rewards
- 🟡 **Medium**: Moderate challenges
- 🔴 **Hard**: Difficult tasks, high rewards

## 🎨 Components Overview

### 1. MissionsPageHero (225 lines)
**Purpose**: Hero section with stats and animated background

**Features**:
- Gradient background with animated icons
- 4 stats cards:
  - Missions completed today
  - Weekly progress
  - Total rewards earned
  - Current streak
- Progress bars with animations
- Maya-themed decorative elements

### 2. MissionTabs (205 lines)
**Purpose**: Tab navigation for mission types

**Features**:
- 3 tabs: Daily, Weekly, Special
- Active tab indicator animation
- Count badges for incomplete missions
- Status filter dropdown (All, In Progress, Completed, Claimed)
- Tab descriptions
- Responsive design

### 3. MissionCard (425 lines)
**Purpose**: Individual mission display card

**Features**:
- Category icon with gradient background
- Title and description
- Animated progress bar (0-100%)
- Real-time countdown timer
- Reward badges (XP + ML Coins)
- Status badge
- Difficulty badge
- Track/untrack button
- Action buttons:
  - "Iniciar Misión" (Start)
  - "En Progreso" (In Progress)
  - "Reclamar Recompensa" (Claim - pulsing)
  - "Completado" (Claimed)
- Status-based styling
- Confetti animation on claim (300 particles, 3s)
- Hover effects

### 4. MissionGrid (211 lines)
**Purpose**: Responsive grid layout for missions

**Features**:
- Responsive columns (3 desktop / 2 tablet / 1 mobile)
- Stagger animation (0.05s delay between cards)
- Loading skeleton (6 cards)
- Empty state with animation
- Filter handling
- Layout animations

### 5. ActiveMissionTracker (249 lines)
**Purpose**: Sidebar showing tracked missions

**Features**:
- Max 3 tracked missions
- Real-time progress display
- Quick claim button
- Remove tracking button
- Collapsible on mobile/tablet
- Sticky positioning (desktop)
- Empty state
- Auto-updates

### 6. RewardsPreview (215 lines)
**Purpose**: Bottom banner showing potential rewards

**Features**:
- Total potential XP and ML Coins
- Earned vs potential comparison
- Bonus rewards display (complete all daily/weekly)
- Animated coin/XP icons
- Motivational text
- Gradient background
- Responsive layout

## 🔧 Hook: useMissions (581 lines)

### API Endpoints (to implement)
```typescript
GET  /api/gamification/missions/daily      // Fetch daily missions
GET  /api/gamification/missions/weekly     // Fetch weekly missions
GET  /api/gamification/missions/special    // Fetch special missions
GET  /api/gamification/missions/stats      // Fetch mission stats
POST /api/gamification/missions/:id/start  // Start a mission
POST /api/gamification/missions/:id/claim  // Claim reward
```

### Hook Interface
```typescript
interface UseMissionsResult {
  // Data
  dailyMissions: Mission[];
  weeklyMissions: Mission[];
  specialMissions: Mission[];
  allMissions: Mission[];
  activeMissions: Mission[]; // Tracked

  // Current tab
  currentTab: MissionType;
  setCurrentTab: (tab: MissionType) => void;

  // Actions
  startMission: (missionId: string) => Promise<MissionActionResult>;
  claimReward: (missionId: string) => Promise<MissionActionResult>;
  trackMission: (missionId: string) => void;
  untrackMission: (missionId: string) => void;
  isTracked: (missionId: string) => boolean;

  // Stats
  stats: MissionStats;
  rewardsSummary: MissionRewardsSummary;

  // State
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}
```

### Features
- Auto-refresh every 60 seconds
- Local storage for tracked missions
- Real-time progress updates
- Error handling
- Mock data for development

## 📊 TypeScript Types (165 lines)

### Core Interfaces
```typescript
interface Mission {
  id: string;
  type: 'daily' | 'weekly' | 'special';
  title: string;
  description: string;
  category: MissionCategory;
  targetValue: number;
  currentValue: number;
  progress: number; // 0-100
  xpReward: number;
  mlCoinsReward: number;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'not_started' | 'in_progress' | 'completed' | 'claimed';
  expiresAt: Date;
  bonusMultiplier?: number;
}

interface MissionStats {
  todayCompleted: number;
  todayTotal: number;
  weekCompleted: number;
  weekTotal: number;
  totalCompleted: number;
  totalXPEarned: number;
  totalMLCoinsEarned: number;
  currentStreak: number;
  longestStreak: number;
}

interface MissionRewardsSummary {
  potential: { xp: number; mlCoins: number };
  earned: { xp: number; mlCoins: number };
  bonus: {
    allDailyComplete: boolean;
    allWeeklyComplete: boolean;
    bonusXP: number;
    bonusMLCoins: number;
  };
}
```

## 🎨 Animations

### Page Entrance
- Fade + slide up (Hero, tabs, grid)
- Stagger children (stats cards, mission cards)

### Mission Cards
- Grid stagger: 0.05s delay between cards
- Hover: Lift up 5px
- Progress bar: Fill animation (1s ease-out)
- Claim button: Pulsing scale animation (1.5s infinite)

### Confetti (on claim)
- 300 particles
- 3 seconds duration
- Gold and orange colors
- Full screen overlay

### Countdown Timer
- Red text when < 1 hour
- Pulse animation when < 15 min

### Tab Indicator
- Slide animation (spring physics)
- 0.6s duration with bounce

### Rewards Preview
- Animated coin/XP icons floating
- Scale pulse (2s infinite)

## 🎯 Usage Example

```tsx
import MissionsPage from '@/apps/student/pages/MissionsPage';

// Route configuration
{
  path: '/missions',
  element: <MissionsPage />
}

// Deep linking
<Link to="/missions?tab=weekly">Weekly Missions</Link>
```

## 🔌 Integration Steps

### 1. Add Route
Update your router configuration:

```tsx
// In router file
import MissionsPage from '@/apps/student/pages/MissionsPage';

{
  path: '/missions',
  element: <ProtectedRoute><MissionsPage /></ProtectedRoute>
}
```

### 2. Install Dependencies
```bash
npm install react-confetti
```

### 3. Implement API Endpoints
Replace mock data in `useMissions.ts` with real API calls:

```typescript
// Example
async function fetchMissionsByType(type: MissionType): Promise<Mission[]> {
  const response = await fetch(`/api/gamification/missions/${type}`);
  const data = await response.json();
  return data.missions;
}
```

### 4. WebSocket Integration (Optional)
For real-time progress updates:

```typescript
useEffect(() => {
  const socket = io('/missions');

  socket.on('mission:progress', (data: MissionProgressEvent) => {
    // Update mission progress
  });

  return () => socket.disconnect();
}, []);
```

## 🎨 Theme Colors

### Detective Theme (Orange/Amber)
- Primary: `orange-500` to `amber-500`
- Secondary: `orange-600` to `amber-600`
- Background: `orange-50` to `amber-50`

### Status Colors
- Not Started: Gray (`gray-300`)
- In Progress: Blue (`blue-400`, `blue-50`)
- Completed: Green (`green-400`, `green-50`)
- Claimed: Gold (`yellow-400`, `yellow-50`)

### Category Colors
- Exercises: Blue to Cyan (`blue-500` to `cyan-500`)
- XP: Yellow to Orange (`yellow-500` to `orange-500`)
- Time: Purple to Pink (`purple-500` to `pink-500`)
- Social: Green to Emerald (`green-500` to `emerald-500`)
- Achievement: Amber to Orange (`amber-500` to `orange-500`)
- Streak: Red to Orange (`red-500` to `orange-500`)

## 📱 Responsive Breakpoints

- **Mobile**: 1 column grid, no sidebar, collapsible tracker
- **Tablet**: 2 column grid, collapsible sidebar
- **Desktop**: 3 column grid + fixed sidebar

## 🧪 Testing Recommendations

### Unit Tests
1. Test `useMissions` hook:
   - Data fetching
   - Mission start/claim
   - Track/untrack functionality
   - Rewards calculation

2. Test Components:
   - Mission card status rendering
   - Progress bar animations
   - Timer countdown
   - Filter functionality

### Integration Tests
1. Full mission flow:
   - Start mission
   - Track mission
   - Complete mission
   - Claim reward

2. Navigation:
   - Tab switching
   - Deep linking
   - Filter persistence

### E2E Tests
1. Complete daily mission flow
2. Complete weekly mission flow
3. Claim all missions and verify bonus
4. Track and untrack missions

## 🚀 Performance Optimizations

1. **Memoization**:
   - Mission filtering
   - Rewards calculation
   - Current missions selection

2. **Debouncing**:
   - Progress updates (500ms)
   - Search/filter (300ms)

3. **Caching**:
   - Mission data (60s)
   - Stats data (60s)

4. **Lazy Loading**:
   - Mission cards (viewport intersection)
   - Images and icons

5. **Auto-refresh**:
   - 60 second interval
   - Only when tab is active

## 📝 TODO for Production

- [ ] Replace mock data with real API calls
- [ ] Implement WebSocket for real-time updates
- [ ] Add toast notifications (success/error)
- [ ] Implement auto-claim option
- [ ] Add mission history page
- [ ] Add mission details modal
- [ ] Implement search functionality
- [ ] Add achievement integration
- [ ] Add leaderboard for mission completions
- [ ] Implement mission recommendations
- [ ] Add push notifications for mission expiry
- [ ] Add social sharing for completed missions

## 📈 Future Enhancements

1. **Mission Chains**: Sequential missions with story
2. **Daily Challenges**: Extra hard missions with big rewards
3. **Mission Shop**: Spend coins to unlock special missions
4. **Mission Badges**: Special badges for completing mission sets
5. **Cooperative Missions**: Team-based missions
6. **Mission Streaks**: Bonus for consecutive completions
7. **Mission Leaderboards**: Compete with friends
8. **Custom Missions**: User-created missions

## 🐛 Known Issues

- None currently

## 📄 License

Part of GLIT Platform - Proprietary
