import { useSceneStore } from '@/hooks/useSceneStore'

export function FontControls() {
  const fontSize    = useSceneStore((s) => s.fontSize)
  const setFontSize = useSceneStore((s) => s.setFontSize)

  const step = 0.2

  return (
    <div className="flex items-center gap-1 ml-auto shrink-0">
      <button
        onClick={() => setFontSize(fontSize - step)}
        disabled={fontSize <= 0.6}
        className="w-5 h-5 flex items-center justify-center border border-white/15 font-mono text-[10px] text-white/35 hover:text-white hover:border-white/45 disabled:opacity-20 disabled:cursor-not-allowed transition-all leading-none"
        title="Decrease font size"
      >−</button>
      <button
        onClick={() => setFontSize(fontSize + step)}
        disabled={fontSize >= 2.0}
        className="w-5 h-5 flex items-center justify-center border border-white/15 font-mono text-[10px] text-white/35 hover:text-white hover:border-white/45 disabled:opacity-20 disabled:cursor-not-allowed transition-all leading-none"
        title="Increase font size"
      >+</button>
      {fontSize !== 1 && (
        <button
          onClick={() => setFontSize(1)}
          className="font-mono text-[7px] uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors px-1"
          title="Reset font size"
        >↺</button>
      )}
    </div>
  )
}
