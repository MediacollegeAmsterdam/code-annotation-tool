## Why

Currently, explanations are automatically aligned with their corresponding code blocks during generation. However, when a user swaps pages, the explanations do not persist their positions, causing them to become misaligned. This disrupts the user experience and reduces the clarity of code review or annotation workflows.

## What Changes

- Persist the position of explanations when the user swaps pages
- Ensure explanations remain automatically aligned with their code blocks on generation
- Update storage and retrieval logic for explanation positions
- UI/UX improvements for explanation alignment and persistence

## Capabilities

### New Capabilities
- `explanation-position-persistence`: Persists explanation positions across page swaps, ensuring alignment is maintained

### Modified Capabilities
- `explanation-alignment`: Enhance to support persistent alignment after page swaps

## Impact

- Affected code: Webview UI logic, state management for explanations, storage/retrieval of explanation positions
- APIs: Any APIs responsible for saving/loading explanation positions
- Dependencies: None expected, unless new storage mechanism is introduced
- Systems: Webview, annotation workflow
