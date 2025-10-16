// User types
export interface User {
  id?: string;
  email: string;
  full_name?: string;
  user_metadata?: {
    role: string;
    full_name: string;
  };
}

// Gamification types
export interface UserGamificationData {
  level: number;
  xp: number;
  xp_to_next: number;
  ml: number;
  rank: string;
  badges: string[];
}

// Module types (aligned with DB schema: educational_content.modules)
export interface Module {
  id: string;
  tenant_id?: string;

  // Basic Info
  title: string;
  subtitle?: string;
  description: string;
  summary?: string;

  // Module Organization
  order_index: number;
  module_code?: string;

  // Academic Configuration
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  grade_levels?: string[];
  subjects?: string[];
  estimated_duration_minutes?: number;
  estimated_sessions?: number;

  // Learning Objectives
  learning_objectives?: string[];
  competencies?: string[];
  skills_developed?: string[];

  // Prerequisites (configurable from DB)
  prerequisites?: string[]; // Array of module IDs
  prerequisite_skills?: string[];

  // Gamification (configurable from DB)
  rango_maya_required?: string;
  rango_maya_granted?: string;
  xp_reward?: number;
  ml_coins_reward?: number;

  // Publishing
  status?: 'draft' | 'review' | 'published' | 'archived';
  is_published?: boolean;
  is_featured?: boolean;
  is_free?: boolean;
  is_demo_module?: boolean;
  published_at?: string;
  archived_at?: string;

  // Search & Discovery
  keywords?: string[];
  tags?: string[];
  thumbnail_url?: string;
  cover_image_url?: string;

  // Configuration (dynamic from DB)
  settings?: {
    allow_skip?: boolean;
    sequential_completion?: boolean;
    adaptive_difficulty?: boolean;
    show_progress?: boolean;
    [key: string]: any;
  };
  metadata?: Record<string, any>;

  // Client-side computed properties
  progress?: number;
  exercises_count?: number;
  completed_exercises?: number;
  is_locked?: boolean; // Computed based on prerequisites
  can_access?: boolean; // Computed based on prerequisites + rango

  // Timestamps
  created_at?: string;
  updated_at?: string;

  // Legacy compatibility
  /** @deprecated Use difficulty_level instead */
  difficulty?: 'facil' | 'medio' | 'dificil' | 'experto';
  /** @deprecated Use order_index instead */
  orderIndex?: number;
  /** @deprecated Use estimated_duration_minutes instead */
  estimatedDurationMinutes?: number;
  /** @deprecated Use learning_objectives instead */
  learningObjectives?: string[];
  /** @deprecated Use skills_developed instead */
  skillsDeveloped?: string[];
  /** @deprecated Use rango_maya_required instead */
  rangoMayaRequired?: string;
  /** @deprecated Use rango_maya_granted instead */
  rangoMayaGranted?: string;
  /** @deprecated Use xp_reward instead */
  xpReward?: number;
  /** @deprecated Use ml_coins_reward instead */
  mlCoinsReward?: number;
  /** @deprecated Use thumbnail_url instead */
  thumbnailUrl?: string;
  /** @deprecated Use cover_image_url instead */
  coverImageUrl?: string;
  /** @deprecated Use exercises_count instead */
  totalExercises?: number;
  /** @deprecated Use completed_exercises instead */
  completedExercises?: number;
  /** @deprecated Use progress instead */
  progressPercentage?: number;
  /** @deprecated Use is_published instead */
  isPublished?: boolean;
  /** @deprecated Use created_at instead */
  createdAt?: string;
  /** @deprecated Use updated_at instead */
  updatedAt?: string;
}

// Exercise types
export type ExerciseType =
  // Module 1 - Comprensión Literal
  | 'crucigrama_cientifico'
  | 'crucigrama'
  | 'linea_tiempo'
  | 'timeline'
  | 'sopa_letras'
  | 'mapa_conceptual'
  | 'emparejamiento'
  // Module 2 - Comprensión Inferencial
  | 'detective_textual'
  | 'construccion_hipotesis'
  | 'prediccion_narrativa'
  | 'puzzle_contexto'
  | 'rueda_inferencias'
  // Module 3 - Comprensión Crítica
  | 'analisis_fuentes'
  | 'debate_digital'
  | 'matriz_perspectivas'
  | 'podcast_argumentativo'
  | 'tribunal_opiniones'
  // Module 4 - Textos Digitales y Multimediales
  | 'verificador_fakenews'
  | 'fake_news'
  | 'quiz_tiktok'
  | 'navegacion_hipertextual'
  | 'analisis_memes'
  | 'infografia_interactiva'
  | 'email_formal'
  | 'chat_literario'
  | 'ensayo_argumentativo'
  | 'resena_critica'
  // Module 5 - Producción Creativa
  | 'diario_multimedia'
  | 'comic_digital'
  | 'video_carta'
  // Auxiliar Mechanics
  | 'call_to_action'
  | 'collage_prensa'
  | 'comprension_auditiva'
  | 'texto_movimiento';

