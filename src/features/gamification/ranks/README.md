# Maya Ranks & Progression System

Complete frontend implementation of the GLIT Platform Maya Ranks & Progression System with 5 ranks, prestige mechanics, and multiplier tracking.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Maya Ranks](#maya-ranks)
- [Prestige System](#prestige-system)
- [Components](#components)
- [Hooks](#hooks)
- [State Management](#state-management)
- [Usage Examples](#usage-examples)
- [API Integration](#api-integration)
- [Type Definitions](#type-definitions)
- [Mock Data](#mock-data)

## Overview

The Maya Ranks & Progression System implements a gamified progression mechanic with:

- **5 Maya-themed Ranks**: NACOM → BATAB → HOLCATTE → GUERRERO → MERCENARIO
- **Prestige System**: Reset progress with permanent bonuses (up to 10 prestige levels)
- **Multiplier System**: Stack multipliers from rank, prestige, streaks, and events
- **XP Progression**: Level-based progression with smooth animations
- **History Tracking**: Complete progression timeline
- **Rank Comparison**: Compare current and target ranks

### Key Features

✅ 5 culturally-inspired Maya ranks with unique icons
✅ Prestige system for endgame progression
✅ Dynamic multiplier stacking from multiple sources
✅ Smooth animations with Framer Motion
✅ Persistent state with Zustand
✅ Type-safe with TypeScript and Zod validation
✅ Detective Theme integration
✅ Responsive design
✅ Mock data for development

## Architecture

```
/ranks/
├── types/
│   └── ranksTypes.ts           # Complete type definitions
├── schemas/
│   └── ranksSchemas.ts         # Zod validation schemas
├── store/
│   └── ranksStore.ts           # Zustand state management
├── hooks/
│   ├── useRank.ts              # Current rank info and utilities
│   ├── useProgression.ts       # XP and level progression
│   └── useMultipliers.ts       # Multiplier management
├── components/
│   ├── MayaIconography.tsx     # Maya-themed SVG icons
│   ├── RankBadgeAdvanced.tsx   # Animated rank badges
│   ├── RankProgressBar.tsx     # XP progress bars
│   ├── RankUpModal.tsx         # Rank-up celebration
│   ├── PrestigeSystem.tsx      # Prestige interface
│   ├── MultiplierWidget.tsx    # Multiplier display
│   ├── ProgressTimeline.tsx    # History timeline
│   └── RankComparison.tsx      # Rank comparison view
├── mockData/
│   └── ranksMockData.ts        # Mock progression data
└── README.md                   # This file
```

## Maya Ranks

### Rank Definitions

| Rank | Spanish Name | ML Coins Required | Multiplier | Order |
|------|--------------|-------------------|------------|-------|
| **NACOM** | Detective Novato | 0 | 1.0x | 0 |
| **BATAB** | Sargento | 200 | 1.25x | 1 |
| **HOLCATTE** | Teniente | 500 | 1.5x | 2 |
| **GUERRERO** | Capitán | 1000 | 1.75x | 3 |
| **MERCENARIO** | Comisario/Maestro | 2000 | 2.0x | 4 |

### Rank Benefits

Each rank unlocks cumulative benefits:

- **NACOM**: Basic exercises, Level 1 hints, 1x multiplier
- **BATAB**: Intermediate exercises, Level 2 hints, 1.25x multiplier, badge, cosmetics
- **HOLCATTE**: Advanced exercises, Level 3 hints, 1.5x multiplier, guild access, custom title
- **GUERRERO**: Expert exercises, Level 4 hints, 1.75x multiplier, guild creation, mentorship
- **MERCENARIO**: All content, Level 5 hints, 2.0x multiplier, prestige eligibility

## Prestige System

After reaching MERCENARIO rank and level 50, users can prestige to:

- Reset to NACOM rank level 1
- Gain permanent multiplier bonuses
- Unlock exclusive cosmetics
- Maintain activity streaks
- Access prestige-only features

### Prestige Tiers

| Level | Bonus Multiplier | Badge | Features |
|-------|-----------------|-------|----------|
| 1 | +0.1 (10%) | Bronze | Basic prestige features |
| 2 | +0.15 (15%) | Silver | Streak protection |
| 3 | +0.2 (20%) | Gold | Double daily rewards |
| 5 | +0.3 (30%) | Diamond | Triple rewards, beta access |
| 10 | +0.6 (60%) | Rainbow | Ultimate benefits |

## Components

### RankBadgeAdvanced

Enhanced rank badge with animations and prestige stars.

```tsx
import { RankBadgeAdvanced } from '@features/gamification/ranks/components/RankBadgeAdvanced';

<RankBadgeAdvanced
  rank="BATAB"
  prestigeLevel={2}
  size="lg"
  showName={true}
  showPrestige={true}
  animated={true}
  showGlow={true}
  onClick={() => console.log('Clicked')}
/>
```

**Props:**
- `rank`: MayaRank - The rank to display
- `prestigeLevel?`: number - Current prestige level (shows stars)
- `size?`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' - Badge size
- `showName?`: boolean - Show rank name
- `showPrestige?`: boolean - Show prestige stars
- `animated?`: boolean - Enable animations
- `showGlow?`: boolean - Add glow effect
- `onClick?`: () => void - Click handler

### RankProgressBar

XP progress bar with smooth animations and milestones.

```tsx
import { RankProgressBar } from '@features/gamification/ranks/components/RankProgressBar';

<RankProgressBar
  currentXP={450}
  xpToNextLevel={1000}
  currentLevel={12}
  nextLevel={13}
  showStats={true}
  showMilestones={true}
  color="detective"
/>
```

**Props:**
- `currentXP`: number - Current XP amount
- `xpToNextLevel`: number - XP needed for next level
- `currentLevel`: number - Current level
- `nextLevel?`: number - Next level number
- `showStats?`: boolean - Show detailed stats
- `showMilestones?`: boolean - Show milestone markers
- `milestones?`: ProgressMilestone[] - Milestone data
- `height?`: 'sm' | 'md' | 'lg' - Bar height
- `color?`: 'detective' | 'rank' | 'gold' - Color theme

### RankUpModal

Celebration modal for rank-ups with confetti.

```tsx
import { RankUpModal } from '@features/gamification/ranks/components/RankUpModal';

<RankUpModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
/>
```

Features:
- Animated confetti particles
- Previous → Current rank display
- Benefits list with animations
- New multiplier showcase
- Auto-close after 8 seconds

### MultiplierWidget

Real-time multiplier display with breakdown.

```tsx
import { MultiplierWidget } from '@features/gamification/ranks/components/MultiplierWidget';

<MultiplierWidget
  variant="detailed"
  showBreakdown={true}
/>
```

**Variants:**
- `compact`: Badge-style widget for headers
- `detailed`: Full widget with expandable breakdown

Shows:
- Total multiplier
- Permanent vs temporary multipliers
- Expiration warnings
- Source breakdown

### PrestigeSystem

Complete prestige interface with confirmation.

```tsx
import { PrestigeSystem } from '@features/gamification/ranks/components/PrestigeSystem';

<PrestigeSystem />
```

Features:
- Current prestige status display
- Next prestige benefits preview
- Eligibility checking
- Confirmation modal
- Permanent bonus showcase

### ProgressTimeline

Visual timeline of progression history.

```tsx
import { ProgressTimeline } from '@features/gamification/ranks/components/ProgressTimeline';

<ProgressTimeline
  limit={10}
  showAll={false}
/>
```

Displays:
- Rank-ups, level-ups, prestiges, milestones
- Relative timestamps
- XP snapshots
- Multiplier history

### RankComparison

Compare current rank with target rank.

```tsx
import { RankComparison } from '@features/gamification/ranks/components/RankComparison';

<RankComparison
  targetRank="GUERRERO"
  showNextRank={true}
/>
```

Shows:
- Visual rank comparison
- ML Coins needed
- Multiplier increase
- New benefits list
- Motivation messages

## Hooks

### useRank

Access current rank information.

```tsx
import { useRank } from '@features/gamification/ranks/hooks/useRank';

const {
  currentRank,          // RankDefinition
  currentRankId,        // string
  currentLevel,         // number
  prestigeLevel,        // number
  nextRank,             // RankDefinition | null
  canRankUp,            // boolean
  progress,             // number (0-100)
  compareToNext,        // () => RankComparison | null
  isMaxRank,            // boolean
} = useRank();
```

### useProgression

Manage XP progression and leveling.

```tsx
import { useProgression } from '@features/gamification/ranks/hooks/useProgression';

const {
  currentXP,            // number
  xpToNextLevel,        // number
  totalXP,              // number
  currentLevel,         // number
  levelProgress,        // number (0-100)
  mlCoinsEarned,        // number
  activityStreak,       // number
  addXP,                // (amount, source, description?) => Promise<void>
  checkLevelUp,         // () => boolean
  checkRankUp,          // () => boolean
  progressionHistory,   // ProgressionHistoryEntry[]
  showRankUpModal,      // boolean
  closeRankUpModal,     // () => void
} = useProgression();

// Add XP
await addXP(150, 'exercise_completion', 'Completed Crucigrama');
```

### useMultipliers

Access and manage multipliers.

```tsx
import { useMultipliers } from '@features/gamification/ranks/hooks/useMultipliers';

const {
  totalMultiplier,         // number
  allSources,              // MultiplierSource[]
  permanentMultipliers,    // MultiplierSource[]
  temporaryMultipliers,    // MultiplierSource[]
  hasExpiringSoon,         // boolean
  calculateBonusXP,        // (baseXP: number) => number
  getMultiplierPercentage, // () => string
} = useMultipliers();

// Calculate bonus
const bonusXP = calculateBonusXP(100); // e.g., 250 with 2.5x multiplier
```

## State Management

Using Zustand with persistence:

```tsx
import { useRanksStore } from '@features/gamification/ranks/store/ranksStore';

// Direct store access
const userProgress = useRanksStore(state => state.userProgress);
const addXP = useRanksStore(state => state.addXP);

// With selectors
import { selectCurrentRank } from '@features/gamification/ranks/store/ranksStore';
const currentRank = useRanksStore(selectCurrentRank);
```

### Available Actions

- `addXP(amount, source, description?)` - Add XP and check for level/rank ups
- `levelUp()` - Level up the user
- `rankUp()` - Rank up the user
- `prestige()` - Prestige the user
- `updateMultipliers()` - Recalculate all multipliers
- `addMultiplierSource(source)` - Add a multiplier source
- `removeMultiplierSource(type)` - Remove a multiplier source

## Usage Examples

### Basic Rank Display

```tsx
import { RankBadgeAdvanced } from '@features/gamification/ranks/components/RankBadgeAdvanced';
import { useRank } from '@features/gamification/ranks/hooks/useRank';

function PlayerHeader() {
  const { currentRank, prestigeLevel } = useRank();

  return (
    <div className="flex items-center gap-3">
      <RankBadgeAdvanced
        rank={currentRank.id}
        prestigeLevel={prestigeLevel}
        size="md"
        showGlow={true}
      />
      <span>Detective #{currentRank.nameSpanish}</span>
    </div>
  );
}
```

### Progress Dashboard

```tsx
import { RankProgressBar } from '@features/gamification/ranks/components/RankProgressBar';
import { MultiplierWidget } from '@features/gamification/ranks/components/MultiplierWidget';
import { useProgression } from '@features/gamification/ranks/hooks/useProgression';

function ProgressDashboard() {
  const {
    currentXP,
    xpToNextLevel,
    currentLevel,
  } = useProgression();

  return (
    <div className="space-y-4">
      <RankProgressBar
        currentXP={currentXP}
        xpToNextLevel={xpToNextLevel}
        currentLevel={currentLevel}
        showStats={true}
      />
      <MultiplierWidget variant="detailed" />
    </div>
  );
}
```

### Award XP on Exercise Completion

```tsx
import { useProgression } from '@features/gamification/ranks/hooks/useProgression';

function ExerciseComplete() {
  const { addXP } = useProgression();

  const handleComplete = async (score: number) => {
    const baseXP = 100;
    const bonusXP = score === 100 ? 50 : 0;

    await addXP(
      baseXP + bonusXP,
      score === 100 ? 'perfect_score' : 'exercise_completion',
      'Completed Crucigrama Exercise'
    );
  };

  return <button onClick={() => handleComplete(100)}>Complete</button>;
}
```

## API Integration

### Backend Integration Points

The system is designed to integrate with backend APIs. Replace mock functions with actual API calls:

#### Add XP Endpoint
```typescript
// Example API call to replace mock
POST /api/gamification/xp
Body: {
  userId: string,
  amount: number,
  source: XPSource,
  description?: string
}
Response: AddXPResponse
```

#### Rank Up Endpoint
```typescript
POST /api/gamification/rankup
Body: {
  userId: string
}
Response: RankUpEvent
```

#### Prestige Endpoint
```typescript
POST /api/gamification/prestige
Body: {
  userId: string,
  confirmed: boolean
}
Response: PrestigeResponse
```

### Replacing Mock Data

In `ranksStore.ts`, replace mock implementations:

```typescript
// Current (mock):
addXP: async (amount: number, source: XPSource) => {
  // Mock implementation
}

// Replace with:
addXP: async (amount: number, source: XPSource) => {
  try {
    const response = await fetch('/api/gamification/xp', {
      method: 'POST',
      body: JSON.stringify({ userId, amount, source }),
    });
    const data = await response.json();
    // Update store with response
  } catch (error) {
    console.error('Failed to add XP:', error);
  }
}
```

## Type Definitions

All types are fully documented in `types/ranksTypes.ts`:

- `MayaRank` - Rank enum
- `RankDefinition` - Complete rank definition
- `UserRankProgress` - User progression state
- `PrestigeBonus` - Prestige tier bonuses
- `MultiplierSource` - Multiplier source definition
- `XPEvent` - XP earning event
- `RankUpEvent` - Rank up event
- `ProgressionHistoryEntry` - History entry

## Mock Data

Comprehensive mock data in `mockData/ranksMockData.ts`:

- `MAYA_RANKS` - All rank definitions
- `PRESTIGE_BONUSES` - Prestige tier bonuses (levels 1-10)
- `MOCK_USER_NACOM` - Beginner user
- `MOCK_USER_BATAB` - Intermediate user
- `MOCK_USER_HOLCATTE` - Advanced user
- `MOCK_USER_GUERRERO` - Expert user
- `MOCK_USER_MERCENARIO` - Master user (prestige ready)
- `MOCK_USER_PRESTIGE_1` - Prestiged user

### Helper Functions

- `getRankById(rankId)` - Get rank definition
- `getNextRank(currentRank)` - Get next rank in progression
- `calculateXPForLevel(level)` - Calculate XP needed for level
- `getPrestigeBonusByLevel(level)` - Get prestige bonus
- `calculateTotalMultiplier(sources)` - Calculate total multiplier

## Validation

All data structures are validated with Zod schemas in `schemas/ranksSchemas.ts`:

```typescript
import { UserRankProgressSchema } from '@features/gamification/ranks/schemas/ranksSchemas';

// Validate data
const result = UserRankProgressSchema.safeParse(userData);
if (result.success) {
  // Use result.data
}
```

## Testing

The system includes type checking and can be tested with:

```bash
# Type check
npm run type-check

# Future: Unit tests
npm test
```

## Roadmap

Future enhancements:

- [ ] Rank decay mechanics for inactivity
- [ ] Guild-based rank bonuses
- [ ] Seasonal rank resets
- [ ] Rank leaderboards
- [ ] Rank achievements
- [ ] Custom rank cosmetics shop
- [ ] Rank-based matchmaking

## Support

For issues or questions:
- Review type definitions in `types/ranksTypes.ts`
- Check mock data examples in `mockData/ranksMockData.ts`
- Examine component props and usage
- Verify Zustand store actions

---

**Version**: 1.0.0
**Last Updated**: 2025-10-16
**Status**: Production Ready (Frontend)
**Backend Integration**: Ready for API hookup
