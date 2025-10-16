# Enhanced Leaderboard System

## Overview

A comprehensive leaderboard system with multiple ranking categories, competitive features, and advanced filtering capabilities. Built with React 19, TypeScript, Framer Motion, and Tailwind CSS.

## Features

### 🏆 Core Features
- **Multiple Leaderboard Types**: Global, School, Grade, Friends, Guild
- **3D Animated Podium**: Top 3 players with confetti effects
- **User Position Card**: Highlighted card with motivational messages
- **Advanced Filtering**: Time period, metric selection, and search
- **Sortable Table**: Click column headers to sort
- **Pagination**: 50 entries per page with smooth navigation
- **Export Functionality**: CSV and PDF export
- **Real-time Updates**: Auto-refresh every 60 seconds
- **Deep Linking**: URL-based tab navigation
- **Responsive Design**: Mobile, tablet, and desktop optimized

### 🎨 Visual Features
- Animated entrance effects
- Rank change indicators with colored arrows
- Medal icons for top 3
- Gradient backgrounds based on rank
- Smooth transitions between views
- Loading states and error handling
- Empty states for each tab

## Components

### 1. LeaderboardPodium (383 lines)
**Location**: `LeaderboardPodium.tsx`

3D podium visualization for top 3 players with:
- Animated entrance (rise from bottom)
- Confetti animation for #1
- Different heights for each position
- Crown, medal, and award icons
- Responsive (stacks on mobile)

```tsx
<LeaderboardPodium topThree={topThree} />
```

### 2. UserPositionCard (321 lines)
**Location**: `UserPositionCard.tsx`

Highlighted card showing user's position with:
- Gradient background based on rank
- Motivational messages
- XP to next rank progress bar
- Share rank button
- Quick stats display

```tsx
<UserPositionCard
  userEntry={userPosition}
  pointsToNext={1000}
  percentile={85}
  onShare={handleShare}
/>
```

### 3. EnhancedLeaderboardTabs (181 lines)
**Location**: `EnhancedLeaderboardTabs.tsx`

Tab navigation with:
- 5 tabs: Global, School, Grade, Friends, Guild
- Count badges showing total users
- Active state styling
- Icons for each tab
- Smooth transitions

```tsx
<EnhancedLeaderboardTabs
  selectedType="global"
  onTypeChange={setTab}
  counts={{ global: 10000, school: 500 }}
/>
```

### 4. LeaderboardFilters (313 lines)
**Location**: `LeaderboardFilters.tsx`

Advanced filtering options:
- **Time Period**: All Time, Month, Week, Today
- **Metric**: XP, Level, ML Coins, Achievements
- **Search**: User search with live filtering
- **Export**: CSV/PDF download button

```tsx
<LeaderboardFilters
  timePeriod="all_time"
  onTimePeriodChange={setPeriod}
  metric="xp"
  onMetricChange={setMetric}
  searchQuery={search}
  onSearchChange={setSearch}
  onExport={exportData}
/>
```

### 5. AdvancedLeaderboardTable (415 lines)
**Location**: `AdvancedLeaderboardTable.tsx`

Feature-rich table with:
- Sortable columns (click to sort)
- Pagination controls
- User row highlighting (gold border)
- Rank change indicators
- Medal icons for top 3
- Jump to user position button
- Empty states

```tsx
<AdvancedLeaderboardTable
  entries={leaderboard}
  currentUserId="user-123"
  showTopThreeInPodium={true}
  itemsPerPage={50}
/>
```

### 6. RankChangeIndicator (177 lines)
**Location**: `RankChangeIndicator.tsx`

Visual rank change indicator:
- Arrow icons (↑ up, ↓ down, → same)
- Color coded (green, red, gray)
- Position change number
- Tooltip with details

```tsx
<RankChangeIndicator
  change={5}
  changeType="up"
  size="md"
  showLabel={true}
/>
```

## Hooks

### useAdvancedLeaderboard (249 lines)
**Location**: `useAdvancedLeaderboard.ts`

Main hook for leaderboard management:

```tsx
const {
  leaderboard,
  filteredLeaderboard,
  userPosition,
  topThree,
  totalParticipants,
  currentTab,
  setTab,
  timePeriod,
  setTimePeriod,
  metric,
  setMetric,
  searchQuery,
  setSearchQuery,
  loading,
  error,
  refresh,
  exportData,
  tabCounts,
} = useAdvancedLeaderboard('global', 'user-123');
```

**Features**:
- API integration with caching (60s cache)
- Auto-refresh every 60 seconds
- Search functionality
- Export to CSV/PDF
- Error handling
- Loading states

## Page

### EnhancedLeaderboardPage (434 lines)
**Location**: `/apps/student/pages/EnhancedLeaderboardPage.tsx`

Complete leaderboard page with:
- All components integrated
- Deep linking support (`/leaderboard?tab=friends`)
- Responsive layout
- Sidebar with stats and tips
- Error states
- Loading states

**Routes**:
- `/leaderboard` - Main route with tab query params
- `/student/leaderboard` - Legacy route (redirects to above)

## Utilities

### leaderboardExport (299 lines)
**Location**: `utils/leaderboardExport.ts`

Export utilities:
- **CSV Export**: Downloads spreadsheet-ready CSV
- **PDF Export**: Opens print-friendly HTML for PDF save
- Filename includes type, period, metric, and date

```tsx
exportLeaderboard('csv', {
  entries: leaderboard,
  leaderboardType: 'global',
  timePeriod: 'all_time',
  metric: 'xp'
});
```

