import React, { useState } from 'react';
import { ArticleParser } from './ArticleParser';
import { FactCheckDashboard } from './FactCheckDashboard';
import { mockArticles, mockFactCheckResults } from './verificadorFakeNewsMockData';
import { Claim, FactCheckResult } from './verificadorFakeNewsTypes';

export const VerificadorFakeNewsExercise: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState(mockArticles[0].id);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [results, setResults] = useState<FactCheckResult[]>([]);

  const selectedArticle = mockArticles.find((a) => a.id === selectedArticleId);

  const handleClaimExtraction = (text: string, start: number, end: number) => {
    const newClaim: Claim = {
      id: `claim-${Date.now()}`,
      text,
      context: selectedArticle?.content.slice(Math.max(0, start - 50), Math.min(selectedArticle.content.length, end + 50)) || '',
      position: { start, end },
    };
    setClaims([...claims, newClaim]);
  };

  const handleVerifyClaim = async (claimId: string) => {
    // Mock API call - simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get mock results for this article
    const articleResults = mockFactCheckResults[selectedArticleId] || [];
    const mockResult = articleResults[results.length % articleResults.length];

    if (mockResult) {
      const newResult: FactCheckResult = {
        ...mockResult,
        claimId,
      };
      setResults([...results, newResult]);
    }
  };

  const highlightedClaims = claims.map((claim) => ({
    ...claim.position,
    verified: results.some((r) => r.claimId === claim.id),
  }));

  const handleReset = () => {
    setClaims([]);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-detective-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-detective shadow-card p-6">
          <h1 className="text-3xl font-bold text-detective-text mb-4">
            Verificador de Noticias Falsas
          </h1>
          <p className="text-detective-text-secondary mb-4">
            Analiza artículos sobre Marie Curie y verifica la veracidad de las afirmaciones.
          </p>

          <div className="flex gap-4 items-center">
            <label className="text-detective-text font-medium">Selecciona un artículo:</label>
            <select
              value={selectedArticleId}
              onChange={(e) => {
                setSelectedArticleId(e.target.value);
                handleReset();
              }}
              className="px-4 py-2 border-2 border-gray-300 rounded-detective focus:border-detective-orange focus:outline-none"
            >
              {mockArticles.map((article) => (
                <option key={article.id} value={article.id}>
                  {article.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-detective-text rounded-detective hover:bg-gray-300 transition-colors font-medium"
            >
              Reiniciar
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {selectedArticle && (
              <ArticleParser
                article={selectedArticle}
                onClaimSelect={handleClaimExtraction}
                highlightedClaims={highlightedClaims}
              />
            )}
          </div>
          <div>
            <FactCheckDashboard
              claims={claims}
              results={results}
              onVerifyClaim={handleVerifyClaim}
            />
          </div>
        </div>

        {/* Score Summary */}
        {results.length > 0 && (
          <div className="bg-gradient-to-r from-detective-orange to-detective-gold text-white rounded-detective shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-2">Resumen de Verificación</h3>
            <p className="mb-4">Has verificado {results.length} afirmación(es).</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/20 rounded p-3">
                <p className="text-3xl font-bold">{results.filter((r) => r.verdict === 'true').length}</p>
                <p className="text-sm">Verdaderas</p>
              </div>
              <div className="bg-white/20 rounded p-3">
                <p className="text-3xl font-bold">{results.filter((r) => r.verdict === 'false').length}</p>
                <p className="text-sm">Falsas</p>
              </div>
              <div className="bg-white/20 rounded p-3">
                <p className="text-3xl font-bold">
                  {Math.round((results.reduce((sum, r) => sum + r.confidence, 0) / results.length) * 100)}%
                </p>
                <p className="text-sm">Confianza Promedio</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
