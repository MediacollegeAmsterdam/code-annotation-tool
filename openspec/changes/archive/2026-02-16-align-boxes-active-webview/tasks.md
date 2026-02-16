## 1. Extension Configuration

- [x] 1.1 Update `showExplanationWebview` in `cat/src/extension.ts` to use `vscode.ViewColumn.Active`.
- [x] 1.2 Update `currentPanel.reveal` call in `cat.explainCode` command to ensure it focuses the active column.

## 2. Webview Alignment Logic

- [x] 2.1 Introduce `useLayoutEffect` in `App.tsx` to handle codeblock measurement.
- [x] 2.2 Update `DraggableBox` components in `App.tsx` to use dynamic `topoffset` based on codeblock positions.
- [x] 2.3 Ensure boxes re-align on window resize events within the webview.

## 3. Verification

- [x] 3.1 Verify webview opens in the active editor group.
- [x] 3.2 Verify annotation boxes align vertically with their corresponding codeblocks.
- [x] 3.3 Verify boxes maintain alignment after resizing the webview.
