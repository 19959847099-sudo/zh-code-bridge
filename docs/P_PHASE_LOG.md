# ZhCode Bridge / 中文代码桥
# P 阶段开发日志

## 阶段名称

P 阶段：Prototype / 原型阶段

## 阶段目标

从空仓库做出主链完整、可体验、可演示的 V0.1 Prototype。

## 实际完成内容

- P1-S：建立 TypeScript VS Code 插件工程骨架，注册 `.zhjs` 语言、基础 grammar、F5 调试配置。
- P2-S：建立结构化中文入口词表，覆盖 `keyword / literal / operatorWord / apiFunction / method` 五类。
- P3-S：实现 compiler 层 `.zhjs → JavaScript` 转译核心，包含字符串保护、注释保护、长词优先和基础测试。
- P4-I：接入 VS Code 命令，支持生成同名 `.js`、运行生成后的 `.js`、查看生成 JavaScript 和 Output 面板。
- P5-U：补齐 Hover、Completion、主要入口词高亮和基础中文错误解释。
- P6-O：补齐 README、核心 examples、关键测试、打包检查和阶段日志。

## 当前真实状态

- 插件可以在 VS Code Extension Development Host 中识别 `.zhjs` 文件。
- `examples/score.zhjs` 可生成 `score.js` 并运行生成后的 JavaScript。
- Hover 和 Completion 均从结构化入口词表读取数据。
- Output 面板能显示运行结果、stderr、exitCode；常见错误会追加中文解释并保留英文原文。
- `examples/*.js` 为生成产物，已通过 `.gitignore` 排除。

## 主链状态

基本稳定。

说明：

`.zhjs → 转译 → 同名 .js → 运行 .js → Output → 查看生成代码` 主链已经打通，并有编译和单元测试覆盖关键纯函数。VS Code UI 细节仍需要在 Beta 阶段继续真实使用调试。

## 已知问题

- 模板字符串当前在 scanner 中整体作为 string 保护，`${...}` 内表达式不会被转译；B1-F 已用测试锁定为 V0.1 已知限制。
- Hover / Completion 已在 B2-U 做过聚合、排序和多场景展示打磨，仍建议继续做真实 UI 手动验收。
- 错误解释只覆盖 `ReferenceError / SyntaxError / TypeError`，不是完整诊断系统。
- TextMate grammar 只做主要入口词基础高亮，不是完整语法高亮。
- `.vsix` 作为最终 V0.1 产物需要在 Release 阶段再次正式打包确认。

## 临时偏差

- P4-I 生成的 `examples/score.js` 曾在本地验收后出现为未跟踪文件，已通过 P4-I 后置清理加入 `examples/*.js` 忽略规则。
- P5-U 的完整人工 UI 验收延后到 P6-O 后集中验收。

## 下一阶段入口

B1-F：转译规则集中修复轮

## 交接说明

Beta 阶段应优先围绕真实 examples 和手动验收结果修复转译边界，再打磨 Hover、Completion、Output 和 README 细节。不要新增项目方向，不要改变 `.zhjs` 表层文件生成 `.js` 后运行的主链。
