// Makes public/brand/idlistack-logo-white.png from the black wordmark: the
// black (neutral, dark) pixels become white, the pinks are left as they are,
// and transparency is kept. Run once after the logo changes:
//   node scripts/make-white-logo.mjs
// Handles the logo's format: 8-bit RGBA, non-interlaced PNG.
import { readFileSync, writeFileSync } from "node:fs";
import { crc32, deflateSync, inflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("../public/brand/idlistack-logo.png", import.meta.url));
const out = fileURLToPath(new URL("../public/brand/idlistack-logo-white.png", import.meta.url));
const png = readFileSync(src);

let pos = 8, ihdr, idat = [];
while (pos < png.length) {
  const len = png.readUInt32BE(pos), type = png.toString("latin1", pos + 4, pos + 8), data = png.subarray(pos + 8, pos + 8 + len);
  if (type === "IHDR") ihdr = data;
  if (type === "IDAT") idat.push(data);
  pos += 12 + len;
}
const width = ihdr.readUInt32BE(0), height = ihdr.readUInt32BE(4);
if (ihdr[8] !== 8 || ihdr[9] !== 6 || ihdr[12] !== 0) throw new Error("Expected an 8-bit RGBA, non-interlaced PNG");

const raw = inflateSync(Buffer.concat(idat)), bpp = 4, stride = width * bpp;
const pixels = Buffer.alloc(height * stride);
const paeth = (a, b, c) => { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c; };
for (let y = 0; y < height; y++) {
  const filter = raw[y * (stride + 1)], line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
  for (let x = 0; x < stride; x++) {
    const a = x >= bpp ? pixels[y * stride + x - bpp] : 0, b = y ? pixels[(y - 1) * stride + x] : 0, c = x >= bpp && y ? pixels[(y - 1) * stride + x - bpp] : 0;
    const add = [0, a, b, (a + b) >> 1, paeth(a, b, c)][filter];
    pixels[y * stride + x] = (line[x] + add) & 255;
  }
}

let changed = 0;
for (let i = 0; i < pixels.length; i += 4) {
  const [r, g, b, alpha] = pixels.subarray(i, i + 4);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (alpha && max - min < 40 && max < 128) { pixels[i] = pixels[i + 1] = pixels[i + 2] = 255; changed++; }
}

const filtered = Buffer.alloc(height * (stride + 1));
for (let y = 0; y < height; y++) pixels.copy(filtered, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "latin1"), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};
writeFileSync(out, Buffer.concat([png.subarray(0, 8), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(filtered, { level: 9 })), chunk("IEND", Buffer.alloc(0))]));
console.log(`Wrote ${out}: ${width}x${height}, ${changed} pixels turned white`);
