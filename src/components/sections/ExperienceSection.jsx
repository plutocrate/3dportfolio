import { EXPERIENCE } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'

export function ExperienceSection() {
  const { go }    = useGo()
  const playClick = useClickSound()

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-1">Field Operations</div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">EXPERIENCE</h2>
      </div>
      <Separator />
      <div className="space-y-7">
        {EXPERIENCE.map((exp, idx) => (
          <div key={exp.id} id={`experience-${exp.id}`} className="flex gap-4">
            <div className="flex flex-col items-center shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full bg-white shrink-0" />
              {idx < EXPERIENCE.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2 min-h-[50px]" />}
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-baseline justify-between gap-2 mb-0.5">
                <button
                  type="button"
                  onClick={() => { playClick(); go(`/academia/experience/${exp.id}`) }}
                  className="font-mono text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white uppercase tracking-wider hover:text-white/70 transition-colors text-left"
                >
                  {exp.role}
                </button>
                <span className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] text-white/30 shrink-0 tabular-nums">{exp.period}</span>
              </div>
              <div className="font-body text-[clamp(14px,calc(13.3px+0.28vw),16px)] text-white/50 mb-3">
                {exp.company}<span className="text-white/20 mx-2">·</span>{exp.location}
              </div>
              <ul className="space-y-2">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/20 mt-0.5 shrink-0">/{String(i+1).padStart(2,'0')}</span>
                    <span className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/55 leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
