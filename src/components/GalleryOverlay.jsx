import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { X } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { useHistoryOverlay } from '@/hooks/useHistoryOverlay'
import { GALLERY_IMAGES } from '@/data/gallery'

// ── Full Gallery overlay ─────────────────────────────────────────────────────
// Same glassmorphism "reader" chrome as ChronicleOverlay (backdrop blur, card,
// sticky close button) but instead of an article it shows every image from
// GALLERY_IMAGES as a static masonry grid. No marquee, no infinite scroll —
// just the whole gallery, once, so it can be scanned top to bottom.
function GalleryGridTile({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="group block w-full mb-3 break-inside-avoid text-left border border-white/8 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {item.type === 'video' ? (
        <video
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-auto block opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
        />
      ) : (
        <img
          src={item.src}
          alt={item.caption}
          loading="lazy"
          draggable={false}
          className="w-full h-auto block opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
        />
      )}
      {item.caption && (
        <span className="block px-2 py-1.5 font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.14em] text-white/35 group-hover:text-white/65 transition-colors">
          {item.caption}
        </span>
      )}
    </button>
  )
}

export function GalleryOverlay() {
  const isOpen        = useSceneStore((s) => s.galleryOverlayOpen)
  const closeOverlay   = useSceneStore((s) => s.closeGalleryOverlay)
  const openLightbox   = useSceneStore((s) => s.openLightbox)
  const playClick      = useClickSound()

  const overlayRef = useRef()
  const cardRef    = useRef()

  const consumeHistoryEntry = useHistoryOverlay('gallery', isOpen, closeOverlay)

  const handleClose = useCallback(() => {
    playClick()
    if (!overlayRef.current) { closeOverlay(); consumeHistoryEntry(); return }
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        closeOverlay()
        consumeHistoryEntry()
      },
    })
  }, [playClick, closeOverlay, consumeHistoryEntry])

  const handleOpen = (item) => {
    playClick()
    openLightbox(item.src, item.caption)
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
      {/* Glassmorphism backdrop — identical treatment to ChronicleOverlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,4,4,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      />

      {/* Reader-style card — full screen on mobile; on desktop it fills the
          padded area above (fixed ~20px margin), same as the two Chronicle
          overlays, so every glass-card overlay reads as the same size. */}
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
          {/* Category + meta — mirrors Chronicle header format */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/15 text-white/40">
              Gallery
            </span>
            <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] text-white/28 tabular-nums">
              {GALLERY_IMAGES.length} {GALLERY_IMAGES.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <h1 className="font-display text-[clamp(20px,calc(18.2px+1vw),25px)] text-white leading-[1.05] tracking-wide mb-8">
            Full Gallery
          </h1>

          {GALLERY_IMAGES.length === 0 ? (
            <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/30">
              No images yet.
            </p>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3">
              {GALLERY_IMAGES.map((item) => (
                <GalleryGridTile key={item.filename} item={item} onOpen={handleOpen} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
