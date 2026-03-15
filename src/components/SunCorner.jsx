import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// ── A sun glow that bleeds in from the top-left corner of the screen ──────────
// Pure CSS — guaranteed to sit exactly at the corner regardless of 3D camera.
// Uses a radial gradient fading from warm white-gold at the corner to transparent.
export function SunCorner({ visible }) {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current || !visible) return
    // Slow breathe — simulates atmospheric scattering / cloud movement
    gsap.to(ref.current, {
      opacity: 0.82,
      duration: 1.6,
      ease: 'power2.out',
      delay: 1.0,
    })
    // Subtle pulse loop after intro
    gsap.to(ref.current, {
      opacity: 0.72,
      duration: 4.0,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.8,
    })
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-10"
      style={{
        opacity: 0,
        width: '420px',
        height: '420px',
        // Radial gradient: bright warm core at corner → transparent
        background: `radial-gradient(
          ellipse at 0% 0%,
          rgba(255, 240, 180, 0.22) 0%,
          rgba(255, 220, 120, 0.14) 22%,
          rgba(255, 200,  80, 0.07) 44%,
          rgba(255, 180,  40, 0.03) 62%,
          transparent 78%
        )`,
      }}
    />
  )
}
