import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

function makeToonRamp(shadow, midShadow, midLit, highlight) {
  const W = 256
  const data = new Uint8Array(W * 4)
  const cols = [shadow, midShadow, midLit, highlight].map(h => new THREE.Color(h))
  for (let i = 0; i < W; i++) {
    const t = i / (W - 1)
    let c
    if      (t < 0.25) c = cols[0]
    else if (t < 0.52) c = cols[1]
    else if (t < 0.78) c = cols[2]
    else               c = cols[3]
    data[i*4]=Math.round(c.r*255); data[i*4+1]=Math.round(c.g*255)
    data[i*4+2]=Math.round(c.b*255); data[i*4+3]=255
  }
  const tex = new THREE.DataTexture(data, W, 1, THREE.RGBAFormat)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.needsUpdate = true
  return tex
}

const PALETTE = {
  body:    { ramp: ['#0a0806','#1e1c18','#3c3830','#545048'] },
  helmet:  { ramp: ['#0c0a08','#222018','#403e3a','#585450'] },
  goggle:  { ramp: ['#180600','#5a1800','#8c2800','#b03800'], emissive:'#a02800', emissiveIntensity:0.5 },
  shemag:  { ramp: ['#100e08','#28241c','#484238','#605a50'] },
  chest:   { ramp: ['#0a0806','#1c1a14','#363228','#504a40'] },
  vest:    { ramp: ['#080604','#181410','#302c24','#48443c'] },
  backpack:{ ramp: ['#060402','#141210','#28241c','#3c3830'] },
  knee:    { ramp: ['#060402','#100e0c','#22201a','#343028'] },
  holster: { ramp: ['#040200','#0e0c0a','#1e1c18','#2e2c28'] },
  flag:    { ramp: ['#080602','#161410','#2c2820','#423e38'] },
}
function getPalette(name) {
  const n = name.toLowerCase()
  if (n.includes('goggle'))                            return PALETTE.goggle
  if (n.includes('helmet'))                            return PALETTE.helmet
  if (n.includes('shemag'))                            return PALETTE.shemag
  if (n.includes('chest_rig')||n.includes('chest'))   return PALETTE.chest
  if (n.includes('vest'))                              return PALETTE.vest
  if (n.includes('backpack'))                          return PALETTE.backpack
  if (n.includes('knee'))                              return PALETTE.knee
  if (n.includes('holster'))                           return PALETTE.holster
  if (n.includes('flag'))                              return PALETTE.flag
  return PALETTE.body
}

export function CharacterModel({ onLoaded }) {
  const group  = useRef()
  const floatY = useRef(0)   // accumulated float offset
  const { scene } = useGLTF(import.meta.env.BASE_URL + 'models/NikitaMesh_A_Pose.gltf')
  const ready  = useRef(false)

  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (!child.isMesh) return
      const name = child.name.toLowerCase()
      if (name.includes('shadow')||name.includes('ground')||name.includes('plane')||name.includes('catch')) {
        child.visible = false; return
      }
      const pal  = getPalette(child.name)
      const ramp = makeToonRamp(...pal.ramp)
      child.material = new THREE.MeshToonMaterial({
        color: new THREE.Color('#ffffff'), gradientMap: ramp,
        emissive: pal.emissive ? new THREE.Color(pal.emissive) : new THREE.Color('#000000'),
        emissiveIntensity: pal.emissiveIntensity ?? 0,
      })
      child.castShadow = true
      child.receiveShadow = true
    })
    if (group.current) {
      group.current.position.y = -3.5
      group.current.scale.set(0.92, 0.92, 0.92)
      gsap.to(group.current.position, {
        y: 0, duration: 1.8, ease: 'power3.out', delay: 0.3,
        onComplete: () => { ready.current = true; onLoaded?.() },
      })
      gsap.to(group.current.scale, { x:1, y:1, z:1, duration:1.8, ease:'power3.out', delay:0.3 })
    }
  }, [scene, onLoaded])

  useFrame(({ clock }) => {
    if (!group.current || !ready.current) return
    const t = clock.getElapsedTime()
    // Floating bob: smooth sine, ±0.06 units vertically
    group.current.position.y = Math.sin(t * 0.7) * 0.06
    // Very gentle idle yaw sway
    group.current.rotation.y = Math.sin(t * 0.18) * 0.04
  })

  return <group ref={group}><primitive object={scene} /></group>
}

useGLTF.preload(import.meta.env.BASE_URL + 'models/NikitaMesh_A_Pose.gltf')
