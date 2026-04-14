import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ IMPORTANT for GitHub Pages
  base: '/my-website/',

  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
