import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { useSceneStore } from '@/hooks/useSceneStore'
import { ANNOTATIONS } from '@/data/portfolio'

function getDefaults(width) {
  if (width < 480)  return { pos: [0, 1.0, 4.2], target: [0, 0.85, 0] }
  if (width < 768)  return { pos: [0, 1.0, 3.6], target: [0, 0.88, 0] }
  if (width < 1024) return { pos: [0, 1.0, 3.1], target: [0, 0.88, 0] }
  return                  { pos: [0, 1.05, 2.6], target: [0, 0.9,  0] }
}

export function CameraController() {
  const { camera, size } = useThree()
  const controlsRef   = useRef()
  const activeSection = useSceneStore((s) => s.activeSection)
  const setAnimating  = useSceneStore((s) => s.setAnimating)
  const tl            = useRef(null)
  const initialized   = useRef(false)
  const prevWidth     = useRef(size.width)
  const defaults      = getDefaults(size.width)

  // Place camera at final position immediately — no zoom-in
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    camera.position.set(...defaults.pos)
    camera.lookAt(...defaults.target)
    if (controlsRef.current) {
      controlsRef.current.target.set(...defaults.target)
      controlsRef.current.update()
    }
    setAnimating(false)
  }, []) // eslint-disable-line

  // Responsive resize
  useEffect(() => {
    if (Math.abs(size.width - prevWidth.current) < 20) return
    prevWidth.current = size.width
    if (!activeSection && controlsRef.current) {
      const d = getDefaults(size.width)
      camera.position.set(...d.pos)
      controlsRef.current.target.set(...d.target)
      controlsRef.current.update()
    }
  }, [size.width, activeSection, camera])

  // Section transitions
  useEffect(() => {
    if (!controlsRef.current) return
    if (tl.current) tl.current.kill()
    setAnimating(true)

    const d = getDefaults(size.width)
    const ann = activeSection ? ANNOTATIONS.find((a) => a.id === activeSection) : null
    const targetPos    = ann ? ann.cameraPosition : d.pos
    const targetLookAt = ann ? ann.cameraTarget   : d.target

    const fromPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const fromTarget = {
      x: controlsRef.current.target.x,
      y: controlsRef.current.target.y,
      z: controlsRef.current.target.z,
    }

    tl.current = gsap.timeline({ onComplete: () => setAnimating(false) })
    tl.current.to(fromPos, {
      x: targetPos[0], y: targetPos[1], z: targetPos[2],
      duration: 1.1, ease: 'expo.out',
      onUpdate: () => {
        camera.position.set(fromPos.x, fromPos.y, fromPos.z)
        controlsRef.current?.update()
      },
    }, 0)
    tl.current.to(fromTarget, {
      x: targetLookAt[0], y: targetLookAt[1], z: targetLookAt[2],
      duration: 1.1, ease: 'expo.out',
      onUpdate: () => {
        controlsRef.current?.target.set(fromTarget.x, fromTarget.y, fromTarget.z)
        controlsRef.current?.update()
      },
    }, 0)
  }, [activeSection, camera, setAnimating, size.width]) // eslint-disable-line

  const isMobile = size.width < 768

  return (
    <OrbitControls
      ref={controlsRef}
      target={defaults.target}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      rotateSpeed={isMobile ? 0.55 : 0.4}
      zoomSpeed={0.7}
      panSpeed={0.5}
      minDistance={1.2}
      maxDistance={9.0}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={Math.PI / 1.5}
      minAzimuthAngle={isMobile ? -Infinity : -Math.PI / 2}
      maxAzimuthAngle={isMobile ?  Infinity :  Math.PI / 2}
      touches={{ ONE: 1, TWO: 2 }}
      makeDefault
    />
  )
}
