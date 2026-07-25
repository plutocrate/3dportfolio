import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PERSONAL } from '@/data/portfolio'

export function LoadingScreen({ onComplete }) {
  const overlayRef = useRef()
  const btnRef     = useRef()
  const lineRef    = useRef()
  const hintRef    = useRef()
  const nameRef    = useRef()

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
    tl.fromTo(btnRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    )
    tl.fromTo(hintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' },
      '-=0.05'
    )
  }, [])

  const handleEnter = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.45, ease: 'power2.inOut', onComplete,
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
        <div className="font-mono text-[clamp(9px,calc(8.6px+0.13vw),11px)] sm:text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/30 uppercase tracking-[0.35em]">
          {PERSONAL.tagline}
        </div>
      </div>

      {/* Divider + button + hint */}
      <div className="flex flex-col items-center gap-4">
        <div
          ref={lineRef}
          style={{ scaleX: 0, transformOrigin: 'left' }}
          className="w-32 sm:w-48 h-px bg-white/20"
        />

        <button
          ref={btnRef}
          onClick={handleEnter}
          style={{ opacity: 0 }}
          className="flow-glow group relative font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] sm:text-[clamp(12px,calc(11.4px+0.2vw),14px)] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-300 px-7 sm:px-9 py-3 border border-white/18 hover:border-white/50"
        >
          <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
          <span className="relative">[ ENTER ]</span>
        </button>

        <div
          ref={hintRef}
          style={{ opacity: 0 }}
          className="font-mono text-[clamp(7px,calc(6.8px+0.1vw),8px)] sm:text-[clamp(9px,calc(8.6px+0.13vw),11px)] text-white/20 uppercase tracking-[0.25em]"
        >
          🎧 Headphones recommended
        </div>
      </div>
    </div>
  )
}
