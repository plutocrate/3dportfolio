import { CHRONICLES, getChronicleById } from '../data/chronicles.js'
import {
  SECTION_META,
  PROJECTS,
  EXPERIENCE,
  EDUCATION,
  BLOG_POSTS,
  LINK_COLLECTIONS,
} from '../data/portfolio.js'

// ─────────────────────────────────────────────────────────────────────────────
// ROUTES — URL is the source of truth. Every shareable surface has a real path.
//
//   /                              3D home
//   /about                         About panel
//   /about/gallery                 Full gallery overlay
//   /about/links/:collectionId     About → a Links tab
//   /academia                      Academia (defaults to projects tab)
//   /academia/projects
//   /academia/projects/:id
//   /academia/experience
//   /academia/experience/:id
//   /academia/skills
//   /academia/education
//   /academia/education/:id
//   /talk
//   /chronicles
//   /chronicles/topic/:categorySlug
//   /chronicles/:id
//   /blog
//   /blog/:id
//   /cabinet
//   /cabinet/evidence | motif | failure-confessions | gift-shop
//
// Adding a chronicle / project / post to its data file is enough — listAllPaths
// and parsePath both derive from that data.
// ─────────────────────────────────────────────────────────────────────────────

export function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getChronicleCategories() {
  const seen = []
  for (const c of CHRONICLES) {
    if (c.category && !seen.includes(c.category)) seen.push(c.category)
  }
  return seen
}

export function getCategoryBySlug(slug) {
  return getChronicleCategories().find((c) => slugify(c) === slug) || null
}

export const ACADEMIA_TABS = ['projects', 'experience', 'skills', 'education']

const CABINET_BY_SLUG = {
  evidence: 'evidence',
  motif: 'motif',
  'failure-confessions': 'failure',
  'gift-shop': 'gift',
}

const CABINET_TO_SLUG = {
  evidence: 'evidence',
  motif: 'motif',
  failure: 'failure-confessions',
  gift: 'gift-shop',
}

export const KNOWN_SECTIONS = Object.keys(SECTION_META)

export function normalizePath(pathname) {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/'
  return clean.startsWith('/') ? clean : `/${clean}`
}

export function parsePath(pathname) {
  const parts = normalizePath(pathname).split('/').filter(Boolean)
  if (parts.length === 0) return { section: null }

  const [a, b, c] = parts

  if (a === 'about') {
    if (b === 'gallery') return { section: 'about', overlay: 'gallery' }
    if (b === 'links') {
      const tab = LINK_COLLECTIONS.some((x) => x.id === c) ? c : LINK_COLLECTIONS[0]?.id
      return { section: 'about', linksTab: tab }
    }
    return { section: 'about' }
  }

  if (a === 'academia') {
    const tab = ACADEMIA_TABS.includes(b) ? b : 'projects'
    const route = { section: 'academia', academiaTab: tab }
    if (c) {
      if (tab === 'projects' && PROJECTS.some((p) => p.id === c)) {
        route.focusId = c
        route.scrollId = `project-${c}`
      } else if (tab === 'experience' && EXPERIENCE.some((p) => p.id === c)) {
        route.focusId = c
        route.scrollId = `experience-${c}`
      } else if (tab === 'education' && EDUCATION.some((p) => p.id === c)) {
        route.focusId = c
        route.scrollId = `education-${c}`
      }
    }
    return route
  }

  if (a === 'talk') return { section: 'talk' }

  if (a === 'chronicles') {
    if (!b) return { section: 'chronicles' }
    if (b === 'topic') {
      const category = getCategoryBySlug(c)
      if (category) return { section: 'chronicles', category }
      return { section: 'chronicles' }
    }
    const chronicle = getChronicleById(b)
    if (chronicle) return { section: 'chronicles', chronicleId: chronicle.id }
    return { section: 'chronicles' }
  }

  if (a === 'blog') {
    if (b && BLOG_POSTS.some((p) => p.id === b)) {
      return { section: 'blog', focusId: b, scrollId: `blogpost-${b}` }
    }
    return { section: 'blog' }
  }

  if (a === 'cabinet') {
    if (b && CABINET_BY_SLUG[b]) {
      return { section: 'cabinet', overlay: CABINET_BY_SLUG[b] }
    }
    return { section: 'cabinet' }
  }

  if (KNOWN_SECTIONS.includes(a)) return { section: a }

  return { section: null }
}

export function pathForRoute(route) {
  if (!route || !route.section) return '/'
  const { section, overlay, chronicleId, category, academiaTab, linksTab, focusId } = route

  if (chronicleId) return `/chronicles/${chronicleId}`
  if (category) return `/chronicles/topic/${slugify(category)}`

  if (overlay === 'gallery') return '/about/gallery'
  if (overlay && CABINET_TO_SLUG[overlay]) return `/cabinet/${CABINET_TO_SLUG[overlay]}`

  if (section === 'academia') {
    const tab = ACADEMIA_TABS.includes(academiaTab) ? academiaTab : 'projects'
    if (focusId) return `/academia/${tab}/${focusId}`
    if (academiaTab) return `/academia/${tab}`
    return '/academia'
  }

  if (section === 'blog' && focusId) return `/blog/${focusId}`
  if (section === 'about' && linksTab) return `/about/links/${linksTab}`

  return `/${section}`
}

export function parentPath(pathname) {
  const route = parsePath(pathname)
  if (!route.section) return '/'
  if (route.chronicleId) {
    const chronicle = getChronicleById(route.chronicleId)
    if (chronicle && chronicle.category) {
      return `/chronicles/topic/${slugify(chronicle.category)}`
    }
    return '/chronicles'
  }
  if (route.category) return '/chronicles'
  if (route.overlay === 'gallery' || route.linksTab) return '/about'
  if (route.overlay) return '/cabinet'
  if (route.section === 'academia' && route.focusId) {
    return `/academia/${route.academiaTab || 'projects'}`
  }
  if (route.section === 'blog' && route.focusId) return '/blog'
  return '/'
}

export function getAncestors(pathname) {
  const list = []
  let curr = normalizePath(pathname)
  while (curr !== '/') {
    const parent = normalizePath(parentPath(curr))
    if (parent === curr) break
    list.unshift(parent)
    curr = parent
  }
  return list
}


export function listAllPaths() {
  const paths = [
    '/',
    '/about',
    '/about/gallery',
    '/academia',
    '/academia/projects',
    '/academia/experience',
    '/academia/skills',
    '/academia/education',
    '/talk',
    '/chronicles',
    '/blog',
    '/cabinet',
    '/cabinet/evidence',
    '/cabinet/motif',
    '/cabinet/failure-confessions',
    '/cabinet/gift-shop',
  ]

  for (const c of LINK_COLLECTIONS) paths.push(`/about/links/${c.id}`)
  for (const p of PROJECTS) paths.push(`/academia/projects/${p.id}`)
  for (const e of EXPERIENCE) paths.push(`/academia/experience/${e.id}`)
  for (const e of EDUCATION) paths.push(`/academia/education/${e.id}`)
  for (const cat of getChronicleCategories()) paths.push(`/chronicles/topic/${slugify(cat)}`)
  for (const c of CHRONICLES) paths.push(`/chronicles/${c.id}`)
  for (const p of BLOG_POSTS) paths.push(`/blog/${p.id}`)
  return paths
}

// Back-compat aliases used by older call sites / scripts.
export const parseDeepLink = parsePath
export const pathForState = pathForRoute
