## ADDED Requirements

### Requirement: Persist draggable box positions per slide
The system SHALL save the positions of all draggable boxes for each slide and restore them when the slide is revisited.

#### Scenario: Save positions on drag
- **WHEN** a draggable box is moved
- **THEN** the system SHALL update the saved position for that box in the current slide

#### Scenario: Restore positions on slide change
- **WHEN** the user navigates to a slide
- **THEN** the system SHALL restore all draggable box positions for that slide

#### Scenario: Remove positions on slide delete
- **WHEN** a slide is deleted
- **THEN** the system SHALL remove all saved box positions for that slide

#### Scenario: Fallback to default positions
- **WHEN** no saved positions exist for a slide
- **THEN** the system SHALL use default box positions
