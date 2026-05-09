export type SourceSegmentKind = "code" | "string" | "comment";

export interface SourceSegment {
  kind: SourceSegmentKind;
  text: string;
}

export function scanSourceSegments(source: string): SourceSegment[] {
  const segments: SourceSegment[] = [];
  let index = 0;
  let codeStart = 0;

  function pushSegment(kind: SourceSegmentKind, start: number, end: number) {
    if (end > start) {
      segments.push({ kind, text: source.slice(start, end) });
    }
  }

  function pushCodeUntil(end: number) {
    pushSegment("code", codeStart, end);
  }

  while (index < source.length) {
    const char = source[index];
    const next = source[index + 1];

    if (char === "\"" || char === "'" || char === "`") {
      pushCodeUntil(index);
      const stringStart = index;
      const quote = char;
      index += 1;

      while (index < source.length) {
        const current = source[index];
        if (current === "\\") {
          index += 2;
          continue;
        }

        index += 1;
        if (current === quote) {
          break;
        }
      }

      pushSegment("string", stringStart, index);
      codeStart = index;
      continue;
    }

    if (char === "/" && next === "/") {
      pushCodeUntil(index);
      const commentStart = index;
      index += 2;

      while (index < source.length && source[index] !== "\n") {
        index += 1;
      }

      pushSegment("comment", commentStart, index);
      codeStart = index;
      continue;
    }

    if (char === "/" && next === "*") {
      pushCodeUntil(index);
      const commentStart = index;
      index += 2;

      while (index < source.length) {
        if (source[index] === "*" && source[index + 1] === "/") {
          index += 2;
          break;
        }
        index += 1;
      }

      pushSegment("comment", commentStart, index);
      codeStart = index;
      continue;
    }

    index += 1;
  }

  pushSegment("code", codeStart, source.length);
  return segments;
}