// Exercise configuration (aligned with DB schema: educational_content.exercises)
export interface ExerciseConfig {
  // Time Management (from DB)
  estimated_time_minutes?: number;
  time_limit_minutes?: number;

  // Attempts & Retries (configurable from DB)
  max_attempts?: number;
  allow_retry?: boolean;
  retry_delay_minutes?: number;

  // Hints & Help (configurable from DB)
  hints?: string[];
  enable_hints?: boolean;
  hint_cost_ml_coins?: number;

  // Power-ups (Comodines) (configurable from DB)
  comodines_allowed?: ('pistas' | 'vision_lectora' | 'segunda_oportunidad')[];
  comodines_config?: {
    pistas?: { enabled: boolean; cost: number };
    vision_lectora?: { enabled: boolean; cost: number };
    segunda_oportunidad?: { enabled: boolean; cost: number };
  };

  // Grading (from DB)
  auto_gradable?: boolean;
  max_points?: number;
  passing_score?: number;

  // Rewards (from DB)
  xp_reward?: number;
  ml_coins_reward?: number;
  bonus_multiplier?: number;

  // Advanced Features (from DB)
  adaptive_difficulty?: boolean;
  prerequisites?: string[]; // Exercise IDs

  // Custom configuration per exercise type
  [key: string]: any;
}

export interface Exercise {
  id: string;
  module_id: string;

  // Basic Info
  title: string;
  subtitle?: string;
  description?: string;
  instructions?: string;

  // Exercise Type
  type: ExerciseType;
  exercise_type?: ExerciseType; // DB field name
  order_index: number;

  // Configuration (ALL from DB - NO hardcoded values)
  config: ExerciseConfig;

  // Content & Solution (from DB)
  content: {
    question?: string;
    options?: any[];
    correct_answers?: any[];
    explanations?: Record<string, string>;
    [key: string]: any; // Flexible for different exercise types
  };
  solution?: any;
  rubric?: any;

  // Grading (from DB)
  auto_gradable?: boolean;
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  max_points?: number;
  passing_score?: number;

  // Time Management (from DB)
  estimated_time_minutes?: number;
  time_limit_minutes?: number;

  // Attempts & Retries (from DB - configurable)
  max_attempts?: number;
  allow_retry?: boolean;
  retry_delay_minutes?: number;

  // Hints & Help (from DB)
  hints?: string[];
  enable_hints?: boolean;
  hint_cost_ml_coins?: number;

  // Power-ups (from DB)
  comodines_allowed?: ('pistas' | 'vision_lectora' | 'segunda_oportunidad')[];
  comodines_config?: {
    pistas?: { enabled: boolean; cost: number };
    vision_lectora?: { enabled: boolean; cost: number };
    segunda_oportunidad?: { enabled: boolean; cost: number };
  };

  // Rewards (from DB)
  xp_reward?: number;
  ml_coins_reward?: number;
  bonus_multiplier?: number;

  // Status & Flags (from DB)
  is_active?: boolean;
  is_optional?: boolean;
  is_bonus?: boolean;

  // Advanced Features (from DB)
  adaptive_difficulty?: boolean;
  prerequisites?: string[];

  // Versioning
  version?: number;
  version_notes?: string;

  // Metadata
  metadata?: Record<string, any>;

  // Client-side computed properties
  completed?: boolean; // Computed from user progress
  points?: number; // Computed from user attempts
  user_attempts?: number; // From progress_tracking
  best_score?: number; // From progress_tracking
  is_locked?: boolean; // Computed based on prerequisites

  // Timestamps
  created_at?: string;
  updated_at?: string;

  // Legacy compatibility
  /** @deprecated Use difficulty_level instead */
  difficulty?: 'facil' | 'medio' | 'dificil' | 'experto';
  /** @deprecated Use estimated_time_minutes instead */
  estimatedTime?: number;
  /** @deprecated Use title instead */
  moduleTitle?: string;
}

// Achievement types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  unlocked: boolean;
  progress?: number;
  required?: number;
}

// Notification types
export interface Notification {
  id: string;
  type: 'achievement' | 'mission' | 'system' | 'social';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}
