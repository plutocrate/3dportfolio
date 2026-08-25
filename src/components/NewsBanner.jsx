import { useEffect, useRef, useState } from 'react'
import { BLOG_POSTS, PROJECTS, EXPERIENCE, EDUCATION, SKILLS } from '@/data/portfolio'
import { CHRONICLES } from '@/data/chronicles'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'

// Parse loose date strings like "17 Mar 2026" or "0211, 18 Mar 2026"
function parseDate(str) {
  if (!str) return new Date(0)
  const clean = str.replace(/^[\w]+,\s*/, '').trim()
  const d = new Date(clean)
  return isNaN(d) ? new Date(0) : d
}

const NOW = new Date()

// Build a flat list of all "items" with type, label, date, sectionId
function buildFeed() {
  const items = []

  // Blog / journal posts — use their publish date directly
  BLOG_POSTS.forEach((p) => items.push({
    type: 'JOURNAL',
    label: p.title,
    date: parseDate(p.date),
    href: `/blog/${p.id}`,
    prefix: '✦ NEW JOURNAL',
  }))

  CHRONICLES.forEach((c) => items.push({
    type: 'CHRONICLE',
    label: c.title,
    date: parseDate(c.date),
    href: `/chronicles/${c.id}`,
    prefix: '✦ NEW CHRONICLE',
  }))

  // Skills — only surfaces skills that have been tagged with a dateAdded
  // (see the comment above SKILLS in data/portfolio.js)
  SKILLS.technical.forEach((s) => {
    if (!s.dateAdded) return
    items.push({
      type: 'SKILL',
      label: s.name,
      date: parseDate(s.dateAdded),
      href: '/academia/skills',
      prefix: '✦ NEW SKILL',
    })
  })

  // Projects — use their period (month/year of completion)
  PROJECTS.forEach((p) => items.push({
    type: 'PROJECT',
    label: p.name,
    date: parseDate(p.period),
    href: `/academia/projects/${p.id}`,
    prefix: '✦ NEW PROJECT',
  }))

  // Experience — only include if the START of the role is recent (within 12 months)
  // and never use future/ongoing end dates
  EXPERIENCE.forEach((e) => {
    const start = e.period?.split('–')[0]?.trim() || ''
    const startDate = parseDate(start)
    const monthsAgo = (NOW - startDate) / (1000 * 60 * 60 * 24 * 30)
    if (startDate > new Date(0) && monthsAgo <= 12) {
      items.push({
        type: 'EXPERIENCE',
        label: `${e.role} @ ${e.company}`,
        date: startDate,
        href: `/academia/experience/${e.id}`,
        prefix: '✦ NEW EXPERIENCE',
      })
    }
  })

  // Education — only include if started within last 4 years (actively studying)
  EDUCATION.forEach((e) => {
    const start = e.period?.split('–')[0]?.trim() || ''
    const startDate = parseDate(start)
    const yearsAgo = (NOW - startDate) / (1000 * 60 * 60 * 24 * 365)
    if (startDate > new Date(0) && yearsAgo <= 4) {
      items.push({
        type: 'EDUCATION',
        label: e.degree,
        date: startDate,
        href: `/academia/education/${e.id}`,
        prefix: '✦ NEW EDUCATION',
      })
    }
  })

  // Sort newest first, dedupe by label
  items.sort((a, b) => b.date - a.date)
  return items
}

const FEED = buildFeed()

// Build the ticker string: top 5 items scrolling
const TICKER_ITEMS = FEED.slice(0, 5)

export function NewsBanner({ visible }) {
  const playClick = useClickSound()
  const { go }    = useGo()
  const trackRef         = useRef()
  const [current, setCurrent] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const touchStartX = useRef(null)
  const touchDx     = useRef(0)

  // Auto-advance every 4s
  useEffect(() => {
    if (!visible || dismissed) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % TICKER_ITEMS.length)
    }, 4000)
    return () => clearInterval(id)
  }, [visible, dismissed])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchDx.current = 0
  }

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return
    touchDx.current = e.touches[0].clientX - touchStartX.current
  }

  const handleTouchEnd = () => {
    if (Math.abs(touchDx.current) > 30) {
      if (touchDx.current < 0) {
        // swipe left → next
        setCurrent((c) => (c + 1) % TICKER_ITEMS.length)
      } else {
        // swipe right → prev
        setCurrent((c) => (c - 1 + TICKER_ITEMS.length) % TICKER_ITEMS.length)
      }
    }
    touchStartX.current = null
    touchDx.current = 0
  }

  if (!visible || dismissed || TICKER_ITEMS.length === 0) return null

  const item = TICKER_ITEMS[current]

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 flex items-center"
      style={{
        height: 28,
        background: 'rgba(8,8,8,0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Left tag */}
      <div
        className="shrink-0 flex items-center px-2 h-full border-r"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}
      >
        <span className="font-mono text-[clamp(8px,calc(7.08px+0.24vw),11px)] uppercase tracking-[0.22em] text-white/58">
          LATEST
        </span>
      </div>

      {/* Scrolling content */}
      <div
        className="flex-1 overflow-hidden flex items-center px-3 cursor-pointer group"
        onClick={() => { playClick(); if (item.href) go(item.href) }}
      >
        <span className="font-mono text-[clamp(10px,calc(9.39px+0.16vw),12px)] uppercase tracking-[0.16em] text-white/61 mr-2 shrink-0">
          {item.prefix}
        </span>
        <span
          className="font-mono text-[clamp(10px,calc(9.39px+0.16vw),12px)] uppercase tracking-[0.12em] text-white/82 group-hover:text-white transition-colors truncate"
        >
          — {item.label}
        </span>
      </div>

      {/* Dots */}
      <div className="shrink-0 flex items-center gap-1.5 sm:gap-1 px-3">
        {TICKER_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Show item ${i + 1}`}
            style={{
              width: i === current ? 15.6 : 5.2,
              height: 5.2,
              borderRadius: 2,
              background: i === current ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.32)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="shrink-0 flex items-center justify-center w-9 sm:w-7 h-full border-l text-white/68 hover:text-white/88 transition-colors font-mono text-[clamp(15.6px,calc(14px+0.43vw),20.8px)] sm:text-[clamp(12px,calc(10.78px+0.33vw),16px)]"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        ×
      </button>
    </div>
  )
}
