# Achievements Page - Architecture Diagram

## Component Hierarchy

```
AchievementsPageEnhanced
│
├─── Helmet (SEO meta tags)
│
├─── AchievementsPageHeader
│    ├─── Animated Sparkles Background (30 elements)
│    ├─── Title Section
│    │    ├─── Trophy Icon
│    │    └─── "Tus Logros" + subtitle
│    ├─── Stats Cards Grid (4 cards)
│    │    ├─── Total Achievements Card
│    │    ├─── Completion % Card
│    │    ├─── ML Coins Card
│    │    └─── XP Card
│    └─── Circular Progress Indicator
│         └─── SVG Circle with animation
│
├─── AchievementFilters
│    ├─── Mobile Toggle Button (< 1024px)
│    ├─── Search Bar
│    │    ├─── Search Icon
│    │    ├─── Input Field (debounced 300ms)
│    │    └─── Clear Button (conditional)
│    ├─── Category Filters (5 buttons)
│    │    ├─── All (Trophy)
│    │    ├─── Progress (BookOpen)
│    │    ├─── Mastery (Trophy)
│    │    ├─── Social (Users)
│    │    └─── Hidden (Star)
│    ├─── Rarity Filters (5 buttons)
│    │    ├─── All
│    │    ├─── Common (Gray)
│    │    ├─── Rare (Green)
│    │    ├─── Epic (Purple)
│    │    └─── Legendary (Gold)
│    ├─── Dropdowns Row
│    │    ├─── Status Dropdown
│    │    │    ├─── All
│    │    │    ├─── Unlocked
│    │    │    ├─── Locked
│    │    │    └─── In Progress
│    │    └─── Sort Dropdown
│    │         ├─── Recent
│    │         ├─── Alphabetical
│    │         ├─── Rarity
│    │         └─── Progress
│    └─── Active Filters Display (conditional)
│         ├─── Results Count
│         └─── Clear All Button
│
├─── AchievementGrid
│    ├─── Results Header
│    │    ├─── Title with count
│    │    └─── Quick Stats (unlocked/locked)
│    ├─── Responsive Grid
│    │    └─── AchievementCard[] (existing component)
│    │         ├─── Icon with gradient
│    │         ├─── Title
│    │         ├─── Description
│    │         ├─── Rarity Badge
│    │         ├─── Progress Bar (if locked)
│    │         ├─── Rewards (ML Coins + XP)
│    │         └─── Status Indicators
│    ├─── Empty States (conditional)
│    │    ├─── No Achievements
│    │    │    └─── Trophy + Message + CTA
│    │    ├─── No Results
│    │    │    └─── Search Icon + Message + CTAs
│    │    └─── Loading
│    │         └─── Skeleton Cards (8)
│    └─── Motivational Footer (conditional)
│         └─── Encouragement Message
│
├─── AchievementStatistics
│    ├─── Section Title
│    ├─── Statistics Grid (2x2 on desktop)
│    │    ├─── Completion Rate Card
│    │    │    ├─── Large Percentage
│    │    │    ├─── X of Y text
│    │    │    └─── Progress Bar
│    │    ├─── Recent Unlocks Card
│    │    │    └─── Timeline (last 3)
│    │    │         ├─── Trophy Icon
│    │    │         ├─── Title
│    │    │         └─── Date
│    │    ├─── Rarity Breakdown Card
│    │    │    └─── Progress Bars (4)
│    │    │         ├─── Common
│    │    │         ├─── Rare
│    │    │         ├─── Epic
│    │    │         └─── Legendary
│    │    └─── Category Breakdown Card
│    │         └─── Gradient Cards (2x2)
│    │              ├─── Progress
│    │              ├─── Mastery
│    │              ├─── Social
│    │              └─── Hidden
│    └─── Motivational Banner
│         ├─── Animated Flame Icon
│         ├─── "¡Sigue Así!" Title
│         └─── Encouragement Message
│
└─── AchievementDetailModal (conditional)
     ├─── Backdrop (blur overlay)
     └─── Modal Container
          ├─── Header Section
          │    ├─── Close Button (X)
          │    ├─── Previous Arrow (conditional)
          │    ├─── Next Arrow (conditional)
          │    ├─── Large Achievement Icon
          │    │    └─── Status Badge Overlay
          │    └─── Rarity Badge
          ├─── Content Section (scrollable)
          │    ├─── Title & Description
          │    ├─── Progress Section (if locked)
          │    │    ├─── Current/Required
          │    │    ├─── Progress Bar
          │    │    └─── Percentage
          │    ├─── Requirements Checklist
          │    │    └─── Checkmark/Circle Items
          │    ├─── Unlock Date (if unlocked)
          │    │    └─── Calendar + Formatted Date
          │    ├─── Rewards Display
          │    │    ├─── ML Coins Card
          │    │    └─── XP Card
          │    └─── Social Share (if unlocked)
          │         ├─── Copy Link Button
          │         ├─── Twitter Button
          │         └─── Facebook Button
          └─── Focus Trap
```

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   AchievementsPageEnhanced                  │
│                                                             │
│  useParams() → achievementId (for deep linking)            │
│  useAchievementsEnhanced() → {                             │
│    achievements, filteredAchievements, statistics,          │
│    filters, setFilter, clearFilters,                        │
│    selectedAchievement, selectAchievement,                  │
│    nextAchievement, previousAchievement,                    │
│    hasNext, hasPrevious, loading, error, refresh            │
│  }                                                          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ├─────────────────────────────────┐
                 │                                 │
                 ▼                                 ▼
    ┌────────────────────────┐      ┌──────────────────────────┐
    │ useAchievementsStore() │      │   Local State            │
    │ (Zustand)              │      │   - selectedAchievement  │
    │                        │      │   - filters              │
    │ - achievements[]       │      │   - debouncedSearch      │
    │ - unlockedAchievements │      └──────────────────────────┘
    │ - stats                │
    │ - refreshAchievements()│
    └────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │   Backend API          │
    │   /api/gamification/   │
    │   achievements/:userId │
    └────────────────────────┘
