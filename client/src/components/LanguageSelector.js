import React from 'react';
import '../styles/LanguageSelector.css';

function LanguageSelector({
  sourceLanguage,
  targetLanguage,
  languages,
  onSourceChange,
  onTargetChange,
  onSwap,
}) {
  return (
    <div className="language-selector">
      <div className="selector-group">
        <label htmlFor="source-lang">From:</label>
        <select
          id="source-lang"
          value={sourceLanguage}
          onChange={(e) => onSourceChange(e.target.value)}
          className="select-dropdown"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <button className="swap-btn" onClick={onSwap} title="Swap languages">
        ⇄
      </button>

      <div className="selector-group">
        <label htmlFor="target-lang">To:</label>
        <select
          id="target-lang"
          value={targetLanguage}
          onChange={(e) => onTargetChange(e.target.value)}
          className="select-dropdown"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default LanguageSelector;
