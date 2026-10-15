// Renders the downloadable logo formats, the favicon, the Apple touch icon and
// the Open Graph image from the brand source files, using headless Chrome.
// The outputs are committed, so builds (including Cloudflare's) don't need Chrome.
//
//   node scripts/make-brand-assets.mjs        (CHROME_PATH overrides the Chrome binary)
//
// Sources: public/brand/idlistack-icon{,-white,-black}.svg (vector) and
// public/brand/idlistack-logo{,-white}.png (the wordmark exists only as an
// 882×186 PNG, so its formats are capped at that size and its PDF embeds it).
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const docs = fileURLToPath(new URL("..", import.meta.url));
const brand = join(docs, "public/brand");
const out = join(brand, "files");
mkdirSync(out, { recursive: true });
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const INK = "#0a0f1c";

/* ------------------------------------------------------------- Chrome (CDP) */
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), "idli-brand-assets")}`, "about:blank"]);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 60 && !target; i++) {
  await wait(250);
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch {}
}
if (!target) throw new Error(`Chrome did not start (CHROME_PATH=${CHROME})`);
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { const { resolve, reject } = pending.get(m.id); pending.delete(m.id); m.error ? reject(new Error(m.error.message)) : resolve(m.result); }
});
const send = (method, params = {}) => new Promise((resolve, reject) => { const i = ++id; pending.set(i, { resolve, reject }); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Page.enable");

const dataUrl = (file, type) => `data:${type};base64,${readFileSync(join(brand, file)).toString("base64")}`;

/** Draws an image onto a canvas (optionally padded, on a background) and returns the encoded bytes. */
async function raster(src, { width, height, type = "image/png", background = null, padding = 0, quality = 0.92 }) {
  const expr = `(async () => {
    const img = new Image(); img.src = ${JSON.stringify(src)}; await img.decode();
    const c = document.createElement("canvas"); c.width = ${width}; c.height = ${height};
    const g = c.getContext("2d"); g.imageSmoothingQuality = "high";
    ${background ? `g.fillStyle = ${JSON.stringify(background)}; g.fillRect(0, 0, c.width, c.height);` : ""}
    const p = ${padding}, w = c.width - 2 * p, h = c.height - 2 * p;
    const s = Math.min(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
    g.drawImage(img, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
    return c.toDataURL(${JSON.stringify(type)}, ${quality}).split(",")[1];
  })()`;
  const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return Buffer.from(r.result.value, "base64");
}

/** Prints a single-page PDF of the image at its own aspect ratio, with a transparent page. */
async function pdf(src, { widthIn, heightIn }) {
  const html = `<!doctype html><html><head><style>@page{size:${widthIn}in ${heightIn}in;margin:0}html,body{margin:0;background:transparent}img{display:block;width:${widthIn}in;height:${heightIn}in}</style></head><body><img src="${src}"></body></html>`;
  await send("Page.navigate", { url: "about:blank" });
  await send("Runtime.evaluate", { expression: `document.open(); document.write(${JSON.stringify(html)}); document.close(); new Promise(r => { const i = document.querySelector("img"); i.complete ? r() : i.onload = r; })`, awaitPromise: true });
  const r = await send("Page.printToPDF", { paperWidth: widthIn, paperHeight: heightIn, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, printBackground: false, preferCSSPageSize: true });
  return Buffer.from(r.data, "base64");
}

/** A .ico file holding PNG images (supported by every current browser and OS). */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  const entries = []; let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(data.length, 8); e.writeUInt32LE(offset, 12);
    entries.push(e); offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const written = [];
const save = (name, data) => { writeFileSync(join(out, name), data); written.push(`${name} (${Math.round(data.length / 1024)} KB)`); };

/* ------------------------------------------------------------- Heart marks */
const HEART_RATIO = 1008 / 1081;
for (const [slug, file, ground] of [["colour", "idlistack-icon.svg", "#ffffff"], ["white", "idlistack-icon-white.svg", INK], ["black", "idlistack-icon-black.svg", "#ffffff"]]) {
  const src = dataUrl(file, "image/svg+xml");
  const base = `idlistack-heart-${slug}`;
  save(`${base}.svg`, readFileSync(join(brand, file)));
  for (const w of [256, 512, 1024, 2048]) save(`${base}-${w}.png`, await raster(src, { width: w, height: Math.round(w * HEART_RATIO) }));
  save(`${base}-1024.webp`, await raster(src, { width: 1024, height: Math.round(1024 * HEART_RATIO), type: "image/webp" }));
  // JPG has no transparency: place the mark on the background it is meant for, with breathing room.
  save(`${base}-1024.jpg`, await raster(src, { width: 1024, height: 1024, type: "image/jpeg", background: ground, padding: 160 }));
  save(`${base}.pdf`, await pdf(src, { widthIn: 4, heightIn: 4 * HEART_RATIO }));
}

/* --------------------------------------------------------------- Wordmarks */
const WORD_W = 882, WORD_H = 186;
for (const [slug, file, ground] of [["black", "idlistack-logo.png", "#ffffff"], ["white", "idlistack-logo-white.png", INK]]) {
  const src = dataUrl(file, "image/png");
  const base = `idlistack-wordmark-${slug}`;
  save(`${base}.png`, readFileSync(join(brand, file)));
  save(`${base}-441.png`, await raster(src, { width: 441, height: 93 }));
  save(`${base}.webp`, await raster(src, { width: WORD_W, height: WORD_H, type: "image/webp" }));
  save(`${base}.jpg`, await raster(src, { width: WORD_W + 160, height: WORD_H + 160, type: "image/jpeg", background: ground, padding: 80 }));
  save(`${base}.pdf`, await pdf(src, { widthIn: 6, heightIn: (6 * WORD_H) / WORD_W }));
}

/* ------------------------------------------- Favicon, touch icon, OG image */
const heartSrc = dataUrl("idlistack-icon.svg", "image/svg+xml");
const favicon = [];
for (const size of [16, 32, 48]) favicon.push({ size, data: await raster(heartSrc, { width: size, height: size, padding: Math.round(size * 0.06) }) });
writeFileSync(join(docs, "app/favicon.ico"), ico(favicon));
written.push("app/favicon.ico");
writeFileSync(join(docs, "app/apple-icon.png"), await raster(heartSrc, { width: 180, height: 180, background: "#ffffff", padding: 30 }));
written.push("app/apple-icon.png");

// Open Graph image: the design-system cover composition at 1200×630.
const og = `<!doctype html><html><head><style>
  @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@800&family=Inter:wght@500&display=block");
  html,body{margin:0;width:1200px;height:630px;background:#fff;overflow:hidden}
  .name{position:absolute;left:72px;bottom:132px;margin:0;font:800 132px/0.9 Manrope,sans-serif;letter-spacing:-0.035em;color:#0f172a}
  .tag{position:absolute;left:76px;bottom:84px;margin:0;font:500 26px/1.2 Inter,sans-serif;color:#45556c}
  .logo{position:absolute;left:76px;top:72px;height:40px}
  svg{position:absolute;right:0;top:0}
</style></head><body>
  <img class="logo" src="${dataUrl("idlistack-logo.png", "image/png")}">
  <svg width="600" height="630" viewBox="0 0 600 630">
    <rect x="200" y="-30" width="240" height="420" rx="24" fill="#d63079"/>
    <rect x="40" y="440" width="300" height="220" rx="24" fill="#0f172a"/>
    <rect x="460" y="120" width="180" height="540" rx="24" fill="#e8e0e2"/>
    <circle cx="120" cy="190" r="72" fill="#ed4690"/>
    <circle cx="320" cy="200" r="48" fill="#f9c9de"/><circle cx="320" cy="200" r="24" fill="#d63079"/>
    <circle cx="120" cy="330" r="24" fill="#e8e0e2"/>
    <circle cx="540" cy="60" r="24" fill="#0070f3"/>
    <circle cx="400" cy="540" r="26" fill="#ed4690"/>
    <circle cx="550" cy="460" r="36" fill="#f9c9de"/>
  </svg>
  <h1 class="name">Idli UI</h1>
  <p class="tag">The Idlistack design system</p>
</body></html>`;
await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: `data:text/html;base64,${Buffer.from(og).toString("base64")}` });
await wait(2500);
await send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
writeFileSync(join(docs, "public/og.png"), Buffer.from(shot.data, "base64"));
written.push("public/og.png");

ws.close();
chrome.kill();
console.log(`Wrote ${written.length} files:\n  ${written.join("\n  ")}`);
