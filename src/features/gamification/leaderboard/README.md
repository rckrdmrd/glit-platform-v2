# LiveLeaderboard Component

Complete leaderboard implementation with real-time updates and multiple ranking types.

## Features

### Core Functionality
- **4 Leaderboard Types:**
  - **XP**: Total experience points ranking
  - **Completion**: Completion percentage ranking
  - **Streak**: Consecutive days streak ranking
  - **Detective**: Overall detective ranking

- **Real-time Updates**: Auto-refresh every 30 seconds (configurable)
- **User Position Highlight**: Current user's rank is prominently displayed
- **Top Rankings**: Special icons for top 3 positions (Crown, Medal, Trophy)
- **Rank Changes**: Visual indicators for rank improvements/declines
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Stagger animations for entries, transitions between types

### Components Structure

```
LiveLeaderboard
├── TypeSelector (Tab navigation)
├── UserRankCard (Current user highlight)
└── LeaderboardTable
    └── LeaderboardEntryRow[] (Individual entries)
```

## Usage

### Basic Usage

```tsx
import { LiveLeaderboard } from '@/features/gamification/leaderboard';

function MyPage() {
  return (
    <LiveLeaderboard
      userId="user-123"
      initialType="xp"
    />
  );
}
```

### Advanced Usage

```tsx
import { LiveLeaderboard, LeaderboardTypeVariant } from '@/features/gamification/leaderboard';

function MyPage() {
  const handleUserClick = (userId: string) => {
    console.log('User clicked:', userId);
    // Navigate to user profile or show details
  };

  return (
    <LiveLeaderboard
      userId="user-123"
      initialType="detective"
      autoRefresh={true}
      refreshInterval={60000} // 1 minute
      itemsPerPage={15}
      onUserClick={handleUserClick}
      className="max-w-6xl mx-auto"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `userId` | `string` | **required** | Current user's ID for highlighting |
| `initialType` | `LeaderboardTypeVariant` | `'detective'` | Initial leaderboard type to display |
| `autoRefresh` | `boolean` | `true` | Enable automatic refresh |
| `refreshInterval` | `number` | `30000` | Refresh interval in milliseconds |
| `itemsPerPage` | `number` | `20` | Number of entries to display |
| `onUserClick` | `(userId: string) => void` | `undefined` | Callback when user entry is clicked |
| `className` | `string` | `undefined` | Additional CSS classes |

## Types

### LeaderboardTypeVariant

```tsx
type LeaderboardTypeVariant = 'xp' | 'completion' | 'streak' | 'detective';
```

### LeaderboardEntry

```tsx
interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  rankBadge: string;
  score: number;
  xp: number;
  completionPercentage: number;
  streak: number;
  mlCoins: number;
  change: number;
  changeType: 'up' | 'down' | 'same' | 'new';
  isCurrentUser: boolean;
}
```

## Leaderboard Types Explained

### 1. XP (Experience Points)
- **Sort Key**: `xp`
- **Display**: Total XP accumulated
- **Format**: "15,000 XP"
- **Description**: Ranks users by total experience points earned

### 2. Completion
- **Sort Key**: `completionPercentage`
- **Display**: Percentage of content completed
- **Format**: "95.5%"
- **Description**: Ranks users by completion percentage

### 3. Streak
- **Sort Key**: `streak`
- **Display**: Consecutive days active
- **Format**: "30 días"
- **Description**: Ranks users by longest active streak
- **Special Icon**: Flame icon displayed for streak

### 4. Detective
- **Sort Key**: `score`
- **Display**: Overall detective score
- **Format**: "10,000"
- **Description**: General ranking based on overall performance

## Visual Features

### Rank Indicators

#### Top 3 Special Icons
- **1st Place**: Gold Crown 👑
- **2nd Place**: Silver Medal 🥈
- **3rd Place**: Bronze Trophy 🏆
- **4th+**: Rank number in colored badge

#### Rank Colors
- **1st**: Gold gradient (yellow-400 to yellow-600)
- **2nd**: Silver gradient (gray-300 to gray-500)
- **3rd**: Bronze gradient (orange-400 to orange-600)
- **4th+**: Detective gradient (blue to orange)

### Change Indicators
- **Up**: Green arrow ↗ (trending up)
- **Down**: Red arrow ↘ (trending down)
- **Same**: Gray dash — (no change)
- **New**: Gold sparkles ✨ (new entry)

### User Highlight
- Current user's entry has:
  - Orange gradient background
  - Border highlight
  - "Tú" badge
  - Elevated shadow
  - Orange text color

## Animations

### Entry Animations
- **Stagger Effect**: Each entry animates with 50ms delay
- **Initial**: Fade in from left (opacity 0, x: -20)
- **Hover**: Scale up slightly (1.01x) with shadow

### Tab Transitions
- **Active Tab**: Gradient background with glow
- **Switch**: Smooth spring animation
- **Icon**: Rotate and scale on activation

### User Card
- **Background Pattern**: Animated dots moving
- **Stats**: Stagger reveal with delays
- **Hover**: Avatar scales up on hover

## Integration with API

The component currently uses mock data but is designed for easy API integration:

```tsx
// Replace the generateMockLeaderboardData function with:
const fetchLeaderboardData = async () => {
  setLoading(true);
  try {
    const response = await fetch(`/api/leaderboard/${selectedType}?userId=${userId}`);
    const data = await response.json();
    setEntries(data);
    setLastUpdated(new Date());
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  } finally {
    setLoading(false);
  }
};
```

### Expected API Response Format

```json
{
  "entries": [
    {
      "rank": 1,
      "userId": "user-123",
      "username": "Maria García",
      "avatar": "/avatars/user-123.png",
      "rankBadge": "NACOM",
      "score": 10000,
      "xp": 15000,
      "completionPercentage": 95.5,
      "streak": 30,
      "mlCoins": 5000,
      "change": 2,
      "changeType": "up",
      "isCurrentUser": false
    }
    // ... more entries
  ],
  "totalParticipants": 1543,
  "lastUpdated": "2025-10-16T12:00:00Z"
}
```

## Related Components

The LiveLeaderboard works seamlessly with other leaderboard components:

```tsx
import {
  LiveLeaderboard,
  LeaderboardPodium,
  AdvancedLeaderboardTable,
  UserPositionCard
} from '@/features/gamification/leaderboard';

