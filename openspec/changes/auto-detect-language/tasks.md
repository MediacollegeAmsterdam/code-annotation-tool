## 1. Extension Changes

- [x] 1.1 Update `explainCodeInMarkdown` function in `extension.ts` to accept language ID parameter.
- [x] 1.2 Capture `editor.document.languageId` in `cat.explainCode` command handler.
- [x] 1.3 Pass language ID to `showExplanationWebview` function when creating webview.
- [x] 1.4 Update initial content injection to include language field alongside markdown content.
- [x] 1.5 Update `newExplanation` message to include language field alongside content.

## 2. Webview Changes

- [x] 2.1 Update initial load handler in `App.tsx` to read language from injected data.
- [x] 2.2 Update message handler to extract language from `newExplanation` messages.
- [x] 2.3 Set `selectedLang` state based on detected language (with fallback to 'typescript').
- [x] 2.4 Ensure language state updates when new explanations are added.

## 3. Verification

- [x] 3.1 Test with TypeScript file - verify correct language detection.
- [x] 3.2 Test with Python file - verify correct language detection.
- [x] 3.3 Test manual dropdown override - verify it still works.
- [x] 3.4 Test with unsupported language - verify fallback to default.
