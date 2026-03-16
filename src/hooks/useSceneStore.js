import { create } from 'zustand'
// zustand v4 — named export works fine

export const useSceneStore = create((set, get) => ({
  activeSection: null,
  isAnimating: false,
  panelOpen: false,
  hoveredAnnotation: null,
  introPlayed: false,

  setActiveSection: (id) => {
    set({
      activeSection: id,
      panelOpen: id !== null,
      isAnimating: true,
    })
  },

  closeSection: () => {
    set({
      activeSection: null,
      panelOpen: false,
      isAnimating: true,
    })
  },

  setAnimating: (v) => set({ isAnimating: v }),
  setHovered: (id) => set({ hoveredAnnotation: id }),
  setIntroPlayed: () => set({ introPlayed: true }),
}))
