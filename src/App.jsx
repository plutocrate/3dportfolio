import { useState, useEffect } from 'react'
import { MainScene } from '@/components/3d/MainScene'
import { MobileAnnotationOverlay } from '@/components/MobileAnnotationOverlay'
import { NewsBanner } from '@/components/NewsBanner'
import { SectionPanel } from '@/components/SectionPanel'
import { ChronicleOverlay } from '@/components/ChronicleOverlay'
import { ChronicleCategoryOverlay } from '@/components/ChronicleCategoryOverlay'
import { EvidenceOverlay } from '@/components/EvidenceOverlay'
import { MotifOverlay } from '@/components/MotifOverlay'
import { FailureConfessionsOverlay } from '@/components/FailureConfessionsOverlay'
import { GiftShopPopup } from '@/components/GiftShopPopup'
import { GalleryOverlay } from '@/components/GalleryOverlay'
import { Lightbox } from '@/components/Lightbox'
import { HUDOverlay } from '@/components/HUDOverlay'
import { LoadingScreen } from '@/components/LoadingScreen'
import { SunCorner } from '@/components/SunCorner'
import { SwipeHint } from '@/components/SwipeHint'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useAmbientMusic } from '@/hooks/useAmbientMusic'
import { useClickSound } from '@/hooks/useClickSound'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { setMusicBridge, setUserWantsMusic } from '@/hooks/useMusicBridge'
import { NavigationProvider, useGo } from '@/hooks/useAppNavigation'
import { getChronicleById } from '@/data/chronicles'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 1024)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return mobile
}

function AppShell({ loading, showHint, onEnter }) {
  const { go, goHome, goParent } = useGo()
  const activeSection         = useSceneStore((s) => s.activeSection)
  const openChronicleId       = useSceneStore((s) => s.openChronicleId)
  const academiaTab           = useSceneStore((s) => s.academiaTab)
  const linksTab              = useSceneStore((s) => s.linksTab)
  const openChronicleCategory = useSceneStore((s) => s.openChronicleCategory)
  const galleryOverlayOpen    = useSceneStore((s) => s.galleryOverlayOpen)
  const evidenceOverlayOpen   = useSceneStore((s) => s.evidenceOverlayOpen)
  const motifOverlayOpen      = useSceneStore((s) => s.motifOverlayOpen)
  const failureOverlayOpen    = useSceneStore((s) => s.failureOverlayOpen)
  const giftPopupOpen         = useSceneStore((s) => s.giftPopupOpen)

  const openChronicleObj = openChronicleId ? getChronicleById(openChronicleId) : null

  const {
    playing, start, prepare, toggle, next,
    trackName, hasMultipleTracks,
    pauseForVideo, resumeAfterVideo,
  } = useAmbientMusic()

  setMusicBridge(pauseForVideo, resumeAfterVideo)
  const playClick = useClickSound()
  const mobile = useIsMobile()

  useDocumentMeta({
    activeSection,
    chronicle: openChronicleObj,
    academiaTab,
    linksTab,
    category: openChronicleCategory,
    overlay: galleryOverlayOpen ? 'gallery'
      : evidenceOverlayOpen ? 'evidence'
      : motifOverlayOpen ? 'motif'
      : failureOverlayOpen ? 'failure'
      : giftPopupOpen ? 'gift'
      : null,
  })

  useEffect(() => {
    const nestedOpen = Boolean(
      openChronicleId ||
      openChronicleCategory ||
      galleryOverlayOpen ||
      evidenceOverlayOpen ||
      motifOverlayOpen ||
      failureOverlayOpen ||
      giftPopupOpen
    )

    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return
      if (window.history.state?.overlay) return
      playClick()
      if (nestedOpen) goParent()
      else if (activeSection) goHome()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, goHome, goParent, playClick, openChronicleId, openChronicleCategory, galleryOverlayOpen, evidenceOverlayOpen, motifOverlayOpen, failureOverlayOpen, giftPopupOpen])

  const handleEnter = (withMusic) => {
    setUserWantsMusic(withMusic)
    if (withMusic) start()
    else prepare()
    onEnter(withMusic)
  }

  const handleAnnotationClick = (annotation) => {
    if (activeSection === annotation.id) goHome()
    else go(`/${annotation.id}`)
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#060606]">
      <div className="noise-overlay" />
      <div className="scan-overlay" />

      <SunCorner visible={!loading} />
      <NewsBanner visible={!loading} />

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
        onMusicNext={next}
        trackName={trackName}
        hasMultipleTracks={hasMultipleTracks}
      />

      <SwipeHint visible={showHint} />

      <SectionPanel onClose={() => { playClick(); goHome() }} />

      <ChronicleCategoryOverlay />
      <EvidenceOverlay />
      <MotifOverlay />
      <FailureConfessionsOverlay />
      <ChronicleOverlay />
      <GalleryOverlay />
      <Lightbox />
      <GiftShopPopup />
    </div>
  )
}

export default function App() {
  const [loading,  setLoading]  = useState(true)
  const [showHint, setShowHint] = useState(false)

  const handleEntered = () => {
    setLoading(false)
    const path = window.location.pathname.replace(/\/+$/, '') || '/'
    if (path === '/') {
      setTimeout(() => {
        setShowHint(true)
        setTimeout(() => setShowHint(false), 5200)
      }, 400)
    }
  }

  return (
    <NavigationProvider enabled={!loading}>
      <AppShell
        loading={loading}
        showHint={showHint}
        onEnter={handleEntered}
      />
    </NavigationProvider>
  )
}
