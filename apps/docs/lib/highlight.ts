import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Promise<Highlighter> | undefined;

/** Highlight code to HTML with light and dark themes exposed as CSS variables. */
export async function highlight(code: string, lang: "tsx" | "bash" | "css" = "tsx") {
  highlighter ??= createHighlighter({ themes: ["github-light", "github-dark"], langs: ["tsx", "bash", "css"] });
  return (await highlighter).codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
