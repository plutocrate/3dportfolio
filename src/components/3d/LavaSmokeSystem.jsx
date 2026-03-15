import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Sun position (top-left, matches SceneLighting)
const SUN    = new THREE.Vector3(-5.5, 8.0, 3.5)
// Target: the model body center — smoke travels from sun TOWARD here
const TARGET = new THREE.Vector3(0.0, 1.2, 0.0)
// Direction vector sun→target, normalized
const DIR    = new THREE.Vector3().subVectors(TARGET, SUN).normalize()

const N = 200  // more particles = denser cloud

const VERT = /* glsl */`
  attribute float aAge;
  attribute float aSize;
  attribute float aSeed;
  varying float vAge;
  varying float vSeed;
  void main() {
    vAge  = aAge;
    vSeed = aSeed;
    float expand  = sin(clamp(aAge, 0.0, 1.0) * 3.14159);
    float sz      = aSize * (0.3 + expand * 0.85);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = sz * (600.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */`
  varying float vAge;
  varying float vSeed;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float r  = length(uv);
    if (r > 0.5) discard;

    // Puffy soft disc
    float alpha = pow(max(0.0, 1.0 - r * 2.0), 1.2);

    // Noisy cloud edge
    float n = hash(gl_PointCoord * 9.1 + vSeed * 5.3);
    alpha  *= 0.72 + n * 0.28;

    // Lifetime envelope
    float fadein  = smoothstep(0.0, 0.10, vAge);
    float fadeout = 1.0 - smoothstep(0.65, 1.0, vAge);
    float fade    = fadein * fadeout;

    // Heat: high when young and near center (r small)
    float heat = clamp((1.0 - r * 2.0) * (1.0 - vAge * 0.8), 0.0, 1.0);

    vec3 colHot   = vec3(1.00, 0.58, 0.10);  // orange-gold
    vec3 colMid   = vec3(0.72, 0.16, 0.02);  // deep orange-red
    vec3 colCool  = vec3(0.28, 0.05, 0.01);  // dark smoked red

    vec3 col = mix(colCool, colMid, smoothstep(0.0, 0.45, heat));
    col      = mix(col,    colHot,  smoothstep(0.45, 1.0, heat));

    // Smoke is denser in middle of its travel path
    gl_FragColor = vec4(col, alpha * fade * 0.48);
  }
`

export function LavaSmokeSystem() {
  const ptsRef = useRef()

  const state = useMemo(() => {
    const pos  = new Float32Array(N * 3)
    const vel  = new Float32Array(N * 3)
    const age  = new Float32Array(N)
    const size = new Float32Array(N)
    const seed = new Float32Array(N)
    const life = new Float32Array(N)
    const born = new Float32Array(N)

    for (let i = 0; i < N; i++) {
      const i3 = i * 3

      // Spawn spread: cloud volume around sun, offset perpendicular to travel dir
      // so smoke fills a beam rather than a thin line
      const spread = 2.2
      pos[i3]     = SUN.x + (Math.random() - 0.5) * spread * 1.8
      pos[i3 + 1] = SUN.y + (Math.random() - 0.5) * spread * 1.4
      pos[i3 + 2] = SUN.z + (Math.random() - 0.5) * spread * 0.8

      // Base speed along sun→target direction, plus small turbulence
      const spd = 0.35 + Math.random() * 0.45
      vel[i3]     = DIR.x * spd + (Math.random() - 0.5) * 0.08
      vel[i3 + 1] = DIR.y * spd + (Math.random() - 0.5) * 0.06
      vel[i3 + 2] = DIR.z * spd + (Math.random() - 0.5) * 0.06

      age[i]  = Math.random()           // stagger so not all born at same time
      size[i] = 35 + Math.random() * 65 // large puffy discs
      seed[i] = Math.random()
      life[i] = 4.0 + Math.random() * 5.0
      born[i] = -age[i] * life[i]
    }

    return { pos, vel, age, size, seed, life, born }
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(state.pos,  3))
    g.setAttribute('aAge',     new THREE.BufferAttribute(state.age,  1))
    g.setAttribute('aSize',    new THREE.BufferAttribute(state.size, 1))
    g.setAttribute('aSeed',    new THREE.BufferAttribute(state.seed, 1))
    return g
  }, [state])

  const mat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   VERT,
    fragmentShader: FRAG,
    transparent:    true,
    depthWrite:     false,
    depthTest:      true,
    blending:       THREE.AdditiveBlending,
  }), [])

  useFrame(({ clock }, delta) => {
    const { pos, vel, age, life, born } = state
    const now = clock.getElapsedTime()

    for (let i = 0; i < N; i++) {
      const elapsed = now - born[i]
      const norm    = elapsed / life[i]

      if (norm >= 1.0 || elapsed < 0) {
        const i3 = i * 3
        pos[i3]     = SUN.x + (Math.random() - 0.5) * 4.0
        pos[i3 + 1] = SUN.y + (Math.random() - 0.5) * 3.0
        pos[i3 + 2] = SUN.z + (Math.random() - 0.5) * 1.6
        const spd   = 0.35 + Math.random() * 0.45
        vel[i3]     = DIR.x * spd + (Math.random() - 0.5) * 0.08
        vel[i3 + 1] = DIR.y * spd + (Math.random() - 0.5) * 0.06
        vel[i3 + 2] = DIR.z * spd + (Math.random() - 0.5) * 0.06
        life[i] = 4.0 + Math.random() * 5.0
        born[i] = now
        age[i]  = 0
        continue
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
