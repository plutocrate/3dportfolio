// ─────────────────────────────────────────────────────────────────────────────
// JOKERS
// Every Joker is a tiny, one-sentence rule. Each is described declaratively
// (perCard / handCondition / countCondition / handsLeftCondition / special)
// so the scoring pipeline (applyJokers, below) can fold all of a run's owned
// Jokers into a single pass without any Joker needing bespoke code — except
// the two genuinely special ones (Chaos Theory, The Gambler) which depend on
// a die roll supplied from outside.
//
// Per-card Jokers (Lucky Seven, Ace Up, The Collector, ...) only look at a
// hand's SCORING cards — the same cards that contribute chips to the base
// hand. A kicker that doesn't participate in the poker hand is inert
// everywhere, Jokers included, for the same reason it doesn't score chips:
// if it's not part of the hand, it was never really "played".
// ─────────────────────────────────────────────────────────────────────────────

const isFace = (c) => c.rank === 'J' || c.rank === 'Q' || c.rank === 'K'
const isOdd = (c) => ['3', '5', '7', '9'].includes(c.rank)
const isEven = (c) => ['2', '4', '6', '8', '10'].includes(c.rank)

export const ROUND2_JOKERS = [
  { id: 'r2-lucky-seven', name: 'Lucky Seven', tagline: 'Every played 7 gives +7 Chips.', pool: 2, perCard: { test: (c) => c.rank === '7', chips: 7 } },
  { id: 'r2-face-value', name: 'Face Value', tagline: 'Each face card played gives +5 Chips.', pool: 2, perCard: { test: isFace, chips: 5 } },
  { id: 'r2-pairing-knife', name: 'Pairing Knife', tagline: 'Pair gives +3 Mult.', pool: 2, handCondition: { test: (h) => h === 'Pair', mult: 3 } },
  { id: 'r2-twos-company', name: "Two's Company", tagline: 'Two Pair gives +4 Mult.', pool: 2, handCondition: { test: (h) => h === 'Two Pair', mult: 4 } },
  { id: 'r2-triple-threat', name: 'Triple Threat', tagline: 'Three of a Kind gives +6 Mult.', pool: 2, handCondition: { test: (h) => h === 'Three of a Kind', mult: 6 } },
  { id: 'r2-straight-shooter', name: 'Straight Shooter', tagline: 'Straight gives +50 Chips.', pool: 2, handCondition: { test: (h) => h === 'Straight', chips: 50 } },
  { id: 'r2-same-blood', name: 'Same Blood', tagline: 'Flush gives +6 Mult.', pool: 2, handCondition: { test: (h) => h === 'Flush', mult: 6 } },
  { id: 'r2-high-roller', name: 'High Roller', tagline: 'High Card hands gain +25 Chips.', pool: 2, handCondition: { test: (h) => h === 'High Card', chips: 25 } },
  { id: 'r2-ace-up', name: 'Ace Up', tagline: 'Each Ace played gives +11 Chips.', pool: 2, perCard: { test: (c) => c.rank === 'A', chips: 11 } },
  { id: 'r2-odd-one', name: 'Odd One', tagline: 'Odd cards (3,5,7,9) give +4 Chips.', pool: 2, perCard: { test: isOdd, chips: 4 } },
  { id: 'r2-even-steven', name: 'Even Steven', tagline: 'Even cards (2,4,6,8,10) give +4 Chips.', pool: 2, perCard: { test: isEven, chips: 4 } },
  { id: 'r2-royal-treatment', name: 'Royal Treatment', tagline: 'J, Q, K give +8 Chips when played.', pool: 2, perCard: { test: isFace, chips: 8 } },
  { id: 'r2-small-hand', name: 'Small Hand', tagline: 'Playing exactly 2 cards gives +5 Mult.', pool: 2, countCondition: { test: (n) => n === 2, mult: 5 } },
  { id: 'r2-full-send', name: 'Full Send', tagline: 'Playing exactly 5 cards gives +30 Chips.', pool: 2, countCondition: { test: (n) => n === 5, chips: 30 } },
  { id: 'r2-last-chance', name: 'Last Chance', tagline: 'When only 1 hand remains, gain +10 Mult.', pool: 2, handsLeftCondition: { test: (n) => n === 1, mult: 10 } },
]

