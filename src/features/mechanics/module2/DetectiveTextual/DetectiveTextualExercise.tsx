import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Award, Clock, Target } from 'lucide-react';
import { EvidenceBoard } from './EvidenceBoard';
import { MagnifyingGlass } from './MagnifyingGlass';
import { AIHintSystem } from './AIHintSystem';
import {
  fetchInvestigation,
  validateConnection,
  requestAIHint,
  submitSolution,
} from './detectiveTextualAPI';
import type {
  Investigation,
  DetectiveProgress,
  Evidence,
  EvidenceConnection,
} from './detectiveTextualTypes';

export const DetectiveTextualExercise: React.FC = () => {
  const [investigation, setInvestigation] = useState<Investigation | null>(null);
  const [progress, setProgress] = useState<DetectiveProgress>({
    investigationId: '',
    discoveredEvidence: ['evidence-1'],
    connections: [],
    hypotheses: [],
    hintsUsed: 0,
    timeSpent: 0,
    score: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [availableCoins, setAvailableCoins] = useState(100);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    loadInvestigation();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadInvestigation = async () => {
    try {
      const data = await fetchInvestigation('investigation-marie-curie-1');
      setInvestigation(data);
      setProgress((prev) => ({ ...prev, investigationId: data.id }));
    } catch (error) {
      console.error('Error loading investigation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscoverEvidence = (evidenceId: string) => {
    if (!progress.discoveredEvidence.includes(evidenceId)) {
      setProgress({
        ...progress,
        discoveredEvidence: [...progress.discoveredEvidence, evidenceId],
      });
      setAvailableCoins((prev) => prev + 5);
    }
  };

  const handleCreateConnection = async (
    fromId: string,
    toId: string,
    relationship: string
  ) => {
    try {
      const validation = await validateConnection(fromId, toId, relationship);

      const newConnection: EvidenceConnection = {
        id: `conn-${Date.now()}`,
        fromEvidenceId: fromId,
        toEvidenceId: toId,
        relationship,
        userCreated: true,
        isCorrect: validation.isCorrect,
      };

      setProgress({
        ...progress,
        connections: [...progress.connections, newConnection],
        score: progress.score + validation.score,
      });

      if (validation.isCorrect) {
        setAvailableCoins((prev) => prev + 15);
      }
    } catch (error) {
      console.error('Error validating connection:', error);
    }
  };

  const handleRemoveConnection = (connectionId: string) => {
    setProgress({
      ...progress,
      connections: progress.connections.filter((c) => c.id !== connectionId),
    });
  };

  const handleRequestHint = async () => {
    const hint = await requestAIHint(progress);
    setProgress({ ...progress, hintsUsed: progress.hintsUsed + 1 });
    setAvailableCoins((prev) => prev - 10);
    return hint;
  };

  const handleSubmitSolution = async () => {
    try {
      const result = await submitSolution(progress);
      setResults(result);
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting solution:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-detective-blue text-detective-xl">Cargando investigación...</div>
      </div>
    );
  }

  if (!investigation) {
    return <div>Error cargando investigación</div>;
  }

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-detective-blue to-detective-orange rounded-detective p-6 mb-6 text-white shadow-detective-lg">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-8 h-8" />
            <h1 className="text-detective-3xl font-bold">{investigation.title}</h1>
          </div>
          <p className="text-detective-lg opacity-90 mb-4">{investigation.description}</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="font-medium">Misterio a resolver:</p>
            <p className="text-detective-lg">{investigation.mystery}</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-card flex items-center gap-3">
            <Clock className="w-6 h-6 text-detective-orange" />
            <div>
              <div className="text-detective-xs text-detective-text-secondary">Tiempo</div>
              <div className="text-detective-lg font-bold text-detective-blue">
                {formatTime(progress.timeSpent)}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-card flex items-center gap-3">
            <Search className="w-6 h-6 text-detective-orange" />
            <div>
              <div className="text-detective-xs text-detective-text-secondary">Evidencias</div>
              <div className="text-detective-lg font-bold text-detective-blue">
                {progress.discoveredEvidence.length}/{investigation.availableEvidence.length}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-card flex items-center gap-3">
            <Target className="w-6 h-6 text-detective-orange" />
            <div>
              <div className="text-detective-xs text-detective-text-secondary">Conexiones</div>
              <div className="text-detective-lg font-bold text-detective-blue">
                {progress.connections.length}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-card flex items-center gap-3">
            <Award className="w-6 h-6 text-detective-gold" />
            <div>
              <div className="text-detective-xs text-detective-text-secondary">Puntuación</div>
              <div className="text-detective-lg font-bold text-detective-blue">
                {progress.score}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Evidence Board - Large */}
          <div className="lg:col-span-2">
            <EvidenceBoard
              evidence={investigation.availableEvidence}
              connections={progress.connections}
              onCreateConnection={handleCreateConnection}
              onRemoveConnection={handleRemoveConnection}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Hint System */}
            <AIHintSystem
              onRequestHint={handleRequestHint}
              availableCoins={availableCoins}
              hintsUsed={progress.hintsUsed}
            />

            {/* Undiscovered Evidence */}
            <div className="bg-white rounded-lg p-4 shadow-card">
              <h4 className="text-detective-base font-semibold text-detective-blue mb-3">
                Evidencias por Descubrir
              </h4>
              <div className="space-y-2">
                {investigation.availableEvidence
                  .filter((ev) => !progress.discoveredEvidence.includes(ev.id))
                  .map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => handleDiscoverEvidence(ev.id)}
                      className="w-full p-3 text-left bg-detective-bg hover:bg-detective-bg-secondary rounded-lg transition-colors border border-detective-orange/30"
                    >
                      <div className="text-detective-xs font-medium text-detective-orange mb-1">
                        {ev.type.toUpperCase()}
                      </div>
                      <div className="text-detective-sm text-detective-text">{ev.title}</div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Magnifying Glass Tool */}
        {selectedEvidence && (
          <div className="mb-6">
            <MagnifyingGlass text={selectedEvidence.content} />
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmitSolution}
            disabled={progress.connections.length < 2}
            className={`px-8 py-4 rounded-lg font-bold text-detective-lg transition-all ${
              progress.connections.length < 2
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-detective-orange to-detective-gold text-white shadow-gold-lg hover:shadow-gold'
            }`}
          >
            Presentar Solución del Misterio
          </button>
        </div>

        {/* Results Modal */}
        {showResults && results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowResults(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-detective p-8 max-w-lg w-full shadow-detective-lg"
            >
              <div className="text-center">
                <Award className="w-16 h-16 text-detective-gold mx-auto mb-4" />
                <h2 className="text-detective-3xl font-bold text-detective-blue mb-2">
                  {results.completed ? '¡Caso Resuelto!' : 'Investigación Incompleta'}
                </h2>
                <div className="text-6xl font-bold text-detective-orange mb-4">
                  {results.score}/100
                </div>
                <p className="text-detective-base text-detective-text mb-6">{results.feedback}</p>
                <button
                  onClick={() => setShowResults(false)}
                  className="px-6 py-3 bg-detective-orange text-white rounded-lg font-medium hover:bg-detective-orange-dark transition-colors"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DetectiveTextualExercise;
