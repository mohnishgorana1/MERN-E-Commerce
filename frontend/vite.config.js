import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log("Vite config is being executed!"); // Add this line

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        secure: false,
      },
    },
  },
});

// target: "https://mern-e-commerce-ep8f.onrender.com",
// secure: true,
// changeOrigin: true

// target: "https://mern-e-commerce-ep8f.onrender.com",
// secure: true,
// changeOrigin: true,
// credentials: true,
