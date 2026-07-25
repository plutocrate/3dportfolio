import { Expand } from 'lucide-react'
import { GALLERY_IMAGES } from '@/data/gallery'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useClickSound } from '@/hooks/useClickSound'

const COLUMN_COUNT = 2

// Round-robin the flat image list into N columns — gives each column a
// different mix so the masonry doesn't look like it's just been cut in half.
function splitColumns(images, columns) {
  const cols = Array.from({ length: columns }, () => [])
  images.forEach((img, i) => cols[i % columns].push(img))
  return cols
}

function GalleryTile({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="group block w-full mb-3 text-left border border-white/8 overflow-hidden shrink-0"
      style={{ background: '#0a0a0a' }}
    >
      <img
        src={item.src}
        alt={item.caption}
        loading="lazy"
        draggable={false}
        className="w-full h-auto block opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
      />
      {item.caption && (
        <span className="block px-2 py-1.5 font-mono text-[clamp(8px,calc(7.72px+0.07vw),9px)] uppercase tracking-[0.14em] text-white/35 group-hover:text-white/65 transition-colors">
          {item.caption}
        </span>
      )}
    </button>
  )
}

// One vertical marquee column. Renders the item list twice (doubled) so the
// 0% → -50% translateY loop is seamless, and pauses mid-scroll whenever the
// global lightbox is open (see useSceneStore lightboxSrc).
function MarqueeColumn({ items, duration, paused, onOpen }) {
  if (items.length === 0) return null
  const doubled = [...items, ...items]

  return (
    <div className="relative flex-1 min-w-0 overflow-hidden" style={{ height: 'min(700px, 78vh)' }}>
      <div
        className="flex flex-col"
        style={{
          animation: `gallery-marquee-up ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <GalleryTile key={`${item.filename}-${i}`} item={item} onOpen={onOpen} />
        ))}
      </div>

      {/* Fade top/bottom edges so images entering/leaving feel seamless */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-10 z-10"
        style={{ background: 'linear-gradient(to bottom, #070707 0%, rgba(7,7,7,0) 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 z-10"
        style={{ background: 'linear-gradient(to top, #070707 0%, rgba(7,7,7,0) 100%)' }}
      />
    </div>
  )
}

export function GallerySection() {
  const lightboxOpen     = useSceneStore((s) => s.lightboxSrc !== null)
  const galleryOverlayOpen = useSceneStore((s) => s.galleryOverlayOpen)
  const openLightbox     = useSceneStore((s) => s.openLightbox)
  const openGalleryOverlay = useSceneStore((s) => s.openGalleryOverlay)
  const playClick         = useClickSound()

  const handleOpen = (item) => {
    playClick()
    openLightbox(item.src, item.caption)
  }

  const handleViewAll = () => {
    playClick()
    openGalleryOverlay()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/30">Gallery</div>

        {GALLERY_IMAGES.length > 0 && (
          <button
            onClick={handleViewAll}
            className="group flex items-center gap-1.5 font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.16em] px-2.5 py-1 border border-white/15 text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
          >
            <Expand size={12} className="text-white/40 group-hover:text-white transition-colors" />
            View All
          </button>
        )}
      </div>

      {GALLERY_IMAGES.length === 0 ? (
        <div className="flex flex-col gap-2 py-4">
          <div className="font-mono text-[clamp(10px,calc(9.26px+0.18vw),13px)] text-white/25 uppercase tracking-widest">No images yet.</div>
          <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/30">
            Drop images into <span className="font-mono text-white/40">src/assets/gallery/</span> — captions can
            be set in <span className="font-mono text-white/40">src/data/gallery.js</span>.
          </p>
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            {splitColumns(GALLERY_IMAGES, COLUMN_COUNT).map((col, i) => (
              <MarqueeColumn
                key={i}
                items={col}
                duration={58 + i * 14}
                paused={lightboxOpen || galleryOverlayOpen}
                onOpen={handleOpen}
              />
            ))}
          </div>
          <p className="mt-3 font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] text-white/20 uppercase tracking-[0.16em]">
            Tap any image to view
          </p>
        </>
      )}
    </div>
  )
}
