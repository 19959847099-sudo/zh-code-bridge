export type KnownJavaScriptErrorName = "ReferenceError" | "SyntaxError" | "TypeError";

const explanations: Record<KnownJavaScriptErrorName, string> = {
  ReferenceError: "变量没有定义。可能原因：你使用了一个还没有声明的变量，或者变量名写错了。",
  SyntaxError: "语法错误。可能原因：括号、大括号、引号、分号、逗号或结构不完整。",
  TypeError: "类型错误。可能原因：你把一个不是函数的值当成函数调用，或者访问了不存在的属性。"
};

export function explainJavaScriptError(errorText: string): string | undefined {
  if (errorText.includes("ReferenceError")) {
    return explanations.ReferenceError;
  }

  if (errorText.includes("SyntaxError")) {
    return explanations.SyntaxError;
  }

  if (errorText.includes("TypeError")) {
    return explanations.TypeError;
  }

  return undefined;
}

export function formatJavaScriptErrorWithExplanation(errorText: string): string {
  const explanation = explainJavaScriptError(errorText);

  if (!explanation) {
    return errorText;
  }

  return [
    "中文解释：",
    explanation,
    "",
    "原始错误：",
    errorText
  ].join("\n");
}
