import { PROJECTS } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'

export function ProjectsSection() {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">Deployments</div>
        <h2 className="font-display text-5xl text-white leading-none tracking-wide">PROJECTS</h2>
      </div>
      <Separator />
      <div className="space-y-6">
        {PROJECTS.map((proj, idx) => (
          <div key={proj.id} className="group">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-mono text-[9px] text-white/20 tabular-nums">{String(idx+1).padStart(2,'0')}</span>
							{proj.link ? (
  <a href={proj.link} target="_blank" rel="noopener noreferrer"
    className="font-display text-[28px] text-white tracking-wider leading-none hover:text-white/60 transition-colors border-b border-white/20 hover:border-white/50 pb-0.5">
    {proj.name.toUpperCase()}
  </a>
) : (
  <h3 className="font-display text-[28px] text-white tracking-wider leading-none">{proj.name.toUpperCase()}</h3>
)}
              <span className="font-mono text-[9px] text-white/28 ml-auto shrink-0">{proj.period}</span>
            </div>
            <div className="font-mono text-[10px] text-white/32 uppercase tracking-widest mb-2 pl-8">{proj.subtitle}</div>
            <p className="font-body text-[13px] text-white/55 leading-relaxed pl-8 mb-3">{proj.description}</p>
            <div className="flex flex-wrap gap-2 pl-8">
              {proj.tags.map((tag) => (
                <span key={tag} className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 border border-white/12 text-white/35 group-hover:border-white/22 transition-colors">
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
