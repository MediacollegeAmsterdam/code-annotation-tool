export const testMarkdown = `### Step 1: Initialize Storage
The function starts by creating three empty arrays. These act as "buckets" to hold different parts of the markdown file: code snippets, descriptive text, and titles (headers).

\`\`\`typescript
  const codeBlocks: string[] = [];
  const textBlocks: string[] = [];
  const headers: string[] = [];
  
  let currentText = '';
  let inCodeBlock = false;
  let currentCodeBlock = '';
\`\`\`

---

### Step 2: Detect Code Blocks
The code loops through every line. When it finds a triple backtick (\`\`\`), it switches a "flag" called \`inCodeBlock\`. This tells the program whether the following lines are part of a programming snippet or just regular talking.

\`\`\`typescript
    if (line.trim().startsWith('\`\`\`')) {
      if (inCodeBlock) {
        codeBlocks.push(currentCodeBlock.trim());
        currentCodeBlock = '';
        inCodeBlock = false;
      } else {
        if (currentText.trim()) {
          textBlocks.push(currentText.trim());
          currentText = '';
        }
        inCodeBlock = true;
      }
      continue;
    }
\`\`\`

---

### Step 3: Identify Headers
The function uses a "Regular Expression" to look for lines starting with the # symbol. If it finds one, it realizes this is a title (like a Step or Chapter name) and stores it in the headers bucket.

\`\`\`typescript
    if (line.trim().match(/^#{1,6}\\s/)) {
      if (currentText.trim()) {
        textBlocks.push(currentText.trim());
        currentText = '';
      }
      headers.push(line.trim());
      continue;
    }
\`\`\`

---

### Step 4: Group Regular Text
If a line isn't a code block or a header, it's treated as normal text. The function collects these lines into a single block until it hits an empty line, which signals the end of a paragraph.

\`\`\`typescript
    if (line.trim()) {
      currentText += line + '\\n';
    } else if (currentText.trim()) {
      textBlocks.push(currentText.trim());
      currentText = '';
    }
\`\`\`

---

### Step 5: Return Parsed Content
After checking every line in the file, the function packages the three arrays into one final object. This makes it easy for the visual chart to grab exactly what it needs to display.

\`\`\`typescript
  if (currentText.trim()) {
    textBlocks.push(currentText.trim());
  }
  return { codeBlocks, textBlocks, headers };
\`\`\``;