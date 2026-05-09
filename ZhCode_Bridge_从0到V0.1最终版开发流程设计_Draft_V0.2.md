# ZhCode Bridge / 中文代码桥  
# 从 0 到 V0.1 最终版开发流程设计  
# Draft V0.2

---

## 0. 文档定位

本文件用于规划 **ZhCode Bridge / 中文代码桥** 从空仓库到 V0.1 最终版的完整开发流程。

本文件只回答一个问题：

> **这个项目从 0 到 V0.1 最终版，应该如何一步步做出来。**

本文件不重复项目定义稿，不规定 AI 协作规则，不作为单轮施工提示词使用。

三份文档分工如下：

```text
项目定义稿：
定义项目是什么、边界是什么、V0.1 要实现什么。

开发流程设计：
定义从 0 到 V0.1 的阶段、轮次、交付物、验收标准和收口条件。

AI 协作开发规则：
定义人和 AI 如何协作、如何控制边界、如何处理失败、如何记录日志。
```

---

## 1. V0.1 最终目标

V0.1 最终版的目标是做出一个可以本地调试、可以打包 `.vsix`、可以用于真实体验的 VS Code 插件。

V0.1 完成后，用户应能完成以下完整路径：

```text
1. 在 VS Code 中打开或创建 .zhjs 文件
2. 使用中文入口词书写接近真实 JavaScript 语法结构的代码
3. 获得基础语法高亮、自动补全和 Hover 解释
4. 一键生成同名 .js 文件
5. 一键运行生成后的 .js 文件
6. 在 Output 面板看到运行结果
7. 一键查看生成后的标准 JavaScript
8. 遇到常见错误时看到中文解释和原始错误
```

V0.1 的完成标准不是“能演示几个关键词”，而是：

> **覆盖 JavaScript 入门阶段基础入口词，并提供完整插件体验。**

---

## 2. 总开发路线

从 0 到 V0.1 最终版，开发分为三个大阶段：

```text
P 阶段：Prototype / 原型阶段
目标：从空仓库做出主链完整、可体验、可演示的 V0.1 Prototype。

B 阶段：Beta / 打磨阶段
目标：围绕真实运行结果修复问题，补齐边界，提升体验稳定性。

R 阶段：Release / 收口阶段
目标：完成测试、文档、打包和 V0.1 最终版收口。
```

三个阶段的关系：

```text
P 阶段：先让完整形态跑起来
B 阶段：再让核心体验稳定下来
R 阶段：最后把 V0.1 收口成可交付版本
```

---

## 3. 轮次定义

本项目中：

> **一次正式施工，算作一轮。**

每一轮都必须围绕一个明确目标推进，并且应该能产生可检查的交付结果。

轮次编号格式：

```text
阶段字母 + 轮次编号 + 类型字母
```

示例：

```text
P1-S：Prototype 阶段第 1 轮，结构施工
B2-U：Beta 阶段第 2 轮，用户体验打磨
R1-O：Release 阶段第 1 轮，收口优化
```

类型字母说明：

```text
S = Structure / 结构
I = Integration / 能力接入
U = User Experience / 用户体验
F = Fix / 修复
T = Table & Tuning / 词表校准与调试
O = Optimization & Close / 优化与收口
```

---

## 4. 开发环境要求

V0.1 默认采用尽量通用、低门槛的 Node / VS Code 插件开发环境。

建议环境：

```text
Node.js：20 LTS 或以上
包管理器：npm
编辑器：VS Code 最新稳定版
语言：TypeScript
插件打包工具：@vscode/vsce
测试框架：可使用 Vitest / Jest / Node test，具体以工程实现为准
```

V0.1 默认使用 npm，而不是一开始引入 pnpm workspace 或 monorepo，原因是：

```text
1. 当前主产品是 VS Code 插件
2. npm 对普通开发者更直观
3. 单插件仓库更适合快速原型
4. 后续如需拆 CLI / Web / Core 包，再考虑 monorepo
```

---

## 5. 质量底线

V0.1 可以是原型，但不能是脏原型。

最低质量要求：

```text
1. 必须通过 TypeScript 编译
2. 必须有基础测试
3. 入口词表必须是单一数据源
4. 不允许粗暴全局 replace
5. 不允许直接运行 .zhjs
6. 不允许静默覆盖非 ZhCode 生成的 .js 文件
7. 不允许隐藏原始英文错误
8. 不允许提交 node_modules、临时日志、无关构建缓存
9. 不允许为了降低难度删减 JavaScript 基础入口词表
10. 不允许改变 JavaScript 符号和语法结构
```

