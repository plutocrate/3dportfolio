import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { ANNOTATIONS } from '@/data/portfolio'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { cn } from '@/lib/utils'

const _v = new THREE.Vector3()

function computePositions(camera, size) {
  const BTN_H       = 22
  const PAD         = 8
  const TOP_SAFE    = 60
  const BOTTOM_SAFE = size.height - 80

  return ANNOTATIONS.map((ann) => {
    _v.set(...ann.position).project(camera)

    if (_v.z > 1) return { id: ann.id, visible: false }

    const sx = ( _v.x *  0.5 + 0.5) * size.width
    const sy = (-_v.y *  0.5 + 0.5) * size.height

    const BTN_W = ann.label.length * 6.5 + 18
    let bx = ann.side === 'right' ? sx + 6 : sx - BTN_W - 6
    bx = Math.max(PAD, Math.min(size.width - BTN_W - PAD, bx))
    const by = Math.max(TOP_SAFE, Math.min(BOTTOM_SAFE - BTN_H, sy - BTN_H / 2))

    return { id: ann.id, label: ann.label, annotation: ann, bx, by, visible: true }
  })
}

export function MobileAnnotationOverlay({ onAnnotationClick }) {
  const cameraState   = useSceneStore((s) => s.cameraState)
  const activeSection = useSceneStore((s) => s.activeSection)
  const playClick     = useClickSound()

  // Use a ref for positions and force re-render via counter
  const posRef   = useRef([])
  const rafRef   = useRef(null)
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
              pointerEvents: 'auto',
              whiteSpace: 'nowrap',
              willChange: 'left, top',
            }}
            className={cn(
              'font-mono uppercase border cursor-pointer transition-colors duration-150',
              'px-1.5 py-0.5 text-[8px] tracking-[0.10em]',
              isActive
                ? 'bg-white text-black border-white'
                : 'bg-black/85 text-white/55 border-white/25'
            )}
            onClick={() => { playClick(); onAnnotationClick(p.annotation) }}
          >
            {p.label}
          </div>
        )
      })}
    </div>
  )
}
