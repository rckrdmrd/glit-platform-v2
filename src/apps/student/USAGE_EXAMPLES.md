# Ejemplos de Uso - Dashboard Estudiante

Guía práctica para implementar y usar los componentes del dashboard estudiantil.

---

## 1. Implementación Básica del Dashboard

### Importar y usar DashboardHome

```typescript
// En tu archivo de rutas (App.tsx o Router.tsx)
import DashboardHome from '@apps/student/pages/DashboardHome';

// En tu configuración de rutas
<Routes>
  <Route path="/dashboard" element={<DashboardHome />} />
  <Route path="/" element={<DashboardHome />} />
</Routes>
```

---

## 2. Usar Componentes Individuales

### MLCoinsWidget

```typescript
import { MLCoinsWidget } from '@apps/student/components/dashboard';
import { useDashboardData } from '@apps/student/hooks';

function MyPage() {
  const { coins, loading } = useDashboardData('user-123');

  return (
    <div className="p-4">
      <MLCoinsWidget data={coins} loading={loading} />
    </div>
  );
}
```

### RankProgressWidget

```typescript
import { RankProgressWidget } from '@apps/student/components/dashboard';
import { useDashboardData } from '@apps/student/hooks';

function MyPage() {
  const { rank, loading } = useDashboardData('user-123');

  return (
    <div className="p-4">
      <RankProgressWidget data={rank} loading={loading} />
    </div>
  );
}
```

### ModuleGridCard

```typescript
import { ModuleGridCard } from '@apps/student/components/dashboard';
import { useNavigate } from 'react-router-dom';

function ModulesList() {
  const navigate = useNavigate();

  const modules = [
    {
      id: '1',
      title: 'Módulo 1',
      description: 'Descripción del módulo',
      progress: 75,
      exercises_count: 20,
      completed_exercises: 15,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modules.map((module, index) => (
        <ModuleGridCard
          key={module.id}
          module={module}
          onClick={() => navigate(`/module/${module.id}`)}
          index={index}
        />
      ))}
    </div>
  );
}
```

---

## 3. Layout Responsive

### ResponsiveLayout Básico

```typescript
import { ResponsiveLayout } from '@apps/student/components/dashboard';

function MyPage() {
  return (
    <ResponsiveLayout showBottomNav={true}>
      {/* Tu contenido aquí */}
      <div className="col-span-full">
        <h1>Mi Contenido</h1>
      </div>
    </ResponsiveLayout>
  );
}
```

### Con Sidebar Personalizado

```typescript
import { ResponsiveLayout } from '@apps/student/components/dashboard';

function MyPage() {
  const sidebar = (
    <div>
      <h3>Mi Sidebar</h3>
      <nav>
        <a href="/link1">Link 1</a>
        <a href="/link2">Link 2</a>
      </nav>
    </div>
  );

  return (
    <ResponsiveLayout sidebar={sidebar} showBottomNav={true}>
      <div className="col-span-full">
        <h1>Contenido Principal</h1>
      </div>
    </ResponsiveLayout>
  );
}
```

### DashboardSection con Grid

```typescript
import {
  ResponsiveLayout,
  DashboardSection,
} from '@apps/student/components/dashboard';

function MyPage() {
  return (
    <ResponsiveLayout>
      <DashboardSection
        title="Mis Módulos"
        action={<button>Ver todos</button>}
        className="col-span-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contenido */}
        </div>
      </DashboardSection>
    </ResponsiveLayout>
  );
}
```

---

## 4. Swipe Gestures

### Container con Pull-to-Refresh

```typescript
import { SwipeableContainer } from '@apps/student/components/interactions';

function MyPage() {
  const handleRefresh = async () => {
    // Lógica de refresh
    await fetchNewData();
  };

  return (
    <SwipeableContainer
      enablePullToRefresh={true}
      onRefresh={handleRefresh}
      className="min-h-screen"
    >
      {/* Tu contenido */}
      <div>Contenido que se puede refrescar</div>
    </SwipeableContainer>
  );
}
```

### Navegación por Swipe

```typescript
import { SwipeableContainer } from '@apps/student/components/interactions';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const navigate = useNavigate();

  return (
    <SwipeableContainer
      onSwipeLeft={() => navigate('/next')}
      onSwipeRight={() => navigate('/previous')}
      threshold={100}
    >
      <div>Desliza para navegar</div>
    </SwipeableContainer>
  );
}
```

