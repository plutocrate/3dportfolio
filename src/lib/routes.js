import { getChronicleById } from '@/data/chronicles'
import { SECTION_META } from '@/data/portfolio'

// ─────────────────────────────────────────────────────────────────────────────
// ROUTES — single source of truth mapping app state <-> a real, unique URL.
//
// This app doesn't use <Route>/<Routes> — it's one always-mounted 3D scene
// with overlays toggled by Zustand state. But every piece of content that's
// worth indexing (a section, or an individual Chronicle) still gets its own
// real browser URL, kept in sync automatically:
//   state -> URL   (pathForState, called from App.jsx on every state change)
//   URL -> state   (parseDeepLink, called once on load for direct/shared links)
//
// Adding a new Chronicle to src/data/chronicles.js requires ZERO changes
// here — its route (/chronicles/<id>) exists the moment it's added to the
// CHRONICLES array, because both directions are derived from that same data.
// ─────────────────────────────────────────────────────────────────────────────

const KNOWN_SECTIONS = Object.keys(SECTION_META) // about, academia, talk, chronicles, cabinet, blog

// Given current app state, return the canonical path that should be shown
// in the address bar right now.
export function pathForState({ activeSection, openChronicleId }) {
  if (openChronicleId) return `/chronicles/${openChronicleId}`
  if (activeSection) return `/${activeSection}`
  return '/'
}

// Given the URL the visitor actually landed on (a shared link, a bookmark,
// a search result), figure out what should be opened once the loading
// screen finishes. Returns null for an unrecognized/root path.
export function parseDeepLink(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  const parts = clean.split('/').filter(Boolean)
  if (parts.length === 0) return null

  if (parts[0] === 'chronicles' && parts[1]) {
    const chronicle = getChronicleById(parts[1])
    if (chronicle) return { section: 'chronicles', chronicleId: chronicle.id }
    return { section: 'chronicles' } // unknown id — still land on the list, not a 404
  }

  if (KNOWN_SECTIONS.includes(parts[0])) {
    return { section: parts[0] }
  }

  return null
}
