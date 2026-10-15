// Usage: node scripts/console-check.mjs <url> [file-to-touch]
// Env: QUICK=1 only checks the initial load; FORCE_MISMATCH=1 simulates a browser
// extension editing the page before hydration.
// Loads the page in Chrome via CDP, triggers HMR by touching a file, then a
// client-side navigation, and prints every console error/warning seen.
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const [url, touchFile] = process.argv.slice(2);
const chrome = spawn(process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", "--disable-gpu", "--remote-debugging-port=9333",
  `--user-data-dir=${process.env.TMPDIR}/cdp-profile`, "about:blank",
]);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 40 && !target; i++) {
  await wait(250);
  try { target = (await (await fetch("http://127.0.0.1:9333/json")).json()).find((t) => t.type === "page"); } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const send = (method, params = {}) => ws.send(JSON.stringify({ id: ++id, method, params }));
const problems = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(m.params.type))
    problems.push(`[${m.params.type}] ` + m.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 3000));
  if (m.method === "Runtime.exceptionThrown") problems.push("[exception] " + (m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text).slice(0, 3000));
});
send("Runtime.enable");
send("Page.enable");
if (process.env.FORCE_MISMATCH)
  send("Page.addScriptToEvaluateOnNewDocument", {
    // Simulate an extension editing the page before React hydrates.
    source: `document.addEventListener("DOMContentLoaded",()=>{const h=document.querySelector("main h1");if(h)h.textContent+=" (edited)"})`,
  });
send("Page.navigate", { url });
await wait(5000);
console.log("after load:", problems.length);
if (process.env.QUICK) { for (const p of problems) console.log(p.slice(0, 300)); ws.close(); chrome.kill(); process.exit(0); }
const original = readFileSync(touchFile, "utf8");
writeFileSync(touchFile, original + "\n// hmr-touch\n");
await wait(4000);
writeFileSync(touchFile, original);
await wait(4000);
console.log("after HMR:", problems.length);
send("Runtime.evaluate", { expression: `document.querySelector('a[href="/docs/principles"]')?.click()` });
await wait(3000);
send("Runtime.evaluate", { expression: `document.querySelector('a[href="/"]')?.click()` });
await wait(3000);
console.log("after client navigation:", problems.length);
for (const p of problems) console.log(p);
ws.close();
chrome.kill();
