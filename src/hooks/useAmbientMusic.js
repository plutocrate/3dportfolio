import { useRef, useState, useCallback, useEffect } from 'react'

export function useAmbientMusic() {
  const audioRef  = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  const init = useCallback(() => {
    if (audioRef.current) return
    const a = new Audio(import.meta.env.BASE_URL + 'amb.mp3')
    a.loop   = true
    a.volume = 0.35
    audioRef.current = a
  }, [])

  const start = useCallback(async () => {
    init()
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setPlaying(true)
      setStarted(true)
    } catch (e) { /* autoplay blocked */ }
  }, [init])

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }, [playing])

  return { playing, started, start, toggle }
}
