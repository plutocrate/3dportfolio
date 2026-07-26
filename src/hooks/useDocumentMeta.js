import { useEffect } from 'react'
import { PERSONAL, SECTION_META } from '@/data/portfolio'

// ── SEO: dynamic per-section document metadata ──────────────────────────────
// This is a single-page app, so without this the browser tab, any bookmark,
// and any link preview would say the same generic title/description no
// matter which section (About, Chronicles, Talk...) is actually open. This
// hook keeps <title>, the meta description, and the Open Graph / Twitter
// title+description in sync with whichever section is active, falling back
// to the site-wide defaults when nothing is open (i.e. the root page).
const DEFAULT_TITLE = `${PERSONAL.name} — ${PERSONAL.title} & Software Engineer`
const DEFAULT_DESCRIPTION =
  `${PERSONAL.name} — Full-Stack Developer based in ${PERSONAL.location}. Expert in React, Three.js, Node.js, TypeScript & WebGL. Interactive 3D portfolio, projects & blog at ${PERSONAL.website}.`

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

export function useDocumentMeta(activeSection) {
  useEffect(() => {
    const meta = activeSection ? SECTION_META[activeSection] : null
    const title       = meta?.title || DEFAULT_TITLE
    const description = meta?.description || DEFAULT_DESCRIPTION

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)

    // Always restore the site-wide default when a section closes, rather
    // than leaving the last-opened section's title lingering on the root.
    return () => {
      document.title = DEFAULT_TITLE
      setMeta('meta[name="description"]', 'content', DEFAULT_DESCRIPTION)
      setMeta('meta[property="og:title"]', 'content', DEFAULT_TITLE)
      setMeta('meta[property="og:description"]', 'content', DEFAULT_DESCRIPTION)
      setMeta('meta[name="twitter:title"]', 'content', DEFAULT_TITLE)
      setMeta('meta[name="twitter:description"]', 'content', DEFAULT_DESCRIPTION)
    }
  }, [activeSection])
}
