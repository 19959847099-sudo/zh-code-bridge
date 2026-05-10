# ZhCode Bridge / 中文代码桥
# B 阶段 Beta 收口日志

## 阶段名称

B 阶段：Beta / 打磨阶段

## 阶段目标

围绕 P 阶段原型进行转译规则、插件体验、词表与 examples 的集中打磨，并判断是否进入 R 阶段。

## 已完成轮次

### B1-F：转译规则集中修复轮

- 补强 scanner / transform 边界测试。
- 明确模板字符串策略：V0.1 暂不支持 `${}` 内部表达式转译，模板字符串整体作为 string 保护。
- 增加 examples 生成后实际 Node 运行测试。
- 将 `error.zhjs` 作为预期失败示例测试。

### B2-U：插件体验集中打磨轮

- Completion 同名词条聚合，基础词优先排序。
- Completion detail / documentation 更适合初学者阅读。
- Hover 多词条 / 多场景展示更清楚。
- Output 面板格式更清楚。
- 命令失败弹窗改为短提示，详细错误保留在 Output。

### B3-T：词表与 examples 校准轮

- 校准重点词条文案，明确 `apiFunction` 是函数调用入口，`method` 是点号方法入口。
- 优化 `异步` completion 模板。
- 新增词表示例一致性测试和词条结构完整性测试。
- README 小范围补充当前已知限制和 `error.zhjs` 说明。

### B4-O：Beta 收口轮

- 执行全量 compile / test / package。
- 小范围补充 README 的 F5 调试、打包和 VSIX 安装说明。
- 检查 `package.json`、`.vscodeignore`、`.gitignore` 与 examples / VSIX 忽略策略。
- 输出 Beta 阶段收口日志。

## 当前真实状态

- `.zhjs → 转译 → 同名 .js → 运行 .js → Output → 查看生成代码` 主链已打通。
- Hover、Completion、Output、基础错误解释已具备 Beta 可体验状态。
- 四个 examples 均存在：`score.zhjs`、`string-array.zhjs`、`json-math.zhjs`、`error.zhjs`。
- `examples/*.js` 和 `*.vsix` 均为生成产物，不进入 Git。

## 主链状态

基本稳定。

说明：

当前主链通过单元测试、examples 生成后 Node 运行测试和 `vsce package` 打包验证。进入 R 阶段前仍建议进行一次完整 VS Code F5 手动验收。

## 测试状态

- `npm run compile`：成功
- `npm test`：成功，6 个测试文件、55 条测试通过
- 覆盖范围：scanner、transform、generate、diagnostics、editor experience、examples 转译与运行

## 打包状态

- `npx @vscode/vsce package`：成功
- 生成产物：`zh-code-bridge-0.0.1.vsix`
- `.vsix` 未提交，已由 `.gitignore` 忽略

## 剩余问题

### R 阶段必须处理

- 进行完整 VS Code F5 手动验收。
- 再次确认 VSIX 内容是否需要排除内部规划文档。
- 确认 publisher / version / repository 等发布字段。
- 准备 V0.1 Release 文案、tag 和最终开发日志。

### 可后续处理

- README 可在 R 阶段补截图或 GIF。
- 模板字符串 `${}` 内表达式暂不转译，作为 V0.1 已知限制保留。
- Hover / Completion 文案可继续基于真实使用反馈微调。

## 是否建议进入 R 阶段

是。

理由：

当前无 P0 / P1 阻塞问题，compile / test / package 均成功，主链基本稳定，剩余问题主要属于发布前检查、文档展示和 Release 收口事项。

## 下一阶段入口

R1-O：发布前检查轮

## 交接说明

R 阶段应进入功能冻结状态。后续只处理发布前检查、文档、examples、打包、Release、tag 和阻塞级 bug，不再新增功能方向。
