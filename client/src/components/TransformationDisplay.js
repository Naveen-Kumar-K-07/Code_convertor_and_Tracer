import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import '../styles/TransformationDisplay.css';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#667eea',
    primaryTextColor: '#fff',
    primaryBorderColor: '#333',
    lineColor: '#667eea',
    secondaryColor: '#f3f4f6',
    tertiaryColor: '#fff',
  },
  securityLevel: 'loose',
});

function TransformationDisplay({ visualization, labExplanation }) {
  const [activeTab, setActiveTab] = useState('visualizer');
  const [currentStep, setCurrentStep] = useState(0);
  const diagramRef = useRef(null);

  const steps = visualization?.steps || [];
  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (activeTab === 'visualizer' && currentStepData?.mermaid) {
      if (diagramRef.current) {
        diagramRef.current.innerHTML = `<div class="mermaid">${currentStepData.mermaid}</div>`;
        mermaid.contentLoaded();
      }
    }
  }, [activeTab, currentStep, currentStepData]);

  if (!visualization && !labExplanation) {
    return (
      <div className="transformation-section">
        <div className="summary-box">
          <p>Translate code to see the ultra-detailed visual trace and lab documentation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transformation-section">
      <div className="display-tabs">
        <button 
          className={`tab-btn ${activeTab === 'visualizer' ? 'active' : ''}`}
          onClick={() => setActiveTab('visualizer')}
        >
          Visual Execution Trace
        </button>
        <button 
          className={`tab-btn ${activeTab === 'lab' ? 'active' : ''}`}
          onClick={() => setActiveTab('lab')}
        >
          Detailed Lab Report
        </button>
      </div>

      {activeTab === 'visualizer' ? (
        <div className="visualizer-container">
          <div className="visual-pane">
            <div ref={diagramRef} className="mermaid-diagram"></div>
          </div>

          <div className="info-pane">
            <div className="step-header">
              <span className="step-badge">Trace Step {currentStep + 1} / {steps.length}</span>
              <div className="step-controls">
                <button className="control-btn" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>Back</button>
                <button className="control-btn" onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1}>Next</button>
              </div>
            </div>

            <div className="step-details">
              <h4>{currentStepData?.title}</h4>
              {currentStepData?.currentLine && (
                <div className="current-line-box" style={{ background: '#1e293b', color: '#f8fafc', padding: '10px 15px', borderRadius: '6px', fontFamily: 'monospace', marginBottom: '15px', fontSize: '0.9rem', borderLeft: '4px solid #3b82f6' }}>
                  <span style={{ color: '#94a3b8', marginRight: '10px', userSelect: 'none' }}>►</span>
                  {currentStepData.currentLine}
                </div>
              )}
              <div className="step-description">{currentStepData?.description}</div>
              <div className="variable-box">
                <h5>Active Variables</h5>
                <div className="variable-list">
                  {currentStepData?.variables && Object.entries(currentStepData.variables).map(([k, v]) => (
                    <div key={k} className="variable-item"><b>{k}</b>: {v}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="lab-report">
          <div className="lab-section">
            <h4>1. Objective</h4>
            <p>{labExplanation?.objective}</p>
          </div>

          <div className="lab-section">
            <h4>2. Step-by-Step Algorithm</h4>
            <p style={{ whiteSpace: 'pre-wrap' }}>{labExplanation?.algorithm}</p>
          </div>

          <div className="lab-section">
            <h4>3. Complexity Analysis</h4>
            <div className="complexity-grid">
              <div className="complexity-item"><b>Time Complexity:</b> {labExplanation?.complexity?.split(',')[0]}</div>
              <div className="complexity-item"><b>Space Complexity:</b> {labExplanation?.complexity?.split(',')[1]}</div>
            </div>
          </div>

          <div className="lab-section">
            <h4>4. Iteration Table</h4>
            <div className="iteration-table-container" dangerouslySetInnerHTML={{ __html: labExplanation?.iterationTable }} />
          </div>

          <div className="lab-section">
            <h4>5. Comprehensive Code Explanation</h4>
            <div className="explanation-sub">
              <h5>Total Functions: {labExplanation?.codeExplanation?.totalFunctions}</h5>
              <div className="function-grid">
                {labExplanation?.codeExplanation?.functionDetails?.map((f, i) => (
                  <div key={i} className="function-card">
                    <b>{f.name}</b>
                    <p><i>Purpose:</i> {f.purpose}</p>
                    <p><i>Params:</i> {f.params}</p>
                    <p><i>Returns:</i> {f.returns}</p>
                  </div>
                ))}
              </div>
              <h5>Variable Usage</h5>
              <ul className="var-usage-list">
                {labExplanation?.codeExplanation?.variableUsage?.map((v, i) => (
                  <li key={i}><code>{v.name}</code> <span style={{color: '#94a3b8', fontSize: '0.8rem'}}>({v.type})</span>: {v.role}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lab-section">
            <h4>6. Conclusion</h4>
            <p>{labExplanation?.conclusion}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransformationDisplay;
