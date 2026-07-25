import { CHRONICLES, getReadingTime } from '@/data/chronicles'
import { Separator } from '@/components/ui/separator'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'

function CategoryChip({ label }) {
  return (
    <span className="font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/15 text-white/35">
      {label}
    </span>
  )
}

function ChronicleCard({ chronicle }) {
  const openChronicle = useSceneStore((s) => s.openChronicle)
  const playClick     = useClickSound()
  const readingTime    = getReadingTime(chronicle)

  return (
    <button
      onClick={() => { playClick(); openChronicle(chronicle.id) }}
      className="group w-full text-left"
    >
      {chronicle.coverImage && (
        <div
          className="w-full border border-white/8 overflow-hidden mb-3"
          style={{ paddingTop: '42%', position: 'relative', background: '#0a0a0a' }}
        >
          <img
            src={chronicle.coverImage}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-95 group-hover:scale-[1.02] transition-all duration-500"
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-2 mb-1.5">
        <CategoryChip label={chronicle.category} />
        <span className="font-mono text-[clamp(8px,calc(7.35px+0.12vw),10px)] text-white/28 shrink-0 tabular-nums">
          {chronicle.date} · {readingTime}
        </span>
      </div>

      <h3 className="font-display text-[clamp(17px,calc(15.6px+0.8vw),20px)] text-white leading-tight tracking-wide mb-1 group-hover:text-white/75 transition-colors">
        {chronicle.title}
      </h3>

      {chronicle.dek && (
        <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/45 leading-relaxed mb-1">
          {chronicle.dek}
        </p>
      )}

      <span className="inline-block font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] text-white/25 group-hover:text-white/60 transition-colors border-b border-white/15 group-hover:border-white/40 pb-px mt-2">
        Read Chronicle →
      </span>
    </button>
  )
}

export function ChroniclesSection() {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.16vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-1">
          Long-Form Essays
        </div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">CHRONICLES</h2>
      </div>

      <Separator />

      {CHRONICLES.length === 0 ? (
        <div className="flex flex-col gap-2 py-4">
          <div className="font-mono text-[clamp(10px,calc(9.26px+0.18vw),13px)] text-white/25 uppercase tracking-widest">No chronicles yet.</div>
          <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/30">
            Add entries to <span className="font-mono text-white/40">CHRONICLES</span> in{' '}
            <span className="font-mono text-white/40">src/data/chronicles.js</span>
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {CHRONICLES.map((c, idx) => (
            <div key={c.id}>
              <ChronicleCard chronicle={c} />
              {idx < CHRONICLES.length - 1 && <Separator className="mt-8" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
