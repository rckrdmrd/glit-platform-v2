import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Coins, X } from 'lucide-react';
import FocusTrap from 'focus-trap-react';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { Hint } from './mechanicsTypes';

export interface HintSystemProps {
  hints: Hint[];
  onUseHint: (hint: Hint) => void;
  availableCoins: number;
  className?: string;
}

export const HintSystem: React.FC<HintSystemProps> = ({
  hints,
  onUseHint,
  availableCoins,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [usedHints, setUsedHints] = useState<Set<string>>(new Set());
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const handleUseHint = (hint: Hint) => {
    if (hint.cost <= availableCoins && !usedHints.has(hint.id)) {
      setUsedHints(prev => new Set([...prev, hint.id]));
      onUseHint(hint);
    }
  };

  const availableHints = hints.filter(h => !usedHints.has(h.id));

  return (
    <div className={className}>
      <DetectiveButton
        variant="gold"
        size="md"
        onClick={() => setIsOpen(true)}
        icon={<Lightbulb className="w-5 h-5" />}
        aria-label={`Abrir pistas disponibles (${availableHints.length})`}
      >
        Pistas ({availableHints.length})
      </DetectiveButton>

      <AnimatePresence>
        {isOpen && (
          <FocusTrap>
            <div>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />

              {/* Modal */}
              <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="hints-title"
                aria-describedby="hints-description"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
              >
                <DetectiveCard variant="gold" padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-yellow-500" aria-hidden="true" />
                      <h3 id="hints-title" className="text-xl font-bold text-detective-text">
                        Pistas Disponibles
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      aria-label="Cerrar pistas"
                      className="text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-detective-orange transition-colors"
                    >
                      <X className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div id="hints-description" className="mb-4 flex items-center gap-2 text-sm">
                    <Coins className="w-4 h-4 text-yellow-600" aria-hidden="true" />
                    <span className="font-semibold">ML Coins disponibles: {availableCoins}</span>
                  </div>

                {availableHints.length === 0 ? (
                  <p className="text-center text-detective-text-secondary py-8">
                    No hay más pistas disponibles
                  </p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {availableHints.map((hint, index) => (
                      <motion.div
                        key={hint.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm text-detective-text flex-1">{hint.text}</p>
                          <DetectiveButton
                            variant="gold"
                            size="sm"
                            onClick={() => handleUseHint(hint)}
                            disabled={hint.cost > availableCoins}
                            icon={<Coins className="w-4 h-4" />}
                            aria-label={`Usar pista por ${hint.cost} ML Coins`}
                          >
                            {hint.cost}
                          </DetectiveButton>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="mt-6">
                  <DetectiveButton
                    variant="primary"
                    size="md"
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                    aria-label="Cerrar modal de pistas"
                  >
                    Cerrar
                  </DetectiveButton>
                </div>
              </DetectiveCard>
            </motion.div>
            </div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </div>
  );
};
