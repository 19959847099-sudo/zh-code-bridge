import { zhCodeEntries } from "./entries";
import type { EntryKind, ZhCodeEntry } from "./types";
import { scanSourceSegments } from "./scanner";

export interface TransformOptions {}

const keywordLikeKinds: EntryKind[] = ["keyword", "literal", "operatorWord"];

const keywordLikeEntries = sortEntriesByLength(
  zhCodeEntries.filter((entry) => keywordLikeKinds.includes(entry.kind))
);

const apiFunctionEntries = sortEntriesByLength(
  zhCodeEntries.filter((entry) => entry.kind === "apiFunction")
);

const methodEntries = sortEntriesByLength(
  uniqueEntriesByZhAndTarget(zhCodeEntries.filter((entry) => entry.kind === "method"))
);

export function transformZhjsToJs(source: string, _options: TransformOptions = {}): string {
  return scanSourceSegments(source)
    .map((segment) => {
      if (segment.kind !== "code") {
        return segment.text;
      }

      return transformCodeSegment(segment.text);
    })
    .join("");
}

function transformCodeSegment(code: string): string {
  let result = "";
  let index = 0;

  while (index < code.length) {
    const methodMatch = matchMethodCall(code, index);
    if (methodMatch) {
      result += methodMatch.replacement;
      index += methodMatch.length;
      continue;
    }

    const apiFunctionMatch = matchApiFunctionCall(code, index);
    if (apiFunctionMatch) {
      result += apiFunctionMatch.replacement;
      index += apiFunctionMatch.length;
      continue;
    }

    const keywordLikeMatch = matchKeywordLike(code, index);
    if (keywordLikeMatch) {
      result += keywordLikeMatch.replacement;
      index += keywordLikeMatch.length;
      continue;
    }

    result += code[index];
    index += 1;
  }

  return result;
}

function matchMethodCall(code: string, index: number): ReplacementMatch | undefined {
  if (code[index] !== ".") {
    return undefined;
  }

  for (const entry of methodEntries) {
    const entryStart = index + 1;
    if (!code.startsWith(entry.zh, entryStart)) {
      continue;
    }

    const afterEntry = entryStart + entry.zh.length;
    const callStart = skipWhitespace(code, afterEntry);
    if (code[callStart] === "(") {
      return {
        replacement: `.${entry.target}`,
        length: 1 + entry.zh.length
      };
    }
  }

  return undefined;
}

function matchApiFunctionCall(code: string, index: number): ReplacementMatch | undefined {
  for (const entry of apiFunctionEntries) {
    if (!code.startsWith(entry.zh, index) || !hasIdentifierBoundaryBefore(code, index)) {
      continue;
    }

    const afterEntry = index + entry.zh.length;
    const callStart = skipWhitespace(code, afterEntry);
    if (code[callStart] === "(") {
      return {
        replacement: entry.target,
        length: entry.zh.length
      };
    }
  }

  return undefined;
}

function matchKeywordLike(code: string, index: number): ReplacementMatch | undefined {
  for (const entry of keywordLikeEntries) {
    if (
      code.startsWith(entry.zh, index) &&
      hasIdentifierBoundaryBefore(code, index) &&
      hasIdentifierBoundaryAfter(code, index + entry.zh.length)
    ) {
      return {
        replacement: entry.target,
        length: entry.zh.length
      };
    }
  }

  return undefined;
}

function sortEntriesByLength(entries: ZhCodeEntry[]): ZhCodeEntry[] {
  return [...entries].sort((left, right) => right.zh.length - left.zh.length);
}

function uniqueEntriesByZhAndTarget(entries: ZhCodeEntry[]): ZhCodeEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    const key = `${entry.zh}\u0000${entry.target}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function skipWhitespace(text: string, index: number): number {
  let current = index;
  while (current < text.length && /\s/.test(text[current])) {
    current += 1;
  }
  return current;
}

function hasIdentifierBoundaryBefore(text: string, index: number): boolean {
  return index === 0 || !isIdentifierChar(text[index - 1]);
}

function hasIdentifierBoundaryAfter(text: string, index: number): boolean {
  return index >= text.length || !isIdentifierChar(text[index]);
}

function isIdentifierChar(char: string | undefined): boolean {
  return char !== undefined && /[\p{L}\p{N}_$]/u.test(char);
}

interface ReplacementMatch {
  replacement: string;
  length: number;
}
