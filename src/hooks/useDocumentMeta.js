import { useEffect } from 'react'
import { PERSONAL, SECTION_META } from '@/data/portfolio'
import { pathForRoute } from '@/lib/routes'

// ── SEO: dynamic per-route document metadata ────────────────────────────────
const SITE_URL = `https://${PERSONAL.website}`
const DEFAULT_TITLE = `${PERSONAL.name} — ${PERSONAL.title} & Software Engineer`
const DEFAULT_DESCRIPTION =
  `${PERSONAL.name} — Full-Stack Developer based in ${PERSONAL.location}. Expert in React, Three.js, Node.js, TypeScript & WebGL. Interactive 3D portfolio, projects & blog at ${PERSONAL.website}.`
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

const JSONLD_ID = 'route-jsonld'

const OVERLAY_META = {
  gallery: {
    title: `${PERSONAL.name} — Gallery`,
    description: `Photo and media gallery from ${PERSONAL.name}.`,
  },
  evidence: {
    title: `${PERSONAL.name} — Evidence Locker`,
    description: `Small proof of a life being lived — from ${PERSONAL.name}'s cabinet.`,
  },
  motif: {
    title: `${PERSONAL.name} — Motif`,
    description: `Music pressed to disc — Motif from ${PERSONAL.name}'s cabinet.`,
  },
  failure: {
    title: `${PERSONAL.name} — Failure Confessions`,
    description: `Things that didn't work, said plainly — from ${PERSONAL.name}.`,
  },
  gift: {
    title: `${PERSONAL.name} — Gift Shop`,
    description: `A question, curated and gifted — from ${PERSONAL.name}'s cabinet.`,
  },
}

const ACADEMIA_TAB_META = {
  projects: {
    title: `${PERSONAL.name} — Projects`,
    description: `Selected projects by ${PERSONAL.name} — React, Three.js, Node.js and more.`,
  },
  experience: {
    title: `${PERSONAL.name} — Experience`,
    description: `Work experience for ${PERSONAL.name}, Full-Stack Developer.`,
  },
  skills: {
    title: `${PERSONAL.name} — Skills`,
    description: `Technical skills and domains for ${PERSONAL.name}.`,
  },
  education: {
    title: `${PERSONAL.name} — Education`,
    description: `Education and certifications for ${PERSONAL.name}.`,
  },
}

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

function upsertJsonLd(payload) {
  let script = document.getElementById(JSONLD_ID)
  if (!payload) {
    if (script) script.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = JSONLD_ID
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(payload)
}

export function useDocumentMeta({
  activeSection,
  chronicle = null,
  academiaTab = null,
  linksTab = null,
  category = null,
  overlay = null,
} = {}) {
  useEffect(() => {
    let title = DEFAULT_TITLE
    let description = DEFAULT_DESCRIPTION
    let image = DEFAULT_IMAGE
    let ogType = 'website'
    let jsonLd = null

    const route = {
      section: activeSection,
      chronicleId: chronicle?.id,
      category,
      academiaTab: activeSection === 'academia' ? academiaTab : null,
      linksTab: activeSection === 'about' ? linksTab : null,
      overlay,
    }
    const canonical = `${SITE_URL}${pathForRoute(route)}`

    if (chronicle) {
      title = `${chronicle.title} — ${PERSONAL.name}`
      description = chronicle.dek || DEFAULT_DESCRIPTION
      image = chronicle.coverImage ? `${SITE_URL}${chronicle.coverImage}` : DEFAULT_IMAGE
      ogType = 'article'
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: chronicle.title,
        description: chronicle.dek || '',
        url: canonical,
        image,
        datePublished: chronicle.date,
        author: { '@type': 'Person', name: PERSONAL.name, url: SITE_URL },
      }
    } else if (category) {
      title = `${category} — Chronicles — ${PERSONAL.name}`
      description = `Chronicles under “${category}” by ${PERSONAL.name}.`
    } else if (overlay && OVERLAY_META[overlay]) {
      title = OVERLAY_META[overlay].title
      description = OVERLAY_META[overlay].description
    } else if (activeSection === 'academia' && academiaTab && ACADEMIA_TAB_META[academiaTab]) {
      title = ACADEMIA_TAB_META[academiaTab].title
      description = ACADEMIA_TAB_META[academiaTab].description
    } else if (activeSection && SECTION_META[activeSection]) {
      const meta = SECTION_META[activeSection]
      title = meta.title
      description = meta.description
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
    upsertJsonLd(jsonLd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, chronicle, academiaTab, linksTab, category, overlay])
}
