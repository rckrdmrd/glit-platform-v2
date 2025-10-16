/**
 * GamilitSidebar - Usage Examples
 *
 * Este archivo muestra ejemplos de uso del componente GamilitSidebar
 * en diferentes escenarios y roles de usuario.
 */

import React, { useState } from 'react';
import GamilitSidebar, { SidebarModuleProgress } from './GamilitSidebar';
import { BookOpen } from 'lucide-react';

// ============================================================================
// Example 1: Student Role with Module Progress
// ============================================================================

export const StudentSidebarExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState('/dashboard');

  const studentModules: SidebarModuleProgress[] = [
    {
      id: 'module-1',
      title: 'Comprensión Literal',
      subtitle: 'Marie Curie',
      icon: BookOpen,
      progress: 100,
      isUnlocked: true,
      isCompleted: true,
    },
    {
      id: 'module-2',
      title: 'Comprensión Inferencial',
      subtitle: 'Leonardo da Vinci',
      icon: BookOpen,
      progress: 45,
      isUnlocked: true,
      isCompleted: false,
    },
    {
      id: 'module-3',
      title: 'Comprensión Crítica',
      subtitle: 'Frida Kahlo',
      icon: BookOpen,
      progress: 0,
      isUnlocked: false,
      isCompleted: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      <GamilitSidebar
        isOpen={isOpen}
        userRole="student"
        currentPath={currentPath}
        moduleProgress={studentModules}
        onNavigate={(path) => {
          console.log('Navigate to:', path);
          setCurrentPath(path);
        }}
        onClose={() => setIsOpen(false)}
      />

      <div className="lg:ml-80 p-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Toggle Sidebar
        </button>
        <h1 className="mt-4 text-2xl font-bold">Student Dashboard</h1>
      </div>
    </div>
  );
};

// ============================================================================
// Example 2: Teacher Role
// ============================================================================

export const TeacherSidebarExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState('/dashboard');

  return (
    <div className="relative min-h-screen bg-gray-50">
      <GamilitSidebar
        isOpen={isOpen}
        userRole="teacher"
        currentPath={currentPath}
        onNavigate={(path) => {
          console.log('Navigate to:', path);
          setCurrentPath(path);
        }}
        onClose={() => setIsOpen(false)}
      />

      <div className="lg:ml-80 p-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Toggle Sidebar
        </button>
        <h1 className="mt-4 text-2xl font-bold">Teacher Dashboard</h1>
      </div>
    </div>
  );
};

// ============================================================================
// Example 3: Admin Role
// ============================================================================

export const AdminSidebarExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState('/dashboard');

  return (
    <div className="relative min-h-screen bg-gray-50">
      <GamilitSidebar
        isOpen={isOpen}
        userRole="admin"
        currentPath={currentPath}
        onNavigate={(path) => {
          console.log('Navigate to:', path);
          setCurrentPath(path);
        }}
        onClose={() => setIsOpen(false)}
      />

      <div className="lg:ml-80 p-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Toggle Sidebar
        </button>
        <h1 className="mt-4 text-2xl font-bold">Admin Dashboard</h1>
      </div>
    </div>
  );
};

// ============================================================================
// Example 4: Mobile Responsive with Overlay
// ============================================================================

export const MobileSidebarExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Mobile header with menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-30">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Open Menu
        </button>
      </div>

      <GamilitSidebar
        isOpen={isOpen}
        userRole="student"
        currentPath="/dashboard"
        onNavigate={(path) => {
          console.log('Navigate to:', path);
          setIsOpen(false);
        }}
        onClose={() => setIsOpen(false)}
      />

      <div className="pt-20 lg:pt-8 lg:ml-80 p-8">
        <h1 className="text-2xl font-bold">Mobile Responsive Example</h1>
        <p className="mt-2 text-gray-600">
          Resize the window to see mobile behavior with overlay
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// Example 5: Dynamic Module Progress
// ============================================================================

export const DynamicProgressExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [modules, setModules] = useState<SidebarModuleProgress[]>([
    {
      id: 'module-1',
      title: 'Comprensión Literal',
      subtitle: 'Marie Curie',
      icon: BookOpen,
      progress: 50,
      isUnlocked: true,
      isCompleted: false,
    },
  ]);

  const updateProgress = () => {
    setModules((prev) =>
      prev.map((module) => ({
        ...module,
        progress: Math.min(100, module.progress + 10),
        isCompleted: module.progress + 10 >= 100,
      }))
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <GamilitSidebar
        isOpen={isOpen}
        userRole="student"
        currentPath="/dashboard"
        moduleProgress={modules}
        onNavigate={(path) => console.log('Navigate to:', path)}
        onClose={() => setIsOpen(false)}
      />

      <div className="lg:ml-80 p-8">
        <h1 className="text-2xl font-bold mb-4">Dynamic Progress Example</h1>
        <button
          onClick={updateProgress}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Increase Progress (+10%)
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// Example 6: Integration with React Router
// ============================================================================

export const RouterIntegrationExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  // In a real app, use: const location = useLocation();
  // In a real app, use: const navigate = useNavigate();
  const currentPath = '/dashboard'; // location.pathname

  const handleNavigate = (path: string) => {
    console.log('Navigate to:', path);
    // In a real app: navigate(path);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <GamilitSidebar
        isOpen={isOpen}
        userRole="student"
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onClose={() => setIsOpen(false)}
      />

      <div className="lg:ml-80 p-8">
        <h1 className="text-2xl font-bold">Router Integration Example</h1>
        <p className="mt-2 text-gray-600">
          Integrate with React Router for seamless navigation
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// Example 7: Custom Styling
// ============================================================================

export const CustomStyledSidebarExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <GamilitSidebar
        isOpen={isOpen}
        userRole="student"
        currentPath="/dashboard"
        onNavigate={(path) => console.log('Navigate to:', path)}
        onClose={() => setIsOpen(false)}
        className="shadow-2xl"
      />

      <div className="lg:ml-80 p-8">
        <h1 className="text-2xl font-bold">Custom Styled Example</h1>
        <p className="mt-2 text-gray-600">
          Additional shadow-2xl class applied to sidebar
        </p>
      </div>
    </div>
  );
};
