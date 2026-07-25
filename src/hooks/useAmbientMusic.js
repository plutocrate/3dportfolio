import { useRef, useState, useCallback, useMemo } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// AMBIENT MUSIC PLAYER
// Auto-discovers every track dropped into src/assets/music/ at build time —
// just add more .mp3/.wav/.ogg files there and they're automatically picked
// up into the playlist, no code changes needed. One random track plays on
// every visit, and the player auto-advances to another random track when the
// current one ends.
// ─────────────────────────────────────────────────────────────────────────────

const trackModules = import.meta.glob('/src/assets/music/*.{mp3,wav,ogg,m4a}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Turn "ambient-01.mp3" → "Ambient 01"
function humanize(path) {
  const file = path.split('/').pop().replace(/\.[^.]+$/, '')
  return file
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function buildPlaylist() {
  const entries = Object.entries(trackModules).sort(([a], [b]) => a.localeCompare(b))
  if (entries.length === 0) {
    // Fallback so the player never breaks if the folder is ever emptied
    return [{ url: import.meta.env.BASE_URL + 'amb.mp3', name: 'Ambience' }]
  }
  return entries.map(([path, url]) => ({ url, name: humanize(path) }))
}

function shuffledIndices(length, excludeIndex = -1) {
  const idx = Array.from({ length }, (_, i) => i).filter((i) => i !== excludeIndex)
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return idx
}

export function useAmbientMusic() {
  const playlist = useMemo(buildPlaylist, [])
  const audioRef       = useRef(null)
  const [playing, setPlaying]         = useState(false)
  const [trackIndex, setTrackIndex]   = useState(0)
  // Tracks if music was playing before a video paused it
  const pausedByVideo = useRef(false)

  const loadTrack = useCallback((index, autoplay) => {
    if (!audioRef.current) return
    const track = playlist[index]
    if (!track) return
    audioRef.current.src = track.url
    if (autoplay) {
      audioRef.current.play().catch(() => {})
    }
  }, [playlist])

  const init = useCallback(() => {
    if (audioRef.current) return
    const a = new Audio()
    a.loop   = false // playlist auto-advances instead of looping a single track
    a.volume = 0.35
    const startIndex = Math.floor(Math.random() * playlist.length)
    a.addEventListener('ended', () => {
      setTrackIndex((prev) => {
        const next = playlist.length > 1
          ? shuffledIndices(playlist.length, prev)[0]
          : prev
        loadTrack(next, true)
        return next
      })
    })
    audioRef.current = a
    setTrackIndex(startIndex)
    a.src = playlist[startIndex]?.url
  }, [playlist, loadTrack])

  const start = useCallback(async () => {
    init()
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setPlaying(true)
    } catch (e) {
      // Autoplay may be blocked until the user interacts — safe to ignore
    }
  }, [init])

  // Set up the <audio> element without playing it. Used when the visitor
  // chooses "Enter without music" so the HUD's manual music toggle still
  // works later if they change their mind — without ever autoplaying.
  const prepare = useCallback(() => {
    init()
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

  // Skip to another random track in the playlist
  const next = useCallback(() => {
    if (!audioRef.current || playlist.length <= 1) return
    const wasPlaying = playing
    setTrackIndex((prev) => {
      const nextIdx = shuffledIndices(playlist.length, prev)[0]
      loadTrack(nextIdx, wasPlaying)
      return nextIdx
    })
  }, [playlist, playing, loadTrack])

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

  const currentTrack = playlist[trackIndex] || playlist[0]

  return {
    playing,
    start,
    prepare,
    toggle,
    next,
    pauseForVideo,
    resumeAfterVideo,
    trackName: currentTrack?.name || 'Ambience',
    hasMultipleTracks: playlist.length > 1,
  }
}
