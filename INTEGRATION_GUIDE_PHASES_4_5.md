# Guía de Integración Frontend - Fases 4 y 5
# GLIT Platform - Notificaciones, Misiones y Teacher Portal

**Fecha:** 2025-10-21
**Versión:** Frontend v1.0 → v2.0
**Backend:** v1.1 (100% implementado)

---

## Resumen Ejecutivo

Esta guía proporciona instrucciones paso a paso para integrar en el frontend los tres módulos pendientes: **Notificaciones**, **Misiones** y **Teacher Portal**. El backend está completamente implementado y listo para usar.

---

## Estado Actual vs Estado Objetivo

| Módulo | Estado Actual | Estado Objetivo | Backend Ready |
|--------|---------------|-----------------|---------------|
| Notificaciones | ❌ No existe | ✅ 100% funcional | ✅ Sí (7 endpoints) |
| Misiones | ❌ No existe | ✅ 100% funcional | ✅ Sí (9 endpoints) |
| Teacher Portal | ⚠️ 100% mock | ✅ API real | ✅ Sí (28 endpoints) |

---

## Fase 4: Sistema de Notificaciones

### Objetivos
- Mostrar notificaciones en tiempo real
- Badge con contador de no leídas
- Panel desplegable con lista de notificaciones
- Marcar como leída / Eliminar
- WebSocket para updates en tiempo real

### Paso 1: Actualizar `apiConfig.ts`

**Ubicación:** `/src/services/api/apiConfig.ts`

```typescript
export const API_ENDPOINTS = {
  // ... endpoints existentes

  notifications: {
    list: '/notifications',
    unreadCount: '/notifications/unread-count',
    markAsRead: (id: string) => `/notifications/${id}/read`,
    markAllAsRead: '/notifications/read-all',
    delete: (id: string) => `/notifications/${id}`,
    clearAll: '/notifications/clear-all',
    send: '/notifications/send', // Admin only
  },
};
```

### Paso 2: Crear API Client

**Ubicación:** `/src/services/api/notificationsAPI.ts`

```typescript
import { apiClient } from './apiClient';

export interface Notification {
  id: string;
  userId: string;
  type:
    | 'achievement_unlocked'
    | 'rank_promoted'
    | 'mission_completed'
    | 'mission_expired'
    | 'friend_request'
    | 'friend_accepted'
    | 'assignment_created'
    | 'assignment_graded'
    | 'module_unlocked'
    | 'coins_received'
    | 'system_announcement';
  title: string;
  message: string;
  data?: Record<string, any>;
  status: 'unread' | 'read';
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export const notificationsAPI = {
  /**
   * Get user notifications with optional filters
   */
  getNotifications: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: 'unread' | 'read' | 'all';
  }): Promise<NotificationsResponse> => {
    const response = await apiClient.get('/notifications', { params });
    return response.data.data;
  },

  /**
   * Get count of unread notifications
   */
  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get('/notifications/unread-count');
    return response.data.data.count;
  },

  /**
   * Mark specific notification as read
   */
  markAsRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/notifications/${id}/read`);
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (): Promise<number> => {
    const response = await apiClient.post('/notifications/read-all');
    return response.data.data.marked;
  },

  /**
   * Delete specific notification
   */
  deleteNotification: async (id: string): Promise<void> => {
    await apiClient.delete(`/notifications/${id}`);
  },

  /**
   * Clear all notifications
   */
  clearAll: async (): Promise<number> => {
    const response = await apiClient.delete('/notifications/clear-all');
    return response.data.data.deleted;
  },
};
```

### Paso 3: Crear Zustand Store

**Ubicación:** `/src/features/notifications/store/notificationsStore.ts`

```typescript
import { create } from 'zustand';
import { notificationsAPI, Notification } from '@/services/api/notificationsAPI';

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;

  // Real-time updates
  addNotification: (notification: Notification) => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await notificationsAPI.getNotifications({ limit: 50 });
      set({ notifications: data.notifications, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const count = await notificationsAPI.getUnreadCount();
      set({ unreadCount: count });
    } catch (error: any) {
      console.error('Failed to fetch unread count:', error);
    }
  },

  markAsRead: async (id: string) => {
    try {
      await notificationsAPI.markAsRead(id);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, status: 'read' as const } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationsAPI.markAllAsRead();
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, status: 'read' as const })),
        unreadCount: 0,
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteNotification: async (id: string) => {
    try {
      await notificationsAPI.deleteNotification(id);
      set((state) => {
        const notification = state.notifications.find((n) => n.id === id);
        const wasUnread = notification?.status === 'unread';
        return {
          notifications: state.notifications.filter((n) => n.id !== id),
          unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
        };
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearAll: async () => {
    try {
      await notificationsAPI.clearAll();
      set({ notifications: [], unreadCount: 0 });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  // Real-time updates from WebSocket
  addNotification: (notification: Notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  updateNotification: (id: string, updates: Partial<Notification>) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, ...updates } : n
      ),
    }));
  },
}));
```

### Paso 4: Crear Componentes

#### NotificationBell.tsx

**Ubicación:** `/src/features/notifications/components/NotificationBell.tsx`

```typescript
import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotificationsStore } from '../store/notificationsStore';
import { NotificationsPanel } from './NotificationsPanel';

