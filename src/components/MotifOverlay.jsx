import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { X, Play, Pause } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { useHistoryOverlay } from '@/hooks/useHistoryOverlay'
import { pauseMusicForVideo, resumeMusicAfterVideo } from '@/hooks/useMusicBridge'
import { MOTIFS } from '@/data/motifs'

// A single vinyl disc. No dedicated disc/vinyl image exists in the project's
// assets, so the disc itself is drawn with CSS (grooves via a repeating
// radial-gradient, spin via the shared disc-spin keyframe in index.css) —
// the art in the center label comes from the existing gallery. The spin +
// play/pause button live in separate layers on purpose: the outer ring
// rotates, the button in the very center stays upright and readable.
function MotifDisc({ motif, isPlaying, onToggle }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[min(56vw,200px)] aspect-square">
        <div
          className="absolute inset-0 rounded-full border border-white/10"
          style={{
            background:
              'repeating-radial-gradient(circle at center, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1.5px, transparent 5px), #0b0b0b',
            boxShadow: '0 14px 44px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)',
            animation: 'disc-spin 5.5s linear infinite',
            animationPlayState: isPlaying ? 'running' : 'paused',
          }}
        >
          {/* Label / art circle at the center of the record */}
          <div className="absolute rounded-full overflow-hidden border border-white/15" style={{ inset: '30%', background: '#050505' }}>
            {motif.art && (
              <img src={motif.art} alt="" draggable={false} className="w-full h-full object-cover opacity-85" />
            )}
          </div>
          {/* Spindle hole */}
          <div className="absolute rounded-full bg-[#050505] border border-white/20" style={{ inset: '48%' }} />
        </div>

        {/* Static play/pause button — does not rotate with the disc */}
        <button
          onClick={onToggle}
          aria-label={isPlaying ? `Pause ${motif.title}` : `Play ${motif.title}`}
          className="absolute inset-0 m-auto w-11 h-11 rounded-full flex items-center justify-center border border-white/25 bg-black/55 text-white/80 hover:text-white hover:border-white/60 transition-all duration-200"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
      </div>

      <div className="text-center max-w-[180px]">
        <h3 className="font-display text-[clamp(15px,calc(14px+0.5vw),18px)] text-white tracking-wide leading-tight">
          {motif.title}
        </h3>
        {motif.note && (
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 mt-1.5 leading-relaxed">
            {motif.note}
          </p>
        )}
      </div>
    </div>
  )
}

export function MotifOverlay() {
  const isOpen       = useSceneStore((s) => s.motifOverlayOpen)
  const closeOverlay  = useSceneStore((s) => s.closeMotifOverlay)
  const playClick     = useClickSound()

  const overlayRef = useRef()
  const cardRef    = useRef()
  const audioRef   = useRef(null)
  const [playingId, setPlayingId] = useState(null)

  const consumeHistoryEntry = useHistoryOverlay('motif', isOpen, closeOverlay)

  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPlayingId(null)
  }, [])

  const handleClose = useCallback(() => {
    playClick()
    stopPlayback()
    if (!overlayRef.current) { closeOverlay(); consumeHistoryEntry(); return }
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        closeOverlay()
        consumeHistoryEntry()
      },
    })
  }, [playClick, stopPlayback, closeOverlay, consumeHistoryEntry])

  const handleToggle = (motif) => {
    playClick()
    if (!audioRef.current) audioRef.current = new Audio()
    const audio = audioRef.current

    if (playingId === motif.id) {
      audio.pause()
      setPlayingId(null)
      return
    }

    if (audio.src !== motif.src) audio.src = motif.src
    audio.play().catch(() => {})
    setPlayingId(motif.id)
  }

  // Opening the overlay pauses the site's ambient music (same bridge used
  // for videos); closing resumes it and stops whatever disc was spinning.
  useEffect(() => {
    if (!isOpen) return
    pauseMusicForVideo()
    return () => {
      stopPlayback()
      resumeMusicAfterVideo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // If a disc finishes playing on its own, reset the button state.
  useEffect(() => {
    if (!audioRef.current) return
    const audio = audioRef.current
    const onEnded = () => setPlayingId(null)
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [isOpen])

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
              {MOTIFS.length} {MOTIFS.length === 1 ? 'track' : 'tracks'}
            </span>
          </div>

          <h1 className="font-display text-[clamp(20px,calc(18.2px+1vw),25px)] text-white leading-[1.05] tracking-wide mb-2">
            Motif
          </h1>
          <p className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/45 leading-relaxed max-w-[560px] mb-10">
            Music, pressed to disc.
          </p>

          {MOTIFS.length === 0 ? (
            <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/30">
              No discs yet. Add entries to <span className="font-mono text-white/40">MOTIFS</span> in{' '}
              <span className="font-mono text-white/40">src/data/motifs.js</span>
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-12 pb-4">
              {MOTIFS.map((motif) => (
                <MotifDisc
                  key={motif.id}
                  motif={motif}
                  isPlaying={playingId === motif.id}
                  onToggle={() => handleToggle(motif)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
