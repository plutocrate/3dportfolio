import { PERSONAL, HOBBIES, CERTIFICATIONS } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'

export function AboutSection() {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-2">Identity</div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide mb-1">
            {PERSONAL.name.toUpperCase()}
          </h2>
        <p className="font-mono text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/45 tracking-widest uppercase">{PERSONAL.title}</p>
      </div>

      <Separator />

      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-2">Summary</div>
        <p className="font-body text-[clamp(14px,calc(13.3px+0.28vw),16px)] text-white/68 leading-relaxed">{PERSONAL.summary}</p>
      </div>

      <Separator />

      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-3">Contact</div>
        <div className="space-y-2">
          {[
            { label: 'Email',    value: PERSONAL.email },
            { label: 'Phone',    value: PERSONAL.phone },
            { label: 'Web',      value: PERSONAL.website },
            { label: 'LinkedIn', value: PERSONAL.linkedin },
            { label: 'Location', value: PERSONAL.location },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-3">
              <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/25 w-16 shrink-0 uppercase tracking-wider">{label}</span>
              <span className="font-mono text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/60 truncate">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-2">Interests</div>
        <div className="flex flex-wrap gap-2">
          {HOBBIES.map((h) => (
            <span key={h} className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-wider px-2.5 py-1 border border-white/12 text-white/40">
              {h}
            </span>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-2">Certifications</div>
        <div className="space-y-2">
          {CERTIFICATIONS.map((c) => (
            <div key={c.name} className="flex items-start justify-between gap-2">
              <span className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/60 leading-snug">{c.name}</span>
              <span className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-white/30 shrink-0 mt-0.5">{c.issuer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
