import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  root: 'frontend',
  plugins: [react({jsxRuntime: 'automatic'}), tailwindcss()],
  
  // Development server configuration
  server: {
    cors: true,
    hmr: { host: 'localhost' },
    port: 5173,
    strictPort: true,
    host: '0.0.0.0'
  },
  
  // Build configuration for development
  build: {
    outDir: '../build',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'frontend/src/main.jsx'),
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(css)$/.test(assetInfo.name)) {
            return 'index.css'
          }
          return `[name]-[hash].${ext}`
        }
      }
    }
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./frontend/src"),
    },
  },
  
  // Environment variables
  define: {
    __DEV__: JSON.stringify(true),
  }
})