export const ROUND3_JOKERS = [
  { id: 'r3-four-letter-word', name: 'Four Letter Word', tagline: 'Four of a Kind gives +15 Mult.', pool: 3, handCondition: { test: (h) => h === 'Four of a Kind', mult: 15 } },
  { id: 'r3-royal-flush', name: 'Royal Flush', tagline: 'Face cards give +3 Mult each when played.', pool: 3, perCard: { test: isFace, mult: 3 } },
  { id: 'r3-straight-addiction', name: 'Straight Addiction', tagline: 'Straight gives ×2 additional Mult.', pool: 3, handCondition: { test: (h) => h === 'Straight', multMultiplier: 2 } },
  { id: 'r3-flush-addiction', name: 'Flush Addiction', tagline: 'Flush gives +100 Chips.', pool: 3, handCondition: { test: (h) => h === 'Flush', chips: 100 } },
  { id: 'r3-house-always-wins', name: 'House Always Wins', tagline: 'Full House gives +12 Mult.', pool: 3, handCondition: { test: (h) => h === 'Full House', mult: 12 } },
  { id: 'r3-double-trouble', name: 'Double Trouble', tagline: 'Two Pair scores twice.', pool: 3, handCondition: { test: (h) => h === 'Two Pair', scoreMultiplier: 2 } },
  { id: 'r3-triple-down', name: 'Triple Down', tagline: 'Three of a Kind gains ×2 Mult.', pool: 3, handCondition: { test: (h) => h === 'Three of a Kind', multMultiplier: 2 } },
  { id: 'r3-the-collector', name: 'The Collector', tagline: 'Every card played gives +10 Chips.', pool: 3, perCard: { test: () => true, chips: 10 } },
  { id: 'r3-ace-of-nothing', name: 'Ace of Nothing', tagline: 'Every Ace gives +5 Mult.', pool: 3, perCard: { test: (c) => c.rank === 'A', mult: 5 } },
  { id: 'r3-the-gambler', name: 'The Gambler', tagline: 'Each played hand has a 25% chance to score twice.', pool: 3, special: 'gambler' },
  { id: 'r3-final-form', name: 'Final Form', tagline: 'When only 1 hand remains, score ×2.', pool: 3, handsLeftCondition: { test: (n) => n === 1, scoreMultiplier: 2 } },
  { id: 'r3-minimalist', name: 'Minimalist', tagline: 'Hands with exactly 3 cards gain +8 Mult.', pool: 3, countCondition: { test: (n) => n === 3, mult: 8 } },
  { id: 'r3-five-finger-discount', name: 'Five Finger Discount', tagline: 'Hands with exactly 5 cards gain +10 Mult.', pool: 3, countCondition: { test: (n) => n === 5, mult: 10 } },
  { id: 'r3-kingmaker', name: 'Kingmaker', tagline: 'Every King played gives +15 Chips.', pool: 3, perCard: { test: (c) => c.rank === 'K', chips: 15 } },
  { id: 'r3-chaos-theory', name: 'Chaos Theory', tagline: 'Every hand: randomly +50 Chips or +5 Mult.', pool: 3, special: 'chaos' },
]

export function jokerPoolFor(clearedRoundIndex) {
  return clearedRoundIndex === 0 ? ROUND2_JOKERS : ROUND3_JOKERS
}

// Seeded pick of `count` Jokers from a pool, skipping anything already owned
// and never repeating within the same offer. Consumes the run's shared rng
// function (advances its internal state) so the run's whole sequence of
// offers is a deterministic function of its seed.
export function pickJokers(pool, ownedIds, rngFn, count = 3) {
  const available = pool.filter((j) => !ownedIds.includes(j.id))
  const arr = available.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rngFn() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.slice(0, count)
}

