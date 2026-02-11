"use client";

import React, { useState, useEffect } from 'react'; 
import { DraggableBox } from './DraggableBox';
import Xarrow from 'react-xarrows';
import { Xwrapper } from 'react-xarrows';
import { parse } from 'path';
import { parseMarkdown } from './ParseMarkdown';
import { mark } from 'framer-motion/m';

function App() {
  let parsedParts: any[] = [];
  const [markdown, setMarkdown] = useState('');
  useEffect(() => {
    // Get initial markdown from VS Code
    const initialMarkdown = (window as any).markdownContent || '';
    setMarkdown(initialMarkdown);
    parsedParts = [];
    parsedParts.push(...parseMarkdown(initialMarkdown).textBlocks);
    parsedParts.push(...parseMarkdown(initialMarkdown).codeBlocks);
    parsedParts.push(...parseMarkdown(initialMarkdown).headers);
    console.log(parsedParts);
    

    // Listen for updates
    window.addEventListener('message', (event) => {
      const { type, content } = event.data;
      if (type === 'newExplanation') {
        setMarkdown(content);
        parsedParts = [];
        parsedParts.push(...parseMarkdown(content).textBlocks);
        parsedParts.push(...parseMarkdown(content).codeBlocks);
        parsedParts.push(...parseMarkdown(content).headers);
        console.log(parsedParts);
      }
    });
  }, []);

  return (
    <div style={{ padding: '20px', color: 'white', fontSize: '24px' }}>
      <h1>Code Explanation</h1>
        <Xwrapper>
            <DraggableBox label="box 2" id="box2" />
            <p id="box1" style={{width:"fit-content"}}>code here</p>
            <Xarrow start="box1" end="box2" color="white" />
        </Xwrapper>
    </div>
  );
}

export default App;