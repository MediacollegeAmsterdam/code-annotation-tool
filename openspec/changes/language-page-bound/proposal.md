## Why

Currently, the webview only supports a single language binding for syntax highlighting across all slides. This limits the ability to present multi-language explanations, which is increasingly needed for code walkthroughs, tutorials, and cross-language comparisons. Making the language binding page-bound enables each slide to have its own language, improving accuracy and flexibility.

## What Changes

- Refactor webview state to support language binding per slide.
- Update extension and message protocol to send language ID for each explanation/slide.
- Remove global language dropdown; add per-slide language override.
- Ensure syntax highlighting uses the correct language for each slide.

## Capabilities

### New Capabilities
- `page-bound-language`: Each slide can have its own language binding for syntax highlighting, supporting multi-language explanations.

### Modified Capabilities
<!-- No existing capability specs are affected -->

## Impact

- `App.tsx`: Refactor state and UI for per-slide language binding, update SyntaxHighlighter logic.
- `extension.ts`: Update message protocol to send language per explanation.
- UX: More accurate, flexible presentations; supports multi-language workflows.
