## Why

Code text inside the SyntaxHighlighter component currently displays with a light grey background, creating a visual inconsistency that makes the code appear misaligned or improperly styled against the darker codeblock background.

## What Changes

- Update the SyntaxHighlighter styling in `App.tsx` to ensure code text has no conflicting background color or matches the codeblock's dark background.

## Capabilities

### New Capabilities
<!-- No new capabilities - this is a styling fix -->

### Modified Capabilities
<!-- No existing capability specs are affected - this is a visual/styling improvement -->

## Impact

- `App.tsx`: SyntaxHighlighter `customStyle` property needs adjustment to ensure proper background color rendering.
- UX: Improved visual consistency in code presentation.
