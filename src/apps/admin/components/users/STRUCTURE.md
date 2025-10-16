# UserDetailModal - Estructura del Componente

## Archivos Creados

```
/home/isem/workspace/glit-platform-v2/src/apps/admin/components/users/
├── UserDetailModal.tsx                (794 líneas) ⭐ Componente principal
├── UserDetailModal.example.tsx        (429 líneas) 📖 Ejemplos de integración
├── index.ts                           (6 líneas)   📦 Exports
├── README.md                          (219 líneas) 📚 Documentación completa
└── STRUCTURE.md                       (Este archivo) 🗂️ Estructura visual
```

## Componente Principal: UserDetailModal.tsx

### 1. IMPORTS (Líneas 1-20)
```typescript
- React (useState, useEffect)
- Framer Motion (motion, AnimatePresence)
- Lucide React Icons (X, User, Activity, Shield, Edit2, Save, XCircle)
- Types (SystemUser)
```

### 2. TYPES (Líneas 22-54)
```typescript
interface UserDetailModalProps {
  user: SystemUser | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (userId: string, userData: Partial<UserFormData>) => Promise<void>;
}

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

interface ActivityLog { ... }
type TabType = 'profile' | 'activity' | 'permissions';
```

### 3. COMPONENT STATE (Líneas 60-103)
```typescript
- activeTab: 'profile' | 'activity' | 'permissions'
- isEditing: boolean
- editData: UserFormData
- saving: boolean
- activityLogs: ActivityLog[] (mock data por ahora)
```

### 4. EFFECTS (Líneas 105-124)
```typescript
useEffect(() => { ... }, [user])         // Initialize edit data
useEffect(() => { ... }, [isOpen])       // Reset on close
```

### 5. HANDLERS (Líneas 126-156)
```typescript
- handleSave()      → Guardar cambios de usuario
- handleCancel()    → Cancelar edición y restaurar datos
```

### 6. UTILITY FUNCTIONS (Líneas 158-207)
```typescript
- formatDate()           → Fecha a español (es-MX)
- getRoleDisplayName()   → Rol técnico a legible
- getStatusColor()       → Classes de Tailwind para badge
- getRoleBadgeColor()    → Classes de Tailwind para rol
- getInitials()          → Iniciales del nombre
```

### 7. TAB CONFIGURATION (Líneas 209-217)
```typescript
const tabs = [
  { id: 'profile', name: 'Perfil', icon: User },
  { id: 'activity', name: 'Actividad', icon: Activity },
  { id: 'permissions', name: 'Permisos', icon: Shield },
];
```

### 8. RENDER - ESTRUCTURA DEL MODAL (Líneas 219-794)

```
<AnimatePresence>
  <motion.div>                              ← Backdrop
    <motion.div>                            ← Modal Container
      ├── Header (gradient orange-500 to amber-500)
      │   ├── Avatar (iniciales)
      │   ├── User info (nombre, rol, email)
      │   └── Badges (estado + botón cerrar)
      │
      ├── Tabs Navigation
      │   ├── Tab: Perfil (User icon)
      │   ├── Tab: Actividad (Activity icon)
      │   └── Tab: Permisos (Shield icon)
      │
      └── Tab Content
          │
          ├── PROFILE TAB (activeTab === 'profile')
          │   ├── Header + Botón Editar
          │   ├── EDIT MODE (isEditing === true)
          │   │   ├── Grid 2 columnas con 8 campos:
          │   │   │   1. Nombre Completo
          │   │   │   2. Correo Electrónico
          │   │   │   3. Rol (select)
          │   │   │   4. Estado (select)
          │   │   │   5. Organización
          │   │   │   6. Teléfono
          │   │   │   7. Departamento
          │   │   │   8. Cargo
          │   │   └── Botones: Cancelar | Guardar
          │   │
          │   └── VIEW MODE (isEditing === false)
          │       └── Grid 2 columnas con datos:
          │           - Columna 1: Nombre, Email, Org, ID
          │           - Columna 2: Rol, Estado, Registro, Último acceso
          │
          ├── ACTIVITY TAB (activeTab === 'activity')
          │   ├── Título
          │   └── Timeline
          │       ├── Estado vacío (si no hay logs)
          │       └── Lista de actividades
          │           └── Cada log:
          │               ├── Icono (✓ verde / ✗ rojo)
          │               ├── Acción + Recurso
          │               ├── Detalles (opcional)
          │               ├── Error (opcional)
          │               └── Fecha
          │
          └── PERMISSIONS TAB (activeTab === 'permissions')
              ├── Título
              ├── Warning Card "En Desarrollo"
              ├── Card "Permisos Básicos por Rol"
              │   ├── Rol Actual (badge)
              │   └── Descripción
              └── Card "Jerarquía de Roles"
                  ├── 1. Super Administrador (purple)
                  ├── 2. Profesor Administrador (orange)
                  └── 3. Estudiante (blue)
```

## Animaciones con Framer Motion

### Backdrop
```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
```

### Modal Container
```typescript
initial={{ opacity: 0, scale: 0.95, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95, y: 20 }}
transition={{ type: 'spring', duration: 0.3 }}
```

