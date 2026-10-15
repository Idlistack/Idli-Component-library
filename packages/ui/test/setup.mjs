// A browser-like global environment for React Testing Library under node:test.
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/", pretendToBeVisual: true });
const { window } = dom;
// Expose the window and every DOM class (HTMLFormElement, PointerEvent, …) that libraries look up globally.
const names = ["window", "document", "navigator", "getComputedStyle", "requestAnimationFrame", "cancelAnimationFrame",
  ...Object.getOwnPropertyNames(window).filter((k) => /^(HTML|SVG|Element|Node|Event|.*Event$|MutationObserver|DOMRect|Text$|DocumentFragment)/.test(k))];
for (const key of names) {
  if (!(key in globalThis) || key === "navigator") Object.defineProperty(globalThis, key, { value: window[key], configurable: true, writable: true });
}
globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} };
window.ResizeObserver = globalThis.ResizeObserver;
window.HTMLElement.prototype.scrollIntoView ??= () => {};
window.HTMLElement.prototype.hasPointerCapture ??= () => false;
window.HTMLElement.prototype.releasePointerCapture ??= () => {};
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
