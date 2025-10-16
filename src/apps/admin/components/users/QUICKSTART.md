# UserDetailModal - Quick Start Guide

## Instalación Rápida

El componente ya está creado y listo para usar. No requiere instalación adicional.

## Uso Básico (3 pasos)

### 1. Import el componente

```typescript
import { UserDetailModal } from '@/apps/admin/components/users';
import type { SystemUser } from '@/apps/admin/types';
```

### 2. Agrega el estado necesario

```typescript
const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
```

### 3. Renderiza el modal

```typescript
<UserDetailModal
  user={selectedUser}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
```

## Ejemplo Completo Funcional

```typescript
import React, { useState } from 'react';
import { UserDetailModal } from '@/apps/admin/components/users';
import type { SystemUser } from '@/apps/admin/types';

function MyUsersPage() {
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Usuario de ejemplo
  const exampleUser: SystemUser = {
    id: '123',
    full_name: 'Juan Pérez García',
    email: 'juan.perez@example.com',
    role: 'student',
    status: 'active',
    organizationName: 'GLIT Academy',
    lastLogin: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  };

  const handleViewUser = () => {
    setSelectedUser(exampleUser);
    setIsModalOpen(true);
  };

  return (
    <div>
      <button
        onClick={handleViewUser}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
      >
        Ver Detalles de Usuario
      </button>

      <UserDetailModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default MyUsersPage;
```

## Con Edición de Usuario

Para habilitar la edición, agrega el prop `onUpdate`:

```typescript
import { useUserManagement } from '@/apps/admin/hooks/useUserManagement';

function MyUsersPage() {
  const { updateUserRole } = useUserManagement();
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateUser = async (userId: string, userData: Partial<UserFormData>) => {
    try {
      // Actualizar rol
      if (userData.role) {
        await updateUserRole(userId, userData.role);
      }

      // Aquí puedes agregar más lógica de actualización
      console.log('Usuario actualizado:', userId, userData);
    } catch (error) {
      console.error('Error:', error);
      throw error; // El modal manejará el error
    }
  };

  return (
    <>
      {/* Tu UI aquí */}

      <UserDetailModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdateUser}  {/* ← Esto habilita el botón "Editar" */}
      />
    </>
  );
}
```

## Props del Componente

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `user` | `SystemUser \| null` | ✅ Sí | Usuario a mostrar |
| `isOpen` | `boolean` | ✅ Sí | Estado del modal (abierto/cerrado) |
| `onClose` | `() => void` | ✅ Sí | Función al cerrar modal |
| `onUpdate` | `(userId: string, data: Partial<UserFormData>) => Promise<void>` | ❌ No | Función para actualizar usuario (habilita edición) |

## Características de los Tabs

### Tab 1: Perfil
- **Modo Vista:** Muestra información del usuario en formato de lectura
- **Modo Edición:** 8 campos editables (solo si `onUpdate` está presente)
- **Campos:** Nombre, Email, Rol, Estado, Organización, Teléfono, Departamento, Cargo

### Tab 2: Actividad
- **Timeline:** Lista cronológica de actividades del usuario
- **Iconos:** Verde (✓) para éxito, Rojo (✗) para error
- **Datos Mock:** Por ahora muestra datos de ejemplo
- **Futuro:** Conectar con API real

### Tab 3: Permisos
- **Estado:** En desarrollo
- **Muestra:** Rol actual y jerarquía de roles
- **Futuro:** Gestión granular de permisos

## Estructura de Datos

### SystemUser (tipo existente en V2)
```typescript
interface SystemUser {
  id: string;
  full_name: string;
  email: string;
  role: 'super_admin' | 'admin_teacher' | 'student';
  status: 'active' | 'inactive';
  organizationId?: string;
  organizationName?: string;
  lastLogin: string;
  createdAt: string;
  department?: string;  // Agregado para soporte
}
```

### UserFormData (usado en onUpdate)
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

## Patrones de Uso Comunes

### 1. Modal Solo Lectura (sin edición)
```typescript
<UserDetailModal
  user={selectedUser}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  // Sin prop onUpdate = sin botón editar
/>
```

