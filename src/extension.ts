import * as vscode from "vscode";
import { registerZhCodeCommands } from "./vscode/commands";

export function activate(context: vscode.ExtensionContext) {
  registerZhCodeCommands(context);
  console.log("ZhCode Bridge is now active.");
}

export function deactivate() {}
