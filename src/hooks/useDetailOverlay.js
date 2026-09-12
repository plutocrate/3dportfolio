import { useEffect, useRef, useState } from 'react'

// Drives the "tap to see what this Joker does" detail overlay on touch
// devices. Desktop's version of this is just a plain CSS :hover on the
// caller's own element — hovering off already closes it for free, no JS
// needed. This hook is only for the tap path, which has no "hover ends"
// to rely on, so it needs its own way to go back: tapping anywhere else
// on the page closes it immediately, and if the user just leaves it open,
// it closes itself after a few seconds either way.
const AUTO_CLOSE_MS = 5000

export function useDetailOverlay() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => setOpen(false), AUTO_CLOSE_MS)
    // pointerdown (not click) so this can never race the same tap that
    // just opened it — that tap's pointerdown has already fully finished
    // dispatching by the time React re-renders and this effect attaches.
    const onOutsidePointer = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onOutsidePointer)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('pointerdown', onOutsidePointer)
    }
  }, [open])

  return { open, setOpen, containerRef }
}
