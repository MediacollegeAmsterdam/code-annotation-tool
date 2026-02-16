## ADDED Requirements

### Requirement: Per-slide language binding
The webview SHALL support language binding for each slide, enabling syntax highlighting to match the language of the code presented on that slide.

#### Scenario: Slide receives language from extension
- **WHEN** the extension sends a new explanation with a language ID
- **THEN** the webview SHALL bind the language to the specific slide and use it for syntax highlighting

#### Scenario: Manual override per slide
- **WHEN** the user selects a different language for a slide
- **THEN** the webview SHALL update only that slide's language binding and apply the new language for syntax highlighting

#### Scenario: Fallback to default language
- **WHEN** no language ID is provided or the language is unsupported
- **THEN** the webview SHALL default to a reasonable language (e.g., 'typescript') for that slide

#### Scenario: Multiple slides with different languages
- **WHEN** multiple slides are present, each with its own language binding
- **THEN** the webview SHALL ensure syntax highlighting is accurate for each slide
