## Context

The current implementation handles explanation requests immediately as they arrive, without any queueing mechanism. When users trigger multiple "Explain Code" commands quickly, concurrent async LLM calls can complete in any order, leading to:
- Missed requests when webview state updates conflict
- Wrong languageId applied to slides due to race conditions in closure capture
- No user feedback about pending requests

The extension uses a simple command handler that spawns async operations without coordination.

## Goals / Non-Goals

**Goals:**
- Queue explanation requests to serialize LLM calls
- Preserve correct languageId for each request throughout its lifecycle
- Provide clear user feedback on queue status (e.g., "Generating 2/5...")
- Ensure all user-requested explanations are processed without drops
- Maintain backward compatibility with existing webview

**Non-Goals:**
- Cancelling in-flight LLM requests (VS Code Language Model API doesn't support this well)
- Persisting queue across extension reloads
- Batching multiple requests into a single LLM call

## Decisions

### Decision 1: In-Memory FIFO Queue
**Choice**: Implement a simple array-based FIFO queue in the extension
**Rationale**: Keeps state simple, easy to reason about, sufficient for single-user scenarios
**Alternatives Considered**:
- Event emitter pattern: Over-engineered for this use case
- VS Code task queue API: Not designed for this purpose

### Decision 2: One Request Processor
**Choice**: Single async processor that dequeues and processes requests sequentially
**Rationale**: Prevents race conditions entirely, simplifies state management
**Alternatives Considered**:
- Parallel processing with locks: Adds complexity without clear benefit
- Worker-based approach: Overkill for this problem

### Decision 3: Request Object Structure
**Choice**: Store `{ code: string, languageId: string, timestamp: number }` per request
**Rationale**: Captures all necessary context at enqueue time, avoiding closure issues
**Alternatives Considered**:
- Just storing selection ranges: Would require re-reading editor state, which may change
- Including editor reference: References can become stale

### Decision 4: Progress Notification Enhancement
**Choice**: Show "Generating explanation X/Y..." with current/total count
**Rationale**: Clear feedback about queue status without overwhelming the user
**Alternatives Considered**:
- Individual notifications per request: Too noisy
- Status bar item: Less discoverable, adds persistent UI clutter

## Risks / Trade-offs

- [Risk] Slow LLM responses block the queue → Mitigation: Show queue position so users understand why they're waiting
- [Risk] Queue grows unbounded if LLM is very slow → Mitigation: Could add max queue size (10) with user warning
- [Trade-off] Sequential processing is slower than parallel → Acceptable for correctness and simplicity
- [Risk] Extension reload loses queued requests → Mitigation: Document this behavior; alternative would add significant complexity

## Migration Plan

1. Add queue data structure and processor to extension
2. Update command handler to enqueue instead of process directly
3. Update progress notification to show queue status
4. Test with rapid-fire requests (5+ in quick succession)
5. Rollback: Revert to direct processing if issues arise

## Open Questions

- Should we add a maximum queue size? If so, what limit? (Proposal: 10 requests)
- Should we add a "Cancel All" button to the progress notification? (Tentatively: No, adds complexity)
