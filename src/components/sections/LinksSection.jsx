import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClickSound } from '@/hooks/useClickSound'
import { useSceneStore } from '@/hooks/useSceneStore'
import { useGo } from '@/hooks/useAppNavigation'
import { LINK_COLLECTIONS } from '@/data/portfolio'

function LinkItem({ link }) {
  const playClick = useClickSound()
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => playClick()}
      className="group flex items-center gap-1 w-fit min-w-0 font-body text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/55 hover:text-white transition-colors"
    >
      <span className="border-b border-white/25 group-hover:border-white/60 transition-colors truncate">
        {link.label}
      </span>
      <ArrowUpRight size={13} className="text-white/35 group-hover:text-white/70 transition-colors shrink-0" />
    </a>
  )
}

export function LinksSection() {
  const tab       = useSceneStore((s) => s.linksTab) || LINK_COLLECTIONS[0]?.id
  const { go }    = useGo()
  const playClick = useClickSound()

  if (!LINK_COLLECTIONS.length) return null

  const active = LINK_COLLECTIONS.find((c) => c.id === tab) || LINK_COLLECTIONS[0]

  return (
    <div>
      <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-3">Links</div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {LINK_COLLECTIONS.map((c) => (
          <button
            key={c.id}
            onClick={() => { playClick(); go(`/about/links/${c.id}`) }}
            className={cn(
              'font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] px-3 py-1.5 border transition-all duration-200',
              tab === c.id
                ? 'border-white/60 text-white bg-white/5'
                : 'border-white/12 text-white/35 hover:text-white/65 hover:border-white/30'
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {active && (
        <div>
          <div className="font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.2em] text-white/25 mb-3">
            {active.heading}
          </div>
          {active.links.length === 0 ? (
            <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/30">
              No links here yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              {active.links.map((link, i) => (
                <LinkItem key={i} link={link} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
