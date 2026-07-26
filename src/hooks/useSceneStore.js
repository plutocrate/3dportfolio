import { create } from 'zustand'

export const useSceneStore = create((set, get) => ({
  activeSection: null,
  isAnimating: false,
  panelOpen: false,
  hoveredAnnotation: null,
  introPlayed: false,

  // Font size scale for section panels (1 = default, range 0.75–1.5)
  fontSize: 1,
  setFontSize: (v) => set({ fontSize: Math.max(0.75, Math.min(1.5, v)) }),
  cameraState: null,  // { camera, size } updated each frame

  // Currently open Chronicle (full-screen glass overlay), null = closed
  openChronicleId: null,
  openChronicle: (id) => set({ openChronicleId: id }),
  closeChronicle: () => set({ openChronicleId: null }),

  // Currently open Chronicle "heading" (category) overlay — shows every
  // chronicle filed under that heading as a list. null = closed. Opening a
  // chronicle from inside this list stacks the ChronicleOverlay on top of it
  // (nesting is handled by useHistoryOverlay, so a single back-press only
  // closes the top-most layer).
  openChronicleCategory: null,
  openChronicleCategoryOverlay: (category) => set({ openChronicleCategory: category }),
  closeChronicleCategoryOverlay: () => set({ openChronicleCategory: null }),

  // Global image lightbox — any <img> across the site (Gallery grid,
  // Chronicle body images, Journal media, etc.) can open this. null src
  // means closed. Components that auto-scroll (e.g. the Gallery marquee)
  // read `lightboxSrc` to know when to pause.
  lightboxSrc: null,
  lightboxCaption: '',
  openLightbox: (src, caption = '') => set({ lightboxSrc: src, lightboxCaption: caption }),
  closeLightbox: () => set({ lightboxSrc: null, lightboxCaption: '' }),

  // Full-gallery glass overlay (About → Gallery → "View full gallery").
  // Same visual language as the Chronicle reader, but a static grid of every
  // gallery image — no marquee, no infinite loop.
  galleryOverlayOpen: false,
  openGalleryOverlay: () => set({ galleryOverlayOpen: true }),
  closeGalleryOverlay: () => set({ galleryOverlayOpen: false }),

  // ── Cabinet ──────────────────────────────────────────────────────────────
  // The Cabinet section is a "list of lists" — Evidence Locker and Motif each
  // open in their own full-screen glass overlay (same shape as Chronicles /
  // Gallery, nesting-safe via useHistoryOverlay). Gift Shop is deliberately
  // NOT one of these — it's a small centered popup, not a history-tracked
  // overlay, so it gets its own plain boolean + no history wiring.
  evidenceOverlayOpen: false,
  openEvidenceOverlay: () => set({ evidenceOverlayOpen: true }),
  closeEvidenceOverlay: () => set({ evidenceOverlayOpen: false }),

  motifOverlayOpen: false,
  openMotifOverlay: () => set({ motifOverlayOpen: true }),
  closeMotifOverlay: () => set({ motifOverlayOpen: false }),

  failureOverlayOpen: false,
  openFailureOverlay: () => set({ failureOverlayOpen: true }),
  closeFailureOverlay: () => set({ failureOverlayOpen: false }),

  // Gift Shop — a curated question "gifted" to the visitor. Not an overlay:
  // just a center-screen popup toggled by this flag. `giftQuestionIndex`
  // tracks which question from GIFT_QUESTIONS is currently showing so a
  // "reroll" can grab a different random one without repeating itself.
  giftPopupOpen: false,
  giftQuestionIndex: null,
  openGiftPopup: (index) => set({ giftPopupOpen: true, giftQuestionIndex: index }),
  closeGiftPopup: () => set({ giftPopupOpen: false }),
  rerollGift: (index) => set({ giftQuestionIndex: index }),

  // Which Academia tab to land on next time it opens — lets a deep link
  // (or anything else) send the user straight to e.g. "Projects" instead of
  // always landing on the default first tab. Read once on mount by
  // AcademiaSection; changing it doesn't fight the user once they're in there
  // switching tabs themselves.
  academiaInitialTab: 'projects',
  setAcademiaInitialTab: (tab) => set({ academiaInitialTab: tab }),

  // A DOM element id to scroll into view the next time the section panel's
  // content finishes rendering (e.g. a specific blog post or project card).
  // Set alongside setActiveSection() by anything that wants to deep-link
  // into a section instead of just opening it at the top.
  pendingScrollId: null,
  setPendingScroll: (id) => set({ pendingScrollId: id }),
  clearPendingScroll: () => set({ pendingScrollId: null }),

  setActiveSection: (id) => {
    set({ activeSection: id, panelOpen: id !== null, isAnimating: true })
  },
  closeSection: () => {
    set({ activeSection: null, panelOpen: false, isAnimating: true })
  },
  setAnimating: (v) => set({ isAnimating: v }),
  setHovered: (id) => set({ hoveredAnnotation: id }),
  setIntroPlayed: () => set({ introPlayed: true }),
  setCameraState: (state) => set({ cameraState: state }),
}))
