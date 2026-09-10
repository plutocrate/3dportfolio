// ─────────────────────────────────────────────────────────────────────────
// JOKER VISUALS
// Gives every Joker its own identity — an icon, an accent color, and a
// category badge — instead of all 30 of them being the same purple
// rectangle with different text on it. The icon is the one hand-curated
// choice per Joker (so no two look alike); the color/badge are DERIVED
// straight from the Joker's own rule definition (chips vs mult vs a
// multiplier vs a score-doubler vs a pure-chance special), so they can
// never drift out of sync with what the Joker actually does.
// ─────────────────────────────────────────────────────────────────────────

import {
  Dices, Crown, Copy, Users, Flame, TrendingUp, Droplet, Gem, Spade, Hash,
  Award, Puzzle, Rocket, Hourglass, Swords, Layers, Shuffle, Coins, Flag,
  Sparkles,
} from 'lucide-react'

const ICONS = {
  'r2-lucky-seven': Dices,
  'r2-face-value': Crown,
  'r2-pairing-knife': Copy,
  'r2-twos-company': Users,
  'r2-triple-threat': Flame,
  'r2-straight-shooter': TrendingUp,
  'r2-same-blood': Droplet,
  'r2-high-roller': Gem,
  'r2-ace-up': Spade,
  'r2-odd-one': Hash,
  'r2-even-steven': Hash,
  'r2-royal-treatment': Award,
  'r2-small-hand': Puzzle,
  'r2-full-send': Rocket,
  'r2-last-chance': Hourglass,

  'r3-four-letter-word': Swords,
  'r3-royal-flush': Crown,
  'r3-straight-addiction': TrendingUp,
  'r3-flush-addiction': Droplet,
  'r3-house-always-wins': Flag,
  'r3-double-trouble': Copy,
  'r3-triple-down': Flame,
  'r3-the-collector': Layers,
  'r3-ace-of-nothing': Spade,
  'r3-the-gambler': Dices,
  'r3-final-form': Hourglass,
  'r3-minimalist': Puzzle,
  'r3-five-finger-discount': Coins,
  'r3-kingmaker': Crown,
  'r3-chaos-theory': Shuffle,
}

// What kind of bonus this Joker actually grants — read directly off its own
// rule object, in the same priority order applyJokers() itself would apply
// them in, so this label is never just decorative guesswork.
export function jokerKind(j) {
  if (j.special === 'gambler' || j.special === 'chaos') return 'special'
  const eff = j.perCard || j.handCondition || j.countCondition || j.handsLeftCondition
  if (!eff) return 'special'
  if (eff.scoreMultiplier) return 'score'
  if (eff.multMultiplier) return 'xmult'
  if (eff.mult) return 'mult'
  if (eff.chips) return 'chips'
  return 'special'
}

const KIND_META = {
  // amber — matches the final-score gold used everywhere else on the table
  chips: { label: 'CHIPS', accent: '#f2a869' },
  // purple — the color already established for "a Joker touched this" (see
  // the score breakdown and CHAOS THEORY line)
  mult: { label: 'MULT', accent: '#c9a6ff' },
  // warmer orange — a multiplier compounds, so it reads as a size up from a
  // flat mult add
  xmult: { label: '× MULT', accent: '#ff9d6b' },
  // red — the single biggest possible swing (doubles the whole hand)
  score: { label: '× SCORE', accent: '#ff6b6b' },
  // teal — chance-based/unique Jokers (Gambler, Chaos Theory) don't fit the
  // chips/mult spectrum at all, so they get their own lane
  special: { label: 'SPECIAL', accent: '#6ee7b7' },
}

export function jokerVisual(j) {
  const kind = jokerKind(j)
  const meta = KIND_META[kind]
  return {
    Icon: ICONS[j.id] || Sparkles,
    kind,
    label: meta.label,
    accent: meta.accent,
  }
}
