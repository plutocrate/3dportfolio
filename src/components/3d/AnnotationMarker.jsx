import { useRef, useState, useEffect } from 'react'
import { Html, Line } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { cn } from '@/lib/utils'

// ── Mobile button: projects 3D world pos → screen px each frame,
// renders as a fixed-size DOM button clamped inside safe screen bounds.
function MobileButton({ annotation, onClick }) {
  const { id, label, position, side } = annotation
  const activeSection = useSceneStore((s) => s.activeSection)
  const isActive      = activeSection === id
  const playClick     = useClickSound()
  const { camera, size } = useThree()
  const [pos, setPos] = useState({ x: -999, y: -999, visible: false })

  const worldPos = useRef(new THREE.Vector3(...position))

  useFrame(() => {
    const v = worldPos.current.clone().project(camera)
    // NDC → pixels
    const x = (v.x  *  0.5 + 0.5) * size.width
    const y = (-v.y *  0.5 + 0.5) * size.height
    // Only show if in front of camera
    setPos({ x, y, visible: v.z < 1 })
  })

  if (!pos.visible) return null

  // Button dimensions (approximate)
  const BTN_W = label.length * 7 + 20
  const BTN_H = 24

  // Clamp to screen with 8px edge padding
  const PAD = 8
  let bx = side === 'right' ? pos.x + 6 : pos.x - BTN_W - 6
  bx = Math.max(PAD, Math.min(size.width - BTN_W - PAD, bx))
  const by = Math.max(PAD + 50, Math.min(size.height - BTN_H - PAD - 80, pos.y - BTN_H / 2))

  return (
    <Html
      style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, overflow: 'visible', pointerEvents: 'none' }}
      zIndexRange={[10, 100]}
    >
      <div
        style={{
          position: 'fixed',
          left: bx,
          top: by,
          pointerEvents: 'auto',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
        className={cn(
          'font-mono uppercase border cursor-pointer transition-all duration-200',
          'px-1.5 py-0.5 text-[8px] tracking-[0.10em]',
          isActive
            ? 'bg-white text-black border-white'
            : 'bg-black/85 text-white/60 border-white/20'
        )}
        onClick={() => { playClick(); onClick(annotation) }}
      >
        {label}
      </div>
    </Html>
  )
}

// ── Desktop marker: original lines + dots + label
export function AnnotationMarker({ annotation, onClick }) {
  const { id, label, description, position, side } = annotation
  const activeSection     = useSceneStore((s) => s.activeSection)
  const hoveredAnnotation = useSceneStore((s) => s.hoveredAnnotation)
  const setHovered        = useSceneStore((s) => s.setHovered)
  const isActive  = activeSection === id
  const isHovered = hoveredAnnotation === id
  const playClick = useClickSound()
  const { size }  = useThree()

  const isMobile = size.width < 1024

  const pulseRef = useRef()
  useFrame(({ clock }) => {
    if (!pulseRef.current) return
    const t = clock.getElapsedTime()
    const base = isActive ? 1.4 : isHovered ? 1.2 : 1.0
    pulseRef.current.scale.setScalar(base + Math.sin(t * 2.8) * 0.08)
  })

  // Mobile: use screen-projected button component
  if (isMobile) {
    return <MobileButton annotation={annotation} onClick={onClick} />
  }

  // Desktop: original behaviour
  const lineOffset = 0.72
  const distFactor = 4.0
  const pos     = new THREE.Vector3(...position)
  const offset  = side === 'right' ? lineOffset : -lineOffset
  const lineEnd = new THREE.Vector3(position[0] + offset, position[1] + 0.04, position[2])

  return (
    <group>
      <Line
        points={[pos, lineEnd]}
        color={isActive ? '#ffffff' : isHovered ? '#cccccc' : '#383838'}
        lineWidth={isActive ? 1.4 : 0.8}
        dashed={!isActive}
        dashScale={isActive ? 0 : 50}
      />

      <group position={pos}>
        <mesh ref={pulseRef}>
          <ringGeometry args={[0.016, 0.024, 24]} />
          <meshBasicMaterial
            color={isActive ? '#ffffff' : '#666666'}
            transparent
            opacity={isActive ? 0.9 : isHovered ? 0.65 : 0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh>
          <circleGeometry args={[0.010, 24]} />
          <meshBasicMaterial color={isActive ? '#ffffff' : '#888888'} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <Html
        position={[lineEnd.x, lineEnd.y, lineEnd.z]}
        center={false}
        distanceFactor={distFactor}
        zIndexRange={[10, 100]}
        occlude={false}
        style={{
          transform: side === 'right' ? 'translateX(4px)' : 'translateX(calc(-100% - 4px))',
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <div
          className={cn(
            'cursor-pointer transition-all duration-200 select-none flex flex-col',
            side === 'right' ? 'items-start' : 'items-end'
          )}
          onClick={() => { playClick(); onClick(annotation) }}
          onPointerEnter={() => setHovered(id)}
          onPointerLeave={() => setHovered(null)}
        >
          <div className={cn(
            'font-mono uppercase border whitespace-nowrap transition-all duration-200',
            'px-2.5 py-1 text-[9px] tracking-[0.18em]',
            isActive
              ? 'bg-white text-black border-white'
              : 'bg-black/85 text-white/60 border-white/20'
          )}>
            {label}
          </div>
          <div className={cn(
            'font-mono text-[8px] mt-0.5 transition-colors duration-200 whitespace-nowrap',
            isActive ? 'text-white/55' : 'text-white/22',
            side === 'right' ? 'pl-0.5' : 'pr-0.5'
          )}>
            {description}
          </div>
        </div>
      </Html>
    </group>
  )
}
