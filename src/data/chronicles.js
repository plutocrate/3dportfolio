// ─────────────────────────────────────────────────────────────────────────────
// CHRONICLES — your internal essay CMS.
//
// To publish a new chronicle, copy the template below and add it to the
// CHRONICLES array. That's it — the heading list, the per-heading overlay,
// the reading area, the reading-time badge, and the category/status chips
// are all generated automatically.
//
// IMPORTANT — `category` does double duty:
//   1. It's still shown as the small chip on each chronicle card/header.
//   2. It's also the HEADING it gets grouped under in the Chronicles section.
//      Every chronicle sharing the same `category` string is bundled into
//      one clickable heading; clicking it lists just those chronicles.
//      Chronicles are grouped in first-seen order, and within a heading they
//      keep the order they appear in this array — so put your newest entry
//      for a given category first if you want it to show first.
//   Give two chronicles the exact same `category` string (case-sensitive) to
//   file them under the same heading — e.g. two entries with
//   category: "Reflection" will both appear under one "Reflection" heading.
//
// `status` — shown as a second chip next to the category, on both the
// heading list (using its most recent chronicle) and every card inside a
// heading's overlay. Optional; omit it and it reads as "Completed". Stick to
// one of the three below for consistent coloring, but any string works —
// unrecognized values just render in the neutral "Completed" style. Tweak
// the actual colors in getStatusMeta() below.
//   "Completed"    — done, published (default)
//   "In Progress"  — actively being written
//   "Draft"        — early / not ready for prime time
//
// `coverImage` crop control — the overlay's hero image and the card
// thumbnail both use object-cover so they always fill their box with no
// letterboxed gaps. If a particular image gets cropped awkwardly (e.g. a
// tall illustration losing its head/feet), you don't need to re-edit the
// image — just add either or both of these to that chronicle:
//   coverAspect:   CSS aspect-ratio for the OVERLAY hero only, e.g. "16/9",
//                  "4/3", "1/1". Defaults to "16/9" if omitted. (The card
//                  thumbnail in list/grid views keeps a fixed banner ratio
//                  so every card in a grid lines up — only its focal point
//                  is adjustable, via coverPosition below.)
//   coverPosition: CSS object-position, e.g. "center", "top", "30% 20%".
//                  Shifts the crop's focal point in BOTH the card thumbnail
//                  and the overlay hero. Defaults to "center".
//
//   {
//     id: "unique-slug",              // used as the React key + URL-safe id
//     title: "Essay title",
//     dek: "One-line subtitle / teaser shown in the list",
//     date: "26 Jul 2026",            // any human-readable date string
//     category: "Reflection",         // chip label AND heading grouping key — see note above
//     status: "Completed",            // OPTIONAL — "Completed" | "In Progress" | "Draft" — see note above
//     coverImage: "/media/whatis.jpg",// OPTIONAL — shown at the top of the list card + overlay
//     coverAspect: "16/9",            // OPTIONAL — overlay hero aspect ratio, see note above
//     coverPosition: "center",        // OPTIONAL — crop focal point, see note above
//     music: "/chronicles-music/reflection-01.mp3", // OPTIONAL — this chronicle's own soundtrack
//                                      // drop the file into /public/chronicles-music/
//                                      // and reference it here. Leave blank/omit for silence.
//     body: [                         // array of paragraphs AND inline media, in reading order.
//       "First paragraph...",         // a plain string = a paragraph
//       { type: "image", src: "/media/whatis.jpg", caption: "Optional caption", aspect: "3/2", position: "center" },
//                                      // an object = inline media, dropped in right here between
//                                      // paragraphs. `aspect`/`position` are OPTIONAL and work like
//                                      // coverAspect/coverPosition above (image items only — videos
//                                      // always show uncropped so their full frame stays visible).
//       "Second paragraph, appears after the image above...",
//       { type: "video", src: "/media/terebinag.mp4" },
//       "Third paragraph...",
//     ],
//     media: [                        // OPTIONAL — extra images / videos shown at the END,
//       { type: "image", src: "/media/whatis.jpg", caption: "Optional caption" },  // after everything in `body`. Use the inline
//     ],                              // form above if you want media mid-article instead.
//     links: [                        // OPTIONAL — shown inline as "further reading"
//       { label: "The paper I'm referencing", href: "https://example.com" },
//     ],
//   }
//
// Reading time is computed automatically from the word count of the text
// paragraphs (≈200 wpm) — you never need to set it by hand.
// ─────────────────────────────────────────────────────────────────────────────

export const CHRONICLES = [
  {
    id: "on-building-slowly",
    title: "On building slowly.",
    dek: "Why I stopped racing to ship and started racing to understand.",
    date: "26 Jul 2026",
    category: "Reflection",
    status: "Completed",
    coverImage: "/media/walt.gif",
    music: "/chronicles-music/greatgig.mp3",
    body: [
      "There's a particular kind of anxiety that comes from watching other people ship. Every timeline is a highlight reel of launches, and it's easy to mistake velocity for progress. I fell into that trap for a long time — measuring my worth in commits, in features, in how fast I could go from idea to something clickable.",
      "What I've slowly learned is that speed without direction is just motion. I've shipped things I don't remember building, solved problems I can't explain anymore, because I was moving too fast to actually understand what I was doing. The code worked, sure. But it wasn't mine in any meaningful sense — it was assembled, not built.",
      // Inline media example — drop an image/video object directly into `body`
      // at the point in the essay where you want it to appear.
      { type: "image", src: "/media/whatis.jpg", caption: "A note to self, taped above the desk." },
      "Building slowly doesn't mean building less. It means sitting with a problem long enough to see its shape before reaching for a solution. It means reading the error message twice before pasting it somewhere. It means asking why a thing is broken instead of just making the red text go away.",
      "I think a lot about craftsmanship now — the old kind, the kind where someone spends a season on a single piece of furniture and the joints outlive them. That's not really achievable in software, where everything is disposable by design. But the posture is worth borrowing: care as a practice, not a deadline.",
      "So this is me, publicly, choosing to build slowly. Not because fast is wrong, but because I've noticed that the things I'm proudest of were never the fastest things I made. They were the ones I understood completely, down to the last decision.",
    ],
    links: [
      { label: "Peter Naur — Programming as Theory Building", href: "https://pages.cs.wisc.edu/~remzi/Naur.pdf" },
    ],
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

// ~200 words per minute average reading speed — only counts text paragraphs,
// inline media objects are skipped.
export function getReadingTime(chronicle) {
  const words = (chronicle.body || [])
    .filter((item) => typeof item === "string")
    .join(" ").trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export function getChronicleById(id) {
  return CHRONICLES.find((c) => c.id === id) || null
}

// Maps a chronicle's `status` string to a display label + Tailwind classes
// for the StatusChip. Unrecognized/omitted statuses fall back to the
// "Completed" look, so older entries without a `status` field still render
// sensibly. Add more entries here if you introduce new status labels.
const STATUS_STYLES = {
  "completed":    { label: "Completed",    className: "border-emerald-400/25 text-emerald-300/70" },
  "in progress":  { label: "In Progress",  className: "border-amber-400/25 text-amber-300/70" },
  "draft":        { label: "Draft",        className: "border-white/12 text-white/35" },
}

export function getStatusMeta(status) {
  const key = (status || "completed").trim().toLowerCase()
  return STATUS_STYLES[key] || { label: status || "Completed", className: STATUS_STYLES.completed.className }
}
