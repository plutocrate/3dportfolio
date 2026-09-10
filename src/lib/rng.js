// A tiny seeded PRNG (mulberry32) — deterministic given the same seed, so a
// run's Joker pool/order is fixed for that run's lifetime while still being
// different from run to run. Not used for anything else (deck shuffling
// stays on Math.random — only the Joker system needs to be "seeded").
export function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function makeSeed() {
  return (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0
}
