import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SKILLS } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'

function SkillBar({ name, level, delay = 0 }) {
  const barRef = useRef()
  useEffect(() => {
    if (!barRef.current) return
    gsap.fromTo(barRef.current, { width: '0%' }, { width: `${level}%`, duration: 1.0, ease: 'power2.out', delay })
  }, [level, delay])
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="font-mono text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/76 uppercase tracking-wider">{name}</span>
        <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/55 tabular-nums">{level}%</span>
      </div>
      <div className="h-px w-full bg-white/8 relative overflow-hidden">
        <div ref={barRef} className="absolute left-0 top-0 h-full bg-white" style={{ width: '0%' }} />
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-ember/75 mb-1">Arsenal</div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">SKILLS</h2>
      </div>
      <Separator />
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-ember/75 mb-4">Technical</div>
        <div className="space-y-3.5">
          {SKILLS.technical.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.07} />
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-ember/75 mb-3">Domains</div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.domains.map((d) => (
            <span key={d} className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-wider px-2.5 py-1 border border-white/15 text-white/70">{d}</span>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-ember/75 mb-2">Soft Skills</div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.soft.map((s) => (
            <span key={s} className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/64 border-b border-white/10 pb-0.5">{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
