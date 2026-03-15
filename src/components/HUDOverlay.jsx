import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '@/hooks/useSceneStore'
import { ANNOTATIONS, PERSONAL } from '@/data/portfolio'
import { useClickSound } from '@/hooks/useClickSound'
import { cn } from '@/lib/utils'

function LiveClock() {
  const [t, setT] = useState(new Date())
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id) }, [])
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <span className="font-mono text-[10px] sm:text-[11px] text-white/50 tabular-nums tracking-widest">
      {pad(t.getHours())}:{pad(t.getMinutes())}:{pad(t.getSeconds())}
    </span>
  )
}

function Uptime() {
  const [s, setS] = useState(0)
  useEffect(() => { const id = setInterval(() => setS(x => x+1), 1000); return () => clearInterval(id) }, [])
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <span className="font-mono text-[10px] sm:text-[11px] text-white/50 tabular-nums tracking-widest">
      {pad(Math.floor(s/3600))}:{pad(Math.floor((s%3600)/60))}:{pad(s%60)}
    </span>
  )
}

// Minimal noir music toggle button
function MusicButton({ playing, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 group transition-all duration-200"
      aria-label={playing ? 'Mute music' : 'Unmute music'}
    >
      {/* Animated bars when playing */}
      <div className="flex items-end gap-[2px] h-3">
        {[0,1,2].map((i) => (
          <div
            key={i}
            className={cn(
              'w-[2px] bg-white/40 group-hover:bg-white/70 transition-all duration-200 rounded-sm',
              playing ? 'animate-music-bar' : 'h-[3px] opacity-30'
            )}
            style={playing ? {
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${0.6 + i * 0.1}s`,
            } : { height: '3px' }}
          />
        ))}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 group-hover:text-white/65 transition-colors">
        {playing ? 'AMB' : 'OFF'}
      </span>
    </button>
  )
}

export function HUDOverlay({ visible, musicPlaying, onMusicToggle }) {
  const hudRef        = useRef()
  const activeSection = useSceneStore((s) => s.activeSection)
  const setActiveSection = useSceneStore((s) => s.setActiveSection)
  const closeSection  = useSceneStore((s) => s.closeSection)
  const playClick     = useClickSound()

  useEffect(() => {
    if (!hudRef.current || !visible) return
    gsap.fromTo(hudRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.4 }
    )
  }, [visible])

  if (!visible) return null

  return (
    <div ref={hudRef} className="fixed inset-0 pointer-events-none z-40" style={{ opacity: 0 }}>

      {/* ── Top-left: Wordmark ── */}
      <div className="absolute top-4 sm:top-7 left-4 sm:left-8 flex flex-col gap-0.5 sm:gap-1">
        <div className="font-display text-[22px] sm:text-[30px] md:text-[36px] text-white leading-none tracking-widest">
          {PERSONAL.name.toUpperCase().replace(' ', '_')}
        </div>
        <div className="font-mono text-[8px] sm:text-[10px] md:text-[11px] text-white/35 uppercase tracking-[0.22em] sm:tracking-[0.28em]">
          {PERSONAL.tagline}
        </div>
      </div>

      {/* ── Top-right: Status ── */}
      <div className="absolute top-4 sm:top-7 right-4 sm:right-8 flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
          <span className="font-mono text-[8px] sm:text-[10px] text-white/28 uppercase tracking-wider hidden sm:block">
            {activeSection ? `— ${activeSection}` : 'Interactive Mode'}
          </span>
        </div>
      </div>

      {/* ── Bottom-left: Nav + Uptime ── */}
      <div className="absolute bottom-4 sm:bottom-7 left-4 sm:left-8 flex flex-col gap-0 pointer-events-auto">
        {/* Section nav — hidden on very small screens, show on sm+ */}
        <div className="hidden sm:flex flex-col gap-2 mb-4">
          {ANNOTATIONS.map((ann) => (
            <button
              key={ann.id}
              onClick={() => { playClick(); activeSection === ann.id ? closeSection() : setActiveSection(ann.id) }}
              className="flex items-center gap-2.5 sm:gap-3 group transition-all duration-200 text-left"
            >
              <div className={cn(
                'w-1.5 h-1.5 rounded-full transition-all duration-200',
                activeSection === ann.id ? 'bg-white scale-150' : 'bg-white/20 group-hover:bg-white/60'
              )} />
              <span className={cn(
                'font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-colors duration-200',
                activeSection === ann.id ? 'text-white' : 'text-white/35 group-hover:text-white/75'
              )}>
                {ann.label}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile: compact dot nav */}
        <div className="flex sm:hidden items-center gap-2 mb-3 pointer-events-auto">
          {ANNOTATIONS.map((ann) => (
            <button
              key={ann.id}
              onClick={() => { playClick(); activeSection === ann.id ? closeSection() : setActiveSection(ann.id) }}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                activeSection === ann.id ? 'bg-white scale-150' : 'bg-white/25 active:bg-white/70'
              )}
              title={ann.label}
            />
          ))}
        </div>

        <div className="w-16 sm:w-24 h-px bg-white/10 mb-2 sm:mb-3" />
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.22em]">Uptime</span>
          <Uptime />
        </div>
      </div>

      {/* ── Bottom-center: Hint (desktop only) ── */}
      <div className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 hidden md:block">
        <span className="font-mono text-[8px] sm:text-[9px] text-white/15 uppercase tracking-[0.22em]">
          Drag to orbit · Click markers to explore
        </span>
      </div>

      {/* ── Bottom-right: Local Time + Music ── */}
      <div className="absolute bottom-4 sm:bottom-7 right-4 sm:right-8 flex flex-col items-end gap-2 sm:gap-3 pointer-events-auto">
        <div className="flex flex-col items-end gap-0.5">
          <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.22em]">Local Time</span>
          <LiveClock />
        </div>
        <div className="w-16 sm:w-24 h-px bg-white/10" />
        <MusicButton playing={musicPlaying} onToggle={onMusicToggle} />
      </div>

      {/* Edge rules */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/5" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/5" />
    </div>
  )
}