```

---

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│              useAchievementsEnhanced Hook                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  INPUT:                                                     │
│  └─ achievementsStore (Zustand)                            │
│     └─ achievements: Achievement[]                          │
│                                                             │
│  PROCESSING:                                                │
│  ├─ filterAchievements(achievements)                       │
│  │  ├─ By category (all | progress | mastery | ...)        │
│  │  ├─ By rarity (all | common | rare | epic | legendary)  │
│  │  ├─ By status (all | unlocked | locked | in_progress)   │
│  │  └─ By searchQuery (debounced 300ms)                    │
│  │                                                          │
│  ├─ sortAchievements(filtered)                             │
│  │  ├─ recent: by unlockedAt desc                          │
│  │  ├─ alphabetical: by title asc                          │
│  │  ├─ rarity: legendary > epic > rare > common            │
│  │  └─ progress: by completion % desc                      │
│  │                                                          │
│  └─ calculateStatistics(achievements)                      │
│     ├─ Totals (total, unlocked, locked, inProgress)        │
│     ├─ Rates (completionRate)                              │
│     ├─ Rewards (pointsEarned, mlCoinsEarned)               │
│     ├─ Breakdowns (byRarity, byCategory)                   │
│     └─ Lists (recentUnlocks, rarestUnlocked)               │
│                                                             │
│  OUTPUT:                                                    │
│  ├─ filteredAchievements: Achievement[]                    │
│  ├─ statistics: AchievementStatistics                      │
│  ├─ filters: AchievementFilters                            │
│  ├─ selectedAchievement: Achievement | null                │
│  └─ Methods (setFilter, selectAchievement, etc.)           │
└─────────────────────────────────────────────────────────────┘
```

---

## Filter Pipeline

```
Raw Achievements (from store)
       |
       ├─ [1] Category Filter
       │      ↓
       ├─ [2] Rarity Filter
       │      ↓
       ├─ [3] Status Filter
       │      ↓
       └─ [4] Search Filter (debounced)
              ↓
       Filtered Achievements
              |
              ├─ [5] Sort
              │      ├─ recent
              │      ├─ alphabetical
              │      ├─ rarity
              │      └─ progress
              ↓
       Final Sorted Achievements
              ↓
       Rendered in Grid
```

---

## Animation Timeline

