import { useRef, useState, useCallback, useMemo } from 'react'
import musicFiles from 'virtual:music-manifest'
import { setUserWantsMusic, getUserWantsMusic } from '@/hooks/useMusicBridge'

// ─────────────────────────────────────────────────────────────────────────────
// AMBIENT MUSIC PLAYER
// Auto-discovers every track dropped into public/music/ at build time — just
// add more .mp3/.wav/.ogg/.m4a files there and they're automatically picked
// up into the playlist, no code changes needed. This is the SAME track list
// used for the Motif discs (src/data/motifs.js) and the one you pick a
// chronicle's own soundtrack from (src/data/chronicles.js) — one folder,
// sourced everywhere. One random track plays on every visit, and the player
// auto-advances to another random track when the current one ends.
// ─────────────────────────────────────────────────────────────────────────────

// Turn "ambient-01.mp3" → "Ambient 01"
function humanize(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function buildPlaylist() {
  if (musicFiles.length === 0) {
    // Fallback so the player never breaks if the folder is ever emptied
    return [{ url: import.meta.env.BASE_URL + 'music/ambient-01.mp3', name: 'Ambience' }]
  }
  return musicFiles.map((filename) => ({
    url: `${import.meta.env.BASE_URL}music/${filename}`,
    name: humanize(filename),
  }))
}

function shuffle(array) {
  const arr = array.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Builds a fresh shuffled play order covering every track exactly once.
// `avoidFirst` (the last track played before this reshuffle) is kept out of
// slot 0 when possible, so looping the queue never plays the same song twice
// in a row right at the seam between one shuffle and the next.
function buildQueue(length, avoidFirst = -1) {
  const order = shuffle(Array.from({ length }, (_, i) => i))
  if (length > 1 && order[0] === avoidFirst) {
    const swapWith = 1 + Math.floor(Math.random() * (length - 1))
    ;[order[0], order[swapWith]] = [order[swapWith], order[0]]
  }
  return order
}

export function useAmbientMusic() {
  const playlist = useMemo(buildPlaylist, [])
  const audioRef       = useRef(null)
  const [playing, setPlaying]         = useState(false)
  const [trackIndex, setTrackIndex]   = useState(0)
  // Tracks if music was playing before a video paused it
  const pausedByVideo = useRef(false)

  // The shuffled play order + where we are in it. Refs, not state — advancing
  // through the queue shouldn't trigger a re-render on its own; only the
  // resulting trackIndex (for the HUD's track name) needs to.
  const queueRef = useRef([])
  const queuePosRef = useRef(0)

  const loadTrack = useCallback((index, autoplay) => {
    if (!audioRef.current) return
    const track = playlist[index]
    if (!track) return
    audioRef.current.src = track.url
    if (autoplay) {
      audioRef.current.play().catch(() => {})
    }
  }, [playlist])

  // Move to the next slot in the shuffled queue, reshuffling once we've
  // played every track (so listeners hear the whole set before anything
  // repeats, instead of the old "random every time" approach that could
  // resurface the same song after just one or two skips).
  const advance = useCallback((autoplay) => {
    queuePosRef.current += 1
    if (queuePosRef.current >= queueRef.current.length) {
      const lastPlayed = queueRef.current[queueRef.current.length - 1]
      queueRef.current = buildQueue(playlist.length, lastPlayed)
      queuePosRef.current = 0
    }
    const nextIdx = queueRef.current[queuePosRef.current]
    loadTrack(nextIdx, autoplay)
    setTrackIndex(nextIdx)
  }, [playlist, loadTrack])

  const init = useCallback(() => {
    if (audioRef.current) return
    const a = new Audio()
    a.loop   = false // playlist auto-advances instead of looping a single track
    a.volume = 0.35
    queueRef.current = buildQueue(playlist.length)
    queuePosRef.current = 0
    const startIndex = queueRef.current[0]
    a.addEventListener('ended', () => advance(true))
    audioRef.current = a
    setTrackIndex(startIndex)
    a.src = playlist[startIndex]?.url
  }, [playlist, advance])

  const start = useCallback(async () => {
    init()
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setPlaying(true)
      setUserWantsMusic(true)
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
      setUserWantsMusic(false)
      pausedByVideo.current = false // user manually turned off
    } else {
      audioRef.current.play().catch(() => {})
      setPlaying(true)
      setUserWantsMusic(true)
    }
  }, [playing])

  // Skip to the next track in the shuffled queue (not a fresh random pick —
  // see `advance` above).
  const next = useCallback(() => {
    if (!audioRef.current || playlist.length <= 1) return
    advance(playing)
  }, [playlist, playing, advance])

  // Video starts — remember if music was on, then pause it
  const pauseForVideo = useCallback(() => {
    if (!audioRef.current || audioRef.current.paused) return
    pausedByVideo.current = true
    audioRef.current.pause()
    // Don't change playing state — user still wants music on
  }, [])

  // Video stops — resume only if it was playing before video started
  const resumeAfterVideo = useCallback(() => {
    if (!getUserWantsMusic()) return
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
