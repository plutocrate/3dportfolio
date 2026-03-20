import { useFrame, useThree } from '@react-three/fiber'
import { useSceneStore } from '@/hooks/useSceneStore'

// Runs inside Canvas — writes camera + size to store each frame
// so outside-canvas components can project 3D → screen
export function CameraSync() {
  const setCameraState = useSceneStore((s) => s.setCameraState)
  const { camera, size } = useThree()

  useFrame(() => {
    setCameraState({ camera, size })
  })

  return null
}
