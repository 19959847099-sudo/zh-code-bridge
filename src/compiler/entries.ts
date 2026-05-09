import type { EntryKind, ZhCodeEntry } from "./types";

export const zhCodeEntries: ZhCodeEntry[] = [
  {
    zh: "声明变量",
    target: "let",
    kind: "keyword",
    category: "declaration",
    level: "foundation",
    description: "声明一个可以重新赋值的变量。",
    exampleZh: "声明变量 分数 = 80;",
    exampleJs: "let 分数 = 80;",
    completion: "声明变量 ${1:变量名} = ${2:值};"
  },
  {
    zh: "声明常量",
    target: "const",
    kind: "keyword",
    category: "declaration",
    level: "foundation",
    description: "声明一个不应该重新赋值的名字。",
    exampleZh: "声明常量 及格线 = 60;",
    exampleJs: "const 及格线 = 60;",
    completion: "声明常量 ${1:名称} = ${2:值};"
  },
  {
    zh: "旧式变量",
    target: "var",
    kind: "keyword",
    category: "declaration",
    level: "basic",
    description: "使用 JavaScript 早期的变量声明方式，初学时建议优先了解 let 和 const。",
    exampleZh: "旧式变量 名字 = \"Adrian\";",
    exampleJs: "var 名字 = \"Adrian\";",
    completion: "旧式变量 ${1:变量名} = ${2:值};"
  },
  {
    zh: "如果",
    target: "if",
    kind: "keyword",
    category: "condition",
    level: "foundation",
    description: "条件成立时执行对应代码块。",
    exampleZh: "如果 (分数 >= 60) {\n  打印(\"通过\");\n}",
    exampleJs: "if (分数 >= 60) {\n  console.log(\"通过\");\n}",
    completion: "如果 (${1:条件}) {\n  ${2:// 代码}\n}"
  },
  {
    zh: "否则如果",
    target: "else if",
    kind: "keyword",
    category: "condition",
    level: "foundation",
    description: "前一个条件不成立时继续判断新的条件。",
    exampleZh: "} 否则如果 (分数 >= 60) {",
    exampleJs: "} else if (分数 >= 60) {",
    completion: "否则如果 (${1:条件}) {\n  ${2:// 代码}\n}"
  },
  {
    zh: "否则",
    target: "else",
    kind: "keyword",
    category: "condition",
    level: "foundation",
    description: "前面的条件都不成立时执行对应代码块。",
    exampleZh: "} 否则 {\n  打印(\"不通过\");\n}",
    exampleJs: "} else {\n  console.log(\"不通过\");\n}",
    completion: "否则 {\n  ${1:// 代码}\n}"
  },
  {
    zh: "分支",
    target: "switch",
    kind: "keyword",
    category: "switch",
    level: "basic",
    description: "根据一个值进入不同的分支判断。",
    exampleZh: "分支 (等级) {\n  情况 \"A\":\n    打印(\"优秀\");\n}",
    exampleJs: "switch (等级) {\n  case \"A\":\n    console.log(\"优秀\");\n}",
    completion: "分支 (${1:值}) {\n  ${2:// 情况}\n}"
  },
  {
    zh: "情况",
    target: "case",
    kind: "keyword",
    category: "switch",
    level: "basic",
    description: "在分支结构中表示一种匹配情况。",
    exampleZh: "情况 \"A\":",
    exampleJs: "case \"A\":",
    completion: "情况 ${1:值}:"
  },
  {
    zh: "默认",
    target: "default",
    kind: "keyword",
    category: "switch",
    level: "basic",
    description: "在分支结构中表示没有匹配到其他情况时执行。",
    exampleZh: "默认:",
    exampleJs: "default:",
    completion: "默认:"
  },
  {
    zh: "跳出",
    target: "break",
    kind: "keyword",
    category: "switch",
    level: "foundation",
    description: "结束当前 switch 分支或循环。",
    exampleZh: "跳出;",
    exampleJs: "break;",
    completion: "跳出;"
  },
  {
    zh: "循环",
    target: "for",
    kind: "keyword",
    category: "loop",
    level: "foundation",
    description: "按指定规则重复执行一段代码。",
    exampleZh: "循环 (声明变量 i = 0; i < 3; i++) {\n  打印(i);\n}",
    exampleJs: "for (let i = 0; i < 3; i++) {\n  console.log(i);\n}",
    completion: "循环 (声明变量 ${1:i} = 0; ${1:i} < ${2:次数}; ${1:i}++) {\n  ${3:// 代码}\n}"
  },
  {
    zh: "当",
    target: "while",
    kind: "keyword",
    category: "loop",
    level: "foundation",
    description: "当条件成立时持续重复执行代码块。",
    exampleZh: "当 (数量 > 0) {\n  数量--;\n}",
    exampleJs: "while (数量 > 0) {\n  数量--;\n}",
    completion: "当 (${1:条件}) {\n  ${2:// 代码}\n}"
  },
  {
    zh: "执行",
    target: "do",
    kind: "keyword",
    category: "loop",
    level: "basic",
    description: "先执行一次代码块，再判断是否继续循环。",
    exampleZh: "执行 {\n  打印(\"运行一次\");\n} 当 (条件);",
    exampleJs: "do {\n  console.log(\"运行一次\");\n} while (条件);",
    completion: "执行 {\n  ${1:// 代码}\n} 当 (${2:条件});"
  },
  {
    zh: "继续",
    target: "continue",
    kind: "keyword",
    category: "loop",
    level: "foundation",
    description: "跳过本轮循环，直接进入下一轮。",
    exampleZh: "继续;",
    exampleJs: "continue;",
    completion: "继续;"
  },
  {
    zh: "函数",
    target: "function",
    kind: "keyword",
    category: "function",
    level: "foundation",
    description: "定义一段可以重复调用的逻辑。",
    exampleZh: "函数 判断成绩(分数) {\n  返回 分数 >= 60;\n}",
    exampleJs: "function 判断成绩(分数) {\n  return 分数 >= 60;\n}",
    completion: "函数 ${1:函数名}(${2:参数}) {\n  ${3:// 代码}\n}"
  },
  {
    zh: "返回",
    target: "return",
    kind: "keyword",
    category: "function",
    level: "foundation",
    description: "把结果交回调用函数的位置，并结束当前函数。",
    exampleZh: "返回 \"通过\";",
    exampleJs: "return \"通过\";",
    completion: "返回 ${1:值};"
  },
  {
    zh: "类",
    target: "class",
    kind: "keyword",
    category: "class",
    level: "basic",
    description: "定义一类对象的结构和行为。",
    exampleZh: "类 学生 {\n}",
    exampleJs: "class 学生 {\n}",
    completion: "类 ${1:类名} {\n  ${2:// 成员}\n}"
  },
  {
    zh: "新建",
    target: "new",
    kind: "keyword",
    category: "class",
    level: "basic",
    description: "根据类或构造函数创建一个新实例。",
    exampleZh: "声明常量 学生A = 新建 学生();",
    exampleJs: "const 学生A = new 学生();",
    completion: "新建 ${1:类名}(${2:参数})"
  },
  {
    zh: "当前对象",
    target: "this",
    kind: "keyword",
    category: "class",
    level: "basic",
    description: "指向当前对象本身。",
    exampleZh: "当前对象.名字 = 名字;",
    exampleJs: "this.名字 = 名字;",
    completion: "当前对象"
  },
  {
    zh: "继承",
    target: "extends",
    kind: "keyword",
    category: "class",
    level: "basic",
    description: "让一个类继承另一个类的能力。",
    exampleZh: "类 高中生 继承 学生 {\n}",
    exampleJs: "class 高中生 extends 学生 {\n}",
    completion: "继承 ${1:父类名}"
  },
  {
    zh: "父类",
    target: "super",
    kind: "keyword",
    category: "class",
    level: "basic",
    description: "在子类中调用父类的构造函数或方法。",
    exampleZh: "父类(名字);",
    exampleJs: "super(名字);",
    completion: "父类(${1:参数});"
  },
  {
    zh: "构造函数",
    target: "constructor",
    kind: "keyword",
    category: "class",
    level: "basic",
    description: "类实例创建时自动执行的特殊方法。",
    exampleZh: "构造函数(名字) {\n  当前对象.名字 = 名字;\n}",
    exampleJs: "constructor(名字) {\n  this.名字 = 名字;\n}",
    completion: "构造函数(${1:参数}) {\n  ${2:// 初始化}\n}"
  },
  {
    zh: "尝试",
    target: "try",
    kind: "keyword",
    category: "error",
    level: "basic",
    description: "尝试执行一段可能出错的代码。",
    exampleZh: "尝试 {\n  解析JSON(文本);\n}",
    exampleJs: "try {\n  JSON.parse(文本);\n}",
    completion: "尝试 {\n  ${1:// 可能出错的代码}\n}"
  },
  {
    zh: "捕获",
    target: "catch",
    kind: "keyword",
    category: "error",
    level: "basic",
    description: "捕获并处理 try 代码块中出现的错误。",
    exampleZh: "} 捕获 (错误) {\n  打印(错误);\n}",
    exampleJs: "} catch (错误) {\n  console.log(错误);\n}",
    completion: "捕获 (${1:错误}) {\n  ${2:// 处理错误}\n}"
  },
  {
    zh: "最终",
    target: "finally",
    kind: "keyword",
    category: "error",
    level: "basic",
    description: "无论是否出错都会执行的收尾代码块。",
    exampleZh: "} 最终 {\n  打印(\"结束\");\n}",
    exampleJs: "} finally {\n  console.log(\"结束\");\n}",
    completion: "最终 {\n  ${1:// 收尾代码}\n}"
  },
  {
    zh: "抛出",
    target: "throw",
    kind: "keyword",
    category: "error",
    level: "basic",
    description: "主动抛出一个错误。",
    exampleZh: "抛出 新建 Error(\"失败\");",
    exampleJs: "throw new Error(\"失败\");",
    completion: "抛出 ${1:错误};"
  },
  {
    zh: "异步",
    target: "async",
    kind: "keyword",
    category: "async",
    level: "basic",
    description: "声明一个可以使用 await 的异步函数。",
    exampleZh: "异步 函数 读取数据() {\n}",
    exampleJs: "async function 读取数据() {\n}",
    completion: "异步 "
  },
  {
    zh: "等待",
    target: "await",
    kind: "keyword",
    category: "async",
    level: "basic",
    description: "等待一个异步结果完成。",
    exampleZh: "声明常量 数据 = 等待 请求();",
    exampleJs: "const 数据 = await 请求();",
    completion: "等待 ${1:异步结果}"
  },
  {
    zh: "导入",
    target: "import",
    kind: "keyword",
    category: "module",
    level: "basic",
    description: "从模块中导入需要使用的内容。",
    exampleZh: "导入 工具 从 \"./tool.js\";",
    exampleJs: "import 工具 from \"./tool.js\";",
    completion: "导入 ${1:名称} 从 \"${2:模块路径}\";"
  },
  {
    zh: "导出",
    target: "export",
    kind: "keyword",
    category: "module",
    level: "basic",
    description: "把当前模块中的内容提供给其他模块使用。",
    exampleZh: "导出 函数 工具() {\n}",
    exampleJs: "export function 工具() {\n}",
    completion: "导出 "
  },
  {
    zh: "从",
    target: "from",
    kind: "keyword",
    category: "module",
    level: "basic",
    description: "在导入语句中表示模块来源。",
    exampleZh: "导入 工具 从 \"./tool.js\";",
    exampleJs: "import 工具 from \"./tool.js\";",
    completion: "从 \"${1:模块路径}\""
  },
  {
    zh: "真",
    target: "true",
    kind: "literal",
    category: "boolean",
    level: "foundation",
    description: "布尔值中的真。",
    exampleZh: "声明常量 已通过 = 真;",
    exampleJs: "const 已通过 = true;",
    completion: "真"
  },
  {
    zh: "假",
    target: "false",
    kind: "literal",
    category: "boolean",
    level: "foundation",
    description: "布尔值中的假。",
    exampleZh: "声明常量 已通过 = 假;",
    exampleJs: "const 已通过 = false;",
    completion: "假"
  },
  {
    zh: "空",
    target: "null",
    kind: "literal",
    category: "nullish",
    level: "foundation",
    description: "表示这里有意没有值。",
    exampleZh: "声明变量 结果 = 空;",
    exampleJs: "let 结果 = null;",
    completion: "空"
  },
  {
    zh: "未定义",
    target: "undefined",
    kind: "literal",
    category: "nullish",
    level: "foundation",
    description: "表示一个值尚未定义或不存在。",
    exampleZh: "如果 (结果 === 未定义) {\n}",
    exampleJs: "if (结果 === undefined) {\n}",
    completion: "未定义"
  },
  {
    zh: "不是数字",
    target: "NaN",
    kind: "literal",
    category: "number",
    level: "basic",
    description: "表示一个不是有效数字的数值结果。",
    exampleZh: "声明常量 结果 = 不是数字;",
    exampleJs: "const 结果 = NaN;",
    completion: "不是数字"
  },
  {
    zh: "无穷大",
    target: "Infinity",
    kind: "literal",
    category: "number",
    level: "basic",
    description: "表示无穷大的数值。",
    exampleZh: "声明常量 最大 = 无穷大;",
    exampleJs: "const 最大 = Infinity;",
    completion: "无穷大"
  },
  {
    zh: "类型",
    target: "typeof",
    kind: "operatorWord",
    category: "operator",
    level: "foundation",
    description: "查看一个值的类型。",
    exampleZh: "打印(类型 分数);",
    exampleJs: "console.log(typeof 分数);",
    completion: "类型 ${1:值}"
  },
  {
    zh: "属于",
    target: "in",
    kind: "operatorWord",
    category: "operator",
    level: "basic",
    description: "判断某个属性名是否存在于对象中。",
    exampleZh: "如果 (\"名字\" 属于 学生) {\n}",
    exampleJs: "if (\"名字\" in 学生) {\n}",
    completion: "${1:属性名} 属于 ${2:对象}"
  },
  {
    zh: "实例于",
    target: "instanceof",
    kind: "operatorWord",
    category: "operator",
    level: "basic",
    description: "判断一个对象是否是某个类的实例。",
    exampleZh: "如果 (学生A 实例于 学生) {\n}",
    exampleJs: "if (学生A instanceof 学生) {\n}",
    completion: "${1:对象} 实例于 ${2:类名}"
  },
  {
    zh: "删除属性",
    target: "delete",
    kind: "operatorWord",
    category: "operator",
    level: "basic",
    description: "删除对象上的某个属性。",
    exampleZh: "删除属性 学生.年龄;",
    exampleJs: "delete 学生.年龄;",
    completion: "删除属性 ${1:对象}.${2:属性};"
  },
  {
    zh: "打印",
    target: "console.log",
    kind: "apiFunction",
    category: "console",
    level: "foundation",
    description: "向控制台输出普通信息。",
    exampleZh: "打印(\"你好\");",
    exampleJs: "console.log(\"你好\");",
    completion: "打印(${1:内容});"
  },
  {
    zh: "警告",
    target: "console.warn",
    kind: "apiFunction",
    category: "console",
    level: "basic",
    description: "向控制台输出警告信息。",
    exampleZh: "警告(\"请检查输入\");",
    exampleJs: "console.warn(\"请检查输入\");",
    completion: "警告(${1:内容});"
  },
  {
    zh: "输出错误",
    target: "console.error",
    kind: "apiFunction",
    category: "console",
    level: "basic",
    description: "向控制台输出错误信息。",
    exampleZh: "输出错误(\"运行失败\");",
    exampleJs: "console.error(\"运行失败\");",
    completion: "输出错误(${1:内容});"
  },
  {
    zh: "转整数",
    target: "parseInt",
    kind: "apiFunction",
    category: "conversion",
    level: "foundation",
    description: "把值转换为整数。",
    exampleZh: "声明常量 年龄 = 转整数(\"18\");",
    exampleJs: "const 年龄 = parseInt(\"18\");",
    completion: "转整数(${1:值});"
  },
  {
    zh: "转小数",
    target: "parseFloat",
    kind: "apiFunction",
    category: "conversion",
    level: "foundation",
    description: "把值转换为小数。",
    exampleZh: "声明常量 价格 = 转小数(\"12.5\");",
    exampleJs: "const 价格 = parseFloat(\"12.5\");",
    completion: "转小数(${1:值});"
  },
  {
    zh: "转数字",
    target: "Number",
    kind: "apiFunction",
    category: "conversion",
    level: "foundation",
    description: "把值转换为数字。",
    exampleZh: "声明常量 分数 = 转数字(\"80\");",
    exampleJs: "const 分数 = Number(\"80\");",
    completion: "转数字(${1:值});"
  },
  {
    zh: "转字符串",
    target: "String",
    kind: "apiFunction",
    category: "conversion",
    level: "foundation",
    description: "把值转换为字符串。",
    exampleZh: "声明常量 文本 = 转字符串(80);",
    exampleJs: "const 文本 = String(80);",
    completion: "转字符串(${1:值});"
  },
  {
    zh: "转布尔",
    target: "Boolean",
    kind: "apiFunction",
    category: "conversion",
    level: "foundation",
    description: "把值转换为布尔值。",
    exampleZh: "声明常量 是否存在 = 转布尔(名字);",
    exampleJs: "const 是否存在 = Boolean(名字);",
    completion: "转布尔(${1:值});"
  },
  {
    zh: "是否不是数字",
    target: "isNaN",
    kind: "apiFunction",
    category: "conversion",
    level: "basic",
    description: "判断一个值是否不是有效数字。",
    exampleZh: "打印(是否不是数字(结果));",
    exampleJs: "console.log(isNaN(结果));",
    completion: "是否不是数字(${1:值});"
  },
  {
    zh: "是否有限",
    target: "isFinite",
    kind: "apiFunction",
    category: "conversion",
    level: "basic",
    description: "判断一个值是否是有限数字。",
    exampleZh: "打印(是否有限(结果));",
    exampleJs: "console.log(isFinite(结果));",
    completion: "是否有限(${1:值});"
  },
  {
    zh: "对象键",
    target: "Object.keys",
    kind: "apiFunction",
    category: "object",
    level: "basic",
    description: "获取对象中所有键名组成的数组。",
    exampleZh: "打印(对象键(学生));",
    exampleJs: "console.log(Object.keys(学生));",
    completion: "对象键(${1:对象});"
  },
  {
    zh: "对象值",
    target: "Object.values",
    kind: "apiFunction",
    category: "object",
    level: "basic",
    description: "获取对象中所有值组成的数组。",
    exampleZh: "打印(对象值(学生));",
    exampleJs: "console.log(Object.values(学生));",
    completion: "对象值(${1:对象});"
  },
  {
    zh: "对象条目",
    target: "Object.entries",
    kind: "apiFunction",
    category: "object",
    level: "basic",
    description: "获取对象中键值对组成的数组。",
    exampleZh: "打印(对象条目(学生));",
    exampleJs: "console.log(Object.entries(学生));",
    completion: "对象条目(${1:对象});"
  },
  {
    zh: "合并对象",
    target: "Object.assign",
    kind: "apiFunction",
    category: "object",
    level: "basic",
    description: "把一个或多个对象的属性合并到目标对象中。",
    exampleZh: "声明常量 结果 = 合并对象({}, 默认值, 输入);",
    exampleJs: "const 结果 = Object.assign({}, 默认值, 输入);",
    completion: "合并对象(${1:目标对象}, ${2:来源对象});"
  },
  {
    zh: "解析JSON",
    target: "JSON.parse",
    kind: "apiFunction",
    category: "json",
    level: "basic",
    description: "把 JSON 字符串解析成 JavaScript 值。",
    exampleZh: "声明常量 数据 = 解析JSON(文本);",
    exampleJs: "const 数据 = JSON.parse(文本);",
    completion: "解析JSON(${1:文本});"
  },
  {
    zh: "转为JSON",
    target: "JSON.stringify",
    kind: "apiFunction",
    category: "json",
    level: "basic",
    description: "把 JavaScript 值转换成 JSON 字符串。",
    exampleZh: "声明常量 文本 = 转为JSON(数据);",
    exampleJs: "const 文本 = JSON.stringify(数据);",
    completion: "转为JSON(${1:值});"
  },
  {
    zh: "随机数",
    target: "Math.random",
    kind: "apiFunction",
    category: "math",
    level: "foundation",
    description: "生成一个 0 到 1 之间的随机小数。",
    exampleZh: "声明常量 数 = 随机数();",
    exampleJs: "const 数 = Math.random();",
    completion: "随机数()"
  },
  {
    zh: "向下取整",
    target: "Math.floor",
    kind: "apiFunction",
    category: "math",
    level: "foundation",
    description: "把数字向下取整。",
    exampleZh: "打印(向下取整(3.8));",
    exampleJs: "console.log(Math.floor(3.8));",
    completion: "向下取整(${1:数字});"
  },
  {
    zh: "向上取整",
    target: "Math.ceil",
    kind: "apiFunction",
    category: "math",
    level: "foundation",
    description: "把数字向上取整。",
    exampleZh: "打印(向上取整(3.2));",
    exampleJs: "console.log(Math.ceil(3.2));",
    completion: "向上取整(${1:数字});"
  },
  {
    zh: "四舍五入",
    target: "Math.round",
    kind: "apiFunction",
    category: "math",
    level: "foundation",
    description: "把数字四舍五入到最接近的整数。",
    exampleZh: "打印(四舍五入(3.5));",
    exampleJs: "console.log(Math.round(3.5));",
    completion: "四舍五入(${1:数字});"
  },
  {
    zh: "最大值",
    target: "Math.max",
    kind: "apiFunction",
    category: "math",
    level: "foundation",
    description: "获取一组数字中的最大值。",
    exampleZh: "打印(最大值(1, 8, 3));",
    exampleJs: "console.log(Math.max(1, 8, 3));",
    completion: "最大值(${1:数字});"
  },
  {
    zh: "最小值",
    target: "Math.min",
    kind: "apiFunction",
    category: "math",
    level: "foundation",
    description: "获取一组数字中的最小值。",
    exampleZh: "打印(最小值(1, 8, 3));",
    exampleJs: "console.log(Math.min(1, 8, 3));",
    completion: "最小值(${1:数字});"
  },
  {
    zh: "绝对值",
    target: "Math.abs",
    kind: "apiFunction",
    category: "math",
    level: "foundation",
    description: "获取一个数字的绝对值。",
    exampleZh: "打印(绝对值(-5));",
    exampleJs: "console.log(Math.abs(-5));",
    completion: "绝对值(${1:数字});"
  },
  {
    zh: "幂",
    target: "Math.pow",
    kind: "apiFunction",
    category: "math",
    level: "basic",
    description: "计算一个数字的指定次方。",
    exampleZh: "打印(幂(2, 3));",
    exampleJs: "console.log(Math.pow(2, 3));",
    completion: "幂(${1:底数}, ${2:指数});"
  },
  {
    zh: "平方根",
    target: "Math.sqrt",
    kind: "apiFunction",
    category: "math",
    level: "basic",
    description: "计算一个数字的平方根。",
    exampleZh: "打印(平方根(16));",
    exampleJs: "console.log(Math.sqrt(16));",
    completion: "平方根(${1:数字});"
  },
  {
    zh: "日期",
    target: "Date",
    kind: "apiFunction",
    category: "date",
    level: "basic",
    description: "创建或处理日期时间对象。",
    exampleZh: "声明常量 今天 = 新建 日期();",
    exampleJs: "const 今天 = new Date();",
    completion: "日期(${1:参数})"
  },
  {
    zh: "当前时间",
    target: "Date.now",
    kind: "apiFunction",
    category: "date",
    level: "basic",
    description: "获取当前时间戳。",
    exampleZh: "声明常量 时间戳 = 当前时间();",
    exampleJs: "const 时间戳 = Date.now();",
    completion: "当前时间()"
  },
  {
    zh: "转大写",
    target: "toUpperCase",
    kind: "method",
    category: "string",
    level: "foundation",
    description: "把字符串转成大写。",
    exampleZh: "名字.转大写()",
    exampleJs: "名字.toUpperCase()",
    completion: "转大写()"
  },
  {
    zh: "转小写",
    target: "toLowerCase",
    kind: "method",
    category: "string",
    level: "foundation",
    description: "把字符串转成小写。",
    exampleZh: "名字.转小写()",
    exampleJs: "名字.toLowerCase()",
    completion: "转小写()"
  },
  {
    zh: "去空格",
    target: "trim",
    kind: "method",
    category: "string",
    level: "foundation",
    description: "去掉字符串开头和结尾的空白字符。",
    exampleZh: "名字.去空格()",
    exampleJs: "名字.trim()",
    completion: "去空格()"
  },
  {
    zh: "包含",
    target: "includes",
    kind: "method",
    category: "string",
    level: "foundation",
    description: "判断字符串中是否包含指定内容。",
    exampleZh: "名字.包含(\"A\")",
    exampleJs: "名字.includes(\"A\")",
    completion: "包含(${1:内容})"
  },
  {
    zh: "开始于",
    target: "startsWith",
    kind: "method",
    category: "string",
    level: "basic",
    description: "判断字符串是否以指定内容开头。",
    exampleZh: "名字.开始于(\"A\")",
    exampleJs: "名字.startsWith(\"A\")",
    completion: "开始于(${1:内容})"
  },
  {
    zh: "结束于",
    target: "endsWith",
    kind: "method",
    category: "string",
    level: "basic",
    description: "判断字符串是否以指定内容结尾。",
    exampleZh: "名字.结束于(\"n\")",
    exampleJs: "名字.endsWith(\"n\")",
    completion: "结束于(${1:内容})"
  },
  {
    zh: "切片",
    target: "slice",
    kind: "method",
    category: "string",
    level: "foundation",
    description: "截取字符串中的一部分。",
    exampleZh: "名字.切片(0, 2)",
    exampleJs: "名字.slice(0, 2)",
    completion: "切片(${1:开始}, ${2:结束})"
  },
  {
    zh: "分割",
    target: "split",
    kind: "method",
    category: "string",
    level: "foundation",
    description: "按指定分隔符把字符串切成数组。",
    exampleZh: "文本.分割(\",\")",
    exampleJs: "文本.split(\",\")",
    completion: "分割(${1:分隔符})"
  },
  {
    zh: "替换",
    target: "replace",
    kind: "method",
    category: "string",
    level: "basic",
    description: "替换字符串中的指定内容。",
    exampleZh: "文本.替换(\"旧\", \"新\")",
    exampleJs: "文本.replace(\"旧\", \"新\")",
    completion: "替换(${1:旧内容}, ${2:新内容})"
  },
  {
    zh: "重复",
    target: "repeat",
    kind: "method",
    category: "string",
    level: "basic",
    description: "把字符串重复指定次数。",
    exampleZh: "文本.重复(3)",
    exampleJs: "文本.repeat(3)",
    completion: "重复(${1:次数})"
  },
  {
    zh: "添加",
    target: "push",
    kind: "method",
    category: "array",
    level: "foundation",
    description: "向数组末尾添加一个或多个元素。",
    exampleZh: "分数列表.添加(100)",
    exampleJs: "分数列表.push(100)",
    completion: "添加(${1:元素})"
  },
  {
    zh: "弹出",
    target: "pop",
    kind: "method",
    category: "array",
    level: "foundation",
    description: "移除并返回数组最后一个元素。",
    exampleZh: "分数列表.弹出()",
    exampleJs: "分数列表.pop()",
    completion: "弹出()"
  },
  {
    zh: "开头添加",
    target: "unshift",
    kind: "method",
    category: "array",
    level: "basic",
    description: "向数组开头添加一个或多个元素。",
    exampleZh: "分数列表.开头添加(100)",
    exampleJs: "分数列表.unshift(100)",
    completion: "开头添加(${1:元素})"
  },
  {
    zh: "开头移除",
    target: "shift",
    kind: "method",
    category: "array",
    level: "basic",
    description: "移除并返回数组第一个元素。",
    exampleZh: "分数列表.开头移除()",
    exampleJs: "分数列表.shift()",
    completion: "开头移除()"
  },
  {
    zh: "包含",
    target: "includes",
    kind: "method",
    category: "array",
    level: "foundation",
    description: "判断数组中是否包含指定元素。",
    exampleZh: "分数列表.包含(80)",
    exampleJs: "分数列表.includes(80)",
    completion: "包含(${1:元素})"
  },
  {
    zh: "查找",
    target: "find",
    kind: "method",
    category: "array",
    level: "basic",
    description: "找到数组中第一个符合条件的元素。",
    exampleZh: "分数列表.查找((分数) => 分数 >= 60)",
    exampleJs: "分数列表.find((分数) => 分数 >= 60)",
    completion: "查找((${1:元素}) => ${2:条件})"
  },
  {
    zh: "查找位置",
    target: "findIndex",
    kind: "method",
    category: "array",
    level: "basic",
    description: "找到数组中第一个符合条件元素的位置。",
    exampleZh: "分数列表.查找位置((分数) => 分数 >= 60)",
    exampleJs: "分数列表.findIndex((分数) => 分数 >= 60)",
    completion: "查找位置((${1:元素}) => ${2:条件})"
  },
  {
    zh: "筛选",
    target: "filter",
    kind: "method",
    category: "array",
    level: "foundation",
    description: "筛选出数组中所有符合条件的元素。",
    exampleZh: "分数列表.筛选((分数) => 分数 >= 60)",
    exampleJs: "分数列表.filter((分数) => 分数 >= 60)",
    completion: "筛选((${1:元素}) => ${2:条件})"
  },
  {
    zh: "映射",
    target: "map",
    kind: "method",
    category: "array",
    level: "foundation",
    description: "把数组中的每个元素转换成新的结果。",
    exampleZh: "分数列表.映射((分数) => 分数 + 5)",
    exampleJs: "分数列表.map((分数) => 分数 + 5)",
    completion: "映射((${1:元素}) => ${2:结果})"
  },
  {
    zh: "遍历",
    target: "forEach",
    kind: "method",
    category: "array",
    level: "foundation",
    description: "对数组中的每个元素执行一次操作。",
    exampleZh: "分数列表.遍历((分数) => 打印(分数))",
    exampleJs: "分数列表.forEach((分数) => console.log(分数))",
    completion: "遍历((${1:元素}) => {\n  ${2:// 代码}\n})"
  },
  {
    zh: "排序",
    target: "sort",
    kind: "method",
    category: "array",
    level: "basic",
    description: "对数组元素进行排序。",
    exampleZh: "分数列表.排序((a, b) => a - b)",
    exampleJs: "分数列表.sort((a, b) => a - b)",
    completion: "排序(${1:(a, b) => a - b})"
  },
  {
    zh: "反转",
    target: "reverse",
    kind: "method",
    category: "array",
    level: "basic",
    description: "反转数组中元素的顺序。",
    exampleZh: "分数列表.反转()",
    exampleJs: "分数列表.reverse()",
    completion: "反转()"
  },
  {
    zh: "连接",
    target: "join",
    kind: "method",
    category: "array",
    level: "foundation",
    description: "把数组元素连接成一个字符串。",
    exampleZh: "分数列表.连接(\",\")",
    exampleJs: "分数列表.join(\",\")",
    completion: "连接(${1:分隔符})"
  },
  {
    zh: "切片",
    target: "slice",
    kind: "method",
    category: "array",
    level: "foundation",
    description: "截取数组中的一部分，得到一个新数组。",
    exampleZh: "分数列表.切片(0, 2)",
    exampleJs: "分数列表.slice(0, 2)",
    completion: "切片(${1:开始}, ${2:结束})"
  },
  {
    zh: "拼接",
    target: "splice",
    kind: "method",
    category: "array",
    level: "basic",
    description: "从数组中删除、替换或插入元素。",
    exampleZh: "分数列表.拼接(1, 1, 100)",
    exampleJs: "分数列表.splice(1, 1, 100)",
    completion: "拼接(${1:开始位置}, ${2:删除数量}, ${3:新元素})"
  },
  {
    zh: "归约",
    target: "reduce",
    kind: "method",
    category: "array",
    level: "basic",
    description: "把数组元素逐步累积成一个结果。",
    exampleZh: "分数列表.归约((总和, 分数) => 总和 + 分数, 0)",
    exampleJs: "分数列表.reduce((总和, 分数) => 总和 + 分数, 0)",
    completion: "归约((${1:累计值}, ${2:元素}) => ${3:结果}, ${4:初始值})"
  }
];

export function getEntriesByKind(kind: EntryKind): ZhCodeEntry[] {
  return zhCodeEntries.filter((entry) => entry.kind === kind);
}

export function getEntriesByCategory(category: string): ZhCodeEntry[] {
  return zhCodeEntries.filter((entry) => entry.category === category);
}

export function findEntryByZh(zh: string): ZhCodeEntry | undefined {
  return zhCodeEntries.find((entry) => entry.zh === zh);
}

export function getEntriesByZh(zh: string): ZhCodeEntry[] {
  return zhCodeEntries.filter((entry) => entry.zh === zh);
}

export const keywordEntries = getEntriesByKind("keyword");
export const literalEntries = getEntriesByKind("literal");
export const operatorWordEntries = getEntriesByKind("operatorWord");
export const apiFunctionEntries = getEntriesByKind("apiFunction");
export const methodEntries = getEntriesByKind("method");
