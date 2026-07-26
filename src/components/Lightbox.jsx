import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { X } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { useHistoryOverlay } from '@/hooks/useHistoryOverlay'

// ── Global image lightbox ────────────────────────────────────────────────────
// Mounted once at the App root. Any image anywhere in the site can trigger it
// via useSceneStore().openLightbox(src, caption). Tapping/clicking the image,
// the backdrop, the close button, Escape, or the phone back button all close
// it. It can also open on top of the Chronicle/Gallery overlay — the shared
// useHistoryOverlay hook keeps that nesting straight, so a single back-press
// only closes the image, not whatever it was opened from.
export function Lightbox() {
  const src      = useSceneStore((s) => s.lightboxSrc)
  const caption  = useSceneStore((s) => s.lightboxCaption)
  const close    = useSceneStore((s) => s.closeLightbox)
  const playClick = useClickSound()

  const overlayRef = useRef()
  const isOpen = Boolean(src)

  const consumeHistoryEntry = useHistoryOverlay('lightbox', isOpen, close)

  const handleClose = useCallback(() => {
    playClick()
    if (!overlayRef.current) { close(); consumeHistoryEntry(); return }
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        close()
        consumeHistoryEntry()
      },
    })
  }, [playClick, close, consumeHistoryEntry])

  useEffect(() => {
    if (!src) return
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' })
    }
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  if (!src) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-10"
      style={{ opacity: 0 }}
      onClick={handleClose}
    >
      {/* Glassmorphism backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,4,4,0.82)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
      />

      {/* Close button */}
      <button
        onClick={handleClose}
        aria-label="Close"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-10 w-9 h-9 flex items-center justify-center border border-white/15 bg-black/40 text-white/60 hover:text-white hover:border-white/50 transition-all duration-200"
      >
        <X size={16} />
      </button>

      <figure
        className="relative max-w-[92vw] max-h-[88vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={caption || ''}
          className="max-w-[92vw] max-h-[78vh] w-auto h-auto object-contain border border-white/10"
          style={{ background: '#0a0a0a' }}
        />
        {caption && (
          <figcaption className="mt-3 font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.16em] text-white/45 text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  )
}
