## MODIFIED Requirements

### Requirement: Explanations are aligned with code blocks
The system SHALL align explanations with their corresponding code blocks both during generation and after page swaps, using persisted positions if available.

#### Scenario: User swaps page and returns
- **WHEN** the user navigates away from a page and then returns
- **THEN** explanations SHALL remain aligned with their code blocks using the persisted positions

#### Scenario: Generate explanations for code
- **WHEN** explanations are generated for a code block
- **THEN** explanations SHALL be aligned with the code block, or with the persisted position if available