```
Page Load
    |
    ├─ 0ms    : Page fade in starts
    ├─ 0-100ms: Header sparkles animate
    ├─ 100ms  : Stats cards stagger begins
    ├─ 200ms  : First stat card appears
    ├─ 300ms  : Second stat card appears
    ├─ 400ms  : Third stat card appears
    ├─ 500ms  : Fourth stat card appears
    ├─ 0-1500ms: Progress circle draws
    ├─ 600ms  : Filters fade in
    ├─ 800ms  : Grid container appears
    ├─ 850ms  : First achievement card
    ├─ 900ms  : Second achievement card
    ├─ 950ms  : Third achievement card
    └─ ...    : Continue stagger (0.05s each)

User Interaction
    |
    ├─ Filter Change
    │   ├─ 0ms   : Old cards fade out
    │   ├─ 200ms : Grid re-layout
    │   └─ 250ms : New cards stagger in
    |
    ├─ Card Hover
    │   └─ 0-200ms: Scale 1.05 + lift 8px
    |
    ├─ Card Click
    │   ├─ 0ms   : Backdrop fade in
    │   ├─ 0ms   : Modal scale + slide + fade
    │   ├─ 200ms : Icon scale + rotate
    │   └─ 400ms : Content fade in
    |
    └─ Modal Close
        ├─ 0ms   : Content fade out
        ├─ 100ms : Modal scale + slide out
        └─ 200ms : Backdrop fade out
```

---

## Responsive Breakpoints

```
┌─────────────────────────────────────────────────────────────┐
│  Mobile (< 768px)                                           │
├─────────────────────────────────────────────────────────────┤
│  Header:       Vertical stack, progress circle below        │
│  Filters:      Collapsible panel with toggle button         │
│  Grid:         2 columns, 4px gap                           │
│  Modal:        Full width, padding 16px                     │
│  Statistics:   Single column                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Tablet (768px - 1024px)                                    │
├─────────────────────────────────────────────────────────────┤
│  Header:       Horizontal, compact stats                    │
│  Filters:      Visible, 2-column dropdowns                  │
│  Grid:         3 columns, 6px gap                           │
│  Modal:        Max-width 672px, padding 24px                │
│  Statistics:   2 columns                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Desktop (> 1024px)                                         │
├─────────────────────────────────────────────────────────────┤
│  Header:       Full horizontal layout                       │
│  Filters:      Always visible, full controls                │
│  Grid:         4 columns, 6px gap                           │
│  Modal:        Max-width 896px, padding 24px                │
│  Statistics:   2x2 grid layout                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Event Flow

```
User Actions → Component → Hook → Store → API (future)

1. Page Load
   User lands → Page mounts → useAchievementsEnhanced
   → Check localStorage for filters → Load achievements from store
   → If empty, call refresh() → Display grid

2. Search Input
   User types → AchievementFilters → setFilter('searchQuery', value)
   → Debounce 300ms → filterAchievements() → Re-render grid

3. Category Click
   User clicks → AchievementFilters → setFilter('category', value)
   → Immediate filter → sortAchievements() → Re-render grid

4. Achievement Click
   User clicks → AchievementGrid → handleAchievementClick()
   → selectAchievement(achievement) → Modal opens

5. Modal Navigation
   User presses → (Arrow Key) → nextAchievement() / previousAchievement()
   → selectAchievement(adjacent) → Modal updates

6. Social Share
   User clicks → AchievementDetailModal → handleShare()
   → navigator.clipboard.writeText() → Show "Copied!" feedback

7. Filter Clear
   User clicks → AchievementFilters → clearFilters()
   → Reset to defaults → Re-render grid

8. Deep Link
   URL: /achievements/:id → useParams() → achievementId
   → Find achievement → selectAchievement() → Auto-open modal
```

---

## Performance Strategy

```
┌─────────────────────────────────────────────────────────────┐
│  Optimization Layers                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Layer 1] Code Splitting                                  │
│  └─ React.lazy() for page component                        │
│                                                             │
│  [Layer 2] Memoization                                     │
│  ├─ useMemo(filteredAchievements)                          │
│  ├─ useMemo(statistics)                                    │
│  └─ useMemo(currentIndex, hasNext, hasPrevious)            │
│                                                             │
│  [Layer 3] Callback Stability                              │
│  ├─ useCallback(filterAchievements)                        │
│  ├─ useCallback(sortAchievements)                          │
│  ├─ useCallback(setFilter)                                 │
│  └─ useCallback(selectAchievement)                         │
│                                                             │
│  [Layer 4] Debouncing                                      │
│  └─ Search input: 300ms debounce                           │
│                                                             │
│  [Layer 5] Conditional Rendering                           │
│  ├─ Statistics: Only if !loading && achievements.length    │
│  ├─ Empty states: Separate components                      │
│  └─ Modal: AnimatePresence with exit animations            │
│                                                             │
│  [Layer 6] Layout Animations                               │
│  └─ Framer Motion layout prop (GPU accelerated)            │
│                                                             │
│  [Layer 7] LocalStorage                                    │
│  └─ Cache filter preferences                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Type System