function CompleteDashboard() {
  return (
    <div>
      {/* Show podium for top 3 */}
      <LeaderboardPodium entries={topThree} />

      {/* Main live leaderboard */}
      <LiveLeaderboard userId="user-123" />

      {/* Or use advanced table with sorting */}
      <AdvancedLeaderboardTable
        entries={allEntries}
        currentUserId="user-123"
        showTopThreeInPodium={true}
      />
    </div>
  );
}
```

## Styling

The component uses Tailwind CSS with custom detective theme colors:

```css
/* Custom colors used */
--detective-blue: #2563eb;
--detective-orange: #f97316;
--detective-gold: #fbbf24;
--detective-text: #1f2937;
--detective-text-secondary: #6b7280;
--detective-bg: #f9fafb;
```

## Performance Considerations

- **Stagger Animation**: Controlled delay prevents layout thrashing
- **Memoization**: Consider wrapping sub-components in React.memo for large lists
- **Virtual Scrolling**: For 100+ entries, consider using react-window
- **Image Loading**: Fallback avatars prevent broken images
- **Auto-refresh**: Configurable interval to balance freshness vs. load

## Accessibility

- **Keyboard Navigation**: Tab through entries
- **Screen Readers**: Semantic HTML with ARIA labels
- **Color Contrast**: All text meets WCAG AA standards
- **Focus Indicators**: Clear focus states for all interactive elements

## Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LiveLeaderboard } from './LiveLeaderboard';

describe('LiveLeaderboard', () => {
  it('renders user position card', () => {
    render(<LiveLeaderboard userId="user-123" />);
    expect(screen.getByText('Tu Posición')).toBeInTheDocument();
  });

  it('switches between leaderboard types', () => {
    render(<LiveLeaderboard userId="user-123" initialType="xp" />);
    fireEvent.click(screen.getByText('Racha'));
    // Verify streak leaderboard is displayed
  });

  it('highlights current user entry', () => {
    render(<LiveLeaderboard userId="user-123" />);
    expect(screen.getByText('Tú')).toBeInTheDocument();
  });
});
```

## Future Enhancements

- [ ] Filter by time period (daily, weekly, monthly)
- [ ] Export leaderboard as image/PDF
- [ ] Share position on social media
- [ ] Guild/team leaderboards
- [ ] Achievement-based rankings
- [ ] Historical rank progression chart
- [ ] Predictions for next rank
- [ ] Challenge friends directly from leaderboard

## Support

For issues or questions, please refer to:
- Main documentation: `/docs/gamification/leaderboard.md`
- API documentation: `/docs/api/leaderboard.md`
- Component Storybook: Run `npm run storybook`
