import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { X } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'
import { CHRONICLES } from '@/data/chronicles'
import { ChronicleCard } from '@/components/sections/ChroniclesSection'

export function ChronicleCategoryOverlay() {
  const category     = useSceneStore((s) => s.openChronicleCategory)
  const playClick    = useClickSound()
  const { goParent } = useGo()

  const isOpen = Boolean(category)
  const items  = isOpen ? CHRONICLES.filter((c) => c.category === category) : []

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
      className="fixed inset-0 z-[65] flex items-center justify-center p-0 sm:p-5"
      style={{ opacity: 0 }}
      onClick={handleClose}
    >
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
              Chronicles
            </span>
            <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] text-white/57 tabular-nums">
              {items.length} {items.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>

          <h1 className="font-display text-[clamp(20px,calc(18.2px+1vw),25px)] text-white leading-[1.05] tracking-wide mb-8">
            {category}
          </h1>

          {items.length === 0 ? (
            <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/58">
              No chronicles under this heading yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
              {items.map((c) => (
                <ChronicleCard key={c.id} chronicle={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
