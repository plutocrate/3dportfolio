import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { X, RefreshCw, Gift } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { GIFT_QUESTIONS, randomGiftIndex } from '@/data/giftQuestions'

// ── Gift Shop popup ──────────────────────────────────────────────────────────
// Cabinet → Gift Shop. Deliberately NOT one of the full-screen glass overlays
// and NOT wired into useHistoryOverlay/browser history — just a small card
// centered on screen showing one curated question at a time. Backdrop click,
// the X, or Escape all dismiss it; "Another one" rerolls in place.
export function GiftShopPopup() {
  const isOpen         = useSceneStore((s) => s.giftPopupOpen)
  const questionIndex  = useSceneStore((s) => s.giftQuestionIndex)
  const close           = useSceneStore((s) => s.closeGiftPopup)
  const reroll           = useSceneStore((s) => s.rerollGift)
  const playClick        = useClickSound()

  const cardRef = useRef()
  const question = questionIndex != null ? GIFT_QUESTIONS[questionIndex] : null

  const handleClose = () => { playClick(); close() }
  const handleReroll = (e) => {
    e.stopPropagation()
    playClick()
    reroll(randomGiftIndex(questionIndex))
  }

  // Escape closes it too, even though it isn't part of the history stack.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // Animate in on open, and re-pulse the card slightly on reroll so a new
  // question landing feels like something, not just a text swap.
  useEffect(() => {
    if (!isOpen || !cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.94, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    )
  }, [isOpen, questionIndex])

  if (!isOpen || question == null) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-5"
      onClick={handleClose}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,4,4,0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      />

      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[460px] border border-white/12 p-6 sm:p-8"
        style={{
          background: 'rgba(9,9,9,0.9)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border border-white/15 text-white/50 hover:text-white hover:border-white/50 transition-all duration-200"
        >
          <X size={14} />
        </button>

        <div className="flex items-center gap-2 mb-5">
          <Gift size={14} className="text-white/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            A Gift, For You
          </span>
        </div>

        <p className="font-display text-[clamp(18px,calc(16.6px+0.9vw),23px)] text-white leading-snug tracking-wide mb-7">
          {question}
        </p>

        <button
          onClick={handleReroll}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 hover:text-white/70 transition-colors border-b border-white/15 hover:border-white/40 pb-px"
        >
          <RefreshCw size={11} />
          Another One
        </button>
      </div>
    </div>
  )
}
