import * as fs from "fs/promises";
import * as path from "path";
import { describe, expect, it } from "vitest";
import { generateJavaScriptFromZhjs } from "../src/compiler/generate";

const examplesDir = path.join(process.cwd(), "examples");

describe("examples", () => {
  it("generates score.zhjs into standard JavaScript", async () => {
    const source = await readExample("score.zhjs");
    const generated = generateJavaScriptFromZhjs(source, { sourceFileName: "score.zhjs" });

    expect(generated).toContain("function 判断成绩(分数)");
    expect(generated).toContain("if (分数 >= 60)");
    expect(generated).toContain("return \"通过\";");
    expect(generated).toContain("console.log(判断成绩(80));");
  });

  it("generates string-array.zhjs method calls", async () => {
    const source = await readExample("string-array.zhjs");
    const generated = generateJavaScriptFromZhjs(source, { sourceFileName: "string-array.zhjs" });

    expect(generated).toContain("const 名字 = \" adrian \";");
    expect(generated).toContain("console.log(名字.trim().toUpperCase());");
    expect(generated).toContain("分数列表.push(100);");
    expect(generated).toContain("分数列表.filter((分数) => 分数 >= 90)");
  });

  it("generates json-math.zhjs API calls", async () => {
    const source = await readExample("json-math.zhjs");
    const generated = generateJavaScriptFromZhjs(source, { sourceFileName: "json-math.zhjs" });

    expect(generated).toContain("const 用户 = JSON.parse(用户文本);");
    expect(generated).toContain("console.log(Object.keys(用户));");
    expect(generated).toContain("Math.floor(Math.random() * 100)");
    expect(generated).toContain("console.log(Date.now());");
  });
});

async function readExample(fileName: string): Promise<string> {
  return fs.readFile(path.join(examplesDir, fileName), "utf8");
}
