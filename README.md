# ZhCode Bridge / 中文代码桥

**用中文入口词学习真实 JavaScript。**  
**Use Chinese entry words to learn real JavaScript.**

ZhCode Bridge / 中文代码桥 是一个面向中文母语 JavaScript 初学者的 VS Code 插件。

它不是一门新的中文编程语言，也不是为了替代 JavaScript。  
它是一座“学习桥”：让初学者先用中文入口词理解真实 JavaScript 的结构，再生成标准 `.js` 文件并运行。

---

## 这个项目解决什么问题？

很多中文初学者刚开始学习 JavaScript 时，遇到的困难不只是“编程逻辑”。

更常见的问题是：

- 英文关键字看不懂
- `function` / `return` / `if` / `console.log` 难以马上建立直觉
- VS Code、文件、运行、报错信息同时出现，认知负担很高
- 一开始就进入全英文环境，容易产生挫败感

ZhCode Bridge 想降低的是最开始那一层门槛。

它让你先写：

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

然后生成真实 JavaScript：

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

最终真正运行的是生成后的 `.js` 文件，而不是 `.zhjs` 文件。

---

## 核心理念

ZhCode Bridge 是桥，不是孤岛。

它不是让用户永远依赖中文写代码，而是帮助用户更快理解真实 JavaScript。

学习路径应该是：

```text
中文入口词
    ↓
理解真实 JavaScript 结构
    ↓
查看生成后的标准 .js
    ↓
逐步迁移到真实 JavaScript
```

中文入口词不是终点。  
它只是帮助初学者过第一座桥。

---

## 核心规则

ZhCode Bridge 有几条非常重要的规则。

### 1. 符号不变

ZhCode Bridge 不改变 JavaScript 原有符号。

你仍然使用：

```js
()
{}
[]
.
,
;
""
''
``
+ - * / %
= == ===
> < >= <=
```

也就是说，它不会把 JavaScript 变成自然语言式中文。

---

### 2. 语法结构不变

允许这样写：

```js
如果 (分数 >= 60) {
  打印("通过");
} 否则 {
  打印("不通过");
}
```

不允许这样写：

```text
如果 分数 大于等于 60：
    打印 “通过”
否则：
    打印 “不通过”
```

ZhCode Bridge 只替换中文入口词，不重新设计 JavaScript 语法。

---

### 3. `.zhjs` 不直接运行

`.zhjs` 是中文入口词表层文件。

真实执行链路是：

```text
.zhjs → 生成 .js → 运行 .js
```

也就是说：

- 你编辑 `.zhjs`
- 插件生成标准 `.js`
- Node.js / JavaScript 生态运行 `.js`

ZhCode Bridge 不会直接运行 `.zhjs`。

---

## 快速示例

### `.zhjs`

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

### 生成后的 JavaScript

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

### 运行结果

```text
通过
```

---

## v0.1.0 已支持能力

当前版本：`v0.1.0`

已支持：

- `.zhjs` 文件识别
- VS Code 中的 ZhCode 语言模式
- 中文入口词基础高亮
- 中文入口词 → 标准 JavaScript 转译
- 生成同名 `.js` 文件
- 运行生成后的 `.js`
- 查看生成后的 JavaScript
- Output 面板显示运行结果
- Hover 悬浮解释中文入口词
- Completion 自动补全中文入口词
- 常见 JavaScript 错误的基础中文解释
- 示例文件 examples
- 自动测试
- VSIX 打包

---

## VS Code 命令

打开 `.zhjs` 文件后，按：

```text
Ctrl + Shift + P
```

可以使用以下命令：

```text
ZhCode: Generate JavaScript
ZhCode: Run Current File
ZhCode: Show Generated JavaScript
```

### Generate JavaScript

把当前 `.zhjs` 文件生成同名 `.js` 文件。

例如：

```text
examples/score.zhjs
        ↓
examples/score.js
```

---

### Run Current File

先生成同名 `.js` 文件，再运行生成后的 `.js` 文件。

注意：

```text
运行的是 .js，不是 .zhjs。
```

---

### Show Generated JavaScript

查看当前 `.zhjs` 对应的标准 JavaScript。

这个命令适合学习对照：

```text
中文入口词怎么对应真实 JavaScript？
```

---

## 示例文件

项目内置了几个 examples：

```text
examples/score.zhjs
examples/string-array.zhjs
examples/json-math.zhjs
examples/error.zhjs
```

