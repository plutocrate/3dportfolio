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
