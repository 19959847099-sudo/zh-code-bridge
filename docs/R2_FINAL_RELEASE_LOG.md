# ZhCode Bridge / 中文代码桥
# R2-O V0.1 最终收口记录

## 阶段名称

R 阶段：Release / V0.1 最终收口阶段

## 当前轮次

R2-O：V0.1 最终收口轮

## 最终版本

v0.1.0

## 本轮目标

完成 GitHub 版本封版准备，生成最终 VSIX，并准备 GitHub Release 文案。

本轮不发布 VS Code Marketplace，不执行 `vsce publish`，不新增功能。

## 执行命令结果

- `npm run compile`：成功。
- `npm test`：成功，6 个测试文件、55 条测试通过。
- `npx @vscode/vsce package`：成功，生成 `zh-code-bridge-0.1.0.vsix`。
- `npx @vscode/vsce ls`：成功，已检查 VSIX 内容。
- `git status`：提交前仅包含本轮版本号、CHANGELOG、Release Notes 和最终收口记录变更。

## VSIX 内容检查

已确认 VSIX 包含：

- `package.json`
- `README.md`
- `LICENSE`
- `CHANGELOG.md`
- `language-configuration.json`
- `syntaxes/zhjs.tmLanguage.json`
- `out/extension.js`
- `out/**`
- `examples/*.zhjs`

已确认 VSIX 不包含：

- `src/**`
- `test/**`
- `docs/**`
- 内部规划 md
- `examples/*.js`
- 嵌套 `.vsix`

## 最终产物

- `zh-code-bridge-0.1.0.vsix`

## 发布策略

- GitHub Release：建议创建。
- VS Code Marketplace：本轮不发布。
- Marketplace 发布准备：后置发布小施工处理。

## tag 建议

建议 tag：

```powershell
git tag v0.1.0
git push origin v0.1.0
```

本轮未自动执行 tag，等待用户明确确认。

## GitHub Release 建议

- Release title：`ZhCode Bridge v0.1.0`
- Tag：`v0.1.0`
- Release notes：`docs/V0_1_RELEASE_NOTES.md`
- 附件：`zh-code-bridge-0.1.0.vsix`

## 剩余事项

- 用户确认并执行 tag。
- 创建 GitHub Release。
- 上传最终 VSIX。
- 后置 Marketplace 发布准备。
- 可后续补充 README GIF / 截图。
