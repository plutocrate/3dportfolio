// ─────────────────────────────────────────────────────────────────────────────
// EVIDENCE LOCKER DATA — Cabinet → Evidence Locker. A small, plain-spoken
// drawer: a screenshot, a photo, a proof of something happening. One image,
// one short line — nothing longer.
//
// HOW TO ADD AN ITEM:
//   1. Drop the image file into  src/assets/evidence/
//   2. Add one short line of caption text below, keyed by the EXACT filename.
//      Skip it and a title-cased version of the filename is used instead.
//   3. That's it — the locker picks it up automatically on next build, no
//      other code needs to change.
//
// A few to start with, matching what this drawer was built for:
//   'first-contribution.png' → screenshot of your first GitHub contribution
//   'paris.jpg'              → a photo of you in Paris
//   'making-something.jpg'   → a photo of you making something
// ─────────────────────────────────────────────────────────────────────────────

export const EVIDENCE_CAPTIONS = {
  'dummy-01.jpg': 'Placeholder — swap this for a real one.',
  'dummy-02.jpg': 'Placeholder — swap this for a real one too.',
  // 'first-contribution.png': 'First open-source PR, merged.',
  // 'paris.jpg': 'Paris, standing still for once.',
  // 'making-something.jpg': 'Mid-build, past 2am.',
}

// Dynamically pull in every image dropped into src/assets/evidence/ — this is
// what makes the locker update automatically without touching any component.
const modules = import.meta.glob('/src/assets/evidence/*.{jpg,jpeg,png,gif,webp,avif}', {
  eager: true,
  import: 'default',
})

function prettifyFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export const EVIDENCE_ITEMS = Object.entries(modules)
  .map(([path, src]) => {
    const filename = path.split('/').pop()
    return {
      filename,
      src,
      text: EVIDENCE_CAPTIONS[filename] || prettifyFilename(filename),
    }
  })
  .sort((a, b) => a.filename.localeCompare(b.filename))
