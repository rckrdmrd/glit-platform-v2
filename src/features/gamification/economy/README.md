# ML Coins Economy & Shop System

## Overview

The ML Coins Economy System is a comprehensive virtual currency and shop implementation for the GLIT Platform. It provides a complete economic ecosystem with earning mechanisms, spending sinks, inventory management, and administrative monitoring tools.

## Features

### 1. **ML Coins Wallet System**
- **Animated Balance Display**: Spring-animated counter with smooth transitions
- **Transaction History**: Complete log of all earnings and spendings with filters
- **Earning Sources Breakdown**: Visual analytics showing where coins came from
- **Spending Analytics**: Dashboard showing spending patterns by category

### 2. **Shop System (5 Categories)**

#### A. Cosmetics Shop (50-500 ML)
- Avatar items (hats, glasses, accessories)
- Theme packs (color schemes, seasonal items)
- Visual effects (trails, auras, animations)
- 15 unique items with various rarities

#### B. Profile Customization (25-200 ML)
- Profile backgrounds
- Custom badges and titles
- Bio decorations
- Animated borders
- 10 unique items

#### C. Guild Features (100-300 ML)
- Guild perks and boosts
- Custom guild banners
- Guild chat emotes
- XP and coin multipliers
- 8 unique items (guild membership required)

#### D. Premium Content (200+ ML)
- Exclusive exercises and modules
- Advanced materials and tutorials
- Expert content and masterclasses
- Bonus detective cases
- 10 unique items with level requirements

#### E. Social Features (10-50 ML)
- Emotes and stickers
- Reaction packs
- Gift items
- Social gestures
- 7 stackable items

**Total: 50+ Shop Items**

### 3. **Economic Monitoring Dashboard (Admin)**
- Inflation rate tracking (<3% healthy)
- ML Coins velocity (circulation speed: 0.8-1.2 optimal)
- Supply vs Demand visualization
- Economic health indicators
- Intervention triggers with suggested actions

## Architecture

```
economy/
├── components/
│   ├── Wallet/
│   │   ├── CoinWallet.tsx              # Main wallet display
│   │   ├── CoinBalanceWidget.tsx       # Animated balance counter
│   │   ├── TransactionHistory.tsx      # Transaction list with filters
│   │   └── EarningSourcesBreakdown.tsx # Pie chart analytics
│   ├── Shop/
│   │   ├── ShopLayout.tsx              # Main shop page
│   │   ├── ShopNavigation.tsx          # Category tabs
│   │   ├── ShopItem.tsx                # Reusable item card
│   │   ├── ShoppingCart.tsx            # Cart sidebar
│   │   └── PurchaseConfirmation.tsx    # Success modal
│   ├── Analytics/
│   │   ├── SpendingAnalytics.tsx       # User spending dashboard
│   │   └── EconomicDashboard.tsx       # Admin monitoring
│   └── Inventory/
│       ├── UserInventory.tsx           # Owned items grid
│       └── InventoryItem.tsx           # Individual item display
├── types/
│   └── economyTypes.ts                 # TypeScript interfaces
├── schemas/
│   └── economySchemas.ts               # Zod validation schemas
├── store/
│   └── economyStore.ts                 # Zustand state management
├── hooks/
│   ├── useCoins.ts                     # Coin balance operations
│   ├── useShop.ts                      # Shop filters and sorting
│   ├── useTransactions.ts              # Transaction analytics
│   └── useInventory.ts                 # Inventory management
├── mockData/
│   ├── shopItemsMockData.ts            # 50+ shop items
│   └── economyMockData.ts              # Transactions & metrics
└── README.md                           # This file
```

## Tech Stack

- **React 19.2.0** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Zustand 5.0.8** - State management
- **Zod 4.1.12** - Runtime validation
- **Framer Motion 12.23.24** - Animations
- **Tailwind CSS 4.1.14** - Styling (Detective Theme)
- **Lucide React** - Icons

## Installation

Already installed as part of GLIT Platform v2. No additional dependencies needed.

## Usage

### Basic Coin Operations

