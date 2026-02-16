## Why

Draggable annotation boxes currently require manual placement, which makes it difficult to maintain context with specific code sections. Furthermore, opening the webview in a side column by default may not match the user's preferred layout for immediate interaction.

## What Changes

- Implement automatic vertical alignment for `DraggableBox` components so they appear adjacent to the codeblocks they annotate.
- Update webview initialization to open within the active editor group (active window) rather than a separate column.

## Capabilities

### New Capabilities
- `box-auto-alignment`: Automatic positioning logic to align draggable boxes with specific codeblock DOM elements.
- `webview-active-init`: Logic to ensure the webview initializes in the active editor column and receives focus.

### Modified Capabilities
<!-- No existing specs yet -->

## Impact

- `App.tsx`: Layout logic needs to handle dynamic positioning.
- `extension.ts`: Webview creation parameters (`viewColumn`) need update.
- UX: Improved layout consistency and faster access to annotations.
