import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Loader2, Bot, User } from 'lucide-react';
import { sendDebateMessage } from './debateDigitalAPI';
import { debateTopic } from './debateDigitalMockData';
import type { DebateMessage } from './debateDigitalTypes';

export const DebateDigitalExercise: React.FC = () => {
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [input, setInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const aiIntro: DebateMessage = {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: 'Hola, soy tu oponente en este debate. Defenderé la posición de que Marie Curie debió haber patentado sus descubrimientos. ¿Cuál es tu argumento inicial?',
      timestamp: new Date(),
    };
    setMessages([aiIntro]);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || aiTyping) return;

    const userMsg: DebateMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setAiTyping(true);

    try {
      const response = await sendDebateMessage(input, 'scientificSharing');
      const aiMsg: DebateMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: response.message,
        timestamp: new Date(),
        argumentStrength: response.argumentScore,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setAiTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-detective-blue to-detective-orange rounded-detective p-6 mb-6 text-white">
          <div className="flex items-center gap-3 mb-2"><MessageCircle className="w-8 h-8" /><h1 className="text-detective-3xl font-bold">Debate Digital</h1></div>
          <p className="text-detective-lg mb-2">{debateTopic.title}</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3"><p className="font-medium">{debateTopic.question}</p></div>
        </motion.div>

        <div className="bg-white rounded-lg shadow-card flex flex-col" style={{ height: '600px' }}>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${msg.sender === 'user' ? 'bg-detective-orange text-white' : 'bg-gray-100 text-detective-text'} rounded-lg p-4`}>
                    <div className="flex items-center gap-2 mb-2">{msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}<span className="text-detective-xs font-semibold">{msg.sender === 'user' ? 'Tú' : 'IA Oponente'}</span></div>
                    <p className="text-detective-sm">{msg.text}</p>
                    {msg.argumentStrength && (<div className="mt-2 text-detective-xs opacity-75">Fuerza del argumento: {Math.round(msg.argumentStrength * 100)}%</div>)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {aiTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4"><div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /><span className="text-detective-sm">IA está escribiendo...</span></div></div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="flex gap-3">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Escribe tu argumento..." className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-detective-orange" disabled={aiTyping} />
              <button onClick={handleSend} disabled={!input.trim() || aiTyping} className="px-6 py-3 bg-detective-orange text-white rounded-lg font-medium hover:bg-detective-orange-dark transition-colors disabled:bg-gray-300 flex items-center gap-2"><Send className="w-5 h-5" />Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateDigitalExercise;
