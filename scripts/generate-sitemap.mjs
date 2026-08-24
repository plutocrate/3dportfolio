// ─────────────────────────────────────────────────────────────────────────────
// SITEMAP GENERATOR — runs automatically before every `npm run build` (wired
// up as the "prebuild" script in package.json, which npm always runs first).
//
// Rebuilds public/sitemap.xml from scratch every time, pulling the list of
// Chronicles directly from src/data/chronicles.js. Publish a new chronicle,
// run a build, and it gets its own <url> entry in the sitemap automatically —
// nothing to remember, nothing to hand-edit here.
// ─────────────────────────────────────────────────────────────────────────────
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { CHRONICLES } from '../src/data/chronicles.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://prathamis.cool'
const OUT_PATH = resolve(__dirname, '../public/sitemap.xml')

const today = new Date().toISOString().slice(0, 10)

// Human-readable dates like "21 Aug 2026" -> "2026-08-21". Falls back to
// today's date if a chronicle's `date` string can't be parsed, so the
// sitemap never breaks on an unusual format.
function toIsoDate(humanDate) {
  const parsed = new Date(humanDate)
  return Number.isNaN(parsed.getTime()) ? today : parsed.toISOString().slice(0, 10)
}

const STATIC_ROUTES = [
  { path: '/',           changefreq: 'weekly',  priority: '1.0' },
  { path: '/about',      changefreq: 'monthly', priority: '0.9' },
  { path: '/academia',   changefreq: 'monthly', priority: '0.9' },
  { path: '/chronicles', changefreq: 'weekly',  priority: '0.85' },
  { path: '/blog',       changefreq: 'weekly',  priority: '0.8' },
  { path: '/talk',       changefreq: 'yearly',  priority: '0.7' },
]

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

const staticEntries = STATIC_ROUTES.map((r) =>
  urlEntry({ loc: `${SITE_URL}${r.path}`, lastmod: today, changefreq: r.changefreq, priority: r.priority })
)

const chronicleEntries = CHRONICLES.map((c) =>
  urlEntry({
    loc: `${SITE_URL}/chronicles/${c.id}`,
    lastmod: toIsoDate(c.date),
    changefreq: 'monthly',
    priority: '0.75',
  })
)

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticEntries, ...chronicleEntries].join('\n')}\n</urlset>\n`

writeFileSync(OUT_PATH, xml)
console.log(`✓ sitemap.xml regenerated — ${STATIC_ROUTES.length} static routes + ${CHRONICLES.length} chronicle(s)`)
