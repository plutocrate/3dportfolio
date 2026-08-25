import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useClickSound } from '@/hooks/useClickSound'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useGo } from '@/hooks/useAppNavigation'
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

export function AcademiaSection() {
  const tab       = useSceneStore((s) => s.academiaTab) || 'projects'
  const { go }    = useGo()
  const playClick = useClickSound()
  const Active    = TABS.find((t) => t.id === tab)?.Component

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.16vw),13px)] uppercase tracking-[0.25em] text-white/58 mb-1">
          Field Record
        </div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">ACADEMIA</h2>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => { playClick(); go(`/academia/${t.id}`) }}
            className={cn(
              'font-mono text-[clamp(11.7px,calc(11px+0.18vw),14.3px)] sm:text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] px-[16px] sm:px-3 py-2.5 sm:py-1.5 border transition-all duration-200',
              tab === t.id
                ? 'border-white/60 text-white bg-white/5'
                : 'border-white/12 text-white/70 hover:text-white/85 hover:border-white/30'
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
