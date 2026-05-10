import * as vscode from "vscode";
import { zhCodeEntries } from "../compiler/entries";
import type { EntryKind, ZhCodeEntry } from "../compiler/types";

const preferredEntryOrder = [
  "声明变量",
  "声明常量",
  "如果",
  "否则如果",
  "否则",
  "函数",
  "返回",
  "打印"
];

const kindPriority: Record<EntryKind, number> = {
  keyword: 0,
  apiFunction: 1,
  method: 2,
  literal: 3,
  operatorWord: 4
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
  return groupEntriesForCompletion(zhCodeEntries).map((group) =>
    createCompletionItem(group, range)
  );
}

export function groupEntriesForCompletion(entries: ZhCodeEntry[]): CompletionEntryGroup[] {
  const groups = new Map<string, ZhCodeEntry[]>();

  for (const entry of entries) {
    const group = groups.get(entry.zh) ?? [];
    group.push(entry);
    groups.set(entry.zh, group);
  }

  return [...groups.entries()]
    .map(([zh, groupEntries]) => ({
      zh,
      entries: sortEntriesForDisplay(groupEntries),
      primary: sortEntriesForDisplay(groupEntries)[0]
    }))
    .sort(compareCompletionGroups);
}

function createCompletionItem(group: CompletionEntryGroup, range?: vscode.Range): vscode.CompletionItem {
  const { primary } = group;
  const item = new vscode.CompletionItem(group.zh, toCompletionItemKind(primary.kind));
  item.detail = createCompletionDetail(group);
  item.documentation = createCompletionDocumentation(group);
  item.insertText = primary.completion ? new vscode.SnippetString(primary.completion) : group.zh;
  item.sortText = createSortText(group);
  item.filterText = group.zh;
  item.range = range;
  return item;
}

function createCompletionDetail(group: CompletionEntryGroup): string {
  const targets = unique(group.entries.map((entry) => entry.target)).join(" / ");
  const categories = unique(group.entries.map((entry) => entry.category)).join(" / ");
  return group.entries.length > 1 ? `${targets} (${categories})` : targets;
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

function createCompletionDocumentation(group: CompletionEntryGroup): vscode.MarkdownString {
  const markdown = new vscode.MarkdownString(undefined, true);
  markdown.isTrusted = false;
  markdown.appendMarkdown(`**${group.zh}**\n\n`);

  for (const [index, entry] of group.entries.entries()) {
    if (index > 0) {
      markdown.appendMarkdown("\n---\n\n");
    }

    markdown.appendMarkdown(`适用场景：\`${entry.category}\`\n\n`);
    markdown.appendMarkdown(`对应 JavaScript：\`${entry.target}\`\n\n`);
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
  }

  return markdown;
}

function compareCompletionGroups(left: CompletionEntryGroup, right: CompletionEntryGroup): number {
  return createSortText(left).localeCompare(createSortText(right), "zh-Hans-CN");
}

function createSortText(group: CompletionEntryGroup): string {
  const preferredIndex = preferredEntryOrder.indexOf(group.zh);
  const preferredRank = preferredIndex === -1 ? 99 : preferredIndex;
  return [
    preferredRank.toString().padStart(2, "0"),
    kindPriority[group.primary.kind].toString().padStart(2, "0"),
    group.zh
  ].join("_");
}

function sortEntriesForDisplay(entries: ZhCodeEntry[]): ZhCodeEntry[] {
  return [...entries].sort((left, right) => {
    const kindDiff = kindPriority[left.kind] - kindPriority[right.kind];
    if (kindDiff !== 0) {
      return kindDiff;
    }

    return left.category.localeCompare(right.category, "zh-Hans-CN");
  });
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
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

export interface CompletionEntryGroup {
  zh: string;
  primary: ZhCodeEntry;
  entries: ZhCodeEntry[];
}
