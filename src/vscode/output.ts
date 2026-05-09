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
