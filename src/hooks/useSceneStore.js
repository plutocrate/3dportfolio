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
