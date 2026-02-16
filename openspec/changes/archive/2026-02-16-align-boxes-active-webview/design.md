## Context

The current `cat` (Code Annotation Tool) extension allows users to annotate code with draggable boxes. However, these boxes must be positioned manually every time. Additionally, the webview defaults to a "Beside" column, which can be disruptive if the user wants to stay focused in their current editor group.

## Goals / Non-Goals

**Goals:**
- Automatically align annotation boxes vertically with their corresponding codeblocks in the webview.
- Initialize the webview in the active editor group for a more seamless experience.
- Ensure boxes remain aligned even if the window is resized.

**Non-Goals:**
- Absolute pinning: Users should still be able to drag boxes if they wish to adjust them slightly (though they will auto-align initially).
- Complex custom layout engines.

## Decisions

### Decision: Dynamic Offset Calculation via `useLayoutEffect`
- **Rationale**: Measuring DOM elements (`codeSpan${index}`) requires the components to be rendered. `useLayoutEffect` allows us to measure before the browser paints, preventing "flicker" during alignment.
- **Alternatives**: 
  - CSS Flexbox/Grid: Difficult to implement with `react-xarrows` which relies on absolute positioning for coordinates.
  - Hardcoded offsets: Current approach, fails when codeblock height varies.

### Decision: Update `vscode.ViewColumn.Active` in `extension.ts`
- **Rationale**: Provides a direct way to open the webview in the user's current context.
- **Alternatives**: 
  - Configurable setting: Better for long-term, but `Active` is a better default for this specific "Explain Code" workflow.

## Risks / Trade-offs

- **Risk**: Race conditions between codeblock rendering and measurement.
  - **Mitigation**: Use `useLayoutEffect` and potentially a small delay or ResizeObserver if content is dynamic.
- **Risk**: Overlapping boxes if codeblocks are too close.
  - **Mitigation**: Add a minimum vertical gap between boxes if alignment causes collisions (v2).
