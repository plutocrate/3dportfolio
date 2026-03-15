import { create } from 'zustand'
// zustand v4 — named export works fine

export const useSceneStore = create((set, get) => ({
  // Currently active annotation/section id — null means default overview
  activeSection: null,
  // Whether the camera is currently animating
  isAnimating: false,
  // Whether the side panel is open
  panelOpen: false,
  // Hovered annotation id
  hoveredAnnotation: null,
  // Whether intro animation has played
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
