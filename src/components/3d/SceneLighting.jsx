import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Sun — top-left off-screen, far = near-parallel rays
export const SUN_POSITION = [-5.5, 8.0, 3.5]

export function SceneLighting() {
  const sunRef = useRef()

  useFrame(({ clock }) => {
    if (!sunRef.current) return
    const t = clock.getElapsedTime()
    // Very subtle atmospheric shimmer
    sunRef.current.intensity = 2.2 + Math.sin(t * 0.3) * 0.04
  })

  return (
    <>
      {/*
        The ONLY real light in the scene.
        Top-left sun — warm white, calm, not harsh.
        All shadows cast bottom-right. 4k shadowmap = crisp edges.
      */}
      <directionalLight
        ref={sunRef}
        position={SUN_POSITION}
        intensity={2.2}
        color="#f0e8d8"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={1}
        shadow-camera-far={28}
        shadow-camera-left={-2.8}
        shadow-camera-right={2.8}
        shadow-camera-top={4.5}
        shadow-camera-bottom={-1.5}
        shadow-bias={-0.0005}
        shadow-normalBias={0.015}
      />

      {/*
        Tiny ambient — just enough to stop pure-black faces from being
        completely invisible. Keeps shadow side readable as deep charcoal,
        not invisible void. Does NOT brighten lit faces noticeably.
      */}
      <ambientLight intensity={0.06} color="#0a0806" />
    </>
  )
}
