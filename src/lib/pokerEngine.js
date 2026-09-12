// ─────────────────────────────────────────────────────────────────────────────
// POKER ENGINE
// Pure, framework-free poker logic: deck construction, shuffling, best-hand
// detection from up to 5 selected cards, and chips×mult scoring. Nothing in
// this file touches the DOM, React, or audio — it's the rules of the card
// game hiding inside the website.
// ─────────────────────────────────────────────────────────────────────────────

import { applyJokers } from '@/lib/jokers'

export const SUITS = ['spades', 'hearts', 'diamonds', 'clubs']
export const SUIT_SYMBOL = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' }
// Red suits get a warm ember tint instead of casino-red, to stay inside the
// site's dark-purple/blue/pink palette rather than reading as a Vegas felt.
// Faces are now white cards, so these need real contrast against white/paper
// rather than against the old dark card body.
export const SUIT_COLOR = {
  spades: '#161320',
  clubs: '#161320',
  hearts: '#c72a4e',
  diamonds: '#c72a4e',
}
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

// Numeric rank used for straight detection (2 low, Ace high — plus the
// wheel/A-2-3-4-5 case handled separately below).
export const RANK_ORDER = Object.fromEntries(RANKS.map((r, i) => [r, i + 2]))

// Chip value each rank contributes when played (face cards = 10, Ace = 11).
const RANK_CHIPS = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  J: 10, Q: 10, K: 10, A: 11,
}

let __idSeq = 0
function makeCard(rank, suit) {
  __idSeq += 1
  return { id: `c${__idSeq}-${rank}-${suit}`, rank, suit, chips: RANK_CHIPS[rank] }
}

export function createDeck() {
  const deck = []
  for (const suit of SUITS) {
    for (const rank of RANKS) deck.push(makeCard(rank, suit))
  }
  return deck
}

export function shuffle(array) {
  const arr = array.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Multiplier per poker hand — the only bonus a hand type itself grants;
// all chip value comes from the actual scoring cards (see scoreHand).
export const HAND_TABLE = {
  'High Card': { mult: 1 },
  'Pair': { mult: 2 },
  'Two Pair': { mult: 2 },
  'Three of a Kind': { mult: 3 },
  'Straight': { mult: 4 },
  'Flush': { mult: 4 },
  'Full House': { mult: 5 },
  'Four of a Kind': { mult: 7 },
  'Straight Flush': { mult: 10 },
}

// Given 1–5 selected cards, determine the strongest standard poker hand they
// form, AND which of those cards actually belong to that hand — a pair of
// queens with a kicker Ace only "uses" the two queens; the ace is dead
// weight and must not contribute chips (see scoreHand below). Fewer than 5
// cards just skips the hands that need more (a pair of two still detects as
// "Pair", three unrelated cards is "High Card", etc).
export function evaluateHand(cards) {
  if (!cards || cards.length === 0) {
    return { name: 'High Card', cards: [], scoringCards: [] }
  }

  const byRank = {}
  for (const c of cards) (byRank[c.rank] ||= []).push(c)
  const groups = Object.values(byRank).sort((a, b) => b.length - a.length)

  const suits = new Set(cards.map((c) => c.suit))
  const isFlush = cards.length === 5 && suits.size === 1

  const ranksNumeric = [...new Set(cards.map((c) => RANK_ORDER[c.rank]))].sort((a, b) => a - b)
  let isStraight = false
  if (cards.length === 5 && ranksNumeric.length === 5) {
    const span = ranksNumeric[4] - ranksNumeric[0]
    if (span === 4) isStraight = true
    // Wheel: A-2-3-4-5 (Ace plays low)
    if (!isStraight && ranksNumeric.join(',') === '2,3,4,5,14') isStraight = true
  }

  let name
  let scoringCards

  if (isStraight && isFlush) {
    name = 'Straight Flush'; scoringCards = cards
  } else if (groups[0].length === 4) {
    name = 'Four of a Kind'; scoringCards = groups[0]
  } else if (groups[0].length === 3 && groups[1]?.length === 2) {
    name = 'Full House'; scoringCards = cards
  } else if (isFlush) {
    name = 'Flush'; scoringCards = cards
  } else if (isStraight) {
    name = 'Straight'; scoringCards = cards
  } else if (groups[0].length === 3) {
    name = 'Three of a Kind'; scoringCards = groups[0]
  } else if (groups[0].length === 2 && groups[1]?.length === 2) {
    name = 'Two Pair'; scoringCards = [...groups[0], ...groups[1]]
  } else if (groups[0].length === 2) {
    name = 'Pair'; scoringCards = groups[0]
  } else {
    // High Card only ever uses the single highest card — every other
    // selected card is a wasted click, exactly like real poker.
    name = 'High Card'
    scoringCards = [cards.slice().sort((a, b) => RANK_ORDER[b.rank] - RANK_ORDER[a.rank])[0]]
  }

  return { name, cards, scoringCards }
}

// Chips × mult, using ONLY the cards that are actually part of the detected
// hand — a pair of queens plus an off-suit kicker ace scores as if the ace
// were never selected: chips = Q(10) + Q(10) = 20, × the Pair mult (2) = 40.
// No flat "base chips" bonus is added on top; the hand's mult (from
// HAND_TABLE) is the only reward for the hand type itself.
//
// `jokerCtx` folds in any owned Jokers (see src/lib/jokers.js): flat chip/
// mult bonuses are added before the multiply, ×mult Jokers (Straight
// Addiction, Triple Down) multiply the mult, and ×score Jokers (Double
// Trouble, Final Form, a Gambler hit) multiply the finished score.
export function scoreHand(cards, jokerCtx = {}) {
  const { name, scoringCards } = evaluateHand(cards)
  const { mult: baseMult } = HAND_TABLE[name] || HAND_TABLE['High Card']
  const cardChips = scoringCards.reduce((sum, c) => sum + c.chips, 0)

  const fx = applyJokers({
    ownedJokers: jokerCtx.ownedJokers || [],
    playedCards: cards,
    playedCardsCount: cards.length,
    handName: name,
    handsLeftBeforePlay: jokerCtx.handsLeftBeforePlay ?? Infinity,
    chaosBuff: jokerCtx.chaosBuff ?? null,
    gamblerRoll: jokerCtx.gamblerRoll ?? null,
  })

  const totalChips = cardChips + fx.flatChips
  const mult = (baseMult + fx.flatMult) * fx.multMultiplier
  const rawScore = totalChips * mult
  const finalScore = Math.round(rawScore * fx.scoreMultiplier)

  return {
    handName: name,
    scoringCardIds: scoringCards.map((c) => c.id),
    cardChips,
    jokerChips: fx.flatChips,
    totalChips,
    baseMult,
    jokerMult: fx.flatMult,
    multMultiplier: fx.multMultiplier,
    mult,
    scoreMultiplier: fx.scoreMultiplier,
    finalScore,
    jokersTriggered: fx.triggered,
  }
}

// Fixed three-round structure (item: Round targets are exact, since Joker
// bonus thresholds are defined relative to them). Replayability now comes
// from the seeded Joker offers rather than jittered targets.
export const ROUND_CONFIG = [
  { round: 1, target: 300, hands: 4, discards: 3, bonusThreshold: 400 },
  { round: 2, target: 800, hands: 4, discards: 3, bonusThreshold: 1000 },
  { round: 3, target: 1200, hands: 4, discards: 3, bonusThreshold: 1500 },
]

export function generateRounds() {
  return ROUND_CONFIG.map((r) => ({ ...r }))
}
