import { describe, expect, it } from "vitest";
import {
  createUserFacingErrorMessage,
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

describe("createUserFacingErrorMessage", () => {
  it("summarizes non-zhjs command errors", () => {
    expect(createUserFacingErrorMessage(new Error("当前文件不是 .zhjs 文件。"))).toContain("当前文件不是 .zhjs");
  });

  it("summarizes overwrite protection errors", () => {
    const message = createUserFacingErrorMessage(
      new Error("目标 .js 文件已存在，且看起来不是 ZhCode Bridge 生成文件。为避免覆盖用户代码，已停止生成。")
    );

    expect(message).toContain("为避免覆盖你的代码");
  });

  it("uses a short fallback for unexpected failures", () => {
    expect(createUserFacingErrorMessage(new Error("Unexpected failure"))).toContain("详细信息已写入 Output 面板");
  });
});
