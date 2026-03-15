import { useState } from 'react'
import { MainScene } from '@/components/3d/MainScene'
import { SectionPanel } from '@/components/SectionPanel'
import { HUDOverlay } from '@/components/HUDOverlay'
import { LoadingScreen } from '@/components/LoadingScreen'
import { SunCorner } from '@/components/SunCorner'
import { SwipeHint } from '@/components/SwipeHint'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useAmbientMusic } from '@/hooks/useAmbientMusic'

export default function App() {
  const [loading,    setLoading]    = useState(true)
  const [showHint,   setShowHint]   = useState(false)

  const activeSection    = useSceneStore((s) => s.activeSection)
  const setActiveSection = useSceneStore((s) => s.setActiveSection)
  const closeSection     = useSceneStore((s) => s.closeSection)
  const { playing, start, toggle } = useAmbientMusic()

  const handleAnnotationClick = (annotation) => {
    if (activeSection === annotation.id) closeSection()
    else setActiveSection(annotation.id)
  }

  // Called when user clicks ENTER
  const handleEnter = () => {
    start()
    setLoading(false)
    // Brief delay then trigger sweep + hint together
    setTimeout(() => {
setShowHint(true)
      // Hide hint after sweep completes (~5s total)
      setTimeout(() => setShowHint(false), 5200)
    }, 400)
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#060606]">
      <div className="noise-overlay" />
      <div className="scan-overlay" />

      <SunCorner visible={!loading} />

      {loading && <LoadingScreen onComplete={handleEnter} />}

      {/* Canvas — always mounted so model loads during boot */}
      <div
        className="absolute inset-0"
        style={{ touchAction: 'none' }}
      >
        <MainScene
          onAnnotationClick={handleAnnotationClick}
          onModelLoaded={() => {}}
        />
      </div>

      <HUDOverlay
        visible={!loading}
        musicPlaying={playing}
        onMusicToggle={toggle}
      />

      {/* Swipe hint appears after entering, disappears after ~5s */}
      <SwipeHint visible={showHint} />

      <SectionPanel />
    </div>
  )
}
