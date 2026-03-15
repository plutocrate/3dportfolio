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
  const { size }  = useThree()

  const isMobile  = size.width < 600
  const isTablet  = size.width >= 600 && size.width < 900

  // On mobile: very short line so label stays on screen
  const lineOffset   = isMobile ? 0.22 : isTablet ? 0.45 : 0.72
  // distanceFactor: larger = label appears smaller in screen space
  const distFactor   = isMobile ? 7.0  : isTablet ? 5.5  : 4.0

  const pulseRef = useRef()
  useFrame(({ clock }) => {
    if (!pulseRef.current) return
    const t = clock.getElapsedTime()
    const base = isActive ? 1.4 : isHovered ? 1.2 : 1.0
    pulseRef.current.scale.setScalar(base + Math.sin(t * 2.8) * 0.08)
  })

  const pos     = new THREE.Vector3(...position)
  const offset  = side === 'right' ? lineOffset : -lineOffset
  const lineEnd = new THREE.Vector3(position[0] + offset, position[1] + 0.04, position[2])

  return (
    <group>
      {/* Connector line — thinner on mobile */}
      <Line
        points={[pos, lineEnd]}
        color={isActive ? '#ffffff' : isHovered ? '#cccccc' : '#383838'}
        lineWidth={isActive ? (isMobile ? 0.8 : 1.4) : (isMobile ? 0.5 : 0.8)}
        dashed={!isActive}
        dashScale={isActive ? 0 : 50}
      />

      {/* Dot */}
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
          <meshBasicMaterial
            color={isActive ? '#ffffff' : '#888888'}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Label */}
      <Html
        position={[lineEnd.x, lineEnd.y, lineEnd.z]}
        center={false}
        distanceFactor={distFactor}
        zIndexRange={[10, 100]}
        occlude={false}
        style={{
          // Flip anchor so label doesn't escape screen edge
          transform: side === 'right'
            ? 'translateX(4px)'
            : 'translateX(calc(-100% - 4px))',
          pointerEvents: 'auto',
          userSelect: 'none',
          // Prevent any label from exceeding half the viewport
          maxWidth: isMobile ? '28vw' : '18vw',
        }}
      >
        <div
          className={cn(
            'cursor-pointer transition-all duration-200 select-none flex flex-col',
            side === 'right' ? 'items-start' : 'items-end'
          )}
          onClick={() => { playClick(); onClick(annotation) }}
          onPointerEnter={() => !isMobile && setHovered(id)}
          onPointerLeave={() => !isMobile && setHovered(null)}
        >
          {/* Chip */}
          <div className={cn(
            'font-mono uppercase tracking-wider border whitespace-nowrap transition-all duration-200',
            // Tiny on mobile, normal on desktop
            isMobile
              ? 'px-1.5 py-0.5 text-[7px] tracking-[0.12em]'
              : 'px-2.5 py-1 text-[10px] tracking-[0.2em]',
            isActive
              ? 'bg-white text-black border-white'
              : 'bg-black/85 text-white/60 border-white/20'
          )}>
            {/* On mobile show abbreviated label to save space */}
            {isMobile ? label.slice(0, 3) : label}
          </div>

          {/* Description — desktop only */}
          {!isMobile && (
            <div className={cn(
              'font-mono text-[8px] mt-0.5 transition-colors duration-200',
              isActive ? 'text-white/55' : 'text-white/22',
              side === 'right' ? 'pl-0.5' : 'pr-0.5'
            )}>
              {description}
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}
