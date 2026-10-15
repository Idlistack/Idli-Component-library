import { readFile, writeFile } from "node:fs/promises";
import { defineConfig } from "tsup";

const DIRECTIVE = '"use client";\n';

export default defineConfig({
  entry: ["src/index.ts", "src/utils.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  // Every component is interactive or composes one that is, so the components
  // entry is a client module for React Server Component frameworks. `utils`
  // stays server-safe. The bundler drops module-level directives, so the
  // directive is prepended once the build has finished.
  async onSuccess() {
    const file = "dist/index.js";
    const code = await readFile(file, "utf8");
    if (!code.startsWith(DIRECTIVE)) await writeFile(file, DIRECTIVE + code);
  },
});
