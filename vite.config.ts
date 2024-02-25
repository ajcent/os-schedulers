import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/os-schedulers/",
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      utils: path.resolve(__dirname, "./src/utils"),
      classes: path.resolve(__dirname, "./src/classes"),
      contexts: path.resolve(__dirname, "./src/contexts"),
    },
  },
});
