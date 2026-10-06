import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: 'frontend',
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
        secure: false
      }
    }
  }
})