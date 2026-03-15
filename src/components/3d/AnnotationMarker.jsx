import { useRef } from 'react'
import { Html, Line } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { cn } from '@/lib/utils'

export function AnnotationMarker({ annotation, onClick }) {
  const { id, label, description, position, side } = annotation
  const activeSection     = useSceneStore((s) => s.activeSection)
  const hoveredAnnotation = useSceneStore((s) => s.hoveredAnnotation)
  const setHovered        = useSceneStore((s) => s.setHovered)
  const isActive  = activeSection === id
  const isHovered = hoveredAnnotation === id
  const playClick = useClickSound()

  // Responsive: get viewport size to scale line length + font
  const { size } = useThree()
  const isMobile = size.width < 600
  const isTablet = size.width < 900 && size.width >= 600
  const lineOffset = isMobile ? 0.38 : isTablet ? 0.52 : 0.72
  const distFactor = isMobile ? 5.5 : isTablet ? 4.8 : 4.0

  const pulseRef = useRef()

  useFrame(({ clock }) => {
    if (!pulseRef.current) return
    const t = clock.getElapsedTime()
    const base = isActive ? 1.5 : isHovered ? 1.25 : 1.0
    pulseRef.current.scale.setScalar(base + Math.sin(t * 2.8) * 0.1)
  })

  const pos     = new THREE.Vector3(...position)
  const offset  = side === 'right' ? lineOffset : -lineOffset
  const lineEnd = new THREE.Vector3(position[0] + offset, position[1] + 0.06, position[2])

  return (
    <group>
      <Line
        points={[pos, lineEnd]}
        color={isActive ? '#ffffff' : isHovered ? '#dddddd' : '#444444'}
        lineWidth={isActive ? 1.5 : 0.9}
        dashed={!isActive}
        dashScale={isActive ? 0 : 60}
      />

      <group position={pos}>
        <mesh ref={pulseRef}>
          <ringGeometry args={[0.022, 0.032, 32]} />
          <meshBasicMaterial
            color={isActive ? '#ffffff' : '#777777'}
            transparent opacity={isActive ? 0.9 : isHovered ? 0.7 : 0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh>
          <circleGeometry args={[0.014, 32]} />
          <meshBasicMaterial color={isActive ? '#ffffff' : '#999999'} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <Html
        position={[lineEnd.x, lineEnd.y, lineEnd.z]}
        center={false}
        distanceFactor={distFactor}
        zIndexRange={[10, 100]}
        occlude={false}
        style={{
          transform: side === 'right' ? 'translateX(6px)' : 'translateX(calc(-100% - 6px))',
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <div
          className={cn(
            'group cursor-pointer transition-all duration-300 select-none flex flex-col gap-0.5',
            side === 'right' ? 'items-start' : 'items-end'
          )}
          onClick={() => { playClick(); onClick(annotation) }}
          onPointerEnter={() => setHovered(id)}
          onPointerLeave={() => setHovered(null)}
        >
          <div className={cn(
            'px-2 py-0.5 font-mono uppercase tracking-[0.2em] transition-all duration-300 border whitespace-nowrap',
            isMobile ? 'text-[8px]' : 'text-[10px] sm:text-[11px]',
            isActive
              ? 'bg-white text-black border-white'
              : 'bg-black/80 text-white/65 border-white/22 group-hover:border-white/65 group-hover:text-white'
          )}>
            {label}
          </div>
          {!isMobile && (
            <div className={cn(
              'font-mono text-[8px] transition-colors duration-300',
              isActive ? 'text-white/65' : 'text-white/28 group-hover:text-white/50',
              side === 'right' ? 'pl-1' : 'pr-1'
            )}>
              {description}
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}
