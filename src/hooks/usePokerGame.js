import { useCallback, useMemo, useRef, useState } from 'react'
import { createDeck, shuffle, evaluateHand, scoreHand, generateRounds, RANK_ORDER } from '@/lib/pokerEngine'
import { jokerPoolFor, pickJokers } from '@/lib/jokers'
import { mulberry32, makeSeed } from '@/lib/rng'
import { pokerSfx } from '@/lib/pokerSfx'

const HAND_SIZE = 9
const HIGH_SCORE_KEY = 'poker.highscore.v1'

function loadHighScore() {
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY)
    if (!raw) return { bestRunScore: 0, bestHand: null, highestRound: 0 }
    return JSON.parse(raw)
  } catch (e) {
    return { bestRunScore: 0, bestHand: null, highestRound: 0 }
  }
}

function saveHighScore(data) {
  try { localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(data)) } catch (e) { /* ignore */ }
}

// Phases: 'playing' -> 'roundClear' -> 'jokerSelect' -> 'playing' (next round)
//                                    -> (round 3) 'gameWon'
//         'playing' -> 'roundFailed' -> (play again resets)
export function usePokerGame() {
  const [rounds, setRounds] = useState(generateRounds)
  const [roundIndex, setRoundIndex] = useState(0)
  const [phase, setPhase] = useState('playing')
  const [deck, setDeck] = useState(() => shuffle(createDeck()))
  const [hand, setHand] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [score, setScore] = useState(0)
  const [runTotal, setRunTotal] = useState(0) // sum of every hand played this whole run
  const [handsLeft, setHandsLeft] = useState(rounds[0].hands)
  const [discardsLeft, setDiscardsLeft] = useState(rounds[0].discards)
  const [lastResult, setLastResult] = useState(null) // { handName, finalScore, ... }
  const [message, setMessage] = useState(null)
  const [stats, setStats] = useState({ handsPlayed: 0, bestHand: null, bestHandScore: 0 })
  const highScoreRef = useRef(loadHighScore())
  const [isNewHighScore, setIsNewHighScore] = useState(false)
  const [exceptionalWin, setExceptionalWin] = useState(false)

  // ── Jokers ────────────────────────────────────────────────────────────
  const rngRef = useRef(mulberry32(makeSeed()))
  const [runSeed, setRunSeed] = useState(0)
  const [ownedJokers, setOwnedJokers] = useState([]) // persists for the run
  const [jokerOffer, setJokerOffer] = useState(null) // { choices, picksRequired, picksMade, bonus }
  const [chaosBuff, setChaosBuff] = useState(null) // { type: 'chips'|'mult', amount }

  const currentRound = rounds[roundIndex]

  // Chaos Theory re-rolls its buff every time a fresh hand of cards is dealt
  // (round start, or right after a play/discard redraw) — and per the spec,
  // the roll must be visible BEFORE the player plays, so it's rolled here,
  // not at play time.
  const rollChaos = useCallback((ownedList) => {
    if (!ownedList.some((j) => j.special === 'chaos')) { setChaosBuff(null); return }
    const roll = rngRef.current()
    setChaosBuff(roll < 0.5 ? { type: 'chips', amount: 50 } : { type: 'mult', amount: 5 })
  }, [])

  // Draw fresh cards to refill the hand up to HAND_SIZE, reshuffling a
  // discard-free fresh deck if we ever run low (the round is short enough
  // this is mostly a safety net, not something players will hit often).
  // The resulting hand is always kept sorted highest-to-lowest by rank —
  // purely a display/scanning convenience, doesn't touch scoring at all.
  const drawUpTo = useCallback((deckIn, handIn, count) => {
    let d = deckIn
    if (d.length < count) d = shuffle(createDeck())
    const drawn = d.slice(0, count)
    const rest = d.slice(count)
    pokerSfx.draw()
    const newHand = [...handIn, ...drawn].sort((a, b) => RANK_ORDER[b.rank] - RANK_ORDER[a.rank])
    return { deck: rest, hand: newHand }
  }, [])

  const startRound = useCallback((idx, roundsArr, ownedOverride) => {
    const r = (roundsArr || rounds)[idx]
    const freshDeck = shuffle(createDeck())
    const { deck: d, hand: h } = drawUpTo(freshDeck, [], HAND_SIZE)
    setDeck(d)
    setHand(h)
    setSelectedIds([])
    setScore(0)
    setHandsLeft(r.hands)
    setDiscardsLeft(r.discards)
    setLastResult(null)
    setPhase('playing')
    setMessage(idx === 0 ? "three rounds. don't embarrass yourself." : null)
    rollChaos(ownedOverride || ownedJokers)
  }, [rounds, drawUpTo, rollChaos, ownedJokers])

  // Starts a brand new run: fresh seed (-> fresh Joker offers), fresh
  // stats, fresh deck. Round targets themselves are fixed (see
  // ROUND_CONFIG) — the seed is what makes each run feel different now.
  const beginGame = useCallback(() => {
    const seed = makeSeed()
    rngRef.current = mulberry32(seed)
    setRunSeed(seed)
    const freshRounds = generateRounds()
    setRounds(freshRounds)
    setRoundIndex(0)
    setRunTotal(0)
    setStats({ handsPlayed: 0, bestHand: null, bestHandScore: 0 })
    setIsNewHighScore(false)
    setExceptionalWin(false)
    setOwnedJokers([])
    setJokerOffer(null)
    setChaosBuff(null)
    startRound(0, freshRounds, [])
  }, [startRound])

  const toggleSelect = useCallback((cardId) => {
    setSelectedIds((prev) => {
      if (prev.includes(cardId)) {
        pokerSfx.deselect()
        return prev.filter((id) => id !== cardId)
      }
      if (prev.length >= 5) return prev
      pokerSfx.select()
      return [...prev, cardId]
    })
  }, [])

  const selectedCards = useMemo(
    () => hand.filter((c) => selectedIds.includes(c.id)),
    [hand, selectedIds]
  )

  const previewHand = useMemo(() => {
    if (selectedCards.length === 0) return null
    return {
      ...evaluateHand(selectedCards),
      ...scoreHand(selectedCards, { ownedJokers, handsLeftBeforePlay: handsLeft, chaosBuff, gamblerRoll: null }),
    }
  }, [selectedCards, ownedJokers, handsLeft, chaosBuff])

  const playHand = useCallback(() => {
    if (selectedCards.length === 0 || phase !== 'playing') return
    const handsLeftBeforePlay = handsLeft
    const hasGambler = ownedJokers.some((j) => j.special === 'gambler')
    const gamblerRoll = hasGambler ? rngRef.current() : null
    const result = scoreHand(selectedCards, { ownedJokers, handsLeftBeforePlay, chaosBuff, gamblerRoll })
    pokerSfx.play()

    const newScore = score + result.finalScore
    const remainingHand = hand.filter((c) => !selectedIds.includes(c.id))
    const { deck: d, hand: h } = drawUpTo(deck, remainingHand, HAND_SIZE - remainingHand.length)
    const newHandsLeft = handsLeft - 1

    setStats((s) => {
      const better = result.finalScore > s.bestHandScore
      return {
        handsPlayed: s.handsPlayed + 1,
        bestHand: better ? result.handName : s.bestHand,
        bestHandScore: better ? result.finalScore : s.bestHandScore,
      }
    })

    setLastResult({ ...result, roundScore: newScore })
    setScore(newScore)
    setRunTotal((t) => t + result.finalScore)
    setDeck(d)
    setHand(h)
    setSelectedIds([])
    setHandsLeft(newHandsLeft)
    rollChaos(ownedJokers)

    // Contextual one-liners — occasional, not constant (rule #25).
    if (result.handName === 'High Card') setMessage('unfortunate.')
    else if (['Full House', 'Four of a Kind', 'Straight Flush'].includes(result.handName)) setMessage('interesting.')
    else setMessage(null)

    if (newScore >= currentRound.target) {
      pokerSfx.target()
      setPhase('roundClear')
      if (newScore >= currentRound.bonusThreshold) setMessage('you did better than expected.')
      else setMessage(newScore - result.finalScore < currentRound.target * 0.6 ? null : 'that was close.')
    } else if (newHandsLeft <= 0) {
      pokerSfx.fail()
      setPhase('roundFailed')
      setMessage('close.')
    }
  }, [selectedCards, phase, score, hand, selectedIds, deck, handsLeft, currentRound, drawUpTo, ownedJokers, chaosBuff, rollChaos])

  const discard = useCallback(() => {
    if (selectedCards.length === 0 || discardsLeft <= 0 || phase !== 'playing') return
    pokerSfx.discard()
    const remainingHand = hand.filter((c) => !selectedIds.includes(c.id))
    const { deck: d, hand: h } = drawUpTo(deck, remainingHand, HAND_SIZE - remainingHand.length)
    setDeck(d)
    setHand(h)
    setSelectedIds([])
    setDiscardsLeft((n) => n - 1)
    rollChaos(ownedJokers)
  }, [selectedCards, discardsLeft, phase, hand, selectedIds, deck, drawUpTo, ownedJokers, rollChaos])

  // Full-run completion bookkeeping when Round 3 is cleared (the run is won).
  const finishRun = useCallback(() => {
    const hs = highScoreRef.current
    const finalTotal = runTotal
    const won = finalTotal > hs.bestRunScore
    const updated = {
      bestRunScore: Math.max(hs.bestRunScore, finalTotal),
      bestHand: (stats.bestHandScore > 0 && (!hs.bestHand || stats.bestHandScore > (hs.bestHandScore || 0)))
        ? stats.bestHand : hs.bestHand,
      bestHandScore: Math.max(hs.bestHandScore || 0, stats.bestHandScore),
      highestRound: Math.max(hs.highestRound, 3),
    }
    highScoreRef.current = updated
    saveHighScore(updated)
    setIsNewHighScore(won)
    const exceptional = score >= currentRound.bonusThreshold
    setExceptionalWin(exceptional)
    setPhase('gameWon')
    setMessage(exceptional ? "you didn't need that much." : (won ? 'okay. you\u2019re getting somewhere.' : null))
  }, [runTotal, stats, score, currentRound])

  // Called from the ROUND CLEAR screen. Round 1 & 2 clears open a Joker
  // offer (from the next round's pool) before actually advancing; Round 3
  // clear ends the run outright — no Joker offer after the final round.
  const advanceRound = useCallback(() => {
    if (roundIndex >= rounds.length - 1) {
      finishRun()
      return
    }
    const pool = jokerPoolFor(roundIndex) // pool for the round just cleared
    const bonus = score >= currentRound.bonusThreshold
    const picksRequired = bonus ? 2 : 1
    const ownedIds = ownedJokers.map((j) => j.id)
    const choices = pickJokers(pool, ownedIds, rngRef.current, 3)
    setJokerOffer({ choices, picksRequired, picksMade: [], bonus })
    setPhase('jokerSelect')
  }, [roundIndex, rounds.length, score, currentRound, ownedJokers, finishRun])

  // Player clicks a Joker on the selection screen. If a second pick is
  // still owed (bonus clear), the chosen card locks in and the other two
  // stay live for the second choice; otherwise it's straight into the next
  // round with the new Joker(s) already active (including this round's
  // fresh Chaos Theory roll, if it was just picked).
  const chooseJoker = useCallback((jokerId) => {
    if (!jokerOffer) return
    const picked = jokerOffer.choices.find((c) => c.id === jokerId)
    if (!picked) return
    const newOwned = [...ownedJokers, picked]
    setOwnedJokers(newOwned)
    const picksMadeCount = jokerOffer.picksMade.length + 1
    if (picksMadeCount >= jokerOffer.picksRequired) {
      setJokerOffer(null)
      const nextIdx = roundIndex + 1
      setRoundIndex(nextIdx)
      startRound(nextIdx, rounds, newOwned)
    } else {
      setJokerOffer({
        ...jokerOffer,
        picksMade: [...jokerOffer.picksMade, picked],
        // choices intentionally left intact — the picked one just renders
        // "locked in" while the other two stay live for the second pick.
      })
    }
  }, [jokerOffer, ownedJokers, roundIndex, rounds, startRound])

  const recordFailure = useCallback(() => {
    const hs = highScoreRef.current
    const updated = {
      bestRunScore: Math.max(hs.bestRunScore, runTotal),
      bestHand: (stats.bestHandScore > (hs.bestHandScore || 0)) ? stats.bestHand : hs.bestHand,
      bestHandScore: Math.max(hs.bestHandScore || 0, stats.bestHandScore),
      highestRound: Math.max(hs.highestRound, roundIndex + 1),
    }
    highScoreRef.current = updated
    saveHighScore(updated)
  }, [runTotal, stats, roundIndex])

  return {
    rounds,
    roundIndex,
    currentRound,
    phase,
    hand,
    selectedIds,
    selectedCards,
    previewHand,
    score,
    runTotal,
    handsLeft,
    discardsLeft,
    lastResult,
    message,
    stats,
    highScore: highScoreRef.current,
    isNewHighScore,
    exceptionalWin,
    runSeed,
    ownedJokers,
    jokerOffer,
    chaosBuff,
    beginGame,
    toggleSelect,
    playHand,
    discard,
    advanceRound,
    chooseJoker,
    recordFailure,
    restartFromRound1: () => { beginGame() },
  }
}
