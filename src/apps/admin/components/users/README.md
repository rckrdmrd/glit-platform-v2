# UserDetailModal Component

Modal de detalle de usuario con 3 tabs para gestión completa de información de usuario.

## Características

- **3 Tabs Funcionales:**
  - **Perfil:** Visualización y edición de información del usuario (8 campos editables)
  - **Actividad:** Timeline de actividad del usuario con indicadores de éxito/error
  - **Permisos:** Visualización de permisos basados en rol (en desarrollo)

- **Animaciones con Framer Motion:**
  - Entrada/salida del modal con spring animation
  - Transiciones suaves entre tabs
  - Backdrop con blur

- **Características de UI:**
  - Header con gradiente orange-500 to amber-500
  - Avatar con iniciales del usuario
  - Badges de rol y estado
  - Iconos de lucide-react
  - Diseño responsive (grid 1/2 columnas)

## Uso

```tsx
import { UserDetailModal } from '@/apps/admin/components/users';
import { useUserManagement } from '@/apps/admin/hooks/useUserManagement';

function UsersPage() {
  const { users, updateUserRole } = useUserManagement();
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async (userId: string, userData: Partial<UserFormData>) => {
    // Implementar lógica de actualización
    await updateUserRole(userId, userData.role);
    // Actualizar otros campos según necesidad
  };

  return (
    <>
      {/* Tu tabla o lista de usuarios */}
      <button onClick={() => {
        setSelectedUser(users[0]);
        setIsModalOpen(true);
      }}>
        Ver Detalle
      </button>

      {/* Modal */}
      <UserDetailModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </>
  );
}
```

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `user` | `SystemUser \| null` | Sí | Usuario a mostrar en el modal |
| `isOpen` | `boolean` | Sí | Estado de visibilidad del modal |
| `onClose` | `() => void` | Sí | Callback al cerrar el modal |
| `onUpdate` | `(userId: string, userData: Partial<UserFormData>) => Promise<void>` | No | Callback para actualizar usuario (habilita edición) |

## Tipos

```typescript
interface UserFormData {
  full_name: string;
  email: string;
  role: SystemUser['role'];
  status: SystemUser['status'];
  organizationName?: string;
  phone?: string;
  department?: string;
  position?: string;
}
```

## Tab: Perfil

### Modo Vista
- Muestra 8 campos de información del usuario en grid 2 columnas
- Badges para rol y estado con colores diferenciados
- Fechas formateadas en español (es-MX)
- ID de usuario en fuente monospace

### Modo Edición
- 8 campos editables:
  - Nombre Completo (text)
  - Correo Electrónico (email)
  - Rol (select)
  - Estado (select)
  - Organización (text)
  - Teléfono (tel)
  - Departamento (text)
  - Cargo (text)
- Botones Cancelar y Guardar con iconos
- Validación y estado de carga

## Tab: Actividad

- Timeline vertical con logs de actividad
- Iconos de éxito (✓) / error (✗) con colores
- Línea conectora entre eventos
- Información mostrada:
  - Acción realizada
  - Tipo de recurso
  - Detalles adicionales
  - Mensaje de error (si aplica)
  - Fecha/hora formateada
- Estado vacío cuando no hay actividad

## Tab: Permisos

- Mensaje de "En desarrollo" con icono de advertencia
- Información de permisos básicos por rol
- Card con rol actual del usuario
- Jerarquía de roles explicada:
  1. Super Administrador
  2. Profesor Administrador
  3. Estudiante

## Funciones de Utilidad

- `formatDate()`: Formatea fechas al español mexicano
- `getRoleDisplayName()`: Convierte rol técnico a nombre legible
- `getStatusColor()`: Retorna clases de Tailwind para badges de estado
- `getRoleBadgeColor()`: Retorna clases de Tailwind para badges de rol
- `getInitials()`: Extrae iniciales del nombre para avatar

## Animaciones

### Modal
```typescript
initial={{ opacity: 0, scale: 0.95, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95, y: 20 }}
transition={{ type: 'spring', duration: 0.3 }}
```

### Tabs Content
```typescript
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -20 }}
transition={{ duration: 0.2 }}
```

## Estilos

- Usa Tailwind CSS para todos los estilos
- Header con gradiente: `bg-gradient-to-r from-orange-500 to-amber-500`
- Focus states con `focus:ring-2 focus:ring-orange-500`
- Hover states en todos los botones e inputs
- Backdrop con blur: `backdrop-blur-sm`

## Notas de Implementación

1. **Activity Logs**: Actualmente usa datos mock. En producción, conectar con API:
   ```typescript
   const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
   useEffect(() => {
     if (user?.id) {
       fetchUserActivity(user.id).then(setActivityLogs);
     }
   }, [user?.id]);
   ```

2. **Campos adicionales**: Para agregar más campos al formulario, actualizar:
   - Interface `UserFormData`
   - Estado inicial en `useEffect`
   - Grid en modo edición
   - Grid en modo vista

3. **Validación**: Agregar validación antes de `handleSave()`:
   ```typescript
   const validateForm = (): boolean => {
     if (!editData.email.includes('@')) return false;
     if (editData.full_name.length < 2) return false;
     return true;
   };
   ```

4. **Toasts**: Integrar con sistema de notificaciones:
   ```typescript
   try {
     await onUpdate(user.id, editData);
     showToast('Usuario actualizado correctamente', 'success');
   } catch (error) {
     showToast('Error al actualizar usuario', 'error');
   }
   ```

## Accesibilidad

- ✅ Botón cerrar con `aria-label`
- ✅ Click fuera del modal para cerrar
- ✅ Tecla ESC para cerrar (agregar handler)
- ✅ Focus trap dentro del modal (agregar con react-focus-lock)
- ✅ Navegación por teclado en tabs

## Mejoras Futuras

- [ ] Agregar soporte para upload de avatar
- [ ] Implementar gestión de permisos granulares
- [ ] Conectar con API real para activity logs
- [ ] Agregar filtros en tab de actividad
- [ ] Exportar actividad a CSV/PDF
- [ ] Agregar confirmación antes de cambios críticos
- [ ] Historial de cambios (audit log)
- [ ] Soporte para custom fields por organización
