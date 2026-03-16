import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // GitHub Pages serves from https://<username>.github.io/<repo-name>/
  // IMPORTANT: change 'portfolio' below to match your actual GitHub repo name
  base: '/',
})
