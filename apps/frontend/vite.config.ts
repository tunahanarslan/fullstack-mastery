import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages için base yolu repo adına göre olmalı:
  base: "/fullstack-mastery/",
  build: {
    outDir: "dist",
  },
});
