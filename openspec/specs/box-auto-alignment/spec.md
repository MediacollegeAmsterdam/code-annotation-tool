## ADDED Requirements

### Requirement: Boxes align with codeblocks
The system SHALL automatically calculate the vertical offset for each `DraggableBox` so that its top edge aligns with the top edge of the corresponding codeblock in the markdown preview.

#### Scenario: Alignment on initial render
- **WHEN** the webview is rendered with existing boxes and codeblocks
- **THEN** each box SHALL be positioned at the same vertical offset as its associated codeblock

#### Scenario: Alignment on window resize
- **WHEN** the webview window is resized
- **THEN** boxes SHALL recalculate their positions to maintain alignment with their codeblocks

#### Scenario: Alignment on manual box movements
- **WHEN** a box is moved manually
- **THEN** it SHOULD allow manual positioning but SHALL provide a mechanism or trigger to re-align with the codeblock if requested or automatically after release.
