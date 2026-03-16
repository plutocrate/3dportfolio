import { useRef, useState, useCallback } from 'react'

export function useAmbientMusic() {
  const audioRef      = useRef(null)
  const [playing, setPlaying] = useState(false)
  // Tracks if music was playing before a video paused it
  const pausedByVideo = useRef(false)

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
    } catch (e) {}
  }, [init])

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
      pausedByVideo.current = false // user manually turned off
    } else {
      audioRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }, [playing])

  // Video starts — remember if music was on, then pause it
  const pauseForVideo = useCallback(() => {
    if (!audioRef.current || audioRef.current.paused) return
    pausedByVideo.current = true
    audioRef.current.pause()
    // Don't change playing state — user still wants music on
  }, [])

  // Video stops — resume only if it was playing before video started
  const resumeAfterVideo = useCallback(() => {
    if (!audioRef.current || !pausedByVideo.current) return
    pausedByVideo.current = false
    audioRef.current.play().catch(() => {})
  }, [])

  return { playing, start, toggle, pauseForVideo, resumeAfterVideo }
}
