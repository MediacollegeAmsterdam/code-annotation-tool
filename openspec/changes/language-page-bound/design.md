## Context

The current webview implementation binds syntax highlighting to a single language for all slides, controlled by a global dropdown. This restricts multi-language presentations and requires manual switching. The extension sends language data only for the initial load or explanation, not per slide.

## Goals / Non-Goals

**Goals:**
- Support per-slide language binding for syntax highlighting
- Allow manual override for each slide
- Update extension to send language ID for each explanation/slide
- Remove global dropdown; add per-slide selector

**Non-Goals:**
- Supporting multiple languages within a single code block
- Mapping VS Code language IDs to Prism.js (use direct mapping unless needed)

## Decisions

- Refactor webview state: Store language per slide, not globally
- Update extension message protocol: Send language for each explanation/slide
- UI: Replace global dropdown with per-slide selector
- SyntaxHighlighter: Use slide-specific language
- Manual override: Allow user to change language for each slide

## Risks / Trade-offs

- [Risk] UI complexity increases with per-slide selectors → [Mitigation] Keep selector simple, default to detected language
- [Risk] Language mapping mismatch between VS Code and Prism.js → [Mitigation] Use direct mapping, add fallback/default
- [Risk] Migration may break existing slides → [Mitigation] Test with legacy and new slides

## Migration Plan

- Refactor state and UI in App.tsx
- Update extension.ts to send language per explanation
- Test with multiple slides and languages

## Open Questions

- Should manual override persist across sessions?
- How to handle unsupported languages gracefully?
