import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { X } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'
import { FAILURE_CONFESSIONS } from '@/data/failureConfessions'

// ── Failure Confessions overlay ──────────────────────────────────────────────
// Cabinet → Failure Confessions. Same glassmorphism "reader" chrome as the
// other Cabinet overlays (Evidence Locker, Motif), but the content is just a
// plain vertical list of text — no images, no cards, one confession after
// another, numbered.
function ConfessionEntry({ confession, index }) {
  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] text-white/57 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        {confession.date && (
          <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] text-white/55 tabular-nums">
            · {confession.date}
          </span>
        )}
      </div>
      <p className="font-body text-[clamp(14px,calc(13px+0.5vw),17px)] text-white/82 leading-relaxed max-w-[640px]">
        {confession.text}
      </p>
    </div>
  )
}

export function FailureConfessionsOverlay() {
  const isOpen       = useSceneStore((s) => s.failureOverlayOpen)
  const playClick    = useClickSound()
  const { goParent } = useGo()

  const overlayRef = useRef()
  const cardRef    = useRef()

  const handleClose = useCallback(() => {
    playClick()
    if (!overlayRef.current) { goParent(); return }
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => goParent(),
    })
  }, [playClick, goParent])

  // Mount animation
  useEffect(() => {
    if (!isOpen) return
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
    }
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.05 })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-5"
      style={{ opacity: 0 }}
      onClick={handleClose}
    >
      {/* Glassmorphism backdrop — identical treatment to the other overlays */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,4,4,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      />

      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-auto max-h-full sm:max-h-[94vh] overflow-y-auto border-0 sm:border border-white/12"
        style={{
          background: 'rgba(9,9,9,0.82)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="sticky top-3 sm:top-4 float-right mr-3 sm:mr-4 z-10 w-[47px] h-[47px] sm:w-9 sm:h-9 flex items-center justify-center border border-white/15 bg-black/40 text-white/80 hover:text-white hover:border-white/50 transition-all duration-200"
        >
          <X className="w-[21px] h-[21px] sm:w-4 sm:h-4" />
        </button>

        <div className="px-5 sm:px-12 pt-14 sm:pt-16 pb-12 sm:pb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/15 text-white/64">
              Cabinet
            </span>
            <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] text-white/57 tabular-nums">
              {FAILURE_CONFESSIONS.length} {FAILURE_CONFESSIONS.length === 1 ? 'confession' : 'confessions'}
            </span>
          </div>

          <h1 className="font-display text-[clamp(20px,calc(18.2px+1vw),25px)] text-white leading-[1.05] tracking-wide mb-2">
            Failure Confessions
          </h1>
          <p className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/67 leading-relaxed max-w-[560px] mb-2">
            Things that didn't work, said plainly.
          </p>

          {FAILURE_CONFESSIONS.length === 0 ? (
            <div className="flex flex-col gap-2 py-4">
              <div className="font-mono text-[clamp(10px,calc(9.26px+0.18vw),13px)] text-white/55 uppercase tracking-widest">
                Nothing confessed yet.
              </div>
              <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/58">
                Add entries to <span className="font-mono text-white/64">FAILURE_CONFESSIONS</span> in{' '}
                <span className="font-mono text-white/64">src/data/failureConfessions.js</span>
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/8 -mt-2">
              {FAILURE_CONFESSIONS.map((confession, idx) => (
                <ConfessionEntry key={confession.id} confession={confession} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
