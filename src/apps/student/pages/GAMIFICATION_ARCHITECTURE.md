# GamificationPage Architecture

## Component Hierarchy

```
GamificationPageComprehensive
│
├── GamifiedHeader (shared)
│   ├── User info
│   └── Logout button
│
├── Page Header (sticky)
│   ├── Back button
│   ├── Title & subtitle
│   └── Refresh button
│
└── Main Content (6 sections)
    │
    ├── Section 1: GamificationHero
    │   ├── Rank Badge (animated)
    │   │   ├── Icon (emoji)
    │   │   ├── Rank name
    │   │   └── Level & multiplier
    │   ├── XP Progress
    │   │   ├── Progress bar
    │   │   ├── Current/Next XP
    │   │   └── Remaining XP
    │   ├── ML Coins Display
    │   │   ├── Balance (large)
    │   │   └── Floating animations
    │   └── Stats Grid
    │       ├── Level
    │       ├── XP Total
    │       └── Multiplier
    │
    ├── Section 2: MLCoinsSection
    │   ├── Stats Cards
    │   │   ├── Today's Earnings (green)
    │   │   ├── Today's Spending (red)
    │   │   └── Total Balance (gold)
    │   ├── Mini Bar Chart
    │   │   ├── Earned bar
    │   │   └── Spent bar
    │   ├── Transaction History
    │   │   └── Last 5 transactions
    │   └── Quick Actions
    │       ├── Go to Shop
    │       ├── View Wallet
    │       └── Earn More
    │
    ├── Section 3: RanksSection
    │   ├── Current Rank Showcase
    │   │   ├── Large badge
    │   │   ├── Description
    │   │   └── Stats (Level, XP, Multiplier)
    │   ├── Requirements for Next Rank
    │   │   ├── Next rank preview
    │   │   ├── Requirements list (4 items)
    │   │   └── Progress bars
    │   ├── Rank Progression Ladder
    │   │   ├── NACOM (Detective Novato)
    │   │   ├── BATAB (Sargento)
    │   │   ├── HOLCATTE (Teniente)
    │   │   ├── GUERRERO (Capitán)
    │   │   └── MERCENARIO (Comisario)
    │   └── Rank History
    │       └── Timeline of past ranks
    │
    ├── Section 4: AchievementsPreview
    │   ├── Category Filters
    │   │   ├── All
    │   │   ├── Recent
    │   │   ├── Rare
    │   │   └── Legendary
    │   ├── Achievement Grid (2x3)
    │   │   └── Achievement Cards
    │   │       ├── Rarity badge
    │   │       ├── Icon
    │   │       ├── Title
    │   │       ├── Description
    │   │       ├── Progress bar (if locked)
    │   │       └── Rewards (ML + XP)
    │   └── View All Button
    │
    ├── Section 5: LeaderboardPreview
    │   ├── Filter Tabs
    │   │   ├── Global
    │   │   ├── School
    │   │   ├── Grade
    │   │   └── Friends
    │   ├── User Position Badge
    │   │   ├── Position number
    │   │   ├── Points
    │   │   ├── Top percentage
    │   │   └── Change indicator
    │   ├── Top 3 Podium
    │   │   ├── 1st place (gold)
    │   │   ├── 2nd place (silver)
    │   │   └── 3rd place (bronze)
    │   └── View Full Leaderboard Button
    │
    └── Section 6: StreaksMissionsSection
        ├── Streaks
        │   ├── Current Streak
        │   │   ├── Counter (large)
        │   │   ├── Fire animation
        │   │   ├── 7-day grid
        │   │   └── Last activity date
        │   └── Longest Streak
        │       ├── Trophy icon
        │       └── Record number
        └── Daily Missions
            └── Mission Cards (up to 3)
                ├── Icon
                ├── Title & description
                ├── Progress bar
                ├── Rewards (ML + XP)
                └── Claim button
```

## Data Flow

```
useGamificationData Hook
│
├── Fetches from API
│   ├── /api/gamification/ranks/user/:userId
│   ├── /api/gamification/coins/:userId
│   ├── /api/gamification/achievements/:userId?limit=6
│   ├── /api/gamification/leaderboard/user/:userId/position
│   ├── /api/gamification/missions/daily
│   └── /api/gamification/streaks/:userId
│
├── Processes Data
│   ├── Combines all responses
│   ├── Handles errors → fallback to mock data
│   └── Manages loading states
│
└── Returns
    ├── user: User data
    ├── rankData: Current rank & XP
    ├── mlCoins: Balance & transactions
    ├── achievements: Recent achievements
    ├── leaderboardPosition: User's position
    ├── missions: Daily missions
    ├── streaks: Streak data
    ├── loading: Boolean
    ├── error: String | null
    └── refresh: Function
```

## State Management

```
Component State (Local)
│
├── GamificationPageComprehensive
│   └── isRefreshing: boolean
│
├── AchievementsPreview
│   └── filter: 'all' | 'recent' | 'rare' | 'legendary'
│
└── LeaderboardPreview
    └── filter: 'global' | 'school' | 'grade' | 'friends'

Hook State (useGamificationData)
│
├── data: GamificationData | null
├── loading: boolean
├── error: string | null
└── Methods
    └── refresh(): Promise<void>
```

