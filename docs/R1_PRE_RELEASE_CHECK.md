# ZhCode Bridge / 中文代码桥
# R1-O 发布前检查记录

## 阶段名称

R 阶段：Release / V0.1 最终收口阶段

## 当前轮次

R1-O：发布前检查轮

## 本轮目标

检查当前项目是否具备进入 R2-O：V0.1 最终收口轮的条件。

本轮不新增功能，不创建 GitHub Release，不打 tag，不发布 Marketplace。

## 执行命令结果

- `npm run compile`：成功。
- `npm test`：成功，6 个测试文件、55 条测试通过。
- `npx @vscode/vsce package`：成功，生成 `zh-code-bridge-0.0.1.vsix`。
- `npx @vscode/vsce ls`：已执行，用于检查 VSIX 内容。
- `git status`：检查完成，提交前只应包含本轮文档和发布打包排除配置变更。

## README 检查

README 已包含：

- 项目名和一句话定位。
- 明确说明 ZhCode Bridge 不是新的中文编程语言。
- 明确说明 `.zhjs` 不直接运行，真正运行生成后的 `.js`。
- 明确说明符号和语法结构不变。
- `.zhjs` 示例和生成后的标准 JavaScript 示例。
- 当前 Prototype / Beta 能力说明。
- VS Code 命令说明。
- examples 说明。
- 本地开发、F5 调试、打包和 `.vsix` 安装说明。
- 当前已知限制，包括模板字符串 `${...}` 内部表达式暂不转译。

结论：README 与当前真实能力基本一致，可进入 R2-O 做最终发布文案和版本收口。

## package.json 检查

已检查以下发布字段：

- `name`：`zh-code-bridge`
- `displayName`：`ZhCode Bridge`
- `description`：清楚说明项目定位。
- `version`：当前为 `0.0.1`。
- `publisher`：当前为 `adrian-hu`，R2-O 前建议最终确认是否与发布账号一致。
- `repository`：指向 GitHub 仓库。
- `license`：MIT。
- `categories`：`Programming Languages`。
- `engines.vscode`：已设置。
- `main`：指向 `./out/extension.js`。
- `scripts.compile` / `scripts.test`：存在。
- `contributes.languages` / `contributes.grammars` / `contributes.commands`：存在并覆盖 zhjs 语言、TextMate grammar 和三个核心命令。

结论：当前 package 配置可以支持 `vsce package`。R2-O 需要确认是否将版本号从 `0.0.1` 收口到 `0.1.0`。

## .vscodeignore 检查

已确认 VSIX 不应排除运行必需文件：

- `out/**`
- `syntaxes/**`
- `language-configuration.json`
- `README.md`
- `LICENSE`
- `package.json`

R1-O 中已补充排除：

- `docs/**`
- `ZhCode_Bridge_*.md`
- `*.vsix`

原因：阶段日志和内部规划文档不属于插件运行必需文件，不应进入最终 VSIX。

## .gitignore 检查

已确认 `.gitignore` 包含：

- `node_modules/`
- `out/`
- `*.vsix`
- 日志文件规则。
- `examples/*.js`

结论：生成产物和打包产物不会污染 Git 状态。

## examples 检查

以下示例文件存在：

- `examples/score.zhjs`
- `examples/string-array.zhjs`
- `examples/json-math.zhjs`
- `examples/error.zhjs`

结论：examples 覆盖 P/B 阶段主链演示与错误解释场景。`examples/*.js` 是生成产物，不提交。

## 阶段日志检查

以下阶段日志存在：

- `docs/P_PHASE_LOG.md`
- `docs/BETA_PHASE_LOG.md`

结论：P 阶段和 B 阶段交接信息完整。R1-O 起，这些内部日志将从 VSIX 中排除，但仍保留在仓库中。

## VSIX 内容检查

R1-O 初次检查发现 VSIX 包含内部规划文档和阶段日志。已通过 `.vscodeignore` 调整排除规则，并重新执行 `npx @vscode/vsce package` 与 `npx @vscode/vsce ls` 复查。

R1-O 修正后 VSIX 已确认保留：

- `package.json`
- `README.md`
- `LICENSE`
- `language-configuration.json`
- `syntaxes/zhjs.tmLanguage.json`
- `out/**`
- `examples/*.zhjs`

R1-O 修正后 VSIX 已确认排除：

- `src/**`
- `test/**`
- `.vscode/**`
- `docs/**`
- `examples/*.js`
- `*.vsix`
- `ZhCode_Bridge_*.md`

## 剩余问题

### R2-O 必须处理

- 确认 `publisher` 是否与最终 VS Code Marketplace / Open VSX 发布账号一致。
- 确认 V0.1 最终版本号，建议评估是否从 `0.0.1` 调整为 `0.1.0`。
- 执行最终 F5 手动验收。
- 生成最终 VSIX。
- 准备 V0.1 release notes。
- 如决定发布 GitHub Release，则在 R2-O 创建 tag / release。

### 可后续处理

- README 增补 GIF / 截图。
- 优化 Marketplace 展示材料。
- V0.1.x 或后续版本评估模板字符串 `${...}` 内部表达式转译。

## 是否建议进入 R2-O

是。

理由：

- 编译、测试、打包均已通过。
- 主链没有发现 P0 / P1 阻塞问题。
- README、examples、package 配置与当前能力基本一致。
- VSIX 内容检查发现的问题属于发布包排除策略问题，已在 R1-O 中小范围修正。
- 剩余事项主要是版本号、publisher 最终确认、最终 VSIX、release notes、tag / GitHub Release 等发布收口任务。

## R2-O 建议任务

- 确认 `publisher`。
- 确认并设置 V0.1 最终版本号。
- 执行最终 compile / test / package / VSIX 内容检查。
- 执行本地 F5 手动验收。
- 生成最终 `.vsix`。
- 编写 V0.1 release notes。
- 根据用户确认决定是否打 tag 和创建 GitHub Release。
