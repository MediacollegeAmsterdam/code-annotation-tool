## Why

Currently, when users queue multiple code explanation requests rapidly, the extension sometimes drops requests or applies incorrect language settings to slides. This happens because requests are processed concurrently without a proper queueing mechanism, causing race conditions in state management.

## What Changes

- Implement a request queue to serialize explanation generation
- Track request state (pending, in-progress, completed) with associated metadata
- Ensure each explanation maintains its correct languageId throughout the process
- Provide better user feedback showing queue status and progress
- Handle concurrent requests gracefully without dropping any

## Capabilities

### New Capabilities
- `explanation-request-queue`: Queue and serialize explanation generation requests to prevent race conditions and ensure correct language assignment

### Modified Capabilities

## Impact

- Affected code: Extension command handler, webview message passing, explanation generation flow
- APIs: Command registration, webview postMessage interface
- Dependencies: None
- Systems: VS Code extension activation, webview communication
