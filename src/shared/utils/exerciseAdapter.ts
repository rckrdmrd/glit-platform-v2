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
 * Generates crossword grid from clues
 */
const generateGridFromClues = (clues: any[], rows: number, cols: number): any[][] => {
  // Initialize empty grid
  const grid: any[][] = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = {
        row: r,
        col: c,
        letter: '',
        isBlack: true,
        userInput: '',
      };
    }
  }

  // Fill grid with letters from clues
  clues.forEach((clue) => {
    const { answer, startRow, startCol, direction, number } = clue;

    for (let i = 0; i < answer.length; i++) {
      let row, col;
      if (direction === 'horizontal') {
        row = startRow;
        col = startCol + i;
      } else {
        row = startRow + i;
        col = startCol;
      }

      if (row < rows && col < cols) {
        grid[row][col] = {
          row,
          col,
          letter: answer[i],
          isBlack: false,
          number: i === 0 ? number : undefined,
          userInput: '',
        };
      }
    }
  });

  return grid;
};

/**
 * Adapts ExerciseData to CrucigramaData format
 */
export const adaptToCrucigramaData = (exercise: ExerciseData): any => {
  const base = adaptToBaseExercise(exercise);

  // Get clues and grid size from mechanicData.content
  const content = exercise.mechanicData?.content || {};
  const clues = content.clues || [];
  const gridSize = content.gridSize || { rows: 15, cols: 15 };

  // Generate grid from clues
  const grid = generateGridFromClues(clues, gridSize.rows, gridSize.cols);

  return {
    ...base,
    grid,
    clues,
    rows: gridSize.rows,
    cols: gridSize.cols,
  };
};

/**
 * Adapts ExerciseData to TimelineData format
 */
export const adaptToTimelineData = (exercise: ExerciseData): any => {
  const base = adaptToBaseExercise(exercise);

  // Get data from mechanicData.content
  const content = exercise.mechanicData?.content || {};
  const solution = exercise.mechanicData?.solution || {};

  return {
    ...base,
    events: content.events || [],
    correctOrder: solution.correctOrder || [],
    categories: content.categories || [],
  };
};

/**
 * Adapts ExerciseData to VerdaderoFalsoData format
 */
export const adaptToVerdaderoFalsoData = (exercise: ExerciseData): any => {
  const base = adaptToBaseExercise(exercise);

  // Get data from mechanicData.content
  const content = exercise.mechanicData?.content || {};

  return {
    ...base,
    contextText: content.contextText || '',
    statements: content.statements || [],
  };
};

/**
 * Adapts ExerciseData to EmparejamientoData format
 */
export const adaptToEmparejamientoData = (exercise: ExerciseData): any => {
  const base = adaptToBaseExercise(exercise);

  // Get data from mechanicData.content
  const content = exercise.mechanicData?.content || {};

  // Convert pairs to cards format
  const pairs = content.pairs || [];
  const cards = [];

  pairs.forEach((pair: any) => {
    cards.push({
      id: pair.left.id,
      content: pair.left.content,
      matchId: pair.id,
      type: 'question',
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: pair.right.id,
      content: pair.right.content,
      matchId: pair.id,
      type: 'answer',
      isFlipped: false,
      isMatched: false,
    });
  });

  return {
    ...base,
    scenarioText: content.scenarioText || '',
    cards,
  };
};

/**
 * Adapts ExerciseData to CompletarEspaciosData format
 */
export const adaptToCompletarEspaciosData = (exercise: ExerciseData): any => {
  const base = adaptToBaseExercise(exercise);

  // Get data from mechanicData.content
  const content = exercise.mechanicData?.content || {};

  return {
    ...base,
    scenarioText: content.scenarioText || '',
    text: content.text || '',
    blanks: content.blanks || [],
    wordBank: content.wordBank || [],
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
  } else if (type.includes('verdadero_falso') || type.includes('true_false')) {
    return adaptToVerdaderoFalsoData(exercise);
  } else if (type.includes('emparejamiento') || type.includes('matching')) {
    return adaptToEmparejamientoData(exercise);
  } else if (type.includes('completar_espacios') || type.includes('fill_in_blank')) {
    return adaptToCompletarEspaciosData(exercise);
  } else if (type.includes('sopa_letras')) {
    return adaptToSopaLetrasData(exercise);
  } else if (type.includes('mapa_conceptual') || type.includes('mapa conceptual')) {
    return adaptToMapaConceptualData(exercise);
  }

  // Default: return base exercise data
  return adaptToBaseExercise(exercise);
};
