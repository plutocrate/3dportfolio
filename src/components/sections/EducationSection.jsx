import { EDUCATION, CERTIFICATIONS } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'

export function EducationSection() {
  const { go }    = useGo()
  const playClick = useClickSound()

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/58 mb-1">Training Log</div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">EDUCATION</h2>
      </div>
      <Separator />
      <div className="space-y-5">
        {EDUCATION.map((edu) => (
          <div key={edu.id} id={`education-${edu.id}`} className="flex gap-4">
            <div className="w-px bg-white/10 shrink-0 mt-1 min-h-[70px]" />
            <div className="flex-1 min-w-0 pb-1">
              <h3
                onClick={() => { playClick(); go(`/academia/education/${edu.id}`) }}
                className="font-body text-[clamp(14px,calc(13.3px+0.28vw),16px)] text-white/88 font-medium leading-snug mb-1 cursor-pointer hover:text-white transition-colors"
              >{edu.degree}</h3>
              <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] text-white/61 mb-0.5">{edu.institution}</div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/55">{edu.location}</span>
                <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/55 tabular-nums">{edu.period}</span>
              </div>
              <div className="inline-block font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] text-white px-2.5 py-1 border border-white/20">{edu.score}</div>
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/58 mb-3">Certifications</div>
        <div className="space-y-2.5">
          {CERTIFICATIONS.map((c, i) => (
            <div key={i} className="flex items-baseline justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                <span className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/73 truncate">{c.name}</span>
              </div>
              <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/57 shrink-0">{c.issuer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