---

## 5. Sistema de Notificaciones

### Achievement Toast

```typescript
import { useState } from 'react';
import { AchievementToastContainer } from '@apps/student/components/notifications';
import type { AchievementData } from '@apps/student/hooks';

function MyPage() {
  const [achievements, setAchievements] = useState<AchievementData[]>([]);

  const showAchievement = (achievement: AchievementData) => {
    setAchievements((prev) => [...prev, achievement]);
  };

  const removeAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div>
      <button onClick={() => showAchievement(mockAchievement)}>
        Desbloquear Logro
      </button>

      <AchievementToastContainer
        achievements={achievements}
        onRemove={removeAchievement}
      />
    </div>
  );
}
```

### Celebration Modal

```typescript
import { useState } from 'react';
import { CelebrationModal } from '@apps/student/components/notifications';

function MyPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>
        Mostrar Celebración
      </button>

      <CelebrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type="module"
        title="¡Módulo Completado!"
        subtitle="Has completado el módulo de Marie Curie"
        rewards={[
          { type: 'coins', amount: 50 },
          { type: 'xp', amount: 100 },
          { type: 'achievement', name: 'Primer Módulo', icon: '🎓' },
        ]}
        onContinue={() => {
          setModalOpen(false);
          // Navegar al siguiente módulo
        }}
        onShare={() => {
          console.log('Compartir en redes sociales');
        }}
      />
    </div>
  );
}
```

---

## 6. Custom Hooks

### useResponsiveLayout

```typescript
import { useResponsiveLayout } from '@apps/student/hooks';

function MyComponent() {
  const {
    breakpoint,
    orientation,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    width,
    height,
  } = useResponsiveLayout();

  return (
    <div>
      <p>Breakpoint: {breakpoint}</p>
      <p>Orientación: {orientation}</p>
      <p>Ancho: {width}px</p>

      {isMobile && <p>Vista móvil</p>}
      {isTablet && <p>Vista tablet</p>}
      {isDesktop && <p>Vista desktop</p>}
      {isWide && <p>Vista ultra-wide</p>}
    </div>
  );
}
```

### useSwipeGesture

```typescript
import { useSwipeableElement } from '@apps/student/hooks';

function MyComponent() {
  const { elementRef, isSwiping } = useSwipeableElement({
    onSwipeLeft: () => console.log('Swipe left'),
    onSwipeRight: () => console.log('Swipe right'),
    onSwipeUp: () => console.log('Swipe up'),
    onSwipeDown: () => console.log('Swipe down'),
    threshold: 50,
  });

  return (
    <div ref={elementRef} className="p-4 bg-white rounded-lg">
      {isSwiping && <p>Deslizando...</p>}
      <p>Desliza en cualquier dirección</p>
    </div>
  );
}
```

### useDashboardData

```typescript
import { useDashboardData } from '@apps/student/hooks';

function MyComponent() {
  const {
    coins,
    rank,
    achievements,
    progress,
    recentAchievements,
    loading,
    error,
    isRefreshing,
    refresh,
  } = useDashboardData('user-123');

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refresh} disabled={isRefreshing}>
        {isRefreshing ? 'Actualizando...' : 'Actualizar'}
      </button>

      <div>Balance: {coins?.balance} ML</div>
      <div>Rango: {rank?.currentRank}</div>
      <div>Logros: {achievements.length}</div>
      <div>Progreso: {progress?.completedExercises}/{progress?.totalExercises}</div>
    </div>
  );
}
```

---

## 7. Keyboard Shortcuts

### Implementar Shortcuts Personalizados

```typescript
import { useKeyboardShortcuts } from '@apps/student/hooks';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  useKeyboardShortcuts({
    'g h': () => navigate('/'),
    'g m': () => navigate('/modules'),
    'g p': () => navigate('/profile'),
    'g g': () => navigate('/gamification'),
    'g s': () => navigate('/settings'),
    'Escape': () => console.log('Cerrar modal'),
  });

  return <div>Usa g + h para ir a Home</div>;
}
```

---

## 8. Integración con Backend Real

