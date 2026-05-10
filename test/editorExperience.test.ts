import { describe, expect, it, vi } from "vitest";
import { zhCodeEntries } from "../src/compiler/entries";
import { createCompletionItems, groupEntriesForCompletion } from "../src/vscode/completionProvider";
import { createHoverMarkdown } from "../src/vscode/hoverProvider";
import { formatOutputSection } from "../src/vscode/output";

vi.mock("vscode", () => {
  class CompletionItem {
    label: string;
    kind: number;
    detail?: string;
    documentation?: unknown;
    insertText?: unknown;
    sortText?: string;
    filterText?: string;
    range?: unknown;

    constructor(label: string, kind: number) {
      this.label = label;
      this.kind = kind;
    }
  }

  class MarkdownString {
    value = "";
    isTrusted = false;

    constructor(value = "") {
      this.value = value;
    }

    appendMarkdown(value: string) {
      this.value += value;
    }

    appendCodeblock(value: string, language?: string) {
      this.value += `\n\`\`\`${language ?? ""}\n${value}\n\`\`\`\n`;
    }
  }

  class SnippetString {
    value: string;

    constructor(value: string) {
      this.value = value;
    }
  }

  class Range {
    constructor(
      public startLine: number,
      public startCharacter: number,
      public endLine: number,
      public endCharacter: number
    ) {}
  }

  return {
    CompletionItem,
    MarkdownString,
    SnippetString,
    Range,
    CompletionItemKind: {
      Keyword: 1,
      Constant: 2,
      Operator: 3,
      Function: 4,
      Method: 5
    },
    languages: {
      registerCompletionItemProvider: vi.fn(),
      registerHoverProvider: vi.fn()
    },
    window: {
      createOutputChannel: vi.fn()
    }
  };
});

describe("completion experience", () => {
  it("groups same-name entries for completion display", () => {
    const groups = groupEntriesForCompletion(zhCodeEntries);
    const containsGroups = groups.filter((group) => group.zh === "包含");

    expect(containsGroups).toHaveLength(1);
    expect(containsGroups[0].entries.map((entry) => entry.category)).toEqual(["array", "string"]);
  });

  it("keeps common beginner entries near the top", () => {
    const labels = createCompletionItems().slice(0, 5).map((item) => item.label);

    expect(labels).toContain("声明变量");
    expect(labels).toContain("声明常量");
    expect(labels).toContain("如果");
  });

  it("shows combined detail for multi-scenario completions", () => {
    const item = createCompletionItems().find((completionItem) => completionItem.label === "包含");

    expect(item?.detail).toBe("includes (array / string)");
  });
});

describe("hover experience", () => {
  it("includes category information for multi-scenario entries", () => {
    const markdown = createHoverMarkdown(zhCodeEntries.filter((entry) => entry.zh === "包含"));
    const value = markdown.value;

    expect(value).toContain("适用场景：`array`");
    expect(value).toContain("适用场景：`string`");
    expect(value).toContain("对应 JavaScript：`includes`");
  });
});

describe("output experience", () => {
  it("formats labeled output sections", () => {
    expect(formatOutputSection("Run Current File", [
      { label: "Source", value: "score.zhjs" },
      { label: "Running", value: "score.js" },
      "",
      "stdout:",
      "通过"
    ])).toContain("[ZhCode Bridge] Run Current File\nSource: score.zhjs\nRunning: score.js");
  });
});
