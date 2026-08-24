import { useEffect } from 'react'
import { PERSONAL, SECTION_META } from '@/data/portfolio'

// ── SEO: dynamic per-route document metadata ────────────────────────────────
// This is a single-page app, so without this the browser tab, any bookmark,
// and any link preview would say the same generic title/description no
// matter which section (About, Chronicles, Talk...) — or which individual
// Chronicle article — is actually open. This hook keeps <title>, the meta
// description, canonical link, and the Open Graph / Twitter tags in sync
// with whichever section OR chronicle is active, falling back to the
// site-wide defaults when nothing is open (i.e. the root page).
//
// Priority: chronicle > section > site default. A chronicle also gets its
// own canonical URL (/chronicles/:id), its own cover image as og:image, and
// a BlogPosting JSON-LD block — each article reads as a distinct, indexable
// page to search engines and link-preview bots, not a fragment of the home
// page.
const SITE_URL = `https://${PERSONAL.website}`
const DEFAULT_TITLE = `${PERSONAL.name} — ${PERSONAL.title} & Software Engineer`
const DEFAULT_DESCRIPTION =
  `${PERSONAL.name} — Full-Stack Developer based in ${PERSONAL.location}. Expert in React, Three.js, Node.js, TypeScript & WebGL. Interactive 3D portfolio, projects & blog at ${PERSONAL.website}.`
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

const JSONLD_ID = 'chronicle-jsonld'

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

function setOrCreateLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertChronicleJsonLd(chronicle) {
  let script = document.getElementById(JSONLD_ID)
  if (!chronicle) {
    if (script) script.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = JSONLD_ID
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: chronicle.title,
    description: chronicle.dek || '',
    url: `${SITE_URL}/chronicles/${chronicle.id}`,
    image: chronicle.coverImage ? `${SITE_URL}${chronicle.coverImage}` : DEFAULT_IMAGE,
    datePublished: chronicle.date,
    author: { '@type': 'Person', name: PERSONAL.name, url: SITE_URL },
  })
}

export function useDocumentMeta(activeSection, chronicle = null) {
  useEffect(() => {
    let title, description, canonical, image, ogType

    if (chronicle) {
      title       = `${chronicle.title} — ${PERSONAL.name}`
      description = chronicle.dek || DEFAULT_DESCRIPTION
      canonical   = `${SITE_URL}/chronicles/${chronicle.id}`
      image       = chronicle.coverImage ? `${SITE_URL}${chronicle.coverImage}` : DEFAULT_IMAGE
      ogType      = 'article'
    } else if (activeSection && SECTION_META[activeSection]) {
      const meta = SECTION_META[activeSection]
      title       = meta.title
      description = meta.description
      canonical   = `${SITE_URL}/${activeSection}`
      image       = DEFAULT_IMAGE
      ogType      = 'website'
    } else {
      title       = DEFAULT_TITLE
      description = DEFAULT_DESCRIPTION
      canonical   = `${SITE_URL}/`
      image       = DEFAULT_IMAGE
      ogType      = 'website'
    }

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', canonical)
    setMeta('meta[property="og:image"]', 'content', image)
    setMeta('meta[property="og:type"]', 'content', ogType)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="twitter:image"]', 'content', image)
    setOrCreateLink('canonical', canonical)
    upsertChronicleJsonLd(chronicle)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, chronicle])
}
