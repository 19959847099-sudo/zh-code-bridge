import { describe, expect, it } from "vitest";
import { scanSourceSegments } from "../src/compiler/scanner";

describe("scanSourceSegments", () => {
  it("recognizes plain code segments", () => {
    expect(scanSourceSegments("打印(分数);")).toEqual([
      { kind: "code", text: "打印(分数);" }
    ]);
  });

  it("protects double-quoted strings with escaped quotes", () => {
    const segments = scanSourceSegments("打印(\"他说：\\\"如果\\\" 不应替换\");");

    expect(segments).toEqual([
      { kind: "code", text: "打印(" },
      { kind: "string", text: "\"他说：\\\"如果\\\" 不应替换\"" },
      { kind: "code", text: ");" }
    ]);
  });

  it("protects single-quoted strings", () => {
    const segments = scanSourceSegments("打印('返回 不应替换');");

    expect(segments.some((segment) => segment.kind === "string" && segment.text.includes("返回"))).toBe(true);
    expect(segments.filter((segment) => segment.kind === "code").map((segment) => segment.text).join("")).not.toContain("返回");
  });

  it("protects template strings as strings", () => {
    const segments = scanSourceSegments("打印(`如果 ${分数} 返回`);");

    expect(segments.some((segment) => segment.kind === "string" && segment.text.includes("如果"))).toBe(true);
    expect(segments.some((segment) => segment.kind === "string" && segment.text.includes("返回"))).toBe(true);
  });

  it("protects line comments", () => {
    const segments = scanSourceSegments("// 如果 返回 打印\n打印(\"ok\");");

    expect(segments[0]).toEqual({ kind: "comment", text: "// 如果 返回 打印" });
    expect(segments.map((segment) => (segment.kind === "code" ? segment.text : "")).join("")).not.toContain("如果");
  });

  it("protects block comments", () => {
    const segments = scanSourceSegments("/* 如果 返回 打印 */\n打印(\"ok\");");

    expect(segments[0]).toEqual({ kind: "comment", text: "/* 如果 返回 打印 */" });
    expect(segments.map((segment) => (segment.kind === "code" ? segment.text : "")).join("")).not.toContain("返回");
  });
});
