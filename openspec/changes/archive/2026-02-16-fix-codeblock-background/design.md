## Context

The SyntaxHighlighter component from `react-syntax-highlighter` applies its own inline styles to code elements, which can include background colors that conflict with the intended visual appearance. Currently, code text appears with a light grey background that doesn't match the dark codeblock container.

## Goals / Non-Goals

**Goals:**
- Ensure code text background matches or blends with the codeblock's dark background (#1a1a1a).
- Maintain syntax highlighting colors and readability.

**Non-Goals:**
- Complete redesign of the syntax highlighting theme.
- Changes to the codeblock container styling or borders.

## Decisions

### Decision: Override inline code background via customStyle
- **Rationale**: The `customStyle` prop on SyntaxHighlighter allows direct CSS overrides. We can ensure code background is explicitly transparent or matches the container background.
- **Alternatives**: 
  - CSS global overrides: Would be less targeted and might affect other components.
  - Theme customization: More complex and unnecessary for this simple fix.

### Decision: Use transparent background for code elements
- **Rationale**: Setting `background: 'transparent'` ensures code inherits the darker background from the container, eliminating the grey overlay.
- **Alternatives**:
  - Set explicit dark color: Works but transparent is more maintainable if container style changes.

## Risks / Trade-offs

- **Risk**: Other inline styles from the theme might still apply.
  - **Mitigation**: Test thoroughly and add additional CSS overrides if needed.
