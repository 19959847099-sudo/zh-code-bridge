import * as fs from "fs/promises";
import * as path from "path";
import { GENERATED_FILE_MARKER } from "../compiler/generate";

export function isZhjsFile(filePath: string): boolean {
  return filePath.toLowerCase().endsWith(".zhjs");
}

export function getGeneratedJsPath(zhjsPath: string): string {
  if (!isZhjsFile(zhjsPath)) {
    throw new Error(`Expected a .zhjs file path, got: ${zhjsPath}`);
  }

  return `${zhjsPath.slice(0, -".zhjs".length)}.js`;
}

export async function assertCanWriteGeneratedJsFile(filePath: string): Promise<void> {
  try {
    const existing = await fs.readFile(filePath, "utf8");
    if (!existing.includes(GENERATED_FILE_MARKER)) {
      throw new Error(
        "目标 .js 文件已存在，且看起来不是 ZhCode Bridge 生成文件。为避免覆盖用户代码，已停止生成。"
      );
    }
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return;
    }

    throw error;
  }
}

export async function writeGeneratedJavaScriptFile(filePath: string, content: string): Promise<void> {
  await assertCanWriteGeneratedJsFile(filePath);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf8");
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
