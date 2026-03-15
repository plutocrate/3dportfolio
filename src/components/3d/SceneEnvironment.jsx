import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { LavaSmokeSystem } from './LavaSmokeSystem'

// ── Sun dust sparks — still from top-left, small & fast ───────────────────
const SPARK_N = 60
const SUN_POS = new THREE.Vector3(-5.5, 8.0, 3.5)

const SPARK_VERT = /* glsl */`
  attribute float aAge;
  attribute float aSize;
  varying float vAge;
  void main() {
    vAge = aAge;
    float s = aSize * sin(clamp(aAge, 0.0, 1.0) * 3.14159);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = s * (380.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`
const SPARK_FRAG = /* glsl */`
  varying float vAge;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.05, r);
    float fade = vAge < 0.12 ? vAge / 0.12 : 1.0 - pow((vAge - 0.12) / 0.88, 1.4);
    vec3 col = mix(vec3(1.0, 0.95, 0.75), vec3(1.0, 0.5, 0.1), smoothstep(0.2, 0.9, vAge));
    gl_FragColor = vec4(col, soft * max(0.0, fade) * 0.75);
  }
`

function SparkSystem() {
  const ptsRef = useRef()
  const state = useMemo(() => {
    const pos  = new Float32Array(SPARK_N * 3)
    const vel  = new Float32Array(SPARK_N * 3)
    const age  = new Float32Array(SPARK_N)
    const size = new Float32Array(SPARK_N)
    const life = new Float32Array(SPARK_N)
    const born = new Float32Array(SPARK_N)
    for (let i = 0; i < SPARK_N; i++) {
      const i3 = i * 3
      pos[i3]     = SUN_POS.x + (Math.random() - 0.5) * 2.2
      pos[i3 + 1] = SUN_POS.y + (Math.random() - 0.5) * 1.8
      pos[i3 + 2] = SUN_POS.z + (Math.random() - 0.5) * 1.0
      vel[i3]     =  0.14 + Math.random() * 0.20
      vel[i3 + 1] = -0.06 - Math.random() * 0.12
      vel[i3 + 2] = -0.02 - Math.random() * 0.05
      age[i]  = Math.random()
      size[i] = 2.5 + Math.random() * 4.5
      life[i] = 2.0 + Math.random() * 3.0
      born[i] = -age[i] * life[i]
    }
    return { pos, vel, age, size, life, born }
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(state.pos,  3))
    g.setAttribute('aAge',     new THREE.BufferAttribute(state.age,  1))
    g.setAttribute('aSize',    new THREE.BufferAttribute(state.size, 1))
    return g
  }, [state])

  const mat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: SPARK_VERT, fragmentShader: SPARK_FRAG,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }), [])

  useFrame(({ clock }, delta) => {
    const { pos, vel, age, life, born } = state
    const now = clock.getElapsedTime()
    for (let i = 0; i < SPARK_N; i++) {
      const norm = (now - born[i]) / life[i]
      if (norm >= 1.0 || (now - born[i]) < 0) {
        const i3 = i * 3
        pos[i3]     = SUN_POS.x + (Math.random() - 0.5) * 2.2
        pos[i3 + 1] = SUN_POS.y + (Math.random() - 0.5) * 1.8
        pos[i3 + 2] = SUN_POS.z + (Math.random() - 0.5) * 1.0
        vel[i3]     =  0.14 + Math.random() * 0.20
        vel[i3 + 1] = -0.06 - Math.random() * 0.12
        vel[i3 + 2] = -0.02 - Math.random() * 0.05
        life[i] = 2.0 + Math.random() * 3.0
        born[i] = now; age[i] = 0; continue
      }
      age[i] = norm
      const i3 = i * 3
      pos[i3]     += vel[i3]     * delta
      pos[i3 + 1] += vel[i3 + 1] * delta
      pos[i3 + 2] += vel[i3 + 2] * delta
    }
    geo.attributes.position.needsUpdate = true
    geo.attributes.aAge.needsUpdate     = true
  })

  return <points ref={ptsRef} geometry={geo} material={mat} frustumCulled={false} />
}

export function SceneEnvironment() {
  return (
    <>
      <LavaSmokeSystem />
      <SparkSystem />
      <fog attach="fog" args={['#060402', 12, 28]} />
    </>
  )
}
