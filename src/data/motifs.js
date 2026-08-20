// ─────────────────────────────────────────────────────────────────────────────
// MOTIF DATA — Cabinet → Motif. Music pieces, each pressed onto its own
// "disc" in the overlay (spin + play/pause at the center). No dedicated
// vinyl/disc image exists in the project's assets, so the disc itself is
// drawn with CSS (see MotifOverlay.jsx) and the art below is used as the
// label at its center — pulled straight from the existing gallery.
//
// Tracks are pulled from audio already in the project: two from
// src/assets/music/ (globbed the same way the ambient player does it) and
// one from public/chronicles-music/ (referenced the same way chronicles.js
// already points at it).
//
// HOW TO ADD A DISC:
//   1. Drop an audio file into src/assets/music/ (or reference a path under
//      /public directly, like the `greatgig` entry below does).
//   2. Add an entry here with a title, a short note, and an `art` image
//      (any filename already present in src/assets/gallery/ works — see
//      GALLERY_IMAGES in gallery.js — or import your own directly).
// ─────────────────────────────────────────────────────────────────────────────

import { GALLERY_IMAGES } from './gallery'

const trackModules = import.meta.glob('/src/assets/music/*.{mp3,wav,ogg,m4a}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function trackUrl(filename) {
  const entry = Object.entries(trackModules).find(([path]) => path.endsWith('/' + filename))
  return entry ? entry[1] : null
}

function artFor(filename) {
  return GALLERY_IMAGES.find((g) => g.filename === filename)?.src || null
}

export const MOTIFS = [
  {
    id: 'motif-call-me',
    title: 'Call Me',
    note: '90s flavour, late-night loop.',
    src: trackUrl('90sFlav - Call me.mp3'),
    art: artFor('far.jpg'),
  },
  {
    id: 'motif-ambient-01',
    title: 'Ambient 01',
    note: "The site's own ambience, isolated.",
    src: trackUrl('ambient-01.mp3'),
    art: artFor('burn.jpg'),
  },
  {
    id: 'motif-great-gig',
    title: 'Great Gig',
    note: 'Borrowed sky, played on repeat.',
    src: '/chronicles-music/greatgig.mp3',
    art: artFor('stoned.jpg'),
  },
  {
    id: 'motif-gta-5',
    title: 'Gta 5',
    note: 'idk why its here',
    src: '/chronicles-music/gta.mp3',
    art: artFor('buddha.jpg'),
  },
  {
    id: 'motif-interstellar',
    title: 'Zimmer',
    note: 'idk why its here again',
    src: '/chronicles-music/inter.mp3',
    art: artFor('needs.jpg'),
  },
].filter((m) => m.src)
