import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Full-screen noir intro shown once — click to enter and start ambient music
export function ExploreOverlay({ onEnter }) {
  const overlayRef = useRef()
  const btnRef     = useRef()
  const lineRef    = useRef()

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
    tl.fromTo(lineRef.current,   { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.out', transformOrigin:'left' }, 0.4)
    tl.fromTo(btnRef.current,    { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.0)
  }, [])

  const handleEnter = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.7, ease: 'power2.in',
      onComplete: onEnter,
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#060606]"
      style={{ opacity: 0 }}
    >
      {/* Noise grain */}
      <div className="noise-overlay" />

      <div className="flex flex-col items-center gap-8 px-6 text-center">
        {/* Name */}
        <div className="flex flex-col items-center gap-2">
          <div className="font-mono text-[clamp(9px,calc(8.6px+0.13vw),11px)] sm:text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/25 uppercase tracking-[0.4em]">
            Portfolio
          </div>
          <div className="font-display text-[clamp(28px,calc(25.6px+0.85vw),35px)] sm:text-[clamp(34px,calc(31.2px+0.9vw),42px)] text-white leading-none tracking-widest">
            MANAS_PUROHIT
          </div>
          <div className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] sm:text-[clamp(11px,calc(10.4px+0.2vw),13px)] text-white/35 uppercase tracking-[0.28em]">
            Software Engineer · GenAI · LLMs
          </div>
        </div>

        {/* Decorative line */}
        <div
          ref={lineRef}
          className="w-32 sm:w-48 h-px bg-white/20"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Enter button */}
        <button
          ref={btnRef}
          onClick={handleEnter}
          className="flow-glow group relative font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] sm:text-[clamp(12px,calc(11.4px+0.2vw),14px)] uppercase tracking-[0.35em] text-white/60 hover:text-white transition-colors duration-300 px-8 py-3 border border-white/15 hover:border-white/50"
          style={{ opacity: 0 }}
        >
          {/* Hover fill */}
          <span className="absolute inset-0 bg-white/0 group-hover:bg-white/4 transition-colors duration-300" />
          <span className="relative">[ EXPLORE ]</span>
        </button>

        <div className="font-mono text-[clamp(8px,calc(7.7px+0.1vw),9px)] sm:text-[clamp(9px,calc(8.6px+0.13vw),11px)] text-white/18 uppercase tracking-[0.25em]">
          Click to enter · Sound recommended
        </div>
      </div>
    </div>
  )
}
