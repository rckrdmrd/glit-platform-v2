/**
 * GLIT Platform V2 - ActivityTimeline Usage Examples
 *
 * Este archivo contiene ejemplos de uso del componente ActivityTimeline
 * para diferentes escenarios comunes.
 */

import React, { useState, useEffect } from 'react';
import { ActivityTimeline, type ActivityLog } from './ActivityTimeline';

// ============================================================================
// EJEMPLO 1: Uso Básico
// ============================================================================

export function BasicExample() {
  const activities: ActivityLog[] = [
    {
      id: '1',
      action: 'Inicio de sesión',
      resource: 'Autenticación',
      details: 'Acceso desde navegador Chrome',
      timestamp: new Date().toISOString(),
      success: true,
    },
    {
      id: '2',
      action: 'Actualización de perfil',
      resource: 'Usuario',
      details: 'Cambio de correo electrónico',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      success: true,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Actividad del Usuario</h2>
      <ActivityTimeline activities={activities} />
    </div>
  );
}

// ============================================================================
// EJEMPLO 2: Con Estado de Carga
// ============================================================================

export function LoadingExample() {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setActivities([
        {
          id: '1',
          action: 'Inicio de sesión',
          resource: 'Autenticación',
          timestamp: new Date().toISOString(),
          success: true,
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Cargando Actividad...</h2>
      <ActivityTimeline activities={activities} loading={loading} />
    </div>
  );
}

// ============================================================================
// EJEMPLO 3: Con Errores
// ============================================================================

export function ErrorExample() {
  const activities: ActivityLog[] = [
    {
      id: '1',
      action: 'Inicio de sesión',
      resource: 'Autenticación',
      timestamp: new Date().toISOString(),
      success: true,
    },
    {
      id: '2',
      action: 'Intento de acceso',
      resource: 'Autenticación',
      error: 'Contraseña incorrecta',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      success: false,
    },
    {
      id: '3',
      action: 'Actualización de perfil',
      resource: 'Usuario',
      error: 'No se pudo actualizar: campo requerido faltante',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      success: false,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Actividad con Errores</h2>
      <ActivityTimeline activities={activities} />
    </div>
  );
}

// ============================================================================
// EJEMPLO 4: Sin Actividad (Empty State)
// ============================================================================

export function EmptyStateExample() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Usuario Nuevo</h2>
      <ActivityTimeline
        activities={[]}
        emptyMessage="Este usuario aún no ha realizado ninguna actividad en el sistema"
      />
    </div>
  );
}

// ============================================================================
// EJEMPLO 5: Integración con API
// ============================================================================

export function ApiIntegrationExample({ userId }: { userId: string }) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${userId}/activities`);

        if (!response.ok) {
          throw new Error('Error al cargar actividades');
        }

        const data = await response.json();

        // Transformar datos de API a formato ActivityLog
        const transformedActivities: ActivityLog[] = data.map((item: any) => ({
          id: item.id,
          action: item.action,
          resource: item.resource_type || item.resource,
          details: item.details,
          error: item.error_message,
          timestamp: item.created_at || item.timestamp,
          success: item.success,
        }));

        setActivities(transformedActivities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [userId]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Historial de Actividad</h2>
      <ActivityTimeline
        activities={activities}
        loading={loading}
        emptyMessage="No hay actividad registrada para este usuario"
      />
    </div>
  );
}

// ============================================================================
// EJEMPLO 6: Timeline Completo con Múltiples Tipos de Actividad
// ============================================================================

export function CompleteExample() {
  const activities: ActivityLog[] = [
    {
      id: '1',
      action: 'Inicio de sesión',
      resource: 'Autenticación',
      details: 'IP: 192.168.1.100, Dispositivo: Chrome en Windows',
      timestamp: new Date().toISOString(),
      success: true,
    },
    {
      id: '2',
      action: 'Completó ejercicio',
      resource: 'Aprendizaje',
      details: 'Ejercicio: "Introducción a JavaScript" - Score: 95%',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      success: true,
    },
    {
      id: '3',
      action: 'Actualización de perfil',
      resource: 'Usuario',
      details: 'Cambió foto de perfil y biografía',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      success: true,
    },
    {
      id: '4',
      action: 'Intento de acceso fallido',
      resource: 'Autenticación',
      error: 'Credenciales inválidas - 3 intentos',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      success: false,
    },
    {
      id: '5',
      action: 'Registro en plataforma',
      resource: 'Usuario',
      details: 'Cuenta creada exitosamente',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      success: true,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Timeline Completo</h2>
        <p className="text-gray-600">
          Historial detallado de todas las actividades del usuario
        </p>
      </div>
      <ActivityTimeline activities={activities} />
    </div>
  );
}

// ============================================================================
// EJEMPLO 7: Con Filtros
// ============================================================================

export function FilteredExample() {
  const [filter, setFilter] = useState<'all' | 'success' | 'error'>('all');

  const allActivities: ActivityLog[] = [
    {
      id: '1',
      action: 'Inicio de sesión',
      resource: 'Autenticación',
      timestamp: new Date().toISOString(),
      success: true,
    },
    {
      id: '2',
      action: 'Error de carga',
      resource: 'Sistema',
      error: 'Timeout al conectar con servidor',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      success: false,
    },
    {
      id: '3',
      action: 'Actualización completada',
      resource: 'Usuario',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      success: true,
    },
  ];

  const filteredActivities = allActivities.filter((activity) => {
    if (filter === 'success') return activity.success;
    if (filter === 'error') return !activity.success;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Actividad con Filtros</h2>

        {/* Filter buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas ({allActivities.length})
          </button>
          <button
            onClick={() => setFilter('success')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Exitosas ({allActivities.filter((a) => a.success).length})
          </button>
          <button
            onClick={() => setFilter('error')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Errores ({allActivities.filter((a) => !a.success).length})
          </button>
        </div>
      </div>

      <ActivityTimeline
        activities={filteredActivities}
        emptyMessage="No hay actividades que coincidan con el filtro seleccionado"
      />
    </div>
  );
}
