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

// Spherical to Cartesian helper
function sphericalToCart(radius, theta, phi) {
  return [
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.cos(theta),
  ]
}

export function CameraController({ doIntroSweep }) {
  const { camera, size } = useThree()
  const controlsRef   = useRef()
  const activeSection = useSceneStore((s) => s.activeSection)
  const setAnimating  = useSceneStore((s) => s.setAnimating)
  const tl            = useRef(null)
  const sweepDone     = useRef(false)
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

  // Intro sweep — triggered once when doIntroSweep becomes true
  useEffect(() => {
    if (!doIntroSweep || sweepDone.current || !controlsRef.current) return
    sweepDone.current = true

    const d      = getDefaults(size.width)
    const r      = Math.sqrt(d.pos[0] ** 2 + d.pos[2] ** 2) // radius in xz plane
    const baseTheta = Math.atan2(d.pos[0], d.pos[2])        // starting angle
    const phi    = Math.acos(d.pos[1] / Math.sqrt(d.pos[0]**2 + d.pos[1]**2 + d.pos[2]**2))

    // Sweep: center → slightly right → back to center → slightly left → settle center
    const sweep = { theta: baseTheta }

    gsap.timeline({ delay: 0.8 })
      .to(sweep, {
        theta: baseTheta + 0.38,
        duration: 1.1,
        ease: 'power2.inOut',
        onUpdate: () => {
          const [x, y, z] = sphericalToCart(
            Math.sqrt(d.pos[0]**2 + d.pos[1]**2 + d.pos[2]**2),
            sweep.theta,
            phi
          )
          camera.position.set(x, y, z)
          camera.lookAt(...d.target)
          controlsRef.current?.target.set(...d.target)
          controlsRef.current?.update()
        },
      })
      .to(sweep, {
        theta: baseTheta - 0.28,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          const [x, y, z] = sphericalToCart(
            Math.sqrt(d.pos[0]**2 + d.pos[1]**2 + d.pos[2]**2),
            sweep.theta,
            phi
          )
          camera.position.set(x, y, z)
          camera.lookAt(...d.target)
          controlsRef.current?.target.set(...d.target)
          controlsRef.current?.update()
        },
      })
      .to(sweep, {
        theta: baseTheta,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          const [x, y, z] = sphericalToCart(
            Math.sqrt(d.pos[0]**2 + d.pos[1]**2 + d.pos[2]**2),
            sweep.theta,
            phi
          )
          camera.position.set(x, y, z)
          camera.lookAt(...d.target)
          controlsRef.current?.target.set(...d.target)
          controlsRef.current?.update()
        },
      })
  }, [doIntroSweep]) // eslint-disable-line

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
      duration: 1.4, ease: 'power3.inOut',
      onUpdate: () => {
        camera.position.set(fromPos.x, fromPos.y, fromPos.z)
        controlsRef.current?.update()
      },
    }, 0)
    tl.current.to(fromTarget, {
      x: targetLookAt[0], y: targetLookAt[1], z: targetLookAt[2],
      duration: 1.4, ease: 'power3.inOut',
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
