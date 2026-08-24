import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { X } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'
import { EVIDENCE_ITEMS } from '@/data/evidence'

// ── Evidence Locker overlay ──────────────────────────────────────────────────
// Cabinet → Evidence Locker. Same glassmorphism "reader" chrome as the other
// full-screen overlays (Chronicle, Gallery, Motif), but the content is just a
// small grid of proof-of-life images — one photo, one short line each. No
// long write-ups on purpose. Tapping a tile opens it full-size in the shared
// Lightbox, stacked on top (nesting handled by useHistoryOverlay).
function EvidenceTile({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="group block w-full text-left border border-white/8 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div className="relative w-full overflow-hidden" style={{ paddingTop: '75%' }}>
        <img
          src={item.src}
          alt={item.text}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
        />
      </div>
      {item.text && (
        <span className="block px-2.5 py-2 font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] text-white/40 group-hover:text-white/70 leading-snug transition-colors">
          {item.text}
        </span>
      )}
    </button>
  )
}

export function EvidenceOverlay() {
  const isOpen        = useSceneStore((s) => s.evidenceOverlayOpen)
  const openLightbox  = useSceneStore((s) => s.openLightbox)
  const playClick     = useClickSound()
  const { goParent }  = useGo()

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

  const handleOpen = (item) => {
    playClick()
    openLightbox(item.src, item.text)
  }

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
          className="sticky top-3 sm:top-4 float-right mr-3 sm:mr-4 z-10 w-9 h-9 flex items-center justify-center border border-white/15 bg-black/40 text-white/50 hover:text-white hover:border-white/50 transition-all duration-200"
        >
          <X size={16} />
        </button>

        <div className="px-5 sm:px-12 pt-14 sm:pt-16 pb-12 sm:pb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/15 text-white/40">
              Cabinet
            </span>
            <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] text-white/28 tabular-nums">
              {EVIDENCE_ITEMS.length} {EVIDENCE_ITEMS.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <h1 className="font-display text-[clamp(20px,calc(18.2px+1vw),25px)] text-white leading-[1.05] tracking-wide mb-2">
            Evidence Locker
          </h1>
          <p className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/45 leading-relaxed max-w-[560px] mb-8">
            Small proof of a life being lived.
          </p>

          {EVIDENCE_ITEMS.length === 0 ? (
            <div className="flex flex-col gap-2 py-4">
              <div className="font-mono text-[clamp(10px,calc(9.26px+0.18vw),13px)] text-white/25 uppercase tracking-widest">
                The locker is empty.
              </div>
              <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/30">
                Drop images into <span className="font-mono text-white/40">public/evidence/</span> and
                list them in <span className="font-mono text-white/40">src/data/evidence.js</span>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {EVIDENCE_ITEMS.map((item) => (
                <EvidenceTile key={item.filename} item={item} onOpen={handleOpen} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
