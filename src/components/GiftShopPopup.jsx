import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { X, RefreshCw, Gift } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'
import { GIFT_QUESTIONS, randomGiftIndex } from '@/data/giftQuestions'

// ── Gift Shop popup ──────────────────────────────────────────────────────────
// Cabinet → Gift Shop. Small centered card; URL is /cabinet/gift-shop.
export function GiftShopPopup() {
  const isOpen         = useSceneStore((s) => s.giftPopupOpen)
  const questionIndex  = useSceneStore((s) => s.giftQuestionIndex)
  const reroll         = useSceneStore((s) => s.rerollGift)
  const playClick      = useClickSound()
  const { goParent }   = useGo()

  const cardRef = useRef()
  const question = questionIndex != null ? GIFT_QUESTIONS[questionIndex] : null

  const handleClose = () => { playClick(); goParent() }
  const handleReroll = (e) => {
    e.stopPropagation()
    playClick()
    reroll(randomGiftIndex(questionIndex))
  }

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
          className="absolute top-3 right-3 w-[42px] h-[42px] sm:w-8 sm:h-8 flex items-center justify-center border border-white/15 text-white/80 hover:text-white hover:border-white/50 transition-all duration-200"
        >
          <X className="w-[18px] h-[18px] sm:w-[14px] sm:h-[14px]" />
        </button>

        <div className="flex items-center gap-2 mb-5">
          <Gift size={14} className="text-white/72" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/72">
            A Gift, For You
          </span>
        </div>

        <p className="font-display text-[clamp(18px,calc(16.6px+0.9vw),23px)] text-white leading-snug tracking-wide mb-7">
          {question}
        </p>

        <button
          onClick={handleReroll}
          className="inline-flex items-center gap-1.5 py-1.5 sm:py-0 font-mono text-[13px] sm:text-[10px] uppercase tracking-[0.18em] text-white/70 hover:text-white/90 transition-colors border-b border-white/15 hover:border-white/40 pb-px"
        >
          <RefreshCw className="w-[14px] h-[14px] sm:w-[11px] sm:h-[11px]" />
          Another One
        </button>
      </div>
    </div>
  )
}
