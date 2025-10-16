# Gamification & Social Features System

Comprehensive achievement, power-up, leaderboard, guild, and friend system for the GLIT Platform.

## Overview

This module implements a complete gamification and social features system including:
- **40+ Achievements** across 4 categories (Progress, Mastery, Social, Hidden)
- **8 Power-ups** (4 core + 4 advanced) with cooldowns and active durations
- **4 Leaderboard types** (Global, School, Grade, Friends) with seasonal rankings
- **Guild/Team system** with challenges, roles, and collaborative gameplay
- **Friend system** with activity feeds, recommendations, and social interactions

## File Structure

```
src/features/gamification/social/
├── components/
│   ├── Achievements/
│   │   ├── AchievementCard.tsx          - Individual achievement display
│   │   ├── AchievementsList.tsx         - Grid view with filters
│   │   ├── AchievementUnlockModal.tsx   - Celebration modal with confetti
│   │   ├── TrophyRoom.tsx               - Gallery of unlocked achievements
│   │   ├── ProgressTreeVisualizer.tsx   - Tree view of achievement progress
│   │   └── AchievementNotification.tsx  - Toast notifications
│   ├── PowerUps/
│   │   ├── PowerUpCard.tsx              - Individual power-up card
│   │   ├── PowerUpShop.tsx              - Purchase interface
│   │   ├── PowerUpInventory.tsx         - User's owned power-ups
│   │   ├── PowerUpUsageModal.tsx        - Confirmation dialog
│   │   ├── ActivePowerUps.tsx           - Currently active power-ups HUD
│   │   └── CooldownTimer.tsx            - Countdown display
│   ├── Leaderboards/
│   │   ├── LeaderboardLayout.tsx        - Main leaderboard page
│   │   ├── LeaderboardTabs.tsx          - Type switcher
│   │   ├── LeaderboardEntry.tsx         - Individual rank entry
│   │   ├── GlobalLeaderboard.tsx        - Worldwide rankings
│   │   ├── SchoolLeaderboard.tsx        - School-specific
│   │   ├── GradeLeaderboard.tsx         - Grade-level
│   │   ├── FriendsLeaderboard.tsx       - Friends-only
│   │   └── SeasonSelector.tsx           - Time period selector
│   ├── Guilds/
│   │   ├── GuildsList.tsx               - Browse available guilds
│   │   ├── GuildCard.tsx                - Guild preview card
│   │   ├── GuildCreation.tsx            - Create new guild form
│   │   ├── GuildManagement.tsx          - Admin controls
│   │   ├── GuildDashboard.tsx           - Guild home page
│   │   ├── GuildMembersList.tsx         - Members with roles
│   │   ├── GuildChallenges.tsx          - Active challenges
│   │   ├── GuildLeaderboard.tsx         - Guild rankings
│   │   └── GuildSettings.tsx            - Configuration
│   └── Friends/
│       ├── FriendsList.tsx              - All friends list
│       ├── FriendCard.tsx               - Friend info card
│       ├── FriendRequests.tsx           - Pending requests
│       ├── FriendRecommendations.tsx    - Suggested friends
│       ├── AddFriend.tsx                - Add friend form
│       ├── ActivityFeed.tsx             - Friend activity stream
│       └── FriendSearch.tsx             - Search users
├── types/
│   ├── achievementsTypes.ts             - Achievement type definitions
│   ├── powerUpsTypes.ts                 - Power-up types
│   ├── leaderboardsTypes.ts             - Leaderboard types
│   ├── guildsTypes.ts                   - Guild & challenge types
│   └── friendsTypes.ts                  - Friend & activity types
├── schemas/
│   └── socialSchemas.ts                 - Zod validation schemas
├── store/
│   ├── achievementsStore.ts             - Zustand store for achievements
│   ├── powerUpsStore.ts                 - Power-ups state management
│   ├── leaderboardsStore.ts             - Leaderboard data
│   ├── guildsStore.ts                   - Guild management
│   └── friendsStore.ts                  - Friend relationships
├── hooks/
│   ├── useAchievements.ts               - Achievement operations
│   ├── usePowerUps.ts                   - Power-up operations
│   ├── useLeaderboards.ts               - Leaderboard queries
│   ├── useGuilds.ts                     - Guild operations
│   └── useFriends.ts                    - Friend operations
└── mockData/
    ├── achievementsMockData.ts          - 40+ mock achievements
    ├── powerUpsMockData.ts              - 8 power-ups
    ├── leaderboardsMockData.ts          - 100+ mock rankings
    ├── guildsMockData.ts                - 10 guilds with members
    └── friendsMockData.ts               - 15 friends with activity
```

