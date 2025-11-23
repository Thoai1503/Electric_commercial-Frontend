import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/catalog": {
        target: "http://electriccatalogapi9898989.somee.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/catalog/, "/api"),
      },
      "/uploads": {
        target: "http://electriccatalogapi9898989.somee.com/",
        changeOrigin: true,
        // No rewrite needed since we want /uploads/* to map directly
      },
    },
  },
});