```
┌─────────────────────────────────────────────────────────────┐
│  Type Hierarchy                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BaseAchievement (from store)                              │
│  ├─ id: string                                             │
│  ├─ title: string                                          │
│  ├─ description: string                                    │
│  ├─ category: 'progress' | 'mastery' | 'social' | 'hidden' │
│  ├─ rarity: 'common' | 'rare' | 'epic' | 'legendary'      │
│  ├─ icon: string                                           │
│  ├─ mlCoinsReward: number                                  │
│  ├─ xpReward: number                                       │
│  ├─ isUnlocked: boolean                                    │
│  ├─ unlockedAt?: Date                                      │
│  ├─ progress?: { current, required }                       │
│  ├─ requirements?: Record<string, any>                     │
│  └─ isHidden?: boolean                                     │
│                                                             │
│  Achievement (extended)                                     │
│  └─ + requirements: string[]                               │
│     + shareUrl?: string                                    │
│                                                             │
│  AchievementFilters                                        │
│  ├─ category: AchievementCategory | 'all'                  │
│  ├─ rarity: AchievementRarity | 'all'                      │
│  ├─ status: FilterStatus                                   │
│  ├─ searchQuery: string                                    │
│  └─ sortBy: SortOption                                     │
│                                                             │
│  AchievementStatistics                                     │
│  ├─ total: number                                          │
│  ├─ unlocked: number                                       │
│  ├─ locked: number                                         │
│  ├─ inProgress: number                                     │
│  ├─ completionRate: number                                 │
│  ├─ pointsEarned: number                                   │
│  ├─ mlCoinsEarned: number                                  │
│  ├─ byRarity: Record<Rarity, number>                       │
│  ├─ byCategory: Record<Category, number>                   │
│  ├─ recentUnlocks: Achievement[]                           │
│  └─ rarestUnlocked: Achievement[]                          │
└─────────────────────────────────────────────────────────────┘
```

---

## File Dependencies

```
AchievementsPageEnhanced.tsx
  ├─ react
  ├─ react-router-dom (useParams)
  ├─ framer-motion
  ├─ react-helmet-async
  ├─ ./components/achievements/AchievementsPageHeader
  ├─ ./components/achievements/AchievementFilters
  ├─ ./components/achievements/AchievementGrid
  ├─ ./components/achievements/AchievementDetailModal
  ├─ ./components/achievements/AchievementStatistics
  ├─ ./hooks/useAchievementsEnhanced
  └─ @/features/gamification/social/types/achievementsTypes

useAchievementsEnhanced.ts
  ├─ react (useState, useEffect, useMemo, useCallback)
  ├─ @/features/gamification/social/store/achievementsStore
  ├─ @/features/gamification/social/types/achievementsTypes
  └─ ./components/achievements/types

AchievementsPageHeader.tsx
  ├─ react
  ├─ framer-motion
  ├─ lucide-react
  └─ ./types

AchievementFilters.tsx
  ├─ react
  ├─ framer-motion
  ├─ lucide-react
  ├─ @/features/gamification/social/types/achievementsTypes
  └─ ./types

AchievementGrid.tsx
  ├─ react
  ├─ framer-motion
  ├─ lucide-react
  ├─ @/features/gamification/social/components/Achievements/AchievementCard
  └─ @/features/gamification/social/types/achievementsTypes

AchievementDetailModal.tsx
  ├─ react
  ├─ framer-motion
  ├─ lucide-react
  └─ @/features/gamification/social/types/achievementsTypes

AchievementStatistics.tsx
  ├─ react
  ├─ framer-motion
  ├─ lucide-react
  ├─ ./types
  └─ @/features/gamification/social/types/achievementsTypes
```

---

## Integration Points

```
┌─────────────────────────────────────────────────────────────┐
│  External Dependencies                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Store (Zustand)                                        │
│     @/features/gamification/social/store/achievementsStore  │
│     └─ achievements, unlockedAchievements, stats, etc.      │
│                                                             │
│  2. Existing Components                                     │
│     @/features/gamification/social/components/Achievements/ │
│     └─ AchievementCard (reused)                            │
│                                                             │
│  3. Types                                                   │
│     @/features/gamification/social/types/achievementsTypes  │
│     └─ Achievement, AchievementCategory, AchievementRarity  │
│                                                             │
│  4. Routing                                                 │
│     App.tsx                                                 │
│     └─ Routes: /achievements, /achievements/:id             │
│                                                             │
│  5. API (Future)                                            │
│     Backend: /api/gamification/achievements/:userId         │
│     └─ REST endpoint for fetching achievements             │
│                                                             │
│  6. Utilities                                               │
│     @shared/utils/cn (Tailwind class merger)                │
│     └─ Conditional className composition                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Accessibility Tree

```
AchievementsPageEnhanced [role="main"]
├─ Header [role="banner"]
│  ├─ Heading (h1): "Tus Logros"
│  └─ Region: Stats cards [aria-label="Estadísticas de logros"]
│
├─ Section: Filters [aria-label="Filtros de logros"]
│  ├─ Search [role="search"]
│  │  └─ Input [aria-label="Buscar logros"]
│  ├─ Navigation: Categories [role="navigation"]
│  │  └─ Buttons [aria-pressed="true/false"]
│  ├─ Navigation: Rarities [role="navigation"]
│  │  └─ Buttons [aria-pressed="true/false"]
│  └─ Form: Sort & Status
│     ├─ Select [aria-label="Filtrar por estado"]
│     └─ Select [aria-label="Ordenar por"]
│
├─ Region: Achievements [aria-label="Lista de logros"]
│  ├─ Heading (h2): "Logros (X)"
│  └─ Grid
│     └─ Button[] (achievement cards)
│        └─ [aria-label="Ver detalles de [Title]"]
│
├─ Region: Statistics [aria-label="Estadísticas"]
│  ├─ Heading (h2): "Estadísticas de Logros"
│  └─ Articles (stat cards)
│     └─ Progress bars [role="progressbar" aria-valuenow]
│
└─ Dialog: Achievement Detail [role="dialog" aria-modal="true"]
   ├─ Button: Close [aria-label="Cerrar"]
   ├─ Button: Previous [aria-label="Anterior"]
   ├─ Button: Next [aria-label="Siguiente"]
   ├─ Heading (h2): Achievement title
   ├─ Progress bar [role="progressbar"]
   ├─ List: Requirements [role="list"]
   └─ Navigation: Share buttons
      ├─ [aria-label="Copiar enlace"]
      ├─ [aria-label="Compartir en Twitter"]
      └─ [aria-label="Compartir en Facebook"]
```

---

## Color Palette

```
┌─────────────────────────────────────────────────────────────┐
│  Detective Theme Colors                                     │
├─────────────────────────────────────────────────────────────┤
│  Primary:                                                   │
│  ├─ detective-orange      #F97316  (orange-500)            │
│  ├─ detective-orange-dark #EA580C  (orange-600)            │
│  └─ detective-gold        #EAB308  (yellow-500)            │
│                                                             │
│  Text:                                                      │
│  ├─ detective-text        #111827  (gray-900)              │
│  └─ detective-text-secondary #4B5563 (gray-600)            │
│                                                             │
│  Background:                                                │
│  ├─ detective-bg          #F3F4F6  (gray-100)              │
│  └─ detective-bg-secondary #E5E7EB (gray-200)              │
│                                                             │
│  Status:                                                    │
│  └─ detective-success     #10B981  (green-500)             │
├─────────────────────────────────────────────────────────────┤
│  Rarity Colors                                              │
├─────────────────────────────────────────────────────────────┤
│  Common:                                                    │
│  └─ #9CA3AF (gray-400)                                     │
│                                                             │
│  Rare:                                                      │
│  └─ #10B981 (green-500)                                    │
│                                                             │
│  Epic:                                                      │
│  └─ #A855F7 (purple-500)                                   │
│                                                             │
│  Legendary:                                                 │
│  └─ #F59E0B (yellow-500) + #EAB308 (gold)                  │
├─────────────────────────────────────────────────────────────┤
│  Category Colors                                            │
├─────────────────────────────────────────────────────────────┤
│  Progress (Educational):                                    │
│  └─ #3B82F6 → #2563EB (blue-500 → blue-600)                │
│                                                             │
│  Mastery (Gamification):                                    │
│  └─ #F97316 → #EA580C (orange-500 → orange-600)            │
│                                                             │
│  Social:                                                    │
│  └─ #10B981 → #059669 (green-500 → green-600)              │
│                                                             │
│  Hidden (Special):                                          │
│  └─ #A855F7 → #9333EA (purple-500 → purple-600)            │
└─────────────────────────────────────────────────────────────┘
```

---

This architecture document provides a visual representation of the complete Achievements Page structure, data flow, and integration points. Use it as a reference for understanding the system's design and implementation.
