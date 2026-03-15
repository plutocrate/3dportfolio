import { useState } from 'react'
import { MainScene } from '@/components/3d/MainScene'
import { SectionPanel } from '@/components/SectionPanel'
import { HUDOverlay } from '@/components/HUDOverlay'
import { LoadingScreen } from '@/components/LoadingScreen'
import { SunCorner } from '@/components/SunCorner'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useAmbientMusic } from '@/hooks/useAmbientMusic'

export default function App() {
  // Single gate: loading=true until user clicks ENTER
  const [loading, setLoading] = useState(true)

  const activeSection    = useSceneStore((s) => s.activeSection)
  const setActiveSection = useSceneStore((s) => s.setActiveSection)
  const closeSection     = useSceneStore((s) => s.closeSection)
  const { playing, start, toggle } = useAmbientMusic()

  const handleAnnotationClick = (annotation) => {
    if (activeSection === annotation.id) closeSection()
    else setActiveSection(annotation.id)
  }

  // Called when user clicks ENTER on the loading screen
  const handleEnter = () => {
    start()           // start ambient music on user gesture
    setLoading(false) // reveal the scene
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#060606]">
      <div className="noise-overlay" />
      <div className="scan-overlay" />

      {/* Single loading + entry screen */}
      {loading && <LoadingScreen onComplete={handleEnter} />}

      {/* Sun glow top-left */}
      <SunCorner visible={!loading} />

      {/* 3D Canvas — mounted immediately so model loads while boot log runs */}
      <div className="absolute inset-0" style={{ touchAction: "none" }}>
        <MainScene
          onAnnotationClick={handleAnnotationClick}
          onModelLoaded={() => {}}
        />
      </div>

      {/* HUD + panels — only after ENTER */}
      <HUDOverlay
        visible={!loading}
        musicPlaying={playing}
        onMusicToggle={toggle}
      />
      <SectionPanel />
    </div>
  )
}
