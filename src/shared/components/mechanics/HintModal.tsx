import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X } from 'lucide-react';
import FocusTrap from 'focus-trap-react';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { Hint } from './mechanicsTypes';

export interface HintModalProps {
  hint: Hint | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({ hint, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !hint) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="hint-title"
              aria-describedby="hint-text"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-lg p-6 max-w-md shadow-2xl mx-4"
            >
              <button
                onClick={onClose}
                aria-label="Cerrar pista"
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-detective-orange transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <Lightbulb className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                </div>
                <h3 id="hint-title" className="text-xl font-bold mb-2 text-detective-text">
                  Pista
                </h3>
                <p id="hint-text" className="text-lg text-gray-700 mb-6">
                  {hint.text}
                </p>
                {hint.cost !== undefined && hint.cost > 0 && (
                  <p className="text-sm text-gray-500 mb-4">
                    Costo: {hint.cost} ML Coins
                  </p>
                )}
                <DetectiveButton
                  onClick={onClose}
                  variant="gold"
                  size="md"
                  aria-label="Cerrar modal de pista"
                  className="w-full"
                >
                  Entendido
                </DetectiveButton>
              </div>
            </motion.div>
          </div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
};
