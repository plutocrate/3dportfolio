import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '@/hooks/useSceneStore'
import { resumeMusicAfterVideo } from '@/hooks/useMusicBridge'
import { useClickSound } from '@/hooks/useClickSound'
import { pauseAllVideos } from '@/hooks/useMusicBridge'
import {
  AboutSection,
  TalkSection,
  BlogSection,
  AcademiaSection,
  ChroniclesSection,
  CabinetSection,
} from '@/components/sections'

const SECTION_MAP = {
  about:      AboutSection,
  academia:   AcademiaSection,
  talk:       TalkSection,
  chronicles: ChroniclesSection,
  cabinet:    CabinetSection,
  blog:       BlogSection,
}

// Default panel width — roughly half the viewport on desktop, capped so it
// never feels excessive on ultra-wide monitors. Mobile always uses 100%.
const getDefaultWidth = () => {
  if (typeof window === 'undefined') return 560
  return Math.round(Math.min(Math.max(window.innerWidth * 0.5, 480), 1000))
}
const MIN_WIDTH = 320
const getMaxWidth = () => (typeof window !== 'undefined' ? Math.min(1200, window.innerWidth - 80) : 1200)

export function SectionPanel({ onClose }) {
  const panelOpen        = useSceneStore((s) => s.panelOpen)
  const activeSection    = useSceneStore((s) => s.activeSection)
  const closeSection     = useSceneStore((s) => s.closeSection)
  const pendingScrollId  = useSceneStore((s) => s.pendingScrollId)
  const clearPendingScroll = useSceneStore((s) => s.clearPendingScroll)
  const panelRef      = useRef()
  const contentRef    = useRef()
  const playClick     = useClickSound()

  const [width, setWidth]       = useState(getDefaultWidth)
  const [maxWidth, setMaxWidth] = useState(getMaxWidth)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const dragging       = useRef(false)
  const startX         = useRef(0)
  const startW         = useRef(0)
  const hasCustomWidth = useRef(false) // true once the user manually drag-resizes

  // Track mobile breakpoint + keep width tied to the CURRENT viewport size.
  // Until the user manually drags the resize handle, the panel always
  // tracks ~50% of whatever the viewport is right now (so shrinking/growing
  // the window, e.g. via devtools, re-flows it live instead of freezing at
  // whatever size it happened to be on mount). Once the user does drag it,
  // we respect their choice but still clamp it so it can never overflow a
  // viewport that's since gotten smaller.
  useEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < 768)
      const nextMax = getMaxWidth()
      setMaxWidth(nextMax)
      if (!hasCustomWidth.current) {
        setWidth(getDefaultWidth())
      } else {
        setWidth((w) => Math.min(w, nextMax))
      }
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    if (!panelRef.current) return
    if (panelOpen) {
      pauseAllVideos()
      panelRef.current.style.transform = 'translateX(0%)'
      if (contentRef.current?.children?.length) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
        )
      }
    } else {
      panelRef.current.style.transform = 'translateX(100%)'
      resumeMusicAfterVideo()
    }
  }, [panelOpen, activeSection])

  // Deep-link scroll — if something (e.g. a Constellation node) requested a
  // specific element be scrolled into view, do it once the section's
  // content has actually rendered, then clear the request.
  useEffect(() => {
    if (!panelOpen || !pendingScrollId) return
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        const el = document.getElementById(pendingScrollId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        clearPendingScroll()
      })
      return () => cancelAnimationFrame(raf2)
    })
    return () => cancelAnimationFrame(raf1)
  }, [panelOpen, activeSection, pendingScrollId, clearPendingScroll])

  // ── Drag resize handlers ──────────────────────────────────────────────────
  const onMouseDown = useCallback((e) => {
    dragging.current = true
    hasCustomWidth.current = true
    startX.current   = e.clientX
    startW.current   = width
    document.body.style.cursor    = 'ew-resize'
    document.body.style.userSelect = 'none'
  }, [width])

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return
      const delta = startX.current - e.clientX   // dragging left = wider
      const next  = Math.max(MIN_WIDTH, Math.min(maxWidth, startW.current + delta))
      setWidth(next)
    }
    const onMouseUp = () => {
      if (!dragging.current) return
      dragging.current = false
      document.body.style.cursor    = ''
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
    }
  }, [maxWidth])

  // Touch drag
  const onTouchStart = useCallback((e) => {
    dragging.current = true
    hasCustomWidth.current = true
    startX.current   = e.touches[0].clientX
    startW.current   = width
  }, [width])

  useEffect(() => {
    const onTouchMove = (e) => {
      if (!dragging.current) return
      const delta = startX.current - e.touches[0].clientX
      const next  = Math.max(MIN_WIDTH, Math.min(maxWidth, startW.current + delta))
      setWidth(next)
    }
    const onTouchEnd = () => { dragging.current = false }
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend',  onTouchEnd)
    return () => {
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend',  onTouchEnd)
    }
  }, [maxWidth])

  const SectionContent = activeSection ? SECTION_MAP[activeSection] : null
  const panelWidth     = isMobile ? '100%' : width

  const handleCloseClick = () => { playClick(); onClose ? onClose() : closeSection() }

  return (
    <>
      {/* Click-anywhere-outside backdrop — closes the sidebar. Sits below the
          panel (z-45 < z-50) and is only interactive while the panel is open. */}
      <div
        onClick={handleCloseClick}
        className="fixed inset-0 z-[45]"
        style={{
          pointerEvents: panelOpen ? 'auto' : 'none',
          background: 'transparent',
        }}
        aria-hidden={!panelOpen}
      />

      <div
      ref={panelRef}
      className="fixed top-0 right-0 h-full z-50 pointer-events-auto"
      style={{
        width: panelWidth,
        transform: 'translateX(100%)',
        transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)',
        willChange: 'transform',
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 border-l border-white/8"
        style={{ background: 'rgba(7,7,7,0.96)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      />

      {/* ── Drag handle (desktop only) ── */}
      {!isMobile && (
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          className="absolute left-0 top-0 bottom-0 w-4 z-20 flex items-center justify-center group"
          style={{ cursor: 'ew-resize', touchAction: 'none' }}
        >
          {/* Thin visible grip line */}
          <div
            className="w-px h-16 rounded-full transition-all duration-150 group-hover:h-24 group-active:bg-white/50"
            style={{ background: 'rgba(255,255,255,0.12)', transition: 'background 0.15s, height 0.15s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          />
          {/* Section label */}
          <div
            className="absolute font-mono text-[clamp(11px,calc(10.08px+0.24vw),14px)] text-white/49 uppercase tracking-[0.4em] select-none pointer-events-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {activeSection}
          </div>
        </div>
      )}

      {/* Close button — always visible, top-right */}
      <div
        className="absolute top-6 z-10 flex items-center"
        style={{ right: 16 }}
      >
        <button
          onClick={handleCloseClick}
          className={isMobile
            ? 'w-[47px] h-[47px] flex items-center justify-center border border-white/15 text-white/78 hover:text-white hover:border-white/50 transition-all duration-200 font-mono text-[23px]'
            : 'w-9 h-9 flex items-center justify-center border border-white/15 text-white/78 hover:text-white hover:border-white/50 transition-all duration-200 font-mono text-lg'}
          aria-label="Close"
        >×</button>
      </div>

      {/* Scrollable content */}
      <div className="relative h-full overflow-y-auto pb-12 pl-6 pr-6 sm:pl-10 sm:pr-10" style={{ paddingTop: 52 }}>
        <div ref={contentRef}>
          {SectionContent && <SectionContent />}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-px right-0 border-t border-white/8 px-6 sm:px-8 py-3 flex items-center justify-between">
        <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/51 uppercase tracking-widest">
          prathamis.cool
        </span>
        <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/51 tabular-nums">
          {new Date().getFullYear()}
        </span>
      </div>
    </div>
    </>
  )
}
