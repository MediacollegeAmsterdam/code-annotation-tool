## Context

Currently, draggable box positions are not persisted when navigating between slides. This results in lost custom layouts and inconsistent annotation experiences. The state for box positions is managed in memory and reset on slide change.

## Goals / Non-Goals

**Goals:**
- Persist draggable box positions for each slide
- Restore positions when slides are revisited
- Integrate with existing slide navigation and annotation logic

**Non-Goals:**
- Persisting other UI state unrelated to box positions
- Supporting cross-session persistence (unless requested)

## Decisions

- Store box positions in a per-slide state object
- Update navigation logic to save and restore positions
- Use React state or context for in-memory persistence; consider localStorage for cross-session if needed
- Ensure compatibility with DraggableBox component

## Risks / Trade-offs

- [Risk] Increased state complexity → [Mitigation] Keep per-slide state isolated and well-documented
- [Risk] Performance impact with many slides/boxes → [Mitigation] Optimize state updates and avoid unnecessary renders
- [Risk] Migration may break existing layouts → [Mitigation] Test with legacy slides and provide fallback

## Migration Plan

- Refactor App.tsx to manage box positions per slide
- Update DraggableBox.tsx if needed
- Test navigation and persistence

## Open Questions

- Should box positions persist across browser sessions?
- How to handle deleted slides and orphaned box positions?