---

## 6. 总体工程结构

V0.1 建议使用单插件仓库结构。

建议目录：

```text
zh-code-bridge/
├─ README.md
├─ LICENSE
├─ .gitignore
├─ package.json
├─ tsconfig.json
├─ language-configuration.json
├─ syntaxes/
│  └─ zhjs.tmLanguage.json
├─ examples/
│  ├─ score.zhjs
│  ├─ string-array.zhjs
│  ├─ json-math.zhjs
│  └─ error.zhjs
├─ src/
│  ├─ extension.ts
│  ├─ compiler/
│  │  ├─ types.ts
│  │  ├─ entries.ts
│  │  ├─ scanner.ts
│  │  ├─ transform.ts
│  │  ├─ generate.ts
│  │  └─ index.ts
│  ├─ vscode/
│  │  ├─ commands.ts
│  │  ├─ hoverProvider.ts
│  │  ├─ completionProvider.ts
│  │  ├─ diagnostics.ts
│  │  └─ output.ts
│  └─ utils/
│     ├─ file.ts
│     └─ node.ts
└─ test/
   ├─ scanner.test.ts
   ├─ transform.test.ts
   └─ generate.test.ts
```

---

# 第一部分：P 阶段 / Prototype 原型阶段

## 7. P 阶段目标

P 阶段目标是快速做出一个高标准原型。

P 阶段完成后，项目应具备：

```text
1. VS Code 插件工程可编译
2. .zhjs 语言可识别
3. JavaScript 基础入口词表已结构化
4. .zhjs 可以转译为标准 .js
5. 生成的 .js 可以运行
6. VS Code 命令可以生成、运行、查看 JS
7. 基础高亮、补全、Hover 可用
8. examples 能展示项目概念
9. README 第一屏能让人理解项目
```

P 阶段不追求所有细节完美，但必须打通主链：

```text
.zhjs → 转译 → 同名 .js → 运行 .js → 查看结果 → 查看生成代码
```

---

## 8. P 阶段进入条件

P 阶段从空仓库开始，进入条件为：

```text
1. GitHub 仓库已创建
2. 项目定义稿已形成
3. V0.1 的核心范围已确定
4. 已确认主入口为 VS Code 插件
5. 已确认 .zhjs 是表层文件，.js 是实际运行文件
```

---

## 9. P 阶段退出条件

P 阶段完成后，必须满足：

```text
1. 插件能通过 VS Code F5 启动调试
2. .zhjs 文件能被识别
3. .zhjs → .js → 运行主链打通
4. score.zhjs 能运行并输出预期结果
5. string-array.zhjs / json-math.zhjs 至少能基本运行
6. 基础高亮、补全、Hover 可用
7. Show Generated JavaScript 可用
8. README 第一屏可读
9. 已知问题已记录，且不阻断进入 Beta
```

---

## 10. P 阶段施工轮次

P 阶段固定 6 轮：

```text
P1-S：插件工程骨架轮
P2-S：结构化入口词表轮
P3-S：转译核心轮
P4-I：文件生成与运行主链轮
P5-U：插件体验轮
P6-O：原型收口轮
```

---

## 11. P1-S：插件工程骨架轮

### 目标

从空仓库搭起 VS Code 插件工程骨架，让项目具备基本开发环境。

### 施工范围

```text
package.json
tsconfig.json
src/extension.ts
language-configuration.json
syntaxes/zhjs.tmLanguage.json
examples/
README.md
```

### 主要任务

```text
1. 初始化 TypeScript VS Code 插件工程
2. 注册 .zhjs 文件语言
3. 配置 language-configuration.json
4. 添加基础 TextMate grammar 文件
5. 添加 examples/score.zhjs
6. README 写入项目名、定位和核心规则
```

### 完成标准

```text
1. npm install 成功
2. npm run compile 成功
3. VS Code F5 能启动 Extension Development Host
4. .zhjs 文件能被识别为 ZhCode 文件
5. 仓库结构清楚，无无关垃圾文件
```

### 本轮不做

```text
1. 不做完整转译器
2. 不做运行命令
3. 不做完整词表
4. 不做复杂高亮
```

