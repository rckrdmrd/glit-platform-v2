import React, { useState } from 'react';
import { Mail, CheckCircle, AlertTriangle } from 'lucide-react';

interface ToneAnalysis {
  formality: number;
  clarity: number;
  professionalism: number;
  suggestions: string[];
}

export const EmailFormalExercise: React.FC = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [analysis, setAnalysis] = useState<ToneAnalysis | null>(null);

  const templates = [
    { id: '1', name: 'Solicitud de Información', greeting: 'Estimado/a', purpose: 'Solicitar información sobre Marie Curie' },
    { id: '2', name: 'Agradecimiento Formal', greeting: 'Distinguido/a', purpose: 'Agradecer una conferencia científica' },
    { id: '3', name: 'Invitación Académica', greeting: 'Apreciado/a', purpose: 'Invitar a evento sobre mujeres en ciencia' },
  ];

  const analyzeTone = () => {
    const formalWords = ['estimado', 'cordialmente', 'atentamente', 'distinguido', 'apreciado'];
    const formalityScore = formalWords.filter(word =>
      body.toLowerCase().includes(word) || subject.toLowerCase().includes(word)
    ).length * 20;

    const hasGreeting = /^(estimado|distinguido|apreciado)/i.test(body);
    const hasClosing = /(atentamente|cordialmente|saludos cordiales)/i.test(body);

    const suggestions: string[] = [];
    if (!hasGreeting) suggestions.push('Añade un saludo formal al inicio');
    if (!hasClosing) suggestions.push('Incluye un cierre formal');
    if (subject.length < 5) suggestions.push('El asunto debe ser más descriptivo');
    if (!to.includes('@')) suggestions.push('Verifica la dirección de correo');

    setAnalysis({
      formality: Math.min(formalityScore, 100),
      clarity: body.length > 50 ? 85 : 60,
      professionalism: hasGreeting && hasClosing ? 90 : 70,
      suggestions,
    });
  };

  const useTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSubject(`${template.purpose}`);
      setBody(`${template.greeting} Dr./Dra.,\n\n[Escribe tu mensaje aquí]\n\nAtentamente,\n[Tu nombre]`);
    }
  };

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-detective shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-8 h-8 text-detective-orange" />
            <h1 className="text-3xl font-bold text-detective-text">Redacción de Email Formal</h1>
          </div>
          <p className="text-detective-text-secondary">
            Redacta un correo formal relacionado con Marie Curie y su legado científico.
          </p>
        </div>

        <div className="bg-white rounded-detective shadow-card p-6 space-y-4">
          <div>
            <label className="block text-detective-text font-medium mb-2">Plantillas:</label>
            <div className="grid grid-cols-3 gap-3">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => useTemplate(template.id)}
                  className="p-3 border-2 border-gray-300 rounded-detective hover:border-detective-orange transition-colors text-left"
                >
                  <p className="font-medium text-detective-text text-sm">{template.name}</p>
                  <p className="text-detective-text-secondary text-xs">{template.purpose}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-detective-text font-medium mb-2">Para:</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="destinatario@universidad.edu"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-detective-text font-medium mb-2">Asunto:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Consulta sobre investigaciones de Marie Curie"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-detective-text font-medium mb-2">Cuerpo del mensaje:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              placeholder="Escribe tu mensaje formal aquí..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none resize-none"
            />
          </div>

          <button
            onClick={analyzeTone}
            className="w-full py-3 bg-detective-orange text-white rounded-detective hover:bg-detective-orange-dark transition-colors font-medium"
          >
            Analizar Tono y Formalidad
          </button>
        </div>

        {analysis && (
          <div className="bg-white rounded-detective shadow-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-detective-text">Análisis del Email</h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-detective-text-secondary text-sm mb-1">Formalidad</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <span className="text-2xl font-bold text-detective-blue">{analysis.formality}%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div style={{ width: `${analysis.formality}%` }} className="bg-detective-blue" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-detective-text-secondary text-sm mb-1">Claridad</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <span className="text-2xl font-bold text-detective-gold">{analysis.clarity}%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div style={{ width: `${analysis.clarity}%` }} className="bg-detective-gold" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-detective-text-secondary text-sm mb-1">Profesionalismo</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <span className="text-2xl font-bold text-detective-orange">{analysis.professionalism}%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div style={{ width: `${analysis.professionalism}%` }} className="bg-detective-orange" />
                  </div>
                </div>
              </div>
            </div>

            {analysis.suggestions.length > 0 && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-detective p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-detective-text mb-2">Sugerencias de mejora:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {analysis.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="text-detective-text-secondary">{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {analysis.suggestions.length === 0 && (
              <div className="bg-green-50 border-2 border-green-200 rounded-detective p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <p className="font-medium text-green-800">¡Excelente! Tu email cumple con los estándares formales.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
