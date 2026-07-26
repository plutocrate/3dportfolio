import { Share2 } from 'lucide-react'
import { CONSTELLATIONS } from '@/data/constellations'
import { Separator } from '@/components/ui/separator'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'

function ConstellationCard({ constellation }) {
  const openConstellation = useSceneStore((s) => s.openConstellation)
  const playClick          = useClickSound()
  const starCount           = constellation.nodes.length

  return (
    <button
      onClick={() => { playClick(); openConstellation(constellation.id) }}
      className="group w-full text-left"
    >
      {/* Tiny static preview of the web — same coordinate space as the real
          overlay, just rendered small and inert. Gives the list a bit of the
          constellation's actual shape instead of a plain text row. */}
      <div
        className="relative w-full border border-white/8 overflow-hidden mb-3"
        style={{ paddingTop: '42%', background: '#0a0a0a' }}
      >
        <svg
          viewBox="0 0 100 42"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        >
          {constellation.edges.map(([a, b], i) => {
            const na = constellation.nodes.find((n) => n.id === a)
            const nb = constellation.nodes.find((n) => n.id === b)
            if (!na || !nb) return null
            return (
              <line
                key={i}
                x1={na.x} y1={na.y * 0.42}
                x2={nb.x} y2={nb.y * 0.42}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="0.3"
              />
            )
          })}
          {constellation.nodes.map((n) => (
            <circle
              key={n.id}
              cx={n.x} cy={n.y * 0.42}
              r={n.size === 'lg' ? 1.4 : n.size === 'sm' ? 0.8 : 1.1}
              fill="rgba(255,255,255,0.75)"
            />
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] text-white/28 tabular-nums">
          {starCount} {starCount === 1 ? 'Star' : 'Stars'}
        </span>
      </div>

      <h3 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-tight tracking-wide mb-1 group-hover:text-white/75 transition-colors">
        {constellation.title}
      </h3>

      {constellation.description && (
        <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/45 leading-relaxed mb-1">
          {constellation.description}
        </p>
      )}

      <span className="inline-flex items-center gap-1.5 font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] text-white/25 group-hover:text-white/60 transition-colors border-b border-white/15 group-hover:border-white/40 pb-px mt-2">
        <Share2 size={11} />
        Open Constellation
      </span>
    </button>
  )
}

export function ConstellationSection() {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.16vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-1">
          Mind Maps
        </div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">CONSTELLATION</h2>
      </div>

      <Separator />

      {CONSTELLATIONS.length === 0 ? (
        <div className="flex flex-col gap-2 py-4">
          <div className="font-mono text-[clamp(10px,calc(9.26px+0.18vw),13px)] text-white/25 uppercase tracking-widest">No constellations yet.</div>
          <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/30">
            Add entries to <span className="font-mono text-white/40">CONSTELLATIONS</span> in{' '}
            <span className="font-mono text-white/40">src/data/constellations.js</span>
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {CONSTELLATIONS.map((c, idx) => (
            <div key={c.id}>
              <ConstellationCard constellation={c} />
              {idx < CONSTELLATIONS.length - 1 && <Separator className="mt-8" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
