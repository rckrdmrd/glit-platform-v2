import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { LoadingFallback } from './LoadingFallback';
import { useAuth } from '@features/auth/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'student' | 'teacher' | 'admin';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role if required
  if (requiredRole) {
    // Get role from database (possible values: 'student', 'admin_teacher', 'super_admin')
    const userRole = user?.role || 'student';

    console.log('🔒 ProtectedRoute - Checking access');
    console.log('  User role:', userRole);
    console.log('  Required role:', requiredRole);

    // Map database roles to route roles
    const roleMapping: Record<string, string> = {
      student: 'student',
      admin_teacher: 'teacher',
      super_admin: 'admin',
    };

    const mappedUserRole = roleMapping[userRole] || 'student';

    // Allow access if:
    // 1. User role matches required role
    // 2. Admin can access everything
    const hasAccess =
      mappedUserRole === requiredRole || userRole === 'super_admin';

    console.log('  Mapped user role:', mappedUserRole);
    console.log('  Has access:', hasAccess);

    if (!hasAccess) {
      console.log('  ❌ Access denied, redirecting to appropriate dashboard');
      // Redirect to user's appropriate dashboard
      switch (userRole) {
        case 'admin_teacher':
          return <Navigate to="/teacher/dashboard" replace />;
        case 'super_admin':
          return <Navigate to="/admin/dashboard" replace />;
        case 'student':
        default:
          return <Navigate to="/dashboard" replace />;
      }
    }

    console.log('  ✅ Access granted');
  }

  return <>{children}</>;
};
