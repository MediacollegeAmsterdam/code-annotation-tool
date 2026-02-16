## ADDED Requirements

### Requirement: Extension captures editor language
The extension SHALL capture the active editor's language ID when generating code explanations.

#### Scenario: Language detected from active editor
- **WHEN** the "Explain Code" command is executed on a file with a known language ID
- **THEN** the extension SHALL retrieve the `editor.document.languageId` property

#### Scenario: Language passed to webview on initial load
- **WHEN** the webview is created for the first time
- **THEN** the extension SHALL include the detected language ID in the initial content injection

#### Scenario: Language passed to webview on subsequent explanations
- **WHEN** a new explanation is generated after the webview already exists
- **THEN** the extension SHALL include the detected language ID in the `newExplanation` message

### Requirement: Webview applies detected language
The webview SHALL use the language ID provided by the extension for syntax highlighting.

#### Scenario: Using detected language for highlighting
- **WHEN** the webview receives a language ID from the extension
- **THEN** the webview SHALL apply that language to the SyntaxHighlighter component

#### Scenario: Fallback to default language
- **WHEN** no language ID is provided or the language is unrecognized
- **THEN** the webview SHALL default to a reasonable language (e.g., 'typescript')

#### Scenario: Manual override still available
- **WHEN** the user selects a different language from the dropdown
- **THEN** the webview SHALL allow manual override of the auto-detected language
