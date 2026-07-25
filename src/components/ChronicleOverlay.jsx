import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, X } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { getChronicleById, getReadingTime } from '@/data/chronicles'
import { pauseMusicForVideo, resumeMusicAfterVideo, pauseAllVideos } from '@/hooks/useMusicBridge'

function MediaBlock({ item }) {
  const openLightbox = useSceneStore((s) => s.openLightbox)
  const playClick    = useClickSound()
  if (!item) return null

  const handleOpen = () => {
    playClick()
    openLightbox(item.src, item.caption || '')
  }

  return (
    <figure className="my-6">
      <div
        className="relative w-full border border-white/10 overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        {item.type === 'video' ? (
          <video
            src={item.src}
            controls
            playsInline
            loop
            className="w-full block object-cover"
            style={{ height: 'clamp(280px, 52vh, 560px)' }}
            onPlay={() => pauseMusicForVideo()}
            onPause={() => resumeMusicAfterVideo()}
            onEnded={() => resumeMusicAfterVideo()}
          />
        ) : (
          <img
            src={item.src}
            alt={item.caption || ''}
            loading="lazy"
            onClick={handleOpen}
            className="w-full block object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200"
            style={{ height: 'clamp(280px, 52vh, 560px)' }}
          />
        )}
      </div>
      {item.caption && (
        <figcaption className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.14em] text-white/30 mt-2">
          {item.caption}
        </figcaption>
      )}
    </figure>
  )
}

export function ChronicleOverlay() {
  const openChronicleId = useSceneStore((s) => s.openChronicleId)
  const closeChronicle  = useSceneStore((s) => s.closeChronicle)
  const playClick       = useClickSound()

  const chronicle     = openChronicleId ? getChronicleById(openChronicleId) : null
  const openLightbox  = useSceneStore((s) => s.openLightbox)

  const overlayRef = useRef()
  const cardRef     = useRef()
  const musicRef    = useRef(null)
  // Set right before we programmatically call history.back() (i.e. when the
  // reader is closed via the X/Escape/backdrop, not the phone back button)
  // so the popstate handler below doesn't double-close it.
  const ignorePopRef = useRef(false)

  const handleClose = useCallback(() => {
    playClick()
    if (!overlayRef.current) { closeChronicle(); return }
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        closeChronicle()
        // Consume the history entry pushed on open, so it doesn't sit
        // there as a dead entry that requires an extra back-press later.
        if (window.history.state?.chronicleOverlay) {
          ignorePopRef.current = true
          window.history.back()
        }
      },
    })
  }, [playClick, closeChronicle])

  // Mount / unmount animation + chronicle-specific music
  useEffect(() => {
    if (!chronicle) return

    pauseAllVideos()
    pauseMusicForVideo()

    if (chronicle.music) {
      const a = new Audio(chronicle.music)
      a.loop = true
      a.volume = 0.4
      a.play().catch(() => {})
      musicRef.current = a
    }

    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
    }
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.05 })
    }

    return () => {
      if (musicRef.current) {
        musicRef.current.pause()
        musicRef.current.src = ''
        musicRef.current = null
      }
      resumeMusicAfterVideo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openChronicleId])

  // Push a history entry the moment a chronicle opens, so the reader behaves
  // like its own "page". A phone back-press then just pops this entry and
  // closes the reader — landing back on the Chronicles list — instead of
  // navigating away from whatever section/page was open underneath it.
  useEffect(() => {
    if (!openChronicleId) return

    window.history.pushState({ chronicleOverlay: true }, '')

    const onPopState = () => {
      if (ignorePopRef.current) { ignorePopRef.current = false; return }
      closeChronicle()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [openChronicleId, closeChronicle])

  // Escape key closes
  useEffect(() => {
    if (!chronicle) return
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chronicle, handleClose])

  if (!chronicle) return null

  const readingTime = getReadingTime(chronicle)

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-8"
      style={{ opacity: 0 }}
      onClick={handleClose}
    >
      {/* Glassmorphism backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,4,4,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      />

      {/* Reader card — full screen on mobile, 90vw on desktop */}
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-auto sm:w-[90vw] max-w-[1400px] max-h-full sm:max-h-[90vh] overflow-y-auto border-0 sm:border border-white/12"
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
          {/* Category + meta */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/15 text-white/40">
              {chronicle.category}
            </span>
            <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] text-white/28 tabular-nums">
              {chronicle.date} · {readingTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-[clamp(20px,calc(18.2px+1vw),25px)] text-white leading-[1.05] tracking-wide mb-3">
            {chronicle.title}
          </h1>
          {chronicle.dek && (
            <p className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/45 leading-relaxed mb-8 italic">
              {chronicle.dek}
            </p>
          )}

          {chronicle.coverImage && (
            <div className="w-full border border-white/10 overflow-hidden mb-8" style={{ background: '#0a0a0a' }}>
              <img
                src={chronicle.coverImage}
                alt=""
                onClick={() => { playClick(); openLightbox(chronicle.coverImage, chronicle.title || '') }}
                className="w-full block object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200"
                style={{ height: 'clamp(300px, 56vh, 600px)' }}
              />
            </div>
          )}

          {/* Body — Medium-like reading typography. Each item in `body` is
              either a paragraph (string) or inline media (object), rendered
              in the order they're written so media can sit between paragraphs. */}
          <div className="space-y-5">
            {chronicle.body.map((item, i) =>
              typeof item === 'string' ? (
                <p
                  key={i}
                  className="font-body text-[clamp(14px,calc(13.4px+0.2vw),16px)] text-white/78 leading-[1.85]"
                >
                  {item}
                </p>
              ) : (
                <MediaBlock key={i} item={item} />
              )
            )}
          </div>

          {/* Media — OPTIONAL extra images/videos shown after the body, for
              chronicles that still use the older trailing-media format. */}
          {chronicle.media && chronicle.media.length > 0 && (
            <div className="mt-2">
              {chronicle.media.map((item, i) => (
                <MediaBlock key={i} item={item} />
              ))}
            </div>
          )}

          {/* Links — underline + tilted upward arrow */}
          {chronicle.links && chronicle.links.length > 0 && (
            <div className="mt-10 pt-6 border-t border-white/10 space-y-2.5">
              <div className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.2em] text-white/25 mb-3">
                Further Reading
              </div>
              {chronicle.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 w-fit font-body text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/55 hover:text-white transition-colors"
                >
                  <span className="border-b border-white/25 group-hover:border-white/60 transition-colors">
                    {link.label}
                  </span>
                  <ArrowUpRight size={14} className="text-white/35 group-hover:text-white/70 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          )}

          {chronicle.music && (
            <div className="mt-10 font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] text-white/18">
              ♪ Playing this chronicle&apos;s soundtrack
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
