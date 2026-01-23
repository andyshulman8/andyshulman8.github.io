import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["react/jsx-runtime"], // Forces Vite to pre-bundle this
  },
  build: {
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'animation': ['framer-motion'],
          'train-page': ['./src/pages/train.tsx'],
          'case-studies': ['./src/components/CaseStudyWrapper.tsx']
        }
      }
    }
  },
  server: {
    // allowedHosts: [
    // 'd5132dfe-89fb-4e5d-a56e-4ac543d63cc6-00-1f97eeryyh6ig.riker.replit.dev'
    // ]
    // OR use true to allow any host during development (less secure)
    allowedHosts: true,
  },
});
