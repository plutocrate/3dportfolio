import { EXPERIENCE } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'

export function ExperienceSection() {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">Field Operations</div>
        <h2 className="font-display text-5xl text-white leading-none tracking-wide">EXPERIENCE</h2>
      </div>
      <Separator />
      <div className="space-y-7">
        {EXPERIENCE.map((exp, idx) => (
          <div key={exp.id} className="flex gap-4">
            <div className="flex flex-col items-center shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full bg-white shrink-0" />
              {idx < EXPERIENCE.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2 min-h-[50px]" />}
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-baseline justify-between gap-2 mb-0.5">
                <h3 className="font-mono text-[12px] text-white uppercase tracking-wider">{exp.role}</h3>
                <span className="font-mono text-[10px] text-white/30 shrink-0 tabular-nums">{exp.period}</span>
              </div>
              <div className="font-body text-[13px] text-white/50 mb-3">
                {exp.company}<span className="text-white/20 mx-2">·</span>{exp.location}
              </div>
              <ul className="space-y-2">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="font-mono text-[9px] text-white/20 mt-0.5 shrink-0">/{String(i+1).padStart(2,'0')}</span>
                    <span className="font-body text-[12px] text-white/55 leading-relaxed">{h}</span>
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
