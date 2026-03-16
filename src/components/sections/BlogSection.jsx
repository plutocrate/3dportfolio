import { useState, useRef, useCallback } from 'react'
import { pauseMusicForVideo, resumeMusicAfterVideo } from '@/hooks/useMusicBridge'
import { BLOG_POSTS } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'

// ─── Detect media type from path ─────────────────────────────────────────────
function getMediaType(src) {
  if (!src) return null
  const ext = src.split('.').pop().toLowerCase()
  if (['mp4', 'webm', 'mov', 'ogg'].includes(ext)) return 'video'
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg'].includes(ext)) return 'image'
  return null
}

// ─── Single media item — fixed 16:9 aspect ratio ─────────────────────────────
function MediaItem({ src }) {
  const [playing,   setPlaying]   = useState(false)
  const videoRef = useRef()
  const type = getMediaType(src)

  const handlePlayInline = useCallback(() => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }, [playing])

  if (!type) return null

  return (
    <>
      {/* 16:9 container */}
      <div
        className="relative w-full border border-white/8 overflow-hidden"
        style={{ paddingTop: '56.25%', background: '#0a0a0a' }}
      >
        <div className="absolute inset-0">
          {type === 'image' ? (
            <>
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
            </>
          ) : (
            <>
              <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
                loop
                playsInline
                onPlay={() => { setPlaying(true); pauseMusicForVideo() }}
                onPause={() => { setPlaying(false); resumeMusicAfterVideo() }}
                onEnded={() => { setPlaying(false); resumeMusicAfterVideo() }}
              />

              {/* Center play/pause button */}
              {!playing && (
                <button
                  onClick={handlePlayInline}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/25 bg-black/50 flex items-center justify-center group-hover:border-white/60 group-hover:bg-black/70 transition-all">
                    <span className="text-white/70 text-xl ml-0.5">▶</span>
                  </div>
                </button>
              )}

              {/* Pause overlay when playing */}
              {playing && (
                <button
                  onClick={handlePlayInline}
                  className="absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-black/50 flex items-center justify-center">
                    <span className="text-white/60 text-base">⏸</span>
                  </div>
                </button>
              )}

              {/* Duration / type label */}
              <div className="absolute bottom-2 left-2 bg-black/60 px-1.5 py-0.5">
                <span className="font-mono text-[7px] text-white/30 uppercase tracking-wider">▶ video</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

// ─── Media grid ──────────────────────────────────────────────────────────────
function MediaGrid({ media }) {
  if (!media || media.length === 0) return null
  return (
    <div className={`mt-3 grid gap-2 ${media.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {media.map((src, i) => (
        <MediaItem key={i} src={src} />
      ))}
    </div>
  )
}

// ─── Category chip ───────────────────────────────────────────────────────────
function CategoryTag({ label }) {
  return (
    <span className="font-mono text-[7px] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/15 text-white/35">
      {label}
    </span>
  )
}

// ─── Single blog entry ───────────────────────────────────────────────────────
function BlogEntry({ post, isLast }) {
  return (
    <div className="flex gap-4">
      {/* Timeline spine */}
      <div className="flex flex-col items-center shrink-0 mt-1">
        <div className="w-2 h-2 rounded-full bg-white shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-white/10 mt-2 min-h-[60px]" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-2">
        {/* Date + categories */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex flex-wrap gap-1.5">
            {post.categories.map((cat) => (
              <CategoryTag key={cat} label={cat} />
            ))}
          </div>
          <span className="font-mono text-[9px] text-white/28 shrink-0 tabular-nums">
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-mono text-[12px] text-white uppercase tracking-wider mb-1 leading-snug">
          {post.title}
        </h3>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="font-body text-[11px] text-white/40 mb-2 italic">{post.subtitle}</p>
        )}

        {/* Body */}
        <div className="space-y-2">
          {(Array.isArray(post.body) ? post.body : [post.body]).map((para, i) => (
            <p key={i} className="font-body text-[12px] text-white/55 leading-relaxed">{para}</p>
          ))}
        </div>

        {/* Media — images/videos from post.media array */}
        <MediaGrid media={post.media} />

        {/* Read more */}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 hover:text-white/70 transition-colors border-b border-white/15 hover:border-white/40 pb-px"
          >
            Read more →
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function BlogSection() {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">
          Thoughts & Writes
        </div>
        <h2 className="font-display text-5xl text-white leading-none tracking-wide">BLOG</h2>
      </div>

      <Separator />

      {BLOG_POSTS.length === 0 ? (
        <div className="flex flex-col gap-2 py-4">
          <div className="font-mono text-[10px] text-white/25 uppercase tracking-widest">No posts yet.</div>
          <p className="font-body text-[12px] text-white/30">
            Add entries to <span className="font-mono text-white/40">BLOG_POSTS</span> in{' '}
            <span className="font-mono text-white/40">src/data/portfolio.js</span>
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {BLOG_POSTS.map((post, idx) => (
            <BlogEntry key={post.id} post={post} isLast={idx === BLOG_POSTS.length - 1} />
          ))}
        </div>
      )}
    </div>
  )
}
