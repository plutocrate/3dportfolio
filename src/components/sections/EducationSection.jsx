import { EDUCATION, CERTIFICATIONS } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'

export function EducationSection() {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">Training Log</div>
        <h2 className="font-display text-5xl text-white leading-none tracking-wide">EDUCATION</h2>
      </div>
      <Separator />
      <div className="space-y-5">
        {EDUCATION.map((edu) => (
          <div key={edu.id} className="flex gap-4">
            <div className="w-px bg-white/10 shrink-0 mt-1 min-h-[70px]" />
            <div className="flex-1 min-w-0 pb-1">
              <h3 className="font-body text-[13px] text-white/80 font-medium leading-snug mb-1">{edu.degree}</h3>
              <div className="font-mono text-[10px] text-white/35 mb-0.5">{edu.institution}</div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] text-white/25">{edu.location}</span>
                <span className="font-mono text-[9px] text-white/25 tabular-nums">{edu.period}</span>
              </div>
              <div className="inline-block font-mono text-[10px] text-white px-2.5 py-1 border border-white/20">{edu.score}</div>
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-3">Certifications</div>
        <div className="space-y-2.5">
          {CERTIFICATIONS.map((c, i) => (
            <div key={i} className="flex items-baseline justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                <span className="font-body text-[12px] text-white/55 truncate">{c.name}</span>
              </div>
              <span className="font-mono text-[9px] text-white/28 shrink-0">{c.issuer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
