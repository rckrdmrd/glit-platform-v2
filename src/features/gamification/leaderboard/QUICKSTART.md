# LiveLeaderboard - Quick Start Guide

Get started with the LiveLeaderboard component in under 5 minutes!

## Installation

The component is already integrated in the project. Just import and use:

```tsx
import { LiveLeaderboard } from '@/features/gamification/leaderboard';
```

## Basic Usage

### 1. Simplest Implementation

```tsx
import { LiveLeaderboard } from '@/features/gamification/leaderboard';

function MyPage() {
  return (
    <div className="container mx-auto p-6">
      <LiveLeaderboard userId="current-user-id" />
    </div>
  );
}
```

That's it! The component will:
- Display the Detective leaderboard by default
- Auto-refresh every 30 seconds
- Show the current user's position highlighted
- Display 20 entries with smooth animations

### 2. Choose Initial Type

```tsx
<LiveLeaderboard
  userId="current-user-id"
  initialType="xp"  // or 'completion', 'streak', 'detective'
/>
```

### 3. Customize Display

```tsx
<LiveLeaderboard
  userId="current-user-id"
  initialType="streak"
  itemsPerPage={15}          // Show 15 entries
  autoRefresh={false}        // Disable auto-refresh
/>
```

### 4. Add User Interaction

```tsx
<LiveLeaderboard
  userId="current-user-id"
  onUserClick={(userId) => {
    console.log('User clicked:', userId);
    // Navigate to profile or show modal
  }}
/>
```

## Leaderboard Types

| Type | Description | Display Format |
|------|-------------|----------------|
| `xp` | Total experience points | "15,000 XP" |
| `completion` | Completion percentage | "95.5%" |
| `streak` | Consecutive days | "30 días" |
| `detective` | Overall ranking | "10,000" |

## Features Out of the Box

### Visual Features
- Top 3 special icons (Crown, Medal, Trophy)
- User position highlighted with orange border
- Rank change indicators (up/down/same/new)
- Smooth stagger animations
- Responsive design (mobile, tablet, desktop)

### Functional Features
- Real-time auto-refresh (configurable)
- Manual refresh button
- Last updated timestamp
- Click handler for user entries
- Loading states
- Empty states
- Error handling

## Common Use Cases

### Dashboard Integration

```tsx
function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar with stats */}
      <div className="bg-white p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">My Stats</h3>
        {/* Your stats here */}
      </div>

      {/* Main leaderboard */}
      <div className="lg:col-span-2">
        <LiveLeaderboard userId="user-123" />
      </div>
    </div>
  );
}
```

### Multiple Leaderboards

```tsx
function LeaderboardsPage() {
  const [selectedType, setSelectedType] = useState('detective');

  return (
    <div>
      {/* Custom type selector */}
      <div className="mb-4">
        <button onClick={() => setSelectedType('xp')}>XP</button>
        <button onClick={() => setSelectedType('streak')}>Streak</button>
      </div>

      {/* Leaderboard */}
      <LiveLeaderboard
        userId="user-123"
        initialType={selectedType}
      />
    </div>
  );
}
```

### With Navigation

```tsx
function LeaderboardWithNav() {
  const navigate = useNavigate();

  return (
    <LiveLeaderboard
      userId="user-123"
      onUserClick={(userId) => navigate(`/profile/${userId}`)}
    />
  );
}
```

## Styling

### Default Styling
The component comes with complete styling using Tailwind CSS. No additional CSS needed!

### Custom Wrapper Styling

```tsx
<LiveLeaderboard
  userId="user-123"
  className="max-w-6xl mx-auto shadow-2xl"
/>
```

### Dark Mode Support

```tsx
<div className="dark:bg-gray-900">
  <LiveLeaderboard userId="user-123" />
</div>
```

## Performance Tips

### 1. Disable Auto-refresh When Not Visible

```tsx
const [isVisible, setIsVisible] = useState(true);

return (
  <LiveLeaderboard
    userId="user-123"
    autoRefresh={isVisible}
  />
);
```

### 2. Reduce Items for Mobile

```tsx
const isMobile = window.innerWidth < 768;

return (
  <LiveLeaderboard
    userId="user-123"
    itemsPerPage={isMobile ? 10 : 20}
  />
);
```

### 3. Increase Refresh Interval

```tsx
<LiveLeaderboard
  userId="user-123"
  refreshInterval={60000}  // 1 minute instead of 30 seconds
/>
```

## Troubleshooting

### Issue: Component not rendering

**Solution:** Make sure you're passing a valid `userId`:

```tsx
const userId = useAuth().user?.id;

if (!userId) return <div>Loading...</div>;

return <LiveLeaderboard userId={userId} />;
```

### Issue: Types showing wrong data

**Solution:** The component uses mock data by default. See [api-integration.md](./api-integration.md) to connect to real API.

### Issue: Animations lagging

**Solution:** Reduce the number of items or disable animations:

```tsx
<LiveLeaderboard
  userId="user-123"
  itemsPerPage={10}  // Fewer items = smoother animations
/>
```

### Issue: Auto-refresh too aggressive

**Solution:** Increase the refresh interval or disable it:

```tsx
<LiveLeaderboard
  userId="user-123"
  autoRefresh={false}  // Manual refresh only
/>
```

## Next Steps

1. **See More Examples**: Check [LiveLeaderboard.example.tsx](./LiveLeaderboard.example.tsx)
2. **Visual Testing**: Run Storybook with `npm run storybook`
3. **API Integration**: Read [api-integration.md](./api-integration.md)
4. **Full Documentation**: See [README.md](./README.md)
5. **Testing**: Check [LiveLeaderboard.test.tsx](./LiveLeaderboard.test.tsx)

## Quick Reference

### Props

```tsx
interface LiveLeaderboardProps {
  userId: string;                              // Required
  initialType?: 'xp' | 'completion' | 'streak' | 'detective';  // Default: 'detective'
  autoRefresh?: boolean;                       // Default: true
  refreshInterval?: number;                    // Default: 30000 (30s)
  itemsPerPage?: number;                       // Default: 20
  onUserClick?: (userId: string) => void;      // Optional
  className?: string;                          // Optional
}
```

### Default Values

```tsx
{
  initialType: 'detective',
  autoRefresh: true,
  refreshInterval: 30000,  // 30 seconds
  itemsPerPage: 20
}
```

### Imports

```tsx
// Main component
import { LiveLeaderboard } from '@/features/gamification/leaderboard';

// Types
import type {
  LiveLeaderboardProps,
  LeaderboardTypeVariant,
  LeaderboardEntry
} from '@/features/gamification/leaderboard';

// Utils (optional)
import {
  formatScore,
  calculatePercentile,
  getMotivationalMessage
} from '@/features/gamification/leaderboard/utils';

// Constants (optional)
import {
  LEADERBOARD_TYPES,
  RANK_TIERS,
  MOTIVATIONAL_MESSAGES
} from '@/features/gamification/leaderboard/constants';
```

## Support

- **Documentation**: [README.md](./README.md)
- **Examples**: [LiveLeaderboard.example.tsx](./LiveLeaderboard.example.tsx)
- **Tests**: [LiveLeaderboard.test.tsx](./LiveLeaderboard.test.tsx)
- **API Guide**: [api-integration.md](./api-integration.md)
- **Storybook**: Run `npm run storybook` and navigate to "Gamification/Leaderboard"

---

**Happy Coding!** 🎉

Need help? Check the full documentation or open an issue in the project repository.
