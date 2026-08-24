import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { CHRONICLES } from '../src/data/chronicles.js'
import { listAllPaths } from '../src/lib/routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://prathamis.cool'
const OUT_PATH = resolve(__dirname, '../public/sitemap.xml')

const today = new Date().toISOString().slice(0, 10)

function toIsoDate(humanDate) {
  const parsed = new Date(humanDate)
  return Number.isNaN(parsed.getTime()) ? today : parsed.toISOString().slice(0, 10)
}

function priorityFor(path) {
  if (path === '/') return '1.0'
  if (path === '/about' || path === '/academia' || path.startsWith('/academia/')) return '0.9'
  if (path === '/chronicles' || path.startsWith('/chronicles/')) return '0.85'
  if (path === '/blog' || path.startsWith('/blog/')) return '0.8'
  if (path === '/talk') return '0.7'
  return '0.6'
}

function changefreqFor(path) {
  if (path === '/' || path === '/chronicles' || path === '/blog') return 'weekly'
  if (path === '/talk') return 'yearly'
  return 'monthly'
}

const chronicleDates = Object.fromEntries(
  CHRONICLES.map((c) => [`/chronicles/${c.id}`, toIsoDate(c.date)])
)

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

const paths = [...new Set(listAllPaths())]
const entries = paths.map((path) =>
  urlEntry({
    loc: `${SITE_URL}${path === '/' ? '/' : path}`,
    lastmod: chronicleDates[path] || today,
    changefreq: changefreqFor(path),
    priority: priorityFor(path),
  })
)

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`

writeFileSync(OUT_PATH, xml)
console.log(`✓ sitemap.xml regenerated — ${paths.length} route(s)`)
