import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Download, Trash2 } from 'lucide-react';

interface AudioRecorderProps {
  onRecordingComplete?: (audioBlob: Blob, audioUrl: string) => void;
  maxDurationSeconds?: number;
  className?: string;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  maxDurationSeconds = 300, // 5 minutes default
  className = '',
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermission('granted');

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        if (onRecordingComplete) {
          onRecordingComplete(audioBlob, url);
        }

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= maxDurationSeconds) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      setPermission('denied');
      setError('Microphone access denied. Please enable microphone permissions.');
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => Math.min(prev + 1, maxDurationSeconds));
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (timerRef.current) clearInterval(timerRef.current);
      }
      setIsPaused(!isPaused);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `recording-${Date.now()}.webm`;
      a.click();
    }
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white rounded-detective shadow-card p-6 ${className}`}>
      <h3 className="text-detective-text font-bold text-lg mb-4">Audio Recorder</h3>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-detective">
          {error}
        </div>
      )}

      {permission === 'denied' && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-detective">
          <p className="font-medium">Microphone permission required</p>
          <p className="text-sm mt-1">Please enable microphone access in your browser settings.</p>
        </div>
      )}

      {!audioUrl ? (
        <div className="space-y-4">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
              isRecording ? 'bg-red-100 animate-pulse' : 'bg-detective-bg-secondary'
            }`}>
              <Mic className={`w-12 h-12 ${isRecording ? 'text-red-600' : 'text-detective-orange'}`} />
            </div>
            <p className="text-3xl font-bold text-detective-text mb-2">
              {formatTime(recordingTime)}
            </p>
            <p className="text-detective-text-secondary text-sm">
              Max duration: {formatTime(maxDurationSeconds)}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-6 py-3 bg-detective-orange text-white rounded-detective hover:bg-detective-orange-dark transition-colors font-medium"
              >
                <Mic className="w-5 h-5" />
                Start Recording
              </button>
            ) : (
              <>
                <button
                  onClick={pauseRecording}
                  className="flex items-center gap-2 px-6 py-3 bg-detective-blue text-white rounded-detective hover:bg-detective-blue/90 transition-colors font-medium"
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-detective hover:bg-red-700 transition-colors font-medium"
                >
                  <Square className="w-5 h-5" />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="w-full"
          />

          <div className="text-center">
            <p className="text-2xl font-bold text-detective-text mb-2">
              Recording Complete
            </p>
            <p className="text-detective-text-secondary">
              Duration: {formatTime(recordingTime)}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={playAudio}
              className="flex items-center gap-2 px-6 py-3 bg-detective-blue text-white rounded-detective hover:bg-detective-blue/90 transition-colors font-medium"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={downloadAudio}
              className="flex items-center gap-2 px-6 py-3 bg-detective-gold text-white rounded-detective hover:bg-yellow-600 transition-colors font-medium"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={deleteRecording}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-detective hover:bg-red-700 transition-colors font-medium"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>

          <button
            onClick={deleteRecording}
            className="w-full py-2 text-detective-orange hover:underline font-medium"
          >
            Record Again
          </button>
        </div>
      )}
    </div>
  );
};
