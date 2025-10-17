# REPORTE: COMPONENTES EDUCATIVOS - GLIT PLATFORM V2

## RESUMEN EJECUTIVO
Análisis de componentes UI del frontend relacionados con módulos, ejercicios, preguntas, quizzes y sistemas de gamificación (Progress, Rank, Badge).

---

## 1. COMPONENTES PRINCIPALES ENCONTRADOS

### 1.1 Componentes Base de Ejercicios

#### ExerciseContainer
**Ubicación:** `/src/shared/components/mechanics/ExerciseContainer.tsx`
**Props principales:**
- `exercise: BaseExercise` - Datos del ejercicio
- `children: React.ReactNode` - Contenido del ejercicio
- `onComplete?: () => void` - Callback de finalización
- `showHeader?: boolean` - Mostrar encabezado (defecto: true)

**Funcionalidad:**
- Contenedor envolvente para ejercicios con animaciones
- Renderiza encabezado con título, descripción, dificultad, tiempo estimado y tema
- Maneja estilos según dificultad (fácil, medio, difícil, experto)
- Utiliza Detective Card para diseño temático

#### ProgressTracker
**Ubicación:** `/src/shared/components/mechanics/ProgressTracker.tsx`
**Props principales:**
- `current: number` - Pasos completados
- `total: number` - Total de pasos
- `showPercentage?: boolean` - Mostrar porcentaje
- `showSteps?: boolean` - Mostrar contador
- `variant: 'bar' | 'steps' | 'circular'` - Tipo de visualización

**Funcionalidad:**
- Visualizador de progreso con tres variantes
- Bar: barra de progreso lineal
- Steps: círculos con conectores entre pasos
- Circular: progreso circular con porcentaje
- Animaciones suaves con Framer Motion

#### ProgressBar
**Ubicación:** `/src/shared/components/base/ProgressBar.tsx`
**Props principales:**
- `progress: number` - Porcentaje (0-100)
- `variant: 'detective' | 'xp'` - Tema visual
- `showLabel?: boolean` - Mostrar etiqueta
- `height: 'sm' | 'md' | 'lg'` - Altura

**Funcionalidad:**
- Barra de progreso con animación fluida
- Soporta dos variantes temáticas (Detective y XP)
- Muestra porcentaje opcional
- Clip redondeado

### 1.2 Componentes de Rango (Rank/Badge)

#### RankBadge (Simple)
**Ubicación:** `/src/shared/components/base/RankBadge.tsx`
**Props principales:**
- `rank: RankType` - Tipo de rango (al_mehen, chilan, batab, halach_uinik, kukulkan, nacom, holcatte, guerrero, mercenario)
- `showIcon?: boolean` - Mostrar icono corona
- `size: 'sm' | 'md' | 'lg'` - Tamaño del badge

**Funcionalidad:**
- Badge circular con gradiente de color según rango
- Muestra ícono de corona y nombre del rango
- Soporta 9 rangos del sistema Maya + Legacy
- Estilo compacto para integración rápida

#### RankBadgeAdvanced
**Ubicación:** `/src/features/gamification/ranks/components/RankBadgeAdvanced.tsx`
**Props principales:**
- `rank: MayaRank` - Rango Maya
- `prestigeLevel?: number` - Nivel de prestigio
- `size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` - Tamaño
- `showName?: boolean` - Mostrar nombre
- `showPrestige?: boolean` - Mostrar estrellas de prestigio
- `animated?: boolean` - Habilitar animaciones
- `showGlow?: boolean` - Efecto brillo

**Funcionalidad:**
- Badge avanzado con animaciones y prestige stars
- Ícono Maya personalizado por rango
- Estrellas de prestigio para niveles superiores
- Efectos visuales (escala, rotación, brillo)

#### RankProgressBar
**Ubicación:** `/src/features/gamification/ranks/components/RankProgressBar.tsx`
**Props principales:**
- `currentXP: number` - XP actual
- `xpToNextLevel: number` - XP para siguiente nivel
- `currentLevel: number` - Nivel actual
- `showStats?: boolean` - Mostrar estadísticas
- `showMilestones?: boolean` - Mostrar hitos
- `color: 'detective' | 'rank' | 'gold'` - Tema de color

**Funcionalidad:**
- Barra de progreso XP con hitos marcados
- Muestra nivel actual → siguiente nivel
- Estadísticas detalladas (XP actual/requerido)
- Efecto "shine" animado
- Tooltips para hitos completados

