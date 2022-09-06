/// <reference types="vitest" />

import { defineConfig } from "vite";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "chord-charts",
      fileName: "chord-charts",
    },
  },
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      reporter: ["text", "text-summary", "html"],
    },
  },
});
