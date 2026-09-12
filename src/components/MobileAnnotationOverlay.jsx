import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { ANNOTATIONS } from '@/data/portfolio'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { cn } from '@/lib/utils'

const _v = new THREE.Vector3()

// Base size these annotation buttons render at before SIZE_SCALE below.
// (Went too far small last pass — this settles back near the original
// footprint but keeps the text a touch smaller than the box, below, so
// there's visibly more breathing room/padding around the label instead of
// text-to-edge cramping.)
const BASE_BTN_W = 104
const BASE_BTN_H = 42
const SIZE_SCALE = 1.0
// Font scales separately, and a bit below SIZE_SCALE — bigger box, but not
// a proportionally bigger label, is exactly what reads as "more padding".
const FONT_SCALE = 0.92

const PAD_X = 12   // min distance from left/right edge
const PAD_TOP = 64   // below name bar
const PAD_BOTTOM = 90   // above uptime bar

const clampNum = (min, val, max) => Math.max(min, Math.min(max, val))

// Dynamic, not fixed: the button scales with the actual viewport width
// (bounded to a sane range so it doesn't balloon on a tablet or shrink to
// nothing on a tiny phone), then the whole result gets the SIZE_SCALE
// applied. Height follows the same aspect ratio as the base size.
function dynamicButtonSize(viewportWidth) {
  const w = Math.round(
    clampNum(BASE_BTN_W * 0.85, viewportWidth * 0.25, BASE_BTN_W * 1.25) * SIZE_SCALE
  )
  const h = Math.round(w * (BASE_BTN_H / BASE_BTN_W))
  return { w, h }
}

function computePositions(camera, size) {
  const { w: BTN_W, h: BTN_H } = dynamicButtonSize(size.width)
  return ANNOTATIONS.map((ann) => {
    _v.set(...ann.position).project(camera)

    if (_v.z > 1) return { id: ann.id, visible: false }

    const sx = (_v.x * 0.5 + 0.5) * size.width
    const sy = (-_v.y * 0.5 + 0.5) * size.height

    // Place button to the side of the projected point, then clamp inward
    let bx = ann.side === 'right'
      ? sx + 4
      : sx - BTN_W - 4

    bx = Math.max(PAD_X, Math.min(size.width - BTN_W - PAD_X, bx))

    const by = Math.max(PAD_TOP, Math.min(size.height - PAD_BOTTOM - BTN_H, sy - BTN_H / 2))

    return { id: ann.id, label: ann.label, annotation: ann, bx, by, btnW: BTN_W, btnH: BTN_H, visible: true }
  })
}

export function MobileAnnotationOverlay({ onAnnotationClick }) {
  const activeSection = useSceneStore((s) => s.activeSection)
  const playClick = useClickSound()
  const posRef = useRef([])
  const rafRef = useRef(null)
  const [, tick] = useState(0)

  useEffect(() => {
    function loop() {
      const cs = useSceneStore.getState().cameraState
      if (cs) {
        posRef.current = computePositions(cs.camera, cs.size)
        tick((n) => n + 1)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {posRef.current.map((p) => {
        if (!p.visible) return null
        const isActive = activeSection === p.id
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.bx,
              top: p.by,
              width: p.btnW,
              height: p.btnH,
              overflow: 'hidden',
              pointerEvents: 'auto',
              willChange: 'left, top',
              // Glassmorphism
              background: isActive
                ? 'rgba(255,255,255,0.92)'
                : 'rgba(10,10,10,0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: isActive
                ? '1px solid rgba(255,255,255,1)'
                : '1px solid rgba(255,255,255,0.32)',
              boxShadow: isActive
                ? '0 0 12px rgba(255,255,255,0.25)'
                : '0 2px 12px rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              borderRadius: 2,
            }}
            onClick={() => { playClick(); onAnnotationClick(p.annotation) }}
          >
            {/* No SwirlSurface here — every one of these buttons mounting
                its own WebGL context (up to 6 at once) was almost
                certainly what pushed phones over their WebGL context
                budget, and the game's actual background swirl was paying
                for it. Not worth it for a minor button flourish. */}
            <span style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: 'monospace',
              fontSize: Math.round(11.5 * FONT_SCALE * 10) / 10,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: isActive ? '#000' : 'rgba(255,255,255,0.92)',
              fontWeight: isActive ? 700 : 500,
            }}>
              {p.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
