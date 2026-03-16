import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '@/hooks/useSceneStore'
import { ANNOTATIONS, PERSONAL } from '@/data/portfolio'
import { useClickSound } from '@/hooks/useClickSound'
import { cn } from '@/lib/utils'

function LiveClock() {
  const [t, setT] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const p = (n) => String(n).padStart(2, '0')
  return (
    <span className="font-mono text-[10px] text-white/50 tabular-nums tracking-widest">
      {p(t.getHours())}:{p(t.getMinutes())}:{p(t.getSeconds())}
    </span>
  )
}

function Uptime() {
  const [s, setS] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setS((x) => x + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const p = (n) => String(n).padStart(2, '0')
  return (
    <span className="font-mono text-[10px] text-white/50 tabular-nums tracking-widest">
      {p(Math.floor(s / 3600))}:{p(Math.floor((s % 3600) / 60))}:{p(s % 60)}
    </span>
  )
}

function MusicButton({ playing, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1.5 group transition-all duration-200"
      aria-label={playing ? 'Mute' : 'Unmute'}
    >
      <div className="flex items-end gap-[2px] h-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[2px] rounded-sm bg-white/35 group-hover:bg-white/65 transition-all duration-200"
            style={playing ? {
              height: '10px',
              animation: `music-bar ${0.55 + i * 0.1}s ease-in-out ${i * 0.15}s infinite alternate`,
            } : { height: '3px' }}
          />
        ))}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 group-hover:text-white/60 transition-colors">
        {playing ? 'AMB' : 'OFF'}
      </span>
    </button>
  )
}

export function HUDOverlay({ visible, musicPlaying, onMusicToggle }) {
  const hudRef           = useRef()
  const activeSection    = useSceneStore((s) => s.activeSection)
  const setActiveSection = useSceneStore((s) => s.setActiveSection)
  const closeSection     = useSceneStore((s) => s.closeSection)
  const playClick        = useClickSound()

  useEffect(() => {
    if (!hudRef.current || !visible) return
    gsap.fromTo(hudRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.0, ease: 'power2.out', delay: 0.3 }
    )
  }, [visible])

  if (!visible) return null

  return (
    <>
      {/* Inject music-bar keyframes */}
      <style>{`
        @keyframes music-bar {
          from { height: 3px; }
          to   { height: 10px; }
        }
      `}</style>

      <div
        ref={hudRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{ opacity: 0 }}
      >
        {/* ── TOP BAR ── compact on mobile */}
        <div className="absolute top-0 inset-x-0 flex items-start justify-between px-4 sm:px-8 pt-4 sm:pt-6">
          {/* Left: name + tagline */}
          <div className="flex flex-col gap-0.5">
            <div className="font-display text-[20px] sm:text-[28px] md:text-[34px] text-white leading-none tracking-widest">
              {PERSONAL.name.toUpperCase()}
            </div>
            <div className="font-mono text-[7px] sm:text-[9px] text-white/30 uppercase tracking-[0.22em]">
              {PERSONAL.tagline}
            </div>
          </div>

          {/* Right: status dot */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/35 animate-pulse" />
            <span className="font-mono text-[8px] text-white/22 uppercase tracking-wider hidden sm:block">
              {activeSection ? `— ${activeSection}` : 'Interactive'}
            </span>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="absolute bottom-0 inset-x-0 flex items-end justify-between px-4 sm:px-8 pb-4 sm:pb-6">

          {/* Left: nav + uptime — single tight column, all left-aligned */}
          <div className="flex flex-col pointer-events-auto">
            {/* Desktop text nav */}
            <div className="hidden sm:flex flex-col gap-1.5">
              {ANNOTATIONS.map((ann) => (
                <button
                  key={ann.id}
                  onClick={() => {
                    playClick()
                    activeSection === ann.id ? closeSection() : setActiveSection(ann.id)
                  }}
                  className="flex items-center gap-2 group text-left"
                >
                  <div className={cn(
                    'w-1.5 h-1.5 rounded-full transition-all duration-200 shrink-0',
                    activeSection === ann.id ? 'bg-white' : 'bg-white/18 group-hover:bg-white/55'
                  )} />
                  <span className={cn(
                    'font-mono text-[9px] uppercase tracking-[0.16em] transition-colors',
                    activeSection === ann.id ? 'text-white' : 'text-white/30 group-hover:text-white/65'
                  )}>
                    {ann.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile dot nav */}
            <div className="flex sm:hidden items-center gap-2 pointer-events-auto">
              {ANNOTATIONS.map((ann) => (
                <button
                  key={ann.id}
                  onClick={() => {
                    playClick()
                    activeSection === ann.id ? closeSection() : setActiveSection(ann.id)
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    activeSection === ann.id ? 'bg-white scale-125' : 'bg-white/22'
                  )}
                  title={ann.label}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="w-14 h-px bg-white/8 my-2" />

            {/* Uptime — same left edge as nav items */}
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[7px] sm:text-[8px] text-white/18 uppercase tracking-[0.2em]">Uptime</span>
              <Uptime />
            </div>
          </div>

          {/* Center hint — desktop only */}
          <div className="hidden md:block absolute left-1/2 bottom-4 sm:bottom-6 -translate-x-1/2">
            <span className="font-mono text-[8px] text-white/13 uppercase tracking-[0.2em]">
              Drag · Pinch · Click
            </span>
          </div>

          {/* Right: local time + music */}
          <div className="flex flex-col items-end gap-2 pointer-events-auto">
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-mono text-[7px] sm:text-[8px] text-white/18 uppercase tracking-[0.2em]">Local Time</span>
              <LiveClock />
            </div>
            <div className="w-14 sm:w-20 h-px bg-white/8" />
            <MusicButton playing={musicPlaying} onToggle={onMusicToggle} />
          </div>
        </div>

        {/* Edge rules */}
        <div className="absolute top-0 inset-x-0 h-px bg-white/5" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/5" />
      </div>
    </>
  )
}
