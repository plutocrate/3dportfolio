import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC MEDIA MANIFESTS
// Everything media-related lives under /public (gallery images+gifs+videos,
// music tracks, evidence photos) — nothing is bundled from src/assets anymore.
// Since Vite never lets JS `import` files out of /public (they're copied
// as-is, not part of the module graph), this plugin reads each folder at
// build/dev-server-start time and hands the file list back as a tiny virtual
// module. Drop a new file into the folder and it's picked up automatically on
// the next build/dev restart — no manual list to edit, no code to touch.
function publicMediaManifests() {
  const FOLDERS = {
    'virtual:gallery-manifest': { dir: 'gallery', exts: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'mp4', 'webm', 'mov'] },
    'virtual:music-manifest':   { dir: 'music',   exts: ['mp3', 'wav', 'ogg', 'm4a'] },
    'virtual:evidence-manifest': { dir: 'evidence', exts: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'] },
  }
  let publicDir = path.resolve(__dirname, 'public')

  function listFiles(folder, exts) {
    const dirPath = path.join(publicDir, folder)
    if (!fs.existsSync(dirPath)) return []
    return fs.readdirSync(dirPath, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => exts.includes(name.split('.').pop().toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
  }

  return {
    name: 'public-media-manifests',
    configResolved(config) {
      publicDir = config.publicDir || publicDir
    },
    resolveId(id) {
      if (FOLDERS[id]) return '\0' + id
    },
    load(id) {
      if (!id.startsWith('\0virtual:')) return null
      const key = id.slice(1)
      const entry = FOLDERS[key]
      if (!entry) return null
      const files = listFiles(entry.dir, entry.exts)
      return `export default ${JSON.stringify(files)}`
    },
  }
}

export default defineConfig({
  plugins: [react(), publicMediaManifests()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // GitHub Pages serves from https://<username>.github.io/<repo-name>/
  // IMPORTANT: change 'portfolio' below to match your actual GitHub repo name
  base: '/',
  build: {
    // Split the huge vendor libs into separate cacheable chunks so the
    // browser can download them in parallel and cache them independently.
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js + React Three Fiber ecosystem — biggest chunk
          if (id.includes('three') || id.includes('@react-three')) {
            return 'vendor-three'
          }
          // GSAP animation library
          if (id.includes('gsap')) {
            return 'vendor-gsap'
          }
          // Lucide icons (large icon set)
          if (id.includes('lucide-react')) {
            return 'vendor-icons'
          }
          // Radix UI primitives
          if (id.includes('@radix-ui')) {
            return 'vendor-radix'
          }
          // React core
          if (id.includes('react-dom') || id.includes('react-router')) {
            return 'vendor-react'
          }
          // Zustand state
          if (id.includes('zustand')) {
            return 'vendor-state'
          }
        },
      },
    },
    // Raise the warning threshold — three.js chunks are legitimately large
    chunkSizeWarningLimit: 1500,
  },
})
