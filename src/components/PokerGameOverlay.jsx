import { useEffect, useRef, useState, useCallback } from 'react'
import { PokerCard } from '@/components/poker/PokerCard'
import { PlayCardsButton } from '@/components/poker/PlayCardsButton'
import { JokerCard } from '@/components/poker/JokerCard'
import { usePokerGame } from '@/hooks/usePokerGame'
import { pokerSfx } from '@/lib/pokerSfx'
import { jokerVisual } from '@/lib/jokerVisuals'
import { cn } from '@/lib/utils'
import { HelpCircle } from 'lucide-react'
import { useHistoryOverlay } from '@/hooks/useHistoryOverlay'

const SWIRL_TRACK_PATTERN = /-b\.[a-z0-9]+$/i
const TRIGGER_DELAY_MS = 900
const LEAVE_MS = 260   // played/discarded cards drift out before the swap
const ENTER_MS = 420   // replacement cards drift in after the swap
const RUN_END_HOLD_MS = 3200 // how long the WON/FAILED screen holds before auto-closing

// Rendered once, near the root, as a sibling of everything else. Everything
// here is either invisible (stage 'hidden') or sitting on top of the
// (separately blurred, in App.jsx) website.
export function PokerGameOverlay({
  isSwirlTrack,
  currentTrackUrl,
  ambientMusic,
  playCardsAnchorRef,
  onActiveChange,
}) {
  const [stage, setStage] = useState('hidden') // hidden | intro | noSlap | game
  // `wasSwirl` drives the "want to play?" trigger — gated on actual playback
  // (isSwirlTrack), since a swirl track sitting paused shouldn't pop the
  // prompt. `wasTrackSwirl` drives the "player walked away" close check —
  // it looks only at which TRACK is loaded, not whether it's transiently
  // paused, so a track naturally ending (and looping, see the effect below)
  // never gets mistaken for the player leaving the table.
  const wasSwirl = useRef(false)
  const wasTrackSwirl = useRef(false)
  const trackIsSwirl = SWIRL_TRACK_PATTERN.test(currentTrackUrl || '')
  const triggerTimer = useRef(null)
  const noSlapTimer = useRef(null)
  const game = usePokerGame()
  const [scoreAnim, setScoreAnim] = useState(null) // drives the scoring build-up
  const [helpOpen, setHelpOpen] = useState(false)

  // ── Deal / discard choreography ─────────────────────────────────────────
  // `leavingIds` cards are still rendered but animating out (played or
  // discarded); `enteringIds` cards just got drawn and are animating in.
  // `busyRef` blocks a second play/discard while a leave animation is
  // mid-flight so the hand array can't be swapped out from under it.
  const [leavingIds, setLeavingIds] = useState(() => new Set())
  const [enteringIds, setEnteringIds] = useState(() => new Set())
  const [busy, setBusy] = useState(false) // true while cards are drifting out, mid play/discard
  const busyRef = useRef(false)
  const prevHandIdsRef = useRef(new Set())
  const enterTimerRef = useRef(null)

  const active = stage !== 'hidden'
  useEffect(() => { onActiveChange?.(active) }, [active, onActiveChange])

  // ── Trigger: swirl ("-b") track starts audibly playing ─────────────────
  useEffect(() => {
    if (isSwirlTrack && !wasSwirl.current) {
      triggerTimer.current = setTimeout(() => {
        setStage((s) => (s === 'hidden' ? 'intro' : s))
      }, TRIGGER_DELAY_MS)
    }
    wasSwirl.current = isSwirlTrack
    return () => clearTimeout(triggerTimer.current)
  }, [isSwirlTrack])

  // ── Close: the player actually changed the track (not just a transient
  // pause/end) while the game is up — walking away from the table. This is
  // keyed off which track is LOADED (trackIsSwirl), never off `playing`, so
  // a track quietly ending and looping back (see below) can never be
  // mistaken for the player leaving — that was the bug where the game used
  // to close itself the moment the background music finished.
  useEffect(() => {
    if (!trackIsSwirl && wasTrackSwirl.current && stage !== 'hidden') {
      clearTimeout(triggerTimer.current)
      clearTimeout(noSlapTimer.current)
      setStage('hidden')
      setHelpOpen(false) // don't leave help floating over a game that just closed
      ambientMusic.setTrackEndBehavior(null)
    }
    wasTrackSwirl.current = trackIsSwirl
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIsSwirl, stage])

  // ── Track-end behavior while any stage is open ──────────────────────────
  // The game only works over this one looping track, so once the "want to
  // play?" prompt is even up (let alone the game itself), a track ending
  // should just silently loop it in place — never wander off to a random
  // next track. Previously this only locked in once `stage === 'game'`,
  // which left a gap: if the swirl track happened to finish while the
  // intro/no-slap popup was still showing (before the player answered),
  // the default shuffle-advance would swap it out from under the prompt,
  // and the very next render's "walked away" check (above) would then
  // read that as the player leaving and instantly hide everything — i.e.
  // the game would appear to never show up at all.
  useEffect(() => {
    if (stage !== 'hidden') {
      ambientMusic.setTrackEndBehavior('loop')
    } else {
      ambientMusic.setTrackEndBehavior(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  const handleYes = () => {
    game.beginGame()
    setStage('game')
  }

  const handleNo = () => {
    setStage('noSlap')
    noSlapTimer.current = setTimeout(() => {
      game.beginGame()
      setStage('game')
    }, 1400)
  }

  const handleChangeMusic = () => {
    ambientMusic.next()
    // the "walked away" close effect above will dismiss the game once the
    // new track's identity is reflected (it may itself be another "-b"
    // track, in which case nothing happens — the player just skipped songs).
  }

  const handlePlayCardsButton = () => {
    ambientMusic.playTrackMatching(SWIRL_TRACK_PATTERN)
    ambientMusic.setTrackEndBehavior('loop')
    game.beginGame()
    setStage('game')
  }

  // Makes the game (and the help panel on top of it) behave like real
  // pages in browser/mobile history: opening either pushes a marked entry,
  // and pressing Back — hardware button, edge-swipe, whatever the platform
  // offers — closes just the top-most one instead of leaving the site or
  // falling through both at once. Also owns the Escape key for both,
  // nesting-safe (see useHistoryOverlay), which is why the old bespoke Esc
  // listener that lived here is gone — this replaces it.
  //
  // "Leaving the game" has to mean more than just hiding it, or the
  // swirl track (still playing) would just pop the game back open a
  // moment later — so its close action is handleChangeMusic, same as
  // every other way of walking away from the table.
  const consumeGameHistoryEntry = useHistoryOverlay('poker-game', stage !== 'hidden', handleChangeMusic)
  const consumeHelpHistoryEntry = useHistoryOverlay('poker-help', helpOpen, () => setHelpOpen(false))

  // Safety net for the OTHER ways the game/help can close — the "walked
  // away" effect above, the run-ending auto-close below, or just clicking
  // CHANGE MUSIC directly — none of which go through history.back(). Any
  // of those leave the entry useHistoryOverlay pushed still sitting on the
  // stack unless something pops it; this cleans it up so Back always does
  // the right thing next time, and is a safe no-op if the entry's already
  // gone (e.g. it WAS closed via Back).
  useEffect(() => {
    if (stage === 'hidden') consumeGameHistoryEntry()
  }, [stage, consumeGameHistoryEntry])
  useEffect(() => {
    if (!helpOpen) consumeHelpHistoryEntry()
  }, [helpOpen, consumeHelpHistoryEntry])

  // Failure bookkeeping
  useEffect(() => {
    if (game.phase === 'roundFailed') game.recordFailure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.phase])

  // Once a run is actually over — won all 3 rounds, or busted out — there's
  // nothing left to decide. Rather than sit on a "PLAY AGAIN" prompt
  // waiting to be clicked, show the result for a few seconds then just
  // close the table and hand the site back to its normal shuffle by
  // skipping to the next track — same as if the player had walked away.
  useEffect(() => {
    if (game.phase !== 'gameWon' && game.phase !== 'roundFailed') return
    const t = setTimeout(() => {
      setStage('hidden')
      setHelpOpen(false)
      ambientMusic.setTrackEndBehavior(null)
      ambientMusic.next()
    }, RUN_END_HOLD_MS)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.phase])

  // Whenever the underlying hand array changes (draw after play/discard, or
  // a fresh round dealt), diff against the previous ids and drift the newly
  // drawn cards in.
  useEffect(() => {
    const currentIds = new Set(game.hand.map((c) => c.id))
    const prevIds = prevHandIdsRef.current
    const newlyAdded = game.hand.filter((c) => !prevIds.has(c.id)).map((c) => c.id)
    prevHandIdsRef.current = currentIds
    if (newlyAdded.length === 0) return
    clearTimeout(enterTimerRef.current)
    setEnteringIds(new Set(newlyAdded))
    enterTimerRef.current = setTimeout(() => setEnteringIds(new Set()), ENTER_MS)
    return () => clearTimeout(enterTimerRef.current)
  }, [game.hand])

  // Selecting/deselecting a card always kills any frozen scoring readout
  // from the previous hand — otherwise the old chips×mult calculation sits
  // on screen while the player is already building their next hand.
  const handleToggleSelect = useCallback((id) => {
    setScoreAnim(null)
    game.toggleSelect(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Play: the selected cards visibly drift out first, THEN the actual
  // scoring/hand-swap happens (so the replacement cards can drift back in).
  const wrappedPlayHand = useCallback(() => {
    if (busyRef.current) return
    if (game.selectedCards.length === 0 || game.phase !== 'playing') return
    busyRef.current = true
    setBusy(true)
    setLeavingIds(new Set(game.selectedIds))
    setTimeout(() => {
      game.playHand()
      setLeavingIds(new Set())
      busyRef.current = false
      setBusy(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, LEAVE_MS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.selectedCards, game.selectedIds, game.phase])

  // Discard: same idea — cards drift out first, replacements drift in after.
  const wrappedDiscard = useCallback(() => {
    if (busyRef.current) return
    if (game.selectedCards.length === 0 || game.discardsLeft <= 0 || game.phase !== 'playing') return
    busyRef.current = true
    setBusy(true)
    setLeavingIds(new Set(game.selectedIds))
    setTimeout(() => {
      game.discard()
      setLeavingIds(new Set())
      busyRef.current = false
      setBusy(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, LEAVE_MS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.selectedCards, game.selectedIds, game.discardsLeft, game.phase])

  // Scoring build-up animation whenever a hand result lands. Auto-clears
  // itself once the reveal has had a moment to breathe — previously this
  // stuck around forever (until the *next* play), which is why the old
  // hand's chips×mult calculation kept showing while picking the new one.
  useEffect(() => {
    if (!game.lastResult) { setScoreAnim(null); return }
    setScoreAnim({ step: 0, result: game.lastResult })
    const steps = [1, 2, 3]
    const timers = steps.map((s, i) =>
      setTimeout(() => {
        pokerSfx.scoreTick()
        setScoreAnim({ step: s, result: game.lastResult })
      }, 180 * (i + 1))
    )
    const clearTimer = setTimeout(() => setScoreAnim(null), 180 * 3 + 950)
    return () => { timers.forEach(clearTimeout); clearTimeout(clearTimer) }
  }, [game.lastResult])

  return (
    <>
      <PlayCardsButton
        ref={playCardsAnchorRef}
        visible={stage === 'hidden'}
        onClick={handlePlayCardsButton}
      />

      {stage === 'intro' && (
        <GamePopup>
          <p className="font-mono text-lg tracking-wide text-white/90">want to play a game of cards?</p>
          <div className="mt-6 flex justify-center gap-4">
            <PopupButton onClick={handleYes}>YES</PopupButton>
            <PopupButton onClick={handleNo}>NO</PopupButton>
          </div>
        </GamePopup>
      )}

      {stage === 'noSlap' && (
        <GamePopup>
          <p className="font-mono text-lg tracking-wide text-white/90">fuck it. we&rsquo;re playing anyway.</p>
        </GamePopup>
      )}

      {stage === 'game' && (
        <GameStage
          game={game}
          scoreAnim={scoreAnim}
          leavingIds={leavingIds}
          enteringIds={enteringIds}
          busy={busy}
          onToggleSelect={handleToggleSelect}
          onPlayHand={wrappedPlayHand}
          onDiscard={wrappedDiscard}
          onChangeMusic={handleChangeMusic}
          onHelp={() => setHelpOpen(true)}
        />
      )}

      <HelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  )
}

// ── Shared popup shell ──────────────────────────────────────────────────────
function GamePopup({ children }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div
        className="poker-glass-panel relative w-full max-w-md rounded-2xl px-6 py-8 sm:px-8 sm:py-10 text-center"
        style={{ animation: 'poker-pop-in 260ms cubic-bezier(0.16,1,0.3,1)' }}
      >
        {children}
      </div>
    </div>
  )
}

function PopupButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-white/25 bg-white/5 px-6 py-2 font-mono text-xs tracking-[0.2em] text-white/85 transition-all duration-150 hover:border-white/60 hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  )
}

// Hand rankings shown in HelpOverlay, worst to best (kept in sync with
// pokerEngine's HAND_TABLE — display-only, so it can't drift from real
// scoring the way a duplicated number could).
const HAND_EXAMPLES = [
  { name: 'High Card', mult: 1, example: 'K♠ 9♥ 6♦' },
  { name: 'Pair', mult: 2, example: '9♠ 9♥ K♦' },
  { name: 'Two Pair', mult: 2, example: '9♠9♥ 4♦4♣' },
  { name: 'Three of a Kind', mult: 3, example: '9♠9♥9♦' },
  { name: 'Straight', mult: 4, example: '5-6-7-8-9' },
  { name: 'Flush', mult: 4, example: '5 same suit' },
  { name: 'Full House', mult: 5, example: '9♠9♥9♦ 4♣4♠' },
  { name: 'Four of a Kind', mult: 7, example: '9♠9♥9♦9♣' },
  { name: 'Straight Flush', mult: 10, example: 'straight + flush' },
]

function HelpOverlay({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-3 sm:p-6" onClick={onClose}>
      <div
        className="poker-glass-panel relative w-full max-w-sm rounded-2xl px-5 py-4"
        style={{ animation: 'poker-pop-in 260ms cubic-bezier(0.16,1,0.3,1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="font-mono text-sm tracking-[0.15em] text-white">HOW TO PLAY</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/25 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            ESC
          </button>
        </div>

        <p className="mt-2 font-mono text-[11px] leading-snug text-white/75">
          Select up to 5 cards. <b className="text-white">PLAY HAND</b> scores them,{' '}
          <b className="text-white">DISCARD</b> swaps them. Hit the target before hands run out.
        </p>

        <div className="mt-3 grid grid-cols-[1fr,auto,auto] gap-x-3 gap-y-1 border-t border-white/10 pt-2 font-mono text-[10px] text-white/70">
          {HAND_EXAMPLES.map((h) => (
            <>
              <div key={`${h.name}-n`} className="text-white/85">{h.name}</div>
              <div key={`${h.name}-e`} className="tabular-nums text-white/40">{h.example}</div>
              <div key={`${h.name}-m`} className="text-right font-bold" style={{ color: '#f2a869' }}>×{h.mult}</div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main game stage ─────────────────────────────────────────────────────────
function GameStage({ game, scoreAnim, leavingIds, enteringIds, busy, onToggleSelect, onPlayHand, onDiscard, onChangeMusic, onHelp }) {
  const {
    currentRound, roundIndex, phase, hand, selectedIds, previewHand,
    score, runTotal, handsLeft, discardsLeft, message,
    advanceRound, stats, highScore, isNewHighScore,
    ownedJokers, jokerOffer, chaosBuff, chooseJoker, exceptionalWin,
  } = game

  // Cards the player selected that DON'T belong to the poker hand currently
  // detected from that selection — e.g. a kicker next to a pair. They read
  // as visibly inert (see PokerCard's `dead` prop) since they score nothing.
  const scoringIdSet = previewHand ? new Set(previewHand.scoringCardIds) : null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-6">
      <div
        className="poker-glass-panel poker-panel-shell relative flex w-full sm:w-[95vw] max-w-[1200px] flex-col overflow-hidden rounded-2xl sm:rounded-3xl px-3 py-3 sm:px-8 sm:py-6"
        style={{ animation: 'poker-pop-in 320ms cubic-bezier(0.16,1,0.3,1)' }}
      >
        {/* Top bar */}
        <div className="poker-topbar flex flex-wrap items-start justify-between gap-2 sm:gap-3 font-mono text-white/85">
          <div>
            <div className="text-[10px] sm:text-[11px] tracking-[0.3em] text-white/50">ROUND {currentRound.round} / 3</div>
            <div className="poker-topbar-round mt-1 text-xl sm:text-3xl tracking-wide">TARGET: {currentRound.target}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] sm:text-[11px] tracking-[0.3em] text-white/50">SCORE</div>
            <div className="poker-topbar-score mt-1 text-xl sm:text-3xl tabular-nums tracking-wide">{score}</div>
          </div>
          <div className="flex gap-4 sm:gap-6 text-sm">
            <Stat label="HANDS" value={handsLeft} />
            <Stat label="DISCARDS" value={discardsLeft} />
          </div>
        </div>

        {/* Target progress bar */}
        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, (score / currentRound.target) * 100)}%`,
              background: 'linear-gradient(90deg, #7c6ce0, #f2769a)',
            }}
          />
        </div>

        {message && (phase === 'playing' || phase === 'jokerSelect') && (
          <div className="mt-3 text-center font-mono text-xs sm:text-sm italic tracking-wide text-white/55">{message}</div>
        )}

        {ownedJokers.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            {ownedJokers.map((j) => (
              <OwnedJokerBadge key={j.id} joker={j} />
            ))}
          </div>
        )}

        {/* Center content: cards + preview, or round transition messages */}
        <div className="relative mt-3 sm:mt-4 flex flex-1 flex-col items-center justify-center gap-3 sm:gap-4 overflow-y-auto overflow-x-hidden py-1">
          {phase === 'playing' && (
            <>
              {chaosBuff && (
                <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-[#c9a6ff] text-center">
                  CHAOS THEORY: +{chaosBuff.amount} {chaosBuff.type === 'chips' ? 'CHIPS' : 'MULT'} THIS HAND
                </div>
              )}
              <HandPreview previewHand={previewHand} scoreAnim={scoreAnim} />
              <div className="flex flex-wrap items-end justify-center gap-1.5 sm:gap-3 px-1">
                {hand.map((card) => {
                  const selected = selectedIds.includes(card.id)
                  const dead = selected && scoringIdSet ? !scoringIdSet.has(card.id) : false
                  const variant = leavingIds.has(card.id) ? 'leaving' : enteringIds.has(card.id) ? 'entering' : null
                  return (
                    <PokerCard
                      key={card.id}
                      card={card}
                      selected={selected}
                      dead={dead}
                      variant={variant}
                      disabled={busy}
                      onClick={onToggleSelect}
                    />
                  )
                })}
              </div>
            </>
          )}

          {phase === 'roundClear' && (
            <RoundTransition
              title="TARGET REACHED"
              subtitle="ROUND CLEAR"
              lines={[`FINAL SCORE`, `${score} / ${currentRound.target}`]}
              actionLabel={
                roundIndex >= 2
                  ? 'FINISH'
                  : score >= currentRound.bonusThreshold
                    ? 'CHOOSE TWO JOKERS'
                    : 'CHOOSE A JOKER'
              }
              onAction={advanceRound}
            />
          )}

          {phase === 'jokerSelect' && jokerOffer && (
            <JokerSelectPanel
              currentRound={currentRound}
              score={score}
              jokerOffer={jokerOffer}
              onChoose={chooseJoker}
            />
          )}

          {phase === 'roundFailed' && (
            <RoundTransition
              title="ROUND FAILED"
              subtitle={`${score} / ${currentRound.target}`}
              lines={['close.']}
              autoNote="· the table clears itself ·"
              dry
            />
          )}

          {phase === 'gameWon' && (
            <RoundTransition
              title="YOU WON."
              subtitle={exceptionalWin ? "you didn't need that much." : 'for now.'}
              lines={[
                `FINAL SCORE: ${runTotal}`,
                `HANDS PLAYED: ${stats.handsPlayed}`,
                `BEST HAND: ${stats.bestHand || '—'}`,
                `BEST RUN: ${highScore.bestRunScore}${isNewHighScore ? '  (new high score)' : ''}`,
              ]}
              autoNote="· the table clears itself ·"
            />
          )}
        </div>

        {/* Actions */}
        {phase === 'playing' && (
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              disabled={selectedIds.length === 0 || busy}
              onClick={onPlayHand}
              className="rounded-full border border-white/40 bg-white/15 px-5 sm:px-8 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-white transition-all duration-150 hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-30"
            >
              PLAY HAND
            </button>
            <button
              type="button"
              disabled={selectedIds.length === 0 || discardsLeft <= 0 || busy}
              onClick={onDiscard}
              className="rounded-full border border-white/30 bg-transparent px-5 sm:px-8 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-white/90 transition-all duration-150 hover:border-white/60 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              DISCARD
            </button>
          </div>
        )}

        {/* Quiet footer: the only ways out are musical, not a QUIT button */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center font-mono text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-white/55">
          <button
            type="button"
            onClick={onChangeMusic}
            className="rounded-full border px-3 py-1 transition-colors hover:text-white"
            style={{ borderColor: 'rgba(201, 166, 255, 0.35)' }}
          >
            CHANGE MUSIC
          </button>
          <span className="opacity-50">·</span>
          <button type="button" onClick={onHelp} className="flex items-center gap-1 transition-colors hover:text-white">
            <HelpCircle size={11} strokeWidth={2} />
            HOW TO PLAY
          </button>
          <span className="opacity-50">·</span>
          <span>esc or walk away from the table to leave</span>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="text-right">
      <div className="text-[10px] tracking-[0.3em] text-white/40">{label}</div>
      <div className="text-lg tabular-nums">{value}</div>
    </div>
  )
}

// Joker-attributed numbers (any chip, mult, or multiplier that came from an
// owned Joker rather than the base hand) are always rendered in this color
// — a lighter, cooler purple that matches the Joker cards themselves — so a
// glance at the math tells you exactly which part of the score is "just the
// hand" and which part a Joker added.
const JOKER_COLOR = '#c9a6ff'

function HandPreview({ previewHand, scoreAnim }) {
  if (!previewHand && !scoreAnim) {
    return <div className="h-[64px] font-mono text-sm tracking-widest text-white/55">select up to 5 cards</div>
  }

  if (scoreAnim) {
    const { result, step } = scoreAnim
    const big = ['Full House', 'Four of a Kind', 'Straight Flush'].includes(result.handName)
    return (
      <div className="flex min-h-[64px] flex-col items-center justify-center font-mono">
        <div className={cn('tracking-[0.2em] text-white/80', big ? 'text-base' : 'text-xs')}>{result.handName}</div>
        <ScoreMath result={result} revealStep={step} big={big} />
        {step >= 1 && <JokerEffectsList triggered={result.jokersTriggered} />}
      </div>
    )
  }

  return (
    <div className="flex min-h-[64px] flex-col items-center justify-center font-mono">
      <div className="text-xs tracking-[0.2em] text-white/70">{previewHand.name}</div>
      <ScoreMath result={previewHand} />
      <JokerEffectsList triggered={previewHand.jokersTriggered} />
    </div>
  )
}

// The actual chips × mult = score line, with every number a Joker touched
// broken out and colored (see JOKER_COLOR) instead of silently folded into
// one opaque total — e.g. "20 +22 × 2 = 84" instead of just "42 × 2 = 84",
// so it's obvious at a glance whether (and how much) a Joker fired.
// `revealStep` (0-3) drives the scoring build-up animation; omit it for the
// always-fully-revealed live preview shown while still selecting cards.
function ScoreMath({ result, revealStep, big = false }) {
  const {
    cardChips, jokerChips, totalChips,
    baseMult, jokerMult, multMultiplier, mult,
    scoreMultiplier, finalScore,
  } = result
  const showChips = revealStep === undefined || revealStep >= 1
  const showMult = revealStep === undefined || revealStep >= 2
  const showFinal = revealStep === undefined || revealStep >= 3
  const hasChipBonus = jokerChips > 0
  const hasMultBonus = jokerMult > 0 || multMultiplier !== 1
  const hasScoreBonus = scoreMultiplier !== 1
  const sizeClass = revealStep === undefined ? 'text-lg' : big ? 'text-3xl' : 'text-xl'

  return (
    <div className={cn('mt-1 tabular-nums', sizeClass, 'text-white/90')}>
      {showChips ? (
        <>
          <span className={cn(big ? 'text-white' : 'text-white/90')}>{cardChips}</span>
          {hasChipBonus && <span style={{ color: JOKER_COLOR }}> +{jokerChips}</span>}
        </>
      ) : 0}
      <span className="mx-1 text-white/40">×</span>
      {showMult ? (
        <>
          <span className={cn(big ? 'text-white' : 'text-white/90')}>{baseMult}</span>
          {jokerMult > 0 && <span style={{ color: JOKER_COLOR }}> +{jokerMult}</span>}
          {multMultiplier !== 1 && <span style={{ color: JOKER_COLOR }}> ×{multMultiplier}</span>}
        </>
      ) : 1}
      {showFinal && (
        <>
          <span className="mx-2 text-white/30">=</span>
          {hasScoreBonus && <span style={{ color: JOKER_COLOR }}>×{scoreMultiplier}<span className="mx-1 text-white/30">→</span></span>}
          <span style={{ color: '#f2a869' }}>{finalScore}</span>
        </>
      )}
      {showFinal && (hasChipBonus || hasMultBonus || hasScoreBonus) && (
        <div className="mt-0.5 text-[10px] font-normal normal-case tracking-normal" style={{ color: JOKER_COLOR }}>
          {[
            hasChipBonus && `+${jokerChips} chips`,
            (jokerMult > 0) && `+${jokerMult} mult`,
            (multMultiplier !== 1) && `×${multMultiplier} mult`,
            hasScoreBonus && `×${scoreMultiplier} score`,
          ].filter(Boolean).join(' · ')} from Jokers
        </div>
      )}
    </div>
  )
}

// Every Joker that actually fired this hand, listed as its own small pill
// (matching the Joker card's purple theme) with exactly what it did —
// replacing the old plain-gray "via X · Y" line, which named the Jokers but
// never said what they contributed, making it easy to assume they weren't
// doing anything at all.
function JokerEffectsList({ triggered }) {
  if (!triggered || triggered.length === 0) return null
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
      {triggered.map((t, i) => (
        <span
          key={`${t.id}-${i}`}
          className="joker-chip rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.08em]"
          style={{ color: JOKER_COLOR }}
        >
          {t.name}: <span className="text-white/90">{t.detail}</span>
        </span>
      ))}
    </div>
  )
}

// The compact "owned this run" chip in the header. It used to only show
// the Joker's name (with the full effect buried in a native browser
// `title` tooltip that doesn't work on touch at all) — now it carries its
// own icon/accent and opens the same kind of detail overlay JokerCard uses,
// on hover (desktop) or tap (anywhere on the chip; it's not a choose
// action here, so no separate "i" badge is needed).
function OwnedJokerBadge({ joker }) {
  const [open, setOpen] = useState(false)
  const { Icon, label, accent } = jokerVisual(joker)
  return (
    <span
      className="group relative"
      onClick={() => setOpen((o) => !o)}
      role="button"
      tabIndex={0}
    >
      <span
        className="joker-chip flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/85"
        style={{ borderColor: `${accent}55` }}
      >
        <Icon size={12} strokeWidth={2} style={{ color: accent }} />
        {joker.name}
      </span>
      <span
        className={cn(
          'absolute left-1/2 top-full z-40 mt-2 w-48 -translate-x-1/2 rounded-lg p-3 text-left normal-case tracking-normal transition-opacity duration-150',
          open ? 'opacity-100' : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
        )}
        style={{ background: 'rgba(7,4,13,0.97)', border: `1px solid ${accent}66` }}
      >
        <span className="flex items-center gap-1.5">
          <Icon size={14} strokeWidth={1.75} style={{ color: accent }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-white">{joker.name}</span>
        </span>
        <span className="mt-1 block text-[10px] leading-snug text-white/85">{joker.tagline}</span>
        <span className="mt-1 block text-[8px] font-bold tracking-[0.15em]" style={{ color: accent }}>{label} EFFECT</span>
      </span>
    </span>
  )
}

function JokerSelectPanel({ currentRound, score, jokerOffer, onChoose }) {
  const { choices, picksRequired, picksMade } = jokerOffer
  const doneCount = picksMade.length
  const tilts = [-3, 2, -1.5]

  return (
    <div className="flex flex-col items-center gap-4 text-center font-mono">
      <div className="text-2xl tracking-[0.15em] text-white">ROUND {currentRound.round} CLEARED</div>
      <div className="text-sm tracking-[0.25em] text-white/60">SCORE: {score} / {currentRound.target}</div>
      <div className="mt-1 text-base tracking-[0.25em]" style={{ color: '#f2a869' }}>
        {picksRequired === 2 ? `CHOOSE TWO${doneCount > 0 ? ` — ${doneCount}/2 PICKED` : ''}` : 'CHOOSE ONE'}
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-2">
        {choices.map((joker, i) => {
          const locked = picksMade.some((p) => p.id === joker.id)
          return (
            <JokerCard
              key={joker.id}
              joker={joker}
              locked={locked}
              disabled={false}
              tilt={tilts[i % tilts.length]}
              onClick={onChoose}
            />
          )
        })}
      </div>
    </div>
  )
}

function RoundTransition({ title, subtitle, lines, actionLabel, onAction, dry, autoNote }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center font-mono">
      <div className="text-2xl tracking-[0.15em] text-white">{title}</div>
      {subtitle && <div className={cn('text-sm tracking-[0.25em]', dry ? 'text-white/50' : 'text-white/70')}>{subtitle}</div>}
      <div className="mt-2 space-y-1 text-white/60">
        {lines.map((l, i) => <div key={i} className={i === 0 ? 'text-base text-white/80' : 'text-xs'}>{l}</div>)}
      </div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-full border border-white/40 bg-white/15 px-8 py-2.5 font-mono text-xs font-semibold tracking-[0.25em] text-white transition-all duration-150 hover:bg-white/25"
        >
          {actionLabel}
        </button>
      )}
      {autoNote && <div className="mt-3 text-[10px] tracking-[0.2em] text-white/35">{autoNote}</div>}
    </div>
  )
}
