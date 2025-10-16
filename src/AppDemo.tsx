import React from 'react';
import { Crown, Trophy, Coins, Target } from 'lucide-react';
import {
  DetectiveButton,
  DetectiveCard,
  RankBadge,
  ProgressBar,
  InputDetective,
} from './shared/components/base';
import {
  DetectiveContainer,
  DetectiveGrid,
} from './shared/components/layout';

export function AppDemo() {
  return (
    <div className="min-h-screen bg-detective-gradient">
      <DetectiveContainer>
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-detective-title mb-4">
            GLIT Platform - Detective Theme Design System
          </h1>
          <p className="text-detective-body text-detective-text-secondary">
            Sistema de diseño completo con temática detectivesca y rangos Maya
          </p>
        </div>

        {/* Sección de Botones */}
        <section className="mb-12 animate-slide-up">
          <h2 className="text-detective-subtitle mb-6">Botones Detective</h2>
          <div className="flex flex-wrap gap-4">
            <DetectiveButton variant="primary" icon={<Target className="w-4 h-4" />}>
              Comenzar Misión
            </DetectiveButton>
            <DetectiveButton variant="gold" icon={<Coins className="w-4 h-4" />}>
              ML Coins
            </DetectiveButton>
            <DetectiveButton variant="blue" icon={<Trophy className="w-4 h-4" />}>
              Leaderboard
            </DetectiveButton>
            <DetectiveButton variant="green" size="sm">
              Pequeño
            </DetectiveButton>
            <DetectiveButton variant="purple" size="lg">
              Grande
            </DetectiveButton>
            <DetectiveButton variant="primary" loading>
              Cargando...
            </DetectiveButton>
            <DetectiveButton variant="primary" disabled>
              Deshabilitado
            </DetectiveButton>
          </div>
        </section>

        {/* Sección de Cards */}
        <section className="mb-12">
          <h2 className="text-detective-subtitle mb-6">Cards Detective</h2>
          <DetectiveGrid cols={3}>
            <DetectiveCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-detective-subtitle">Módulo 1</h3>
                <RankBadge rank="nacom" size="sm" />
              </div>
              <p className="text-detective-body mb-4">
                Los Primeros Pasos de Marie Curie
              </p>
              <ProgressBar progress={65} showLabel label="Progreso" />
            </DetectiveCard>

            <DetectiveCard variant="gold">
              <div className="text-center">
                <Coins className="w-12 h-12 mx-auto mb-3 text-detective-gold" />
                <h3 className="text-detective-subtitle mb-2">ML Coins</h3>
                <p className="text-detective-3xl font-bold text-detective-gold mb-2">
                  350
                </p>
                <p className="text-detective-small">
                  +50 esta semana
                </p>
              </div>
            </DetectiveCard>

            <DetectiveCard hoverable onClick={() => alert('Card clicked!')}>
              <Trophy className="w-10 h-10 mb-3 text-detective-orange" />
              <h3 className="text-detective-subtitle mb-2">Achievements</h3>
              <p className="text-detective-body mb-3">
                Has desbloqueado 12 de 20 logros
              </p>
              <div className="flex gap-2">
                <span className="achievement-common">Común</span>
                <span className="achievement-rare">Raro</span>
                <span className="achievement-epic">Épico</span>
              </div>
            </DetectiveCard>
          </DetectiveGrid>
        </section>

        {/* Sección de Rangos Maya */}
        <section className="mb-12">
          <h2 className="text-detective-subtitle mb-6">Rangos Maya</h2>
          <div className="flex flex-wrap gap-3">
            <RankBadge rank="nacom" />
            <RankBadge rank="batab" />
            <RankBadge rank="holcatte" />
            <RankBadge rank="guerrero" />
            <RankBadge rank="mercenario" />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <RankBadge rank="nacom" size="sm" showIcon={false} />
            <RankBadge rank="batab" size="sm" />
            <RankBadge rank="holcatte" size="lg" />
          </div>
        </section>

        {/* Sección de Progress Bars */}
        <section className="mb-12">
          <h2 className="text-detective-subtitle mb-6">Barras de Progreso</h2>
          <div className="space-y-6 max-w-2xl">
            <ProgressBar
              progress={75}
              variant="detective"
              showLabel
              label="Progreso del Módulo"
            />
            <ProgressBar
              progress={45}
              variant="xp"
              showLabel
              label="XP al siguiente nivel"
            />
            <ProgressBar progress={90} variant="detective" height="lg" />
          </div>
        </section>

        {/* Sección de Inputs */}
        <section className="mb-12">
          <h2 className="text-detective-subtitle mb-6">Inputs Detective</h2>
          <div className="max-w-md space-y-4">
            <InputDetective
              label="Email"
              type="email"
              placeholder="detective@glit.com"
            />
            <InputDetective
              label="Nombre de Usuario"
              placeholder="Tu nombre de detective"
              helperText="Este será tu nombre en el leaderboard"
            />
            <InputDetective
              label="Contraseña"
              type="password"
              error="La contraseña debe tener al menos 8 caracteres"
            />
          </div>
        </section>

        {/* Footer de demostración */}
        <footer className="mt-16 pt-8 border-t border-amber-200 text-center">
          <p className="text-detective-small mb-2">
            GLIT Platform - Detective Theme Design System v2.0
          </p>
          <p className="text-detective-small">
            Sistema completo implementado con React + TypeScript + Tailwind CSS
          </p>
        </footer>
      </DetectiveContainer>
    </div>
  );
}
