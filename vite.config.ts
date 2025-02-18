/// <reference types="vitest" />

import { defineConfig } from "vite";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "chord-charts",
      fileName: "chord-charts",
    },
  },
  plugins: [tsconfigPaths(), dts({ exclude: ["**/*.test.ts", "**/*.test.tsx"] })],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      reporter: ["text", "text-summary", "html"],
    },
  },
});