---

## 12. P2-S：结构化入口词表轮

### 目标

建立 JavaScript 基础入口词表，作为转译、补全、Hover 和文档的单一数据源。

### 施工范围

```text
src/compiler/types.ts
src/compiler/entries.ts
src/compiler/index.ts
```

### 主要任务

```text
1. 定义 EntryKind
2. 定义 ZhCodeEntry
3. 建立完整 V0.1 基础入口词表
4. 覆盖 keyword / literal / operatorWord / apiFunction / method 五类入口词
5. 提供按 kind / category 获取入口词的工具函数
```

### 词表必须覆盖

```text
keyword：
语言结构词，例如 如果、函数、返回、声明变量、声明常量。

literal：
基础值，例如 真、假、空、未定义。

operatorWord：
操作/判断词，例如 类型、属于、实例于、删除属性。

apiFunction：
API 函数入口，例如 打印、解析JSON、随机数、当前时间。

method：
点号方法入口，例如 .转大写()、.添加()、.筛选()。
```

### 完成标准

```text
1. 入口词表集中在单一数据源中
2. 五类入口词都有覆盖
3. 基础入口词不删减
4. 每个词条至少包含 zh、target、kind、category、description
5. 编译通过
```

### 本轮不做

```text
1. 不实现完整转译
2. 不实现 VS Code Hover / Completion
3. 不写多份重复词表
```

---

## 13. P3-S：转译核心轮

### 目标

实现 `.zhjs → 标准 JavaScript` 的核心转译能力。

### 施工范围

```text
src/compiler/scanner.ts
src/compiler/transform.ts
test/scanner.test.ts
test/transform.test.ts
```

### 主要任务

```text
1. 实现 scanner，区分普通代码、字符串、注释
2. 实现 transformZhjsToJs
3. 支持 keyword / literal / operatorWord 转译
4. 支持 apiFunction 调用形式转译
5. 支持 method 点号方法形式转译
6. 实现长词优先匹配
7. 保留中文变量名
8. 添加基础测试
```

### 核心转译规则

```text
1. 字符串和注释中的中文入口词不替换
2. 长词优先
3. keyword / literal / operatorWord 在代码区替换
4. apiFunction 只替换 入口词(
5. method 只替换 .入口词(
6. 中文变量名不翻译
```

### 完成标准

```text
1. 如果 / 否则 / 返回 可转译
2. 声明变量 / 声明常量 可转译
3. 打印(...) 可转译为 console.log(...)
4. 名字.转大写() 可转译为 名字.toUpperCase()
5. 数组.添加(1) 可转译为 数组.push(1)
6. 字符串中的入口词不被替换
7. 注释中的入口词不被替换
8. 基础测试通过
```

### 本轮不做

```text
1. 不接 VS Code 命令
2. 不处理文件生成
3. 不处理 Output 面板
```

---

## 14. P4-I：文件生成与运行主链轮

### 目标

把转译核心接入 VS Code 插件，打通 `.zhjs → .js → 运行` 主链。

### 施工范围

```text
src/compiler/generate.ts
src/vscode/commands.ts
src/vscode/output.ts
src/utils/file.ts
src/utils/node.ts
src/extension.ts
```

### 主要任务

```text
1. 实现同名 .js 生成
2. 添加生成文件头部注释
3. 实现基础覆盖保护
4. 实现 Run Current File 命令
5. 实现 Generate JavaScript 命令
6. 实现 Show Generated JavaScript 命令
7. Output 面板显示运行结果和错误
```

### 必须支持的命令

```text
ZhCode: Run Current File
中文代码桥：运行当前文件

ZhCode: Generate JavaScript
中文代码桥：生成 JavaScript

ZhCode: Show Generated JavaScript
中文代码桥：查看生成的 JavaScript
```

### 完成标准

```text
1. score.zhjs 能生成 score.js
2. score.js 顶部有 ZhCode Bridge 生成注释
3. Run Current File 实际运行生成后的 score.js
4. Output 面板显示运行结果
5. Show Generated JavaScript 能打开只读预览
6. .zhjs 不被直接运行
```

### 本轮不做

```text
1. 不追求 Hover / Completion 完整体验
2. 不做复杂调试器
3. 不做 Marketplace 发布
```

---

## 15. P5-U：插件体验轮

### 目标

