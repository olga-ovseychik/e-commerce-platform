/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      enabled: true,
      provider: 'v8',
      reportOnFailure: true,
      exclude: [
        "**/node_modules/**",
        "**/__tests__/**",
        "**/*.spec.*",
        "**/*.test.*",
        "**/*.mock.*",
        "**/src/mocks/**",
        "**/docs/**",
        "**/vitest.setup.ts",
      ],
    },
  },
});
