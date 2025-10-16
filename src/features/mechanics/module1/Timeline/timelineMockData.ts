import { TimelineData } from './timelineTypes';

export const mockTimelineExercises: TimelineData[] = [
  {
    id: 'timeline-001',
    title: 'Línea de Tiempo: Vida de Marie Curie',
    description: 'Ordena cronológicamente los eventos importantes de la vida de Marie Curie',
    difficulty: 'medio',
    estimatedTime: 480,
    topic: 'Marie Curie - Biografía',
    hints: [
      { id: 'hint-t1', text: 'Marie Curie nació en el siglo XIX', cost: 5 },
      { id: 'hint-t2', text: 'Su primer Premio Nobel fue en 1903', cost: 8 },
      { id: 'hint-t3', text: 'Descubrió el Radio antes del Polonio', cost: 10 }
    ],
    events: [
      {
        id: 'event-1',
        year: 1867,
        title: 'Nacimiento',
        description: 'María Sklodowska nace en Varsovia, Polonia',
        category: 'Personal'
      },
      {
        id: 'event-2',
        year: 1891,
        title: 'Estudios en París',
        description: 'Se muda a París para estudiar en la Sorbona',
        category: 'Educación'
      },
      {
        id: 'event-3',
        year: 1895,
        title: 'Matrimonio',
        description: 'Se casa con Pierre Curie',
        category: 'Personal'
      },
      {
        id: 'event-4',
        year: 1898,
        title: 'Descubrimiento del Polonio',
        description: 'Descubre el elemento Polonio, nombrado por su país natal',
        category: 'Científico'
      },
      {
        id: 'event-5',
        year: 1898,
        title: 'Descubrimiento del Radio',
        description: 'Descubre el elemento Radio junto con Pierre',
        category: 'Científico'
      },
      {
        id: 'event-6',
        year: 1903,
        title: 'Primer Premio Nobel',
        description: 'Recibe el Premio Nobel de Física junto con Pierre Curie y Henri Becquerel',
        category: 'Reconocimiento'
      },
      {
        id: 'event-7',
        year: 1911,
        title: 'Segundo Premio Nobel',
        description: 'Recibe el Premio Nobel de Química',
        category: 'Reconocimiento'
      },
      {
        id: 'event-8',
        year: 1914,
        title: 'Instituto del Radio',
        description: 'Funda el Instituto del Radio en París',
        category: 'Científico'
      },
      {
        id: 'event-9',
        year: 1934,
        title: 'Fallecimiento',
        description: 'Muere en Francia debido a la exposición a la radiación',
        category: 'Personal'
      }
    ],
    correctOrder: ['event-1', 'event-2', 'event-3', 'event-4', 'event-5', 'event-6', 'event-7', 'event-8', 'event-9']
  },
  {
    id: 'timeline-002',
    title: 'Descubrimientos Científicos de Marie Curie',
    description: 'Ordena los descubrimientos y avances científicos de Marie Curie',
    difficulty: 'facil',
    estimatedTime: 360,
    topic: 'Marie Curie - Ciencia',
    hints: [
      { id: 'hint-t4', text: 'La tesis doctoral fue sobre radioactividad', cost: 5 },
      { id: 'hint-t5', text: 'El polonio fue descubierto antes que el radio', cost: 7 }
    ],
    events: [
      {
        id: 'event-10',
        year: 1897,
        title: 'Tesis Doctoral',
        description: 'Comienza su tesis doctoral sobre radioactividad',
        category: 'Investigación'
      },
      {
        id: 'event-11',
        year: 1898,
        title: 'Polonio',
        description: 'Primer elemento descubierto: Polonio',
        category: 'Descubrimiento'
      },
      {
        id: 'event-12',
        year: 1902,
        title: 'Aislamiento del Radio',
        description: 'Logra aislar el radio puro',
        category: 'Descubrimiento'
      },
      {
        id: 'event-13',
        year: 1910,
        title: 'Radio Metálico',
        description: 'Produce radio en forma metálica',
        category: 'Investigación'
      }
    ],
    correctOrder: ['event-10', 'event-11', 'event-12', 'event-13']
  },
  {
    id: 'timeline-003',
    title: 'Reconocimientos Internacionales',
    description: 'Ordena los premios y reconocimientos que recibió Marie Curie',
    difficulty: 'dificil',
    estimatedTime: 600,
    topic: 'Marie Curie - Logros',
    hints: [
      { id: 'hint-t6', text: 'Fue la primera mujer en recibir un Premio Nobel', cost: 10 },
      { id: 'hint-t7', text: 'Recibió medallas antes de su segundo Nobel', cost: 12 }
    ],
    events: [
      {
        id: 'event-14',
        year: 1903,
        title: 'Nobel de Física',
        description: 'Primer Premio Nobel compartido',
        category: 'Premio'
      },
      {
        id: 'event-15',
        year: 1911,
        title: 'Nobel de Química',
        description: 'Segundo Premio Nobel, esta vez en solitario',
        category: 'Premio'
      },
      {
        id: 'event-16',
        year: 1921,
        title: 'Gira por Estados Unidos',
        description: 'Recibe homenajes y donaciones en EE.UU.',
        category: 'Reconocimiento'
      },
      {
        id: 'event-17',
        year: 1995,
        title: 'Panteón de París',
        description: 'Sus restos son trasladados al Panteón de París (póstumamente)',
        category: 'Homenaje'
      }
    ],
    correctOrder: ['event-14', 'event-15', 'event-16', 'event-17']
  }
];