让插件从“能运行”升级为“像一个学习工具”。

### 施工范围

```text
src/vscode/hoverProvider.ts
src/vscode/completionProvider.ts
src/vscode/diagnostics.ts
syntaxes/zhjs.tmLanguage.json
src/extension.ts
```

### 主要任务

```text
1. Hover 从 entries.ts 读取解释
2. Completion 从 entries.ts 读取补全
3. 高亮覆盖主要入口词
4. 基础中文错误解释覆盖 ReferenceError / SyntaxError / TypeError
5. 保留原始英文错误
```

### Hover 要求

Hover 至少包含：

```text
1. 中文入口词
2. 对应 JavaScript
3. 作用说明
4. 示例
```

示例：

```text
声明变量

对应 JavaScript：let

作用：
声明一个可以重新赋值的变量。

示例：
声明变量 分数 = 80;
```

### Completion 要求

补全项应包含：

```text
label：中文入口词
detail：对应 JS
documentation：说明和示例
insertText：补全模板或中文入口词
```

### 完成标准

```text
1. 悬浮“声明变量”显示 let、说明和示例
2. 悬浮“转大写”显示 toUpperCase、说明和示例
3. 输入“声”能补全 声明变量 / 声明常量
4. 输入“打”能补全 打印(...)
5. 常见错误能显示中文解释和原始错误
6. 插件体验不只是命令脚本
```

### 本轮不做

```text
1. 不做 AI 错误解释
2. 不做完整调试器
3. 不做课程系统
```

---

## 16. P6-O：原型收口轮

### 目标

将 P 阶段原型收口为可演示、可继续进入 Beta 的状态。

### 施工范围

```text
README.md
examples/
test/
package.json
.vscodeignore
```

### 主要任务

```text
1. 完善 README 第一屏
2. 添加 score.zhjs / string-array.zhjs / json-math.zhjs / error.zhjs
3. 补齐关键测试
4. 检查 package.json contributes
5. 检查 activationEvents
6. 检查 .vscodeignore
7. 尝试 vsce package
8. 输出 P 阶段开发日志
```

### README 第一屏必须包含

```text
1. 项目名
2. 一句话定位
3. 中文入口词代码
4. 生成后的标准 JavaScript
5. 不是中文编程语言
6. .zhjs 不直接运行
7. 真正运行 .js
8. 符号和语法不变
```

### examples 至少包含

```text
examples/score.zhjs
examples/string-array.zhjs
examples/json-math.zhjs
examples/error.zhjs
```

### 完成标准

```text
1. npm run compile 成功
2. npm test 成功
3. VS Code F5 调试成功
4. examples 至少 3 个可运行
5. README 3 秒能看懂项目
6. 可打包 .vsix
7. 输出 P 阶段开发日志
```

---

# 第二部分：B 阶段 / Beta 打磨阶段

## 17. B 阶段目标

B 阶段目标是基于 P 阶段原型进行真实调试和体验修复。

B 阶段不大幅新增方向，而是围绕真实使用中发现的问题进行修补。

重点是：

```text
1. 修转译边界
2. 修词表遗漏
3. 修插件体验
4. 修 examples
5. 修 README
6. 补测试
```

---

## 18. B 阶段进入条件

进入 B 阶段前，必须满足：

```text
1. P 阶段 6 轮已完成
2. .zhjs → .js → 运行主链已打通
3. 至少 score.zhjs 可运行
4. 基础高亮、补全、Hover 已具备
5. README 初版已具备项目解释能力
6. 已知问题已记录
```

---

## 19. B 阶段退出条件

B 阶段退出时，必须满足：

```text
1. 主链稳定
2. 核心 examples 全部可运行
3. 转译误伤问题已处理到可接受
4. 补全 / Hover / Output 体验可接受
5. P0 / P1 级问题已修复
6. 可以进入只收口不加功能的 R 阶段
```

---

## 20. B 阶段轮次结构

B 阶段不是固定轮次阶段，而是调试与打磨阶段。

B 阶段默认包含 4 个基础轮次：

```text
B1-F：转译规则集中修复轮
B2-U：插件体验集中打磨轮
B3-T：词表与 examples 校准轮
B4-O：Beta 收口轮
```

如果 B4-O 后仍存在影响 V0.1 质量的问题，则继续追加：

```text
Bx-F：Beta 机动修复轮
```

