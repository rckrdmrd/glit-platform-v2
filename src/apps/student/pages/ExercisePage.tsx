import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GamifiedHeader } from '@shared/components/layout/GamifiedHeader';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { EnhancedCard } from '@shared/components/base/EnhancedCard';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { ScoreDisplay } from '@shared/components/mechanics/ScoreDisplay';
import { TimerWidget } from '@shared/components/mechanics/TimerWidget';
import { ProgressTracker } from '@shared/components/mechanics/ProgressTracker';
import { HintSystem } from '@shared/components/mechanics/HintSystem';
import { FeedbackModal } from '@shared/components/mechanics/FeedbackModal';
import {
  ArrowLeft,
  Save,
  Send,
  SkipForward,
  Clock,
  Star,
  Trophy,
  ChevronRight,
  Loader2
} from 'lucide-react';
import type { FeedbackData } from '@shared/components/mechanics/mechanicsTypes';
import { getExercise, saveExerciseProgress, submitExercise, getExerciseHints } from '@/services/api/educationalAPI';
import { adaptExerciseData } from '@shared/utils/exerciseAdapter';

// ============================================================================
// TYPES
// ============================================================================

interface ExerciseData {
  id: string;
  module_id: string;
  title: string;
  type: string;
  description: string;
  difficulty: 'facil' | 'medio' | 'dificil' | 'experto';
  points: number;
  estimatedTime: number;
  completed: boolean;
  moduleTitle?: string;
  mechanicData?: any;
}

interface ExerciseProgress {
  currentStep: number;
  totalSteps: number;
  score: number;
  hintsUsed: number;
  timeSpent: number;
}

// ============================================================================
// DYNAMIC IMPORTS MAPPING
// ============================================================================