## Types

```typescript
// Leaderboard Types
type ExtendedLeaderboardType = 'global' | 'school' | 'grade' | 'friends' | 'guild';
type TimePeriod = 'all_time' | 'month' | 'week' | 'today';
type Metric = 'xp' | 'level' | 'ml_coins' | 'achievements';
type RankChange = 'up' | 'down' | 'same' | 'new';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  rankBadge: string;
  score: number;
  xp: number;
  mlCoins: number;
  change: number;
  changeType: RankChange;
  isCurrentUser: boolean;
}
```

## API Integration

### Endpoints (Currently using mock data)

Replace these in `useAdvancedLeaderboard.ts`:

```typescript
// Global
GET /api/gamification/leaderboard/global?period={period}&metric={metric}

// School
GET /api/gamification/leaderboard/school/:schoolId?period={period}&metric={metric}

// Grade
GET /api/gamification/leaderboard/grade/:grade?period={period}&metric={metric}

// Friends
GET /api/gamification/leaderboard/friends/:userId?period={period}&metric={metric}

// Guild
GET /api/gamification/leaderboard/guild/:guildId?period={period}&metric={metric}
```

### Response Format

```json
{
  "entries": [
    {
      "rank": 1,
      "userId": "user-123",
      "username": "Player1",
      "avatar": "https://...",
      "rankBadge": "Master",
      "score": 10000,
      "xp": 10000,
      "mlCoins": 500,
      "change": 5,
      "changeType": "up",
      "isCurrentUser": false
    }
  ],
  "totalParticipants": 100,
  "userRank": 10
}
```

## Animations

### Podium Entrance
- Rise from bottom with spring bounce
- Staggered delays: 1st (0s), 2nd (0.2s), 3rd (0.4s)
- Confetti for winner (50 particles, 3s duration)

### Table Rows
- Fade-in with stagger (0.03s delay each)
- User row: pulse glow animation
- Hover: background color transition

### Tab Switching
- Fade out → swap → fade in
- Active indicator slides smoothly

### Rank Change
- Number count-up animation
- Icon rotate + scale on mount

## Performance Optimizations

1. **Caching**: 60s cache per tab/filter combination
2. **Memoization**: useMemo for filtered/sorted data
3. **Lazy Loading**: Component is lazy-loaded
4. **Debounced Search**: 300ms debounce on search input
5. **Virtual Scrolling**: Ready for react-window integration
6. **Image Lazy Loading**: Avatar images load on demand

## Accessibility

- ✅ Keyboard navigation (arrow keys in table)
- ✅ Screen reader announcements for rank changes
- ✅ ARIA labels on interactive elements
- ✅ Focus management
- ✅ High contrast mode support

## Responsive Breakpoints

- **Mobile** (< 768px): Card layout, vertical podium
- **Tablet** (768px - 1024px): Reduced columns
- **Desktop** (> 1024px): Full table with sidebar

## Theme Integration

### Detective Theme Colors
- **Orange** (`detective-orange`): Active tabs, user row
- **Gold** (`detective-gold`): 1st place, trophies
- **Blue** (`detective-blue`): Table headers, metric buttons
- **Gradients**: Rank-based backgrounds

## Usage Example

```tsx
import EnhancedLeaderboardPage from '@/apps/student/pages/EnhancedLeaderboardPage';

// In your router
<Route path="/leaderboard" element={<EnhancedLeaderboardPage />} />

// Deep linking
Navigate to: /leaderboard?tab=friends
```

## Customization

### Change Items Per Page
```tsx
<AdvancedLeaderboardTable
  entries={entries}
  itemsPerPage={100} // Default: 50
/>
```

### Disable Auto-refresh
```tsx
// In useAdvancedLeaderboard.ts, comment out:
// useEffect(() => {
//   const interval = setInterval(() => {
//     fetchLeaderboard(currentTab, timePeriod, metric, false);
//   }, AUTO_REFRESH_INTERVAL);
//   return () => clearInterval(interval);
// }, [currentTab, timePeriod, metric, fetchLeaderboard]);
```

### Custom Export Filename
```tsx
// In leaderboardExport.ts, modify:
const filename = `my_leaderboard_${timestamp}.csv`;
```

## Future Enhancements

- [ ] WebSocket real-time updates
- [ ] Social features (challenge friend, compare stats)
- [ ] Achievement badges in table
- [ ] Shareable rank images
- [ ] Guilds/Teams leaderboard
- [ ] Historical rank tracking
- [ ] Mobile app integration
- [ ] Push notifications for rank changes

## File Structure

```
src/
├── apps/student/pages/
│   └── EnhancedLeaderboardPage.tsx (434 lines)
└── features/gamification/social/
    ├── components/Leaderboards/
    │   ├── LeaderboardPodium.tsx (383 lines)
    │   ├── UserPositionCard.tsx (321 lines)
    │   ├── EnhancedLeaderboardTabs.tsx (181 lines)
    │   ├── LeaderboardFilters.tsx (313 lines)
    │   ├── AdvancedLeaderboardTable.tsx (415 lines)
    │   ├── RankChangeIndicator.tsx (177 lines)
    │   └── index.ts (barrel export)
    ├── hooks/
    │   └── useAdvancedLeaderboard.ts (249 lines)
    └── utils/
        └── leaderboardExport.ts (299 lines)
```

**Total Lines**: 2,772 lines of TypeScript/React code

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## License

Part of GLIT Platform - © 2025
