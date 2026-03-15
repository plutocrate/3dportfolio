import { useRef, useCallback } from 'react'

// Singleton audio instance — reused across all clicks
let audioCtx = null

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

// Loads and caches the decoded buffer once
let bufferCache = null
let loadPromise = null

async function loadBuffer() {
  if (bufferCache) return bufferCache
  if (loadPromise) return loadPromise

  loadPromise = fetch(import.meta.env.BASE_URL + 'clicked.mp3')
    .then((r) => r.arrayBuffer())
    .then((ab) => getAudioCtx().decodeAudioData(ab))
    .then((buf) => { bufferCache = buf; return buf })

  return loadPromise
}

export function useClickSound() {
  const play = useCallback(async () => {
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') await ctx.resume()
      const buf = await loadBuffer()
      const src = ctx.createBufferSource()
      src.buffer = buf
      // Slight gain control
      const gain = ctx.createGain()
      gain.gain.value = 0.7
      src.connect(gain)
      gain.connect(ctx.destination)
      src.start(0)
    } catch (e) {
      // Silently fail — audio should never break the UI
    }
  }, [])

  return play
}
