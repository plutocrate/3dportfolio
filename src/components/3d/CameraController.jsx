import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { useSceneStore } from '@/hooks/useSceneStore'
import { ANNOTATIONS } from '@/data/portfolio'

const FOV        = 52
const CHAR_H     = 2.1   // character world-space height in units
const FILL_RATIO = 0.75  // want character to fill 75% of screen height

// Z so character fills FILL_RATIO of screen height.
// visible_height = 2 * Z * tan(FOV/2)  →  Z = (CHAR_H / FILL_RATIO) / (2 * tan(FOV/2))
function idealZ() {
  return (CHAR_H / FILL_RATIO) / (2 * Math.tan((FOV * Math.PI / 180) / 2))
}

function getDefaults(width, height) {
  const aspect = width / height
  let z = idealZ()  // ~2.87 units

  // On very narrow portrait screens the arms extend ~1.5 units wide.
  // If the frustum width at z is less than 1.5*2 = 3, pull back slightly.
  const frustumW = 2 * z * Math.tan((FOV * Math.PI / 180) / 2) * aspect
  if (frustumW < 3.2 && aspect < 0.65) z = 3.2 / (2 * Math.tan((FOV * Math.PI / 180) / 2) * aspect)

  return {
    pos:    [0, 1.0, Math.min(z, 3.5)],
    target: [0, 0.88, 0],
  }
}

export function CameraController() {
  const { camera, size } = useThree()
  const controlsRef   = useRef()
  const activeSection = useSceneStore((s) => s.activeSection)
  const setAnimating  = useSceneStore((s) => s.setAnimating)
  const tl            = useRef(null)
  const initialized   = useRef(false)
  const prevSize      = useRef({ w: size.width, h: size.height })
  const defaults      = getDefaults(size.width, size.height)
  const isMobile      = size.width < 1024

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

  useEffect(() => {
    const dw = Math.abs(size.width  - prevSize.current.w)
    const dh = Math.abs(size.height - prevSize.current.h)
    if (dw < 10 && dh < 10) return
    prevSize.current = { w: size.width, h: size.height }
    if (!activeSection && controlsRef.current) {
      const d = getDefaults(size.width, size.height)
      camera.position.set(...d.pos)
      controlsRef.current.target.set(...d.target)
      controlsRef.current.update()
    }
  }, [size.width, size.height, activeSection, camera])

  useEffect(() => {
    if (!controlsRef.current) return
    if (tl.current) tl.current.kill()
    setAnimating(true)

    const d   = getDefaults(size.width, size.height)
    const ann = activeSection ? ANNOTATIONS.find((a) => a.id === activeSection) : null
    const targetPos    = ann ? ann.cameraPosition : d.pos
    const targetLookAt = ann ? ann.cameraTarget   : d.target

    const fromPos    = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
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
  }, [activeSection, camera, setAnimating, size.width, size.height]) // eslint-disable-line

  return (
    <OrbitControls
      ref={controlsRef}
      target={defaults.target}
      enablePan={false}
      enableZoom={!isMobile}
      enableRotate={true}
      rotateSpeed={isMobile ? 0.65 : 0.4}
      zoomSpeed={0.7}
      minDistance={1.5}
      maxDistance={9.0}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={Math.PI / 1.5}
      minAzimuthAngle={-Math.PI / 1.5}
      maxAzimuthAngle={ Math.PI / 1.5}
      makeDefault
    />
  )
}
