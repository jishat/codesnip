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
  
  // Production build configuration
  build: {
    outDir: '../build',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
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
    },
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    }
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./frontend/src"),
    },
  },
  
  // Environment variables for production
  define: {
    __DEV__: JSON.stringify(false),
  }
})
