import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { CHRONICLES, getChronicleById, getReadingTime } from '../src/data/chronicles.js'
import {
  PERSONAL,
  SECTION_META,
  PROJECTS,
  EXPERIENCE,
  EDUCATION,
  BLOG_POSTS,
  LINK_COLLECTIONS,
} from '../src/data/portfolio.js'
import { listAllPaths, parsePath } from '../src/lib/routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://prathamis.cool'
const DIST_DIR = resolve(__dirname, '../dist')
const INDEX_PATH = resolve(DIST_DIR, 'index.html')

if (!existsSync(INDEX_PATH)) {
  console.warn('⚠ dist/index.html not found — skipping static snapshots (did the build run?)')
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
  if (idx === -1) return html
  return html.slice(0, idx) + replace + html.slice(idx + search.length)
}

function applyMeta(html, { url, title, description, image, ogType }) {
  const escTitle = escapeHtml(title)
  const escDesc  = escapeHtml(description)
  let out = html
  out = replaceOnce(out, '<title>Pratham Purohit — Full-Stack Developer & Software Engineer</title>', `<title>${escTitle}</title>`)
  out = replaceOnce(
    out,
    '<meta name="description" content="Pratham Purohit — Full-Stack Developer based in India. Expert in React, Three.js, Node.js, TypeScript & WebGL. Built real-time apps, 3D browser experiences & multiplayer games. View portfolio, projects & blog at prathamis.cool." />',
    `<meta name="description" content="${escDesc}" />`
  )
  out = replaceOnce(out, '<link rel="canonical" href="https://prathamis.cool/" />', `<link rel="canonical" href="${url}" />`)
  if (ogType === 'article') {
    out = replaceOnce(out, '<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />')
  }
  out = replaceOnce(out, '<meta property="og:url" content="https://prathamis.cool/" />', `<meta property="og:url" content="${url}" />`)
  out = replaceOnce(out, '<meta property="og:title" content="Pratham Purohit — Full-Stack Developer" />', `<meta property="og:title" content="${escTitle}" />`)
  out = replaceOnce(
    out,
    '<meta property="og:description" content="Pratham Purohit — Full-Stack Developer. React, Three.js, Node.js, TypeScript & WebGL specialist. Interactive 3D portfolio showcasing real-world projects and experience." />',
    `<meta property="og:description" content="${escDesc}" />`
  )
  out = replaceOnce(out, '<meta property="og:image" content="https://prathamis.cool/og-image.jpg" />', `<meta property="og:image" content="${image}" />`)
  out = replaceOnce(out, '<meta name="twitter:title" content="Pratham Purohit — Full-Stack Developer" />', `<meta name="twitter:title" content="${escTitle}" />`)
  out = replaceOnce(
    out,
    '<meta name="twitter:description" content="Full-Stack Developer specialising in React, Three.js, and Node.js. Interactive 3D portfolio." />',
    `<meta name="twitter:description" content="${escDesc}" />`
  )
  out = replaceOnce(out, '<meta name="twitter:image" content="https://prathamis.cool/og-image.jpg" />', `<meta name="twitter:image" content="${image}" />`)
  return out
}

function crawlerMain(inner) {
  return `<main style="font-family:sans-serif;max-width:800px;margin:0 auto;padding:2rem;color:#111;">
        <p><a href="/">← ${escapeHtml(PERSONAL.name)}</a></p>
        ${inner}
      </main>`
}

