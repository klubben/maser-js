/// <reference types="vitest" />

import { defineConfig } from "vite";
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
  plugins: [tsconfigPaths(), glsl()],
});
