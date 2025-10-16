import React from 'react';

export const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-detective-bg to-detective-bg-secondary flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-detective-orange mx-auto mb-4"></div>
      <p className="text-detective-orange text-lg font-semibold">Cargando contenido...</p>
      <p className="text-detective-text-secondary text-sm mt-2">Por favor espera un momento</p>
    </div>
  </div>
);
