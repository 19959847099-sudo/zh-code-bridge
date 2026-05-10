import * as vscode from "vscode";

let outputChannel: vscode.OutputChannel | undefined;

export function getZhCodeOutputChannel(): vscode.OutputChannel {
  outputChannel ??= vscode.window.createOutputChannel("ZhCode Bridge");
  return outputChannel;
}

export function showOutputMessage(message: string): void {
  const channel = getZhCodeOutputChannel();
  channel.appendLine(message);
  channel.show(true);
}

export function showOutputError(message: string): void {
  const channel = getZhCodeOutputChannel();
  channel.appendLine(message);
  channel.show(true);
}

export function formatOutputSection(title: string, lines: OutputLine[]): string {
  const body = lines
    .map((line) => {
      if (typeof line === "string") {
        return line;
      }

      return `${line.label}: ${line.value}`;
    })
    .join("\n");

  return `[ZhCode Bridge] ${title}\n${body}`;
}

export type OutputLine = string | {
  label: string;
  value: string;
};
