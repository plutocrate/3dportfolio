import { cn } from '@/lib/utils'
import { AVAILABILITY } from '@/data/portfolio'

// Small status badge shown right under Identity. Purely data-driven off
// AVAILABILITY in data/portfolio.js — flip `status` there any time your
// situation changes and this updates everywhere automatically.
const STATUS_STYLES = {
  open: {
    dot: 'bg-emerald-400',
    ring: 'shadow-[0_0_0_3px_rgba(52,211,153,0.15)]',
    text: 'text-emerald-300/90',
    border: 'border-emerald-400/20',
    pulse: true,
  },
  limited: {
    dot: 'bg-amber-400',
    ring: 'shadow-[0_0_0_3px_rgba(251,191,36,0.15)]',
    text: 'text-amber-300/90',
    border: 'border-amber-400/20',
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

export function AvailabilitySection() {
  if (!AVAILABILITY?.label) return null
  const style = STATUS_STYLES[AVAILABILITY.status] || STATUS_STYLES.closed

  return (
    <div>
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 border',
          style.border
        )}
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <span className="relative flex h-1.5 w-1.5">
          {style.pulse && (
            <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping', style.dot)} />
          )}
          <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', style.dot, style.ring)} />
        </span>
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