## Achievements System

### Achievement Categories

#### Progress Achievements (15)
- **First Steps**: Complete first exercise (+25 ML, +50 XP)
- **Getting Started**: Complete 5 exercises (+50 ML, +100 XP)
- **Dedicated Learner**: Complete 25 exercises (+75 ML, +200 XP)
- **Master Student**: Complete 100 exercises (+150 ML, +500 XP)
- **Module Explorer**: Complete all exercises in Module 1
- **Full Journey**: Complete all 5 modules (+200 ML, +1000 XP) [Legendary]
- **Speed Demon**: Complete exercise in under 2 minutes
- **Perfect Start**: Get 100% on first exercise
- **Consistency King**: 7-day streak
- **Marathon Runner**: 30-day streak (+200 ML, +800 XP) [Legendary]
- **Early Bird**: Study before 9 AM
- **Night Owl**: Study after 10 PM
- **Weekend Warrior**: Study on weekend
- **Level 10**: Reach level 10
- **Level 50**: Reach level 50 (+200 ML, +1000 XP) [Legendary]

#### Mastery Achievements (12)
- **Perfect Score**: Get 100% on any exercise
- **Perfectionista**: Get 100% on 10 exercises
- **Master Detective**: 100% on all Detective Textual exercises [Epic]
- **Speed Master**: 10 exercises under 3 minutes each [Epic]
- **Combo Master**: 10 perfect exercises consecutively [Legendary]
- **No Mistakes**: 5 exercises with 0 errors
- **Triple Crown**: Top 3 in 3 different leaderboards [Legendary]
- **Einstein Mode**: Hardest difficulty without hints [Legendary]
- **One Shot**: Complete exercise on first try
- **All Rounder**: At least 1 exercise from each module [Epic]
- **Specialist**: Master one specific mechanic type [Epic]
- **Grand Master**: Unlock all achievements in one category [Legendary]

#### Social Achievements (8)
- **Social Butterfly**: Add 5 friends
- **Team Player**: Join a guild
- **Guild Leader**: Create a guild
- **Helpful**: Help 10 friends
- **Popular**: Have 25 friends [Epic]
- **Influencer**: Get 100 achievement praises [Epic]
- **Collaborator**: Complete 5 team challenges
- **Mentor**: Mentor 3 students [Epic]

#### Hidden Achievements (5)
- **Easter Egg Hunter**: Find hidden Marie Curie fact [Legendary]
- **Time Traveler**: Study at midnight on Marie Curie's birthday [Legendary]
- **Secret Society**: Unlock special badge combination [Legendary]
- **Code Breaker**: Solve hidden puzzle in interface [Legendary]
- **Platinum Detective**: Reach prestige level 5 [Legendary]

### Rarity Levels
- **Common**: Gray badge, standard rewards
- **Rare**: Blue badge, enhanced rewards
- **Epic**: Orange badge, high rewards, special effects
- **Legendary**: Gold badge with glow effect, maximum rewards, confetti celebration

### Usage Example

```typescript
import { useAchievements } from '@/features/gamification/social/hooks/useAchievements';

function MyComponent() {
  const {
    achievements,
    unlockAchievement,
    updateProgress,
    stats,
  } = useAchievements();

  const handleExerciseComplete = () => {
    // Update progress on existing achievement
    updateProgress('progress-003', 16);

    // Check if conditions met and unlock
    if (exerciseCount >= 5) {
      unlockAchievement('progress-002');
    }
  };

  return (
    <div>
      <p>Unlocked: {stats.unlockedAchievements}/{stats.totalAchievements}</p>
      {/* Display achievements */}
    </div>
  );
}
```

## Power-ups System

### Core Power-ups (4)

1. **Pistas Mejoradas** (15 ML)
   - Effect: 2 additional detailed hints
   - Cooldown: 10 minutes
   - Use: Instant

2. **Visión Lectora** (25 ML)
   - Effect: AI-powered reading assistance
   - Duration: 30 minutes
   - Cooldown: 60 minutes

3. **Segunda Oportunidad** (15 ML)
   - Effect: Retry exercise without penalty
   - Cooldown: 30 minutes
   - Use: Instant

