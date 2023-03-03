import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    manifest: 'vite-manifest.json',
    rollupOptions: {
      input: {
        background: path.resolve(__dirname, 'src/background.js'),
      },
      output: {
        format: 'iife'
      }
    },
  },
})
