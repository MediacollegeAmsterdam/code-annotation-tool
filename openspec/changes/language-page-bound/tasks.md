## 1. Webview Refactor

 - [x] 1.1 Refactor webview state to store language per slide
 - [x] 1.2 Update slide navigation logic to apply correct language
 - [x] 1.3 Remove global language dropdown; add per-slide selector

## 2. Extension Protocol Update

- [ ] 2.1 Update extension to send language ID for each explanation/slide
- [ ] 2.2 Ensure newExplanation messages include language for each slide

## 3. Syntax Highlighting Logic

 - [x] 3.1 Update SyntaxHighlighter to use per-slide language
 - [x] 3.2 Ensure manual override updates only relevant slide

## 4. Verification

- [ ] 4.1 Test with multiple slides, each with different languages
- [ ] 4.2 Test manual override for individual slides
- [ ] 4.3 Test fallback/default for unsupported languages
