import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '@/hooks/useSceneStore'
import { resumeMusicAfterVideo } from '@/hooks/useMusicBridge'
import { useClickSound } from '@/hooks/useClickSound'
import { pauseAllVideos } from '@/hooks/useMusicBridge'
import {
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  EducationSection,
  TalkSection,
  BlogSection,
} from '@/components/sections'

const SECTION_MAP = {
  about:      AboutSection,
  experience: ExperienceSection,
  projects:   ProjectsSection,
  skills:     SkillsSection,
  education:  EducationSection,
  talk:       TalkSection,
  blog:       BlogSection,
}

const DEFAULT_WIDTH = 560   // 1.5× original ~380
const MIN_WIDTH     = 320
const MAX_WIDTH     = Math.min(900, typeof window !== 'undefined' ? window.innerWidth - 80 : 900)

export function SectionPanel({ onClose }) {
  const panelOpen     = useSceneStore((s) => s.panelOpen)
  const activeSection = useSceneStore((s) => s.activeSection)
  const closeSection  = useSceneStore((s) => s.closeSection)
  const fontSize      = useSceneStore((s) => s.fontSize)
  const setFontSize   = useSceneStore((s) => s.setFontSize)
  const panelRef      = useRef()
  const contentRef    = useRef()
  const playClick     = useClickSound()

  const [width, setWidth]       = useState(DEFAULT_WIDTH)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const dragging  = useRef(false)
  const startX    = useRef(0)
  const startW    = useRef(0)

  // Track mobile breakpoint
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
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

  // ── Drag resize handlers ──────────────────────────────────────────────────
  const onMouseDown = useCallback((e) => {
    dragging.current = true
    startX.current   = e.clientX
    startW.current   = width
    document.body.style.cursor    = 'ew-resize'
    document.body.style.userSelect = 'none'
  }, [width])

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return
      const delta = startX.current - e.clientX   // dragging left = wider
      const next  = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startW.current + delta))
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
  }, [])

  // Touch drag
  const onTouchStart = useCallback((e) => {
    dragging.current = true
    startX.current   = e.touches[0].clientX
    startW.current   = width
  }, [width])

  useEffect(() => {
    const onTouchMove = (e) => {
      if (!dragging.current) return
      const delta = startX.current - e.touches[0].clientX
      const next  = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startW.current + delta))
      setWidth(next)
    }
    const onTouchEnd = () => { dragging.current = false }
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend',  onTouchEnd)
    return () => {
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend',  onTouchEnd)
    }
  }, [])

  const SectionContent = activeSection ? SECTION_MAP[activeSection] : null
  const panelWidth     = isMobile ? '100%' : width

  return (
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
            className="absolute font-mono text-[9px] text-white/15 uppercase tracking-[0.4em] select-none pointer-events-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {activeSection}
          </div>
        </div>
      )}

      {/* Font size controls — fixed in header, never affected by zoom */}
      <div
        className="absolute top-6 z-10 flex items-center"
        style={{ right: isMobile ? 16 : 16, gap: 8 }}
      >
        {/* − + as one grouped unit */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setFontSize(fontSize - 0.2)}
            disabled={fontSize <= 0.6}
            className="w-7 h-7 flex items-center justify-center border border-white/15 font-mono text-[12px] text-white/35 hover:text-white hover:border-white/45 disabled:opacity-20 disabled:cursor-not-allowed transition-all leading-none"
          >−</button>
          <button
            onClick={() => setFontSize(fontSize + 0.2)}
            disabled={fontSize >= 2.0}
            className="w-7 h-7 flex items-center justify-center border border-white/15 font-mono text-[12px] text-white/35 hover:text-white hover:border-white/45 disabled:opacity-20 disabled:cursor-not-allowed transition-all leading-none"
          >+</button>
        </div>

        {/* Reset */}
        {fontSize !== 1 && (
          <button
            onClick={() => setFontSize(1)}
            className="w-7 h-7 flex items-center justify-center font-mono text-[11px] text-white/20 hover:text-white/55 transition-colors border border-white/10 hover:border-white/30"
            title="Reset"
          >↺</button>
        )}

        {/* Close — desktop only, separated by a clear gap from font controls */}
        {!isMobile && (
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
        )}
        {!isMobile && (
          <button
            onClick={() => { playClick(); onClose ? onClose() : closeSection() }}
            className="w-8 h-8 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/50 transition-all duration-200 font-mono text-base"
            aria-label="Close"
          >×</button>
        )}

      </div>

      {/* Scrollable content */}
      <div className="relative h-full overflow-y-auto pb-12 pl-10" style={{ paddingTop: 52 }}>
        <div ref={contentRef} style={{ zoom: fontSize }}>
          {SectionContent && <SectionContent />}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-px right-0 border-t border-white/8 px-8 pl-10 py-3 flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/18 uppercase tracking-widest">
          prathamis.cool
        </span>
        <span className="font-mono text-[9px] text-white/18 tabular-nums">
          {new Date().getFullYear()}
        </span>
      </div>
    </div>
  )
}
