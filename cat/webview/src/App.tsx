"use client";

import React, { useState, useEffect } from 'react';
import { DraggableBox } from './DraggableBox';
import Xarrow from 'react-xarrows';
import { Xwrapper } from 'react-xarrows';
import { parse } from 'path';
import { parseMarkdown } from './ParseMarkdown';
import { mark } from 'framer-motion/m';
import { highlightColors } from './HighlightColors';
import { color } from 'framer-motion';

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

  useEffect(() => {
    // Get initial markdown
    const markdown = (window as any).markdownContent || '';
    console.log('Initial markdown:', markdown); // Debug
    const parsed = parseMarkdown(markdown);
    console.log('Parsed:', parsed); // Debug
    setParts(parsed);

    // Listen for updates - INSIDE useEffect!
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
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Code Explanation</h1>
      <Xwrapper>
        {/* 1. The Explanation Boxes */}
        {parts.textBlocks.map((text, index) => (
          <DraggableBox
            key={`box-${index}`}
            label={text}
            id={`box${index}`}
            color={highlightColors[index % highlightColors.length]}
            topoffset={index * 100} // Stagger the boxes vertically
            leftoffset={400} // Stagger the boxes horizontally
          />
        ))}

        {/* 2. The Code Body */}
        <div style={{ display: 'flex', flexDirection: 'column',  zIndex: 1}}>
          {parts.codeBlocks.map((text, index) => (
            <p
              key={`p-${index}`}
              style={{
                margin: '0',
                fontFamily: 'Consolas, Monaco, monospace',
                fontSize: '13px',
                lineHeight: '1.6',
                whiteSpace: 'pre',
                color: '#000',
              }}
            >
              <span
                id={`codeSpan${index}`} // Move the ID here!
                style={{
                  backgroundColor: highlightColors[index % highlightColors.length],
                  padding: '2px 4px',
                  borderRadius: '3px',
                  WebkitBoxDecorationBreak: 'clone',
                  boxDecorationBreak: 'clone',
                  display: 'inline-block', // Helps Xarrow find the center more reliably
                }}
              >
                {text}
              </span>
            </p>
          ))}
        </div>

        {/* 3. The Arrows */}
        {parts.codeBlocks.map((_, index) => (
          <Xarrow
            key={`arrow-${index}`}
            start={`codeSpan${index}`} // Pointing to the span ID 
            end={`box${index}`}
            startAnchor="middle" // This forces the arrow to the center of the span
            color={highlightColors[index % highlightColors.length]}
            strokeWidth={2}
            path="smooth" // Optional: makes the lines look a bit more "organic"
          />
        ))}
      </Xwrapper>
    </div>
  );
};

export default App;