其中 x 根据实际轮次递增，例如：

```text
B5-F：method 映射误伤修复轮
B6-F：覆盖保护逻辑修复轮
B7-F：Completion 顺序修复轮
B8-F：模板字符串保护修复轮
```

机动修复轮必须围绕一个明确问题展开，不允许变成新功能扩展轮。

---

## 21. B1-F：转译规则集中修复轮

### 目标

修复 P 阶段暴露出的转译问题。

### 主要任务

```text
1. 检查 scanner 边界
2. 检查模板字符串
3. 检查长词优先
4. 检查 apiFunction 调用形式
5. 检查 method 点号调用形式
6. 检查同名词冲突
7. 补齐转译测试
```

### 完成标准

```text
1. 核心 examples 转译稳定
2. 字符串和注释保护稳定
3. method / apiFunction 不出现明显误替换
4. 新增测试通过
```

---

## 22. B2-U：插件体验集中打磨轮

### 目标

提升用户实际使用顺手程度。

### 主要任务

```text
1. 优化补全排序
2. 优化 Hover 文案
3. 优化 Output 面板格式
4. 优化错误解释格式
5. 优化 Show Generated JavaScript 预览体验
6. 优化高亮覆盖
```

### 完成标准

```text
1. 补全不混乱
2. Hover 文案适合初学者
3. Output 面板信息清晰
4. 错误解释可读
5. 预览生成 JS 顺畅
```

---

## 23. B3-T：词表与 examples 校准轮

### 目标

专门校准基础入口词表和 examples。

这一轮用于处理真实使用中发现的词表问题、命名问题、解释问题和示例不足。

### 主要任务

```text
1. 校准入口词中文命名
2. 优化词条 description
3. 优化 completion 模板
4. 修正容易冲突的词条说明
5. 补充或修正 examples
6. 同步 README 词表说明
```

### 完成标准

```text
1. 入口词命名整体顺手
2. 词条解释适合初学者
3. examples 能覆盖核心能力
4. README 与词表保持一致
5. 未发现明显基础词遗漏
```

---

## 24. B4-O：Beta 收口轮

### 目标

把 Beta 阶段收口到可以进入 Release 的状态。

### 主要任务

```text
1. 跑全量测试
2. 跑全部 examples
3. 修 README
4. 检查 package.json 元信息
5. 检查 .vscodeignore
6. 尝试打包 .vsix
7. 列出剩余问题
8. 判断是否进入 R 阶段
```

### 完成标准

```text
1. npm run compile 成功
2. npm test 成功
3. examples 全部可运行
4. VS Code F5 调试成功
5. .vsix 打包成功
6. 已知问题不影响进入 R 阶段
```

---

## 25. Bx-F：Beta 机动修复轮

### 定义

Bx-F 是 Beta 阶段中允许追加的机动修复轮。

当真实使用中发现新的明确问题，并且该问题影响主链、转译正确性、插件体验或 V0.1 质量时，可以追加一轮 Bx-F。

### 可处理问题示例

```text
1. method 映射误伤
2. apiFunction 调用形式误判
3. 模板字符串保护失败
4. 同名 .js 覆盖保护不合理
5. Output 面板错误信息混乱
6. Completion 顺序影响使用
7. Hover 文案误导初学者
8. examples 某个场景跑不通
```

### 完成标准

```text
1. 本轮只解决一个明确问题或一组强相关问题
2. 问题修复后有测试或手动验证
3. 不新增无关功能
4. 不改变 V0.1 核心边界
```

---

# 第三部分：R 阶段 / Release 收口阶段

## 26. R 阶段目标

R 阶段目标是将项目正式收口为 V0.1 最终版。

R 阶段不再做新功能，主要做：

```text
1. 稳定性检查
2. 文档整理
3. examples 整理
4. .vsix 打包
5. Git tag / Release 准备
```

---

## 27. 功能冻结点

B4-O 完成并确认进入 R 阶段后，项目进入功能冻结状态。

冻结后只允许：

```text
1. 修 bug
2. 修文档
3. 修 examples
4. 修测试
5. 修打包问题
6. 修阻塞体验问题
```

冻结后不允许：

```text
1. 新增入口词大类
2. 新增 Python / TypeScript / DOM / Node API
3. 新增 AI 功能
4. 新增 Web Playground
5. 改变文件模型
6. 改变核心语法规则
7. 重构主链架构
```

