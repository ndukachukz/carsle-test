import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

const manifestForPlugin: Partial<VitePWAOptions> = {
  // add this to cache all the imports
  workbox: {
    globPatterns: ["**/*"],
    maximumFileSizeToCacheInBytes: 5 * 1024 ** 2, //5mb
  },

  // add this to cache all the
  // static assets in the public folder
  includeAssets: ["**/*"],
  registerType: "prompt",

  manifest: {
    orientation: "portrait",
    name: "Carsle",
    short_name: "Carsle",
    description: "PearJS WebRTC PWA app",
    theme_color: "#ffffff",
    icons: [
      {
        src: "./vite.svg",
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
  plugins: [react(), svgr(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
