import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/fullstack-mastery/", // 👈 mutlaka repo adınla aynı olmalı
  build: {
    outDir: "dist",
  },
  server: {
    // yerelde route hatası olmasın diye
    open: true,
  },
  // ⚙️ GitHub Pages yönlendirme düzeltmesi
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
