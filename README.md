# ZhCode Bridge / 中文代码桥

Use Chinese entry words to learn real JavaScript.  
用中文入口词学习真实 JavaScript。

ZhCode Bridge 不是一门新的中文编程语言。它是一个 VS Code 插件，让中文母语编程初学者用中文入口词书写接近真实 JavaScript 语法结构的 `.zhjs` 表层文件，并生成标准 `.js` 文件运行。

## 核心规则

- 符号不变：继续使用 JavaScript 原本的 `() {}`、点号、引号、分号、逗号和运算符。
- 语法结构不变：只替换入口词，不设计自然语言式中文语法。
- `.zhjs` 不直接运行。
- 真正运行的是生成后的标准 `.js` 文件。

## `.zhjs`

```js
函数 判断成绩(分数) {
  如果 (分数 >= 60) {
    返回 "通过";
  } 否则 {
    返回 "不通过";
  }
}

打印(判断成绩(80));
```

## 生成后的 JavaScript

```js
function 判断成绩(分数) {
  if (分数 >= 60) {
    return "通过";
  } else {
    return "不通过";
  }
}

console.log(判断成绩(80));
```

## 当前 Prototype 能力

- 识别 `.zhjs` 文件为 ZhCode / zhjs
- 基础入口词高亮
- 中文入口词 Hover 解释
- 中文入口词 Completion 补全
- 生成同名 `.js`
- 运行生成后的 `.js`
- Output 面板显示 stdout / stderr / exitCode
- 常见 JavaScript 错误的基础中文解释，同时保留原始英文错误

## VS Code 命令

- `ZhCode: Generate JavaScript`：从当前 `.zhjs` 生成同名 `.js`
- `ZhCode: Run Current File`：先生成 `.js`，再运行生成后的 `.js`
- `ZhCode: Show Generated JavaScript`：查看当前 `.zhjs` 生成后的标准 JavaScript

## Examples

- `examples/score.zhjs`：函数、条件判断、返回、打印
- `examples/string-array.zhjs`：字符串方法、数组方法、点号方法调用
- `examples/json-math.zhjs`：JSON、Math、Date、对象入口
- `examples/error.zhjs`：预期失败示例，用于查看错误解释能力

`examples/*.js` 是插件生成产物，不进入 Git。

## 当前已知限制

- 模板字符串会整体保护，`${...}` 内部表达式中的中文入口词暂不转译。
- `examples/error.zhjs` 会故意触发 `ReferenceError`，用于确认中文解释和原始英文错误是否同时显示。
- `.zhjs` 是学习入口文件，最终运行和迁移目标仍然是标准 JavaScript。

## Development

```powershell
npm install
npm run compile
npm test
```

## Local Debugging

在 VS Code 中打开项目目录后，按 `F5` 启动 Extension Development Host。  
在新窗口中打开 `examples/score.zhjs`，可以执行：

- `ZhCode: Generate JavaScript`
- `ZhCode: Run Current File`
- `ZhCode: Show Generated JavaScript`

## Package And Install

```powershell
npx @vscode/vsce package
```

打包成功后会生成 `.vsix` 文件。它是本地安装包，不进入 Git。  
在 VS Code 中可以通过 Extensions 视图的 `Install from VSIX...` 安装。

本项目当前处于 V0.1 Beta 收口状态，下一阶段会进入 Release 收口。
