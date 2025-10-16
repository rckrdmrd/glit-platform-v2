import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Play, Pause, FileAudio } from 'lucide-react';
import { fetchPodcastExercise, analyzeRecording } from './podcastArgumentativoAPI';
import type { PodcastExercise, Recording } from './podcastArgumentativoTypes';
import type { ArgumentAnalysis } from '../../shared/aiTypes';

export const PodcastArgumentativoExercise: React.FC = () => {
  const [exercise, setExercise] = useState<PodcastExercise | null>(null);
  const [recording, setRecording] = useState<Recording>({ id: '', audioBlob: null, transcription: '', analysis: null, duration: 0 });
  const [isRecording, setIsRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [analysis, setAnalysis] = useState<ArgumentAnalysis | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    loadExercise();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRecording) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const loadExercise = async () => {
    const data = await fetchPodcastExercise('podcast-1');
    setExercise(data);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setRecording((prev) => ({ ...prev, audioBlob: blob, duration: timer }));
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimer(0);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('No se pudo acceder al micrófono. Por favor verifica los permisos.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleAnalyze = async () => {
    if (!recording.audioBlob) return;
    setAnalyzing(true);
    try {
      const mockTranscription = 'Marie Curie fue una científica extraordinaria que superó innumerables obstáculos. Su trabajo con elementos radiactivos revolucionó la física y la medicina. A pesar de enfrentar discriminación de género, perseveró y ganó dos Premios Nobel. Su legado inspira a científicas de todo el mundo.';
      const result = await analyzeRecording(mockTranscription);
      setRecording((prev) => ({ ...prev, transcription: mockTranscription }));
      setAnalysis(result);
    } finally {
      setAnalyzing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!exercise) return <div className="flex items-center justify-center h-screen">Cargando ejercicio...</div>;

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-detective-blue to-detective-orange rounded-detective p-6 mb-6 text-white">
          <div className="flex items-center gap-3 mb-2"><FileAudio className="w-8 h-8" /><h1 className="text-detective-3xl font-bold">Podcast Argumentativo</h1></div>
          <p className="text-detective-lg mb-2">{exercise.topic}</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3"><p>{exercise.prompt}</p></div>
        </motion.div>

        <div className="bg-white rounded-lg p-8 shadow-card mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-detective-orange mb-2">{formatTime(timer)}</div>
            <div className="text-detective-sm text-detective-text-secondary">Tiempo límite: {formatTime(exercise.timeLimit)}</div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            {!isRecording && !recording.audioBlob && (
              <button onClick={startRecording} className="px-8 py-4 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors flex items-center gap-3 shadow-lg">
                <Mic className="w-6 h-6" />Iniciar Grabación
              </button>
            )}
            {isRecording && (
              <button onClick={stopRecording} className="px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 transition-colors flex items-center gap-3 shadow-lg animate-pulse">
                <Square className="w-6 h-6" />Detener Grabación
              </button>
            )}
          </div>

          {recording.audioBlob && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 p-4 bg-detective-bg rounded-lg"><FileAudio className="w-6 h-6 text-detective-orange" /><span className="text-detective-base font-medium">Grabación completada ({formatTime(recording.duration)})</span></div>
              <button onClick={handleAnalyze} disabled={analyzing} className="w-full px-6 py-3 bg-detective-orange text-white rounded-lg font-medium hover:bg-detective-orange-dark disabled:bg-gray-300">{analyzing ? 'Analizando...' : 'Analizar Podcast'}</button>
            </div>
          )}
        </div>

        {recording.transcription && (
          <div className="bg-white rounded-lg p-6 shadow-card mb-6">
            <h3 className="text-detective-lg font-semibold text-detective-blue mb-3">Transcripción</h3>
            <p className="text-detective-sm text-detective-text leading-relaxed p-4 bg-gray-50 rounded-lg">{recording.transcription}</p>
          </div>
        )}

        {analysis && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg p-6 shadow-card">
            <h3 className="text-detective-lg font-semibold text-detective-blue mb-4">Análisis del Argumento</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[{ label: 'Claridad', value: analysis.clarity }, { label: 'Lógica', value: analysis.logic }, { label: 'Evidencia', value: analysis.evidence }, { label: 'Persuasión', value: analysis.persuasion }].map((metric) => (
                <div key={metric.label} className="text-center p-4 bg-detective-bg rounded-lg">
                  <div className="text-3xl font-bold text-detective-orange mb-1">{Math.round(metric.value * 100)}</div>
                  <div className="text-detective-xs text-detective-text-secondary">{metric.label}</div>
                </div>
              ))}
            </div>
            <div className="mb-4"><h4 className="text-detective-base font-semibold mb-2">Retroalimentación</h4><ul className="space-y-1">{analysis.feedback.map((f, idx) => (<li key={idx} className="text-detective-sm">✓ {f}</li>))}</ul></div>
            <div><h4 className="text-detective-base font-semibold mb-2">Áreas de Mejora</h4><ul className="space-y-1">{analysis.improvements.map((i, idx) => (<li key={idx} className="text-detective-sm">→ {i}</li>))}</ul></div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PodcastArgumentativoExercise;
