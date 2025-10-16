# LiveLeaderboard API Integration Guide

This guide explains how to integrate the LiveLeaderboard component with a real backend API.

## Table of Contents
1. [API Endpoints](#api-endpoints)
2. [Data Models](#data-models)
3. [Integration Steps](#integration-steps)
4. [Error Handling](#error-handling)
5. [Real-time Updates](#real-time-updates)
6. [Performance Optimization](#performance-optimization)

---

## API Endpoints

### Required Endpoints

#### 1. Get Leaderboard Entries
```
GET /api/leaderboard/:type
```

**Parameters:**
- `type`: One of `xp`, `completion`, `streak`, `detective`
- `userId`: (query param) Current user ID for highlighting
- `limit`: (query param, optional) Number of entries to return (default: 20)
- `offset`: (query param, optional) For pagination

**Response:**
```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "rank": 1,
        "userId": "user-123",
        "username": "Maria García",
        "avatar": "https://cdn.example.com/avatars/user-123.jpg",
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
}
```

#### 2. Get User Rank
```
GET /api/leaderboard/:type/user/:userId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "rank": 15,
    "score": 8750,
    "percentile": 85.3,
    "pointsToNext": 250,
    "aboveUser": {
      "userId": "user-456",
      "username": "Carlos López",
      "score": 9000
    }
  }
}
```

---

## Data Models

### TypeScript Interfaces

```typescript
// API Response Types
export interface LeaderboardAPIResponse {
  success: boolean;
  data: {
    entries: LeaderboardEntry[];
    totalParticipants: number;
    lastUpdated: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface UserRankAPIResponse {
  success: boolean;
  data: {
    rank: number;
    score: number;
    percentile: number;
    pointsToNext: number;
    aboveUser: {
      userId: string;
      username: string;
      score: number;
    } | null;
  };
  error?: {
    code: string;
    message: string;
  };
}
```

---

## Integration Steps

### Step 1: Create API Service

Create a new file: `src/features/gamification/leaderboard/api.ts`

```typescript
import { apiClient } from '@/services/api/apiClient';
import type { LeaderboardEntry, LeaderboardTypeVariant } from './LiveLeaderboard';

export class LeaderboardAPI {
  /**
   * Fetch leaderboard entries
   */
  static async getLeaderboard(
    type: LeaderboardTypeVariant,
    userId: string,
    limit: number = 20
  ): Promise<LeaderboardEntry[]> {
    try {
      const response = await apiClient.get<LeaderboardAPIResponse>(
        `/api/leaderboard/${type}`,
        {
          params: { userId, limit }
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to fetch leaderboard');
      }

      return response.data.data.entries;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  }

  /**
   * Fetch user's rank and position
   */
  static async getUserRank(
    type: LeaderboardTypeVariant,
    userId: string
  ): Promise<UserRankAPIResponse['data']> {
    try {
      const response = await apiClient.get<UserRankAPIResponse>(
        `/api/leaderboard/${type}/user/${userId}`
      );

      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to fetch user rank');
      }

      return response.data.data;
    } catch (error) {
      console.error('Error fetching user rank:', error);
      throw error;
    }
  }

  /**
   * Subscribe to real-time leaderboard updates
   */
  static subscribeToUpdates(
    type: LeaderboardTypeVariant,
    callback: (entries: LeaderboardEntry[]) => void
  ): () => void {
    // WebSocket or SSE implementation
    const ws = new WebSocket(`wss://api.example.com/leaderboard/${type}/live`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data.entries);
    };

    // Return unsubscribe function
    return () => {
      ws.close();
    };
  }
}
```

### Step 2: Update LiveLeaderboard Component

Replace the mock data generation with API calls:

```typescript
// In LiveLeaderboard.tsx
import { LeaderboardAPI } from './api';

// Replace the fetchLeaderboardData function:
const fetchLeaderboardData = useCallback(async () => {
  setLoading(true);

  try {
    // Fetch leaderboard entries
    const entries = await LeaderboardAPI.getLeaderboard(
      selectedType,
      userId,
      itemsPerPage
    );

    // Fetch user rank
    const userRank = await LeaderboardAPI.getUserRank(selectedType, userId);

    setEntries(entries);
    setLastUpdated(new Date());
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    // Optionally show error toast
  } finally {
    setLoading(false);
    setIsRefreshing(false);
  }
}, [userId, selectedType, itemsPerPage]);
```

### Step 3: Add Real-time Updates (Optional)

For live updates without polling:

```typescript
// In LiveLeaderboard.tsx
useEffect(() => {
  if (!autoRefresh) return;

  // Subscribe to WebSocket updates
  const unsubscribe = LeaderboardAPI.subscribeToUpdates(
    selectedType,
    (newEntries) => {
      setEntries(newEntries);
      setLastUpdated(new Date());
    }
  );

  return () => {
    unsubscribe();
  };
}, [selectedType, autoRefresh]);
```

---

## Error Handling

### Error Types

```typescript
export enum LeaderboardErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  INVALID_DATA = 'INVALID_DATA',
  TIMEOUT = 'TIMEOUT'
}

export class LeaderboardError extends Error {
  constructor(
    public code: LeaderboardErrorCode,
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'LeaderboardError';
  }
}
```

### Error Handling in Component

```typescript
const [error, setError] = useState<LeaderboardError | null>(null);

const fetchLeaderboardData = async () => {
  setLoading(true);
  setError(null);

  try {
    const entries = await LeaderboardAPI.getLeaderboard(
      selectedType,
      userId,
      itemsPerPage
    );
    setEntries(entries);
  } catch (err) {
    const error = err as LeaderboardError;

    setError(error);

    // Show user-friendly error message
    switch (error.code) {
      case LeaderboardErrorCode.NETWORK_ERROR:
        showToast('Error de conexión. Verifica tu internet.', 'error');
        break;
      case LeaderboardErrorCode.UNAUTHORIZED:
        showToast('No tienes permiso para ver esta clasificación.', 'error');
        break;
      case LeaderboardErrorCode.SERVER_ERROR:
        showToast('Error del servidor. Intenta más tarde.', 'error');
        break;
      default:
        showToast('Error al cargar la clasificación.', 'error');
    }

    // Fallback to mock data or cached data
    // setEntries(getCachedEntries());
  } finally {
    setLoading(false);
  }
};
```

---

## Real-time Updates

### Option 1: WebSocket

```typescript
// websocket-service.ts
export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(url: string, onMessage: (data: any) => void) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.reconnect(url, onMessage);
    };
  }

  private reconnect(url: string, onMessage: (data: any) => void) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.connect(url, onMessage);
      }, 1000 * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}
