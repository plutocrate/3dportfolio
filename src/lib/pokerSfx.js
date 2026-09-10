// ─────────────────────────────────────────────────────────────────────────────
// POKER SFX
// Tiny synthesized blips for the card game, built with WebAudio oscillators
// instead of shipping new audio files. Deliberately quiet and short so they
// sit underneath the ambient track rather than fighting it — the music is
// the point, these are just texture.
// ─────────────────────────────────────────────────────────────────────────────

let ctx = null
function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  return ctx
}

function blip({ freq = 440, duration = 0.08, type = 'sine', gain = 0.05, glideTo = null, delay = 0 }) {
  try {
    const c = getCtx()
    if (c.state === 'suspended') c.resume().catch(() => {})
    const t0 = c.currentTime + delay
    const osc = c.createOscillator()
    const g = c.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t0)
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + duration)
    g.gain.setValueAtTime(0.0001, t0)
    g.gain.exponentialRampToValueAtTime(gain, t0 + duration * 0.2)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
    osc.connect(g)
    g.connect(c.destination)
    osc.start(t0)
    osc.stop(t0 + duration + 0.02)
  } catch (e) {
    // Audio should never break gameplay
  }
}

export const pokerSfx = {
  draw: () => blip({ freq: 260, glideTo: 340, duration: 0.06, type: 'triangle', gain: 0.035 }),
  select: () => blip({ freq: 520, duration: 0.05, type: 'sine', gain: 0.045 }),
  deselect: () => blip({ freq: 340, duration: 0.05, type: 'sine', gain: 0.03 }),
  play: () => {
    blip({ freq: 200, glideTo: 500, duration: 0.12, type: 'sawtooth', gain: 0.05 })
    blip({ freq: 700, duration: 0.08, type: 'sine', gain: 0.04, delay: 0.05 })
  },
  discard: () => blip({ freq: 300, glideTo: 120, duration: 0.14, type: 'sawtooth', gain: 0.04 }),
  scoreTick: () => blip({ freq: 900, duration: 0.03, type: 'square', gain: 0.02 }),
  target: () => {
    blip({ freq: 440, duration: 0.1, type: 'sine', gain: 0.05 })
    blip({ freq: 660, duration: 0.14, type: 'sine', gain: 0.05, delay: 0.09 })
    blip({ freq: 880, duration: 0.2, type: 'sine', gain: 0.05, delay: 0.18 })
  },
  fail: () => {
    blip({ freq: 220, glideTo: 90, duration: 0.35, type: 'sine', gain: 0.05 })
  },
}
