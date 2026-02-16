## Context

The webview currently requires manual language selection via a dropdown, even though VS Code has language information about the active editor. The extension and webview communicate via messages, and we need to extend this to include language data.

Current message flow:
- Initial load: markdown content injected via `window.markdownContent`
- Subsequent loads: `{type: 'newExplanation', content: markdown}` messages

## Goals / Non-Goals

**Goals:**
- Automatically detect and pass language ID from VS Code editor to webview
- Update syntax highlighting to use detected language
- Maintain ability for users to manually override if needed

**Non-Goals:**
- Removing the dropdown entirely (keep it for manual override)
- Language mapping/translation (use VS Code language IDs directly)
- Supporting multiple languages per explanation

## Decisions

### Decision: Extend message protocol to include language
- **Rationale**: The existing message passing infrastructure can easily accommodate additional metadata. Adding a `language` field to both initial injection and `newExplanation` messages is minimal and non-breaking.
- **Alternatives**:
  - Separate message type for language: More complex, unnecessary overhead.
  - Query VS Code API from webview: Not possible due to security restrictions.

### Decision: Use VS Code language ID directly
- **Rationale**: VS Code language IDs (e.g., 'typescript', 'python', 'cpp') generally match Prism.js language identifiers. Direct usage avoids mapping overhead.
- **Alternatives**:
  - Create mapping table: Adds complexity. Can be added later if needed for edge cases.

### Decision: Keep dropdown, but set detected language as default
- **Rationale**: Users may want to override for multi-language code snippets or when detection is wrong. Keeping the dropdown provides flexibility.
- **Alternatives**:
  - Remove dropdown entirely: Breaks UX for edge cases.
  - Hide dropdown by default: Adds UI complexity.

## Risks / Trade-offs

- **Risk**: Language ID mismatch between VS Code and Prism.js
  - **Mitigation**: Use fallback to 'typescript'. Add mapping table in future if needed.
- **Risk**: Users don't notice the auto-detected language is wrong
  - **Mitigation**: Keep dropdown visible so users can easily verify and change.
