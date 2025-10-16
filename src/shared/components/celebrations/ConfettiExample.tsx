/**
 * ConfettiExample.tsx
 * Ejemplo de uso y testing del sistema de confetti mejorado
 */

import React, { useState } from 'react';
import { ConfettiCelebration } from './ConfettiCelebration';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Crown, Award } from 'lucide-react';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface RarityOption {
  value: Rarity;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}

const rarityOptions: RarityOption[] = [
  {
    value: 'common',
    label: 'Common',
    icon: <Award className="w-6 h-6" />,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100 hover:bg-gray-200',
    description: '50 partículas, 2.5s, círculos y cuadrados',
  },
  {
    value: 'rare',
    label: 'Rare',
    icon: <Trophy className="w-6 h-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 hover:bg-blue-200',
    description: '50 partículas + 15 sparkles, 3s, +triángulos y estrellas',
  },
  {
    value: 'epic',
    label: 'Epic',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 hover:bg-purple-200',
    description: '50 partículas + 25 sparkles, 3.5s, multi-wave, +badges',
  },
  {
    value: 'legendary',
    label: 'Legendary',
    icon: <Crown className="w-6 h-6" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100 hover:bg-amber-200',
    description: '50 partículas + 40 sparkles, 4s, multi-wave, glow effect',
  },
];

export function ConfettiExample() {
  const [selectedRarity, setSelectedRarity] = useState<Rarity>('common');
  const [showConfetti, setShowConfetti] = useState(false);
  const [completionCount, setCompletionCount] = useState(0);

  const handleTrigger = (rarity: Rarity) => {
    setSelectedRarity(rarity);
    setShowConfetti(false);
    setTimeout(() => setShowConfetti(true), 50);
  };

  const handleComplete = () => {
    setCompletionCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🕵️ Confetti Celebration System
          </h1>
          <p className="text-lg text-gray-600">
            Sistema mejorado de confetti con physics realista y sparkle effects
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-white rounded-lg shadow-md">
            <p className="text-sm text-gray-700">
              Completions: <span className="font-bold text-orange-600">{completionCount}</span>
            </p>
          </div>
        </motion.div>

        {/* Confetti Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden mb-8"
          style={{ height: '400px' }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-50" />

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <motion.div
                animate={{
                  scale: showConfetti ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {showConfetti ? '¡Celebración!' : 'Selecciona una rareza'}
              </h2>
              <p className="text-gray-600">
                {showConfetti
                  ? `Confetti ${selectedRarity} activado`
                  : 'Haz clic en un botón abajo'}
              </p>
            </div>
          </div>

          {/* Confetti System */}
          <ConfettiCelebration
            show={showConfetti}
            rarity={selectedRarity}
            onComplete={handleComplete}
          />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {rarityOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => handleTrigger(option.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${option.bgColor} ${option.color} p-6 rounded-xl shadow-lg transition-all duration-200 text-left`}
            >
              <div className="flex items-center gap-3 mb-3">
                {option.icon}
                <span className="font-bold text-lg">{option.label}</span>
              </div>
              <p className="text-sm opacity-80">{option.description}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Features Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Características del Sistema
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🎨 Visual</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 50 partículas optimizadas</li>
                <li>• Colores detective theme</li>
                <li>• Sparkles para rarezas altas</li>
                <li>• Glow effect legendary</li>
                <li>• Formas variadas (círculo, cuadrado, estrella, badge)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">⚙️ Physics</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Gravedad realista variable</li>
                <li>• Drag/resistencia del aire</li>
                <li>• Bounce en bordes</li>
                <li>• Fricción en suelo</li>
                <li>• Rotación continua</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🚀 Performance</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Canvas rendering (60 FPS)</li>
                <li>• Delta time compensation</li>
                <li>• Cleanup automático</li>
                <li>• Memory safe</li>
                <li>• Responsive resize</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">✨ Effects</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Multi-wave epic/legendary</li>
                <li>• Sparkle pulso sinusoidal</li>
                <li>• Fade out gradual</li>
                <li>• Explosion patterns</li>
                <li>• Velocity variation</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">💡 Tip:</span> Prueba varias veces
              cada rareza para ver la variación en las animaciones. El sistema
              usa randomización para crear efectos únicos cada vez.
            </p>
          </div>
        </motion.div>

        {/* Technical Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gray-900 text-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold mb-4">Información Técnica</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-orange-400 mb-2">
                Configuración por Rareza
              </h4>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
{`common:    50p, 2.5s, no sparkles
rare:      50p, 3.0s, 15 sparkles
epic:      50p, 3.5s, 25 sparkles, multi
legendary: 50p, 4.0s, 40 sparkles, multi, glow`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-orange-400 mb-2">Physics Values</h4>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
{`Gravity: 0.6-1.0
Drag: 0.96-0.98
Bounce: 0.2-0.6
Friction: 0.85x
Rotation: -12 to +12 deg/frame`}
              </pre>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-orange-400 mb-2">Uso del Componente</h4>
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-xs">
{`import { ConfettiCelebration } from '@/shared/components/celebrations';

<ConfettiCelebration
  show={showConfetti}
  rarity="legendary"
  onComplete={() => console.log('Done!')}
/>`}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ConfettiExample;
