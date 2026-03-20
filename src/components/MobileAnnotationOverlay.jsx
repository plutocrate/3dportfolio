import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { ANNOTATIONS } from '@/data/portfolio'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { cn } from '@/lib/utils'

const _v = new THREE.Vector3()

const BTN_W      = 80   // fixed width px — big enough to tap
const BTN_H      = 32   // fixed height px
const PAD_X      = 12   // min distance from left/right edge
const PAD_TOP    = 64   // below name bar
const PAD_BOTTOM = 90   // above uptime bar

function computePositions(camera, size) {
  return ANNOTATIONS.map((ann) => {
    _v.set(...ann.position).project(camera)

    if (_v.z > 1) return { id: ann.id, visible: false }

    const sx = ( _v.x *  0.5 + 0.5) * size.width
    const sy = (-_v.y *  0.5 + 0.5) * size.height

    // Place button to the side of the projected point, then clamp inward
    let bx = ann.side === 'right'
      ? sx + 4
      : sx - BTN_W - 4

    bx = Math.max(PAD_X, Math.min(size.width - BTN_W - PAD_X, bx))

    const by = Math.max(PAD_TOP, Math.min(size.height - PAD_BOTTOM - BTN_H, sy - BTN_H / 2))

    return { id: ann.id, label: ann.label, annotation: ann, bx, by, visible: true }
  })
}

export function MobileAnnotationOverlay({ onAnnotationClick }) {
  const activeSection = useSceneStore((s) => s.activeSection)
  const playClick     = useClickSound()
  const posRef        = useRef([])
  const rafRef        = useRef(null)
  const [, tick]      = useState(0)

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
              width: BTN_W,
              height: BTN_H,
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
                : '1px solid rgba(255,255,255,0.18)',
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
            <span style={{
              fontFamily: 'monospace',
              fontSize: 9,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: isActive ? '#000' : 'rgba(255,255,255,0.75)',
              fontWeight: isActive ? 700 : 400,
            }}>
              {p.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
