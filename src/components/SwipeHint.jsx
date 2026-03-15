import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

export function SwipeHint({ visible }) {
  const ref     = useRef()
  const handRef = useRef()
  const tl      = useRef(null)

  useEffect(() => {
    if (!visible || !ref.current) return

    tl.current = gsap.timeline({ delay: 0.5 })
    tl.current
      .fromTo(ref.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
      .fromTo(handRef.current, { x: 0 }, { x: 18, duration: 1.0, ease: 'power2.inOut' }, '+=0.1')
      .to(handRef.current, { x: -14, duration: 1.6, ease: 'power2.inOut' })
      .to(handRef.current, { x: 0,   duration: 1.0, ease: 'power2.out' })
      .to(ref.current, { opacity: 0, y: -4, duration: 0.45, ease: 'power2.in' }, '+=0.3')

    return () => { if (tl.current) { tl.current.kill(); tl.current = null } }
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={ref}
      className="fixed bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2"
      style={{ opacity: 0 }}
    >
      <div ref={handRef} className="flex items-center gap-1">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40">
          <path d="M9 2L4 7L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" className="opacity-70">
          <rect x="6" y="0" width="6" height="14" rx="3" fill="white" opacity="0.6"/>
          <rect x="0" y="6" width="6" height="10" rx="3" fill="white" opacity="0.45"/>
          <rect x="12" y="6" width="6" height="10" rx="3" fill="white" opacity="0.45"/>
          <rect x="3" y="12" width="12" height="8" rx="3" fill="white" opacity="0.55"/>
        </svg>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40">
          <path d="M5 2L10 7L5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.25em]">
        Drag to explore
      </span>
    </div>
  )
}
