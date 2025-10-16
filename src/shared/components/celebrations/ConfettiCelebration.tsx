/**
 * ConfettiCelebration.tsx - GLIT Platform V2
 * Sistema mejorado de confetti para celebraciones de achievements
 * Basado en detective theme con physics mejorado y efectos sparkle
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'badge' | 'detective';
  life: number;
  maxLife: number;
  gravity: number;
  drag: number;
  bounce: number;
  opacity: number;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  pulseSpeed: number;
}

interface ConfettiCelebrationProps {
  show: boolean;
  rarity: Rarity;
  onComplete?: () => void;
}

// Configuración detective por rareza (50 partículas base)
const CONFETTI_CONFIG = {
  common: {
    particleCount: 50,
    colors: ['#f97316', '#ea580c', '#f59e0b', '#d97706', '#92400e'],
    duration: 2500,
    shapes: ['circle', 'square'] as const,
    intensity: 0.7,
    spread: 70,
    sparkles: false,
    sparkleCount: 0,
    multiWave: false,
    waveDelay: 0,
    glowEffect: false,
  },
  rare: {
    particleCount: 50,
    colors: ['#f97316', '#ea580c', '#f59e0b', '#d97706', '#92400e'],
    duration: 3000,
    shapes: ['circle', 'square', 'triangle', 'star'] as const,
    intensity: 0.85,
    spread: 90,
    sparkles: true,
    sparkleCount: 15,
    multiWave: false,
    waveDelay: 0,
    glowEffect: false,
  },
  epic: {
    particleCount: 50,
    colors: ['#f97316', '#ea580c', '#f59e0b', '#d97706', '#92400e'],
    duration: 3500,
    shapes: ['circle', 'square', 'triangle', 'star', 'badge'] as const,
    intensity: 1.0,
    spread: 110,
    sparkles: true,
    sparkleCount: 25,
    multiWave: true,
    waveDelay: 800,
    glowEffect: false,
  },
  legendary: {
    particleCount: 50,
    colors: ['#f97316', '#ea580c', '#f59e0b', '#d97706', '#92400e'],
    duration: 4000,
    shapes: ['circle', 'square', 'triangle', 'star', 'badge', 'detective'] as const,
    intensity: 1.2,
    spread: 130,
    sparkles: true,
    sparkleCount: 40,
    multiWave: true,
    waveDelay: 600,
    glowEffect: true,
  },
};

export function ConfettiCelebration({
  show,
  rarity,
  onComplete,
}: ConfettiCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const sparklesRef = useRef<SparkleParticle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const config = CONFETTI_CONFIG[rarity];

  // Crear partícula detective con physics mejorado
  const createParticle = useCallback(
    (startX: number, startY: number, waveMultiplier = 1): ConfettiParticle => {
      const angle = (Math.random() - 0.5) * (config.spread * Math.PI / 180);
      const velocity = (8 + Math.random() * 12) * config.intensity * waveMultiplier;
      const size = 4 + Math.random() * 7;
      const shape = config.shapes[Math.floor(Math.random() * config.shapes.length)];
      const color = config.colors[Math.floor(Math.random() * config.colors.length)];

      return {
        id: Math.random(),
        x: startX,
        y: startY,
        vx: Math.sin(angle) * velocity,
        vy: -Math.abs(Math.cos(angle)) * velocity - Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        size,
        color,
        shape,
        life: config.duration,
        maxLife: config.duration,
        gravity: 0.6 + Math.random() * 0.4,
        drag: 0.98 - Math.random() * 0.02,
        bounce: 0.2 + Math.random() * 0.4,
        opacity: 1,
      };
    },
    [config]
  );

  // Crear sparkle para rarezas altas
  const createSparkle = useCallback((x: number, y: number): SparkleParticle => {
    const life = 1500 + Math.random() * 1000;
    return {
      id: Math.random(),
      x: x + (Math.random() - 0.5) * 200,
      y: y + (Math.random() - 0.5) * 200,
      size: 2 + Math.random() * 4,
      opacity: 0.8 + Math.random() * 0.2,
      life,
      maxLife: life,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    };
  }, []);

  // Dibujar formas detective mejoradas
  const drawShape = useCallback(
    (ctx: CanvasRenderingContext2D, particle: ConfettiParticle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);

      const lifeRatio = particle.life / particle.maxLife;
      ctx.globalAlpha = particle.opacity * lifeRatio;

      // Glow effect para legendary
      if (config.glowEffect && rarity === 'legendary') {
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8;
      }

      ctx.fillStyle = particle.color;
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = 1.5;

      const size = particle.size;

      switch (particle.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'square':
          ctx.fillRect(-size, -size, size * 2, size * 2);
          // Add border for depth
          ctx.strokeRect(-size, -size, size * 2, size * 2);
          break;

        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -size * 1.2);
          ctx.lineTo(-size, size * 0.8);
          ctx.lineTo(size, size * 0.8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;

        case 'star':
          // Estrella detective de 5 puntas mejorada
          ctx.beginPath();
          for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI) / 5;
            const radius = i % 2 === 0 ? size : size * 0.5;
            const x = Math.cos(angle - Math.PI / 2) * radius;
            const y = Math.sin(angle - Math.PI / 2) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;

        case 'badge':
          // Badge detective con estrella
          ctx.beginPath();
          ctx.arc(0, 0, size * 1.1, 0, Math.PI * 2);
          ctx.fill();
          // Inner star
          ctx.fillStyle = '#fff';
          ctx.globalAlpha = particle.opacity * lifeRatio * 0.9;
          ctx.beginPath();
          for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI) / 5;
            const radius = i % 2 === 0 ? size * 0.6 : size * 0.3;
            const x = Math.cos(angle - Math.PI / 2) * radius;
            const y = Math.sin(angle - Math.PI / 2) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          break;

        case 'detective':
          // Detective hat emoji-style
          ctx.font = `${size * 2.5}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🕵', 0, 0);
          break;
      }

      ctx.restore();
    },
    [config.glowEffect, rarity]
  );

  // Dibujar sparkles
  const drawSparkle = useCallback(
    (ctx: CanvasRenderingContext2D, sparkle: SparkleParticle) => {
      const lifeRatio = sparkle.life / sparkle.maxLife;
      const pulse = Math.sin(Date.now() * sparkle.pulseSpeed) * 0.3 + 0.7;

      ctx.save();
      ctx.translate(sparkle.x, sparkle.y);

      // Four-point sparkle
      ctx.globalAlpha = sparkle.opacity * lifeRatio * pulse;
      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;

      // Draw cross sparkle
      const size = sparkle.size;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();

      // Draw center glow
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
    []
  );

  // Actualizar partículas con physics mejorado
  const updateParticles = useCallback((deltaTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles = particlesRef.current;
    const sparkles = sparklesRef.current;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Update confetti particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];

      // Apply physics
      particle.vy += particle.gravity * (deltaTime / 16);
      particle.vx *= particle.drag;
      particle.vy *= particle.drag;

      particle.x += particle.vx * (deltaTime / 16);
      particle.y += particle.vy * (deltaTime / 16);
      particle.rotation += particle.rotationSpeed * (deltaTime / 16);

      // Bounce en bordes laterales
      if (particle.x < 0 || particle.x > canvasWidth) {
        particle.vx *= -particle.bounce;
        particle.x = Math.max(0, Math.min(canvasWidth, particle.x));
      }

      // Bounce en suelo con fricción
      if (particle.y > canvasHeight - particle.size) {
        particle.vy *= -particle.bounce;
        particle.y = canvasHeight - particle.size;
        particle.vx *= 0.85; // Fricción
        particle.rotationSpeed *= 0.9;
      }

      // Fade out al final de la vida
      const lifeRatio = particle.life / particle.maxLife;
      if (lifeRatio < 0.2) {
        particle.opacity = lifeRatio / 0.2;
      }

      particle.life -= deltaTime;

      // Remover partículas muertas
      if (particle.life <= 0 || particle.y > canvasHeight + 50) {
        particles.splice(i, 1);
      }
    }

    // Update sparkles
    for (let i = sparkles.length - 1; i >= 0; i--) {
      const sparkle = sparkles[i];
      sparkle.life -= deltaTime;

      if (sparkle.life <= 0) {
        sparkles.splice(i, 1);
      }
    }
  }, []);

  // Renderizar frame
  const render = useCallback(
    (currentTime: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      // Calculate delta time
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sparkles first (background)
      sparklesRef.current.forEach((sparkle) => {
        drawSparkle(ctx, sparkle);
      });

      // Draw confetti particles
      particlesRef.current.forEach((particle) => {
        drawShape(ctx, particle);
      });

      // Continue animation
      const hasParticles =
        particlesRef.current.length > 0 || sparklesRef.current.length > 0;

      if (hasParticles) {
        updateParticles(deltaTime);
        animationRef.current = requestAnimationFrame(render);
      } else {
        setIsAnimating(false);
        lastTimeRef.current = 0;
        onComplete?.();
      }
    },
    [drawShape, drawSparkle, updateParticles, onComplete]
  );

  // Trigger confetti
  const triggerConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsAnimating(true);
    startTimeRef.current = Date.now();

    // Resize canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 3;

    // Crear 50 partículas principales
    const particles: ConfettiParticle[] = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(createParticle(centerX, centerY, 1));
    }

    particlesRef.current = particles;

    // Crear sparkles para rarezas altas
    if (config.sparkles && config.sparkleCount) {
      const sparkles: SparkleParticle[] = [];
      for (let i = 0; i < config.sparkleCount; i++) {
        sparkles.push(createSparkle(centerX, centerY));
      }
      sparklesRef.current = sparkles;
    }

    // Multi-wave para epic/legendary
    if (config.multiWave && config.waveDelay) {
      setTimeout(() => {
        const additionalParticles: ConfettiParticle[] = [];
        for (let i = 0; i < Math.floor(config.particleCount * 0.5); i++) {
          additionalParticles.push(
            createParticle(centerX - 150, centerY, 0.8)
          );
          additionalParticles.push(
            createParticle(centerX + 150, centerY, 0.8)
          );
        }
        particlesRef.current.push(...additionalParticles);

        // More sparkles in second wave
        if (config.sparkles && config.sparkleCount) {
          const moreSparkles: SparkleParticle[] = [];
          for (let i = 0; i < Math.floor(config.sparkleCount * 0.5); i++) {
            moreSparkles.push(createSparkle(centerX - 150, centerY));
            moreSparkles.push(createSparkle(centerX + 150, centerY));
          }
          sparklesRef.current.push(...moreSparkles);
        }
      }, config.waveDelay);
    }

    lastTimeRef.current = 0;
    animationRef.current = requestAnimationFrame(render);
  }, [config, createParticle, createSparkle, render]);

  // Trigger on show change
  useEffect(() => {
    if (show && !isAnimating) {
      const timer = setTimeout(triggerConfetti, 100);
      return () => clearTimeout(timer);
    }
  }, [show, triggerConfetti, isAnimating]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particlesRef.current = [];
      sparklesRef.current = [];
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1000 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
}

export default ConfettiCelebration;
