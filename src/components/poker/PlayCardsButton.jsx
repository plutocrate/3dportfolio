import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { mountSwirl, createSwirlField } from '@/lib/balatroEngine'

// A quiet, permanent invitation back into the game once the player has met
// it once. Positioned by the same world->screen projection CharacterModel
// already computes every frame for the chest-height swirl aura (see
// characterAuraRef in App.jsx) — this button rides the same coordinate.
//
// Its swirl background runs on its OWN dedicated field, always active,
// independent of whatever the shared ambient-music swirl field is doing —
// the button should look like it's made of the same stuff as the game even
// when the site itself is currently quiet.
export const PlayCardsButton = forwardRef(function PlayCardsButton({ visible, onClick }, ref) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const fieldRef = useRef(null)

  useImperativeHandle(ref, () => ({
    setPosition(x, y) {
      if (!wrapRef.current) return
      wrapRef.current.style.transform = `translate(${x - 78}px, ${y - 18}px)`
    },
  }), [])

  useEffect(() => {
    if (!canvasRef.current) return
    if (!fieldRef.current) fieldRef.current = createSwirlField()
    fieldRef.current.setActive(true)
    const { destroy } = mountSwirl(canvasRef.current, fieldRef.current, {
      surface: true,
      intensity: 1.4,
      baseOpacity: 0.9,
    })
    return destroy
  }, [])

  return (
    <button
      ref={wrapRef}
      type="button"
      onClick={onClick}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className="fixed left-0 top-0 z-[40] isolate overflow-hidden rounded-full px-5 py-2 font-mono text-[11px] tracking-[0.25em] text-white/90 transition-opacity duration-500"
      style={{
        width: 156,
        border: '1px solid rgba(255,255,255,0.22)',
        background: 'rgba(10,6,16,0.35)',
        backdropFilter: 'blur(3px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: 'translate(-9999px,-9999px)', // until setPosition() runs
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" style={{ width: '100%', height: '100%', mixBlendMode: 'screen', pointerEvents: 'none' }} aria-hidden />
      <span className="relative z-10">PLAY CARDS</span>
    </button>
  )
})
