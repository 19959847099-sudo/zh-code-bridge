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

export function createUserFacingErrorMessage(error: unknown): string {
  const message = getErrorMessage(error);

  if (message.includes("不是 .zhjs") || message.includes("not a .zhjs")) {
    return "当前文件不是 .zhjs，请打开一个 ZhCode 文件后再执行命令。";
  }

  if (message.includes("没有活动编辑器") || message.includes("No active editor")) {
    return "请先打开一个 .zhjs 文件。";
  }

  if (message.includes("为避免覆盖用户代码") || message.includes("为避免覆盖你的代码")) {
    return "目标 .js 文件看起来不是 ZhCode Bridge 生成的文件。为避免覆盖你的代码，已停止生成。";
  }

  return "ZhCode Bridge 命令执行失败，详细信息已写入 Output 面板。";
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
