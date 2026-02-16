## Why

Currently, when users change slides in the code annotation tool, the positions of draggable boxes are reset or lost. This disrupts the workflow and makes it difficult to maintain consistent annotations across slides. Persisting box positions will improve usability and allow users to customize layouts for each slide.

## What Changes

- Store draggable box positions for each slide
- Restore box positions when navigating between slides
- Update state management to persist and retrieve box positions
- Ensure compatibility with existing slide navigation and annotation features

## Capabilities

### New Capabilities
- `persist-box-positions`: Save and restore draggable box positions per slide

### Modified Capabilities
<!-- No existing capability specs are affected -->

## Impact

- `App.tsx`: State management for box positions, logic for saving/restoring
- `DraggableBox.tsx`: May require updates to support position persistence
- UX: Improved annotation workflow, consistent layouts across slides