### `score.zhjs`

展示：

- 函数
- 条件判断
- 返回值
- 打印输出

---

### `string-array.zhjs`

展示：

- 字符串方法
- 数组方法
- 点号方法入口词
- 中文变量名保留

---

### `json-math.zhjs`

展示：

- JSON 解析
- Math 数学函数
- Date / 当前时间

---

### `error.zhjs`

这是一个预期失败示例。

它用于展示：

- JavaScript 原始英文错误
- ZhCode Bridge 提供的基础中文解释

这个文件运行失败是正常的，因为它故意使用了未定义变量。

---

## 安装方式：从 VSIX 安装

当前 `v0.1.0` 先通过 GitHub Release 提供 VSIX 安装包。

VS Code Marketplace 暂未发布。

### 安装步骤

1. 在 GitHub Release 下载：

```text
zh-code-bridge-0.1.0.vsix
```

2. 打开 VS Code。

3. 按：

```text
Ctrl + Shift + P
```

4. 搜索并执行：

```text
Extensions: Install from VSIX...
```

5. 选择下载的：

```text
zh-code-bridge-0.1.0.vsix
```

6. 打开 `.zhjs` 文件开始使用。

---

## 本地开发

### 安装依赖

```bash
npm install
```

### 编译

```bash
npm run compile
```

### 运行测试

```bash
npm test
```

### 打包 VSIX

```bash
npx @vscode/vsce package
```

成功后会生成：

```text
zh-code-bridge-0.1.0.vsix
```

---

## 本地调试插件

如果你想在 VS Code 中调试插件：

1. 用 VS Code 打开本项目目录。

2. 执行：

```bash
npm install
npm run compile
```

3. 按：

```text
F5
```

4. VS Code 会打开一个新的 Extension Development Host 窗口。

5. 在新窗口中打开：

```text
examples/score.zhjs
```

6. 运行命令：

```text
ZhCode: Generate JavaScript
ZhCode: Run Current File
ZhCode: Show Generated JavaScript
```

---

## 已知限制

`v0.1.0` 是第一个可用版本，当前仍有一些限制。

### 1. 模板字符串 `${...}` 内部表达式暂不转译

例如：

```js
打印(`结果是 ${判断成绩(80)}`);
```

在当前版本中，模板字符串整体会被当作字符串保护，`${...}` 内部的中文入口词暂不转译。

后续版本可能单独处理这个问题。

---

### 2. 这不是完整 JavaScript 解析器

ZhCode Bridge 当前只处理基础学习场景中的中文入口词转译。

它不是完整 JavaScript parser，也不是新的运行时。

---

### 3. 不支持其他语言

当前版本只面向 JavaScript 入门学习。

暂不支持：

- TypeScript
- Python
- DOM 中文化
- Node.js API 中文化
- 自然语言式中文编程

---

### 4. Marketplace 暂未发布

当前版本先通过 GitHub Release + VSIX 提供。

VS Code Marketplace 发布会在后续单独处理。

---

## 适合谁？

ZhCode Bridge 适合：

- 中文母语 JavaScript 初学者
- 刚开始接触 VS Code 的学习者
- 被英文关键字卡住的编程新手
- 想用中文入口词理解真实 JavaScript 结构的人
- 想做编程启蒙实验的老师、助教或开发者

---

## 不适合谁？

ZhCode Bridge 不适合：

- 想用中文完全替代 JavaScript 的人
- 想寻找一门中文编程语言的人
- 想在生产项目中长期使用中文入口词的人
- 想要自然语言编程的人
- 想要 AI 自动写代码工具的人

---

## 当前状态

当前项目已完成：

```text
v0.1.0 GitHub Release 封版准备
```

当前发布状态：

```text
GitHub Release：准备发布
VS Code Marketplace：暂未发布
```

`v0.1.0` 的目标是验证一条核心学习链路：

```text
写 .zhjs
    ↓
生成 .js
    ↓
运行 .js
    ↓
查看真实 JavaScript
    ↓
建立中文入口词与 JavaScript 的对应关系
```

---

## 项目哲学

很多学习工具会通过隐藏真实复杂度来降低门槛。

ZhCode Bridge 选择另一条路：

```text
降低第一层门槛，
但不切断学习者与真实 JavaScript 的连接。
```

中文入口词不是目的地。

它只是桥。
