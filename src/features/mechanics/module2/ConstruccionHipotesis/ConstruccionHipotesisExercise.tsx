import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Send, RotateCcw } from 'lucide-react';
import { HypothesisBuilder } from './HypothesisBuilder';
import { VariableSelector } from './VariableSelector';
import { AIValidator } from './AIValidator';
import { fetchHypothesisExercise, validateHypothesisSubmission } from './construccionHipotesisAPI';
import type { HypothesisExercise, Hypothesis, Variable } from './construccionHipotesisTypes';
import type { HypothesisValidation } from '../../shared/aiTypes';

export const ConstruccionHipotesisExercise: React.FC = () => {
  const [exercise, setExercise] = useState<HypothesisExercise | null>(null);
  const [hypothesis, setHypothesis] = useState<Partial<Hypothesis>>({
    id: `hyp-${Date.now()}`,
    variables: [],
  });
  const [validation, setValidation] = useState<HypothesisValidation | null>(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    loadExercise();
  }, []);

  const loadExercise = async () => {
    try {
      const data = await fetchHypothesisExercise('exercise-hypothesis-1');
      setExercise(data);
    } catch (error) {
      console.error('Error loading exercise:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVariable = (variable: Variable) => {
    setHypothesis({
      ...hypothesis,
      variables: [...(hypothesis.variables || []), variable],
    });
  };

  const handleRemoveVariable = (variableId: string) => {
    setHypothesis({
      ...hypothesis,
      variables: (hypothesis.variables || []).filter((v) => v.id !== variableId),
    });
  };

  const handleSubmit = async () => {
    if (!hypothesis.statement || !hypothesis.variables || hypothesis.variables.length < 2) {
      alert('Por favor completa todos los campos y selecciona al menos 2 variables');
      return;
    }

    setValidating(true);
    try {
      const result = await validateHypothesisSubmission(hypothesis as Hypothesis);
      setValidation(result);
    } catch (error) {
      console.error('Error validating hypothesis:', error);
    } finally {
      setValidating(false);
    }
  };

  const handleReset = () => {
    setHypothesis({
      id: `hyp-${Date.now()}`,
      variables: [],
    });
    setValidation(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-detective-blue text-detective-xl">Cargando ejercicio...</div>
      </div>
    );
  }

  if (!exercise) return <div>Error cargando ejercicio</div>;

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
            <FlaskConical className="w-8 h-8" />
            <h1 className="text-detective-3xl font-bold">{exercise.title}</h1>
          </div>
          <p className="text-detective-lg opacity-90 mb-4">{exercise.context}</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="font-medium">Pregunta Científica:</p>
            <p className="text-detective-lg">{exercise.scientificQuestion}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left: Variables */}
          <div>
            <VariableSelector
              availableVariables={exercise.availableVariables}
              selectedVariables={hypothesis.variables || []}
              onSelectVariable={handleSelectVariable}
              onRemoveVariable={handleRemoveVariable}
            />
          </div>

          {/* Right: Hypothesis Builder */}
          <div>
            <HypothesisBuilder hypothesis={hypothesis} onUpdate={setHypothesis} />

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={validating}
                className="flex-1 px-6 py-3 bg-detective-orange text-white rounded-lg font-medium hover:bg-detective-orange-dark transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
              >
                {validating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Validando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Validar Hipótesis
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-detective-text-secondary text-white rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reiniciar
              </button>
            </div>
          </div>
        </div>

        {/* Validation Results */}
        {validation && (
          <div className="mb-6">
            <AIValidator validation={validation} loading={validating} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ConstruccionHipotesisExercise;
