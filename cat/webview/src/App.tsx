"use client";

import React, { useState, useEffect } from 'react';
import { DraggableBox } from './DraggableBox';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { parseMarkdown } from './ParseMarkdown';
import { highlightColors } from './HighlightColors';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LANGUAGES = [
  { label: 'TypeScript/JS', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'C#', value: 'csharp' },
  { label: 'C++', value: 'cpp' },
  { label: 'Java', value: 'java' },
  { label: 'Rust', value: 'rust' }
];

function App() {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [slideLanguages, setSlideLanguages] = useState<string[]>([]); // per-slide language
  // Store box positions per slide: { [slideIdx]: { [boxIdx]: {top: number, left: number} } }
  const [boxPositions, setBoxPositions] = useState<{ [slideIdx: number]: { [boxIdx: number]: { top: number, left: number } } }>(() => {
    // Try to load from localStorage
    try {
      const saved = localStorage.getItem('cat_boxPositions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // No longer needed: offsets are managed by boxPositions
  // useLayoutEffect removed

  useEffect(() => {
    // Initial load from VS Code injection
    const initialMarkdown = (window as any).markdownContent;
    const detectedLanguage = (window as any).detectedLanguage;
    if (initialMarkdown) {
      const parsed = parseMarkdown(initialMarkdown);
      setSteps([parsed]);
      setSlideLanguages([detectedLanguage || 'typescript']);
    }

    const handleMessage = (event: MessageEvent) => {
      const { type, content, language } = event.data;
      if (type === 'newExplanation') {
        const parsed = parseMarkdown(content);
        setSteps(prev => {
          const newSteps = [...prev, parsed];
          setSlideLanguages(langs => [...langs, language || 'typescript']);
          setCurrentStepIdx(newSteps.length - 1);
          return newSteps;
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Persist boxPositions to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cat_boxPositions', JSON.stringify(boxPositions));
    } catch {}
  }, [boxPositions]);

  // --- Navigation Logic ---
  const nextStep = () => {
    if (currentStepIdx < steps.length - 1) setCurrentStepIdx(currentStepIdx + 1);
  };

  const prevStep = () => {
    if (currentStepIdx > 0) setCurrentStepIdx(currentStepIdx - 1);
  };

  const removeCurrentStep = () => {
    if (steps.length === 0) return;

    const newSteps = [...steps];
    newSteps.splice(currentStepIdx, 1);
    
    setSteps(newSteps);

    // Adjust index so we don't point to an empty element
    if (currentStepIdx >= newSteps.length && newSteps.length > 0) {
      setCurrentStepIdx(newSteps.length - 1);
    } else if (newSteps.length === 0) {
      setCurrentStepIdx(0);
    }
  };

  const currentStep = steps[currentStepIdx];
  const currentLang = slideLanguages[currentStepIdx] || 'typescript';
  // Helper: get box position for current slide/box
  const getBoxPosition = (boxIdx: number) => {
    return boxPositions[currentStepIdx]?.[boxIdx] || { top: boxIdx * 230 + 120, left: 700 };
  };
  // Handler: update box position for current slide/box
  const updateBoxPosition = (boxIdx: number, top: number, left: number) => {
    setBoxPositions(prev => {
      const updated = {
        ...prev,
        [currentStepIdx]: {
          ...(prev[currentStepIdx] || {}),
          [boxIdx]: { top, left }
        }
      };
      // Save immediately to localStorage for persistence
      try {
        localStorage.setItem('cat_boxPositions', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Empty state if no slides left
  if (steps.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h2>No explanations active.</h2>
          <p>Highlight code in VS Code and use "Explain Code" to add slides.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header UI */}
      <div style={headerStyle}>
        <div>
          <h1 style={{ fontSize: '28px', margin: 0, color: '#61dafb' }}>Code Slideshow</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '5px' }}>
            <span style={{ color: '#aaa', fontWeight: 'bold' }}>
              STEP {currentStepIdx + 1} OF {steps.length}
            </span>
            <button 
              onClick={removeCurrentStep}
              style={deleteButtonStyle}
              title="Remove this slide"
            >
              Remove Slide
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Per-slide language selector */}
          <select
            value={currentLang}
            onChange={e => {
              const newLang = e.target.value;
              setSlideLanguages(langs => langs.map((lang, idx) => idx === currentStepIdx ? newLang : lang));
            }}
            style={selectStyle}
          >
            {LANGUAGES.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>

          <div style={{ display: 'flex', gap: '5px' }}>
            <button onClick={prevStep} disabled={currentStepIdx === 0} style={navButtonStyle}>
              ← Previous
            </button>
            <button onClick={nextStep} disabled={currentStepIdx === steps.length - 1} style={navButtonStyle}>
              Next →
            </button>
          </div>
        </div>
      </div>

      <hr style={{ borderColor: '#333', margin: '20px 0' }} />

      {/* Main Content with Transition Key */}
      <div key={currentStepIdx} className="slide-transition" style={{ position: 'relative' }}>
        <Xwrapper>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {currentStep.codeBlocks.map((text: string, index: number) => (
              <div key={`code-${index}`} id={`codeSpan${index}`} style={{ width: 'fit-content', zIndex: 10 }}>
                <SyntaxHighlighter
                  language={currentLang}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '20px',
                    borderRadius: '12px',
                    border: `3px solid ${highlightColors[index % highlightColors.length]}`,
                    backgroundColor: '#1a1a1a',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}
                >
                  {text}
                </SyntaxHighlighter>
              </div>
            ))}
          </div>

          {currentStep.textBlocks.map((text: string, index: number) => (
            <DraggableBox
              key={`box-${currentStepIdx}-${index}`}
              label={text}
              id={`box${index}`}
              color={highlightColors[index % highlightColors.length]}
              topoffset={getBoxPosition(index).top}
              leftoffset={getBoxPosition(index).left}
              onPositionChange={(top: number, left: number) => updateBoxPosition(index, top, left)}
            />
          ))}

          {currentStep.codeBlocks.map((_: any, index: number) => (
            <Xarrow
              key={`arrow-${currentStepIdx}-${index}`}
              start={`codeSpan${index}`}
              end={`box${index}`}
              color={highlightColors[index % highlightColors.length]}
              strokeWidth={3}
              headSize={5}
              path="smooth"
              dashness={false}
            />
          ))}
        </Xwrapper>
      </div>

      <style>{`
        .slide-transition {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          filter: brightness(1.2);
        }
        pre code {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}

// --- Styles ---

const containerStyle: React.CSSProperties = {
  padding: '40px',
  color: 'white',
  backgroundColor: '#1e1e1e',
  minHeight: '100vh',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '10px'
};

const navButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#007acc',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.2s'
};

const deleteButtonStyle: React.CSSProperties = {
  padding: '4px 12px',
  backgroundColor: 'transparent',
  color: '#ff4d4d',
  border: '1px solid #ff4d4d',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '11px',
  textTransform: 'uppercase',
  fontWeight: 'bold'
};

const selectStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '6px',
  backgroundColor: '#2d2d2d',
  color: 'white',
  border: '1px solid #444',
  cursor: 'pointer'
};

export default App;