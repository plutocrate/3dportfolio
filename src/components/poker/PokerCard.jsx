import { SUIT_SYMBOL, SUIT_COLOR } from '@/lib/pokerEngine'
import { cn } from '@/lib/utils'

// A single card. White/paper face (real card stock), deliberately more
// OPAQUE than the glass panel it sits in — the panel behind it is
// near-transparent glass, the card itself is the readable, tactile object
// resting on top of it.
//
// `dead` mutes a card that IS selected but isn't part of the poker hand
// currently detected from the selection (e.g. a kicker sitting next to a
// pair) — it contributes nothing to the score, so it visibly reads as inert.
// `variant` drives the deal/discard choreography: 'entering' plays a drift
// + fade in from below, 'leaving' drifts up and fades out in place (the
// card stays mounted for the duration of the animation before the parent
// actually removes it from the hand).
export function PokerCard({ card, selected, dead, onClick, size = 'md', style, disabled, variant }) {
  const color = SUIT_COLOR[card.suit]
  const symbol = SUIT_SYMBOL[card.suit]

  // Viewport-relative sizing (via clamp) instead of fixed pixel dims, so
  // cards scale down gracefully on narrow/mobile screens instead of
  // overflowing the hand row or forcing it into many cramped wrapped lines.
  const dims = size === 'lg'
    ? {
      w: 'clamp(78px, 19vw, 116px)',
      h: 'clamp(109px, 26.6vw, 162px)',
      font: 'clamp(26px, 6.6vw, 38px)',
      corner: 'clamp(14px, 3.4vw, 19px)',
      cornerSmall: 'clamp(12px, 3vw, 17px)',
    }
    : {
      w: 'clamp(58px, 16vw, 100px)',
      h: 'clamp(81px, 22.4vw, 140px)',
      font: 'clamp(22px, 5.8vw, 33px)',
      corner: 'clamp(12px, 3vw, 16px)',
      cornerSmall: 'clamp(10px, 2.6vw, 14px)',
    }

  // The lift is purely a "this card is selected" indication — it must fire
  // for every selected card regardless of whether it's currently scoring
  // (`dead` only controls the muted/greyscale look, driven by the
  // calculator's read of the hand, and must never affect the pop-up).
  const lifted = selected

  return (
    <button
      type="button"
      onClick={() => !disabled && onClick?.(card.id)}
      className={cn(
        'poker-card group relative select-none rounded-[12px] font-mono ease-out',
        'focus:outline-none',
        disabled && 'cursor-default',
        variant === 'entering' && 'poker-card-entering',
        variant === 'leaving' && 'poker-card-leaving',
        !variant && 'transition-all duration-150',
        lifted && 'poker-card-lifted'
      )}
      style={{
        width: dims.w,
        height: dims.h,
        opacity: dead ? 0.45 : 1,
        filter: dead ? 'grayscale(0.6)' : 'none',
        ...style,
      }}
      aria-pressed={selected}
    >
      <span
        className="absolute inset-0 rounded-[12px]"
        style={{
          background: 'linear-gradient(160deg, #ffffff, #f2eef6)',
          border: lifted
            ? `2px solid ${color}`
            : selected
              ? '2px solid rgba(180,60,90,0.5)'
              : '1px solid rgba(255,255,255,0.35)',
          boxShadow: lifted
            ? `0 14px 30px -10px rgba(0,0,0,0.55), 0 0 22px -2px ${color}66`
            : '0 6px 18px -8px rgba(0,0,0,0.5)',
          transition: 'all 150ms ease-out',
        }}
      />
      {/* subtle top glass sheen */}
      <span
        className="absolute inset-0 rounded-[12px] pointer-events-none opacity-70"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0) 45%)' }}
      />
      <span
        className="relative flex h-full w-full flex-col justify-between"
        style={{ padding: 'clamp(6px, 1.8vw, 10px)' }}
      >
        <span
          className="text-left leading-none font-bold tracking-tight"
          style={{ color, fontSize: dims.corner }}
        >
          {card.rank}
          <br />
          <span style={{ fontSize: dims.cornerSmall }}>{symbol}</span>
        </span>
        <span
          className="self-center leading-none"
          style={{ color, fontSize: dims.font, opacity: 0.95 }}
        >
          {symbol}
        </span>
        <span
          className="self-end rotate-180 text-left leading-none font-bold tracking-tight"
          style={{ color, fontSize: dims.corner }}
        >
          {card.rank}
          <br />
          <span style={{ fontSize: dims.cornerSmall }}>{symbol}</span>
        </span>
      </span>
    </button>
  )
}
