## ADDED Requirements

### Requirement: Persist explanation positions across page swaps
The system SHALL persist the position of each explanation so that, after a page swap, explanations remain aligned with their corresponding code blocks.

#### Scenario: User swaps page and returns
- **WHEN** the user navigates away from a page and then returns
- **THEN** all explanations SHALL appear in the same positions as before the swap

### Requirement: Automatic alignment on generation
The system SHALL automatically align explanations with their code blocks when explanations are generated, unless a persisted position exists.

#### Scenario: Generate explanations for code
- **WHEN** explanations are generated for a code block
- **THEN** explanations SHALL be aligned with the code block, or with the persisted position if available
