import { create } from 'zustand'
import { randomGiftIndex } from '@/data/giftQuestions'
import { LINK_COLLECTIONS } from '@/data/portfolio'

export const useSceneStore = create((set, get) => ({
  activeSection: null,
  isAnimating: false,
  panelOpen: false,
  hoveredAnnotation: null,
  introPlayed: false,

  // Mirrors useAmbientMusic()'s isSwirlTrack so any component deep in the
  // 3D tree (annotation labels, etc.) can react to it without prop-drilling.
  isSwirlTrack: false,
  setIsSwirlTrack: (v) => set({ isSwirlTrack: v }),

  fontSize: 1,
  setFontSize: (v) => set({ fontSize: Math.max(0.75, Math.min(1.5, v)) }),
  cameraState: null,

  openChronicleId: null,
  openChronicle: (id) => set({ openChronicleId: id }),
  closeChronicle: () => set({ openChronicleId: null }),

  openChronicleCategory: null,
  openChronicleCategoryOverlay: (category) => set({ openChronicleCategory: category }),
  closeChronicleCategoryOverlay: () => set({ openChronicleCategory: null }),

  lightboxSrc: null,
  lightboxCaption: '',
  openLightbox: (src, caption = '') => set({ lightboxSrc: src, lightboxCaption: caption }),
  closeLightbox: () => set({ lightboxSrc: null, lightboxCaption: '' }),

  galleryOverlayOpen: false,
  openGalleryOverlay: () => set({ galleryOverlayOpen: true }),
  closeGalleryOverlay: () => set({ galleryOverlayOpen: false }),

  evidenceOverlayOpen: false,
  openEvidenceOverlay: () => set({ evidenceOverlayOpen: true }),
  closeEvidenceOverlay: () => set({ evidenceOverlayOpen: false }),

  motifOverlayOpen: false,
  openMotifOverlay: () => set({ motifOverlayOpen: true }),
  closeMotifOverlay: () => set({ motifOverlayOpen: false }),

  failureOverlayOpen: false,
  openFailureOverlay: () => set({ failureOverlayOpen: true }),
  closeFailureOverlay: () => set({ failureOverlayOpen: false }),

  giftPopupOpen: false,
  giftQuestionIndex: null,
  openGiftPopup: (index) => set({ giftPopupOpen: true, giftQuestionIndex: index }),
  closeGiftPopup: () => set({ giftPopupOpen: false }),
  rerollGift: (index) => set({ giftQuestionIndex: index }),

  academiaTab: 'projects',
  setAcademiaTab: (tab) => set({ academiaTab: tab }),
  academiaInitialTab: 'projects',
  setAcademiaInitialTab: (tab) => set({ academiaInitialTab: tab, academiaTab: tab }),

  linksTab: LINK_COLLECTIONS[0]?.id || null,
  setLinksTab: (tab) => set({ linksTab: tab }),

  pendingScrollId: null,
  setPendingScroll: (id) => set({ pendingScrollId: id }),
  clearPendingScroll: () => set({ pendingScrollId: null }),

  // Apply a parsed route in one shot so URL → UI never leaves stale overlays
  // open. Called from NavigationProvider whenever the location changes.
  applyRoute: (route) => {
    const r = route || {}
    const overlay = r.overlay || null
    const next = {
      activeSection: r.section || null,
      panelOpen: Boolean(r.section),
      isAnimating: true,
      openChronicleId: r.chronicleId || null,
      openChronicleCategory: r.category || null,
      academiaTab: r.academiaTab || 'projects',
      academiaInitialTab: r.academiaTab || 'projects',
      linksTab: r.linksTab || get().linksTab || LINK_COLLECTIONS[0]?.id || null,
      pendingScrollId: r.scrollId || null,
      galleryOverlayOpen: overlay === 'gallery',
      evidenceOverlayOpen: overlay === 'evidence',
      motifOverlayOpen: overlay === 'motif',
      failureOverlayOpen: overlay === 'failure',
      giftPopupOpen: overlay === 'gift',
    }
    if (overlay === 'gift' && get().giftQuestionIndex == null) {
      next.giftQuestionIndex = randomGiftIndex()
    }
    set(next)
  },

  setActiveSection: (id) => {
    set({ activeSection: id, panelOpen: id !== null, isAnimating: true })
  },
  closeSection: () => {
    set({
      activeSection: null,
      panelOpen: false,
      isAnimating: true,
      openChronicleId: null,
      openChronicleCategory: null,
      galleryOverlayOpen: false,
      evidenceOverlayOpen: false,
      motifOverlayOpen: false,
      failureOverlayOpen: false,
      giftPopupOpen: false,
    })
  },
  setAnimating: (v) => set({ isAnimating: v }),
  setHovered: (id) => set({ hoveredAnnotation: id }),
  setIntroPlayed: () => set({ introPlayed: true }),
  setCameraState: (state) => set({ cameraState: state }),
}))
