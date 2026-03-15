import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CharacterModel } from './CharacterModel'
import { AnnotationMarker } from './AnnotationMarker'
import { SceneLighting } from './SceneLighting'
import { SceneEnvironment } from './SceneEnvironment'
import { CameraController } from './CameraController'
import { ANNOTATIONS } from '@/data/portfolio'

function AnnotationLayer({ onAnnotationClick }) {
  return (
    <>
      {ANNOTATIONS.map((ann) => (
        <AnnotationMarker key={ann.id} annotation={ann} onClick={onAnnotationClick} />
      ))}
    </>
  )
}

export function MainScene({ onAnnotationClick, onModelLoaded }) {
  return (
    <Canvas
      camera={{ position: [0, 1.05, 2.6], fov: 52, near: 0.05, far: 100 }}
      shadows={{ type: 'PCFSoftShadowMap', enabled: true }}
      gl={{
        antialias: true,
        toneMapping: 3,
        toneMappingExposure: 1.05,
        outputColorSpace: 'srgb',
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
      performance={{ min: 0.7 }}
    >
      <CameraController />
      <SceneLighting />
      <SceneEnvironment />
      <Suspense fallback={null}>
        <CharacterModel onLoaded={onModelLoaded} />
        <AnnotationLayer onAnnotationClick={onAnnotationClick} />
      </Suspense>
    </Canvas>
  )
}
