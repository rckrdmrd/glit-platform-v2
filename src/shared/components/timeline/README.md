# ActivityTimeline Component

Componente reutilizable para mostrar un timeline vertical de actividades de usuario.

## Uso

```tsx
import { ActivityTimeline, type ActivityLog } from '@shared/components/timeline';

function MyComponent() {
  const activities: ActivityLog[] = [
    {
      id: '1',
      action: 'Inicio de sesión',
      resource: 'Autenticación',
      details: 'Acceso desde dispositivo móvil',
      timestamp: '2025-10-16T10:00:00Z',
      success: true,
    },
    {
      id: '2',
      action: 'Intento de acceso fallido',
      resource: 'Autenticación',
      error: 'Contraseña incorrecta',
      timestamp: '2025-10-16T09:30:00Z',
      success: false,
    },
  ];

  return (
    <ActivityTimeline
      activities={activities}
      loading={false}
      emptyMessage="No hay actividad registrada"
    />
  );
}
```

## Props

### `ActivityTimelineProps`

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `activities` | `ActivityLog[]` | Sí | - | Array de logs de actividad a mostrar |
| `loading` | `boolean` | No | `false` | Si está cargando, muestra skeleton UI |
| `emptyMessage` | `string` | No | `'No hay actividad registrada'` | Mensaje a mostrar cuando no hay actividades |

### `ActivityLog`

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | `string` | Sí | Identificador único de la actividad |
| `action` | `string` | Sí | Acción realizada (ej: 'Inicio de sesión') |
| `resource` | `string` | Sí | Recurso afectado (ej: 'Autenticación') |
| `timestamp` | `string` | Sí | Fecha ISO 8601 de la actividad |
| `success` | `boolean` | Sí | Si la actividad fue exitosa |
| `details` | `string` | No | Detalles adicionales de la actividad |
| `error` | `string` | No | Mensaje de error (si aplica) |

## Características

- **Timeline Vertical**: Línea conectora visual entre actividades
- **Indicadores de Estado**:
  - Checkmark verde para actividades exitosas
  - X roja para actividades fallidas
- **Formateo de Fechas**: Automático en español (es-MX)
- **Empty State**: Muestra icono y mensaje personalizable
- **Loading State**: Skeleton UI mientras carga
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **TypeScript**: Completamente tipado

## Iconos Utilizados

- `CheckCircle` (lucide-react): Para actividades exitosas
- `XCircle` (lucide-react): Para actividades fallidas
- `Clock` (lucide-react): Para empty state

## Ejemplo de Uso con API

```tsx
import { ActivityTimeline } from '@shared/components/timeline';
import { useState, useEffect } from 'react';

function UserActivityTab({ userId }: { userId: string }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(`/api/users/${userId}/activities`);
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error loading activities:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [userId]);

  return (
    <ActivityTimeline
      activities={activities}
      loading={loading}
      emptyMessage="Este usuario no tiene actividad registrada"
    />
  );
}
```

## Notas de Implementación

- Las fechas se formatean automáticamente usando `toLocaleString('es-MX')`
- El componente es standalone y no tiene dependencias internas de módulos específicos
- Los colores utilizan Tailwind CSS con esquema de colores estándar
- La línea conectora se oculta en el último elemento automáticamente
