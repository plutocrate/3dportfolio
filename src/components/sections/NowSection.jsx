import { NOW } from '@/data/portfolio'

// "What I'm up to right now" snapshot — sits between Summary and Gallery.
// Fully data-driven off NOW in data/portfolio.js; rows with an empty value
// are hidden automatically, so it's safe to leave e.g. `reading: ""`.
const ROWS = [
  { key: 'building', label: 'Building' },
  { key: 'learning', label: 'Learning' },
  { key: 'reading',  label: 'Reading' },
]

export function NowSection() {
  const rows = ROWS
    .map((r) => ({ ...r, value: NOW[r.key] }))
    .filter((r) => Boolean(r.value))

  if (rows.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-ember/75">Now</div>
        {NOW.updated && (
          <span className="font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.14em] text-white/52 tabular-nums">
            Updated {NOW.updated}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.key} className="flex gap-4">
            <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] text-ember/75 w-16 sm:w-20 shrink-0 pt-0.5">
              {row.label}
            </span>
            <span className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/81 leading-relaxed">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
