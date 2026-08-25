import { PERSONAL } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'
import { AvailabilitySection } from './AvailabilitySection'
import { GallerySection } from './GallerySection'
import { LinksSection } from './LinksSection'

export function AboutSection() {
  return (
    <div className="space-y-5">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/58 mb-2">Identity</div>
        <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 mb-1">
          <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">
            {PERSONAL.name.toUpperCase()}
          </h2>
          <AvailabilitySection variant="chip" />
        </div>
        <p className="font-mono text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/67 tracking-widest uppercase">{PERSONAL.title}</p>
      </div>

      <Separator />

      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/58 mb-2">Summary</div>
        <p className="font-body text-[clamp(14px,calc(13.3px+0.28vw),16px)] text-white/81 leading-relaxed whitespace-pre-line">{PERSONAL.summary}</p>
      </div>

      <Separator />

      <GallerySection />

      <Separator />

      <LinksSection />
    </div>
  )
}
