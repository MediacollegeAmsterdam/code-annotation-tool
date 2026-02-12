"use client";

import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// You can choose different themes like vscDarkPlus, atomDark, dracula, etc.
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Xwrapper } from 'react-xarrows';
import { DraggableBox } from './DraggableBox';
import { parseMarkdown } from './ParseMarkdown';
import { highlightColors } from './HighlightColors';

// Most used programming languages for the dropdown
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
  const [parts, setParts] = useState({ codeBlocks: [], textBlocks: [], headers: [] } as { codeBlocks: string[], textBlocks: string[], headers: string[] });
  const [selectedLang, setSelectedLang] = useState('typescript');

  useEffect(() => {
    const markdown = (window as any).markdownContent || '';
    setParts(parseMarkdown(markdown));

    const handleMessage = (event: MessageEvent) => {
      const { type, content } = event.data;
      if (type === 'newExplanation') {
        setParts(parseMarkdown(content));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#1e1e1e', minHeight: '100vh', color: 'white' }}>
      
      {/* Language Selector UI */}
      <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label htmlFor="lang-select">Highlighting Language:</label>
        <select 
          id="lang-select"
          value={selectedLang} 
          onChange={(e) => setSelectedLang(e.target.value)}
          style={{ padding: '5px 10px', borderRadius: '4px', backgroundColor: '#333', color: 'white', border: '1px solid #555' }}
        >
          {LANGUAGES.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>

      <Xwrapper>
        {/* The Explanation Boxes */}
        {parts.textBlocks.map((text, index) => (
          <DraggableBox
            key={`box-${index}`}
            label={text}
            id={`box${index}`}
            color={highlightColors[index % highlightColors.length]}
            topoffset={index * 280}
            leftoffset={1000}
          />
        ))}

        {/* The Code Body using SyntaxHighlighter */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1, gap: '10px' }}>
          {parts.codeBlocks.map((code, index) => (
            <div key={`p-${index}`} id={`codeSpan${index}`} style={{ display: 'inline-block' }}>
              <SyntaxHighlighter
                language={selectedLang}
                style={vscDarkPlus}
                // REMOVE pre AND code TAGS:
                PreTag="div" 
                CodeTag="div"
                customStyle={{
                  margin: 0,
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  backgroundColor: highlightColors[index % highlightColors.length] + '22', // 22 adds subtle transparency
                  borderLeft: `4px solid ${highlightColors[index % highlightColors.length]}`,
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          ))}
        </div>
        
        {/* Arrows logic remains the same */}
      </Xwrapper>
    </div>
  );
}

export default App;