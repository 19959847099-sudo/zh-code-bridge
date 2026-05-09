import { execFile } from "child_process";
import * as path from "path";

export interface RunNodeResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

export function runJavaScriptFile(filePath: string): Promise<RunNodeResult> {
  if (!filePath.toLowerCase().endsWith(".js")) {
    return Promise.reject(new Error(`Refusing to run non-JavaScript file: ${filePath}`));
  }

  return new Promise((resolve) => {
    execFile("node", [filePath], { cwd: path.dirname(filePath) }, (error, stdout, stderr) => {
      resolve({
        stdout,
        stderr,
        exitCode: getExitCode(error)
      });
    });
  });
}

function getExitCode(error: Error | null): number | null {
  if (!error) {
    return 0;
  }

  if ("code" in error && typeof error.code === "number") {
    return error.code;
  }

  return null;
}