function pageForPath(path) {
  const route = parsePath(path)
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  const defaultImage = `${SITE_URL}/og-image.jpg`

  if (route.chronicleId) {
    const chronicle = getChronicleById(route.chronicleId)
    if (chronicle) {
      const paragraphs = (chronicle.body || [])
        .filter((item) => typeof item === 'string')
        .map((p) => `<p>${escapeHtml(p)}</p>`)
        .join('\n        ')
      const readingTime = getReadingTime(chronicle)
      return {
        url,
        title: `${chronicle.category} — ${chronicle.title} — ${PERSONAL.name}`,
        description: chronicle.dek || `An essay by ${PERSONAL.name} — ${chronicle.category}.`,
        image: chronicle.coverImage ? `${SITE_URL}${chronicle.coverImage}` : defaultImage,
        ogType: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: chronicle.title,
          description: chronicle.dek || '',
          url,
          image: chronicle.coverImage ? `${SITE_URL}${chronicle.coverImage}` : defaultImage,
          datePublished: chronicle.date,
          author: { '@type': 'Person', name: PERSONAL.name, url: SITE_URL },
        },
        main: crawlerMain(`
        <h1>${escapeHtml(chronicle.title)}</h1>
        <p><em>${escapeHtml(chronicle.dek || '')}</em></p>
        <p>${escapeHtml(chronicle.category)} · ${escapeHtml(chronicle.date)} · ${escapeHtml(readingTime)}</p>
        ${paragraphs}
        <p><a href="/chronicles">More chronicles →</a></p>`),
      }
    }
  }

  if (route.category) {
    const items = CHRONICLES.filter((c) => c.category === route.category)
    const list = items.map((c) => `<li><a href="/chronicles/${c.id}">${escapeHtml(c.title)}</a></li>`).join('')
    return {
      url,
      title: `${route.category} — Chronicles — ${PERSONAL.name}`,
      description: `Chronicles under “${route.category}” by ${PERSONAL.name}.`,
      image: defaultImage,
      ogType: 'website',
      main: crawlerMain(`<h1>${escapeHtml(route.category)}</h1><ul>${list}</ul>`),
    }
  }

  if (route.section === 'academia' && route.academiaTab === 'projects' && route.focusId) {
    const proj = PROJECTS.find((p) => p.id === route.focusId)
    if (proj) {
      return {
        url,
        title: `Projects — ${proj.name} — ${PERSONAL.name}`,
        description: proj.description || proj.subtitle || `A project by ${PERSONAL.name}.`,
        image: defaultImage,
        ogType: 'website',
        main: crawlerMain(`<h1>${escapeHtml(proj.name)}</h1><p>${escapeHtml(proj.subtitle || '')}</p><p>${escapeHtml(proj.description || '')}</p>`),
      }
    }
  }

  if (route.section === 'academia' && route.academiaTab === 'experience' && route.focusId) {
    const exp = EXPERIENCE.find((p) => p.id === route.focusId)
    if (exp) {
      const highlights = (exp.highlights || []).map((h) => `<li>${escapeHtml(h)}</li>`).join('')
      return {
        url,
        title: `Experience — ${exp.role} at ${exp.company} — ${PERSONAL.name}`,
        description: `${exp.role} at ${exp.company}, ${exp.location}.`,
        image: defaultImage,
        ogType: 'website',
        main: crawlerMain(`<h1>${escapeHtml(exp.role)}</h1><p>${escapeHtml(exp.company)} · ${escapeHtml(exp.location)} · ${escapeHtml(exp.period)}</p><ul>${highlights}</ul>`),
      }
    }
  }

  if (route.section === 'academia' && route.academiaTab === 'education' && route.focusId) {
    const edu = EDUCATION.find((p) => p.id === route.focusId)
    if (edu) {
      return {
        url,
        title: `Education — ${edu.degree} — ${PERSONAL.name}`,
        description: `${edu.degree} at ${edu.institution}.`,
        image: defaultImage,
        ogType: 'website',
        main: crawlerMain(`<h1>${escapeHtml(edu.degree)}</h1><p>${escapeHtml(edu.institution)} · ${escapeHtml(edu.location)} · ${escapeHtml(edu.period)}</p>`),
      }
    }
  }

  if (route.section === 'blog' && route.focusId) {
    const post = BLOG_POSTS.find((p) => p.id === route.focusId)
    if (post) {
      const body = (Array.isArray(post.body) ? post.body : [post.body]).map((p) => `<p>${escapeHtml(p)}</p>`).join('\n        ')
      const postImage = Array.isArray(post.media) && post.media.length && /\.(jpe?g|png|gif|webp|avif)$/i.test(post.media[0])
        ? `${SITE_URL}${post.media[0]}`
        : defaultImage
      return {
        url,
        title: `Journal — ${post.title} — ${PERSONAL.name}`,
        description: post.subtitle || `A journal entry by ${PERSONAL.name}.`,
        image: postImage,
        ogType: 'article',
        main: crawlerMain(`<h1>${escapeHtml(post.title)}</h1><p><em>${escapeHtml(post.subtitle || '')}</em></p>${body}`),
      }
    }
  }

  if (route.section === 'about' && route.linksTab) {
    const col = LINK_COLLECTIONS.find((c) => c.id === route.linksTab)
    if (col) {
      const list = col.links.map((l) => `<li><a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a></li>`).join('')
      return {
        url,
        title: `About — ${col.label} — ${PERSONAL.name}`,
        description: col.heading,
        image: defaultImage,
        ogType: 'website',
        main: crawlerMain(`<h1>${escapeHtml(col.heading)}</h1><ul>${list}</ul>`),
      }
    }
  }

  if (route.section && SECTION_META[route.section]) {
    const meta = SECTION_META[route.section]
    let extra = ''
    if (route.section === 'chronicles') {
      extra = `<ul>${CHRONICLES.map((c) => `<li><a href="/chronicles/${c.id}">${escapeHtml(c.title)}</a></li>`).join('')}</ul>`
    }
    if (route.section === 'academia' && route.academiaTab === 'projects') {
      extra = `<ul>${PROJECTS.map((p) => `<li><a href="/academia/projects/${p.id}">${escapeHtml(p.name)}</a></li>`).join('')}</ul>`
    }
    if (route.section === 'blog') {
      extra = `<ul>${BLOG_POSTS.map((p) => `<li><a href="/blog/${p.id}">${escapeHtml(p.title)}</a></li>`).join('')}</ul>`
    }
    return {
      url,
      title: meta.title,
      description: meta.description,
      image: defaultImage,
      ogType: 'website',
      main: crawlerMain(`<h1>${escapeHtml(meta.title)}</h1><p>${escapeHtml(meta.description)}</p>${extra}`),
    }
  }

  return null
}

let count = 0
const paths = listAllPaths().filter((p) => p !== '/')

for (const path of paths) {
  const page = pageForPath(path)
  if (!page) continue

  let html = applyMeta(template, page)

  if (page.jsonLd) {
    const jsonLd = `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>\n  </head>`
    html = replaceOnce(html, '</head>', jsonLd)
  }

  html = html.replace(/<main[\s\S]*?<\/main>/, page.main)

  const outDir = resolve(DIST_DIR, path.replace(/^\//, ''))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), html)
  count++
}

console.log(`✓ generated ${count} static route snapshot(s) in dist/<path>/index.html`)
