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
    <span className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] text-white/50 tabular-nums tracking-widest">
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
    <span className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] text-white/50 tabular-nums tracking-widest">
      {p(Math.floor(s / 3600))}:{p(Math.floor((s % 3600) / 60))}:{p(s % 60)}
    </span>
  )
}

function MusicBars({ playing }) {
  return (
    <div className="flex items-end gap-[2px] h-3 shrink-0">
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
  )
}

// ── Compact "now playing" music player — sits where the old AMB button was ──
// Order: AMB toggle → track name → change-track button. The AMB pill and the
// change-track pill are the same height/padding so both are equally easy to
// tap on phone (the old "»" text link was a tiny, hard-to-hit target).
function MusicPlayer({ playing, onToggle, onNext, trackName, hasMultipleTracks }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 px-2.5 py-1.5 border border-white/12 hover:border-white/35 active:border-white/50 transition-all duration-200 group"
        aria-label={playing ? 'Mute' : 'Unmute'}
      >
        <MusicBars playing={playing} />
        <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] uppercase tracking-[0.18em] text-white/40 group-hover:text-white/70 transition-colors">
          {playing ? 'AMB' : 'OFF'}
        </span>
      </button>

      {/* Now-playing track name */}
      <span
        className="font-mono text-[clamp(8px,calc(7.7px+0.1vw),9px)] text-white/22 uppercase tracking-[0.12em] max-w-[90px] sm:max-w-[110px] truncate transition-colors"
        title={trackName}
      >
        {trackName}
      </span>

      {/* Skip to another random track — same size/touch-target as the AMB pill */}
      {hasMultipleTracks && (
        <button
          onClick={onNext}
          aria-label="Next track"
          title="Next track"
          className="flex items-center gap-1 px-2.5 py-1.5 border border-white/12 hover:border-white/35 active:border-white/50 transition-all duration-200 group"
        >
          <span className="font-mono text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/40 group-hover:text-white/80 transition-colors leading-none">
            ⏭
          </span>
          <span className="font-mono text-[clamp(9px,calc(8.6px+0.13vw),11px)] uppercase tracking-[0.14em] text-white/40 group-hover:text-white/80 transition-colors hidden sm:inline">
            Next
          </span>
        </button>
      )}
    </div>
  )
}

export function HUDOverlay({ visible, musicPlaying, onMusicToggle, onMusicNext, trackName, hasMultipleTracks }) {
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
        <div className="absolute inset-x-0 flex items-start justify-between px-4 sm:px-8 pt-4 sm:pt-6" style={{ top: 28 }}>
          {/* Left: name + tagline */}
          <div className="flex flex-col gap-0.5">
            <div className="font-display text-[clamp(18px,calc(16.6px+0.5vw),22px)] sm:text-[clamp(22px,calc(20.2px+0.6vw),27px)] md:text-[clamp(25px,calc(23px+0.7vw),31px)] text-white leading-none tracking-widest">
              {PERSONAL.name.toUpperCase()}
            </div>
            <div className="font-mono text-[clamp(8px,calc(7.5px+0.16vw),10px)] sm:text-[clamp(9px,calc(8.6px+0.16vw),11px)] text-white/30 uppercase tracking-[0.22em]">
              {PERSONAL.tagline}
            </div>
          </div>

          {/* Right: status dot */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/35 animate-pulse" />
            <span className="font-mono text-[clamp(9px,calc(8.6px+0.13vw),11px)] text-white/22 uppercase tracking-wider hidden sm:block">
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
              {ANNOTATIONS.map((ann, i) => {
                const isGlowing = ann.id === 'blog' || ann.id === 'chronicles'
                const isActive = activeSection === ann.id
                return (
                  <button
                    key={ann.id}
                    onClick={() => {
                      playClick()
                      activeSection === ann.id ? closeSection() : setActiveSection(ann.id)
                    }}
                    className={cn(
                      'hud-float flex items-center gap-2 group text-left',
                      isGlowing && !isActive && 'awwwards-nav-highlight'
                    )}
                    style={{ '--float-delay': `${i * 0.35}s` }}
                  >
                    <div className={cn(
                      'nav-dot w-1.5 h-1.5 rounded-full transition-all duration-200 shrink-0',
                      isActive ? 'bg-white' : 'bg-white/18 group-hover:bg-white/55'
                    )} />
                    <span className={cn(
                      'nav-label font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] uppercase tracking-[0.16em] transition-colors',
                      isActive ? 'text-white' : 'text-white/30 group-hover:text-white/65'
                    )}>
                      {ann.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Mobile dot nav */}
            <div className="flex sm:hidden items-center gap-2 pointer-events-auto">
              {ANNOTATIONS.map((ann, i) => {
                const isGlowing = ann.id === 'blog' || ann.id === 'chronicles'
                const isActive = activeSection === ann.id
                return (
                  <button
                    key={ann.id}
                    onClick={() => {
                      playClick()
                      isActive ? closeSection() : setActiveSection(ann.id)
                    }}
                    className={cn(
                      'hud-float w-2 h-2 rounded-full transition-all duration-200',
                      isActive ? 'bg-white scale-125' : 'bg-white/22',
                      isGlowing && !isActive && 'mobile-nav-glow'
                    )}
                    style={{ '--float-delay': `${i * 0.35}s` }}
                    title={ann.label}
                  />
                )
              })}
            </div>

            {/* Divider */}
            <div className="w-14 h-px bg-white/8 my-2" />

            {/* Uptime — same left edge as nav items */}
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[clamp(7px,calc(6.8px+0.1vw),8px)] sm:text-[clamp(9px,calc(8.6px+0.13vw),11px)] text-white/18 uppercase tracking-[0.2em]">Uptime</span>
              <Uptime />
            </div>
          </div>

          {/* Center hint — desktop only */}
          <div className="hidden md:block absolute left-1/2 bottom-4 sm:bottom-6 -translate-x-1/2">
            <span className="font-mono text-[clamp(9px,calc(8.6px+0.13vw),11px)] text-white/13 uppercase tracking-[0.2em]">
              Drag · Pinch · Click
            </span>
          </div>

          {/* Right: local time + music */}
          <div className="flex flex-col items-end gap-2 pointer-events-auto">
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-mono text-[clamp(7px,calc(6.8px+0.1vw),8px)] sm:text-[clamp(9px,calc(8.6px+0.13vw),11px)] text-white/18 uppercase tracking-[0.2em]">Local Time</span>
              <LiveClock />
            </div>
            <div className="w-14 sm:w-20 h-px bg-white/8" />
            <div className="hud-float" style={{ '--float-delay': '0.7s' }}>
              <MusicPlayer
                playing={musicPlaying}
                onToggle={onMusicToggle}
                onNext={onMusicNext}
                trackName={trackName}
                hasMultipleTracks={hasMultipleTracks}
              />
            </div>
          </div>
        </div>

        {/* Edge rules */}
        <div className="absolute top-0 inset-x-0 h-px bg-white/5" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/5" />
      </div>
    </>
  )
}
