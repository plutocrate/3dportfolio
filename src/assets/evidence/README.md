# Evidence Locker — image folder

Drop image files here (jpg / jpeg / png / gif / webp / avif) and they show up
in the Cabinet → Evidence Locker overlay automatically on next build.

For each image, add one short caption line in `src/data/evidence.js` keyed by
the EXACT filename. If you skip it, a title-cased version of the filename is
used instead (e.g. `first-contribution.png` → "First Contribution").

Suggested items to start with, based on what was asked for:
  - a screenshot of your first GitHub contribution
  - a photo of you in Paris
  - a photo of you making something

This file itself is never picked up (only image extensions are globbed), so
it's safe to leave here as a note to your future self.
