import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend
      "/api": {
        target: "http://localhost:3000", // Backend API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api from the beginning of the URL
      },
    },
  },
});
