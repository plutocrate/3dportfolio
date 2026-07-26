import { useEffect, useCallback } from 'react'

// Makes an overlay behave like its own "page" in browser history: opening it
// pushes a marked history entry, and a back-press closes just that overlay
// instead of falling through to whatever page/section was open underneath.
//
// Nesting-safe: if a second overlay opens on top of this one (e.g. the image
// Lightbox opened from inside a Chronicle), each overlay only reacts when
// the history entry matching *its own* name is the one being popped — so a
// single back-press closes just the top-most overlay, not everything below.
//
// Usage:
//   const consumeHistoryEntry = useHistoryOverlay('lightbox', isOpen, close)
//   // ...in your own close handler (X button / Escape / backdrop click):
//   close()
//   consumeHistoryEntry()   // pops the entry we pushed, keeps the back stack clean
export function useHistoryOverlay(name, isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return

    window.history.pushState({ overlay: name }, '')

    const onPopState = (e) => {
      // We're still parked on our own entry — a *different* overlay stacked
      // above this one was the one that just got popped. Nothing to do.
      if (e.state?.overlay === name) return
      onClose()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, name])

  const consumeHistoryEntry = useCallback(() => {
    if (window.history.state?.overlay === name) {
      window.history.back()
    }
  }, [name])

  return consumeHistoryEntry
}
