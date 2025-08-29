import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/catalog/api": {
        target: "http://electricstorecatalogapi1234.somee.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/catalog/, ""),
      },
    },
  },
});
