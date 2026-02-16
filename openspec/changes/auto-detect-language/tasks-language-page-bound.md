## Tasks: Language Page Bound (Multi-Slide Support)

### 1. Webview State Refactor
- [ ] Refactor webview state to support multiple slides, each with its own language binding.
- [ ] Store language per slide (not just global `selectedLang`).
- [ ] Update slide navigation logic to ensure correct language is applied when switching slides.

### 2. Extension Message Protocol
- [ ] Update extension to send language ID for each explanation/slide, not just initial load.
- [ ] Ensure `newExplanation` messages include language for the specific slide.

### 3. Webview UI Changes
- [ ] Remove global language dropdown; add per-slide language override (dropdown or inline selector).
- [ ] Display language selector for each slide, defaulting to detected language but allowing manual override.

### 4. Syntax Highlighting Logic
- [ ] Update SyntaxHighlighter to use per-slide language.
- [ ] Ensure manual override updates only the relevant slide's language.

### 5. Verification
- [ ] Test with multiple slides, each with different languages (e.g., TypeScript, Python, C++).
- [ ] Test manual override for individual slides.
- [ ] Test fallback/default behavior for slides with unsupported or missing language.

---

This task list covers refactoring the webview and extension to support language binding per slide, enabling multi-language explanations in a single session. Each slide should remember its own language, allow manual override, and ensure syntax highlighting is accurate for all slides.