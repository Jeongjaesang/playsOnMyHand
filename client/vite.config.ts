import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const vitestConfig = {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/vitest.setup.ts",
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ...vitestConfig,
});
