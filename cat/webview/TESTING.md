# Testing Setup

## Installation

To run the tests, first install the testing dependencies:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

## Running Tests

Add the following to `package.json` scripts section:

```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:coverage": "vitest --coverage"
```

Then run:

```bash
npm test
```

## Test Coverage

The test suite covers:
- Explanation position persistence across page swaps
- Automatic alignment for newly generated explanations
- Position restoration from localStorage
- Alignment logic (default vs persisted positions)

## Manual Testing

To manually test the functionality:

1. Build the webview: `npm run build`
2. Run the VS Code extension in debug mode (F5)
3. Select some code and run "Explain Code" command
4. Drag explanation boxes to custom positions
5. Generate another explanation (new page)
6. Navigate back to the first page
7. Verify that explanation boxes are in their saved positions
8. Close and reopen the webview
9. Verify positions persist across sessions
