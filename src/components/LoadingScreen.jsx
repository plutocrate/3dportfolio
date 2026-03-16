import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { PERSONAL } from '@/data/portfolio'

const BOOT_LINES = [
  '> Initializing render engine...',
  '> Loading asset: NikitaMesh_A_Pose.gltf',
  '> Applying toon shader pipeline...',
  '> Compiling scene graph...',
  '> Mounting annotation system...',
  '> Ready.',
]

export function LoadingScreen({ onComplete }) {
  const [lines,    setLines]    = useState([])
  const [bootDone, setBootDone] = useState(false)
  const overlayRef = useRef()
  const btnRef     = useRef()
  const lineRef    = useRef()
  const hintRef    = useRef()

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setLines((prev) => [...prev, BOOT_LINES[i]])
      i++
      if (i >= BOOT_LINES.length) {
        clearInterval(interval)
        setTimeout(() => setBootDone(true), 400)
      }
    }, 260)
    return () => clearInterval(interval)
  }, [])

  // Animate button in as soon as bootDone flips true
  useEffect(() => {
    if (!bootDone) return
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 0.9, ease: 'power3.out', transformOrigin: 'left' }
      )
    }
    if (btnRef.current) {
      gsap.fromTo(btnRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.35 }
      )
    }
    if (hintRef.current) {
      gsap.fromTo(hintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.7 }
      )
    }
  }, [bootDone])

  const handleEnter = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.65, ease: 'power2.inOut', onComplete,
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center px-6"
    >
      <div className="noise-overlay" />

      {/* Name */}
      <div className="mb-8 text-center">
        <div className="font-display text-[36px] sm:text-[52px] md:text-[64px] text-white tracking-widest leading-none mb-2">
          {PERSONAL.name.toUpperCase()}
        </div>
        <div className="font-mono text-[9px] sm:text-[11px] text-white/30 uppercase tracking-[0.35em]">
          {PERSONAL.title}
        </div>
      </div>

      {/* Boot log */}
      <div className="font-mono text-[9px] sm:text-[11px] text-white/40 space-y-1 w-full max-w-xs sm:max-w-sm min-h-[120px]">
        {lines.map((line, i) => (
          <div key={i} className={i === lines.length - 1 && !bootDone ? 'text-white/70' : 'text-white/25'}>
            {line}
            {i === lines.length - 1 && !bootDone && <span className="animate-blink ml-0.5">_</span>}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full max-w-xs sm:max-w-sm h-px bg-white/10 overflow-hidden">
        <div
          className="h-full bg-white/40 transition-all duration-300"
          style={{ width: `${(lines.length / BOOT_LINES.length) * 100}%` }}
        />
      </div>

      {/* Always rendered — GSAP animates opacity in */}
      <div className="flex flex-col items-center gap-4 mt-10">
        <div
          ref={lineRef}
          style={{ transform: 'scaleX(0)', transformOrigin: 'left', opacity: 0 }}
          className="w-32 sm:w-48 h-px bg-white/20"
        />

        <button
          ref={btnRef}
          onClick={handleEnter}
          disabled={!bootDone}
          style={{ opacity: 0 }}
          className="group relative font-mono text-[11px] sm:text-[13px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-300 px-7 sm:px-9 py-3 border border-white/18 hover:border-white/50 disabled:pointer-events-none"
        >
          <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
          <span className="relative">[ ENTER ]</span>
        </button>

        <div
          ref={hintRef}
          style={{ opacity: 0 }}
          className="font-mono text-[7px] sm:text-[8px] text-white/20 uppercase tracking-[0.25em]"
        >
          🎧Headphones recommended
        </div>
      </div>
    </div>
  )
}
