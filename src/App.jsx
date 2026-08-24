import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
import { setMusicBridge } from '@/hooks/useMusicBridge'
import { getChronicleById } from '@/data/chronicles'
import { pathForState, parseDeepLink } from '@/lib/routes'

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

  const activeSection     = useSceneStore((s) => s.activeSection)
  const setActiveSection  = useSceneStore((s) => s.setActiveSection)
  const closeSection      = useSceneStore((s) => s.closeSection)
  const openChronicleId   = useSceneStore((s) => s.openChronicleId)
  const openChronicle     = useSceneStore((s) => s.openChronicle)
  const { playing, start, prepare, toggle, next, trackName, hasMultipleTracks, pauseForVideo, resumeAfterVideo } = useAmbientMusic()
  setMusicBridge(pauseForVideo, resumeAfterVideo)
  const playClick = useClickSound()

  const mobile = useIsMobile()

  // ── Real per-route SEO ───────────────────────────────────────────────────
  // Each Chronicle (and each section) gets its own indexable <title>,
  // description, canonical URL and OG/Twitter tags — see useDocumentMeta.
  const openChronicleObj = openChronicleId ? getChronicleById(openChronicleId) : null
  useDocumentMeta(activeSection, openChronicleObj)

  // Parse whatever URL the visitor actually landed on (a shared Chronicle
  // link, a bookmarked section, a search-result click) exactly once, before
  // anything navigates it away. Applied after the loading screen finishes
  // in handleEnter below, so a direct link to /chronicles/some-essay opens
  // straight to that essay instead of always landing on the home view.
  const [deepLink] = useState(() => parseDeepLink(window.location.pathname))

  // ── State -> URL sync ────────────────────────────────────────────────────
  // The address bar always reflects whatever is actually open — a section
  // or an individual Chronicle — on both desktop and mobile, so every piece
  // of content has its own real, shareable, crawlable URL. Uses replaceState
  // (not pushState) so it never disturbs the overlay-nesting back-button
  // logic each overlay already owns via useHistoryOverlay.
  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/+$/, '') // '' when BASE_URL is just '/'
    const path = pathForState({ activeSection, openChronicleId })
    const target = (path === '/' ? base : base + path).replace(/\/+$/, '') || '/'
    const current = window.location.pathname.replace(/\/+$/, '') || '/'
    if (current !== target) {
      window.history.replaceState(window.history.state, '', target)
    }
  }, [activeSection, openChronicleId])

  // ── Escape key → close section ───────────────────────────────────────────
  // Guarded so this only fires when no overlay (Chronicle, Chronicle
  // category, Gallery, Lightbox…) is currently stacked on top of the
  // section panel — each of those owns its own Escape handling via
  // useHistoryOverlay and pushes a history entry while open. If one is
  // open, `history.state.overlay` will be set and we defer to it instead
  // of also closing the whole panel underneath.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeSection && !window.history.state?.overlay) {
        playClick()
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
    // Only the first segment maps to a section (e.g. "chronicles" out of
    // "/chronicles/some-essay") — a nested Chronicle id is handled by its
    // own overlay history logic + the state->URL sync above, not here.
    const path = location.pathname.split('/').filter(Boolean)[0] || ''
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

  const handleEnter = (withMusic) => {
    if (withMusic) {
      start()
    } else {
      prepare() // sets up the <audio> element silently so the HUD toggle still works later
    }
    setLoading(false)

    // Land the visitor on whatever they actually linked to (a specific
    // Chronicle, or a section) instead of always resetting to home.
    if (deepLink) {
      setActiveSection(deepLink.section)
      if (deepLink.chronicleId) openChronicle(deepLink.chronicleId)
    } else {
      setTimeout(() => {
        setShowHint(true)
        setTimeout(() => setShowHint(false), 5200)
      }, 400)
    }
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

      {/* Pass handleClose so both X button and back button work */}
      <SectionPanel onClose={handleClose} />

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
