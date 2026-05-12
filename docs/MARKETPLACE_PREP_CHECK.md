# ZhCode Bridge / 中文代码桥
# M1-O Marketplace 发布前检查记录

## 当前任务

M1-O：Marketplace 发布前检查轮

本轮目标是确认 ZhCode Bridge v0.1.0 是否具备发布到 VS Code Marketplace 的条件，并为 M2-P 发布轮准备输入。

本轮未执行 `vsce publish`，未创建新的 GitHub Release，未打 tag，未修改功能代码。

## Publisher

- Display name: Adrian Labs
- Publisher ID: AdrianLabs

`package.json` 已将 `publisher` 设置为 `AdrianLabs`。

## package.json

检查结果：

- `name`: `zh-code-bridge`
- `displayName`: `ZhCode Bridge`
- `description`: `Use Chinese entry words to learn real JavaScript.`
- `version`: `0.1.0`
- `publisher`: `AdrianLabs`
- `repository`: `https://github.com/19959847099-sudo/zh-code-bridge.git`
- `license`: `MIT`
- `categories`: `Programming Languages`
- `engines.vscode`: `^1.85.0`
- `main`: `./out/extension.js`
- `contributes.languages`: 已包含 `zhjs`
- `contributes.grammars`: 已包含 `source.zhjs`
- `contributes.commands`: 已包含三个核心命令

图标检查：

- 当前 `package.json` 未配置 `icon`。
- 仓库中未发现可直接作为 Marketplace icon 的图片文件。
- 结论：icon 不阻塞 v0.1.0 首次发布，但建议后续补充。

## README

README 当前状态：

- 中文主导，英文辅助。
- 第一屏说明项目定位。
- 明确说明 ZhCode Bridge 不是中文编程语言。
- 明确说明 `.zhjs` 不直接运行。
- 明确说明真正运行生成后的 `.js`。
- 包含快速示例、命令说明、examples、安装说明、已知限制、适合 / 不适合人群。
- 当前仍写明 VS Code Marketplace 暂未发布。

结论：

- README 适合进入 M2-P 发布轮。
- M1-O 不提前把 Marketplace 状态改为“已发布”。
- Marketplace 发布成功后，可在后置小施工中更新 README 发布状态。

## VSIX

执行 `npx @vscode/vsce package` 成功。

生成文件：

- `zh-code-bridge-0.1.0.vsix`

VSIX 内容检查：

已确认包含：

- `package.json`
- `README.md`
- `LICENSE`
- `CHANGELOG.md`
- `language-configuration.json`
- `syntaxes/zhjs.tmLanguage.json`
- `out/extension.js`
- `out/**`
- `examples/*.zhjs`

已确认排除：

- `src/**`
- `test/**`
- `docs/**`
- 内部规划 md
- `examples/*.js`
- 嵌套 `.vsix`

## 执行命令结果

- `npm run compile`: 成功。
- `npm test`: 成功，6 个测试文件、55 条测试通过。
- `npx @vscode/vsce package`: 成功。
- `npx @vscode/vsce ls`: 成功。

## 是否建议进入 M2-P

是。

理由：

- `publisher` 已与 Marketplace Publisher ID `AdrianLabs` 对齐。
- `vsce package` 在 `publisher: AdrianLabs` 配置下成功。
- 编译、测试、打包均通过。
- VSIX 内容无明显发布阻塞问题。
- README 保持 Marketplace 发布前状态，没有提前宣称已发布。

## M2-P 前用户需要准备

- Azure DevOps Personal Access Token。
- 确认 PAT 具备 Marketplace 发布所需权限。
- 确认当前登录发布者为 `AdrianLabs`。
- 准备在本地终端执行 `vsce login AdrianLabs`。

## 后续命令

```powershell
vsce login AdrianLabs
vsce publish
```

如需使用已生成的 VSIX 直接发布，也可在 M2-P 中确认后执行：

```powershell
vsce publish --packagePath .\zh-code-bridge-0.1.0.vsix
```

## 安全提醒

- 不要把 PAT 写进代码。
- 不要把 PAT 写进文档。
- 不要把 PAT 发到聊天中。
- 不要把 PAT 提交到 Git。
- `vsce login AdrianLabs` 时只在本地终端按提示输入 PAT。

## M2-P 建议

- 执行 `vsce login AdrianLabs`。
- 执行发布命令。
- 发布成功后检查 Marketplace 页面。
- 发布成功后再更新 README 中的 Marketplace 状态。
