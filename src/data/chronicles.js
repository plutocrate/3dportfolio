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
  {
    id: "the-discipline-of-unfinished-things",
    title: "The discipline of unfinished things.",
    dek: "Not every open loop needs closing — some are worth leaving open on purpose.",
    date: "02 Aug 2026",
    category: "Reflection",
    status: "Completed",
    coverImage: "/media/letgo.jpg",
    coverPosition: "center",
    music: "/chronicles-music/greatgig.mp3",
    body: [
      "I keep a folder called 'someday' — half-written essays, abandoned side projects, a sketch of an app I still think about sometimes. For years I treated it as a graveyard, proof of my own inconsistency. Lately I've started to see it differently.",
      "Not everything that's unfinished is a failure. Some ideas are seeds you plant and walk away from, trusting that if they're any good, you'll come back to them with more to say. Forcing closure on every open thread just to feel productive is its own kind of dishonesty — you finish the thing, but not well, and you've spent the version of yourself that could have finished it right.",
      "There's a difference between abandoning something and letting it rest. Abandonment is walking away and not looking back. Rest is walking away on purpose, with the door left unlocked.",
      "I've started being more deliberate about which of my unfinished things are resting and which are actually done being worked on. The rested ones stay in the folder without guilt. The dead ones I archive and let go of, properly, so they stop taking up quiet space in my head.",
    ],
  },
  {
    id: "what-silence-teaches",
    title: "What silence teaches.",
    dek: "A week without notifications, and what came back to fill the space.",
    date: "14 Aug 2026",
    category: "Reflection",
    status: "In Progress",
    coverImage: "/media/stoned.jpg",
    body: [
      "I turned off every notification on my phone for a week — not the phone itself, just the constant, low hum of things asking for my attention. The first day was the hardest. I kept picking the phone up out of habit and finding nothing waiting for me, which felt strange, almost rude.",
      "By the third day something shifted. Thoughts that usually got interrupted before they finished had room to actually finish. I noticed I'd been treating my own attention as background noise, something to be filled rather than protected.",
      "I'm not going to pretend I've solved anything — this is still in progress, in every sense. But I've kept the notifications off past the week I promised myself, and that alone tells me something.",
    ],
  },

  {
    id: "why-i-stopped-fearing-legacy-code",
    title: "Why I stopped fearing legacy code.",
    dek: "Old systems aren't broken by default — they're just honest about their history.",
    date: "20 Aug 2026",
    category: "Systems & Software",
    status: "Completed",
    coverImage: "/media/tedk.jpg",
    body: [
      "Every developer has a story about inheriting a codebase that made them want to quit. Mine involved a decade-old billing system, undocumented, held together by a single engineer's tribal knowledge who'd left the company two years prior. My first instinct was to rewrite it. My second, more useful instinct was to ask why it looked the way it did.",
      "Legacy code isn't a moral failing. It's a record of every real constraint the system has survived — deadlines, outages, requirements nobody wrote down, decisions that made perfect sense at the time. Reading old code charitably means reading it as a series of answers to questions you don't yet know were asked.",
      "Once I stopped treating the codebase as an enemy and started treating it as a witness, refactoring got easier. I wasn't erasing someone's mistakes anymore — I was having a conversation with them, one commit at a time.",
      "The systems that scare us the most are usually the ones that have quietly worked for the longest. That's not an accident. It's evidence.",
    ],
    links: [
      { label: "Working Effectively with Legacy Code — Michael Feathers", href: "https://www.oreilly.com/library/view/working-effectively-with/0131177052/" },
    ],
  },
  {
    id: "the-invisible-cost-of-abstraction",
    title: "The invisible cost of abstraction.",
    dek: "Every layer that hides complexity also hides a decision. Someone still has to know it.",
    date: "28 Aug 2026",
    category: "Systems & Software",
    status: "Completed",
    coverImage: "/media/gorilla.jpg",
    body: [
      "Abstraction is supposed to be a gift — hide the hard part, expose the simple part, let people build faster. Mostly, it works. But every abstraction is also a bet: a bet that the thing you're hiding will stay hidden, that nobody downstream will need to know what's underneath.",
      "The bet usually pays off. But when it doesn't — when the abstraction leaks, when the framework's assumption breaks under your specific load, when the ORM generates a query that brings the database to its knees — someone has to go find the thing that was hidden. And if nobody on the team ever learned what was under there, that search takes days instead of minutes.",
      { type: "image", src: "/media/ill.jpg", caption: "The layer nobody reads until it breaks." },
      "I've started treating 'do we understand what this abstraction is hiding' as its own line item when adopting a new tool. Not because I distrust the tool — because I want the team to still have a map when the terrain doesn't match it.",
    ],
  },
  {
    id: "notes-on-debugging-as-a-way-of-thinking",
    title: "Notes on debugging as a way of thinking.",
    dek: "The best debugging sessions taught me more about reasoning than any course did.",
    date: "05 Sep 2026",
    category: "Systems & Software",
    status: "Draft",
    coverImage: "/media/patrick.jpg",
    body: [
      "Debugging gets treated like a chore — the unglamorous tax you pay for writing software. I've come to think it's closer to the opposite: it's the moment where you're forced to reason honestly, because the computer doesn't care what you meant, only what you wrote.",
      "A good debugging session has a shape. First, you're certain you know the cause, and you're wrong. Then you're humbled into actually reading the logs instead of guessing. Then, usually, the bug turns out to live one layer below where you were looking — which is its own small lesson about where to look first next time.",
      "This one's still a draft in my head as much as on the page — I keep wanting to add more examples. But the core of it hasn't changed in months: debugging is just thinking, with immediate consequences.",
    ],
  },

  {
    id: "on-becoming-who-you-already-are",
    title: "On becoming who you already are.",
    dek: "Growth isn't always addition. Sometimes it's remembering what got buried.",
    date: "12 Sep 2026",
    category: "Philosophy & Life",
    status: "Completed",
    coverImage: "/media/buddha.jpg",
    music: "/media/secunda.mp3",
    body: [
      "There's a version of self-improvement that treats you as a project to optimize — more habits, more discipline, a better version assembled from parts you didn't have before. I don't think that's wrong, exactly, but I think it's incomplete.",
      "The changes that have actually stuck for me weren't additions. They were closer to excavations — clearing away the noise, the borrowed opinions, the habits I picked up to fit in rather than to be well, until something that was already there could actually be seen.",
      "Nietzsche's line about 'becoming who you are' used to sound like a riddle to me. Now it reads more like an instruction: the work isn't building a new self from scratch, it's stopping the interference long enough to hear the one you've got.",
    ],
  },
  {
    id: "the-paradox-of-choice-revisited",
    title: "The paradox of choice, revisited.",
    dek: "More options didn't make me freer. It made deciding feel like a small grief every time.",
    date: "19 Sep 2026",
    category: "Philosophy & Life",
    status: "Completed",
    coverImage: "/media/peterche.jpg",
    body: [
      "Barry Schwartz's argument is old news by now — more choices, past a certain point, make people less happy, not more. I'd read it, nodded along, and kept living exactly the same, browsing twenty tabs before buying a pair of headphones.",
      "What changed it for me wasn't the theory, it was noticing the specific feeling that comes right after almost every decision: a small, quiet grief for the option I didn't pick. Multiply that by every meal, every show, every purchase, and you get a life that's technically full of freedom and quietly exhausted by it.",
      "I've started deliberately shrinking my choice set on anything that doesn't matter — same coffee order, a rotating uniform of clothes, one streaming service at a time. It's not minimalism as aesthetic. It's minimalism as a tax refund on attention.",
    ],
  },
  {
    id: "a-short-defense-of-doing-nothing",
    title: "A short defense of doing nothing.",
    dek: "Rest isn't the thing you earn after productivity. It's part of the work.",
    date: "27 Sep 2026",
    category: "Philosophy & Life",
    status: "In Progress",
    coverImage: "/media/lastdance.jpeg",
    body: [
      "I used to feel guilty sitting still. Doing nothing felt like theft — time stolen from whatever I was supposed to be building instead. It took getting genuinely burnt out to notice that the guilt itself was doing damage, independent of whatever I wasn't doing.",
      "Rest that's earned only after enough output isn't really rest — it's just a coupon you redeem occasionally, still priced in someone else's currency. The rest that actually restores anything is the kind you take without needing to justify it first.",
      "I'm still working out what unearned rest looks like in practice, day to day — that's why this one's staying in progress for now. But the direction feels right: doing nothing, on purpose, without an invoice attached.",
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
