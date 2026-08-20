// ─────────────────────────────────────────────────────────────────────────────
// MOTIF DATA — Cabinet → Motif. Every track sitting in public/music/ gets its
// own "disc" in the overlay (spin + play/pause at the center). No dedicated
// vinyl/disc image exists in the project's assets, so the disc itself is
// drawn with CSS (see MotifOverlay.jsx), and the label at its center is an
// image pulled straight from the gallery (round-robin, so every disc gets art
// without anything needing to be hand-picked).
//
// public/music/ is the single source of truth for all audio on the site: the
// background ambient player (useAmbientMusic.js) shuffles the exact same
// list, and a chronicle's own soundtrack (src/data/chronicles.js `music`
// field) is just a "/music/<filename>" path into this same folder.
//
// HOW TO ADD A DISC:
//   Drop an audio file into public/music/ — that's it, it shows up here
//   automatically on the next build/dev restart. (public/music/sfx/ is
//   reserved for short UI sound effects like the click sound and is not
//   included in this list.)
// ─────────────────────────────────────────────────────────────────────────────

import musicFiles from 'virtual:music-manifest'
import { GALLERY_IMAGES } from './gallery'

function humanize(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function slugify(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const MOTIFS = musicFiles.map((filename, i) => ({
  id: `motif-${slugify(filename)}`,
  title: humanize(filename),
  note: 'From the site\'s music library.',
  src: `${import.meta.env.BASE_URL}music/${filename}`,
  art: GALLERY_IMAGES.length ? GALLERY_IMAGES[i % GALLERY_IMAGES.length].src : null,
}))
