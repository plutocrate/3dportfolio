import { useEffect, useRef, useCallback, useState } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, X, Volume2, VolumeX } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'
import { getChronicleById, getReadingTime, getStatusMeta } from '@/data/chronicles'
import {
  pauseMusicForVideo,
  resumeMusicAfterVideo,
  pauseAllVideos,
  getUserWantsMusic,
} from '@/hooks/useMusicBridge'

function MediaBlock({ item }) {
  const openLightbox = useSceneStore((s) => s.openLightbox)
  const playClick    = useClickSound()
  if (!item) return null

  const handleOpen = () => {
    playClick()
    openLightbox(item.src, item.caption || '')
  }

  const isVideo = item.type === 'video'

  return (
    <figure className="my-6">
      <div
        className="relative w-full border border-white/10 overflow-hidden"
        style={isVideo ? { background: '#0a0a0a' } : { background: '#0a0a0a', aspectRatio: item.aspect || '3 / 2' }}
      >
        {isVideo ? (
          <video
            src={item.src}
            controls
            playsInline
            loop
            className="w-full h-auto block object-contain mx-auto"
            style={{ maxHeight: '78vh' }}
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
            className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200"
            style={{ objectPosition: item.position || 'center' }}
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
  const playClick       = useClickSound()
  const { goParent }    = useGo()

  const chronicle    = openChronicleId ? getChronicleById(openChronicleId) : null
  const openLightbox = useSceneStore((s) => s.openLightbox)

  const overlayRef = useRef()
  const cardRef    = useRef()
  const musicRef   = useRef(null)
  const [musicOn, setMusicOn] = useState(false)

  const handleClose = useCallback(() => {
    playClick()
    if (!overlayRef.current) { goParent(); return }
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => goParent(),
    })
  }, [playClick, goParent])

  useEffect(() => {
    if (!chronicle) return

    pauseAllVideos()
    pauseMusicForVideo()

    // If the visitor chose "keep my music" on enter, do not autoplay this
    // chronicle's soundtrack — they can still turn it on via the bottom icon.
    const autoplay = Boolean(chronicle.music) && getUserWantsMusic()
    setMusicOn(autoplay)

    if (chronicle.music) {
      const a = new Audio(chronicle.music)
      a.loop = true
      a.volume = 0.4
      if (autoplay) a.play().catch(() => {})
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
      setMusicOn(false)
      resumeMusicAfterVideo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openChronicleId])

  const toggleMusic = (e) => {
    e.stopPropagation()
    playClick()
    if (!musicRef.current) return
    if (musicOn) {
      musicRef.current.pause()
      setMusicOn(false)
    } else {
      musicRef.current.play().catch(() => {})
      setMusicOn(true)
    }
  }

  if (!chronicle) return null

  const readingTime = getReadingTime(chronicle)

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-5"
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
          className="sticky top-3 sm:top-4 float-right mr-3 sm:mr-4 z-10 w-9 h-9 flex items-center justify-center border border-white/15 bg-black/40 text-white/50 hover:text-white hover:border-white/50 transition-all duration-200"
        >
          <X size={16} />
        </button>

        <div className="px-5 sm:px-12 pt-14 sm:pt-16 pb-20 sm:pb-24">
          <div className="max-w-[860px] mx-auto">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/15 text-white/40">
                {chronicle.category}
              </span>
              <span className={`font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] px-2 py-0.5 border ${getStatusMeta(chronicle.status).className}`}>
                {getStatusMeta(chronicle.status).label}
              </span>
              <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] text-white/28 tabular-nums">
                {chronicle.date} · {readingTime}
              </span>
            </div>

            <h1 className="font-display text-[clamp(20px,calc(18.2px+1vw),25px)] text-white leading-[1.05] tracking-wide mb-3">
              {chronicle.title}
            </h1>
            {chronicle.dek && (
              <p className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/45 leading-relaxed mb-8 italic">
                {chronicle.dek}
              </p>
            )}
          </div>

          {chronicle.coverImage && (
            <div className="max-w-[1100px] mx-auto mb-8">
              <div
                className="relative w-full border border-white/10 overflow-hidden"
                style={{ background: '#0a0a0a', aspectRatio: chronicle.coverAspect || '16 / 9' }}
              >
                <img
                  src={chronicle.coverImage}
                  alt=""
                  onClick={() => { playClick(); openLightbox(chronicle.coverImage, chronicle.title || '') }}
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200"
                  style={{ objectPosition: chronicle.coverPosition || 'center' }}
                />
              </div>
            </div>
          )}

          <div className="max-w-[860px] mx-auto">
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

            {chronicle.media && chronicle.media.length > 0 && (
              <div className="mt-2">
                {chronicle.media.map((item, i) => (
                  <MediaBlock key={i} item={item} />
                ))}
              </div>
            )}

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
          </div>
        </div>
      </div>

      {/* Fixed bottom music toggle — outside the card so position:fixed is
          viewport-relative (GSAP transform on the card would otherwise trap it). */}
      {chronicle.music && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={musicOn ? 'Mute chronicle music' : 'Play chronicle music'}
          title={musicOn ? 'Mute' : 'Play music'}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] w-10 h-10 flex items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/40 hover:text-white/80 hover:border-white/35 transition-all duration-200"
          style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
        >
          {musicOn ? <Volume2 size={16} strokeWidth={1.5} /> : <VolumeX size={16} strokeWidth={1.5} />}
        </button>
      )}
    </div>
  )
}
