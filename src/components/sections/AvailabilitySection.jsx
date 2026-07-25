import { cn } from '@/lib/utils'
import { AVAILABILITY } from '@/data/portfolio'

// Status badge driven off AVAILABILITY in data/portfolio.js — flip `status`
// there any time your situation changes and every usage updates together.
//
// Two variants:
//   "chip" — compact pill (dot + short label only), meant to sit inline
//            right next to the name/heading (e.g. About → Identity).
//   "full" — larger badge with the longer label + optional note underneath,
//            used where there's room to explain (e.g. Talk section).
const STATUS_STYLES = {
  open: {
    dot: 'bg-emerald-400',
    ring: 'shadow-[0_0_0_3px_rgba(52,211,153,0.15)]',
    text: 'text-emerald-300/90',
    border: 'border-emerald-400/25',
    pulse: true,
  },
  limited: {
    dot: 'bg-amber-400',
    ring: 'shadow-[0_0_0_3px_rgba(251,191,36,0.15)]',
    text: 'text-amber-300/90',
    border: 'border-amber-400/25',
    pulse: false,
  },
  closed: {
    dot: 'bg-white/40',
    ring: '',
    text: 'text-white/45',
    border: 'border-white/12',
    pulse: false,
  },
}

export function AvailabilitySection({ variant = 'full' }) {
  if (!AVAILABILITY?.label) return null
  const style = STATUS_STYLES[AVAILABILITY.status] || STATUS_STYLES.closed

  const dot = (
    <span className="relative flex h-1.5 w-1.5 shrink-0">
      {style.pulse && (
        <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping', style.dot)} />
      )}
      <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', style.dot, style.ring)} />
    </span>
  )

  if (variant === 'chip') {
    const chipLabel = AVAILABILITY.chipLabel || AVAILABILITY.label
    return (
      <span
        className={cn('inline-flex items-center gap-1.5 px-2 py-[3px] border align-middle', style.border)}
        style={{ background: 'rgba(255,255,255,0.025)' }}
      >
        {dot}
        <span className={cn('font-mono text-[9px] leading-none uppercase tracking-[0.12em] whitespace-nowrap', style.text)}>
          {chipLabel}
        </span>
      </span>
    )
  }

  return (
    <div>
      <div
        className={cn('inline-flex items-center gap-2 px-3 py-1.5 border', style.border)}
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        {dot}
        <span className={cn('font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.16em]', style.text)}>
          {AVAILABILITY.label}
        </span>
      </div>

      {AVAILABILITY.note && (
        <p className="mt-2 font-body text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/35">
          {AVAILABILITY.note}
        </p>
      )}
    </div>
  )
}