// Folds every owned Joker's contribution into one pass over a played hand.
// Returns the raw bonuses plus a human-readable `triggered` log so the UI
// can show exactly what fired ("cleanly and visibly", per the Gambler spec).
export function applyJokers({
  ownedJokers = [],
  scoringCards = [],
  playedCardsCount = 0,
  handName,
  handsLeftBeforePlay = Infinity,
  chaosBuff = null,
  gamblerRoll = null,
}) {
  let flatChips = 0
  let flatMult = 0
  let multMultiplier = 1
  let scoreMultiplier = 1
  const triggered = []

  for (const j of ownedJokers) {
    if (j.perCard) {
      const count = scoringCards.reduce((n, c) => n + (j.perCard.test(c) ? 1 : 0), 0)
      if (count > 0) {
        if (j.perCard.chips) {
          const add = j.perCard.chips * count
          flatChips += add
          triggered.push({ id: j.id, name: j.name, detail: `+${add} Chips` })
        }
        if (j.perCard.mult) {
          const add = j.perCard.mult * count
          flatMult += add
          triggered.push({ id: j.id, name: j.name, detail: `+${add} Mult` })
        }
      }
    }

    if (j.handCondition && j.handCondition.test(handName)) {
      const hc = j.handCondition
      if (hc.chips) { flatChips += hc.chips; triggered.push({ id: j.id, name: j.name, detail: `+${hc.chips} Chips` }) }
      if (hc.mult) { flatMult += hc.mult; triggered.push({ id: j.id, name: j.name, detail: `+${hc.mult} Mult` }) }
      if (hc.multMultiplier) { multMultiplier *= hc.multMultiplier; triggered.push({ id: j.id, name: j.name, detail: `×${hc.multMultiplier} Mult` }) }
      if (hc.scoreMultiplier) { scoreMultiplier *= hc.scoreMultiplier; triggered.push({ id: j.id, name: j.name, detail: `×${hc.scoreMultiplier} Score` }) }
    }

    if (j.countCondition && j.countCondition.test(playedCardsCount)) {
      const cc = j.countCondition
      if (cc.chips) { flatChips += cc.chips; triggered.push({ id: j.id, name: j.name, detail: `+${cc.chips} Chips` }) }
      if (cc.mult) { flatMult += cc.mult; triggered.push({ id: j.id, name: j.name, detail: `+${cc.mult} Mult` }) }
    }

    if (j.handsLeftCondition && j.handsLeftCondition.test(handsLeftBeforePlay)) {
      const hl = j.handsLeftCondition
      if (hl.chips) { flatChips += hl.chips; triggered.push({ id: j.id, name: j.name, detail: `+${hl.chips} Chips` }) }
      if (hl.mult) { flatMult += hl.mult; triggered.push({ id: j.id, name: j.name, detail: `+${hl.mult} Mult` }) }
      if (hl.scoreMultiplier) { scoreMultiplier *= hl.scoreMultiplier; triggered.push({ id: j.id, name: j.name, detail: `×${hl.scoreMultiplier} Score` }) }
    }

    if (j.special === 'chaos' && chaosBuff) {
      if (chaosBuff.type === 'chips') { flatChips += chaosBuff.amount; triggered.push({ id: j.id, name: j.name, detail: `+${chaosBuff.amount} Chips` }) }
      else { flatMult += chaosBuff.amount; triggered.push({ id: j.id, name: j.name, detail: `+${chaosBuff.amount} Mult` }) }
    }

    if (j.special === 'gambler' && gamblerRoll !== null && gamblerRoll !== undefined) {
      if (gamblerRoll < 0.25) {
        scoreMultiplier *= 2
        triggered.push({ id: j.id, name: j.name, detail: 'hit — ×2 score!' })
      } else {
        triggered.push({ id: j.id, name: j.name, detail: 'no luck this time' })
      }
    }
  }

  return { flatChips, flatMult, multMultiplier, scoreMultiplier, triggered }
}