4. **Extensión de Tiempo** (10 ML)
   - Effect: Add 5 minutes to timer
   - Cooldown: 15 minutes
   - Use: Instant

### Advanced Power-ups (4)

5. **Multiplicador Temporal** (50 ML)
   - Effect: 2x ML Coins multiplier
   - Duration: 60 minutes
   - Cooldown: 180 minutes

6. **Auto-Completar** (100 ML)
   - Effect: Instant complete with 100%
   - Cooldown: 360 minutes
   - Max usages: 5

7. **Boost Colaborativo** (30 ML)
   - Effect: 50% bonus for all guild members
   - Duration: 30 minutes
   - Cooldown: 120 minutes
   - Requires: Guild membership

8. **Protección de Racha** (75 ML)
   - Effect: Prevents streak loss once
   - Use: Instant
   - One-time use

### Usage Example

```typescript
import { usePowerUps } from '@/features/gamification/social/hooks/usePowerUps';

function PowerUpShop() {
  const {
    powerUps,
    userMlCoins,
    purchasePowerUp,
    usePowerUp,
    getActivePowerUps,
  } = usePowerUps();

  const handlePurchase = (powerUpId: string) => {
    if (purchasePowerUp(powerUpId)) {
      console.log('Purchase successful!');
    }
  };

  const handleUse = (powerUpId: string) => {
    if (usePowerUp(powerUpId)) {
      console.log('Power-up activated!');
    }
  };

  const activePowerUps = getActivePowerUps();

  return (
    <div>
      <p>Balance: {userMlCoins} ML</p>
      <p>Active Power-ups: {activePowerUps.length}</p>
    </div>
  );
}
```

## Leaderboards System

### Leaderboard Types

1. **Global Leaderboard**
   - Top 100 users worldwide
   - Ranked by total XP or ML Coins
   - Seasonal competitions

2. **School Leaderboard**
   - Top users from same school
   - Encourages local competition

3. **Grade Level Leaderboard**
   - Students in same grade
   - Fair peer competition

4. **Friends Leaderboard**
   - Rankings among friends only
   - Personal competition

### Time Periods
- Daily
- Weekly
- Monthly
- All-time

### Features
- Rank badges for top 3 (Gold, Silver, Bronze)
- Rank change indicators (↑ up, ↓ down, — same, ✨ new)
- User highlighting when ranked
- Real-time updates (mocked)

### Usage Example

```typescript
import { useLeaderboards } from '@/features/gamification/social/hooks/useLeaderboards';

function Leaderboards() {
  const {
    currentLeaderboard,
    setLeaderboardType,
    setTimePeriod,
    getUserPosition,
  } = useLeaderboards();

  return (
    <div>
      <p>Your Position: #{getUserPosition()}</p>
      <button onClick={() => setLeaderboardType('global')}>
        Global
      </button>
      <button onClick={() => setLeaderboardType('friends')}>
        Friends
      </button>
    </div>
  );
}
```

## Guild System

### Features
- Create guilds with custom names, descriptions, and emblems
- Member roles: Leader, Officer, Member
- Maximum 50 members per guild
- Guild leveling and XP system
- Guild challenges (collaborative and competitive)
- Guild activity feed
- Guild-specific leaderboards

### Guild Requirements
- Minimum level requirements
- Minimum rank requirements
- Public or private guilds

### Guild Challenges
- **Collaborative**: All members work together toward a goal
- **Competitive**: Guild vs Guild competitions
- Rewards: ML Coins, XP, Guild XP

### Usage Example

```typescript
import { useGuilds } from '@/features/gamification/social/hooks/useGuilds';

function GuildManagement() {
  const {
    userGuild,
    guildMembers,
    guildChallenges,
    joinGuild,
    leaveGuild,
    createGuild,
  } = useGuilds();

  const handleJoin = (guildId: string) => {
    joinGuild(guildId);
  };

  return (
    <div>
      {userGuild ? (
        <>
          <h2>{userGuild.name}</h2>
          <p>Members: {guildMembers.length}</p>
          <p>Active Challenges: {guildChallenges.length}</p>
        </>
      ) : (
        <button onClick={() => createGuild({ name: 'My Guild' })}>
          Create Guild
        </button>
      )}
    </div>
  );
}
```

## Friend System

