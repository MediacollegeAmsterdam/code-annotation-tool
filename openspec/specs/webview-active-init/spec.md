## ADDED Requirements

### Requirement: Webview opens in active column
The extension SHALL initialize the explanation webview in the currently active editor group (active column).

#### Scenario: Opening webview for the first time
- **WHEN** the "Explain Code" command is executed and no webview exists
- **THEN** the webview SHALL be created and displayed in `vscode.ViewColumn.Active`

#### Scenario: Re-opening or revealing webview
- **WHEN** the "Explain Code" command is executed and a webview already exists
- **THEN** the webview SHALL be revealed in its current column if it matches `Active`, or moved to `Active` if the user is in a different group.
