import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/catalog": {
        target: "https://phone-shop-backend.vercel.app/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/catalog/, "/api"),
      },
      "/uploads": {
        target: "https://phone-shop-backend.vercel.app/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, "/Uploads"),
      },
    },
  },
});
