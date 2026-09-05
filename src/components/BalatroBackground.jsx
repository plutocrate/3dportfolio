import { useEffect, useRef } from 'react'
import { mountSwirl } from '@/lib/balatroEngine'
import { getSwirlField } from '@/hooks/useSwirlField'

// Mount once, near the root (in AppShell, as a sibling to <MainScene>).
// `active` toggles on/off with a smooth ~0.9s fade — driven by whatever
// track is currently playing (see isSwirlTrack in useAmbientMusic).
export function BalatroBackground({ active }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const { destroy } = mountSwirl(canvasRef.current, getSwirlField(), {
      surface: false,
    })
    return destroy
  }, [])

  useEffect(() => {
    getSwirlField().setActive(Boolean(active))
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,           // sits above SceneEnvironment's backdrop, below the 3D canvas content if you want it further back adjust in MainScene's own stacking
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  )
}
