import { describe, expect, it } from "vitest";
import { transformZhjsToJs } from "../src/compiler/transform";

describe("transformZhjsToJs", () => {
  it("transforms condition keywords and return values", () => {
    const source = "如果 (分数 >= 60) {\n  返回 真;\n} 否则 {\n  返回 假;\n}";

    expect(transformZhjsToJs(source)).toBe("if (分数 >= 60) {\n  return true;\n} else {\n  return false;\n}");
  });

  it("transforms variable declarations while preserving Chinese variable names", () => {
    const source = "声明变量 分数 = 80;\n声明常量 名字 = \"adrian\";\n打印(名字);";

    expect(transformZhjsToJs(source)).toBe("let 分数 = 80;\nconst 名字 = \"adrian\";\nconsole.log(名字);");
  });

  it("transforms apiFunction calls only in call form", () => {
    const source = "打印(\"通过\");\n声明变量 打印结果 = \"ok\";";

    expect(transformZhjsToJs(source)).toBe("console.log(\"通过\");\nlet 打印结果 = \"ok\";");
  });

  it("does not transform apiFunction names when they are plain variables", () => {
    const source = "声明变量 打印 = \"不是函数调用\";\n声明变量 输出错误信息 = \"ok\";";

    expect(transformZhjsToJs(source)).toBe("let 打印 = \"不是函数调用\";\nlet 输出错误信息 = \"ok\";");
  });

  it("transforms apiFunction calls with whitespace before the call paren", () => {
    expect(transformZhjsToJs("打印 (\"ok\");")).toBe("console.log (\"ok\");");
  });

  it("transforms method calls only after a dot", () => {
    const source = "名字.转大写();\n分数列表.添加(1);\n声明变量 添加 = 1;\n添加(1);";

    expect(transformZhjsToJs(source)).toBe("名字.toUpperCase();\n分数列表.push(1);\nlet 添加 = 1;\n添加(1);");
  });

  it("does not transform method names without dot-call form", () => {
    const source = "声明变量 转大写 = \"不是方法\";\n转大写();\n声明变量 添加 = 1;";

    expect(transformZhjsToJs(source)).toBe("let 转大写 = \"不是方法\";\n转大写();\nlet 添加 = 1;");
  });

  it("keeps method matching strict when whitespace appears after the dot", () => {
    expect(transformZhjsToJs("名字. 转大写();")).toBe("名字. 转大写();");
  });

  it("does not transform entry words inside strings", () => {
    const source = "打印(\"如果、返回、转大写 这些词在字符串里不应被替换\");";

    expect(transformZhjsToJs(source)).toBe("console.log(\"如果、返回、转大写 这些词在字符串里不应被替换\");");
  });

  it("does not transform entry words inside single-quoted strings", () => {
    const source = "打印('如果 返回 转大写');";

    expect(transformZhjsToJs(source)).toBe("console.log('如果 返回 转大写');");
  });

  it("keeps template strings protected, including interpolation expressions", () => {
    const source = "打印(`结果是 ${判断成绩(80)}，如果 返回 不替换`);";

    expect(transformZhjsToJs(source)).toBe("console.log(`结果是 ${判断成绩(80)}，如果 返回 不替换`);");
  });

  it("does not crash on unclosed strings or comments", () => {
    expect(transformZhjsToJs("打印(\"如果 返回")).toBe("console.log(\"如果 返回");
    expect(transformZhjsToJs("打印(\"ok\");\n/* 如果 返回")).toBe("console.log(\"ok\");\n/* 如果 返回");
  });

  it("does not transform entry words inside comments", () => {
    const source = "// 如果 返回 打印 都不应在注释中被替换\n打印(\"ok\");\n/* 声明变量 转大写 */";

    expect(transformZhjsToJs(source)).toBe("// 如果 返回 打印 都不应在注释中被替换\nconsole.log(\"ok\");\n/* 声明变量 转大写 */");
  });

  it("uses longest entry first", () => {
    const source = "如果 (分数 >= 90) {\n  返回 \"优秀\";\n} 否则如果 (分数 >= 60) {\n  返回 \"通过\";\n}";

    expect(transformZhjsToJs(source)).toBe("if (分数 >= 90) {\n  return \"优秀\";\n} else if (分数 >= 60) {\n  return \"通过\";\n}");
  });

  it("keeps common long entries stable", () => {
    const source = "声明常量 文本 = 输出错误(\"坏消息\");\n如果 (是否不是数字(文本)) {\n  删除属性 当前对象.值;\n}";

    expect(transformZhjsToJs(source)).toBe("const 文本 = console.error(\"坏消息\");\nif (isNaN(文本)) {\n  delete this.值;\n}");
  });

  it("preserves Chinese identifiers that merely contain entry words", () => {
    const source = "声明变量 如果分数 = 80;\n声明变量 名字 = \"adrian\";\n打印(如果分数);";

    expect(transformZhjsToJs(source)).toBe("let 如果分数 = 80;\nlet 名字 = \"adrian\";\nconsole.log(如果分数);");
  });
});
