import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LoadingFallback } from '@shared/components/LoadingFallback';
import { RootRedirect } from '@shared/components/RootRedirect';
import { ProtectedRoute } from '@shared/components/ProtectedRoute';

// Critical pages - eager loading
import LoginPage from './apps/student/pages/LoginPage';
import RegisterPage from './apps/student/pages/RegisterPage';

// Lazy-loaded pages
const DashboardPage = lazy(() => import('./apps/student/pages/DashboardComplete'));
const ModuleDetailPage = lazy(() => import('./apps/student/pages/ModuleDetailPage'));
const ExercisePage = lazy(() => import('./apps/student/pages/ExercisePage'));
const ProfilePage = lazy(() => import('./apps/student/pages/ProfilePage'));
const GamificationPage = lazy(() => import('./apps/student/pages/GamificationPage'));
const AchievementsPage = lazy(() => import('./apps/student/pages/AchievementsPage'));
const LeaderboardPage = lazy(() => import('./apps/student/pages/LeaderboardPage'));
const MissionsPage = lazy(() => import('./apps/student/pages/MissionsPage'));
const NotFoundPage = lazy(() => import('./apps/student/pages/NotFoundPage'));

// New pages - lazy-loaded
const FriendsPage = lazy(() => import('./apps/student/pages/FriendsPage'));
const GuildsPage = lazy(() => import('./apps/student/pages/GuildsPage'));
const SettingsPage = lazy(() => import('./apps/student/pages/SettingsPage'));
const ShopPage = lazy(() => import('./apps/student/pages/ShopPage'));
const InventoryPage = lazy(() => import('./apps/student/pages/InventoryPage'));

// Admin pages (legacy - from student folder)
const UserManagementPage = lazy(() => import('./apps/student/pages/admin/UserManagementPage'));
const RolesPermissionsPage = lazy(() => import('./apps/student/pages/admin/RolesPermissionsPage'));
const SecurityDashboard = lazy(() => import('./apps/student/pages/admin/SecurityDashboard'));

// Teacher pages - with Layout
const TeacherDashboardPage = lazy(() => import('./apps/teacher/pages/TeacherDashboardPage'));
const TeacherContentPage = lazy(() => import('./apps/teacher/pages/TeacherContentPage'));
const TeacherGamificationPage = lazy(() => import('./apps/teacher/pages/TeacherGamificationPage'));
const TeacherMonitoringPage = lazy(() => import('./apps/teacher/pages/TeacherMonitoringPage'));
const TeacherAssignmentsPage = lazy(() => import('./apps/teacher/pages/TeacherAssignmentsPage'));
const TeacherProgressPage = lazy(() => import('./apps/teacher/pages/TeacherProgressPage'));
const TeacherAlertsPage = lazy(() => import('./apps/teacher/pages/TeacherAlertsPage'));
const TeacherAnalyticsPage = lazy(() => import('./apps/teacher/pages/TeacherAnalyticsPage'));
const TeacherReportsPage = lazy(() => import('./apps/teacher/pages/TeacherReportsPage'));
const TeacherCommunicationPage = lazy(() => import('./apps/teacher/pages/TeacherCommunicationPage'));
const TeacherResourcesPage = lazy(() => import('./apps/teacher/pages/TeacherResourcesPage'));
const TeacherClassesPage = lazy(() => import('./apps/teacher/pages/TeacherClassesPage'));
const TeacherStudentsPage = lazy(() => import('./apps/teacher/pages/TeacherStudentsPage'));

// Admin pages - with Layout
const AdminDashboardPage = lazy(() => import('./apps/admin/pages/AdminDashboardPage'));

export function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/module/:moduleId"
          element={
            <ProtectedRoute>
              <ModuleDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/module/:moduleId/exercise/:exerciseId"
          element={
            <ProtectedRoute>
              <ExercisePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gamification"
          element={
            <ProtectedRoute>
              <GamificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievements"
          element={
            <ProtectedRoute>
              <AchievementsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievements/:achievementId"
          element={
            <ProtectedRoute>
              <AchievementsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/achievements"
          element={
            <ProtectedRoute>
              <AchievementsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/missions"
          element={
            <ProtectedRoute>
              <MissionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <FriendsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guilds"
          element={
            <ProtectedRoute>
              <GuildsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        {/* Rutas de Teacher */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/content"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherContentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/gamification"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherGamificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/monitoring"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherMonitoringPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/assignments"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherAssignmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/progress"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherProgressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/alerts"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherAlertsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/analytics"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherAnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/reports"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/communication"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherCommunicationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/resources"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherResourcesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/classes"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherClassesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/students"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherStudentsPage />
            </ProtectedRoute>
          }
        />

        {/* Rutas de Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/institutions"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <UserManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/roles"
          element={
            <ProtectedRoute requiredRole="admin">
              <RolesPermissionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/content"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/approvals"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gamification"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/monitoring"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/advanced"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/security"
          element={
            <ProtectedRoute requiredRole="admin">
              <SecurityDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