---

## 28. R 阶段进入条件

进入 R 阶段前，必须满足：

```text
1. B 阶段基础 4 轮已完成
2. 必要的 Bx-F 机动修复轮已完成
3. P0 / P1 级问题已清除
4. 主链稳定
5. examples 全部可运行
6. .vsix 已经至少尝试打包成功一次
```

---

## 29. R 阶段退出条件

R 阶段完成后，必须满足：

```text
1. npm run compile 成功
2. npm test 成功
3. VS Code F5 手动验收成功
4. examples 全部可运行
5. README 完整
6. .vsix 打包成功
7. V0.1 开发日志完成
8. GitHub Release 草稿或正式 Release 已准备
9. 可标记 v0.1.0
```

---

## 30. R 阶段轮次

R 阶段固定 2 轮：

```text
R1-O：发布前检查轮
R2-O：V0.1 最终收口轮
```

---

## 31. R1-O：发布前检查轮

### 目标

检查 V0.1 发布前所有关键项。

### 主要任务

```text
1. 检查项目定义是否被遵守
2. 检查符号不变、语法不变
3. 检查 .zhjs 是否只作为表层文件
4. 检查 .js 生成和运行链路
5. 检查 examples
6. 检查 README
7. 检查 package.json
8. 检查打包文件
9. 执行手动验收清单
```

### 完成标准

```text
1. 主链稳定
2. 文档清楚
3. examples 可运行
4. 打包可执行
5. 无明显阻塞问题
```

---

## 32. R2-O：V0.1 最终收口轮

### 目标

完成 V0.1 最终版收口。

### 主要任务

```text
1. 最后一次全量测试
2. 最后一次 VS Code F5 手动验收
3. 生成 .vsix
4. 准备 GitHub Release 内容
5. 输出 V0.1 完整开发日志
6. 标记 V0.1 状态
```

### 完成标准

```text
1. npm run compile 成功
2. npm test 成功
3. examples 全部可运行
4. .vsix 打包成功
5. README 完整
6. V0.1 开发日志完成
7. 可进入后续发布或推广阶段
```

---

# 第四部分：问题分级

## 33. 问题等级

开发过程中发现的问题按严重程度分为 P0 / P1 / P2 / P3。

### P0：阻塞问题

定义：

```text
主链不可用、构建失败、插件无法启动、无法运行 .zhjs、生成 JS 严重错误。
```

示例：

```text
1. npm run compile 失败
2. VS Code 插件无法启动
3. .zhjs 无法识别
4. Run Current File 完全不可用
5. 生成的 .js 大面积语法错误
```

处理原则：

```text
P0 必须立即修复，不能进入下一阶段。
```

### P1：严重问题

定义：

```text
核心体验受损，但项目不是完全不可用。
```

示例：

```text
1. 核心入口词转译错误
2. 字符串 / 注释误替换
3. 非生成 .js 被静默覆盖
4. examples 大面积失败
5. Show Generated JavaScript 不可用
```

处理原则：

```text
P1 必须在进入 R 阶段前修复。
```

### P2：普通问题

定义：

```text
影响使用体验，但不阻断主链。
```

示例：

```text
1. Hover 文案不够好
2. 补全排序不理想
3. Output 格式不够清晰
4. README 表达可优化
5. 某个边缘词解释不够准确
```

处理原则：

```text
P2 优先在 B 阶段修复；如不影响 V0.1 质量，可记录到 V0.1.x。
```

### P3：低优先级问题

定义：

```text
不影响 V0.1 交付的小问题或未来想法。
```

示例：

```text
1. 视觉细节
2. 非核心 examples 增补
3. 文案微调
4. 未来功能建议
```

处理原则：

```text
P3 默认记录，不阻塞 V0.1。
```

---

# 第五部分：手动验收清单

## 34. VS Code 插件手动验收

V0.1 最终版必须通过以下手动验收：