```

### Option 2: Server-Sent Events (SSE)

```typescript
// sse-service.ts
export class SSEService {
  private eventSource: EventSource | null = null;

  connect(url: string, onMessage: (data: any) => void) {
    this.eventSource = new EventSource(url);

    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      this.eventSource?.close();
    };
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
```

### Option 3: Polling with Smart Intervals

```typescript
// polling-service.ts
export class PollingService {
  private intervalId: NodeJS.Timeout | null = null;
  private baseInterval: number;
  private currentInterval: number;

  constructor(baseInterval: number = 30000) {
    this.baseInterval = baseInterval;
    this.currentInterval = baseInterval;
  }

  start(fetchFn: () => Promise<void>) {
    this.stop(); // Clear any existing interval

    const poll = async () => {
      try {
        await fetchFn();
        // Reset interval on success
        this.currentInterval = this.baseInterval;
      } catch (error) {
        // Exponential backoff on error
        this.currentInterval = Math.min(
          this.currentInterval * 2,
          300000 // Max 5 minutes
        );
      }

      // Schedule next poll
      this.intervalId = setTimeout(poll, this.currentInterval);
    };

    poll(); // Start immediately
  }

  stop() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }
}
```

---

## Performance Optimization

### 1. Caching Strategy

```typescript
// cache-service.ts
import { LRUCache } from 'lru-cache';

const leaderboardCache = new LRUCache<string, LeaderboardEntry[]>({
  max: 50, // Maximum 50 cached leaderboards
  ttl: 60000 // 1 minute TTL
});

export const getCachedLeaderboard = (
  type: LeaderboardTypeVariant
): LeaderboardEntry[] | undefined => {
  return leaderboardCache.get(type);
};

export const setCachedLeaderboard = (
  type: LeaderboardTypeVariant,
  entries: LeaderboardEntry[]
): void => {
  leaderboardCache.set(type, entries);
};
```

### 2. Request Deduplication

```typescript
// request-deduplication.ts
const pendingRequests = new Map<string, Promise<any>>();

export const deduplicatedFetch = async <T>(
  key: string,
  fetchFn: () => Promise<T>
): Promise<T> => {
  // Return existing promise if request is in flight
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)!;
  }

  // Create new promise
  const promise = fetchFn().finally(() => {
    pendingRequests.delete(key);
  });

  pendingRequests.set(key, promise);
  return promise;
};

// Usage:
const entries = await deduplicatedFetch(
  `leaderboard-${type}`,
  () => LeaderboardAPI.getLeaderboard(type, userId, limit)
);
```

### 3. Virtual Scrolling for Large Lists

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

// In component:
const parentRef = useRef<HTMLDivElement>(null);

const virtualizer = useVirtualizer({
  count: entries.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 80, // Estimated height of each row
  overscan: 5 // Render 5 extra items above/below viewport
});

return (
  <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
    <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const entry = entries[virtualItem.index];
        return (
          <div
            key={entry.userId}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`
            }}
          >
            <LeaderboardEntryRow entry={entry} type={selectedType} index={virtualItem.index} />
          </div>
        );
      })}
    </div>
  </div>
);
```

---

## Testing with Mock Server

For development, use a mock API server:

```typescript
// mock-server.ts
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.get('/api/leaderboard/:type', (req, res, ctx) => {
    const { type } = req.params;
    const userId = req.url.searchParams.get('userId');

    return res(
      ctx.json({
        success: true,
        data: {
          entries: generateMockEntries(type as string, userId as string),
          totalParticipants: 1543,
          lastUpdated: new Date().toISOString()
        }
      })
    );
  }),

  rest.get('/api/leaderboard/:type/user/:userId', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          rank: 15,
          score: 8750,
          percentile: 85.3,
          pointsToNext: 250,
          aboveUser: {
            userId: 'user-456',
            username: 'Carlos López',
            score: 9000
          }
        }
      })
    );
  })
];

export const server = setupServer(...handlers);
```

---

## Environment Configuration

```typescript
// .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
VITE_USE_MOCK_DATA=true

// .env.production
VITE_API_BASE_URL=https://api.glit.com
VITE_WS_URL=wss://api.glit.com
VITE_USE_MOCK_DATA=false
```

```typescript
// config.ts
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  wsUrl: import.meta.env.VITE_WS_URL,
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true'
};
```

---

## Next Steps

1. Implement the API endpoints in your backend
2. Create the API service layer
3. Update LiveLeaderboard to use real API
4. Add error handling and retry logic
5. Implement caching strategy
6. Set up real-time updates (WebSocket or SSE)
7. Add monitoring and analytics
8. Performance testing with large datasets

For questions or issues, refer to the main [README.md](./README.md) or open an issue in the project repository.
