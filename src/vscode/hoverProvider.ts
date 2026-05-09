import * as vscode from "vscode";
import { getEntriesByZh, zhCodeEntries } from "../compiler/entries";
import type { ZhCodeEntry } from "../compiler/types";

const sortedEntryWords = [...new Set(zhCodeEntries.map((entry) => entry.zh))].sort(
  (left, right) => right.length - left.length
);

export function registerZhCodeHoverProvider(context: vscode.ExtensionContext): void {
  const provider: vscode.HoverProvider = {
    provideHover(document, position) {
      const lineText = document.lineAt(position.line).text;
      const match = findEntryWordAtOffset(lineText, position.character);

      if (!match) {
        return undefined;
      }

      const entries = getEntriesByZh(match.word);
      if (entries.length === 0) {
        return undefined;
      }

      return new vscode.Hover(
        createHoverMarkdown(entries),
        new vscode.Range(position.line, match.start, position.line, match.end)
      );
    }
  };

  context.subscriptions.push(vscode.languages.registerHoverProvider({ language: "zhjs" }, provider));
}

export function findEntryWordAtOffset(
  lineText: string,
  offset: number
): EntryWordMatch | undefined {
  for (const word of sortedEntryWords) {
    let start = lineText.indexOf(word);

    while (start !== -1) {
      const end = start + word.length;
      if (offset >= start && offset <= end) {
        return { word, start, end };
      }

      start = lineText.indexOf(word, start + 1);
    }
  }

  return undefined;
}

export function createHoverMarkdown(entries: ZhCodeEntry[]): vscode.MarkdownString {
  const markdown = new vscode.MarkdownString(undefined, true);
  markdown.isTrusted = false;

  entries.forEach((entry, index) => {
    if (index > 0) {
      markdown.appendMarkdown("\n\n---\n\n");
    }

    markdown.appendMarkdown(`**${entry.zh}**\n\n`);
    markdown.appendMarkdown(`对应 JavaScript：\`${entry.target}\`\n\n`);
    markdown.appendMarkdown(`类型：\`${entry.kind}\`\n\n`);
    markdown.appendMarkdown("作用：\n");
    markdown.appendMarkdown(`${entry.description}\n\n`);

    if (entry.exampleZh || entry.exampleJs) {
      markdown.appendMarkdown("示例：\n\n");

      if (entry.exampleZh) {
        markdown.appendCodeblock(entry.exampleZh, "zhjs");
      }

      if (entry.exampleJs) {
        markdown.appendCodeblock(entry.exampleJs, "js");
      }
    }
  });

  return markdown;
}

export interface EntryWordMatch {
  word: string;
  start: number;
  end: number;
}
