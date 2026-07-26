import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { X, ArrowUpRight } from 'lucide-react'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'
import { useHistoryOverlay } from '@/hooks/useHistoryOverlay'
import { getConstellationById } from '@/data/constellations'
import { getChronicleById } from '@/data/chronicles'
import { GALLERY_IMAGES } from '@/data/gallery'

const SIZE_PX = { sm: 6, md: 9, lg: 13 }

// Human-readable description of where a star's link goes — shown in the
// footer hint bar while that star is hovered/focused.
function describeLink(link) {
  if (!link) return null
  switch (link.type) {
    case 'external':
      return { text: link.href.replace(/^https?:\/\//, '').replace(/\/$/, ''), external: true }
    case 'chronicle': {
      const c = getChronicleById(link.chronicleId)
      return { text: `Chronicle · ${c?.title || link.chronicleId}` }
    }
    case 'gallery':
      return { text: link.filename ? `Gallery · ${link.filename}` : 'Full Gallery' }
    case 'section': {
      const labels = { about: 'About', academia: 'Academia', talk: 'Talk', blog: 'Journal', chronicles: 'Chronicles' }
      const base = labels[link.sectionId] || link.sectionId
      return { text: link.academiaTab ? `${base} · ${link.academiaTab}` : base }
    }
    default:
      return null
  }
}

function useConstellationNavigator(consumeHistoryEntry, closeConstellation) {
  const openChronicle          = useSceneStore((s) => s.openChronicle)
  const openLightbox            = useSceneStore((s) => s.openLightbox)
  const openGalleryOverlay      = useSceneStore((s) => s.openGalleryOverlay)
  const setActiveSection        = useSceneStore((s) => s.setActiveSection)
  const setAcademiaInitialTab   = useSceneStore((s) => s.setAcademiaInitialTab)
  const setPendingScroll        = useSceneStore((s) => s.setPendingScroll)
  const playClick                = useClickSound()

  return useCallback((link) => {
    if (!link) return
    playClick()

    if (link.type === 'external') {
      window.open(link.href, '_blank', 'noopener,noreferrer')
      return
    }

    if (link.type === 'chronicle') {
      // Stacks on top — the constellation stays open underneath.
      openChronicle(link.chronicleId)
      return
    }

    if (link.type === 'gallery') {
      const item = link.filename ? GALLERY_IMAGES.find((g) => g.filename === link.filename) : null
      if (item) openLightbox(item.src, item.caption)
      else openGalleryOverlay()
      return
    }

    if (link.type === 'section') {
      if (link.academiaTab) setAcademiaInitialTab(link.academiaTab)
      if (link.scrollId) setPendingScroll(link.scrollId)
      setActiveSection(link.sectionId)
      // Sections live in the sidebar, underneath these full-screen overlays —
      // close this one so the destination is actually visible.
      closeConstellation()
      consumeHistoryEntry()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playClick, openChronicle, openLightbox, openGalleryOverlay, setActiveSection, setAcademiaInitialTab, setPendingScroll, closeConstellation, consumeHistoryEntry])
}

export function ConstellationOverlay() {
  const openConstellationId = useSceneStore((s) => s.openConstellationId)
  const closeConstellation   = useSceneStore((s) => s.closeConstellation)
  const playClick              = useClickSound()

  const constellation = openConstellationId ? getConstellationById(openConstellationId) : null
  const isOpen          = Boolean(constellation)

  const overlayRef = useRef()
  const cardRef     = useRef()
  const [hoveredId, setHoveredId] = useState(null)

  const consumeHistoryEntry = useHistoryOverlay('constellation', isOpen, closeConstellation)
  const navigate = useConstellationNavigator(consumeHistoryEntry, closeConstellation)

  const handleClose = useCallback(() => {
    playClick()
    if (!overlayRef.current) { closeConstellation(); consumeHistoryEntry(); return }
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        closeConstellation()
        consumeHistoryEntry()
      },
    })
  }, [playClick, closeConstellation, consumeHistoryEntry])

  // Mount animation
  useEffect(() => {
    if (!isOpen) return
    setHoveredId(null)
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
    }
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.05 })
    }
  }, [isOpen, openConstellationId])

  // Adjacency map — which stars are directly connected to which.
  const adjacency = useMemo(() => {
    const map = new Map()
    if (!constellation) return map
    for (const n of constellation.nodes) map.set(n.id, new Set())
    for (const [a, b] of constellation.edges) {
      map.get(a)?.add(b)
      map.get(b)?.add(a)
    }
    return map
  }, [constellation])

  if (!constellation) return null

  const hoveredNode = hoveredId ? constellation.nodes.find((n) => n.id === hoveredId) : null
  const hoveredLink = hoveredNode ? describeLink(hoveredNode.link) : null

  const isNodeDim = (id) =>
    hoveredId !== null && hoveredId !== id && !adjacency.get(hoveredId)?.has(id)
  const isEdgeActive = (a, b) => hoveredId !== null && (a === hoveredId || b === hoveredId)
  const isEdgeDim = (a, b) => hoveredId !== null && !isEdgeActive(a, b)

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[65] flex items-center justify-center p-0 sm:p-5"
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
        className="relative w-full h-full sm:h-auto max-h-full sm:max-h-[94vh] overflow-y-auto border-0 sm:border border-white/12 flex flex-col"
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

        <div className="px-5 sm:px-12 pt-14 sm:pt-16 pb-6 sm:pb-8 shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/15 text-white/40">
              Constellation
            </span>
            <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] text-white/28 tabular-nums">
              {constellation.nodes.length} stars · {constellation.edges.length} links
            </span>
          </div>

          <h1 className="font-display text-[clamp(20px,calc(18.2px+1vw),25px)] text-white leading-[1.05] tracking-wide mb-2">
            {constellation.title}
          </h1>
          {constellation.description && (
            <p className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/45 leading-relaxed max-w-[560px]">
              {constellation.description}
            </p>
          )}
        </div>

        {/* ── The graph itself ── */}
        <div className="relative flex-1 min-h-[52vh] sm:min-h-[56vh] mx-5 sm:mx-12 mb-4 border border-white/8" style={{ background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.03), transparent 70%)' }}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {constellation.edges.map(([a, b], i) => {
              const na = constellation.nodes.find((n) => n.id === a)
              const nb = constellation.nodes.find((n) => n.id === b)
              if (!na || !nb) return null
              const active = isEdgeActive(a, b)
              const dim    = isEdgeDim(a, b)
              return (
                <line
                  key={i}
                  x1={na.x} y1={na.y}
                  x2={nb.x} y2={nb.y}
                  vectorEffect="non-scaling-stroke"
                  stroke={active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.18)'}
                  strokeWidth={active ? 1.4 : 0.8}
                  style={{
                    opacity: dim ? 0.12 : 1,
                    transition: 'opacity 0.35s ease, stroke 0.35s ease, stroke-width 0.35s ease',
                  }}
                />
              )
            })}
          </svg>

          {constellation.nodes.map((n, i) => {
            const dim  = isNodeDim(n.id)
            const isHovered = hoveredId === n.id
            const dia  = SIZE_PX[n.size] || SIZE_PX.md

            return (
              <button
                key={n.id}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId((h) => (h === n.id ? null : h))}
                onClick={(e) => { e.stopPropagation(); navigate(n.link) }}
                className="absolute flex flex-col items-center group"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: dim ? 0.22 : 1,
                  transition: 'opacity 0.35s ease',
                  cursor: n.link ? 'pointer' : 'default',
                }}
              >
                <span
                  className="rounded-full"
                  style={{
                    width: dia, height: dia,
                    background: '#fff',
                    boxShadow: isHovered
                      ? '0 0 10px rgba(255,255,255,0.95), 0 0 22px rgba(255,255,255,0.5)'
                      : '0 0 4px rgba(255,255,255,0.5), 0 0 9px rgba(255,255,255,0.18)',
                    animation: !hoveredId ? `star-twinkle ${3.4 + (i % 4) * 0.6}s ease-in-out ${(i % 5) * 0.4}s infinite` : 'none',
                    transition: 'box-shadow 0.3s ease',
                  }}
                />
                <span
                  className="mt-1.5 font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.14em] whitespace-nowrap px-1.5 py-0.5"
                  style={{
                    color: isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
                    background: isHovered ? 'rgba(0,0,0,0.5)' : 'transparent',
                    transition: 'color 0.3s ease, background 0.3s ease',
                  }}
                >
                  {n.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Footer hint — shows what the hovered star links to, or a default tip */}
        <div className="px-5 sm:px-12 pb-6 sm:pb-8 shrink-0">
          <div className="h-px bg-white/8 mb-3" />
          <div className="flex items-center justify-between gap-3 min-h-[1.5em]">
            <span className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.16em] text-white/35 flex items-center gap-1.5">
              {hoveredNode ? (
                <>
                  <span className="text-white/70">{hoveredNode.label}</span>
                  {hoveredLink && (
                    <>
                      <span className="text-white/20">→</span>
                      {hoveredLink.text}
                      {hoveredLink.external && <ArrowUpRight size={11} className="text-white/40" />}
                    </>
                  )}
                </>
              ) : (
                'Hover a star to trace its connections — click to open it'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
