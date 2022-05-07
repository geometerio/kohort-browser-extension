const esbuild = require("esbuild");
const envFilePlugin = require("esbuild-envfile-plugin");

esbuild
  .build({
    plugins: [envFilePlugin],
    entryPoints: [
      "./src/background.ts",
      "./src/content.ts",
      "./src/popup.tsx",
      "./src/injected.ts",
      "./src/kohort_content.ts"
    ],
    bundle: true,
    minify: false,
    sourcemap: process.env.NODE_ENV !== "production",
    target: ["chrome58", "firefox57"],
    outdir: "./public/build",
    define: {
      "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`
    }
  })
  .catch(() => process.exit(1));
