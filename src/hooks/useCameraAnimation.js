import { useRef, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { Vector3 } from 'three'
import { useSceneStore } from './useSceneStore'

// Default "overview" camera state
const DEFAULT_POSITION = new Vector3(0, 1.2, 4.2)
const DEFAULT_TARGET = new Vector3(0, 1.0, 0)

export function useCameraAnimation() {
  const { camera } = useThree()
  const controlsRef = useRef(null)
  const setAnimating = useSceneStore((s) => s.setAnimating)
  const tl = useRef(null)

  const animateTo = useCallback(
    ({ position, target, duration = 1.4, onComplete }) => {
      if (tl.current) tl.current.kill()

      setAnimating(true)

      const fromPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
      const toPos = { x: position[0], y: position[1], z: position[2] }

      // Get current controls target if available
      const currentTarget = controlsRef.current
        ? controlsRef.current.target.clone()
        : DEFAULT_TARGET.clone()

      const fromTarget = { x: currentTarget.x, y: currentTarget.y, z: currentTarget.z }
      const toTarget = { x: target[0], y: target[1], z: target[2] }

      tl.current = gsap.timeline({
        onComplete: () => {
          setAnimating(false)
          onComplete?.()
        },
      })

      tl.current.to(
        fromPos,
        {
          ...toPos,
          duration,
          ease: 'power3.inOut',
          onUpdate: () => {
            camera.position.set(fromPos.x, fromPos.y, fromPos.z)
            camera.lookAt(fromTarget.x, fromTarget.y, fromTarget.z)
            if (controlsRef.current) {
              controlsRef.current.target.set(fromTarget.x, fromTarget.y, fromTarget.z)
              controlsRef.current.update()
            }
          },
        },
        0
      )

      tl.current.to(
        fromTarget,
        {
          ...toTarget,
          duration,
          ease: 'power3.inOut',
          onUpdate: () => {
            if (controlsRef.current) {
              controlsRef.current.target.set(fromTarget.x, fromTarget.y, fromTarget.z)
              controlsRef.current.update()
            }
            camera.lookAt(fromTarget.x, fromTarget.y, fromTarget.z)
          },
        },
        0
      )
    },
    [camera, setAnimating]
  )

  const returnToDefault = useCallback(
    (duration = 1.4, onComplete) => {
      animateTo({
        position: [DEFAULT_POSITION.x, DEFAULT_POSITION.y, DEFAULT_POSITION.z],
        target: [DEFAULT_TARGET.x, DEFAULT_TARGET.y, DEFAULT_TARGET.z],
        duration,
        onComplete,
      })
    },
    [animateTo]
  )

  return { animateTo, returnToDefault, controlsRef }
}
