import { describe, expect, it } from "vitest";
import {
  explainJavaScriptError,
  formatJavaScriptErrorWithExplanation
} from "../src/vscode/diagnostics";

describe("explainJavaScriptError", () => {
  it("explains SyntaxError", () => {
    expect(explainJavaScriptError("SyntaxError: Unexpected token }")).toContain("语法错误");
  });

  it("explains ReferenceError", () => {
    expect(explainJavaScriptError("ReferenceError: 分数 is not defined")).toContain("变量没有定义");
  });

  it("explains TypeError", () => {
    expect(explainJavaScriptError("TypeError: value is not a function")).toContain("类型错误");
  });

  it("does not guess unknown errors", () => {
    expect(explainJavaScriptError("RangeError: invalid array length")).toBeUndefined();
  });
});

describe("formatJavaScriptErrorWithExplanation", () => {
  it("keeps the original English error", () => {
    const errorText = "SyntaxError: Unexpected token ;";
    const formatted = formatJavaScriptErrorWithExplanation(errorText);

    expect(formatted).toContain("中文解释");
    expect(formatted).toContain("原始错误");
    expect(formatted).toContain(errorText);
  });

  it("returns unknown errors unchanged", () => {
    const errorText = "RangeError: invalid array length";

    expect(formatJavaScriptErrorWithExplanation(errorText)).toBe(errorText);
  });
});
