import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Ensure the base path is set to root for proper routing
  base: '/',
  
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'copy-routing-files',
      closeBundle() {
        // Ensure routing config files are copied to the dist directory
        try {
          copyFileSync('public/_redirects', 'dist/_redirects');
          copyFileSync('public/.htaccess', 'dist/.htaccess');
          copyFileSync('vercel.json', 'dist/vercel.json');
          copyFileSync('netlify.toml', 'dist/netlify.toml');
          console.log('Successfully copied routing configuration files to dist');
        } catch (error) {
          console.error('Error copying routing files:', error);
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
