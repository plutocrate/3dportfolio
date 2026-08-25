import { PROJECTS } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'
import { ArrowUpRight } from 'lucide-react'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'

export function ProjectsSection() {
  const { go }    = useGo()
  const playClick = useClickSound()

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/58 mb-1">Deployments</div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">PROJECTS</h2>
      </div>
      <Separator />
      <div className="space-y-6">
        {PROJECTS.map((proj, idx) => (
          <div key={proj.id} id={`project-${proj.id}`} className="group">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/52 tabular-nums">{String(idx+1).padStart(2,'0')}</span>
              <button
                type="button"
                onClick={() => { playClick(); go(`/academia/projects/${proj.id}`) }}
                className="font-display text-[clamp(16px,calc(14.6px+0.6vw),19px)] text-white tracking-wider leading-none hover:text-white/76 transition-colors border-b border-transparent hover:border-white/30 pb-0.5 text-left"
              >
                {proj.name.toUpperCase()}
              </button>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Open ${proj.name}`}
                  className="text-white/65 hover:text-white/90 transition-colors shrink-0 p-1 -m-1"
                >
                  <ArrowUpRight className="w-[18px] h-[18px] sm:w-[14px] sm:h-[14px]" />
                </a>
              )}
              <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/57 ml-auto shrink-0">{proj.period}</span>
            </div>
            <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] text-white/59 uppercase tracking-widest mb-2 pl-8">{proj.subtitle}</div>
            <p className="font-body text-[clamp(14px,calc(13.3px+0.28vw),16px)] text-white/73 leading-relaxed pl-8 mb-3">{proj.description}</p>
            <div className="flex flex-wrap gap-2 pl-8">
              {proj.tags.map((tag) => (
                <span key={tag} className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] uppercase tracking-wider px-2.5 py-0.5 border border-white/12 text-white/61 group-hover:border-white/22 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
            {idx < PROJECTS.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
      </div>
    </div>
  )
}
