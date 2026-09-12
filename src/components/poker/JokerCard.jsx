import { cn } from '@/lib/utils'
import { jokerVisual } from '@/lib/jokerVisuals'
import { useDetailOverlay } from '@/hooks/useDetailOverlay'

// Jokers deliberately look NOTHING like the poker cards: an asymmetric
// notched shape, a dark holographic gradient instead of white card stock.
// On top of that shared shape, every Joker gets its OWN icon, accent color,
// and background pattern (see jokerVisuals.js) — so a shelf of them reads
// as 30 distinct characters, not one rectangle recolored with different
// text. Hovering (or tapping the small "i" badge on touch) reveals a full
// detail overlay spelling out exactly what the Joker does.
export function JokerCard({ joker, onClick, locked, disabled, tilt = 0 }) {
  const { open: detailOpen, setOpen: setDetailOpen, containerRef } = useDetailOverlay()
  const { Icon, label, accent } = jokerVisual(joker)

  return (
    <button
      ref={containerRef}
      type="button"
      onClick={() => !disabled && !locked && onClick?.(joker.id)}
      disabled={disabled}
      className={cn(
        'joker-card group relative flex-shrink-0 select-none rounded-[14px] p-3.5 text-left font-mono transition-all duration-200',
        locked && 'joker-card-locked',
        disabled && !locked && 'cursor-not-allowed opacity-40'
      )}
      style={{
        width: 'clamp(122px, 30vw, 168px)',
        height: 'clamp(122px, 30vw, 168px)',
        transform: `rotate(${locked ? 0 : tilt}deg) translateY(${locked ? -6 : 0}px)`,
      }}
    >
      <span className="joker-card-noise" aria-hidden />
      <span
        className="joker-card-pattern"
        aria-hidden
        style={{
          background:
            `radial-gradient(circle at 22% 18%, ${accent}3d, transparent 60%), ` +
            `repeating-linear-gradient(135deg, ${accent}17 0px, ${accent}17 2px, transparent 2px, transparent 11px)`,
        }}
      />

      <span className="relative z-10 flex h-full flex-col justify-between">
        <span className="flex items-start justify-between gap-2">
          <Icon size={24} strokeWidth={1.75} style={{ color: accent }} />
          <span
            className="rounded-full px-1.5 py-0.5 text-[8px] font-bold tracking-[0.1em]"
            style={{ color: accent, border: `1px solid ${accent}66`, background: `${accent}1f` }}
          >
            {label}
          </span>
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-[13px] font-bold uppercase leading-tight tracking-[0.04em] text-white">
            {joker.name}
          </span>
          <span className="text-[10px] leading-snug text-white/60">{joker.tagline}</span>
        </span>
      </span>

      {/* Touch devices can't hover — this is their way in to the full
          detail overlay below, without it firing the card's own choose
          action (stopPropagation). Desktop gets the overlay from a plain
          CSS :hover, no tap needed. */}
      <span
        role="button"
        tabIndex={-1}
        onClick={(e) => { e.stopPropagation(); setDetailOpen((o) => !o) }}
        className="absolute bottom-2.5 right-2.5 z-20 flex h-5 w-5 items-center justify-center rounded-full font-serif text-[10px] italic text-white/60"
        style={{ border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(0,0,0,0.35)' }}
        aria-label={`What does ${joker.name} do?`}
      >
        i
      </span>

      {/* Full detail overlay — the actual "what does this Joker do" view,
          separate from the always-on name+tagline above so it can hold a
          clearer, larger restatement without cramming the resting card. */}
      <span
        className={cn(
          'joker-detail-overlay absolute inset-0 z-30 flex flex-col justify-center gap-2 p-3.5 text-left transition-opacity duration-150',
          detailOpen
            ? 'opacity-100'
            : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
        )}
        style={{ background: 'rgba(7,4,13,0.95)', border: `1px solid ${accent}66` }}
      >
        <span className="flex items-center gap-2">
          <Icon size={18} strokeWidth={1.75} style={{ color: accent }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-white">{joker.name}</span>
        </span>
        <span className="text-[11px] leading-snug text-white/90">{joker.tagline}</span>
        <span className="text-[9px] font-bold tracking-[0.15em]" style={{ color: accent }}>{label} EFFECT</span>
      </span>

      {locked && (
        <span className="joker-locked-badge">SELECTED ✓</span>
      )}
    </button>
  )
}
