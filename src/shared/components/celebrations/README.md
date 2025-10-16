# Celebrations Components

Sistema de celebraciones mejorado para GLIT Platform V2, enfocado en achievements y gamificación con detective theme.

## ConfettiCelebration

Componente de confetti mejorado con physics realista y efectos sparkle para rarezas altas.

### Características

#### Configuración Base
- **50 partículas** en todas las rarezas (optimizado para rendimiento)
- **Colores detective**: `['#f97316', '#ea580c', '#f59e0b', '#d97706', '#92400e']`
- **Physics mejorado**:
  - Gravedad variable (0.6-1.0)
  - Drag/resistencia del aire (0.96-0.98)
  - Bounce realista en bordes (0.2-0.6)
  - Fricción en suelo (0.85x)
  - Rotación aleatoria continua

#### Por Rareza

##### Common
- Duración: 2.5s
- Formas: círculos, cuadrados
- Spread: 70°
- Sin sparkles
- Wave única

##### Rare
- Duración: 3s
- Formas: círculos, cuadrados, triángulos, estrellas
- Spread: 90°
- **15 sparkles** con efecto de pulso
- Wave única

##### Epic
- Duración: 3.5s
- Formas: círculos, cuadrados, triángulos, estrellas, badges
- Spread: 110°
- **25 sparkles** con efecto de pulso
- **Multi-wave**: explosión secundaria a los 800ms
- Partículas laterales adicionales

##### Legendary
- Duración: 4s
- Formas: todas + detective hat emoji
- Spread: 130°
- **40 sparkles** con efecto de pulso
- **Multi-wave**: explosión secundaria a los 600ms
- **Glow effect**: sombras de color en partículas
- Partículas laterales adicionales

### Uso

```tsx
import { ConfettiCelebration } from '@/shared/components/celebrations';

function MyComponent() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div className="relative">
      <ConfettiCelebration
        show={showConfetti}
        rarity="legendary"
        onComplete={() => {
          console.log('Confetti animation completed');
          setShowConfetti(false);
        }}
      />

      <button onClick={() => setShowConfetti(true)}>
        Celebrate!
      </button>
    </div>
  );
}
```

### Props

```typescript
interface ConfettiCelebrationProps {
  show: boolean;                    // Controla visibilidad
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  onComplete?: () => void;           // Callback al terminar
}
```

### Detalles Técnicos

#### Physics Engine
- **Delta time**: 60fps base con compensación
- **Gravity**: Simulación realista de caída
- **Drag**: Resistencia del aire que reduce velocidad
- **Bounce**: Rebote en bordes con pérdida de energía
- **Friction**: Fricción de suelo que detiene movimiento horizontal

#### Sparkles (Rarezas Altas)
- Elementos decorativos de 4 puntas
- Pulso sinusoidal continuo
- Posición aleatoria alrededor del centro
- Fade out gradual basado en vida
- Glow central dorado

#### Optimizaciones
- Canvas para rendering eficiente
- AnimationFrame con delta time
- Cleanup automático de partículas muertas
- Resize handler para responsividad
- Unmount cleanup para prevenir memory leaks

#### Formas Especiales

**Badge Detective**:
- Círculo con estrella interna blanca
- Representa logros importantes

**Detective Hat**:
- Emoji 🕵 renderizado en tamaño grande
- Exclusivo de legendary

**Star Detective**:
- Estrella de 5 puntas con borde
- Relleno sólido + stroke

### Integración con Achievement System

```tsx
// En AchievementUnlockModal
import { ConfettiCelebration } from '@/shared/components/celebrations';

const getConfettiRarity = () => {
  const rarity = achievement.rarity?.toLowerCase();
  if (rarity === 'legendary') return 'legendary';
  if (rarity === 'epic') return 'epic';
  if (rarity === 'rare') return 'rare';
  return 'common';
};

<ConfettiCelebration
  show={showConfetti}
  rarity={getConfettiRarity()}
  onComplete={() => handleConfettiComplete()}
/>
```

### Performance

- **60 FPS** target con delta time compensation
- **50 partículas máximo** por wave (optimizado)
- **Canvas rendering** más eficiente que DOM
- **Cleanup automático** de partículas fuera de pantalla
- **Memory safe** con cleanup en unmount

### Futuras Mejoras

1. **Sound integration** - Audio effects por rareza
2. **Custom shapes** - Formas personalizadas por achievement
3. **Color themes** - Paletas de colores customizables
4. **Preset animations** - Patrones pre-definidos de explosión
5. **Performance modes** - Low/High quality options

---

**Basado en**: `/home/isem/documents/workspace/projects/glit/glit-platform/packages/gamification/components/ConfettiSystem.tsx`

**Mejorado con**:
- Physics engine más realista
- Sparkle effects para rarezas altas
- Delta time proper para smooth animation
- Multi-wave system para epic/legendary
- Glow effects opcionales
