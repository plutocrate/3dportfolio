import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useClickSound } from '@/hooks/useClickSound'
import { useSceneStore } from '@/hooks/useSceneStore'
import { ProjectsSection } from './ProjectsSection'
import { ExperienceSection } from './ExperienceSection'
import { SkillsSection } from './SkillsSection'
import { EducationSection } from './EducationSection'

const TABS = [
  { id: 'projects',   label: 'Projects',   Component: ProjectsSection },
  { id: 'experience', label: 'Experience', Component: ExperienceSection },
  { id: 'skills',     label: 'Skills',     Component: SkillsSection },
  { id: 'education',  label: 'Education',  Component: EducationSection },
]

// ─── Academia — consolidates Projects / Experience / Skills / Education ─────
// under a single nav button, switched via a thin tab bar. Each tab renders
// the original, untouched section component so nothing about their layout
// or styling changes.
export function AcademiaSection() {
  // Read once on mount — lets a Constellation node (or anything else) send
  // the user straight to e.g. "Skills" via setAcademiaInitialTab() before
  // opening this section, instead of always landing on Projects. Once
  // mounted, switching tabs is purely local state so it doesn't fight you.
  const initialTab = useSceneStore((s) => s.academiaInitialTab)
  const [tab, setTab] = useState(initialTab || 'projects')
  const Active = TABS.find((t) => t.id === tab)?.Component
  const playClick = useClickSound()

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.16vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-1">
          Field Record
        </div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">ACADEMIA</h2>
      </div>

      <Separator />

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => { playClick(); setTab(t.id) }}
            className={cn(
              'font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] px-3 py-1.5 border transition-all duration-200',
              tab === t.id
                ? 'border-white/60 text-white bg-white/5'
                : 'border-white/12 text-white/35 hover:text-white/65 hover:border-white/30'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Separator />

      {Active && <Active />}
    </div>
  )
}
