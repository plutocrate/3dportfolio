import { BLOG_POSTS } from '@/data/portfolio'
import { Separator } from '@/components/ui/separator'

// Category tag chip
function CategoryTag({ label }) {
  return (
    <span className="font-mono text-[7px] uppercase tracking-[0.18em] px-2 py-0.5 border border-white/15 text-white/35">
      {label}
    </span>
  )
}

// Single blog post entry — timeline style matching ExperienceSection
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
        {/* Date + category row */}
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

        {/* Subtitle / excerpt */}
        {post.subtitle && (
          <p className="font-body text-[11px] text-white/40 mb-2 italic">
            {post.subtitle}
          </p>
        )}

        {/* Body paragraphs — supports array of strings or single string */}
        <div className="space-y-2">
          {(Array.isArray(post.body) ? post.body : [post.body]).map((para, i) => (
            <p key={i} className="font-body text-[12px] text-white/55 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Optional read-more link */}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 hover:text-white/70 transition-colors border-b border-white/15 hover:border-white/40 pb-px"
          >
            Read more →
          </a>
        )}
      </div>
    </div>
  )
}

export function BlogSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">
          Thoughts & Writes
        </div>
        <h2 className="font-display text-5xl text-white leading-none tracking-wide">
          BLOG
        </h2>
      </div>

      <Separator />

      {BLOG_POSTS.length === 0 ? (
        <div className="flex flex-col gap-2 py-4">
          <div className="font-mono text-[10px] text-white/25 uppercase tracking-widest">
            No posts yet.
          </div>
          <p className="font-body text-[12px] text-white/30">
            Add entries to the <span className="font-mono text-white/40">BLOG_POSTS</span> array in{' '}
            <span className="font-mono text-white/40">src/data/portfolio.js</span> to populate this section.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {BLOG_POSTS.map((post, idx) => (
            <BlogEntry
              key={post.id}
              post={post}
              isLast={idx === BLOG_POSTS.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
