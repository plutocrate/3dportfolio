import { useEffect, useRef } from 'react'
import { mountSwirl } from '@/lib/balatroEngine'
import { getSwirlField } from '@/hooks/useSwirlField'

// Drop this as the FIRST child inside any button/element that has
// `position: relative` (or `isolate`) and `overflow: hidden`. Put your
// label/icon in a sibling with `position: relative; z-index: 1` so it
// stays readable on top.
//
//   <button className="relative overflow-hidden isolate ...">
//     <SwirlSurface />
//     <span className="relative z-10">Play</span>
//   </button>
//
// It renders nothing (opacity 0, no pointer events) unless the swirl is
// currently active — same shared field as the background, so it lines up.
export function SwirlSurface({ intensity = 1.3, baseOpacity = 0.85, className, style }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const { destroy } = mountSwirl(canvasRef.current, getSwirlField(), {
      surface: true,
      intensity,
      baseOpacity,
    })
    return destroy
  }, [intensity, baseOpacity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        borderRadius: 'inherit',
        ...style,
      }}
    />
  )
}