#### RankUpModal
**Ubicación:** `/src/features/gamification/ranks/components/RankUpModal.tsx`
**Props principales:**
- `isOpen: boolean` - Mostrar/ocultar modal
- `onClose: () => void` - Callback de cierre

**Funcionalidad:**
- Modal de celebración al subir de rango
- Efecto confetti (50 partículas)
- Muestra rango anterior → nuevo rango
- Enlista beneficios desbloqueados
- Muestra multiplicador de recompensas
- Auto-cierre después de 8 segundos

---

## 2. COMPONENTES DE PÁGINAS

### 2.1 Página de Ejercicio

**Ubicación:** `/src/apps/student/pages/ExercisePage.tsx`

**Funcionalidades:**
- Carga dinámica de mecánicas de ejercicio (20+ tipos)
- Sistema de scoring y progreso
- Timer con alertas
- Sistema de pistas (hints) con costo en ML Coins
- Guardado automático cada 30 segundos
- Feedback modal con confetti en éxito
- Breadcrumb de navegación
- Sidebar con: puntuación, timer, progreso circular, pistas, ML Coins

**Rutas:**
- `/module/:moduleId/exercise/:exerciseId`

### 2.2 Página de Detalle de Módulo

**Ubicación:** `/src/apps/student/pages/ModuleDetailPage.tsx`

**Funcionalidades:**
- Información general del módulo
- Barra de progreso por módulo
- Lista de ejercicios del módulo
- Estadísticas: duración, dificultad, XP, ML Coins, progreso
- Objetivos de aprendizaje
- Competencias y habilidades
- Requisitos previos
- Información de rango Maya requerido/otorgado

**Rutas:**
- `/module/:moduleId`

### 2.3 Página de Dashboard

**Ubicación:** `/src/apps/student/pages/DashboardComplete.tsx`

**Componentes utilizados:**
- `ModulesSection` - Grilla de módulos
- `RankProgressWidget` - Widget de progresión de rango
- `RanksSection` - Vista completa de rangos
- `ProgressStats` - Estadísticas generales

---

## 3. COMPONENTES DE MÓDULOS

### ModulesSection
**Ubicación:** `/src/apps/student/components/dashboard/ModulesSection.tsx`

**Props principales:**
- `modules: ModuleData[]` - Lista de módulos
- `loading: boolean` - Estado de carga
- `error: Error | null` - Errores
- `onModuleClick?: (moduleId: string) => void` - Callback de click

**Funcionalidad:**
- Grilla de módulos (grid responsive)
- Card con estado: locked, available, in_progress, completed
- Badges de dificultad y estado
- Barra de progreso por módulo
- Contador de ejercicios (completados/total)
- Información de recompensas: XP, tiempo estimado
- Botones contextuales según estado
- Resumen general de progreso

### ModuleCard (Interno)
**Props principales:**
- `module: ModuleData` - Datos del módulo
- `index: number` - Índice para animación
- `onModuleClick?: (moduleId: string) => void` - Callback

**Funcionalidad:**
- Card individual de módulo
- Badge de estado y dificultad
- Ícono con gradiente
- Progreso visual con animación
- Botones: "Comenzar", "Continuar", "Revisar" según estado

---

## 4. COMPONENTES DE GAMIFICACIÓN

### RankProgressWidget
**Ubicación:** `/src/apps/student/components/dashboard/RankProgressWidget.tsx`

**Funcionalidad:**
- Widget compacto de rango actual
- Muestra: nombre, ícono, XP actual/falta
- Multiplicador XP activo
- Barra de progreso al siguiente rango
- Información de prestige
- Animaciones suaves

### RanksSection
**Ubicación:** `/src/apps/student/components/gamification/RanksSection.tsx`

**Funcionalidad:**
- Showcase del rango actual
- Requisitos para siguiente rango
- Escalera de rangos (5 rangos totales)
- Historial de rangos
- Indicadores visuales: completado, actual, futuro
- Efectos animados

---

## 5. MAPA DE NAVEGACIÓN

```
ESTUDIANTE (Student Routes)
├── /dashboard
│   ├── ModulesSection (módulos)
│   ├── RankProgressWidget (rango)
│   ├── ProgressStats (estadísticas)
│   └── RanksSection (gamificación)
│
├── /module/:moduleId
│   ├── Información del módulo
│   ├── Lista de ejercicios (ModuleCard)
│   └── Información de rango Maya
│
├── /module/:moduleId/exercise/:exerciseId
│   ├── Encabezado con dificultad
│   ├── Mechanic Component (dinámico)
│   ├── Sidebar: Score, Timer, Progress
│   └── Sistema de Hints
│
├── /gamification
│   ├── RankProgressWidget
│   └── RanksSection
│
├── /achievements
├── /leaderboard
├── /missions
├── /friends
├── /guilds
└── /profile

PROFESOR (Teacher Routes)
└── /teacher/
    ├── dashboard
    ├── content
    ├── progress
    ├── monitoring
    ├── assignments
    └── ...

ADMIN (Admin Routes)
└── /admin/
    ├── dashboard
    ├── users
    ├── content
    └── ...
```