export const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount, fetchUnreadCount } = useNotificationsStore();

  useEffect(() => {
    fetchUnreadCount();

    // Poll every 30 seconds (can be replaced with WebSocket)
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-semibold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50">
          <NotificationsPanel onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};
```

#### NotificationsPanel.tsx

**Ubicación:** `/src/features/notifications/components/NotificationsPanel.tsx`

```typescript
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useNotificationsStore } from '../store/notificationsStore';
import { NotificationItem } from './NotificationItem';

interface NotificationsPanelProps {
  onClose: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
  const { notifications, isLoading, fetchNotifications, markAllAsRead, clearAll } =
    useNotificationsStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (isLoading) {
    return (
      <div className="w-96 bg-white shadow-lg rounded-lg p-4">
        <div className="animate-pulse">Cargando notificaciones...</div>
      </div>
    );
  }

  return (
    <div className="w-96 max-h-[600px] bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {/* Actions */}
      {notifications.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Marcar todas como leídas
          </button>
          <button
            onClick={clearAll}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Limpiar todas
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="overflow-y-auto max-h-[500px]">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Bell size={48} className="mx-auto mb-2 text-gray-300" />
            <p>No tienes notificaciones</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        )}
      </div>
    </div>
  );
};
```

#### NotificationItem.tsx

**Ubicación:** `/src/features/notifications/components/NotificationItem.tsx`

```typescript
import React from 'react';
import { X, Bell, Trophy, Star, Users, FileText } from 'lucide-react';
import { Notification } from '@/services/api/notificationsAPI';
import { useNotificationsStore } from '../store/notificationsStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface NotificationItemProps {
  notification: Notification;
}

