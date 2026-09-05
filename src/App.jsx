import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { HUDOverlay } from '@/components/HUDOverlay'
import { BalatroBackground } from '@/components/BalatroBackground'
import { LoadingScreen } from '@/components/LoadingScreen'
import { SectionPanel } from '@/components/SectionPanel'
import { SwipeHint } from '@/components/SwipeHint'
import { NewsBanner } from '@/components/NewsBanner'
import { MobileAnnotationOverlay } from '@/components/MobileAnnotationOverlay'

// ── Code-split everything that isn't needed for first paint ──────────────────
// MainScene pulls in three.js + @react-three/fiber + drei (~900 KiB
// uncompressed). It was a static import before, which meant React couldn't
// render *anything* — not even the lightweight LoadingScreen — until that
// whole chunk had downloaded and been parsed. That's what was blowing up
// FCP/LCP. Splitting it means the loading screen (gsap + lucide-react only,
// a few KB) paints immediately while the 3D chunk streams in behind it.
const MainScene = lazy(() =>
  import('@/components/3d/MainScene').then((m) => ({ default: m.MainScene }))
)

// These overlays are only ever visible after the visitor navigates into a
// specific section, so there's no reason to ship their code (and their data/
// icon imports) in the initial bundle. Each becomes its own tiny chunk that's
// fetched on demand instead of parsed up front.
const ChronicleOverlay = lazy(() => import('@/components/ChronicleOverlay').then(m => ({ default: m.ChronicleOverlay })))
const ChronicleCategoryOverlay = lazy(() => import('@/components/ChronicleCategoryOverlay').then(m => ({ default: m.ChronicleCategoryOverlay })))
const EvidenceOverlay = lazy(() => import('@/components/EvidenceOverlay').then(m => ({ default: m.EvidenceOverlay })))
const MotifOverlay = lazy(() => import('@/components/MotifOverlay').then(m => ({ default: m.MotifOverlay })))
const FailureConfessionsOverlay = lazy(() => import('@/components/FailureConfessionsOverlay').then(m => ({ default: m.FailureConfessionsOverlay })))
const GiftShopPopup = lazy(() => import('@/components/GiftShopPopup').then(m => ({ default: m.GiftShopPopup })))
const GalleryOverlay = lazy(() => import('@/components/GalleryOverlay').then(m => ({ default: m.GalleryOverlay })))
const Lightbox = lazy(() => import('@/components/Lightbox').then(m => ({ default: m.Lightbox })))

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
  const activeSection = useSceneStore((s) => s.activeSection)
  const openChronicleId = useSceneStore((s) => s.openChronicleId)
  const academiaTab = useSceneStore((s) => s.academiaTab)
  const linksTab = useSceneStore((s) => s.linksTab)
  const openChronicleCategory = useSceneStore((s) => s.openChronicleCategory)
  const galleryOverlayOpen = useSceneStore((s) => s.galleryOverlayOpen)
  const evidenceOverlayOpen = useSceneStore((s) => s.evidenceOverlayOpen)
  const motifOverlayOpen = useSceneStore((s) => s.motifOverlayOpen)
  const failureOverlayOpen = useSceneStore((s) => s.failureOverlayOpen)
  const giftPopupOpen = useSceneStore((s) => s.giftPopupOpen)

  const openChronicleObj = openChronicleId ? getChronicleById(openChronicleId) : null

  const {
    playing, start, prepare, toggle, next,
    trackName, hasMultipleTracks, isSwirlTrack,
    pauseForVideo, resumeAfterVideo,
  } = useAmbientMusic()

  setMusicBridge(pauseForVideo, resumeAfterVideo)
  const playClick = useClickSound()
  const mobile = useIsMobile()

  // Shared imperative handle: CharacterModel (inside <Canvas>) calls
  // characterAuraRef.current?.setPosition(x, y) every frame to keep the
  // DOM aura glued to the character's on-screen position.
  const characterAuraRef = useRef(null)

  // Mirror isSwirlTrack into the store so 3D-tree components (annotation
  // labels) can read it without prop-drilling through MainScene.
  const setIsSwirlTrack = useSceneStore((s) => s.setIsSwirlTrack)
  useEffect(() => {
    setIsSwirlTrack(isSwirlTrack)
  }, [isSwirlTrack, setIsSwirlTrack])

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

      <BalatroBackground active={isSwirlTrack} />

      <NewsBanner visible={!loading} />

      {loading && <LoadingScreen onComplete={handleEnter} />}

      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <Suspense fallback={null}>
          <MainScene
            onAnnotationClick={handleAnnotationClick}
            onModelLoaded={() => { }}
            isMobile={mobile}
            characterAuraRef={characterAuraRef}
          />
        </Suspense>
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
        isSwirlTrack={isSwirlTrack}
      />

      <SwipeHint visible={showHint} />

      <SectionPanel onClose={() => { playClick(); goHome() }} />

      <Suspense fallback={null}>
        <ChronicleCategoryOverlay />
        <EvidenceOverlay />
        <MotifOverlay />
        <FailureConfessionsOverlay />
        <ChronicleOverlay />
        <GalleryOverlay />
        <Lightbox />
        <GiftShopPopup />
      </Suspense>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
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
