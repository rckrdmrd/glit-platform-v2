import { CrucigramaData } from './crucigramaTypes';

// Helper function to create grid
const createGrid = (rows: number, cols: number): CrucigramaData['grid'] => {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      letter: '',
      isBlack: false,
      userInput: ''
    }))
  );
};

export const mockCrucigramaExercises: CrucigramaData[] = [
  {
    id: 'crucigrama-001',
    title: 'Crucigrama: Descubrimientos de Marie Curie',
    description: 'Resuelve este crucigrama sobre los descubrimientos científicos de Marie Curie',
    difficulty: 'medio',
    estimatedTime: 600, // 10 minutos
    topic: 'Marie Curie - Descubrimientos',
    hints: [
      {
        id: 'hint-001',
        text: 'El elemento descubierto por Marie Curie tiene símbolo Ra',
        cost: 5
      },
      {
        id: 'hint-002',
        text: 'El fenómeno que estudió Marie Curie está relacionado con la emisión de partículas',
        cost: 10
      },
      {
        id: 'hint-003',
        text: 'Marie Curie fue la primera mujer en recibir este galardón',
        cost: 15
      }
    ],
    rows: 10,
    cols: 10,
    grid: (() => {
      const grid = createGrid(10, 10);
      // Horizontal words
      // RADIO (row 1, col 2-6)
      'RADIO'.split('').forEach((letter, i) => {
        grid[1][2 + i].letter = letter;
        if (i === 0) grid[1][2 + i].number = 1;
      });
      // POLONIO (row 3, col 1-7)
      'POLONIO'.split('').forEach((letter, i) => {
        grid[3][1 + i].letter = letter;
        if (i === 0) grid[3][1 + i].number = 3;
      });
      // NOBEL (row 5, col 3-7)
      'NOBEL'.split('').forEach((letter, i) => {
        grid[5][3 + i].letter = letter;
        if (i === 0) grid[5][3 + i].number = 5;
      });
      // FISICA (row 7, col 2-7)
      'FISICA'.split('').forEach((letter, i) => {
        grid[7][2 + i].letter = letter;
        if (i === 0) grid[7][2 + i].number = 7;
      });

      // Vertical words
      // RADIOACTIVIDAD (col 4, rows 0-13) - shortened to fit
      'RADIACION'.split('').forEach((letter, i) => {
        if (i < 10) {
          grid[i][4].letter = letter;
          if (i === 0) grid[i][4].number = 2;
        }
      });
      // LABORATORIO (col 6, rows 1-11) - shortened
      'LABORAT'.split('').forEach((letter, i) => {
        grid[1 + i][6].letter = letter;
        if (i === 0) grid[1 + i][6].number = 4;
      });

      return grid;
    })(),
    clues: [
      {
        id: 'clue-1',
        number: 1,
        direction: 'horizontal',
        clue: 'Elemento químico descubierto por Marie Curie, símbolo Ra',
        answer: 'RADIO',
        startRow: 1,
        startCol: 2
      },
      {
        id: 'clue-2',
        number: 2,
        direction: 'vertical',
        clue: 'Fenómeno de emisión de partículas estudiado por Marie Curie',
        answer: 'RADIACION',
        startRow: 0,
        startCol: 4
      },
      {
        id: 'clue-3',
        number: 3,
        direction: 'horizontal',
        clue: 'Otro elemento descubierto por Marie Curie, nombrado por su país natal',
        answer: 'POLONIO',
        startRow: 3,
        startCol: 1
      },
      {
        id: 'clue-4',
        number: 4,
        direction: 'vertical',
        clue: 'Lugar donde Marie Curie realizaba sus experimentos',
        answer: 'LABORAT',
        startRow: 1,
        startCol: 6
      },
      {
        id: 'clue-5',
        number: 5,
        direction: 'horizontal',
        clue: 'Premio que Marie Curie ganó dos veces',
        answer: 'NOBEL',
        startRow: 5,
        startCol: 3
      },
      {
        id: 'clue-6',
        number: 6,
        direction: 'vertical',
        clue: 'Universidad donde estudió Marie Curie',
        answer: 'SORBONA',
        startRow: 2,
        startCol: 8
      },
      {
        id: 'clue-7',
        number: 7,
        direction: 'horizontal',
        clue: 'Ciencia que estudió Marie Curie',
        answer: 'FISICA',
        startRow: 7,
        startCol: 2
      }
    ]
  },
  {
    id: 'crucigrama-002',
    title: 'Crucigrama: Vida de Marie Curie',
    description: 'Completa este crucigrama sobre la biografía de Marie Curie',
    difficulty: 'facil',
    estimatedTime: 480,
    topic: 'Marie Curie - Biografía',
    hints: [
      {
        id: 'hint-004',
        text: 'Marie Curie nació en este país europeo',
        cost: 5
      },
      {
        id: 'hint-005',
        text: 'El nombre de su esposo científico',
        cost: 8
      }
    ],
    rows: 8,
    cols: 8,
    grid: (() => {
      const grid = createGrid(8, 8);
      // POLONIA (row 1, col 1-7)
      'POLONIA'.split('').forEach((letter, i) => {
        grid[1][1 + i].letter = letter;
        if (i === 0) grid[1][1 + i].number = 1;
      });
      // PIERRE (row 3, col 2-7)
      'PIERRE'.split('').forEach((letter, i) => {
        grid[3][2 + i].letter = letter;
        if (i === 0) grid[3][2 + i].number = 3;
      });
      // PARIS (row 5, col 3-7)
      'PARIS'.split('').forEach((letter, i) => {
        grid[5][3 + i].letter = letter;
        if (i === 0) grid[5][3 + i].number = 5;
      });
      return grid;
    })(),
    clues: [
      {
        id: 'clue-8',
        number: 1,
        direction: 'horizontal',
        clue: 'País donde nació Marie Curie',
        answer: 'POLONIA',
        startRow: 1,
        startCol: 1
      },
      {
        id: 'clue-9',
        number: 2,
        direction: 'vertical',
        clue: 'Nombre real de Marie Curie',
        answer: 'MARIA',
        startRow: 0,
        startCol: 3
      },
      {
        id: 'clue-10',
        number: 3,
        direction: 'horizontal',
        clue: 'Nombre de su esposo y colaborador',
        answer: 'PIERRE',
        startRow: 3,
        startCol: 2
      },
      {
        id: 'clue-11',
        number: 5,
        direction: 'horizontal',
        clue: 'Ciudad donde vivió y trabajó Marie Curie',
        answer: 'PARIS',
        startRow: 5,
        startCol: 3
      }
    ]
  },
  {
    id: 'crucigrama-003',
    title: 'Crucigrama Avanzado: Legado Científico',
    description: 'Crucigrama desafiante sobre el impacto científico de Marie Curie',
    difficulty: 'dificil',
    estimatedTime: 900,
    topic: 'Marie Curie - Legado',
    hints: [
      {
        id: 'hint-006',
        text: 'Marie Curie fue pionera en el tratamiento del cáncer con este método',
        cost: 12
      },
      {
        id: 'hint-007',
        text: 'La unidad de radioactividad lleva su nombre',
        cost: 15
      }
    ],
    rows: 12,
    cols: 12,
    grid: createGrid(12, 12),
    clues: [
      {
        id: 'clue-12',
        number: 1,
        direction: 'horizontal',
        clue: 'Tratamiento contra el cáncer desarrollado a partir de sus descubrimientos',
        answer: 'RADIOTERAPIA',
        startRow: 2,
        startCol: 0
      },
      {
        id: 'clue-13',
        number: 2,
        direction: 'vertical',
        clue: 'Unidad de medida de radioactividad nombrada en su honor',
        answer: 'CURIO',
        startRow: 0,
        startCol: 5
      },
      {
        id: 'clue-14',
        number: 3,
        direction: 'horizontal',
        clue: 'Instituto fundado por Marie Curie',
        answer: 'RADIUM',
        startRow: 6,
        startCol: 3
      }
    ]
  }
];