const notificationIcons: Record<string, React.ReactNode> = {
  achievement_unlocked: <Trophy className="text-yellow-500" size={20} />,
  rank_promoted: <Star className="text-purple-500" size={20} />,
  mission_completed: <Star className="text-blue-500" size={20} />,
  friend_request: <Users className="text-green-500" size={20} />,
  assignment_graded: <FileText className="text-blue-500" size={20} />,
  default: <Bell className="text-gray-500" size={20} />,
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { markAsRead, deleteNotification } = useNotificationsStore();

  const handleClick = () => {
    if (notification.status === 'unread') {
      markAsRead(notification.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(notification.id);
  };

  const icon = notificationIcons[notification.type] || notificationIcons.default;
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
    locale: es,
  });

  return (
    <div
      onClick={handleClick}
      className={`
        relative p-4 border-b cursor-pointer transition-colors
        ${notification.status === 'unread' ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'}
      `}
    >
      {/* Unread indicator */}
      {notification.status === 'unread' && (
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
      )}

      <div className="flex items-start gap-3 pl-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">{icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm">{notification.title}</p>
          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
          <p className="text-gray-400 text-xs mt-2">{timeAgo}</p>
        </div>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
```

### Paso 5: Integrar en Navigation

**Ubicación:** `/src/components/layout/Navigation.tsx` o similar

```typescript
import { NotificationBell } from '@/features/notifications/components/NotificationBell';

export const Navigation = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      {/* Logo y otros elementos */}

      <div className="flex items-center gap-4">
        {/* Otros iconos */}
        <NotificationBell />
      </div>
    </nav>
  );
};
```

### Paso 6: WebSocket (Opcional pero Recomendado)

**Ubicación:** `/src/services/websocket/notificationsSocket.ts`

```typescript
import io, { Socket } from 'socket.io-client';
import { useNotificationsStore } from '@/features/notifications/store/notificationsStore';

let socket: Socket | null = null;

export const connectNotificationsSocket = (userId: string, token: string) => {
  if (socket?.connected) return socket;

  socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3006', {
    auth: { token },
    query: { userId },
  });

  socket.on('notification:new', (notification) => {
    useNotificationsStore.getState().addNotification(notification);

    // Optional: Show browser notification
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/logo.png',
      });
    }
  });

  socket.on('connect', () => {
    console.log('✅ Notifications WebSocket connected');
  });

  socket.on('disconnect', () => {
    console.log('❌ Notifications WebSocket disconnected');
  });

  return socket;
};

export const disconnectNotificationsSocket = () => {
  socket?.disconnect();
  socket = null;
};
```

**Integrar en App.tsx:**

```typescript
import { useEffect } from 'react';
import { useAuthStore } from './features/auth/store/authStore';
import { connectNotificationsSocket, disconnectNotificationsSocket } from './services/websocket/notificationsSocket';

function App() {
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (user && token) {
      // Request browser notification permission
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }

      connectNotificationsSocket(user.id, token);
      return () => disconnectNotificationsSocket();
    }
  }, [user, token]);

  return (
    // ... app content
  );
}
```

---

## Fase 4: Sistema de Misiones

### Objetivos
- Panel de misiones diarias (3 misiones)
- Panel de misiones semanales (5 misiones)
- Misiones especiales (eventos)
- Progreso en tiempo real
- Reclamar recompensas

### Paso 1: Actualizar `apiConfig.ts`

```typescript
export const API_ENDPOINTS = {
  // ... endpoints existentes

  missions: {
    daily: '/gamification/missions/daily',
    weekly: '/gamification/missions/weekly',
    special: '/gamification/missions/special',
    claim: (id: string) => `/gamification/missions/${id}/claim`,
    progress: (id: string) => `/gamification/missions/${id}/progress`,
    complete: (id: string) => `/gamification/missions/${id}/complete`,
    userMissions: (userId: string) => `/gamification/missions/user/${userId}`,
    check: (userId: string) => `/gamification/missions/check/${userId}`,
    stats: (userId: string) => `/gamification/missions/stats/${userId}`,
  },
};
```

### Paso 2: Crear API Client

**Ubicación:** `/src/services/api/missionsAPI.ts`

```typescript
import { apiClient } from './apiClient';

export interface Mission {
  id: string;
  userId: string;
  type: 'daily' | 'weekly' | 'special';
  category: 'exercises' | 'modules' | 'score' | 'streak' | 'achievements' | 'social' | 'coins' | 'xp';
  title: string;
  description: string;
  objective: {
    type: string;
    target: number;
    current: number;
  };
  rewards: {
    mlCoins: number;
    xp: number;
    items?: string[];
  };
  status: 'active' | 'completed' | 'claimed' | 'expired';
  expiresAt: string;
  createdAt: string;
  completedAt?: string;
  claimedAt?: string;
}

