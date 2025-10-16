# GamilitSidebar Component

Sidebar component de temática detective con gamificación para la plataforma Gamilit. Incluye navegación basada en roles, seguimiento de progreso de módulos y diseño responsivo.

## Ubicación

```
/home/isem/workspace/glit-platform-v2/src/shared/components/layout/GamilitSidebar.tsx
```

## Características

### 1. Header Section (p-6 border-b)
- Logo de Gamilit
- Título "Gamilit" con gradiente naranja
- Subtítulo "Detectives de la Lectura"

### 2. Navigation Section (p-4)
- Navegación basada en rol de usuario (student/teacher/admin)
- Items de navegación específicos por rol:
  - **Student**: Dashboard, Insignias, Tienda, Perfil, Estadísticas
  - **Teacher**: Dashboard, Estudiantes, Ejercicios, Reportes
  - **Admin**: Dashboard, Usuarios, Contenido, Analytics, Configuración
- Estado activo: `bg-orange-100 text-orange-700`
- Hover: `bg-gray-50`
- Íconos de lucide-react

### 3. Modules Section (flex-1 p-4) - Solo Students
- Título: "Casos de Detective"
- Descripción: "Resuelve casos para mejorar tu comprensión lectora"
- 5 módulos predeterminados:
  - Comprensión Literal (Marie Curie)
  - Comprensión Inferencial (Leonardo da Vinci)
  - Comprensión Crítica (Frida Kahlo)
  - Análisis Literario (William Shakespeare)
  - Síntesis y Evaluación (Maya Angelou)

#### Estados de Módulo
- **Unlocked**: Clickeable, hover scale 1.02, shadow-md
- **Locked**: Opacidad 60%, cursor not-allowed
- **Completed**: Border verde, badge "Completado"

#### Íconos por Estado
- Unlocked: BookOpen (naranja)
- Locked: Lock (gris)
- Completed: CheckCircle2 (verde)

#### Progress Bar
- Animada con Framer Motion
- 0-100% dinámico
- Colores:
  - En progreso: Gradiente naranja (from-orange-500 to-orange-600)
  - Completado: Gradiente verde (from-green-500 to-green-600)

### 4. Total Progress Footer (p-4 border-t) - Solo Students
- Label "Progreso Total"
- Porcentaje calculado dinámicamente (promedio de todos los módulos)
- Progress bar con tema detective (naranja)

### 5. Responsive Design
- Desktop (lg+): Sidebar siempre visible (w-80 = 320px)
- Mobile: Overlay con backdrop blur
- Animaciones suaves con Framer Motion
- Scroll vertical en contenido largo

## Props Interface

```typescript
interface GamilitSidebarProps {
  isOpen: boolean;                           // Controla visibilidad del sidebar
  onClose?: () => void;                      // Callback al cerrar (mobile)
  currentPath?: string;                      // Ruta activa actual
  moduleProgress?: SidebarModuleProgress[];  // Datos de progreso de módulos
  onNavigate?: (path: string) => void;       // Callback de navegación
  className?: string;                        // Clases CSS adicionales
  userRole?: 'student' | 'teacher' | 'admin'; // Rol del usuario
}
```

## Module Progress Interface

```typescript
interface SidebarModuleProgress {
  id: string;                       // Identificador único
  title: string;                    // Título del módulo
  subtitle: string;                 // Subtítulo (nombre del personaje)
  icon: React.ComponentType<any>;   // Componente de ícono
  progress: number;                 // Progreso 0-100
  isUnlocked: boolean;              // Si está desbloqueado
  isCompleted: boolean;             // Si está completado
}
```

## Uso Básico

### Student Role con Módulos

```tsx
import { GamilitSidebar } from '@/shared/components/layout';
import { BookOpen } from 'lucide-react';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState('/dashboard');

  const modules = [
    {
      id: 'module-1',
      title: 'Comprensión Literal',
      subtitle: 'Marie Curie',
      icon: BookOpen,
      progress: 75,
      isUnlocked: true,
      isCompleted: false,
    },
    // ... más módulos
  ];

  return (
    <div className="relative min-h-screen">
      <GamilitSidebar
        isOpen={isOpen}
        userRole="student"
        currentPath={currentPath}
        moduleProgress={modules}
        onNavigate={(path) => setCurrentPath(path)}
        onClose={() => setIsOpen(false)}
      />

      <div className="lg:ml-80 p-8">
        {/* Contenido principal */}
      </div>
    </div>
  );
}
```

### Teacher Role

```tsx
<GamilitSidebar
  isOpen={isOpen}
  userRole="teacher"
  currentPath="/students"
  onNavigate={(path) => navigate(path)}
  onClose={() => setIsOpen(false)}
/>
```