```text
1. 在 VS Code 中按 F5 启动插件调试窗口
2. 打开 examples/score.zhjs
3. 确认文件语言识别为 ZhCode / zhjs
4. 确认“如果 / 函数 / 返回 / 打印”等有高亮
5. 输入“声”，确认出现“声明变量 / 声明常量”补全
6. 鼠标悬浮“声明变量”，确认出现中文解释
7. 执行“ZhCode: Generate JavaScript”
8. 确认生成 score.js
9. 确认 score.js 顶部有生成注释
10. 执行“ZhCode: Run Current File”
11. 确认 Output 输出“通过”
12. 执行“ZhCode: Show Generated JavaScript”
13. 确认打开标准 JS 预览
14. 打开 string-array.zhjs
15. 确认 .转大写() / .添加() 可转译
16. 打开 json-math.zhjs
17. 确认 解析JSON() / 随机数() 可转译
18. 制造 SyntaxError
19. 确认出现中文解释
20. 确认原始英文错误仍然保留
```

---

# 第六部分：V0.1 最终产物

## 35. V0.1 最终产物清单

V0.1 最终版应留下以下产物：

```text
1. 可运行的 VS Code 插件源码
2. 完整 README.md
3. MIT License
4. examples 示例目录
5. 基础测试
6. 可打包的 .vsix 文件
7. V0.1 完整开发日志
8. Git tag：v0.1.0
9. GitHub Release 草稿或正式 Release
```

其中 `.vsix` 必须纳入 V0.1 最终产物。

Marketplace 上架不纳入 V0.1 必交付范围。

---

# 第七部分：V0.1 总验收标准

## 36. V0.1 最终版完成定义

当以下条件全部满足时，可以认为 V0.1 最终版完成：

```text
1. 仓库结构清楚
2. VS Code 插件能本地调试
3. .zhjs 语言注册成功
4. JavaScript 基础入口词表完整
5. 五类入口词转译规则可用
6. .zhjs 能生成同名 .js
7. .js 能真实运行
8. Output 能显示结果
9. 用户能查看生成后的 JS
10. 用户能获得补全和 Hover
11. 常见错误有中文解释
12. 字符串和注释不被误替换
13. examples 可运行
14. README 具备产品页效果
15. 能打包 .vsix
16. 通过手动验收清单
17. P0 / P1 问题已清除
```

---

## 37. V0.1 不要求完成的事项

V0.1 不要求：

```text
1. 上架 VS Code Marketplace
2. 支持 Python
3. 支持 TypeScript
4. 支持完整 JavaScript 生态
5. 支持 DOM 中文化
6. 支持 Node API 中文化
7. 支持 AI 解释
8. 支持 Web Playground
9. 支持独立 IDE
```

---

# 第八部分：推荐真实推进顺序

## 38. 总轮次

从 0 到 V0.1 最终版，建议采用：

```text
P 阶段：固定 6 轮
B 阶段：基础 4 轮 + N 个机动修复轮
R 阶段：固定 2 轮
```

完整轮次如下：

```text
P 阶段：Prototype 原型阶段

P1-S：插件工程骨架轮
P2-S：结构化入口词表轮
P3-S：转译核心轮
P4-I：文件生成与运行主链轮
P5-U：插件体验轮
P6-O：原型收口轮

B 阶段：Beta 打磨阶段

B1-F：转译规则集中修复轮
B2-U：插件体验集中打磨轮
B3-T：词表与 examples 校准轮
B4-O：Beta 收口轮
Bx-F：Beta 机动修复轮，可追加 N 轮

R 阶段：Release 收口阶段

R1-O：发布前检查轮
R2-O：V0.1 最终收口轮
```

---

## 39. 推荐节奏

```text
P 阶段：
快速做出可运行原型。

B 阶段：
围绕真实问题反复调试，必要时追加机动修复轮。

R 阶段：
冻结功能，整理、测试、打包、收口。
```

开发时不追求每一轮绝对完美，但每一轮必须让项目向 V0.1 最终版靠近。

如果某轮出现阻塞，应优先修复主链，不继续堆新功能。

---

# 第九部分：最终判断

ZhCode Bridge 的开发不应走“极简阉割版”路线，也不应一次性追求完整生态。

正确路线是：

> **用 6 轮完成高标准原型，用 4+N 轮完成 Beta 打磨，用 2 轮完成 V0.1 收口。**

V0.1 的最终标准不是“功能少所以简单”，而是：

> **内部规则足够完整，外部体验足够轻。**

用户最终感受到的应该是：

```text
打开 VS Code
写 .zhjs
点运行
看到结果
想看真实 JS 就一键查看
遇到错误能看到中文解释
```

这就是 ZhCode Bridge V0.1 的开发目标。
