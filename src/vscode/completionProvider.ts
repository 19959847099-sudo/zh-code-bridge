import * as vscode from "vscode";
import { zhCodeEntries } from "../compiler/entries";
import type { EntryKind, ZhCodeEntry } from "../compiler/types";

const kindPriority: Record<EntryKind, string> = {
  keyword: "0",
  apiFunction: "1",
  method: "2",
  literal: "3",
  operatorWord: "4"
};

export function registerZhCodeCompletionProvider(context: vscode.ExtensionContext): void {
  const provider: vscode.CompletionItemProvider = {
    provideCompletionItems(document, position) {
      const range = getChinesePrefixRange(document, position);
      return createCompletionItems(range);
    }
  };

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { language: "zhjs" },
      provider,
      "声",
      "打",
      ".",
      "转",
      "添"
    )
  );
}

export function createCompletionItems(range?: vscode.Range): vscode.CompletionItem[] {
  return zhCodeEntries.map((entry) => createCompletionItem(entry, range));
}

function createCompletionItem(entry: ZhCodeEntry, range?: vscode.Range): vscode.CompletionItem {
  const item = new vscode.CompletionItem(entry.zh, toCompletionItemKind(entry.kind));
  item.detail = entry.target;
  item.documentation = createCompletionDocumentation(entry);
  item.insertText = entry.completion ? new vscode.SnippetString(entry.completion) : entry.zh;
  item.sortText = `${kindPriority[entry.kind]}_${entry.zh}`;
  item.filterText = entry.zh;
  item.range = range;
  return item;
}

function getChinesePrefixRange(
  document: vscode.TextDocument,
  position: vscode.Position
): vscode.Range {
  const lineText = document.lineAt(position.line).text;
  let start = position.character;

  while (start > 0 && isChineseCharacter(lineText[start - 1])) {
    start -= 1;
  }

  return new vscode.Range(position.line, start, position.line, position.character);
}

function isChineseCharacter(char: string | undefined): boolean {
  return char !== undefined && /[\u3400-\u9fff]/u.test(char);
}

function createCompletionDocumentation(entry: ZhCodeEntry): vscode.MarkdownString {
  const markdown = new vscode.MarkdownString(undefined, true);
  markdown.isTrusted = false;
  markdown.appendMarkdown(`${entry.description}\n\n`);
  markdown.appendMarkdown(`对应 JavaScript：\`${entry.target}\`\n\n`);

  if (entry.exampleZh || entry.exampleJs) {
    markdown.appendMarkdown("示例：\n\n");

    if (entry.exampleZh) {
      markdown.appendCodeblock(entry.exampleZh, "zhjs");
    }

    if (entry.exampleJs) {
      markdown.appendCodeblock(entry.exampleJs, "js");
    }
  }

  return markdown;
}

function toCompletionItemKind(kind: EntryKind): vscode.CompletionItemKind {
  switch (kind) {
    case "keyword":
      return vscode.CompletionItemKind.Keyword;
    case "literal":
      return vscode.CompletionItemKind.Constant;
    case "operatorWord":
      return vscode.CompletionItemKind.Operator;
    case "apiFunction":
      return vscode.CompletionItemKind.Function;
    case "method":
      return vscode.CompletionItemKind.Method;
  }
}
