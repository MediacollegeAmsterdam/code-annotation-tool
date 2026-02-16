## Why

Users currently need to manually select the programming language from a dropdown for syntax highlighting, even though VS Code already knows the language of the active file. This requires an extra step and can lead to mismatched highlighting if the wrong language is selected.

## What Changes

- Pass the active editor's language ID from the extension to the webview when generating explanations.
- Update the webview to receive and use the detected language for syntax highlighting.
- Remove or make optional the manual language selection dropdown.

## Capabilities

### New Capabilities
- `language-auto-detection`: Automatic language identification from VS Code editor and propagation to the webview for syntax highlighting.

### Modified Capabilities
<!-- No existing capability specs are affected -->

## Impact

- `extension.ts`: Needs to capture `editor.document.languageId` and include it in messages to the webview.
- `App.tsx`: Needs to receive language data from messages, update state accordingly, and potentially remove/hide the language dropdown.
- UX: Improved workflow with one less manual step, more accurate syntax highlighting by default.
