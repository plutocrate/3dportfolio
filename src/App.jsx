import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MainScene } from '@/components/3d/MainScene'
import { MobileAnnotationOverlay } from '@/components/MobileAnnotationOverlay'
import { SectionPanel } from '@/components/SectionPanel'
import { HUDOverlay } from '@/components/HUDOverlay'
import { LoadingScreen } from '@/components/LoadingScreen'
import { SunCorner } from '@/components/SunCorner'
import { SwipeHint } from '@/components/SwipeHint'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useAmbientMusic } from '@/hooks/useAmbientMusic'
import { setMusicBridge } from '@/hooks/useMusicBridge'

// Reactive mobile detection — updates on resize, matches 3D side threshold
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 1024)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return mobile
}

export default function App() {
  const [loading,    setLoading]    = useState(true)
  const [showHint,   setShowHint]   = useState(false)

  const navigate  = useNavigate()
  const location  = useLocation()

  const activeSection    = useSceneStore((s) => s.activeSection)
  const setActiveSection = useSceneStore((s) => s.setActiveSection)
  const closeSection     = useSceneStore((s) => s.closeSection)
  const { playing, start, toggle, pauseForVideo, resumeAfterVideo } = useAmbientMusic()
  setMusicBridge(pauseForVideo, resumeAfterVideo)

  const mobile = useIsMobile()

  // ── Escape key → close section ───────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeSection) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection]) // eslint-disable-line

  // ── Sync URL → store (mobile only) ───────────────────────────────────────
  // When user hits browser back, location changes → close section
  useEffect(() => {
    if (!mobile) return
    const path = location.pathname.replace('/', '').replace(/\/$/, '')
    if (path && path !== '') {
      // A section route is active
      if (activeSection !== path) setActiveSection(path)
    } else {
      // Root — close any open section
      if (activeSection) closeSection()
    }
  }, [location.pathname]) // eslint-disable-line

  // ── Sync store → URL (mobile only) ───────────────────────────────────────
  const handleAnnotationClick = (annotation) => {
    if (activeSection === annotation.id) {
      handleClose()
    } else {
      setActiveSection(annotation.id)
      if (mobile) navigate(`/${annotation.id}`)
    }
  }

  const handleClose = () => {
    closeSection()
    if (mobile) navigate('/')
  }

  const handleEnter = () => {
    start()
    setLoading(false)
    setTimeout(() => {
      setShowHint(true)
      setTimeout(() => setShowHint(false), 5200)
    }, 400)
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#060606]">
      <div className="noise-overlay" />
      <div className="scan-overlay" />

      <SunCorner visible={!loading} />

      {loading && <LoadingScreen onComplete={handleEnter} />}

      <div className="absolute inset-0">
        <MainScene
          onAnnotationClick={handleAnnotationClick}
          onModelLoaded={() => {}}
          isMobile={mobile}
        />
      </div>

      {mobile && (
        <MobileAnnotationOverlay onAnnotationClick={handleAnnotationClick} />
      )}

      <HUDOverlay
        visible={!loading}
        musicPlaying={playing}
        onMusicToggle={toggle}
      />

      <SwipeHint visible={showHint} />

      {/* Pass handleClose so both X button and back button work */}
      <SectionPanel onClose={handleClose} />
    </div>
  )
}