```typescript
import { useCoins } from '@/features/gamification/economy/hooks/useCoins';

function MyComponent() {
  const {
    balance,           // { current, lifetime, spent, pending }
    earnCoins,         // (amount, source, description?) => void
    canAfford,         // (amount) => boolean
    formatCoins,       // (amount) => string
  } = useCoins();

  // Earn coins
  const handleExerciseComplete = () => {
    earnCoins(20, 'exercise_completion', 'Completed Detective Textual');
  };

  // Check affordability
  const canBuy = canAfford(100);

  return (
    <div>
      <p>Balance: {formatCoins(balance.current)}</p>
    </div>
  );
}
```

### Shop Integration

```typescript
import { ShopLayout } from '@/features/gamification/economy/components/Shop/ShopLayout';

function ShopPage() {
  return <ShopLayout />;
}
```

### Wallet Display

```typescript
import { CoinWallet } from '@/features/gamification/economy/components/Wallet/CoinWallet';
import { CoinBalanceWidget } from '@/features/gamification/economy/components/Wallet/CoinBalanceWidget';

function Header() {
  const { balance } = useCoins();

  return (
    <header>
      {/* Compact widget */}
      <CoinBalanceWidget balance={balance.current} size="small" />

      {/* Full wallet */}
      <CoinWallet />
    </header>
  );
}
```

### Inventory Management

```typescript
import { UserInventory } from '@/features/gamification/economy/components/Inventory/UserInventory';
import { useInventory } from '@/features/gamification/economy/hooks/useInventory';

function InventoryPage() {
  const {
    inventory,
    inventoryCount,
    getInventoryValue,
    hasItem,
  } = useInventory();

  return (
    <div>
      <p>You own {inventoryCount} items worth {getInventoryValue()} ML</p>
      <UserInventory />
    </div>
  );
}
```

### Transaction Analytics

```typescript
import { useTransactions } from '@/features/gamification/economy/hooks/useTransactions';

function AnalyticsPage() {
  const {
    getTotalEarned,
    getTotalSpent,
    getTopEarningSources,
    getTransactionsByPeriod,
  } = useTransactions();

  const earned7d = getTotalEarned('7d');
  const spent30d = getTotalSpent('30d');
  const topSources = getTopEarningSources(5);

  return (
    <div>
      <p>Earned (7d): {earned7d} ML</p>
      <p>Spent (30d): {spent30d} ML</p>
      {/* More analytics */}
    </div>
  );
}
```

### Admin Dashboard

```typescript
import { EconomicDashboard } from '@/features/gamification/economy/components/Analytics/EconomicDashboard';

function AdminEconomyPage() {
  // Protected route - admin only
  return <EconomicDashboard />;
}
```

## State Management

### Zustand Store

The economy uses a persistent Zustand store (`economyStore`) with the following state:

```typescript
{
  balance: MLCoinsBalance;
  transactions: Transaction[];
  inventory: ShopItem[];
  cart: CartItem[];
  isLoading: boolean;
  error: string | null;
}
```

### Actions Available

- `addCoins(amount, source, description?)` - Earn ML Coins
- `spendCoins(amount, itemName, itemId?)` - Spend ML Coins
- `addToCart(item, quantity?)` - Add to shopping cart
- `removeFromCart(itemId)` - Remove from cart
- `purchaseCart()` - Purchase all cart items
- `purchaseItem(itemId)` - Purchase single item
- `addToInventory(item)` - Add to user inventory
- `getEconomyStats()` - Get statistical summary

All state is persisted to localStorage as `glit-economy-storage`.

## API Integration Points

The system is designed with mock data for frontend development. Backend integration points:

### 1. Coin Operations
```typescript
// POST /api/economy/earn
interface EarnCoinsRequest {
  amount: number;
  source: EarningSource;
  description?: string;
  metadata?: Record<string, unknown>;
}

// POST /api/economy/spend
interface SpendCoinsRequest {
  amount: number;
  itemId: string;
  quantity?: number;
}

// GET /api/economy/balance
interface BalanceResponse {
  balance: MLCoinsBalance;
}
```

### 2. Shop Operations
```typescript
// GET /api/shop/items?category={category}&rarity={rarity}
interface ShopItemsResponse {
  items: ShopItem[];
  total: number;
}

// POST /api/shop/purchase
interface PurchaseRequest {
  itemIds: string[];
  totalAmount: number;
}

interface PurchaseResponse {
  success: boolean;
  transactionId?: string;
  newBalance?: number;
  itemsAcquired?: ShopItem[];
}
```