---

## 6. TIPOS DE EJERCICIOS SOPORTADOS

### Módulo 1 - Comprensión Literal
- crucigrama_cientifico
- linea_tiempo
- sopa_letras
- mapa_conceptual
- emparejamiento

### Módulo 2 - Comprensión Inferencial
- detective_textual
- construccion_hipotesis
- prediccion_narrativa
- puzzle_contexto
- rueda_inferencias

### Módulo 3 - Comprensión Crítica
- analisis_fuentes
- debate_digital
- matriz_perspectivas
- podcast_argumentativo
- tribunal_opiniones

### Módulo 4 - Textos Digitales
- verificador_fakenews
- quiz_tiktok
- navegacion_hipertextual
- analisis_memes
- infografia_interactiva
- email_formal
- chat_literario
- ensayo_argumentativo
- resena_critica

### Módulo 5 - Producción Creativa
- diario_multimedia
- comic_digital
- video_carta

### Auxiliares
- call_to_action
- collage_prensa
- comprension_auditiva
- texto_movimiento

---

## 7. SISTEMA DE RANGOS MAYA

**5 Rangos Principales:**
1. **Al Mehen** (Gray) - Nivel 1 - 0 XP - 1.0x
2. **Chilan** (Green) - Nivel 2 - 500 XP - 1.5x
3. **Batab** (Blue) - Nivel 3 - 1500 XP - 2.0x
4. **Halach Uinik** (Purple) - Nivel 4 - 3500 XP - 2.5x
5. **Kukulkan** (Yellow/Red) - Nivel 5 - 7500 XP - 3.0x

**Legacy Ranks:** Nacom, Holcatte, Guerrero, Mercenario

**Features:**
- Multiplicador de recompensas (XP/ML Coins)
- Prestige level (estrellas)
- Beneficios desbloqueados por rango
- Modal de celebración al ascender
- Requisitos mostrados en dashboard

---

## 8. MECANISMOS DE GAMIFICACIÓN

### Progress Tracking
- Barra de progreso por ejercicio/módulo
- Progreso circular para visualización compacta
- Porcentaje de finalización
- Pasos completados/totales

### Rewards System
- XP por ejercicio completado
- ML Coins por ejercicio exitoso
- Bonus multiplier por rango
- Penalizaciones por uso de pistas

### Achievement/Badge System
- Badges por rango alcanzado
- Icono Maya por rango
- Prestige stars
- Información de beneficios

---

## 9. DATOS DE CONFIGURACIÓN (BD)

**Por Módulo:**
- titulo, descripción, resumen
- dificultad (facil/medio/dificil/experto)
- status (locked/available/in_progress/completed)
- progreso (0-100)
- ejercicios (total/completados)
- estimatedTime
- xpReward, mlCoinsReward
- learningObjectives, competencies, skills
- rangoMayaRequired, rangoMayaGranted
- prerequisites, tags

**Por Ejercicio:**
- titulo, descripción
- tipo (mechanic type)
- dificultad
- points (max_points)
- estimatedTime
- completed
- max_attempts, retry_delay
- hints, hint_cost_ml_coins
- enable_hints, time_limit_minutes
- comodines_allowed, comodines_config

---

## 10. HOOKS RELEVANTES

- `useModules()` - Obtener lista de módulos
- `useModuleDetail(moduleId)` - Detalle de módulo
- `useUserModules()` - Módulos del usuario
- `useExerciseState()` - Estado del ejercicio
- `useExerciseAttempts()` - Gestión de intentos
- `useRank()` - Datos de rango actual
- `useProgression()` - Progresión de rango

---

## CONCLUSIÓN

El sistema de componentes educativos de GLIT Platform V2 está bien estructurado con:
- Componentes modulares reutilizables
- Sistema de gamificación integrado (Ranks, Progress, Badges)
- 20+ tipos de ejercicios soportados
- Animaciones fluidas con Framer Motion
- Responsive design con Tailwind CSS
- Sistema de rangos Maya temático
- Multi-módulo y progresión tracking

