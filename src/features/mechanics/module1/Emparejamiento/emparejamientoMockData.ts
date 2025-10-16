import { EmparejamientoData } from './emparejamientoTypes';

export const mockEmparejamientoExercises: EmparejamientoData[] = [{
  id: 'emp-001',
  title: 'Emparejamiento: Fechas y Eventos de Marie Curie',
  description: 'Empareja cada fecha con el evento correspondiente',
  difficulty: 'facil',
  estimatedTime: 300,
  topic: 'Marie Curie - Cronología',
  hints: [{ id: 'h1', text: 'Su primer Nobel fue en 1903', cost: 5 }],
  cards: [
    { id: 'q1', content: '1867', matchId: 'm1', type: 'question', isFlipped: false, isMatched: false },
    { id: 'a1', content: 'Nacimiento', matchId: 'm1', type: 'answer', isFlipped: false, isMatched: false },
    { id: 'q2', content: '1903', matchId: 'm2', type: 'question', isFlipped: false, isMatched: false },
    { id: 'a2', content: 'Primer Premio Nobel', matchId: 'm2', type: 'answer', isFlipped: false, isMatched: false },
    { id: 'q3', content: '1911', matchId: 'm3', type: 'question', isFlipped: false, isMatched: false },
    { id: 'a3', content: 'Segundo Premio Nobel', matchId: 'm3', type: 'answer', isFlipped: false, isMatched: false }
  ]
}];
