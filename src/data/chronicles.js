// ─────────────────────────────────────────────────────────────────────────────
// CHRONICLES — your internal essay CMS.
//
// To publish a new chronicle, copy the template below and add it to the
// CHRONICLES array. That's it — the list, the overlay, the reading-time
// badge and the category chip are all generated automatically.
//
//   {
//     id: "unique-slug",              // used as the React key + URL-safe id
//     title: "Essay title",
//     dek: "One-line subtitle / teaser shown in the list",
//     date: "26 Jul 2026",            // any human-readable date string
//     category: "Reflection",         // shown as a chip — pick one label
//     coverImage: "/media/whatis.jpg",// OPTIONAL — shown at the top of the list card + overlay
//     music: "/chronicles-music/reflection-01.mp3", // OPTIONAL — this chronicle's own soundtrack
//                                      // drop the file into /public/chronicles-music/
//                                      // and reference it here. Leave blank/omit for silence.
//     body: [                         // array of paragraphs AND inline media, in reading order.
//       "First paragraph...",         // a plain string = a paragraph
//       { type: "image", src: "/media/whatis.jpg", caption: "Optional caption" },  // an object = inline media, dropped in right here between paragraphs
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
