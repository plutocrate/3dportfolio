import { useEffect, useRef } from 'react'

export function SwipeHint({ visible }) {
  const ref = useRef()

  useEffect(() => {
    if (!visible || !ref.current) return

    // Show immediately, hide after 2s — pure CSS, no GSAP
    ref.current.style.opacity = '1'

    const hideTimer = setTimeout(() => {
      if (ref.current) ref.current.style.opacity = '0'
    }, 2000)

    const dismiss = () => {
      clearTimeout(hideTimer)
      if (ref.current) ref.current.style.opacity = '0'
    }

    document.addEventListener('pointerdown', dismiss, { capture: true, once: true, passive: true })
    document.addEventListener('touchstart',  dismiss, { capture: true, once: true, passive: true })

    return () => {
      clearTimeout(hideTimer)
      document.removeEventListener('pointerdown', dismiss, { capture: true })
      document.removeEventListener('touchstart',  dismiss, { capture: true })
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={ref}
      className="fixed bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2"
      style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
    >
      <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.25em]">
        Drag to explore
      </span>
    </div>
  )
}
