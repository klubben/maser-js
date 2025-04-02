/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import glsl from "vite-plugin-glsl";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        pretendToBeVisual: true,
        resources: "usable",
        console: true,
      },
    },
    fakeTimers: {
      shouldAdvanceTime: true,
    },
    globals: true,
    include: ["**/*.test.ts"],
    setupFiles: ["vitest-setup.ts"],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
  plugins: [
    tsconfigPaths(),
    glsl(),
    dts({
      insertTypesEntry: true,
    }),
  ],
});
