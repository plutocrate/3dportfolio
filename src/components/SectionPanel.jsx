import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import {
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  EducationSection,
} from '@/components/sections'

const SECTION_MAP = {
  about:      AboutSection,
  experience: ExperienceSection,
  projects:   ProjectsSection,
  skills:     SkillsSection,
  education:  EducationSection,
}

export function SectionPanel() {
  const panelOpen     = useSceneStore((s) => s.panelOpen)
  const activeSection = useSceneStore((s) => s.activeSection)
  const closeSection  = useSceneStore((s) => s.closeSection)
  const panelRef      = useRef()
  const contentRef    = useRef()
  const playClick     = useClickSound()

  useEffect(() => {
    if (!panelRef.current) return

    if (panelOpen) {
      gsap.fromTo(panelRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
      if (contentRef.current?.children?.length) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.045, ease: 'power2.out', delay: 0.22 }
        )
      }
    } else {
      gsap.to(panelRef.current, { x: '100%', opacity: 0, duration: 0.35, ease: 'power3.in' })
    }
  }, [panelOpen, activeSection])

  const SectionContent = activeSection ? SECTION_MAP[activeSection] : null

  return (
    <div
      ref={panelRef}
      className="fixed top-0 right-0 h-full w-full sm:w-[360px] md:w-[380px] z-50 pointer-events-auto"
      style={{ transform: 'translateX(100%)', opacity: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#070707]/97 backdrop-blur-2xl border-l border-white/8" />

      {/* Left edge label */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/8 flex items-center justify-center pointer-events-none">
        <div
          className="font-mono text-[9px] text-white/15 uppercase tracking-[0.4em] select-none"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {activeSection}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => { playClick(); closeSection() }}
        className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/50 transition-all duration-200 font-mono text-base"
        aria-label="Close"
      >
        ×
      </button>

      {/* Scrollable content */}
      <div className="relative h-full overflow-y-auto pt-16 pb-12 px-8 pl-10">
        <div ref={contentRef}>
          {SectionContent && <SectionContent />}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-px right-0 border-t border-white/8 px-8 pl-10 py-3 flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/18 uppercase tracking-widest">
          plutocrate.github.io/3dportfolio
        </span>
        <span className="font-mono text-[9px] text-white/18 tabular-nums">
          {new Date().getFullYear()}
        </span>
      </div>
    </div>
  )
}
