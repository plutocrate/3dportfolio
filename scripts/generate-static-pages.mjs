// ─────────────────────────────────────────────────────────────────────────────
// STATIC CHRONICLE SNAPSHOTS — runs automatically after every `npm run build`
// (wired up as the "postbuild" script in package.json).
//
// This site is a client-rendered SPA, so a bot or link-preview crawler that
// doesn't execute JS would otherwise see the exact same generic homepage
// markup no matter which /chronicles/<id> URL it fetched. That's fine for
// Google (it renders JS), but bad for everything else that reads meta tags
// literally — Slack/Discord/Twitter unfurls, and any crawler that skips JS.
//
// This script takes the already-built dist/index.html (with its real,
// hashed asset paths) and, for every chronicle in the CMS, writes a copy to
// dist/chronicles/<id>/index.html with:
//   - a unique <title>, meta description, canonical link, OG/Twitter tags
//     and og:image (the chronicle's own cover image)
//   - the hidden crawler-only <main> block replaced with that chronicle's
//     actual title, dek, and body text
// The page still loads the exact same JS bundle, so a real visitor with JS
// enabled gets the full interactive app, which then opens straight to that
// chronicle (see src/lib/routes.js + App.jsx's deep-link handling).
//
// New chronicle in the CMS + a rebuild = a new indexable page. No manual step.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { CHRONICLES, getReadingTime } from '../src/data/chronicles.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://prathamis.cool'
const DIST_DIR = resolve(__dirname, '../dist')
const INDEX_PATH = resolve(DIST_DIR, 'index.html')

if (!existsSync(INDEX_PATH)) {
  console.warn('⚠ dist/index.html not found — skipping static chronicle snapshots (did the build run?)')
  process.exit(0)
}

const template = readFileSync(INDEX_PATH, 'utf-8')

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function replaceOnce(html, search, replace) {
  const idx = html.indexOf(search)
  if (idx === -1) {
    console.warn(`⚠ expected string not found in dist/index.html, skipping that replacement:\n  ${search.slice(0, 80)}...`)
    return html
  }
  return html.slice(0, idx) + replace + html.slice(idx + search.length)
}

let count = 0

for (const chronicle of CHRONICLES) {
  const url         = `${SITE_URL}/chronicles/${chronicle.id}`
  const title        = `${chronicle.title} — Pratham Purohit`
  const description  = escapeHtml(chronicle.dek || `An essay by Pratham Purohit — ${chronicle.category}.`)
  const escTitle      = escapeHtml(title)
  const image        = chronicle.coverImage ? `${SITE_URL}${chronicle.coverImage}` : `${SITE_URL}/og-image.png`
  const readingTime  = getReadingTime(chronicle)

  const paragraphs = (chronicle.body || [])
    .filter((item) => typeof item === 'string')
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('\n        ')

  let html = template

  html = replaceOnce(html, '<title>Pratham Purohit — Full-Stack Developer & Software Engineer</title>', `<title>${escTitle}</title>`)
  html = replaceOnce(
    html,
    '<meta name="description" content="Pratham Purohit — Full-Stack Developer based in India. Expert in React, Three.js, Node.js, TypeScript & WebGL. Built real-time apps, 3D browser experiences & multiplayer games. View portfolio, projects & blog at prathamis.cool." />',
    `<meta name="description" content="${description}" />`
  )
  html = replaceOnce(html, '<link rel="canonical" href="https://prathamis.cool/" />', `<link rel="canonical" href="${url}" />`)
  html = replaceOnce(html, '<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />')
  html = replaceOnce(html, '<meta property="og:url" content="https://prathamis.cool/" />', `<meta property="og:url" content="${url}" />`)
  html = replaceOnce(html, '<meta property="og:title" content="Pratham Purohit — Full-Stack Developer" />', `<meta property="og:title" content="${escTitle}" />`)
  html = replaceOnce(
    html,
    '<meta property="og:description" content="Pratham Purohit — Full-Stack Developer. React, Three.js, Node.js, TypeScript & WebGL specialist. Interactive 3D portfolio showcasing real-world projects and experience." />',
    `<meta property="og:description" content="${description}" />`
  )
  html = replaceOnce(html, '<meta property="og:image" content="https://prathamis.cool/og-image.png" />', `<meta property="og:image" content="${image}" />`)
  html = replaceOnce(html, '<meta name="twitter:title" content="Pratham Purohit — Full-Stack Developer" />', `<meta name="twitter:title" content="${escTitle}" />`)
  html = replaceOnce(
    html,
    '<meta name="twitter:description" content="Full-Stack Developer specialising in React, Three.js, and Node.js. Interactive 3D portfolio." />',
    `<meta name="twitter:description" content="${description}" />`
  )
  html = replaceOnce(html, '<meta name="twitter:image" content="https://prathamis.cool/og-image.png" />', `<meta name="twitter:image" content="${image}" />`)

  // BlogPosting structured data, appended right before </head> so it's easy
  // to locate/replace and never collides with the site-wide Person/WebSite
  // JSON-LD blocks already in the template.
  const jsonLd = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: chronicle.title,
    description: chronicle.dek || '',
    url,
    image,
    datePublished: chronicle.date,
    author: { '@type': 'Person', name: 'Pratham Purohit', url: SITE_URL },
  })}</script>\n  </head>`
  html = replaceOnce(html, '</head>', jsonLd)

  // Swap the generic hidden crawler <main> for this chronicle's own content.
  const articleMain = `<main style="font-family:sans-serif;max-width:800px;margin:0 auto;padding:2rem;color:#111;">
        <p><a href="/">← Pratham Purohit</a></p>
        <h1>${escapeHtml(chronicle.title)}</h1>
        <p><em>${escapeHtml(chronicle.dek || '')}</em></p>
        <p>${escapeHtml(chronicle.category)} · ${escapeHtml(chronicle.date)} · ${escapeHtml(readingTime)}</p>
        ${paragraphs}
        <p><a href="/chronicles">More chronicles →</a></p>
      </main>`
  html = html.replace(/<main[\s\S]*?<\/main>/, articleMain)

  const outDir = resolve(DIST_DIR, 'chronicles', chronicle.id)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), html)
  count++
}

console.log(`✓ generated ${count} static chronicle snapshot(s) in dist/chronicles/<id>/index.html`)
