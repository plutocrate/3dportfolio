// ─────────────────────────────────────────────────────────────────────────────
// EVIDENCE LOCKER DATA — Cabinet → Evidence Locker. A small, plain-spoken
// drawer: a screenshot, a photo, a proof of something happening. One image,
// one short line — nothing longer.
//
// HOW TO ADD AN ITEM:
//   1. Drop the image file into  public/evidence/
//   2. Add one short line of caption text below, keyed by the EXACT filename.
//      Skip it and a title-cased version of the filename is used instead.
//   3. That's it — the locker picks it up automatically on the next
//      build/dev restart, no other code needs to change.
// ─────────────────────────────────────────────────────────────────────────────

import evidenceFiles from 'virtual:evidence-manifest'

export const EVIDENCE_CAPTIONS = {
  'dummy-01.jpg': 'Placeholder — swap this for a real one.',
  'dummy-02.jpg': 'Placeholder — swap this for a real one too.',
  // 'first-contribution.png': 'First open-source PR, merged.',
  // 'paris.jpg': 'Paris, standing still for once.',
  // 'making-something.jpg': 'Mid-build, past 2am.',
}

function prettifyFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export const EVIDENCE_ITEMS = evidenceFiles
  .map((filename) => ({
    filename,
    src: `${import.meta.env.BASE_URL}evidence/${filename}`,
    text: EVIDENCE_CAPTIONS[filename] || prettifyFilename(filename),
  }))
  .sort((a, b) => a.filename.localeCompare(b.filename))