### Admin Role

```tsx
<GamilitSidebar
  isOpen={isOpen}
  userRole="admin"
  currentPath="/analytics"
  onNavigate={(path) => navigate(path)}
  onClose={() => setIsOpen(false)}
/>
```

## Integración con React Router

```tsx
import { useLocation, useNavigate } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <GamilitSidebar
      isOpen={isOpen}
      currentPath={location.pathname}
      onNavigate={navigate}
      onClose={() => setIsOpen(false)}
      userRole="student"
    />
  );
}
```

## Mobile Responsive

```tsx
function MobileLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden"
      >
        Menu
      </button>

      <GamilitSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userRole="student"
      />

      <div className="lg:ml-80">
        {/* Contenido */}
      </div>
    </>
  );
}
```

## Estilos y Temas

### Colores Detective Theme

- **Primary Orange**: `from-orange-500 to-orange-600`
- **Success Green**: `from-green-500 to-green-600`
- **Gray Scale**: `gray-50, gray-100, gray-200, gray-600, gray-900`

### Animaciones

- **Sidebar Slide**: 300ms ease-in-out
- **Progress Bar**: 500ms ease-out
- **Module Hover**: scale 1.02
- **Module Tap**: scale 0.98
- **Overlay Fade**: 200ms

### Z-Index

- Overlay: `z-40`
- Sidebar: `z-50`

## Dependencias

- `framer-motion`: Animaciones
- `lucide-react`: Íconos
- `@/shared/lib/utils/cn`: Utilidad className

## Archivos Relacionados

- **Component**: `/home/isem/workspace/glit-platform-v2/src/shared/components/layout/GamilitSidebar.tsx`
- **Examples**: `/home/isem/workspace/glit-platform-v2/src/shared/components/layout/GamilitSidebar.example.tsx`
- **Exports**: `/home/isem/workspace/glit-platform-v2/src/shared/components/layout/index.ts`

## Notas de Implementación

1. **Width**: El sidebar tiene un ancho fijo de `w-80` (320px)
2. **Logo**: Requiere `/logo_gamilit.png` en el directorio public
3. **Scroll**: Usa `scrollbar-thin` y `scrollbar-thumb-gray-300`
4. **Desktop**: Siempre visible en `lg` breakpoint y superior
5. **Mobile**: Overlay con backdrop semi-transparente
6. **Badge**: Componente inline para "Completado"
7. **Progress**: Calcula promedio automáticamente para progreso total

## Personalización

### Custom Badge Component

Si necesitas usar un Badge component externo:

```tsx
import { Badge } from '@/shared/components/ui';

// Reemplazar el Badge interno con tu componente
```

### Custom Styling

```tsx
<GamilitSidebar
  className="shadow-2xl border-r-4 border-orange-500"
  // ... otras props
/>
```

### Custom Module Icons

```tsx
import { Star, Zap, Target } from 'lucide-react';

const customModules = [
  {
    id: 'module-1',
    title: 'Custom Module',
    subtitle: 'Custom Character',
    icon: Star, // Cualquier ícono de lucide-react
    progress: 50,
    isUnlocked: true,
    isCompleted: false,
  },
];
```

## Testing

### Test de Roles

```tsx
describe('GamilitSidebar', () => {
  it('renders student navigation items', () => {
    render(<GamilitSidebar isOpen={true} userRole="student" />);
    expect(screen.getByText('Insignias')).toBeInTheDocument();
  });

  it('renders teacher navigation items', () => {
    render(<GamilitSidebar isOpen={true} userRole="teacher" />);
    expect(screen.getByText('Estudiantes')).toBeInTheDocument();
  });
});
```

### Test de Progreso

```tsx
it('calculates total progress correctly', () => {
  const modules = [
    { progress: 100, isUnlocked: true, isCompleted: true },
    { progress: 50, isUnlocked: true, isCompleted: false },
  ];

  render(<GamilitSidebar moduleProgress={modules} userRole="student" />);
  expect(screen.getByText('75%')).toBeInTheDocument();
});
```

## Performance

- **Memo**: No necesario para renders estables
- **Callbacks**: Usa `useCallback` para `onNavigate` y `onClose`
- **Module List**: Virtualización no necesaria para 5 módulos
- **Animations**: Optimizadas con `will-change` implícito

## Accesibilidad

- **ARIA**: Buttons tienen labels semánticos
- **Keyboard**: Tab navigation completa
- **Screen Readers**: Alt text en logo
- **Focus**: Estados visibles en navegación
- **Disabled**: Módulos bloqueados tienen `disabled={true}`

## Versión

**V2.0** - Migrado desde Gamilit Base con 100% de fidelidad visual
