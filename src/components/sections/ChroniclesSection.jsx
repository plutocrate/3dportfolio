import { ChevronRight } from 'lucide-react'
import { CHRONICLES, getReadingTime, getStatusMeta } from '@/data/chronicles'
import { Separator } from '@/components/ui/separator'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'
import { slugify } from '@/lib/routes'

export function CategoryChip({ label }) {
  return (
    <span className="font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/15 text-white/61">
      {label}
    </span>
  )
}

export function StatusChip({ status }) {
  const { label, className } = getStatusMeta(status)
  return (
    <span
      className={`font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] px-2 py-0.5 border ${className}`}
    >
      {label}
    </span>
  )
}

export function ChronicleCard({ chronicle }) {
  const { go }     = useGo()
  const playClick  = useClickSound()
  const readingTime = getReadingTime(chronicle)

  return (
    <button
      onClick={() => { playClick(); go(`/chronicles/${chronicle.id}`) }}
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
            style={{ objectPosition: chronicle.coverPosition || 'center' }}
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <CategoryChip label={chronicle.category} />
          <StatusChip status={chronicle.status} />
        </div>
        <span className="font-mono text-[clamp(8px,calc(7.35px+0.12vw),10px)] text-white/57 shrink-0 tabular-nums">
          {chronicle.date} · {readingTime}
        </span>
      </div>

      <h3 className="font-display text-[clamp(17px,calc(15.6px+0.8vw),20px)] text-white leading-tight tracking-wide mb-1 group-hover:text-white/85 transition-colors">
        {chronicle.title}
      </h3>

      {chronicle.dek && (
        <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/67 leading-relaxed mb-1">
          {chronicle.dek}
        </p>
      )}

      <span className="inline-block font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] text-white/55 group-hover:text-white/76 transition-colors border-b border-white/15 group-hover:border-white/40 pb-px mt-2">
        Read Chronicle →
      </span>
    </button>
  )
}

function groupByCategory(chronicles) {
  const groups = new Map()
  for (const c of chronicles) {
    if (!groups.has(c.category)) groups.set(c.category, [])
    groups.get(c.category).push(c)
  }
  return Array.from(groups.entries()).map(([category, items]) => ({ category, items }))
}

function ChronicleHeading({ category, items }) {
  const { go }    = useGo()
  const playClick = useClickSound()
  const count     = items.length
  const preview   = items[0]

  return (
    <button
      onClick={() => { playClick(); go(`/chronicles/topic/${slugify(category)}`) }}
      className="group w-full text-left"
    >
      {preview?.coverImage && (
        <div
          className="w-full border border-white/8 overflow-hidden mb-3"
          style={{ paddingTop: '42%', position: 'relative', background: '#0a0a0a' }}
        >
          <img
            src={preview.coverImage}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-95 group-hover:scale-[1.02] transition-all duration-500"
            style={{ objectPosition: preview.coverPosition || 'center' }}
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] text-white/57 tabular-nums">
              {count} {count === 1 ? 'Chronicle' : 'Chronicles'}
            </span>
            {preview && <StatusChip status={preview.status} />}
          </div>

          <h3 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-tight tracking-wide mb-1.5 group-hover:text-white/85 transition-colors">
            {category}
          </h3>

          {preview?.dek && (
            <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/64 leading-relaxed">
              {preview.dek}
            </p>
          )}
        </div>

        <ChevronRight
          className="w-[23px] h-[23px] sm:w-[18px] sm:h-[18px] mt-1 shrink-0 text-white/65 group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300"
        />
      </div>
    </button>
  )
}

export function ChroniclesSection() {
  const groups = groupByCategory(CHRONICLES)

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.16vw),13px)] uppercase tracking-[0.25em] text-white/58 mb-1">
          Long-Form Essays
        </div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">CHRONICLES</h2>
      </div>

      <Separator />

      {CHRONICLES.length === 0 ? (
        <div className="flex flex-col gap-2 py-4">
          <div className="font-mono text-[clamp(10px,calc(9.26px+0.18vw),13px)] text-white/55 uppercase tracking-widest">No chronicles yet.</div>
          <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/58">
            Add entries to <span className="font-mono text-white/64">CHRONICLES</span> in{' '}
            <span className="font-mono text-white/64">src/data/chronicles.js</span>
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map(({ category, items }, idx) => (
            <div key={category}>
              <ChronicleHeading category={category} items={items} />
              {idx < groups.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
