# ZhCode Bridge v0.1.0

Use Chinese entry words to learn real JavaScript.  
用中文入口词学习真实 JavaScript。

ZhCode Bridge is not a Chinese programming language. It is a VS Code learning bridge that turns `.zhjs` files into standard `.js` files.

## Who This Is For

This release is for Chinese-native programming beginners who want a gentler entry point into real JavaScript syntax while keeping JavaScript symbols, structure, and runtime behavior.

## What's Included

- `.zhjs` language support in VS Code.
- Chinese entry words for real JavaScript concepts.
- `.zhjs` to `.js` generation.
- Run generated JavaScript with Node.js.
- Preview generated JavaScript.
- Hover explanations.
- Completion suggestions.
- Basic Chinese explanations for common JavaScript errors.
- Examples and automated tests.

## Install From VSIX

1. Download `zh-code-bridge-0.1.0.vsix`.
2. Open VS Code.
3. Run `Extensions: Install from VSIX...`.
4. Select the downloaded `.vsix`.
5. Open a `.zhjs` file.

## Try It

Open:

```text
examples/score.zhjs
```

Run:

```text
ZhCode: Generate JavaScript
ZhCode: Run Current File
ZhCode: Show Generated JavaScript
```

## Core Rules

- ZhCode Bridge is not a new Chinese programming language.
- `.zhjs` files are not executed directly.
- The generated `.js` file is what actually runs.
- JavaScript symbols stay unchanged.
- JavaScript syntax structure stays unchanged.

## Known Limitations

- Template string `${...}` expressions are not transformed in v0.1.0.
- This release is not published to VS Code Marketplace yet.
- This is a learning bridge, not a replacement for JavaScript.

## Not Included

- VS Code Marketplace publishing.
- AI error explanation.
- Web Playground.
- Course system.
- Custom JavaScript runtime.

## Next

- Marketplace publishing preparation.
- README GIF / screenshots.
- More user testing.
- Continued polishing of the learning experience.
