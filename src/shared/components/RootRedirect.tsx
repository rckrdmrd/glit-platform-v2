import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoadingFallback } from './LoadingFallback';
import { useAuth } from '@features/auth/hooks/useAuth';

export const RootRedirect = () => {
  const { user, isLoading } = useAuth();
  const [showFallback, setShowFallback] = useState(false);

  // Fallback después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) setShowFallback(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading && !showFallback) {
    return <LoadingFallback />;
  }

  if (showFallback && isLoading) {
    return <Navigate to="/login" replace />;
  }

  if (user) {
    // Redirect based on user role (roles from database: 'student', 'admin_teacher', 'super_admin')
    const userRole = user?.role || 'student';

    console.log('🔍 RootRedirect - User role:', userRole);

    switch (userRole) {
      case 'admin_teacher':
        console.log('➡️ Redirigiendo a Teacher Dashboard');
        return <Navigate to="/teacher/dashboard" replace />;
      case 'super_admin':
        console.log('➡️ Redirigiendo a Admin Dashboard');
        return <Navigate to="/admin/dashboard" replace />;
      case 'student':
      default:
        console.log('➡️ Redirigiendo a Student Dashboard');
        return <Navigate to="/dashboard" replace />;
    }
  }

  return <Navigate to="/login" replace />;
};
