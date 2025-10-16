/**
 * PowerUpInventory Component
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { usePowerUps } from '../../hooks/usePowerUps';
import { PowerUpCard } from './PowerUpCard';
import { PowerUpUsageModal } from './PowerUpUsageModal';
import type { PowerUp } from '../../types/powerUpsTypes';

export const PowerUpInventory: React.FC = () => {
  const { getOwnedPowerUps, usePowerUp } = usePowerUps();
  const [selectedPowerUp, setSelectedPowerUp] = useState<PowerUp | null>(null);
  const [showModal, setShowModal] = useState(false);

  const ownedPowerUps = getOwnedPowerUps();

  const handleUse = (powerUpId: string) => {
    const powerUp = ownedPowerUps.find((p) => p.id === powerUpId);
    if (powerUp) {
      setSelectedPowerUp(powerUp);
      setShowModal(true);
    }
  };

  const confirmUse = () => {
    if (selectedPowerUp && usePowerUp(selectedPowerUp.id)) {
      setShowModal(false);
      setSelectedPowerUp(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-detective-2xl font-bold text-detective-text">Mi Inventario</h2>
        <div className="flex items-center gap-2 bg-detective-bg px-4 py-2 rounded-detective">
          <Icons.Package className="w-5 h-5 text-detective-orange" />
          <span className="font-semibold text-detective-text">
            {ownedPowerUps.length} Power-ups
          </span>
        </div>
      </div>

      {ownedPowerUps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ownedPowerUps.map((powerUp) => (
            <PowerUpCard
              key={powerUp.id}
              powerUp={powerUp}
              onUse={() => handleUse(powerUp.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-detective shadow-card">
          <Icons.Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-detective-lg text-detective-text-secondary mb-2">
            No tienes power-ups en tu inventario
          </p>
          <p className="text-detective-base text-detective-text-secondary">
            Visita la tienda para comprar power-ups
          </p>
        </div>
      )}

      {showModal && selectedPowerUp && (
        <PowerUpUsageModal
          powerUp={selectedPowerUp}
          action="use"
          onConfirm={confirmUse}
          onCancel={() => {
            setShowModal(false);
            setSelectedPowerUp(null);
          }}
        />
      )}
    </div>
  );
};