const loadMechanic = (mechanicType: string) => {
  // Validate mechanicType
  if (!mechanicType || typeof mechanicType !== 'string') {
    console.error('Invalid mechanic type:', mechanicType);
    return null;
  }

  const mechanicMap: Record<string, () => Promise<any>> = {
    // Module 1 - Comprensión Literal
    'crucigrama_cientifico': () => import('@/features/mechanics/module1/Crucigrama/CrucigramaExercise'),
    'crucigrama': () => import('@/features/mechanics/module1/Crucigrama/CrucigramaExercise'),
    'linea_tiempo': () => import('@/features/mechanics/module1/Timeline/TimelineExercise'),
    'timeline': () => import('@/features/mechanics/module1/Timeline/TimelineExercise'),
    'sopa_letras': () => import('@/features/mechanics/module1/SopaLetras/SopaLetrasExercise'),
    'mapa_conceptual': () => import('@/features/mechanics/module1/MapaConceptual/MapaConceptualExercise'),
    'emparejamiento': () => import('@/features/mechanics/module1/Emparejamiento/EmparejamientoExercise'),

    // Module 2 - Comprensión Inferencial
    'detective_textual': () => import('@/features/mechanics/module2/DetectiveTextual/DetectiveTextualExercise'),
    'construccion_hipotesis': () => import('@/features/mechanics/module2/ConstruccionHipotesis/ConstruccionHipotesisExercise'),
    'prediccion_narrativa': () => import('@/features/mechanics/module2/PrediccionNarrativa/PrediccionNarrativaExercise'),
    'puzzle_contexto': () => import('@/features/mechanics/module2/PuzzleContexto/PuzzleContextoExercise'),
    'rueda_inferencias': () => import('@/features/mechanics/module2/RuedaInferencias/RuedaInferenciasExercise'),

    // Module 3 - Comprensión Crítica
    'analisis_fuentes': () => import('@/features/mechanics/module3/AnalisisFuentes/AnalisisFuentesExercise'),
    'debate_digital': () => import('@/features/mechanics/module3/DebateDigital/DebateDigitalExercise'),
    'matriz_perspectivas': () => import('@/features/mechanics/module3/MatrizPerspectivas/MatrizPerspectivasExercise'),
    'podcast_argumentativo': () => import('@/features/mechanics/module3/PodcastArgumentativo/PodcastArgumentativoExercise'),
    'tribunal_opiniones': () => import('@/features/mechanics/module3/TribunalOpiniones/TribunalOpinionesExercise'),

    // Module 4 - Textos Digitales y Multimediales
    'verificador_fakenews': () => import('@/features/mechanics/module4/VerificadorFakeNews/VerificadorFakeNewsExercise'),
    'fake_news': () => import('@/features/mechanics/module4/VerificadorFakeNews/VerificadorFakeNewsExercise'),
    'quiz_tiktok': () => import('@/features/mechanics/module4/QuizTikTok/QuizTikTokExercise'),
    'navegacion_hipertextual': () => import('@/features/mechanics/module4/NavegacionHipertextual/NavegacionHipertextualExercise'),
    'analisis_memes': () => import('@/features/mechanics/module4/AnalisisMemes/AnalisisMemesExercise'),
    'infografia_interactiva': () => import('@/features/mechanics/module4/InfografiaInteractiva/InfografiaInteractivaExercise'),
    'email_formal': () => import('@/features/mechanics/module4/EmailFormal/EmailFormalExercise'),
    'chat_literario': () => import('@/features/mechanics/module4/ChatLiterario/ChatLiterarioExercise'),
    'ensayo_argumentativo': () => import('@/features/mechanics/module4/EnsayoArgumentativo/EnsayoArgumentativoExercise'),
    'resena_critica': () => import('@/features/mechanics/module4/ResenaCritica/ResenaCriticaExercise'),

    // Module 5 - Producción Creativa
    'diario_multimedia': () => import('@/features/mechanics/module5/DiarioMultimedia/DiarioMultimediaExercise'),
    'comic_digital': () => import('@/features/mechanics/module5/ComicDigital/ComicDigitalExercise'),
    'video_carta': () => import('@/features/mechanics/module5/VideoCarta/VideoCartaExercise'),

    // Auxiliar Mechanics
    'call_to_action': () => import('@/features/mechanics/auxiliar/CallToAction/CallToActionExercise'),
    'collage_prensa': () => import('@/features/mechanics/auxiliar/CollagePrensa/CollagePrensaExercise'),
    'comprension_auditiva': () => import('@/features/mechanics/auxiliar/ComprensiónAuditiva/ComprensiónAuditivaExercise'),
    'texto_movimiento': () => import('@/features/mechanics/auxiliar/TextoEnMovimiento/TextoEnMovimientoExercise'),
  };

  return mechanicMap[mechanicType.toLowerCase()] || null;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ExercisePage() {
  const { moduleId, exerciseId } = useParams();
  const navigate = useNavigate();

  // State
  const [exercise, setExercise] = useState<ExerciseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [MechanicComponent, setMechanicComponent] = useState<React.ComponentType<any> | null>(null);
  const [progress, setProgress] = useState<ExerciseProgress>({
    currentStep: 0,
    totalSteps: 1,
    score: 0,
    hintsUsed: 0,
    timeSpent: 0,
  });
  const [availableCoins, setAvailableCoins] = useState(350);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [startTime] = useState(new Date());
  const [hints, setHints] = useState<Array<{ id: string; text: string; cost: number }>>([]);

  // User data
  const user = {
    email: 'detective@glit.com',
    full_name: 'Marie Curie',
  };

  // ============================================================================
  // DATA FETCHING
  // ============================================================================

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);

        // Fetch exercise from API
        const exerciseData = await getExercise(exerciseId!);

        // Map API response to ExerciseData format
        // Handle both 'type' and 'exercise_type' fields from backend
        const exerciseType = exerciseData.type || exerciseData.exercise_type || exerciseData.exerciseType || 'crucigrama_cientifico';

        const mappedExercise: ExerciseData = {
          id: exerciseData.id,
          module_id: exerciseData.module_id,
          title: exerciseData.title,
          type: exerciseType,
          description: exerciseData.description || '',
          difficulty: exerciseData.difficulty as 'facil' | 'medio' | 'dificil' | 'experto',
          points: exerciseData.points || exerciseData.max_points || 0,
          estimatedTime: ((exerciseData.estimatedTime || exerciseData.estimated_time_minutes || 15) * 60), // Convert minutes to seconds
          completed: exerciseData.completed || false,
          moduleTitle: undefined,
          mechanicData: exerciseData,
        };

        console.log('Mapped exercise:', mappedExercise);

        setExercise(mappedExercise);

        // Fetch hints for this exercise
        try {
          const exerciseHints = await getExerciseHints(exerciseId!);
          setHints(exerciseHints.map(h => ({ id: h.id, text: h.text, cost: h.cost })));
        } catch (hintError) {
          console.warn('Could not load hints:', hintError);
          // Continue without hints - not critical
        }

        // Load dynamic component
        const loader = loadMechanic(mappedExercise.type);
        if (loader) {
          const module = await loader();
          setMechanicComponent(() => module.default || module.CrucigramaExercise || module);
        }
      } catch (error) {
        console.error('Error loading exercise:', error);

        // Fallback to mock data if API fails
        console.warn('API failed, using mock data as fallback');
        const mockExercise: ExerciseData = {
          id: exerciseId!,
          module_id: moduleId!,
          title: 'Crucigrama: Primeros Años de Marie Curie',
          type: 'crucigrama_cientifico',
          description: 'Completa el crucigrama sobre los primeros años de la científica Marie Curie',
          difficulty: 'medio',
          points: 150,
          estimatedTime: 900, // 15 minutes
          completed: false,
          moduleTitle: 'Los Primeros Pasos de Marie Curie',
          mechanicData: {}
        };

        setExercise(mockExercise);

        // Load component with mock data
        const loader = loadMechanic(mockExercise.type);
        if (loader) {
          const module = await loader();
          setMechanicComponent(() => module.default || module.CrucigramaExercise || module);
        }

        // Show warning but don't block the UI
        setFeedback({
          type: 'warning',
          title: 'Modo sin conexión',
          message: 'No se pudo conectar con el servidor. Estás viendo datos de ejemplo.',
        });
      } finally {
        setLoading(false);
      }
    };

    if (exerciseId) {
      fetchExercise();
    }
  }, [exerciseId, moduleId]);

  // ============================================================================
  // AUTO-SAVE
  // ============================================================================

  useEffect(() => {
    if (!exercise || !hasUnsavedChanges) return;

    const autoSaveInterval = setInterval(() => {
      handleSaveProgress();
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [exercise, hasUnsavedChanges, progress]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleSaveProgress = async () => {
    if (!exerciseId) return;

    try {
      // Save progress via API
      await saveExerciseProgress(exerciseId, {
        currentStep: progress.currentStep,
        totalSteps: progress.totalSteps,
        score: progress.score,
        hintsUsed: progress.hintsUsed,
        timeSpent: progress.timeSpent,
      });

      setHasUnsavedChanges(false);

      // Show brief success notification
      console.log('Progress saved successfully');
    } catch (error) {
      console.error('Error saving progress:', error);

      // Fallback to localStorage if API fails
      try {
        localStorage.setItem(
          `exercise_${exerciseId}_progress`,
          JSON.stringify({
            progress,
            timestamp: new Date().toISOString(),
          })
        );
        setHasUnsavedChanges(false);
        console.log('Progress saved locally');
      } catch (localError) {
        console.error('Failed to save progress locally:', localError);
      }
    }
  };

  const handleSubmit = async () => {
    if (!exerciseId) return;

    try {
      const timeSpent = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);

      // Submit exercise via API
      const result = await submitExercise(exerciseId, {
        answers: progress,
        timeSpent,
        hintsUsed: progress.hintsUsed,
      });

      // Display submission results
      setFeedback({
        type: 'success',
        title: result.success ? 'Ejercicio Completado' : 'Ejercicio Enviado',
        message: result.success
          ? `Has obtenido ${result.score} puntos. Ganaste ${result.xpEarned} XP y ${result.mlCoinsEarned} ML Coins.`
          : 'Tu respuesta ha sido enviada exitosamente. El profesor la revisará pronto.',
        showConfetti: result.success && result.score >= 80,
      });
      setShowFeedback(true);

      // Update coins if earned
      if (result.mlCoinsEarned) {
        setAvailableCoins((prev) => prev + result.mlCoinsEarned);
      }
    } catch (error) {
      console.error('Error submitting exercise:', error);
      setFeedback({
        type: 'error',
        title: 'Error al enviar',
        message: 'Hubo un problema al enviar tu respuesta. Por favor, intenta nuevamente.',
      });
      setShowFeedback(true);
    }
  };

  const handleSkip = () => {
    if (window.confirm('¿Estás seguro de que deseas omitir este ejercicio?')) {
      navigate(`/module/${moduleId}`);
    }
  };

  const handleComplete = () => {
    setFeedback({
      type: 'success',
      title: '¡Ejercicio Completado!',
      message: `¡Excelente trabajo! Has ganado ${exercise?.points} puntos.`,
      showConfetti: true,
    });
    setShowFeedback(true);
  };

  const handleUseHint = (hint: { id: string; text: string; cost: number }) => {
    if (availableCoins >= hint.cost) {
      setAvailableCoins((prev) => prev - hint.cost);
      setProgress((prev) => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
      setHasUnsavedChanges(true);
    }
  };

  const handleProgressUpdate = (newProgress: Partial<ExerciseProgress>) => {
    setProgress((prev) => ({ ...prev, ...newProgress }));
    setHasUnsavedChanges(true);
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil':
        return 'text-green-600 bg-green-100';
      case 'medio':
        return 'text-yellow-600 bg-yellow-100';
      case 'dificil':
        return 'text-red-600 bg-red-100';
      case 'experto':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'facil':
        return 'Fácil';
      case 'medio':
        return 'Medio';
      case 'dificil':
        return 'Difícil';
      case 'experto':
        return 'Experto';
      default:
        return difficulty;
    }
  };

  // ============================================================================
  // ADAPT EXERCISE DATA (MUST BE BEFORE EARLY RETURNS)
  // ============================================================================

  // Adapt exercise data to mechanic-specific format
  // IMPORTANT: This must be called unconditionally (before any returns) to follow Rules of Hooks
  const adaptedExercise = React.useMemo(() => {
    if (!exercise) return null;
    return adaptExerciseData(exercise);
  }, [exercise]);

  // ============================================================================
  // LOADING STATE
  // ============================================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
        <GamifiedHeader user={user} onLogout={() => navigate('/login')} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <EnhancedCard variant="primary" padding="lg" hover={false}>
            <div className="flex items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-12 h-12 text-detective-orange" />
              </motion.div>
            </div>
            <p className="text-center text-detective-text font-semibold mt-4">Cargando ejercicio...</p>
          </EnhancedCard>
        </div>
      </div>
    );
  }

  if (!exercise || !MechanicComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
        <GamifiedHeader user={user} onLogout={() => navigate('/login')} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-300 text-red-800 rounded-lg p-4 mb-6"
          >
            <p className="font-semibold">No se pudo cargar el ejercicio</p>
            <DetectiveButton
              variant="blue"
              onClick={() => navigate(`/module/${moduleId}`)}
              className="mt-4"
            >
              Volver al módulo
            </DetectiveButton>
          </motion.div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Header */}
      <GamifiedHeader user={user} onLogout={() => navigate('/login')} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation - Compact */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
          <div className="py-2 px-3">
            <nav className="flex items-center gap-1.5 text-xs text-detective-text-secondary">
              <button
                onClick={() => navigate('/dashboard')}
                className="hover:text-detective-orange transition-colors"
              >
                Dashboard
              </button>
              <ChevronRight className="w-3 h-3" />
              <button
                onClick={() => navigate(`/module/${moduleId}`)}
                className="hover:text-detective-orange transition-colors"
              >
                {exercise.moduleTitle || 'Módulo'}
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-detective-text font-semibold">{exercise.title}</span>
            </nav>
          </div>
        </div>

        {/* Exercise Header - Compact */}
        <EnhancedCard variant="default" padding="md" hover={false} className="mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-lg lg:text-xl font-bold text-detective-text">
                  {exercise.title}
                </h1>
                <span
                  className={`px-2 py-0.5 rounded-lg text-xs font-bold ${getDifficultyColor(
                    exercise.difficulty
                  )}`}
                >
                  {getDifficultyLabel(exercise.difficulty)}
                </span>
              </div>
              <p className="text-sm text-detective-text-secondary">{exercise.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-detective-text">
                <Clock className="w-4 h-4 text-detective-orange" />
                <div>
                  <p className="text-xs text-detective-text-secondary">Tiempo</p>
                  <p className="text-sm font-bold">{Math.floor(exercise.estimatedTime / 60)}min</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-detective-text">
                <Star className="w-4 h-4 text-detective-gold" />
                <div>
                  <p className="text-xs text-detective-text-secondary">Puntos</p>
                  <p className="text-sm font-bold">{exercise.points}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-detective-text">
                <Trophy className="w-4 h-4 text-detective-orange" />
                <div>
                  <p className="text-xs text-detective-text-secondary">Tipo</p>
                  <p className="text-xs font-bold">{exercise.type}</p>
                </div>
              </div>
            </div>
          </div>
        </EnhancedCard>

        {/* Main Grid Layout - Compact */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Main Exercise Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Suspense
                  fallback={
                    <EnhancedCard variant="primary" padding="md" hover={false}>
                      <div className="flex items-center justify-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="w-6 h-6 text-detective-orange" />
                        </motion.div>
                      </div>
                      <p className="text-center text-sm text-detective-text-secondary mt-2">Cargando mecánica...</p>
                    </EnhancedCard>
                  }
                >
                  <MechanicComponent
                    exercise={adaptedExercise || exercise}
                    onComplete={handleComplete}
                    onProgressUpdate={handleProgressUpdate}
                  />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar - Compact */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {/* Score Display - Compact */}
              <EnhancedCard variant="success" hover={false} padding="sm">
                <h3 className="text-xs font-bold text-detective-text mb-2">
                  Puntuación
                </h3>
                <ScoreDisplay score={progress.score} maxScore={exercise.points} size="sm" />
              </EnhancedCard>

              {/* Timer - Compact */}
              <EnhancedCard variant="info" hover={false} padding="sm">
                <h3 className="text-xs font-bold text-detective-text mb-2">Tiempo</h3>
                <TimerWidget
                  initialTime={0}
                  countDown={false}
                  showWarning={false}
                />
              </EnhancedCard>

              {/* Progress Tracker - Compact */}
              <EnhancedCard variant="primary" hover={false} padding="sm">
                <h3 className="text-xs font-bold text-detective-text mb-2">Progreso</h3>
                <ProgressTracker
                  current={progress.currentStep}
                  total={progress.totalSteps}
                  variant="circular"
                  className="mx-auto"
                />
                <p className="text-center text-xs text-detective-text-secondary mt-1">
                  {progress.currentStep} de {progress.totalSteps}
                </p>
              </EnhancedCard>

              {/* Hint System - Compact */}
              {hints.length > 0 && (
                <EnhancedCard variant="warning" hover={false} padding="sm">
                  <HintSystem
                    hints={hints}
                    onUseHint={handleUseHint}
                    availableCoins={availableCoins}
                  />
                </EnhancedCard>
              )}

              {/* ML Coins Display - Compact */}
              <EnhancedCard variant="warning" hover={false} padding="sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-detective-gold" />
                    <span className="text-xs font-bold text-detective-text">ML Coins</span>
                  </div>
                  <span className="text-base font-bold text-detective-gold">{availableCoins}</span>
                </div>
              </EnhancedCard>

              {/* Stats - Compact */}
              <EnhancedCard variant="default" hover={false} padding="sm">
                <h3 className="text-xs font-bold text-detective-text mb-2">Estadísticas</h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-detective-text-secondary">Pistas usadas</span>
                    <span className="font-bold text-detective-text">{progress.hintsUsed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-detective-text-secondary">Intentos</span>
                    <span className="font-bold text-detective-text">1</span>
                  </div>
                </div>
              </EnhancedCard>
            </div>
          </div>
        </div>

        {/* Action Footer - Compact */}
        <EnhancedCard variant="default" padding="sm" hover={false} className="sticky bottom-4 z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <DetectiveButton
                variant="blue"
                size="sm"
                icon={<ArrowLeft className="w-3 h-3" />}
                onClick={() => navigate(`/module/${moduleId}`)}
              >
                Volver
              </DetectiveButton>
              {hasUnsavedChanges && (
                <span className="text-xs text-detective-text-secondary italic">
                  Sin guardar
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <DetectiveButton
                variant="secondary"
                size="sm"
                icon={<Save className="w-3 h-3" />}
                onClick={handleSaveProgress}
                disabled={!hasUnsavedChanges}
              >
                Guardar
              </DetectiveButton>
              <DetectiveButton
                variant="secondary"
                size="sm"
                icon={<SkipForward className="w-3 h-3" />}
                onClick={handleSkip}
              >
                Omitir
              </DetectiveButton>
              <DetectiveButton
                variant="primary"
                size="sm"
                icon={<Send className="w-3 h-3" />}
                onClick={handleSubmit}
              >
                Enviar
              </DetectiveButton>
            </div>
          </div>
        </EnhancedCard>

        {/* Bottom Spacing */}
        <div className="h-12" />
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {feedback && showFeedback && (
          <FeedbackModal
            isOpen={showFeedback}
            feedback={feedback}
            onClose={() => {
              setShowFeedback(false);
              if (feedback.type === 'success') {
                navigate(`/module/${moduleId}`);
              }
            }}
            onRetry={() => {
              setShowFeedback(false);
              // Reset logic if needed
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