export const missionsAPI = {
  /**
   * Get 3 daily missions (auto-generates if needed)
   */
  getDailyMissions: async (): Promise<Mission[]> => {
    const response = await apiClient.get('/gamification/missions/daily');
    return response.data.data.missions;
  },

  /**
   * Get 5 weekly missions (auto-generates if needed)
   */
  getWeeklyMissions: async (): Promise<Mission[]> => {
    const response = await apiClient.get('/gamification/missions/weekly');
    return response.data.data.missions;
  },

  /**
   * Get active special missions (events)
   */
  getSpecialMissions: async (): Promise<Mission[]> => {
    const response = await apiClient.get('/gamification/missions/special');
    return response.data.data.missions;
  },

  /**
   * Claim mission rewards
   */
  claimRewards: async (missionId: string) => {
    const response = await apiClient.post(`/gamification/missions/${missionId}/claim`);
    return response.data.data;
  },

  /**
   * Get mission progress
   */
  getMissionProgress: async (missionId: string) => {
    const response = await apiClient.get(`/gamification/missions/${missionId}/progress`);
    return response.data.data;
  },

  /**
   * Get user mission statistics
   */
  getMissionStats: async (userId: string) => {
    const response = await apiClient.get(`/gamification/missions/stats/${userId}`);
    return response.data.data;
  },
};
```

### Paso 3: Crear Zustand Store

**Ubicación:** `/src/features/missions/store/missionsStore.ts`

```typescript
import { create } from 'zustand';
import { missionsAPI, Mission } from '@/services/api/missionsAPI';

