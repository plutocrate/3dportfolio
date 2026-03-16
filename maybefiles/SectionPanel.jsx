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
  TalkSection,
  BlogSection,
} from '@/components/sections'

const SECTION_MAP = {
  about:      AboutSection,
  experience: ExperienceSection,
  projects:   ProjectsSection,
  skills:     SkillsSection,
  education:  EducationSection,
  talk:       TalkSection,
  blog:       BlogSection,
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
      // CSS transition — GPU composited, smooth on mobile
      panelRef.current.style.transform = 'translateX(0%)'
      panelRef.current.style.opacity = '1'
      if (contentRef.current?.children?.length) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out', delay: 0.65 }
        )
      }
    } else {
      panelRef.current.style.transform = 'translateX(100%)'
      panelRef.current.style.opacity = '0'
    }
  }, [panelOpen, activeSection])

  const SectionContent = activeSection ? SECTION_MAP[activeSection] : null

  return (
    <div
      ref={panelRef}
      className="fixed top-0 right-0 h-full w-full sm:w-[360px] md:w-[380px] z-50 pointer-events-auto"
      style={{ transform: 'translateX(100%)', opacity: 0, transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease 0.3s' }}
    >
      <div className="absolute inset-0 bg-[#070707]/97 backdrop-blur-2xl border-l border-white/8" />

      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/8 flex items-center justify-center pointer-events-none">
        <div
          className="font-mono text-[9px] text-white/15 uppercase tracking-[0.4em] select-none"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {activeSection}
        </div>
      </div>

      <button
        onClick={() => { playClick(); closeSection() }}
        className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/50 transition-all duration-200 font-mono text-base"
        aria-label="Close"
      >
        ×
      </button>

      <div className="relative h-full overflow-y-auto pt-16 pb-12 px-8 pl-10">
        <div ref={contentRef}>
          {SectionContent && <SectionContent />}
        </div>
      </div>

      <div className="absolute bottom-0 left-px right-0 border-t border-white/8 px-8 pl-10 py-3 flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/18 uppercase tracking-widest">
          prathamis.cool
        </span>
        <span className="font-mono text-[9px] text-white/18 tabular-nums">
          {new Date().getFullYear()}
        </span>
      </div>
    </div>
  )
}
