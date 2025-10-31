import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/pub/v1": {
        target: "https://api.cozmos.pt",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "localhost",
        cookiePathRewrite: "/",
      },
    },
  },
});
