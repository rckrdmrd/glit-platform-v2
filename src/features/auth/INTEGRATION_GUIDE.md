# Guía de Integración - Auth State Management

Esta guía te ayudará a integrar el sistema de autenticación en tu aplicación.

---

## 1. Configuración Inicial

### A. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3001/api
```

### B. AuthProvider Ya Integrado

El `AuthProvider` ya está integrado en `/src/main.tsx`:

```typescript
<BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>
```

---

## 2. Crear Páginas de Autenticación

### Login Page

Crea `/src/apps/auth/pages/LoginPage.tsx`:

```typescript
import { useAuth } from '@features/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const LoginPage = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};
```

### Register Page

```typescript
import { useAuth } from '@features/auth';
import { useState } from 'react';

export const RegisterPage = () => {
  const { register, isLoading, error } = useAuth();
  // ... form state

  const handleSubmit = async (data: RegisterData) => {
    try {
      await register(data);
      // Mostrar mensaje de éxito
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
};
```

---

## 3. Configurar Rutas

En tu archivo de rutas (ej. `/src/App.tsx`):

```typescript
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@features/auth';
import { LoginPage } from './apps/auth/pages/LoginPage';
import { Dashboard } from './apps/dashboard/pages/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
```

---

## 4. Usar en Componentes

### Mostrar Información del Usuario

```typescript
import { useUser } from '@features/auth';

export const UserProfile = () => {
  const { user } = useUser();

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre: {user?.fullName}</p>
      <p>Email: {user?.email}</p>
      <p>Rol: {user?.role}</p>
    </div>
  );
};
```

### Botón de Logout

```typescript
import { useAuth } from '@features/auth';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};
```

### Condicional por Rol

```typescript
import { useRole } from '@features/auth';

export const Dashboard = () => {
  const { isStudent, isTeacher, isAdmin } = useRole();

  return (
    <div>
      {isStudent && <StudentDashboard />}
      {isTeacher && <TeacherDashboard />}
      {isAdmin && <AdminDashboard />}
    </div>
  );
};
```

### Condicional por Permiso

```typescript
import { usePermissions } from '@features/auth';

export const ExercisesList = () => {
  const { hasPermission } = usePermissions();

  return (
    <div>
      <h2>Ejercicios</h2>
      {hasPermission('create_exercises') && (
        <button>Crear Nuevo Ejercicio</button>
      )}
    </div>
  );
};
```

---

## 5. Proteger Rutas por Permiso

Usando el componente de ejemplo:

```typescript
import { ProtectedRouteExample } from '@features/auth/examples';

<Route
  path="/admin/users"
  element={
    <ProtectedRouteExample requiredPermission="manage_students">
      <UserManagement />
    </ProtectedRouteExample>
  }
/>

<Route
  path="/admin/settings"
  element={
    <ProtectedRouteExample requiredRole="super_admin">
      <Settings />
    </ProtectedRouteExample>
  }
/>
```

---

## 6. Conectar con Backend API

Cuando tu backend esté listo, actualiza las funciones mock en `/src/features/auth/store/authStore.ts`:

### Antes (Mock):
```typescript
login: async (email, password) => {
  const response = await mockLogin(email, password);
  // ...
}
```

### Después (Real API):
```typescript
import { authApi } from '../api/authApi';

login: async (email, password) => {
  const response = await authApi.login({ email, password });
  // El resto del código permanece igual
  set({
    user: response.user,
    token: response.token,
    // ...
  });
}
```

Aplica lo mismo para:
- `register`
- `refreshSession`
- `requestPasswordReset`
- `resetPassword`

---

## 7. Configurar Interceptors

Los interceptors ya están configurados en `/src/features/auth/api/apiClient.ts` y:

1. Añaden automáticamente el token JWT a todas las peticiones
2. Añaden el tenant-id para multi-tenant
3. Refrescan el token si expira (401)
4. Redirigen a login si el refresh falla

Para usar el cliente en otros features:

```typescript
import { apiClient } from '@features/auth';

// Todas las peticiones incluirán automáticamente el token
const response = await apiClient.get('/exercises');
const data = await apiClient.post('/exercises', exerciseData);
```

---

## 8. Manejo de Errores

Los errores se manejan automáticamente y se guardan en el store:

```typescript
const { error, clearError } = useAuth();

// Mostrar error
{error && (
  <div className="error-message">
    {error}
    <button onClick={clearError}>×</button>
  </div>
)}
```

---

## 9. Testing

### Testing con Mock Data

Para development, usa estas credenciales:

```
Email: admin@glit.com
Password: password123
```

### Testing de Permisos

```typescript
import { usePermissions } from '@features/auth';

const { hasPermission } = usePermissions();

// Test diferentes permisos
console.log(hasPermission('read')); // true (todos)
console.log(hasPermission('create_exercises')); // solo teacher/admin
console.log(hasPermission('manage_students')); // solo teacher/admin
```

---

## 10. Debugging

### Ver Estado del Store

```typescript
import { useAuthStore } from '@features/auth';

// En DevTools console:
console.log(useAuthStore.getState());
```

### Limpiar Sesión (localStorage)

```typescript
localStorage.removeItem('auth-storage');
window.location.reload();
```

### Verificar Token

```typescript
const token = useAuthStore.getState().token;
console.log('Token:', token);
console.log('Expires:', new Date(useAuthStore.getState().sessionExpiresAt || 0));
```

---

## 11. Seguridad

### Multi-Tenant

El tenant-id se envía automáticamente en los headers:

```typescript
// Automático en apiClient
headers['X-Tenant-ID'] = user.tenantId;
```

El backend debe:
1. Validar el tenant-id en cada request
2. Aplicar RLS en PostgreSQL
3. Verificar que el usuario pertenece al tenant

### Session Management

- Sesión dura 7 días
- Se refresca automáticamente cuando quedan < 1 hora
- Se cierra automáticamente si expira
- Verificación cada minuto

---

## 12. Próximos Pasos

1. **Implementar páginas de auth** (Login, Register, etc.)
2. **Configurar rutas protegidas** en tu App
3. **Conectar con backend API** cuando esté listo
4. **Agregar tests** usando el archivo de ejemplo
5. **Implementar MFA** (opcional, futuro)
6. **Agregar OAuth** (Google, GitHub, etc.)

---

## 13. Soporte

Si tienes problemas:

1. Verifica que el AuthProvider esté en main.tsx
2. Checa la consola del navegador por errores
3. Verifica el estado del store en DevTools
4. Revisa los ejemplos en `/src/features/auth/examples/`
5. Lee la documentación completa en `/src/features/auth/README.md`

---

## Ejemplo Completo Mínimo

```typescript
// App.tsx
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@features/auth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
  </Routes>
);

// LoginPage.tsx
const LoginPage = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};
```

---

**Fecha**: 2025-10-16
**Estado**: Production Ready con Mock Data