interface MissionsState {
  dailyMissions: Mission[];
  weeklyMissions: Mission[];
  specialMissions: Mission[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchDailyMissions: () => Promise<void>;
  fetchWeeklyMissions: () => Promise<void>;
  fetchSpecialMissions: () => Promise<void>;
  claimRewards: (missionId: string) => Promise<void>;
  refreshAllMissions: () => Promise<void>;
  updateMissionProgress: (missionId: string, current: number) => void;
}

export const useMissionsStore = create<MissionsState>((set, get) => ({
  dailyMissions: [],
  weeklyMissions: [],
  specialMissions: [],
  isLoading: false,
  error: null,

  fetchDailyMissions: async () => {
    set({ isLoading: true });
    try {
      const missions = await missionsAPI.getDailyMissions();
      set({ dailyMissions: missions, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchWeeklyMissions: async () => {
    set({ isLoading: true });
    try {
      const missions = await missionsAPI.getWeeklyMissions();
      set({ weeklyMissions: missions, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchSpecialMissions: async () => {
    try {
      const missions = await missionsAPI.getSpecialMissions();
      set({ specialMissions: missions });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  claimRewards: async (missionId: string) => {
    try {
      const result = await missionsAPI.claimRewards(missionId);

      // Update mission status to 'claimed'
      set((state) => ({
        dailyMissions: state.dailyMissions.map((m) =>
          m.id === missionId ? { ...m, status: 'claimed' as const } : m
        ),
        weeklyMissions: state.weeklyMissions.map((m) =>
          m.id === missionId ? { ...m, status: 'claimed' as const } : m
        ),
      }));

      return result;
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  refreshAllMissions: async () => {
    await Promise.all([
      get().fetchDailyMissions(),
      get().fetchWeeklyMissions(),
      get().fetchSpecialMissions(),
    ]);
  },

  updateMissionProgress: (missionId: string, current: number) => {
    set((state) => ({
      dailyMissions: state.dailyMissions.map((m) =>
        m.id === missionId
          ? {
              ...m,
              objective: { ...m.objective, current },
              status: current >= m.objective.target ? ('completed' as const) : m.status,
            }
          : m
      ),
      weeklyMissions: state.weeklyMissions.map((m) =>
        m.id === missionId
          ? {
              ...m,
              objective: { ...m.objective, current },
              status: current >= m.objective.target ? ('completed' as const) : m.status,
            }
          : m
      ),
    }));
  },
}));
```

### Paso 4: Crear Componentes

#### MissionsPanel.tsx

**Ubicación:** `/src/features/missions/components/MissionsPanel.tsx`

```typescript
import React, { useEffect, useState } from 'react';
import { useMissionsStore } from '../store/missionsStore';
import { MissionCard } from './MissionCard';

type TabType = 'daily' | 'weekly' | 'special';

export const MissionsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('daily');
  const {
    dailyMissions,
    weeklyMissions,
    specialMissions,
    isLoading,
    fetchDailyMissions,
    fetchWeeklyMissions,
    fetchSpecialMissions,
  } = useMissionsStore();

  useEffect(() => {
    fetchDailyMissions();
    fetchWeeklyMissions();
    fetchSpecialMissions();

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      if (activeTab === 'daily') fetchDailyMissions();
      if (activeTab === 'weekly') fetchWeeklyMissions();
      if (activeTab === 'special') fetchSpecialMissions();
    }, 60000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const tabs = [
    { id: 'daily' as TabType, label: 'Diarias', count: dailyMissions.length },
    { id: 'weekly' as TabType, label: 'Semanales', count: weeklyMissions.length },
    { id: 'special' as TabType, label: 'Especiales', count: specialMissions.length },
  ];

  const currentMissions =
    activeTab === 'daily'
      ? dailyMissions
      : activeTab === 'weekly'
      ? weeklyMissions
      : specialMissions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Misiones</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-3 font-semibold border-b-2 transition-colors
              ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Missions Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Cargando misiones...</p>
        </div>
      ) : currentMissions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No hay misiones {activeTab === 'daily' ? 'diarias' : activeTab === 'weekly' ? 'semanales' : 'especiales'} disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}
    </div>
  );
};
```

#### MissionCard.tsx

**Ubicación:** `/src/features/missions/components/MissionCard.tsx`

```typescript
import React from 'react';
import { Trophy, Clock, Star, Coins } from 'lucide-react';
import { Mission } from '@/services/api/missionsAPI';
import { useMissionsStore } from '../store/missionsStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface MissionCardProps {
  mission: Mission;
}

const categoryIcons: Record<string, React.ReactNode> = {
  exercises: <Star className="text-blue-500" size={20} />,
  modules: <Trophy className="text-purple-500" size={20} />,
  score: <Star className="text-yellow-500" size={20} />,
  achievements: <Trophy className="text-orange-500" size={20} />,
  coins: <Coins className="text-green-500" size={20} />,
};

export const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const { claimRewards } = useMissionsStore();
  const progress = (mission.objective.current / mission.objective.target) * 100;
  const isCompleted = mission.status === 'completed';
  const isClaimed = mission.status === 'claimed';
  const isExpired = mission.status === 'expired';

  const timeUntilExpiry = formatDistanceToNow(new Date(mission.expiresAt), {
    addSuffix: false,
    locale: es,
  });

  return (
    <div
      className={`
        bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105
        ${isExpired ? 'opacity-50' : ''}
        ${isClaimed ? 'border-2 border-green-500' : ''}
      `}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {categoryIcons[mission.category] || <Star size={20} />}
            <span className="text-sm font-semibold uppercase tracking-wide">
              {mission.type === 'daily' ? 'Diaria' : mission.type === 'weekly' ? 'Semanal' : 'Especial'}
            </span>
          </div>
          {isClaimed && <Trophy className="text-yellow-300" size={24} />}
        </div>
        <h3 className="font-bold text-lg mt-2">{mission.title}</h3>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Description */}
        <p className="text-gray-600 text-sm">{mission.description}</p>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-gray-700">Progreso</span>
            <span className="text-gray-600">
              {mission.objective.current} / {mission.objective.target}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                isCompleted ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-right text-xs text-gray-500 mt-1">{Math.round(progress)}%</div>
        </div>

        {/* Rewards */}
        <div className="flex gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Coins className="text-yellow-500" size={20} />
            <span className="font-semibold">{mission.rewards.mlCoins}</span>
            <span className="text-xs text-gray-600">ML Coins</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-purple-500" size={20} />
            <span className="font-semibold">{mission.rewards.xp}</span>
            <span className="text-xs text-gray-600">XP</span>
          </div>
        </div>

        {/* Timer */}
        {!isExpired && !isClaimed && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>Expira en {timeUntilExpiry}</span>
          </div>
        )}

        {/* Action Button */}
        {isCompleted && !isClaimed && (
          <button
            onClick={() => claimRewards(mission.id)}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <Trophy size={20} />
            Reclamar Recompensas
          </button>
        )}

        {isClaimed && (
          <div className="text-center text-green-600 font-semibold py-3 bg-green-50 rounded-lg">
            ✓ Completada y Reclamada
          </div>
        )}

        {isExpired && (
          <div className="text-center text-red-600 font-semibold py-3 bg-red-50 rounded-lg">
            ⏱ Expirada
          </div>
        )}
      </div>
    </div>
  );
};
```

### Paso 5: Agregar Ruta

**Ubicación:** `/src/App.tsx` o router config

```typescript
import { MissionsPanel } from '@/features/missions/components/MissionsPanel';

// En el router
<Route path="/missions" element={<MissionsPanel />} />
```

---

## Fase 5: Teacher Portal - Migración de Mock a API

### Situación Actual

El Teacher Portal existe pero usa 100% mock data:
- `/apps/teacher/mockData/classroomsMockData.ts`
- `/apps/teacher/mockData/assignmentsMockData.ts`
- `/apps/teacher/mockData/studentsMockData.ts`
- `/apps/teacher/mockData/analyticsMockData.ts`

### Objetivo

Migrar todos los componentes para usar la API real del backend.

### Paso 1: Crear API Client Completo

**Ubicación:** `/src/services/api/teacherAPI.ts`

```typescript
import { apiClient } from './apiClient';

// Types
export interface Classroom {
  id: string;
  name: string;
  description: string;
  gradeLevel: string;
  subject: string;
  teacherId: string;
  studentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  classroomId: string;
  title: string;
  description: string;
  type: 'exercise' | 'quiz' | 'project' | 'homework';
  dueDate: string;
  totalPoints: number;
  status: 'draft' | 'active' | 'completed' | 'archived';
  createdAt: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gradeLevel: string;
  enrolledAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  status: 'pending' | 'submitted' | 'graded';
  submittedAt?: string;
  grade?: number;
  feedback?: string;
  student: Student;
}

export const teacherAPI = {
  // ========== CLASSROOMS ==========
  createClassroom: async (data: Partial<Classroom>) => {
    const response = await apiClient.post('/teacher/classrooms', data);
    return response.data.data;
  },

  getClassrooms: async (): Promise<Classroom[]> => {
    const response = await apiClient.get('/teacher/classrooms');
    return response.data.data.classrooms;
  },

  getClassroom: async (id: string): Promise<Classroom> => {
    const response = await apiClient.get(`/teacher/classrooms/${id}`);
    return response.data.data;
  },

  updateClassroom: async (id: string, data: Partial<Classroom>) => {
    const response = await apiClient.put(`/teacher/classrooms/${id}`, data);
    return response.data.data;
  },

  deleteClassroom: async (id: string) => {
    await apiClient.delete(`/teacher/classrooms/${id}`);
  },

  getClassroomStudents: async (classroomId: string): Promise<Student[]> => {
    const response = await apiClient.get(`/teacher/classrooms/${classroomId}/students`);
    return response.data.data.students;
  },

  addStudents: async (classroomId: string, studentIds: string[]) => {
    const response = await apiClient.post(`/teacher/classrooms/${classroomId}/students`, {
      studentIds,
    });
    return response.data.data;
  },

  removeStudent: async (classroomId: string, studentId: string) => {
    await apiClient.delete(`/teacher/classrooms/${classroomId}/students/${studentId}`);
  },

  // ========== ASSIGNMENTS ==========
  createAssignment: async (data: Partial<Assignment>) => {
    const response = await apiClient.post('/teacher/assignments', data);
    return response.data.data;
  },

  getAssignments: async (filters?: {
    classroomId?: string;
    status?: string;
  }): Promise<Assignment[]> => {
    const response = await apiClient.get('/teacher/assignments', { params: filters });
    return response.data.data.assignments;
  },

  getAssignment: async (id: string): Promise<Assignment> => {
    const response = await apiClient.get(`/teacher/assignments/${id}`);
    return response.data.data;
  },

  updateAssignment: async (id: string, data: Partial<Assignment>) => {
    const response = await apiClient.put(`/teacher/assignments/${id}`, data);
    return response.data.data;
  },

  deleteAssignment: async (id: string) => {
    await apiClient.delete(`/teacher/assignments/${id}`);
  },

  getSubmissions: async (assignmentId: string): Promise<Submission[]> => {
    const response = await apiClient.get(`/teacher/assignments/${assignmentId}/submissions`);
    return response.data.data.submissions;
  },

  gradeSubmission: async (
    assignmentId: string,
    submissionId: string,
    grade: number,
    feedback?: string
  ) => {
    const response = await apiClient.post(
      `/teacher/assignments/${assignmentId}/submissions/${submissionId}/grade`,
      { grade, feedback }
    );
    return response.data.data;
  },

  // ========== GRADING ==========
  getPendingSubmissions: async (): Promise<Submission[]> => {
    const response = await apiClient.get('/teacher/submissions/pending');
    return response.data.data.submissions;
  },

  getSubmission: async (id: string): Promise<Submission> => {
    const response = await apiClient.get(`/teacher/submissions/${id}`);
    return response.data.data;
  },

  addFeedback: async (submissionId: string, feedback: string) => {
    const response = await apiClient.post(`/teacher/submissions/${submissionId}/feedback`, {
      feedback,
    });
    return response.data.data;
  },

  // ========== ANALYTICS ==========
  getClassroomAnalytics: async (classroomId: string) => {
    const response = await apiClient.get(`/teacher/analytics/classroom/${classroomId}`);
    return response.data.data;
  },

  getStudentAnalytics: async (studentId: string) => {
    const response = await apiClient.get(`/teacher/analytics/student/${studentId}`);
    return response.data.data;
  },

  getAssignmentAnalytics: async (assignmentId: string) => {
    const response = await apiClient.get(`/teacher/analytics/assignment/${assignmentId}`);
    return response.data.data;
  },

  getEngagementMetrics: async () => {
    const response = await apiClient.get('/teacher/analytics/engagement');
    return response.data.data;
  },

  // ========== STUDENT PROGRESS ==========
  getStudentProgress: async (studentId: string) => {
    const response = await apiClient.get(`/teacher/students/${studentId}/progress`);
    return response.data.data;
  },

  getStudentNotes: async (studentId: string) => {
    const response = await apiClient.get(`/teacher/students/${studentId}/notes`);
    return response.data.data.notes;
  },

  addStudentNote: async (studentId: string, note: string) => {
    const response = await apiClient.post(`/teacher/students/${studentId}/note`, { note });
    return response.data.data;
  },
};
```

### Paso 2: Migrar Componentes

#### ANTES: ClassroomsList con Mock Data

```typescript
// ❌ ANTES - Mock data
import { mockClassrooms } from './mockData/classroomsMockData';

const ClassroomsList = () => {
  const [classrooms] = useState(mockClassrooms);

  return (
    <div>
      {classrooms.map((classroom) => (
        <ClassroomCard key={classroom.id} classroom={classroom} />
      ))}
    </div>
  );
};
```

#### DESPUÉS: ClassroomsList con API Real

```typescript
// ✅ DESPUÉS - API real
import { useEffect, useState } from 'react';
import { teacherAPI, Classroom } from '@/services/api/teacherAPI';

const ClassroomsList = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        setIsLoading(true);
        const data = await teacherAPI.getClassrooms();
        setClassrooms(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {classrooms.map((classroom) => (
        <ClassroomCard key={classroom.id} classroom={classroom} />
      ))}
    </div>
  );
};
```

### Paso 3: Crear Zustand Store (Opcional)

**Ubicación:** `/src/apps/teacher/store/teacherStore.ts`

```typescript
import { create } from 'zustand';
import { teacherAPI, Classroom, Assignment, Student } from '@/services/api/teacherAPI';

interface TeacherState {
  classrooms: Classroom[];
  assignments: Assignment[];
  isLoading: boolean;
  error: string | null;

  fetchClassrooms: () => Promise<void>;
  fetchAssignments: () => Promise<void>;
  createClassroom: (data: Partial<Classroom>) => Promise<void>;
  deleteClassroom: (id: string) => Promise<void>;
}

export const useTeacherStore = create<TeacherState>((set) => ({
  classrooms: [],
  assignments: [],
  isLoading: false,
  error: null,

  fetchClassrooms: async () => {
    set({ isLoading: true, error: null });
    try {
      const classrooms = await teacherAPI.getClassrooms();
      set({ classrooms, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchAssignments: async () => {
    set({ isLoading: true, error: null });
    try {
      const assignments = await teacherAPI.getAssignments();
      set({ assignments, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createClassroom: async (data) => {
    try {
      const newClassroom = await teacherAPI.createClassroom(data);
      set((state) => ({
        classrooms: [...state.classrooms, newClassroom],
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteClassroom: async (id) => {
    try {
      await teacherAPI.deleteClassroom(id);
      set((state) => ({
        classrooms: state.classrooms.filter((c) => c.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
```

---

## Checklist de Migración

### Notificaciones ✅
- [ ] Crear `notificationsAPI.ts`
- [ ] Crear `notificationsStore.ts`
- [ ] Crear `NotificationBell.tsx`
- [ ] Crear `NotificationsPanel.tsx`
- [ ] Crear `NotificationItem.tsx`
- [ ] Integrar WebSocket (opcional)
- [ ] Agregar a navigation
- [ ] Testing

### Misiones ✅
- [ ] Crear `missionsAPI.ts`
- [ ] Crear `missionsStore.ts`
- [ ] Crear `MissionsPanel.tsx`
- [ ] Crear `MissionCard.tsx`
- [ ] Agregar ruta `/missions`
- [ ] Auto-refresh logic
- [ ] Testing

### Teacher Portal ✅
- [ ] Crear `teacherAPI.ts` completo
- [ ] Migrar `ClassroomsList.tsx`
- [ ] Migrar `ClassroomDetail.tsx`
- [ ] Migrar `AssignmentsList.tsx`
- [ ] Migrar `AssignmentForm.tsx`
- [ ] Migrar `GradingInterface.tsx`
- [ ] Migrar `StudentProgress.tsx`
- [ ] Migrar `AnalyticsDashboard.tsx`
- [ ] Eliminar mock data files
- [ ] Testing

---

## Estimación de Tiempo

| Módulo | Tiempo Estimado | Prioridad |
|--------|----------------|-----------|
| Notificaciones | 1-2 semanas | ALTA |
| Misiones | 1-2 semanas | ALTA |
| Teacher Portal | 3-4 semanas | MEDIA |
| **TOTAL** | **5-8 semanas** | - |

---

## Notas Importantes

1. **Backend listo**: Todos los endpoints están implementados y probados
2. **TypeScript interfaces**: Deben coincidir con los tipos del backend
3. **Error handling**: Siempre manejar errores de API con try/catch
4. **Loading states**: Mostrar spinners mientras carga
5. **Testing**: Escribir tests para cada componente nuevo
6. **Mock data**: ELIMINAR archivos mock después de migrar

---

**Autor:** Claude Code
**Última actualización:** 2025-10-21
**Estado:** Lista para implementación
**Próxima acción:** Comenzar con Notificaciones
