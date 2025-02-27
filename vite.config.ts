import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Handle SPA routing in development
    historyApiFallback: true,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Copy configuration files to dist during build
    {
      name: 'copy-routing-files',
      closeBundle() {
        if (mode !== 'development') {
          const files = ['404.html', 'vercel-fallback.html', 'vercel.json', '_redirects', '.htaccess'];
          files.forEach(file => {
            try {
              fs.copyFileSync(
                path.resolve(__dirname, `public/${file}`),
                path.resolve(__dirname, `dist/${file}`)
              );
              console.log(`Copied ${file} to dist`);
            } catch (e) {
              console.error(`Failed to copy ${file}:`, e);
            }
          });
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure Vite knows this is an SPA
  appType: 'spa',
}));
