import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const vitestConfig = {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/vitest.setup.ts",
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // Netlify에서 상대 경로 사용
  ...vitestConfig,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