### 3. Transaction History
```typescript
// GET /api/economy/transactions?limit={limit}&offset={offset}&type={type}
interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  hasMore: boolean;
}
```

### 4. Inventory
```typescript
// GET /api/inventory
interface InventoryResponse {
  items: ShopItem[];
  totalValue: number;
}

// DELETE /api/inventory/{itemId}
// For removable/tradeable items
```

### 5. Economic Metrics (Admin)
```typescript
// GET /api/admin/economy/metrics
interface EconomicMetricsResponse {
  metrics: EconomicMetrics;
  triggers: InterventionTrigger[];
}
```

## Economic Balance

### Earning Rates (Rebalanced)
- **Base Exercise**: 15 ML (reduced from 20 ML)
- **Streak Bonus**: 2 ML (reduced from 5 ML)
- **Perfect Score**: 6-12 ML (scaled)
- **Achievement Unlock**: 25-200 ML (tiered)
- **Daily Login**: 10 ML
- **Guild Challenge**: 30-50 ML
- **Leaderboard Reward**: 25-100 ML

### Spending Sinks
- **Cosmetics**: 50-500 ML
- **Profile**: 25-200 ML
- **Guild**: 100-300 ML
- **Premium**: 200-400 ML
- **Social**: 10-50 ML

### Economic Health Targets
- **Inflation Rate**: <3% monthly
- **ML Velocity**: 0.8-1.2 (healthy circulation)
- **Sink Effectiveness**: >80% earned coins spent monthly
- **Power-up Usage**: >60% weekly

## Detective Theme Integration

All components use the GLIT Detective Theme:

- **Primary Colors**: `detective-orange`, `detective-gold`
- **Rarity Colors**: `rarity-common`, `rarity-rare`, `rarity-epic`, `rarity-legendary`
- **Shadows**: `shadow-gold`, `shadow-orange`, `shadow-card`
- **Border Radius**: `rounded-detective` (0.75rem)
- **Animations**: Spring animations via Framer Motion

## Item Rarity System

| Rarity | Color | Price Range | Effects |
|--------|-------|-------------|---------|
| Common | Gray | 10-100 ML | Basic items, easily obtainable |
| Rare | Blue | 100-200 ML | Enhanced items, some requirements |
| Epic | Orange | 200-350 ML | Special effects, level requirements |
| Legendary | Gold | 400-500 ML | Exclusive items, animated, rare |

## Testing

### Mock Data Included
- **50+ Shop Items** across all categories
- **20+ Sample Transactions** with varied sources
- **Economic Metrics** with healthy, warning, and critical states
- **Intervention Triggers** with suggested actions

### Manual Testing Checklist
- [ ] Coin balance displays correctly
- [ ] Earning coins updates balance and transactions
- [ ] Spending coins deducts from balance
- [ ] Shop items filter by category
- [ ] Shopping cart add/remove works
- [ ] Purchase flow completes successfully
- [ ] Inventory displays owned items
- [ ] Transaction history filters work
- [ ] Analytics charts render correctly
- [ ] Admin dashboard shows metrics
- [ ] Rarity colors display correctly
- [ ] Animations are smooth
- [ ] Responsive on mobile

## TypeScript Type Checking

Run type checking:
```bash
npm run type-check
```

All components are fully typed with no TypeScript errors.

## Future Enhancements

### Phase 2
- [ ] ML Coins trading between users
- [ ] Limited-time sales and discounts
- [ ] Seasonal shop rotations
- [ ] Achievement-based item unlocks
- [ ] Gift system for sending items
- [ ] Auction house for rare items

### Phase 3
- [ ] Real-time economic dashboard
- [ ] A/B testing for pricing
- [ ] Dynamic pricing based on demand
- [ ] Loot boxes/mystery items
- [ ] Subscription benefits
- [ ] Premium currency (dual currency system)

## Support

For questions or issues:
- Check the GLIT Platform v2 documentation
- Review component source code for implementation details
- Contact the development team

## License

Part of the GLIT Platform v2 - Internal use only

---

**Last Updated**: 2025-10-16
**Version**: 1.0.0
**Status**: Production Ready
