"use client";

import React, { useState, useEffect } from 'react';
import { DraggableBox } from './DraggableBox';
import Xarrow from 'react-xarrows';
import { Xwrapper } from 'react-xarrows';
import { parseMarkdown } from './ParseMarkdown';
import { highlightColors } from './HighlightColors';
// New imports for highlighting
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LANGUAGES = [
  { label: 'C#', value: 'csharp' },
  { label: 'C++', value: 'cpp' },
  { label: 'Python', value: 'python' },
  { label: 'TypeScript/JS', value: 'typescript' },
  { label: 'Java', value: 'java' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'Rust', value: 'rust' },
  { label: 'C', value: 'c' }
];

function App() {
  const [parts, setParts] = useState<{
    codeBlocks: string[],
    textBlocks: string[],
    headers: string[]
  }>({
    codeBlocks: [],
    textBlocks: [],
    headers: []
  });

  // State for the dropdown
  const [selectedLang, setSelectedLang] = useState('typescript');

  useEffect(() => {
    const markdown = (window as any).markdownContent || '';
    const parsed = parseMarkdown(markdown);
    setParts(parsed);

    const handleMessage = (event: MessageEvent) => {
      const { type, content } = event.data;
      if (type === 'newExplanation') {
        const parsed = parseMarkdown(content);
        setParts(parsed);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div style={{
      padding: '40px',
      color: 'white',
      fontSize: '14px',
      flexDirection: 'column',
      display: 'flex',
      gap: '20px',
      backgroundColor: '#1e1e1e',
      minHeight: '100vh',
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Code Explanation</h1>

      {/* Dropdown Menu */}
      <div style={{ marginBottom: '20px' }}>
        <select 
          value={selectedLang} 
          onChange={(e) => setSelectedLang(e.target.value)}
          style={{ 
            padding: '8px', 
            borderRadius: '4px', 
            backgroundColor: '#333', 
            color: 'white', 
            border: '1px solid #555',
            cursor: 'pointer' 
          }}
        >
          {LANGUAGES.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>

      <Xwrapper>
        {/* 1. The Explanation Boxes */}
        {parts.textBlocks.map((text, index) => (
          <DraggableBox
            key={`box-${index}`}
            label={text}
            id={`box${index}`}
            color={highlightColors[index % highlightColors.length]}
            topoffset={index * 210}
            leftoffset={1000}
          />
        ))}

        {/* 2. The Code Body */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1 }}>
          {parts.codeBlocks.map((text, index) => (
            <div
              key={`p-${index}`}
              id={`codeSpan${index}`} // ID stays on the wrapper for Xarrow
              style={{
                margin: '10px 0',
                display: 'inline-block',
                width: 'fit-content'
              }}
            >
              <SyntaxHighlighter
                language={selectedLang}
                style={vscDarkPlus}
                PreTag="div"
                CodeTag="div"
                customStyle={{
                  margin: 0,
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  // Using your highlight color as a subtle border/glow
                  border: `4px solid ${highlightColors[index % highlightColors.length]}`,
                  backgroundColor: '#2d2d2d' 
                }}
              >
                {text}
              </SyntaxHighlighter>
            </div>
          ))}
        </div>

        {/* 3. The Arrows */}
        {parts.codeBlocks.map((_, index) => (
          <Xarrow
            key={`arrow-${index}`}
            start={`codeSpan${index}`}
            end={`box${index}`}
            startAnchor="middle"
            color={highlightColors[index % highlightColors.length]}
            strokeWidth={2}
            path="smooth"
          />
        ))}
      </Xwrapper>
    </div>
  );
};

export default App;