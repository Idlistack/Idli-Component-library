import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Promise<Highlighter> | undefined;

/** Highlight code to HTML with light and dark themes exposed as CSS variables. */
export async function highlight(code: string, lang: "tsx" | "bash" | "css" = "tsx") {
  highlighter ??= createHighlighter({ themes: ["github-light-high-contrast", "github-dark"], langs: ["tsx", "bash", "css"] });
  return (await highlighter).codeToHtml(code, {
    lang,
    // The high-contrast light theme keeps every token at WCAG AA on the code background.
    themes: { light: "github-light-high-contrast", dark: "github-dark" },
    defaultColor: false,
  });
}
