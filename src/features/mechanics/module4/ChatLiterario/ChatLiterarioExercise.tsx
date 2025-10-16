import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'marie' | 'pierre';
  text: string;
  timestamp: Date;
}

export const ChatLiterarioExercise: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'marie',
      text: '¡Bonjour! Soy Marie Curie. Estoy trabajando en mi laboratorio investigando materiales radioactivos. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [activeCharacter, setActiveCharacter] = useState<'marie' | 'pierre'>('marie');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const responses = {
    marie: [
      'La investigación científica requiere dedicación y curiosidad incansable. ¿Qué aspectos de la radioactividad te interesan?',
      'El descubrimiento del polonio y el radio fue resultado de años de trabajo meticuloso. La perseverancia es clave en la ciencia.',
      'Como mujer en la ciencia, he enfrentado muchos obstáculos, pero la pasión por el conocimiento siempre me ha impulsado.',
      'Los dos Premios Nobel han sido un honor, pero lo más importante es contribuir al avance científico de la humanidad.',
    ],
    pierre: [
      'Marie y yo trabajamos juntos en la investigación de la radioactividad. La colaboración científica es fundamental.',
      'El estudio de los rayos invisibles emitidos por el uranio abrió un mundo completamente nuevo en la física.',
      'La investigación científica requiere precisión y observación cuidadosa. Cada experimento nos acerca más a la verdad.',
      'Marie es una científica extraordinaria. Su dedicación y talento son incomparables.',
    ],
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate response after 1 second
    setTimeout(() => {
      const responseText = responses[activeCharacter][Math.floor(Math.random() * responses[activeCharacter].length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: activeCharacter,
        text: responseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getAvatar = (sender: Message['sender']) => {
    if (sender === 'user') {
      return <User className="w-6 h-6 text-white" />;
    }
    return <Bot className="w-6 h-6 text-white" />;
  };

  const getAvatarBg = (sender: Message['sender']) => {
    if (sender === 'user') return 'bg-detective-blue';
    if (sender === 'marie') return 'bg-detective-orange';
    return 'bg-detective-gold';
  };

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-detective shadow-card p-6">
          <h1 className="text-3xl font-bold text-detective-text mb-4">Chat Literario con Marie Curie</h1>
          <p className="text-detective-text-secondary mb-4">
            Conversa con Marie Curie y Pierre Curie sobre sus descubrimientos científicos.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setActiveCharacter('marie')}
              className={`flex-1 py-2 px-4 rounded-detective font-medium transition-colors ${
                activeCharacter === 'marie'
                  ? 'bg-detective-orange text-white'
                  : 'bg-gray-200 text-detective-text hover:bg-gray-300'
              }`}
            >
              Marie Curie
            </button>
            <button
              onClick={() => setActiveCharacter('pierre')}
              className={`flex-1 py-2 px-4 rounded-detective font-medium transition-colors ${
                activeCharacter === 'pierre'
                  ? 'bg-detective-gold text-white'
                  : 'bg-gray-200 text-detective-text hover:bg-gray-300'
              }`}
            >
              Pierre Curie
            </button>
          </div>
        </div>

        <div className="bg-white rounded-detective shadow-card flex flex-col" style={{ height: '600px' }}>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getAvatarBg(message.sender)}`}>
                  {getAvatar(message.sender)}
                </div>
                <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-4 py-3 rounded-detective max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-detective-blue text-white'
                      : 'bg-detective-bg border-2 border-gray-200 text-detective-text'
                  }`}>
                    {message.sender !== 'user' && (
                      <p className="font-bold text-sm mb-1 text-detective-orange">
                        {message.sender === 'marie' ? 'Marie Curie' : 'Pierre Curie'}
                      </p>
                    )}
                    <p>{message.text}</p>
                  </div>
                  <p className="text-detective-text-secondary text-xs mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Escribe tu mensaje a ${activeCharacter === 'marie' ? 'Marie' : 'Pierre'}...`}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="px-6 py-2 bg-detective-orange text-white rounded-detective hover:bg-detective-orange-dark transition-colors font-medium flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
