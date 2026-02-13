import { useState, useCallback } from 'react';
import UploadZone from './components/UploadZone';
import ImagePreview from './components/ImagePreview';
import ResultsPanel from './components/ResultsPanel';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      setImage({
        base64,
        mediaType: file.type,
        previewUrl: URL.createObjectURL(file),
      });
      setResults(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleEvaluate = useCallback(async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: image.base64, mediaType: image.mediaType, apiKey }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Evaluation failed');
      }
      setResults(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [image]);

  const handleReset = useCallback(() => {
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    setImage(null);
    setResults(null);
    setError(null);
    setLoading(false);
  }, [image]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-row">
          <div className="logo-mark">A</div>
          <h1>AdEval</h1>
        </div>
        <p>AI-powered ad creative analysis across 6 performance dimensions</p>
      </header>

      <div className="api-key-bar">
        <label className="api-key-label" htmlFor="api-key">API Key</label>
        <input
          id="api-key"
          className="api-key-input"
          type="password"
          placeholder="sk-ant-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          spellCheck={false}
          autoComplete="off"
        />
        <a
          className="api-key-link"
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get a key
        </a>
      </div>

      {!image ? (
        <UploadZone onImageSelect={handleImageSelect} />
      ) : (
        <div className="main-layout">
          <div className="image-panel">
            <ImagePreview
              src={image.previewUrl}
              onEvaluate={handleEvaluate}
              onReset={handleReset}
              loading={loading}
              hasResults={!!results}
            />
          </div>

          <div className="results-panel">
            {loading && (
              <div className="loading">
                <div className="spinner" />
                <span className="loading-text">Analyzing creative…</span>
              </div>
            )}
            {error && <div className="error-card">{error}</div>}
            {results && !loading && <ResultsPanel results={results} />}
            {!loading && !error && !results && (
              <p className="prompt-text">Click Run Eval to analyze this creative</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
