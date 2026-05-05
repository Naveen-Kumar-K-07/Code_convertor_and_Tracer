import React from 'react';
import '../App.css';

function CodeEditor({ value, onChange, language, readOnly }) {
  return (
    <textarea
      className="code-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter code here..."
      readOnly={readOnly}
      spellCheck="false"
    />
  );
}

export default CodeEditor;