### 2. Con Toast Notifications
```typescript
import { toast } from 'react-hot-toast'; // o tu librería de toasts

const handleUpdateUser = async (userId: string, userData: Partial<UserFormData>) => {
  try {
    await updateUserRole(userId, userData.role);
    toast.success('Usuario actualizado correctamente');
  } catch (error) {
    toast.error('Error al actualizar usuario');
    throw error;
  }
};
```

### 3. Con Confirmación
```typescript
const handleUpdateUser = async (userId: string, userData: Partial<UserFormData>) => {
  // Verificar si es cambio crítico
  if (userData.role === 'super_admin') {
    const confirmed = window.confirm('¿Seguro que quieres cambiar el rol a Super Admin?');
    if (!confirmed) return;
  }

  // Proceder con actualización
  await updateUserRole(userId, userData.role);
};
```

### 4. Integración con Tabla de Usuarios
```typescript
function UsersTable() {
  const { users } = useUserManagement();
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <table>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                  className="text-orange-600 hover:text-orange-900"
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserDetailModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
```

## Keyboard Shortcuts (Futuro)

- **ESC:** Cerrar modal
- **Tab:** Navegar entre campos en modo edición
- **Enter:** Guardar cambios (cuando hay focus en input)

## Tips de Desarrollo

### 1. Cerrar modal correctamente
```typescript
const handleCloseModal = () => {
  setIsModalOpen(false);
  // Opcional: limpiar usuario después de animación de salida
  setTimeout(() => setSelectedUser(null), 300);
};
```

### 2. Validación antes de guardar
```typescript
const handleUpdateUser = async (userId: string, userData: Partial<UserFormData>) => {
  // Validar email
  if (userData.email && !userData.email.includes('@')) {
    alert('Email inválido');
    throw new Error('Email inválido');
  }

  // Validar nombre mínimo
  if (userData.full_name && userData.full_name.length < 2) {
    alert('Nombre muy corto');
    throw new Error('Nombre muy corto');
  }

  // Proceder con actualización...
  await updateUserRole(userId, userData.role);
};
```

### 3. Actualización optimista
```typescript
const handleUpdateUser = async (userId: string, userData: Partial<UserFormData>) => {
  // Actualizar UI inmediatamente
  setSelectedUser(prev => prev ? { ...prev, ...userData } : null);

  try {
    // Actualizar en servidor
    await updateUserRole(userId, userData.role);
  } catch (error) {
    // Revertir cambios en caso de error
    setSelectedUser(originalUser);
    throw error;
  }
};
```

## Troubleshooting

### El modal no se muestra
✅ Verifica que `isOpen` sea `true`
✅ Verifica que `user` no sea `null`
✅ Verifica que no haya errores en consola

### El botón "Editar" no aparece
✅ Debes proporcionar el prop `onUpdate`
```typescript
<UserDetailModal
  user={user}
  isOpen={true}
  onClose={() => {}}
  onUpdate={handleUpdate}  // ← Necesario para habilitar edición
/>
```

### Las animaciones no funcionan
✅ Verifica que `framer-motion` esté instalado
✅ Usa `AnimatePresence` alrededor del componente
✅ El estado `isOpen` debe controlar la renderización

### Los cambios no se guardan
✅ Verifica que `onUpdate` retorne una Promise
✅ Verifica que la función no tenga errores
✅ Abre la consola para ver errores

## Ejemplos Adicionales

Ver archivo completo de ejemplos:
```
/src/apps/admin/components/users/UserDetailModal.example.tsx
```

Contiene 5 ejemplos detallados:
1. Página de gestión básica
2. Modal solo lectura
3. Integración con API custom
4. Con toast notifications
5. Con confirmación de cambios

## Documentación Completa

Para más información detallada, ver:
- `README.md` - Documentación completa
- `STRUCTURE.md` - Estructura interna del componente
- `UserDetailModal.example.tsx` - Ejemplos de código

## Links Útiles

- **Framer Motion Docs:** https://www.framer.com/motion/
- **Lucide React Icons:** https://lucide.dev/
- **Tailwind CSS:** https://tailwindcss.com/

---

**¿Necesitas ayuda?** Consulta los ejemplos en `UserDetailModal.example.tsx` o revisa la documentación completa en `README.md`.
