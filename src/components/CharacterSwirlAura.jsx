import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { mountSwirl } from '@/lib/balatroEngine'
import { getSwirlField } from '@/hooks/useSwirlField'

// Rendered as a plain DOM sibling of your <Canvas> (NOT inside it — it's a
// regular <div>, R3F's reconciler can't render this itself). Exposes an
// imperative `setPosition(x, y)` so whatever tracks the character's screen
// position every frame (see the useFrame snippet in CharacterModel.patch.md)
// can move it without triggering a React re-render 60x/sec.
//
//   const auraRef = useRef(null)
//   <MainScene auraRef={auraRef} ... />        // inside <Canvas>, calls
//                                               // auraRef.current?.setPosition(x, y)
//   <CharacterSwirlAura ref={auraRef} active={isSwirlTrack} />   // sibling
//
export const CharacterSwirlAura = forwardRef(function CharacterSwirlAura(
  { active, size = 260 },
  ref
) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const height = size * 1.35

  useImperativeHandle(ref, () => ({
    setPosition(x, y) {
      if (!wrapRef.current) return
      // Anchor roughly at chest height, aura extends up/down from there
      wrapRef.current.style.transform =
        `translate(${x - size / 2}px, ${y - height * 0.45}px)`
    },
  }), [size, height])

  useEffect(() => {
    if (!canvasRef.current) return
    const { destroy } = mountSwirl(canvasRef.current, getSwirlField(), {
      surface: true,
      intensity: 1.1,
      baseOpacity: 0.55,
    })
    return destroy
  }, [])

  useEffect(() => {
    getSwirlField().setActive(Boolean(active))
  }, [active])

  // A radial gradient MASK (not just blur+border-radius) is what actually
  // gives this a soft glow falloff — without it the canvas is a uniformly
  // bright rectangle/ellipse that reads as a solid block sitting on top of
  // the character instead of an aura around them.
  const maskImage = 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, black 35%, transparent 72%)'

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height,
        pointerEvents: 'none',
        overflow: 'hidden',
        filter: 'blur(14px)',
        mixBlendMode: 'screen',
        WebkitMaskImage: maskImage,
        maskImage,
        opacity: active ? 1 : 0,
        transition: 'opacity 0.6s ease',
        zIndex: 5,
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
})
