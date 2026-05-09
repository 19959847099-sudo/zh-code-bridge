export type EntryKind =
  | "keyword"
  | "literal"
  | "operatorWord"
  | "apiFunction"
  | "method";

export type EntryLevel = "foundation" | "basic" | "advanced";

export interface ZhCodeEntry {
  zh: string;
  target: string;
  kind: EntryKind;
  category: string;
  description: string;
  level?: EntryLevel;
  exampleZh?: string;
  exampleJs?: string;
  completion?: string;
}