### Features
- Add friends by username/email
- Friend requests (send/accept/decline)
- Friend recommendations based on:
  - Common interests
  - Mutual friends
  - Same school/grade
  - Guild membership
- Friend activity feed
- Online/offline status
- Study together invitations
- Achievement praise/celebration

### Friend Activity Types
- Achievement unlocks
- Rank-ups
- Exercise completions
- Challenge acceptances
- Guild joins

### Usage Example

```typescript
import { useFriends } from '@/features/gamification/social/hooks/useFriends';

function FriendsPage() {
  const {
    friends,
    friendRequests,
    recommendations,
    activities,
    sendFriendRequest,
    acceptFriendRequest,
    praiseActivity,
  } = useFriends();

  return (
    <div>
      <h2>Friends ({friends.length})</h2>
      <h3>Requests ({friendRequests.length})</h3>
      {friendRequests.map(request => (
        <button key={request.id} onClick={() => acceptFriendRequest(request.id)}>
          Accept {request.senderName}
        </button>
      ))}

      <h3>Recommendations</h3>
      {recommendations.map(rec => (
        <button key={rec.userId} onClick={() => sendFriendRequest(rec.userId)}>
          Add {rec.username}
        </button>
      ))}
    </div>
  );
}
```

## API Integration Points

All features currently use mock data. To integrate with backend:

### Achievements API
- `GET /api/achievements` - Get all achievements
- `POST /api/achievements/:id/unlock` - Unlock achievement
- `PATCH /api/achievements/:id/progress` - Update progress
- `GET /api/achievements/stats` - Get user stats

### Power-ups API
- `GET /api/powerups` - Get available power-ups
- `POST /api/powerups/:id/purchase` - Purchase power-up
- `POST /api/powerups/:id/use` - Use power-up
- `GET /api/powerups/inventory` - Get user inventory
- `GET /api/powerups/active` - Get active power-ups

### Leaderboards API
- `GET /api/leaderboards/:type` - Get leaderboard by type
- `GET /api/leaderboards/:type/:period` - Get by type and period
- `GET /api/leaderboards/user/rank` - Get user rank

### Guilds API
- `GET /api/guilds` - Get all guilds
- `POST /api/guilds` - Create guild
- `POST /api/guilds/:id/join` - Join guild
- `DELETE /api/guilds/:id/leave` - Leave guild
- `GET /api/guilds/:id/members` - Get members
- `GET /api/guilds/:id/challenges` - Get challenges

### Friends API
- `GET /api/friends` - Get friend list
- `POST /api/friends/request` - Send friend request
- `POST /api/friends/accept/:id` - Accept request
- `DELETE /api/friends/:id` - Remove friend
- `GET /api/friends/recommendations` - Get recommendations
- `GET /api/friends/activities` - Get activity feed

## Detective Theme Integration

All components use the Detective Theme Design System:
- **Primary**: `detective-orange` (#f97316)
- **Secondary**: `detective-gold` (#f59e0b)
- **Backgrounds**: `detective-bg` (#fffbeb)
- **Rank Colors**: Maya-themed gradient colors
- **Rarity Colors**: Common (gray), Rare (blue), Epic (orange), Legendary (gold)
- **Animations**: Smooth transitions with Framer Motion
- **Shadows**: Detective-themed shadows (`shadow-detective`, `shadow-gold`)

## State Management

Uses Zustand for global state management:
- Lightweight and performant
- Type-safe with TypeScript
- Easy to use and test
- No boilerplate required

## Validation

Uses Zod for runtime validation:
- Type-safe schema definitions
- Runtime data validation
- Easy integration with forms
- Clear error messages

## Testing

To test components:
```bash
npm run dev
```

Then navigate to the appropriate routes to view:
- `/achievements` - Achievements list
- `/powerups` - Power-up shop and inventory
- `/leaderboards` - Leaderboards
- `/guilds` - Guild management
- `/friends` - Friend system

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live leaderboards
2. **Push Notifications**: Native notifications for achievements
3. **Social Sharing**: Share achievements on social media
4. **Advanced Analytics**: Detailed user behavior analytics
5. **Seasonal Events**: Time-limited challenges and rewards
6. **Guild Chat**: Real-time communication
7. **Mentorship Program**: Formal mentor-mentee system
8. **Achievement Paths**: Visual progression trees

## License

Part of the GLIT Platform - Educational platform for comprehension lectora.