## Animation Timeline

```
Page Load (0s - 2s)
│
├── 0.0s: Page fade in
├── 0.1s: Hero section entrance
│   ├── Rank badge rotation + scale
│   ├── XP progress bar width animation
│   └── ML Coins pulse
├── 0.2s: ML Coins section cards
│   ├── Earnings card (green)
│   ├── Spending card (red)
│   └── Balance card (gold)
├── 0.3s: Transaction history stagger
├── 0.4s: Bar chart animation
├── 0.5s: Ranks section
│   ├── Current rank showcase
│   └── Requirements cards
├── 0.6s: Rank ladder progressive reveal
│   ├── NACOM (0.6s)
│   ├── BATAB (0.7s)
│   ├── HOLCATTE (0.8s)
│   ├── GUERRERO (0.9s)
│   └── MERCENARIO (1.0s)
├── 0.8s: Achievements grid stagger
│   ├── Card 1 (0.8s)
│   ├── Card 2 (0.9s)
│   ├── Card 3 (1.0s)
│   ├── Card 4 (1.1s)
│   ├── Card 5 (1.2s)
│   └── Card 6 (1.3s)
├── 1.0s: Leaderboard section
│   ├── Position badge entrance
│   └── Top 3 podium stagger
└── 1.2s: Streaks & Missions
    ├── Streak counter
    ├── Fire animation (continuous)
    └── Mission cards

Continuous Animations
│
├── Rank badge: Pulse (2s loop)
├── ML Coins icon: Rotate + scale (3s loop)
├── XP progress: Shine effect (2s loop, 1s delay)
├── Fire icon: Scale + rotate (2s loop)
├── 1st place podium: Float up/down (2s loop)
├── Position badge: Pulsing ring (2s loop)
└── Legendary achievements: Shimmer (2s loop)
```

## Responsive Breakpoints

```
Mobile (< 768px)
├── 1 column layout
├── Hero: vertical stack
├── Stats: 2 columns max
├── Achievement grid: 1 column
├── Podium: simplified
└── Reduced padding/margins

Tablet (768px - 1024px)
├── 2 column layout
├── Hero: horizontal on landscape
├── Stats: 3 columns
├── Achievement grid: 2 columns
├── Podium: full display
└── Standard spacing

Desktop (> 1024px)
├── 2-3 column layout
├── Hero: full horizontal
├── Stats: 3-4 columns
├── Achievement grid: 3 columns
├── Podium: full with animations
└── Generous spacing
```

## File Dependencies

```
GamificationPageComprehensive.tsx
│
├── React & Hooks
│   ├── react
│   └── react-router-dom
│
├── Animation
│   └── framer-motion
│
├── Icons
│   └── lucide-react
│
├── Shared Components
│   └── @shared/components/layout/GamifiedHeader
│
├── Section Components
│   ├── ./components/gamification/GamificationHero
│   ├── ./components/gamification/MLCoinsSection
│   ├── ./components/gamification/RanksSection
│   ├── ./components/gamification/AchievementsPreview
│   ├── ./components/gamification/LeaderboardPreview
│   └── ./components/gamification/StreaksMissionsSection
│
└── Hooks & Types
    └── ./hooks/useGamificationData
```

## Color Palette

```
Primary Colors
├── Detective Orange: #f97316
├── Detective Gold: #f59e0b
├── Detective Blue: #1e3a8a
└── Detective Red: #dc2626

Background Gradients
├── Page: from-orange-50 via-amber-50 to-orange-100
├── Hero: from-orange-600 via-orange-700 to-orange-800
├── Earnings: from-green-50 to-emerald-100
├── Spending: from-red-50 to-rose-100
└── Balance: from-yellow-50 via-amber-100 to-orange-100

Rank Gradients
├── NACOM: from-gray-600 to-gray-800
├── BATAB: from-blue-600 to-blue-800
├── HOLCATTE: from-purple-600 to-purple-800
├── GUERRERO: from-orange-600 to-red-700
└── MERCENARIO: from-yellow-500 to-orange-600

Rarity Colors
├── Common: gray-100 / gray-300 / gray-400
├── Rare: blue-50 / blue-300 / blue-500
├── Epic: orange-50 / orange-300 / orange-500
└── Legendary: yellow-50 / yellow-400 / gold
```

## Performance Metrics

```
Target Metrics
├── First Contentful Paint: < 1.5s
├── Largest Contentful Paint: < 2.5s
├── Time to Interactive: < 3.0s
├── Total Blocking Time: < 300ms
├── Cumulative Layout Shift: < 0.1
└── Animation FPS: 60fps

Bundle Size (estimated)
├── Main component: ~12KB
├── Section components: ~85KB
├── Hook: ~8.5KB
├── Dependencies (framer-motion): ~60KB
└── Total (gzipped): ~40KB
```

---

This architecture provides a clear overview of how all components work together to create a comprehensive, animated, and responsive gamification experience.
