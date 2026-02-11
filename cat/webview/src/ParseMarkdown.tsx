export interface MarkdownPart {
  type: 'code' | 'text' | 'header';
  content: string;
  language?: string; // For code blocks
  level?: number;    // For headers (1-6)
}

export function parseMarkdown(markdown: string): {
  codeBlocks: string[];
  textBlocks: string[];
  headers: string[];
} {
  const lines = markdown.split('\n');
  const codeBlocks: string[] = [];
  const textBlocks: string[] = [];
  const headers: string[] = [];
  
  let currentText = '';
  let inCodeBlock = false;
  let currentCodeBlock = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for code block fence
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        codeBlocks.push(currentCodeBlock.trim());
        currentCodeBlock = '';
        inCodeBlock = false;
      } else {
        // Start of code block - save any accumulated text first
        if (currentText.trim()) {
          textBlocks.push(currentText.trim());
          currentText = '';
        }
        inCodeBlock = true;
      }
      continue;
    }
    
    // Inside code block
    if (inCodeBlock) {
      currentCodeBlock += line + '\n';
      continue;
    }
    
    // Check for headers
    if (line.trim().match(/^#{1,6}\s/)) {
      // Save any accumulated text first
      if (currentText.trim()) {
        textBlocks.push(currentText.trim());
        currentText = '';
      }
      headers.push(line.trim());
      continue;
    }
    
    // Regular text
    if (line.trim()) {
      currentText += line + '\n';
    } else if (currentText.trim()) {
      // Empty line - end current text block
      textBlocks.push(currentText.trim());
      currentText = '';
    }
  }
  
  // Don't forget remaining text
  if (currentText.trim()) {
    textBlocks.push(currentText.trim());
  }
  console.log({ codeBlocks, textBlocks, headers });
  return { codeBlocks, textBlocks, headers };
}