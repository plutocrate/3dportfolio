import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Headphones, VolumeX, Volume2 } from 'lucide-react'
import { PERSONAL } from '@/data/portfolio'
import { useClickSound } from '@/hooks/useClickSound'

// ── Enter screen ─────────────────────────────────────────────────────────────
// Before dropping into the 3D scene, this asks whether the visitor is already
// listening to their own music. The site has its own ambient soundtrack, so:
//   • "Keep my music"  → enters silently (site music stays off, though it can
//                         still be turned on later from the HUD's toggle)
//   • "Play site music" → enters with the ambient track autoplaying
// onComplete(withMusic: boolean) is called once the exit animation finishes.
export function LoadingScreen({ onComplete }) {
  const overlayRef = useRef()
  const nameRef    = useRef()
  const lineRef    = useRef()
  const panelRef   = useRef()
  const playClick  = useClickSound()

  // Animate everything in immediately on mount
  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
    )
    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power3.out', transformOrigin: 'left' },
      '-=0.1'
    )
    tl.fromTo(panelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
      '-=0.1'
    )
  }, [])

  const handleChoice = (withMusic) => {
    playClick()
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.45, ease: 'power2.inOut',
      onComplete: () => onComplete(withMusic),
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center px-6"
    >
      <div className="noise-overlay" />

      {/* Name + title */}
      <div ref={nameRef} className="mb-10 text-center" style={{ opacity: 0 }}>
        <div className="font-display text-[clamp(28px,calc(25.6px+0.85vw),35px)] sm:text-[clamp(34px,calc(31.2px+0.9vw),42px)] md:text-[clamp(38px,calc(35px+1vw),48px)] text-white tracking-widest leading-none mb-2">
          {PERSONAL.name.toUpperCase()}
        </div>
        <div className="font-mono text-[clamp(9px,calc(8.6px+0.13vw),11px)] sm:text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-ember/75 uppercase tracking-[0.35em]">
          {PERSONAL.tagline}
        </div>
      </div>

      <div
        ref={lineRef}
        style={{ scaleX: 0, transformOrigin: 'left' }}
        className="w-32 sm:w-48 h-px bg-white/20 mb-8"
      />

      {/* Music-preference panel — its own clearly-visible surface */}
      <div
        ref={panelRef}
        style={{ opacity: 0, background: 'rgba(255,255,255,0.035)' }}
        className="w-full max-w-md border border-white/10 px-6 py-7 sm:px-8 sm:py-8"
      >
        <div className="flex flex-col items-center text-center mb-7">
          <Headphones size={20} className="text-white/64 mb-3" />
          <div className="font-mono text-[clamp(9px,calc(8.6px+0.13vw),11px)] sm:text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/67 uppercase tracking-[0.22em] mb-2">
            This site plays ambient music
          </div>
          <p className="font-body text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/73 leading-relaxed">
            Are you already listening to your own music?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          {/* Keep my music — red / off */}
          <button
            onClick={() => handleChoice(false)}
            className="group flex-1 basis-0 min-w-0 min-h-[151px] sm:min-h-[116px] flex flex-col items-center justify-center gap-2.5 sm:gap-2 px-[26px] sm:px-5 py-5 sm:py-4 text-center border border-red-500/25 bg-red-500/[0.04] hover:bg-red-500/[0.09] hover:border-red-500/45 transition-all duration-200"
          >
            <VolumeX className="w-[23px] h-[23px] sm:w-[18px] sm:h-[18px] text-red-400/70 group-hover:text-red-300 transition-colors shrink-0" />
            <span className="font-mono text-[clamp(13px,calc(12.5px+0.21vw),15.6px)] sm:text-[clamp(10px,calc(9.6px+0.16vw),12px)] uppercase tracking-[0.15em] text-red-200/80 group-hover:text-red-100 transition-colors">
              Keep My Music
            </span>
            <span className="font-mono text-[clamp(10.4px,calc(10px+0.09vw),11.7px)] sm:text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.16em] text-white/70 group-hover:text-white/80 transition-colors">
              Enter without site music
            </span>
          </button>

          {/* Play site music — green / on */}
          <button
            onClick={() => handleChoice(true)}
            className="group flex-1 basis-0 min-w-0 min-h-[151px] sm:min-h-[116px] flex flex-col items-center justify-center gap-2.5 sm:gap-2 px-[26px] sm:px-5 py-5 sm:py-4 text-center border border-emerald-500/25 bg-emerald-500/[0.04] hover:bg-emerald-500/[0.09] hover:border-emerald-500/45 transition-all duration-200"
          >
            <Volume2 className="w-[23px] h-[23px] sm:w-[18px] sm:h-[18px] text-emerald-400/70 group-hover:text-emerald-300 transition-colors shrink-0" />
            <span className="font-mono text-[clamp(13px,calc(12.5px+0.21vw),15.6px)] sm:text-[clamp(10px,calc(9.6px+0.16vw),12px)] uppercase tracking-[0.15em] text-emerald-200/80 group-hover:text-emerald-100 transition-colors">
              Play Site Music
            </span>
            <span className="font-mono text-[clamp(10.4px,calc(10px+0.09vw),11.7px)] sm:text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.16em] text-white/70 group-hover:text-white/80 transition-colors">
              Enter with ambient music
            </span>
          </button>
        </div>

        <div className="mt-6 font-mono text-[clamp(7px,calc(6.8px+0.1vw),8px)] sm:text-[clamp(9px,calc(8.6px+0.13vw),11px)] text-white/52 uppercase tracking-[0.2em] text-center">
          You can always toggle music later from the player
        </div>
      </div>
    </div>
  )
}
