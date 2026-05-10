# Changelog

## v0.1.0

ZhCode Bridge v0.1.0 is the first usable prototype release.

### Core

- Added `.zhjs` language support for VS Code.
- Added a structured Chinese entry word table for learning real JavaScript.
- Added the `.zhjs` to standard `.js` transform core.
- Added JavaScript generation from `.zhjs`.
- Added a command to run generated `.js` files.
- Added a command to preview generated JavaScript.
- Added Output Channel support.

### Learning Assistance

- Added Hover explanations from the entry table.
- Added Completion suggestions from the entry table.
- Added basic Chinese explanations for common JavaScript errors.
- Added examples for score, string / array, JSON / math, and error handling.

### Quality

- Added scanner, transform, generate, diagnostics, editor experience, and examples tests.
- Added actual Node.js execution tests for generated examples.
- Added VSIX packaging support.
- Added P-stage, Beta-stage, and pre-release logs.

### Known Limitations

- Template string `${...}` expressions are not transformed in v0.1.0.
- ZhCode Bridge is not a new programming language.
- `.zhjs` files are not executed directly; generated `.js` files are executed.
- Marketplace publishing is not included in this release.
