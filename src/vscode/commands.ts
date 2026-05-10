import * as path from "path";
import * as vscode from "vscode";
import { generateJavaScriptFromZhjs } from "../compiler/generate";
import { getGeneratedJsPath, isZhjsFile, writeGeneratedJavaScriptFile } from "../utils/file";
import { runJavaScriptFile } from "../utils/node";
import {
  createUserFacingErrorMessage,
  formatJavaScriptErrorWithExplanation
} from "./diagnostics";
import {
  formatOutputSection,
  getZhCodeOutputChannel,
  showOutputError,
  showOutputMessage
} from "./output";

export function registerZhCodeCommands(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("zhCodeBridge.generateJavaScript", async () => {
      await runCommand("Generate JavaScript", async () => {
        const generated = await generateFromActiveEditor();
        vscode.window.showInformationMessage(`ZhCode JavaScript generated: ${generated.jsPath}`);
      });
    }),
    vscode.commands.registerCommand("zhCodeBridge.runCurrentFile", async () => {
      await runCommand("Run Current File", async () => {
        const generated = await generateFromActiveEditor();
        const result = await runJavaScriptFile(generated.jsPath);
        const channel = getZhCodeOutputChannel();

        channel.appendLine(formatOutputSection("Run Current File", [
          { label: "Source", value: generated.zhjsPath },
          { label: "Running", value: generated.jsPath },
          "",
          "stdout:",
          result.stdout.trimEnd() || "<empty>",
          "",
          "stderr:",
          formatRunStderr(result.stderr, result.exitCode),
          "",
          { label: "exitCode", value: String(result.exitCode) },
          ""
        ]));
        channel.show(true);

        if (result.exitCode === 0) {
          vscode.window.showInformationMessage("ZhCode file ran successfully.");
        } else {
          vscode.window.showErrorMessage(`ZhCode file exited with code ${result.exitCode}.`);
        }
      });
    }),
    vscode.commands.registerCommand("zhCodeBridge.showGeneratedJavaScript", async () => {
      await runCommand("Show Generated JavaScript", async () => {
        const editor = getActiveZhjsEditor();
        const document = editor.document;
        const generated = generateJavaScriptFromZhjs(document.getText(), {
          sourceFileName: path.basename(document.uri.fsPath)
        });
        const previewDocument = await vscode.workspace.openTextDocument({
          content: generated,
          language: "javascript"
        });

        await vscode.window.showTextDocument(previewDocument, {
          preview: true,
          viewColumn: vscode.ViewColumn.Beside
        });
      });
    })
  );
}

async function generateFromActiveEditor(): Promise<GeneratedFileResult> {
  const editor = getActiveZhjsEditor();
  const document = editor.document;
  const zhjsPath = document.uri.fsPath;
  const jsPath = getGeneratedJsPath(zhjsPath);
  const generated = generateJavaScriptFromZhjs(document.getText(), {
    sourceFileName: path.basename(zhjsPath)
  });

  await writeGeneratedJavaScriptFile(jsPath, generated);
  showOutputMessage(formatOutputSection("Generate JavaScript", [
    { label: "Source", value: zhjsPath },
    { label: "Output", value: jsPath },
    { label: "Status", value: "success" },
    ""
  ]));

  return { zhjsPath, jsPath };
}

function getActiveZhjsEditor(): vscode.TextEditor {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    throw new Error("没有活动编辑器。请先打开一个 .zhjs 文件。");
  }

  if (editor.document.uri.scheme !== "file" || !isZhjsFile(editor.document.uri.fsPath)) {
    throw new Error("当前文件不是 .zhjs 文件。请打开 ZhCode / zhjs 文件后再执行命令。");
  }

  return editor;
}

async function runCommand(name: string, command: () => Promise<void>): Promise<void> {
  try {
    await command();
  } catch (error) {
    const message = formatError(error);
    showOutputError(`[ZhCode Bridge] ${name} failed:\n${message}\n`);
    vscode.window.showErrorMessage(createUserFacingErrorMessage(error));
  }
}

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.stack ?? error.message;
  }

  return String(error);
}

function formatRunStderr(stderr: string, exitCode: number | null): string {
  const trimmed = stderr.trimEnd();

  if (exitCode === 0) {
    return trimmed || "<empty>";
  }

  if (!trimmed) {
    return "<empty>";
  }

  return formatJavaScriptErrorWithExplanation(trimmed);
}

interface GeneratedFileResult {
  zhjsPath: string;
  jsPath: string;
}
