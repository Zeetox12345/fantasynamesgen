import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
    componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure Vite knows this is an SPA
  appType: 'spa',
  // Optimize JSON handling
  build: {
    assetsInlineLimit: 0, // Don't inline large assets
    rollupOptions: {
      output: {
        manualChunks: {
          // Create separate chunks for large JSON files
          'fantasy-data': [
            './src/data/fantasy/space-ranger.json',
            './src/data/fantasy/dwarf-ranger.json',
            './src/data/fantasy/elven-ranger.json',
            './src/data/fantasy/halfling-ranger.json',
            './src/data/fantasy/chaos-dwarf-city.json',
            './src/data/fantasy/merfolk-city.json',
            './src/data/fantasy/sea-god.json',
            './src/data/fantasy/reindeer.json',
            './src/data/fantasy/female-demon.json',
            './src/data/fantasy/male-demon.json',
          ],
        },
      },
    },
    // Ensure JSON files are properly processed
    assetsInclude: ['**/*.json'],
  },
}));
