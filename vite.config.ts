import path from "path";
import { defineConfig } from "vite";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";

import react from "@vitejs/plugin-react";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: [],
  manifest: {
    name: "Carsle",
    short_name: "Carsle",
    description: "PearJS WebRTC PWA app",
    theme_color: "#ffffff",
    icons: [
      {
        src: "vite.png",
        sizes: "192x192",
        type: "image/svg",
      },
    ],
    display: "standalone",
    scope: "/",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
