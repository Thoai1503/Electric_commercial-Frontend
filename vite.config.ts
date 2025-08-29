import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/catalog": {
        target: "http://electricstorecatalogapi1234.somee.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/catalog/, "/api"),
      },
    },
  },
});
