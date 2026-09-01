import { Archive, Gift, Disc, Frown, ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useClickSound } from '@/hooks/useClickSound'
import { useGo } from '@/hooks/useAppNavigation'
import { EVIDENCE_ITEMS } from '@/data/evidence'
import { MOTIFS } from '@/data/motifs'
import { FAILURE_CONFESSIONS } from '@/data/failureConfessions'

function DrawerCard({ icon: Icon, label, description, count, countLabel, onOpen }) {
  const playClick = useClickSound()

  return (
    <button
      onClick={() => { playClick(); onOpen() }}
      className="group w-full text-left flex items-start gap-4"
    >
      <div className="shrink-0 w-[57px] h-[57px] sm:w-11 sm:h-11 mt-0.5 border border-white/12 flex items-center justify-center text-white/72 group-hover:text-white/95 group-hover:border-white/40 transition-all duration-300">
        <Icon className="w-[23px] h-[23px] sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-tight tracking-wide group-hover:text-white/85 transition-colors">
            {label}
          </h3>
          <ChevronRight
            className="w-[23px] h-[23px] sm:w-[18px] sm:h-[18px] mt-1 shrink-0 text-white/65 group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300"
          />
        </div>

        {count != null && (
          <span className="inline-block font-mono text-[clamp(9px,calc(8.44px+0.14vw),11px)] uppercase tracking-[0.18em] text-white/57 tabular-nums mb-1.5">
            {count} {countLabel}
          </span>
        )}

        <p className="font-body text-[clamp(12px,calc(11.08px+0.28vw),15px)] text-white/67 leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  )
}

export function CabinetSection() {
  const { go } = useGo()

  const drawers = [
    {
      key: 'evidence-locker',
      icon: Archive,
      label: 'EVIDENCE LOCKER',
      description: 'Small proof of a life being lived — a screenshot, a photo, something made.',
      count: EVIDENCE_ITEMS.length,
      countLabel: EVIDENCE_ITEMS.length === 1 ? 'item' : 'items',
      onOpen: () => go('/cabinet/evidence'),
    },
    {
      key: 'motif',
      icon: Disc,
      label: 'MOTIF',
      description: 'Music, pressed to disc. Press play, let it spin.',
      count: MOTIFS.length,
      countLabel: MOTIFS.length === 1 ? 'track' : 'tracks',
      onOpen: () => go('/cabinet/motif'),
    },
    {
      key: 'failure-confessions',
      icon: Frown,
      label: 'FAILURE CONFESSIONS',
      description: 'Things that didn\u2019t work, said plainly.',
      count: FAILURE_CONFESSIONS.length,
      countLabel: FAILURE_CONFESSIONS.length === 1 ? 'confession' : 'confessions',
      onOpen: () => go('/cabinet/failure-confessions'),
    },
    {
      key: 'gift-shop',
      icon: Gift,
      label: 'GIFT SHOP',
      description: 'A question, curated by me, gifted to you — no purchase necessary.',
      count: null,
      onOpen: () => go('/cabinet/gift-shop'),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.16vw),13px)] uppercase tracking-[0.25em] text-ember/75 mb-1">
          A Drawer Of Small Things
        </div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide">CABINET</h2>
      </div>

      <Separator />

      <div className="space-y-6">
        {drawers.map((d, idx) => (
          <div key={d.key}>
            <DrawerCard
              icon={d.icon}
              label={d.label}
              description={d.description}
              count={d.count}
              countLabel={d.countLabel}
              onOpen={d.onOpen}
            />
            {idx < drawers.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
      </div>
    </div>
  )
}
