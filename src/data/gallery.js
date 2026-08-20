// ─────────────────────────────────────────────────────────────────────────────
// GALLERY DATA — Edit this file to manage the About → Gallery section.
//
// HOW TO ADD MEDIA:
//   1. Drop the file (image / gif / video) into  public/gallery/
//   2. (Optional) Add a caption for it below, keyed by the EXACT filename.
//      If you skip this, a caption is auto-generated from the filename.
//   3. That's it — the gallery grid (and the site-wide "View All" overlay)
//      picks it up automatically on the next build/dev restart. Nothing else
//      needs to change, and there's nothing to curate or whitelist: every
//      image, gif, and video sitting in public/gallery/ shows up.
//
// This is also the SAME pool of media that project cards, chronicles, and
// motif art pull from (via plain "/gallery/filename" public paths) — one
// folder, sourced everywhere, so nothing is ever duplicated on disk.
// ─────────────────────────────────────────────────────────────────────────────

import galleryFiles from 'virtual:gallery-manifest'

export const GALLERY_CAPTIONS = {
  'adv.jpg': 'Adventure',
  'buddha.jpg': 'Stillness',
  'buddhamonkey.jpg': 'Buddha & the Monkey Mind',
  'burn.jpg': 'Burn',
  'faa.jpg': 'Faa',
  'far.jpg': 'Far',
  'godisyou.jpg': 'God Is You',
  'gorilla.jpg': 'Gorilla',
  'lastdance.jpeg': 'Last Dance',
  'letgo.jpg': 'Let Go',
  'life.jpg': 'Life',
  'lonely.jpg': 'Lonely',
  'meta.jpg': 'Kundalini',
  'mevsme.jpg': 'Me vs Me',
  'mj.jpg': 'sheeet',
  'needs.jpg': 'Needs',
  'patrick.jpg': 'Patrick',
  'peterche.jpg': 'Peter Che',
  'shinnerd.jpg': 'Shinnerd',
  'stoned.jpg': 'Stoned',
  'taketime.jpg': 'Take Time',
  'tedk.jpg': 'Ted K',
  'tedkphone.jpg': 'Ted K, on the phone',
  'terebinag.mp4': 'Late night jam',
  'walt.gif': 'Walt',
  'was.gif': 'Was',
  'whatis.jpg': 'What Is',
}

const VIDEO_EXTS = new Set(['mp4', 'webm', 'mov'])
const GIF_EXTS   = new Set(['gif'])

function extOf(filename) {
  return filename.split('.').pop().toLowerCase()
}

function mediaType(filename) {
  const ext = extOf(filename)
  if (VIDEO_EXTS.has(ext)) return 'video'
  if (GIF_EXTS.has(ext)) return 'gif'
  return 'image'
}

function prettifyFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export const GALLERY_IMAGES = galleryFiles
  .map((filename) => ({
    src: `${import.meta.env.BASE_URL}gallery/${filename}`,
    filename,
    type: mediaType(filename),
    caption: GALLERY_CAPTIONS[filename] || prettifyFilename(filename),
  }))
  .sort((a, b) => a.filename.localeCompare(b.filename))