### Tab Content
```typescript
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -20 }}
transition={{ duration: 0.2 }}
```

## Estilos Destacados

### Header Gradient
```css
bg-gradient-to-r from-orange-500 to-amber-500
```

### Backdrop
```css
fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm
```

### Modal
```css
max-w-4xl w-full max-h-[90vh] overflow-hidden
```

### Focus Ring
```css
focus:ring-2 focus:ring-orange-500 focus:border-orange-500
```

### Tab Active State
```css
border-orange-500 text-orange-600
```

## Badges de Rol (colores)

| Rol                    | Color  | Classes                              |
|------------------------|--------|--------------------------------------|
| Super Administrador    | Purple | `bg-purple-100 text-purple-800`      |
| Profesor Administrador | Orange | `bg-orange-100 text-orange-800`      |
| Estudiante             | Blue   | `bg-blue-100 text-blue-800`          |

## Badges de Estado (colores)

| Estado   | Color | Classes                          |
|----------|-------|----------------------------------|
| Activo   | Green | `bg-green-100 text-green-800`    |
| Inactivo | Red   | `bg-red-100 text-red-800`        |

## Campos Editables (8 total)

1. **Nombre Completo** (text)
2. **Correo Electrónico** (email)
3. **Rol** (select) → 3 opciones
4. **Estado** (select) → 2 opciones
5. **Organización** (text)
6. **Teléfono** (tel)
7. **Departamento** (text)
8. **Cargo** (text)

## Activity Log Structure

```typescript
interface ActivityLog {
  id: string;
  action: string;              // "Inicio de sesión"
  resource_type: string;       // "Autenticación"
  success: boolean;            // true/false → color del icono
  error_message?: string;      // Mostrado en rojo si existe
  created_at: string;          // ISO 8601
  details?: string;            // Info adicional
}
```

## Responsive Breakpoints

- **Mobile:** 1 columna en grid
- **Desktop (md+):** 2 columnas en grid

```css
grid-cols-1 md:grid-cols-2
```

## Z-Index Layers

- Modal: `z-50`
- Backdrop: `z-50`
- Close button: Dentro del modal

## Estados del Componente

1. **Cerrado:** `isOpen = false` → No renderiza nada
2. **Abierto - Vista:** `isOpen = true, isEditing = false` → Solo lectura
3. **Abierto - Edición:** `isOpen = true, isEditing = true` → Formulario editable
4. **Guardando:** `saving = true` → Botón deshabilitado

## Props Opcionales

- `onUpdate`: Si no se proporciona, el botón "Editar" NO se muestra
- `user`: Si es `null`, el modal no renderiza (`return null`)

## Integración con Hook

```typescript
import { useUserManagement } from '../../hooks/useUserManagement';

const { users, updateUserRole } = useUserManagement();
```

## Archivos de Soporte

### README.md (219 líneas)
- Documentación completa
- Props y tipos
- Ejemplos de uso
- Funciones de utilidad
- Animaciones
- Notas de implementación
- Mejoras futuras

### UserDetailModal.example.tsx (429 líneas)
5 ejemplos completos de integración:
1. Página de gestión básica
2. Modal solo lectura
3. API custom
4. Con toast notifications
5. Con confirmación de cambios

### index.ts (6 líneas)
Exports del componente:
```typescript
export { UserDetailModal } from './UserDetailModal';
export { default as UserDetailModalDefault } from './UserDetailModal';
```

## Dependencias Externas

- ✅ `framer-motion` v12.23.24
- ✅ `lucide-react` v0.545.0
- ✅ React 18+
- ✅ TypeScript

## Testing Checklist

- [ ] Abrir/cerrar modal
- [ ] Click fuera del modal para cerrar
- [ ] Navegación entre tabs
- [ ] Modo edición: activar/desactivar
- [ ] Guardar cambios (con onUpdate)
- [ ] Cancelar edición (restaurar datos)
- [ ] Validación de campos
- [ ] Estados de loading
- [ ] Timeline de actividad
- [ ] Responsive mobile/desktop
- [ ] Animaciones suaves

## Performance Considerations

1. **AnimatePresence** con `mode="wait"` en tabs
2. **useEffect** con dependencias correctas
3. **Estado local** para edit data (no muta props)
4. **Optimistic updates** (futuro)
5. **Lazy loading** de activity logs (futuro)

## Accesibilidad

- ✅ `aria-label` en botón cerrar
- ✅ Botón cerrar con icono descriptivo
- 🔲 Focus trap (agregar con react-focus-lock)
- 🔲 ESC key handler (agregar)
- 🔲 Focus management en tabs

## Próximos Pasos

1. Conectar con API real para activity logs
2. Agregar validación de formulario
3. Integrar con sistema de toasts
4. Agregar confirmación para cambios críticos
5. Implementar upload de avatar
6. Desarrollar tab de Permisos completo
7. Agregar filtros en activity timeline
8. Exportar activity logs (CSV/PDF)

---

**Creado:** 2025-10-16
**Versión:** 1.0.0
**Estado:** ✅ Completado y funcional
