// ============================================
// EXERCISE DATA ADAPTER
// Converts ExerciseData from ExercisePage to specific mechanic formats
// ============================================

import { BaseExercise, DifficultyLevel, Hint } from '@shared/components/mechanics/mechanicsTypes';

/**
 * Generic ExerciseData type from ExercisePage
 */
export interface ExerciseData {
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

/**
 * Maps difficulty levels - already in correct format, but validates
 */
const mapDifficulty = (difficulty: 'facil' | 'medio' | 'dificil' | 'experto'): DifficultyLevel => {
  const validDifficulties: DifficultyLevel[] = ['facil', 'medio', 'dificil', 'experto'];
  return validDifficulties.includes(difficulty as DifficultyLevel) ? (difficulty as DifficultyLevel) : 'medio';
};

/**
 * Generates default hints if none are provided
 */
const generateDefaultHints = (type: string): Hint[] => {
  return [
    { id: '1', text: 'Lee cuidadosamente las instrucciones', cost: 10 },
    { id: '2', text: 'Presta atención a los detalles', cost: 20 },
    { id: '3', text: 'Revisa tu respuesta antes de enviar', cost: 30 },
  ];
};

/**
 * Converts ExerciseData to BaseExercise format
 * This creates the base structure that all mechanics extend from
 */
export const adaptToBaseExercise = (exercise: ExerciseData): BaseExercise => {
  return {
    id: exercise.id,
    title: exercise.title,
    description: exercise.description,
    difficulty: mapDifficulty(exercise.difficulty),
    estimatedTime: exercise.estimatedTime,
    topic: exercise.moduleTitle || exercise.type,
    hints: exercise.mechanicData?.hints || generateDefaultHints(exercise.type),
  };
};

/**
 * Adapts ExerciseData to CrucigramaData format
 */
export const adaptToCrucigramaData = (exercise: ExerciseData): any => {
  const base = adaptToBaseExercise(exercise);

  // Mock data for crucigrama - In production, this would come from mechanicData
  const mockGrid = [
    [
      { row: 0, col: 0, letter: 'M', isBlack: false, number: 1, userInput: '' },
      { row: 0, col: 1, letter: 'A', isBlack: false, userInput: '' },
      { row: 0, col: 2, letter: 'R', isBlack: false, userInput: '' },
      { row: 0, col: 3, letter: 'I', isBlack: false, userInput: '' },
      { row: 0, col: 4, letter: 'E', isBlack: false, userInput: '' },
    ],
  ];

  const mockClues = [
    {
      id: 'h1',
      number: 1,
      direction: 'horizontal' as const,
      clue: 'Nombre de la científica',
      answer: 'MARIE',
      startRow: 0,
      startCol: 0,
    },
  ];

  return {
    ...base,
    grid: exercise.mechanicData?.grid || mockGrid,
    clues: exercise.mechanicData?.clues || mockClues,
    rows: exercise.mechanicData?.rows || mockGrid.length,
    cols: exercise.mechanicData?.cols || (mockGrid[0]?.length || 5),
  };
};

/**
 * Adapts ExerciseData to TimelineData format
 */
export const adaptToTimelineData = (exercise: ExerciseData): any => {
  const base = adaptToBaseExercise(exercise);

  // Mock data for timeline - In production, this would come from mechanicData
  const mockEvents = [
    { id: '1', year: 1867, title: 'Nacimiento', description: 'Marie Curie nació en Varsovia', date: '1867-11-07' },
    { id: '2', year: 1891, title: 'Llegada a París', description: 'Comenzó sus estudios en la Sorbona', date: '1891-09-01' },
  ];

  return {
    ...base,
    events: exercise.mechanicData?.events || mockEvents,
    correctOrder: exercise.mechanicData?.correctOrder || ['1', '2'],
  };
};

/**
 * Adapts ExerciseData to SopaLetrasData format
 */
export const adaptToSopaLetrasData = (exercise: ExerciseData): any => {
  const base = adaptToBaseExercise(exercise);

  // Mock data for sopa de letras - In production, this would come from mechanicData
  const mockGrid = [
    ['M', 'A', 'R', 'I', 'E'],
    ['C', 'U', 'R', 'I', 'E'],
  ];

  const mockWords = [
    { word: 'MARIE', found: false, startRow: 0, startCol: 0, direction: 'horizontal' as const },
    { word: 'CURIE', found: false, startRow: 1, startCol: 0, direction: 'horizontal' as const },
  ];

  return {
    ...base,
    grid: exercise.mechanicData?.grid || mockGrid,
    words: exercise.mechanicData?.words || mockWords,
    rows: exercise.mechanicData?.rows || mockGrid.length,
    cols: exercise.mechanicData?.cols || (mockGrid[0]?.length || 5),
  };
};

/**
 * Adapts ExerciseData to MapaConceptualData format
 */
export const adaptToMapaConceptualData = (exercise: ExerciseData): any => {
  const base = adaptToBaseExercise(exercise);

  // Mock data for mapa conceptual - In production, this would come from mechanicData
  const mockNodes = [
    { id: '1', label: 'Marie Curie', x: 300, y: 100, type: 'central' as const },
    { id: '2', label: 'Polonia', x: 100, y: 200, type: 'secondary' as const },
    { id: '3', label: 'París', x: 500, y: 200, type: 'secondary' as const },
  ];

  const mockConnections = ['1-2', '1-3'];

  return {
    ...base,
    nodes: exercise.mechanicData?.nodes || mockNodes,
    correctConnections: exercise.mechanicData?.correctConnections || mockConnections,
  };
};

/**
 * Generic adapter that routes to the correct specific adapter based on exercise type
 */
export const adaptExerciseData = (exercise: ExerciseData): any => {
  // Validate exercise and type
  if (!exercise) {
    console.error('adaptExerciseData: exercise is null or undefined');
    return null;
  }

  if (!exercise.type || typeof exercise.type !== 'string') {
    console.error('adaptExerciseData: exercise.type is invalid:', exercise.type);
    // Return base exercise with default values
    return adaptToBaseExercise(exercise);
  }

  const type = exercise.type.toLowerCase();

  if (type.includes('crucigrama')) {
    return adaptToCrucigramaData(exercise);
  } else if (type.includes('timeline') || type.includes('linea_tiempo')) {
    return adaptToTimelineData(exercise);
  } else if (type.includes('sopa_letras')) {
    return adaptToSopaLetrasData(exercise);
  } else if (type.includes('mapa_conceptual') || type.includes('mapa conceptual')) {
    return adaptToMapaConceptualData(exercise);
  }

  // Default: return base exercise data
  return adaptToBaseExercise(exercise);
};
