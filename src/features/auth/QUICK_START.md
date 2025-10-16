# Quick Start - Auth State Management

Guía rápida para comenzar a usar el sistema de autenticación.

---

## 1. Importar y Usar (3 líneas)

```typescript
import { useAuth } from '@features/auth';

const { login, user, isAuthenticated } = useAuth();
await login('admin@glit.com', 'password123');
```

---

## 2. Hooks Disponibles

### useAuth - Todo lo que necesitas
```typescript
const {
  login,           // (email, password) => Promise<void>
  logout,          // () => void
  register,        // (data: RegisterData) => Promise<void>
  user,            // User | null
  isAuthenticated, // boolean
  isLoading,       // boolean
  error,           // string | null
  clearError       // () => void
} = useAuth();
```

### useUser - Solo datos del usuario
```typescript
const { user, updateUser } = useUser();
```

### useRole - Verificar roles
```typescript
const { isStudent, isTeacher, isAdmin } = useRole();
```

### usePermissions - Verificar permisos
```typescript
const { hasPermission } = usePermissions();
if (hasPermission('create_exercises')) { /* ... */ }
```

### useSession - Info de sesión
```typescript
const { sessionExpiresAt, refreshSession } = useSession();
```

---

## 3. Ejemplos Comunes

### Login Page (Mínimo)
```typescript
import { useAuth } from '@features/auth';

const LoginPage = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await login(email, password);
    }}>
      {error && <div>{error}</div>}
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
};
```

### Protected Route (Mínimo)
```typescript
import { useAuth } from '@features/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Uso:
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Show User Info
```typescript
import { useUser } from '@features/auth';

const Header = () => {
  const { user } = useUser();
  return <div>Hola, {user?.fullName}</div>;
};
```

### Logout Button
```typescript
import { useAuth } from '@features/auth';

const LogoutButton = () => {
  const { logout } = useAuth();
  return <button onClick={logout}>Salir</button>;
};
```

### Role-Based UI
```typescript
import { useRole } from '@features/auth';

const Dashboard = () => {
  const { isStudent, isTeacher } = useRole();
  
  return (
    <div>
      {isStudent && <StudentView />}
      {isTeacher && <TeacherView />}
    </div>
  );
};
```

### Permission-Based Button
```typescript
import { usePermissions } from '@features/auth';

const ExerciseActions = () => {
  const { hasPermission } = usePermissions();
  
  return (
    <div>
      {hasPermission('create_exercises') && 
        <button>Crear Ejercicio</button>
      }
    </div>
  );
};
```

---

## 4. Mock Data para Testing

```
Email: admin@glit.com
Password: password123
```

---

## 5. Permisos Disponibles

- `read` - Todos
- `write` - Teacher, Admin
- `create_exercises` - Teacher, Admin
- `edit_exercises` - Teacher, Admin
- `delete_exercises` - Teacher, Admin
- `manage_students` - Teacher, Admin
- `view_analytics` - Teacher, Admin
- `submit_exercises` - Student
- `view_own_progress` - Student
- `*` - Solo Super Admin (todos los permisos)

---

## 6. Estructura del User

```typescript
interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'student' | 'admin_teacher' | 'super_admin';
  tenantId?: string;
  emailVerified: boolean;
  avatar?: string;
}
```

---

## 7. Debugging

Ver estado en console:
```typescript
import { useAuthStore } from '@features/auth';
console.log(useAuthStore.getState());
```

Limpiar sesión:
```typescript
localStorage.removeItem('auth-storage');
window.location.reload();
```

---

## 8. Archivos Principales

- Store: `/src/features/auth/store/authStore.ts`
- Hooks: `/src/features/auth/hooks/`
- Provider: `/src/features/auth/providers/AuthProvider.tsx`
- API: `/src/features/auth/api/`
- Examples: `/src/features/auth/examples/`

---

## 9. Más Información

- **Documentación completa**: `README.md`
- **Guía de integración**: `INTEGRATION_GUIDE.md`
- **Resumen de implementación**: `IMPLEMENTATION_SUMMARY.md`
- **Ejemplos completos**: `/examples/`

---

**Tip**: Para ver ejemplos completos funcionales, revisa los archivos en `/src/features/auth/examples/`
