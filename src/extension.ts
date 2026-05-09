import * as vscode from "vscode";
import { registerZhCodeCompletionProvider } from "./vscode/completionProvider";
import { registerZhCodeCommands } from "./vscode/commands";
import { registerZhCodeHoverProvider } from "./vscode/hoverProvider";

export function activate(context: vscode.ExtensionContext) {
  registerZhCodeCommands(context);
  registerZhCodeHoverProvider(context);
  registerZhCodeCompletionProvider(context);
  console.log("ZhCode Bridge is now active.");
}

export function deactivate() {}
