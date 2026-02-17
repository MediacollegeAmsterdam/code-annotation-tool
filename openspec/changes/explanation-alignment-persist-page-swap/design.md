## Context

The current system aligns explanations with code blocks during generation, but loses this alignment when users swap pages. This results in explanations becoming misaligned, which disrupts the review and annotation workflow. The goal is to persist explanation positions across page swaps while maintaining automatic alignment on generation.

## Goals / Non-Goals

**Goals:**
- Persist explanation positions when users swap pages
- Maintain automatic alignment of explanations with code blocks on generation
- Improve UI/UX for explanation alignment and persistence

**Non-Goals:**
- Overhauling the entire annotation system
- Supporting explanation alignment for non-code content

## Decisions
- Use local storage or a persistent state mechanism to save explanation positions per page
- On page swap, restore explanation positions from storage
- Continue using the current alignment logic on generation, but update it to respect persisted positions if available
- UI will provide feedback or controls for users to manually adjust explanation positions if needed

## Risks / Trade-offs
- [Risk] Data loss if storage fails → Mitigation: Use robust storage APIs and fallback mechanisms
- [Risk] Increased complexity in state management → Mitigation: Modularize state logic and add tests
- [Risk] Potential performance impact on large documents → Mitigation: Optimize storage and retrieval logic

## Migration Plan
- Implement storage logic for explanation positions
- Update alignment logic to check for persisted positions
- Test across page swaps and document reloads
- Rollback: Revert to previous alignment logic if issues arise

## Open Questions
- Should explanation positions be synced across devices or only local?
- What is the best storage mechanism for cross-platform support?
