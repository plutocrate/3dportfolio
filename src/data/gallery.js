// ─────────────────────────────────────────────────────────────────────────────
// GALLERY DATA — Edit this file to manage the About → Gallery section.
//
// HOW TO ADD IMAGES:
//   1. Drop the image file into  src/assets/gallery/
//   2. (Optional) Add a caption for it below, keyed by the EXACT filename.
//      If you skip this, a caption is auto-generated from the filename.
//   3. That's it — the gallery grid picks it up automatically on next build,
//      no other code needs to change.
// ─────────────────────────────────────────────────────────────────────────────

export const GALLERY_CAPTIONS = {
	'mj.jpg':'Oh MJ, gonna miss you a lot',
	'hug.jpg':'Oh MJ, gonna miss you',
  'buddha.jpg': 'Stillness',
  'buddhamonkey.jpg': 'Buddha & the Monkey Mind',
  'burn.jpg': 'Burn',
  'far.jpg': 'Far',
  'gorilla.jpg': 'Gorilla',
  'ill.jpg': 'Ill',
  'lastdance.jpeg': 'Last Dance',
  'letgo.jpg': 'Let Go',
  'needs.jpg': 'Needs',
  'patrick.jpg': 'Patrick',
  'peterche.jpg': "Peter Che",
  'shinnerd.jpg': 'Shinnerd',
  'stoned.jpg': 'Stoned',
  'tedk.jpg': 'Ted K',
  'tedkphone.jpg': 'Ted K, on the phone',
  'walt.gif': 'Walt',
  'was.gif': 'Was',
  'whatis.jpg': 'What Is',
}

// Dynamically pull in every image dropped into src/assets/gallery/ — this is
// what makes the section update automatically without touching any component.
const modules = import.meta.glob('/src/assets/gallery/*.{jpg,jpeg,png,gif,webp,avif}', {
  eager: true,
  import: 'default',
})

function prettifyFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export const GALLERY_IMAGES = Object.entries(modules)
  .map(([path, src]) => {
    const filename = path.split('/').pop()
    return {
      src,
      filename,
      caption: GALLERY_CAPTIONS[filename] || prettifyFilename(filename),
    }
  })
  .sort((a, b) => a.filename.localeCompare(b.filename))
