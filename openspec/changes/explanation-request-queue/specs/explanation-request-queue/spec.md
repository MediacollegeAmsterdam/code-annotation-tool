## ADDED Requirements

### Requirement: Requests SHALL be queued in order
The system SHALL queue explanation generation requests and process them in FIFO order, ensuring no requests are dropped.

#### Scenario: Multiple rapid requests
- **WHEN** user triggers 5 explanation requests in quick succession
- **THEN** all 5 requests SHALL be queued and processed sequentially in the order received

#### Scenario: Request added while processing
- **WHEN** a request is being processed and user triggers another request
- **THEN** the new request SHALL be added to the queue and processed after the current one completes

### Requirement: Each request SHALL preserve its languageId
The system SHALL capture and preserve the languageId at the time of request creation, ensuring the correct language is applied to the generated explanation.

#### Scenario: Mixed language requests
- **WHEN** user requests explanations for Python code, then TypeScript code, then JavaScript code
- **THEN** each explanation SHALL have the correct language highlighting applied regardless of processing order

#### Scenario: Editor language changes during queue
- **WHEN** a request is queued with languageId "python" and user switches to a different file before processing
- **THEN** the generated explanation SHALL still use "python" as captured at queue time

### Requirement: Progress feedback SHALL show queue status
The system SHALL display progress notifications that indicate current position and total queue size during explanation generation.

#### Scenario: Single request in queue
- **WHEN** user triggers one explanation request
- **THEN** progress notification SHALL show "Generating Visual Explanation..."

#### Scenario: Multiple requests in queue
- **WHEN** user has queued 3 requests and the first is processing
- **THEN** progress notification SHALL show "Generating explanation 1/3..."

#### Scenario: Queue progression
- **WHEN** the first request completes and second begins processing
- **THEN** progress notification SHALL update to show "Generating explanation 2/3..."

### Requirement: Queue SHALL process requests without blocking UI
The system SHALL process queued requests asynchronously without blocking the VS Code UI.

#### Scenario: User continues editing while queue processes
- **WHEN** explanation requests are being processed from the queue
- **THEN** user SHALL be able to continue editing code, running commands, and using VS Code normally
