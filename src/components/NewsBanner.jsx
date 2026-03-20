import { useEffect, useRef, useState } from 'react'
import { BLOG_POSTS, PROJECTS, EXPERIENCE, EDUCATION } from '@/data/portfolio'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'

// Parse loose date strings like "17 Mar 2026" or "0211, 18 Mar 2026"
function parseDate(str) {
  if (!str) return new Date(0)
  // Strip leading codes like "0211, "
  const clean = str.replace(/^[\w]+,\s*/, '')
  const d = new Date(clean)
  return isNaN(d) ? new Date(0) : d
}

// Build a flat list of all "items" with type, label, date, sectionId
function buildFeed() {
  const items = []

  BLOG_POSTS.forEach((p) => items.push({
    type: 'BLOG',
    label: p.title,
    date: parseDate(p.date),
    sectionId: 'blog',
    prefix: '✦ NEW BLOG',
  }))

  PROJECTS.forEach((p) => items.push({
    type: 'PROJECT',
    label: p.name,
    date: parseDate(p.period),
    sectionId: 'projects',
    prefix: '✦ NEW PROJECT',
  }))

  EXPERIENCE.forEach((e) => {
    // Use end date of period eg "Mar 2025 – Nov 2025"
    const end = e.period?.split('–').pop()?.trim() || ''
    items.push({
      type: 'EXPERIENCE',
      label: `${e.role} @ ${e.company}`,
      date: parseDate(end),
      sectionId: 'experience',
      prefix: '✦ NEW EXPERIENCE',
    })
  })

  EDUCATION.forEach((e) => {
    const end = e.period?.split('–').pop()?.trim() || ''
    items.push({
      type: 'EDUCATION',
      label: e.degree,
      date: parseDate(end),
      sectionId: 'education',
      prefix: '✦ NEW EDUCATION',
    })
  })

  // Sort newest first
  items.sort((a, b) => b.date - a.date)
  return items
}

const FEED = buildFeed()

// Build the ticker string: top 5 items scrolling
const TICKER_ITEMS = FEED.slice(0, 5)

export function NewsBanner({ visible }) {
  const setActiveSection = useSceneStore((s) => s.setActiveSection)
  const playClick        = useClickSound()
  const trackRef         = useRef()
  const [current, setCurrent] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  // Auto-advance every 4s
  useEffect(() => {
    if (!visible || dismissed) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % TICKER_ITEMS.length)
    }, 4000)
    return () => clearInterval(id)
  }, [visible, dismissed])

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
    >
      {/* Left tag */}
      <div
        className="shrink-0 flex items-center px-2 h-full border-r"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}
      >
        <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/30">
          LATEST
        </span>
      </div>

      {/* Scrolling content */}
      <div
        className="flex-1 overflow-hidden flex items-center px-3 cursor-pointer group"
        onClick={() => { playClick(); setActiveSection(item.sectionId) }}
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35 mr-2 shrink-0">
          {item.prefix}
        </span>
        <span
          className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/70 group-hover:text-white transition-colors truncate"
        >
          — {item.label}
        </span>
      </div>

      {/* Dots */}
      <div className="shrink-0 flex items-center gap-1 px-3">
        {TICKER_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 12 : 4,
              height: 4,
              borderRadius: 2,
              background: i === current ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.18)',
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
        className="shrink-0 flex items-center justify-center w-7 h-full border-l text-white/25 hover:text-white/60 transition-colors font-mono text-[10px]"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        ×
      </button>
    </div>
  )
}
