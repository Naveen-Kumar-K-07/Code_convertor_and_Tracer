import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CodeEditor from './components/CodeEditor';
import LanguageSelector from './components/LanguageSelector';
import TransformationDisplay from './components/TransformationDisplay';
import './App.css';

function App() {
  const [sourceCode, setSourceCode] = useState('// Enter your code here\nfunction helloWorld() {\n  console.log("Hello, World!");\n}');
  const [sourceLanguage, setSourceLanguage] = useState('JavaScript');
  const [targetLanguage, setTargetLanguage] = useState('Python');
  const [translatedCode, setTranslatedCode] = useState('');
  const [visualization, setVisualization] = useState(null);
  const [labExplanation, setLabExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [languages, setLanguages] = useState([]);

  const API_URL = process.env.NODE_ENV === 'production' 
    ? '' 
    : (process.env.REACT_APP_API_URL || 'http://localhost:5000');

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/languages`);
      setLanguages(response.data.languages);
    } catch (err) {
      console.error('Failed to fetch languages:', err);
    }
  };

  const handleTranslate = async () => {
    if (!sourceCode.trim()) {
      setError('Please enter code to translate');
      return;
    }

    setLoading(true);
    setError('');
    setVisualization(null);
    setLabExplanation(null);
    setTranslatedCode('');

    try {
      const response = await axios.post(`${API_URL}/api/translate`, {
        code: sourceCode,
        sourceLanguage,
        targetLanguage,
      });

      setTranslatedCode(response.data.translatedCode);
      setVisualization(response.data.visualization);
      setLabExplanation(response.data.labExplanation);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        'Translation failed. Make sure your API key is set.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🔄 Code Visualizer & Lab Generator</h1>
        <p>Translate code and generate interactive DSA visualizations for your labs</p>
      </header>

      <div className="container">
        <div className="selector-section">
          <LanguageSelector
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            languages={languages}
            onSourceChange={setSourceLanguage}
            onTargetChange={setTargetLanguage}
            onSwap={handleSwapLanguages}
          />
          
          <button 
            className="translate-btn" 
            onClick={handleTranslate}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Visualize & Translate'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <div className="editor-section">
          <div className="editor-container">
            <h2>{sourceLanguage} Input</h2>
            <CodeEditor 
              value={sourceCode} 
              onChange={setSourceCode}
              language={sourceLanguage.toLowerCase()}
            />
          </div>

          <div className="editor-container">
            <h2>{targetLanguage} Result</h2>
            <CodeEditor 
              value={translatedCode} 
              onChange={() => {}}
              language={targetLanguage.toLowerCase()}
              readOnly={true}
            />
          </div>
        </div>

        <TransformationDisplay
          visualization={visualization}
          labExplanation={labExplanation}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
        />
      </div>
    </div>
  );
}

export default App;
