import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { useSceneStore } from '@/hooks/useSceneStore'
import { ANNOTATIONS } from '@/data/portfolio'

// Responsive default positions based on viewport width
function getDefaults(width) {
  if (width < 600)  return { pos: [0, 1.0, 3.8], target: [0, 0.85, 0] } // mobile: pulled back
  if (width < 900)  return { pos: [0, 1.0, 3.1], target: [0, 0.88, 0] } // tablet
  return                  { pos: [0, 1.05, 2.6], target: [0, 0.9,  0] } // desktop
}

export function CameraController() {
  const { camera, size } = useThree()
  const controlsRef  = useRef()
  const activeSection = useSceneStore((s) => s.activeSection)
  const setAnimating  = useSceneStore((s) => s.setAnimating)
  const tl = useRef(null)
  const initialized = useRef(false)
  const prevWidth   = useRef(size.width)

  const defaults = getDefaults(size.width)

  // Init — place camera immediately, no tween
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

  // Responsive resize — snap camera to new default if not in section view
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

    const ann = activeSection ? ANNOTATIONS.find((a) => a.id === activeSection) : null
    const targetPos    = ann ? ann.cameraPosition : defaults.pos
    const targetLookAt = ann ? ann.cameraTarget   : defaults.target

    const fromPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const fromTarget = {
      x: controlsRef.current.target.x,
      y: controlsRef.current.target.y,
      z: controlsRef.current.target.z,
    }

    tl.current = gsap.timeline({ onComplete: () => setAnimating(false) })
    tl.current.to(fromPos, {
      x: targetPos[0], y: targetPos[1], z: targetPos[2],
      duration: 1.4, ease: 'power3.inOut',
      onUpdate: () => { camera.position.set(fromPos.x, fromPos.y, fromPos.z); controlsRef.current?.update() },
    }, 0)
    tl.current.to(fromTarget, {
      x: targetLookAt[0], y: targetLookAt[1], z: targetLookAt[2],
      duration: 1.4, ease: 'power3.inOut',
      onUpdate: () => { controlsRef.current?.target.set(fromTarget.x, fromTarget.y, fromTarget.z); controlsRef.current?.update() },
    }, 0)
  }, [activeSection, camera, setAnimating]) // eslint-disable-line

  return (
    <OrbitControls
      ref={controlsRef}
      target={defaults.target}
      enablePan={false}
      enableZoom={false}
      enableRotate={true}
      rotateSpeed={0.4}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={Math.PI / 1.5}
      minAzimuthAngle={-Math.PI / 2}
      maxAzimuthAngle={Math.PI / 2}
      touches={{ ONE: 1 }} // enable single-touch rotate on mobile
      makeDefault
    />
  )
}