### Configurar API Calls

```typescript
// En useDashboardData.ts, descomentar y configurar:

const fetchDashboardData = async () => {
  try {
    const [coinsRes, rankRes, achievementsRes, progressRes] = await Promise.all([
      axios.get(`${API_URL}/api/gamification/coins/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get(`${API_URL}/api/gamification/ranks/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get(`${API_URL}/api/gamification/achievements/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get(`${API_URL}/api/progress/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
    ]);

    setData({
      coins: coinsRes.data,
      rank: rankRes.data,
      achievements: achievementsRes.data,
      progress: progressRes.data,
      recentAchievements: achievementsRes.data
        .filter((a: any) => a.unlocked && a.unlockedAt)
        .sort((a: any, b: any) =>
          new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime()
        )
        .slice(0, 5),
    });
  } catch (err) {
    setError(err.message);
  }
};
```

---

## 9. Personalización de Estilos

### Modificar Colores de Rangos

```javascript
// En tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        // Personalizar colores de rangos
        'rank-detective-from': '#60a5fa',
        'rank-detective-to': '#2563eb',
        // ... más rangos
      },
    },
  },
};
```

### Modificar Animaciones

```typescript
// En cualquier componente
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    type: 'spring',
    stiffness: 300, // Cambiar rigidez
    damping: 20,    // Cambiar amortiguación
  }}
>
  Contenido animado
</motion.div>
```

---

## 10. Testing

### Test de Componente

```typescript
import { render, screen } from '@testing-library/react';
import { MLCoinsWidget } from '@apps/student/components/dashboard';

test('renders ML Coins widget with balance', () => {
  const mockData = {
    balance: 350,
    todayEarned: 75,
    todaySpent: 25,
    recentTransactions: [],
  };

  render(<MLCoinsWidget data={mockData} />);

  expect(screen.getByText('350')).toBeInTheDocument();
  expect(screen.getByText('+50 ML hoy')).toBeInTheDocument();
});
```

### Test de Hook

```typescript
import { renderHook } from '@testing-library/react';
import { useResponsiveLayout } from '@apps/student/hooks';

test('detects mobile breakpoint', () => {
  window.innerWidth = 500;

  const { result } = renderHook(() => useResponsiveLayout());

  expect(result.current.breakpoint).toBe('mobile');
  expect(result.current.isMobile).toBe(true);
});
```

---

## 11. Performance Tips

### Lazy Loading de Componentes

```typescript
import { lazy, Suspense } from 'react';

const DashboardHome = lazy(() => import('@apps/student/pages/DashboardHome'));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <DashboardHome />
    </Suspense>
  );
}
```

### Memoización de Componentes

```typescript
import { memo } from 'react';

const MLCoinsWidget = memo(function MLCoinsWidget({ data, loading }) {
  // ... implementación
}, (prevProps, nextProps) => {
  // Solo re-renderizar si el balance cambió
  return prevProps.data?.balance === nextProps.data?.balance;
});
```

---

## 12. Troubleshooting Común

### Error: "Cannot read property 'balance' of null"

```typescript
// Solución: Siempre verificar datos antes de usar
{data?.balance && <span>{data.balance}</span>}

// O usar loading state
{loading ? <Skeleton /> : <Widget data={data} />}
```

### Animaciones lentas en móvil

```typescript
// Reducir complejidad de animaciones en móvil
const { isMobile } = useResponsiveLayout();

<motion.div
  animate={{
    scale: isMobile ? [1] : [1, 1.05, 1], // Sin escala en móvil
  }}
>
```

### Swipe no funciona

```typescript
// Asegurarse de que el elemento tenga touch-action
<div
  ref={elementRef}
  style={{ touchAction: 'pan-y' }} // Permitir scroll vertical
>
```

---

## Recursos Adicionales

- **README.md**: Documentación completa del proyecto
- **IMPLEMENTATION_SUMMARY.md**: Resumen técnico de la implementación
- **Framer Motion Docs**: https://www.framer.com/motion/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **React Router Docs**: https://reactrouter.com/

---

¿Necesitas más ejemplos? Revisa los componentes implementados en:
- `/src/apps/student/components/dashboard/`
- `/src/apps/student/pages/DashboardHome.tsx`
