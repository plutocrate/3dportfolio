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
    id: "on-philosophy-and-life",
    title: "Who Am I?",
    dek: "Who the fuck am 'I'?",
    date: "26 Jul 2026",
    category: "Understanding 'I'",
    status: "In Progress",
    coverImage: "/media/rest.jpg",
    music: "/chronicles-music/greatgig.mp3",
    body: [
		"I've started reading a little about Advaita Vedanta, and the more I think about it, the more I realize that the question isn't really asking for another label. It is asking me to investigate the person who is doing the labeling in the first place.",

"I normally say I am my name, my body, my history, my personality, my relationships, my ambitions, my failures, my memories. But all of these things are constantly changing.",

"My body has changed. My opinions have changed. My interests have changed. My relationships have changed. My emotions change every day. Even my idea of who I am keeps changing.",

"So Advaita asks me to stop for a moment and actually look at my experience.",

"I can see my body. I can feel sensations in it. So my body is something I experience.",

"I can notice a thought. For example, 'I miss her.' The thought appears in my mind, stays for a while, and disappears or gets replaced by another thought. So the thought is something I experience.",

"I can notice sadness. I can notice happiness. I can notice anger. I can notice desire. They all appear and disappear. So even my emotions are things I experience.",

"I can remember something from years ago. I can watch the memory come back. So even my memories are something I experience.",

"Then there is this strange feeling of 'I'. I can even notice myself thinking about who I am.",

"So I keep coming back to the same question: if all of these things can be experienced, then am I really any of these things?",

"Maybe I have a body, but I am not ultimately the body.",

"Maybe I have thoughts, but I am not ultimately my thoughts.",

"Maybe I experience emotions, but I am not ultimately my emotions.",

"Maybe I have memories and a personality, but neither of those seems permanent enough to be the deepest answer to who I am.",

"This doesn't mean that my body, thoughts, emotions or memories are fake. They are obviously part of my life. I'm not trying to deny them. I'm trying to understand the difference between the things I experience and the one who is experiencing them.",

"That is where the idea of sākṣin, the witness, starts making sense to me.",

"The witness is not some tiny person sitting inside my head watching my thoughts like a movie. If I imagine it that way, I've just created another object that I can think about.",

"The question is much stranger: what is it that is aware of the thought in the first place?",

"I don't have to create awareness. I don't have to force myself to become aware. A thought simply appears, and I know that it appeared.",

"Sadness appears, and I know that sadness is there.",

"A sound appears, and I know that I heard it.",

"A memory appears, and I know that I remembered something.",

"Everything I normally experience comes and goes, but the fact that these experiences are being known is always present whenever I'm conscious.",

"Then Advaita gives another idea: neti, neti — 'not this, not this.'",

"I look at the body: not this.",

"I look at thoughts: not this.",

"I look at emotions: not this.",

"I look at memories: not this.",

"I look at my personality: not this.",

"Not because these things don't exist, but because none of them seems to be the final, unchanging Self.",

"And this is where I start reaching the word Ātman.",

"Ātman is not simply 'my soul' or some invisible version of my personality. In Advaita, it points toward the deepest Self — the consciousness that is not merely another object appearing in experience.",

"Then comes the really fucking huge claim: Ātman is Brahman.",

"At first that sounds like 'I am God', but that's not what the claim means. It would be ridiculous if my ego simply declared itself the creator of the universe.",

"The claim is much deeper than that.",

"Brahman is the ultimate reality. Advaita says that the deepest Self, Ātman, is not ultimately separate from that reality.",

"That's what Advaita, 'not two', is pointing toward.",

"I normally experience myself as something separate from the world. There is 'me' here and 'everything else' out there.",

"Advaita asks me to investigate whether that separation is actually fundamental.",

"Maybe the deepest truth isn't that there is a small individual self trapped inside a giant universe. Maybe the consciousness I call 'myself' is not ultimately a separate thing at all.",

"And this changes the way I think about my own emotions too.",

"When I miss someone, I don't have to deny it.",

"When I'm hurt, I don't have to pretend I'm above it.",

"When I'm happy, I don't have to reject it either.",

"I can experience all of it while also noticing that every emotion is something that appears and changes.",

"Maybe this is what I was trying to say when I wrote that I'm no longer falling into my emotional river, but riding it.",

"But Advaita makes me ask one step further: who is aware that the river is flowing?",

"I don't think the answer is supposed to become another concept that I memorize. I think the point is to actually investigate it.",

"So for now, I'm not going to turn Advaita into an aesthetic or pretend that I understand enlightenment. I want to read the Upanishads, the Bhagavad Gita, and eventually Śaṅkara properly. I want to understand the arguments instead of just collecting Sanskrit words.",

"But the direction is becoming clearer.",

"I keep looking at everything I normally call 'me' and asking: is this something I experience, or is this the deepest experiencer?",

"Body — changing.",

"Thoughts — changing.",

"Emotions — changing.",

"Memories — changing.",

"Personality — changing.",

"And underneath all of this is the question of the Self.",

"Advaita's answer is not another identity to wear.",

"It is that the deepest Self is Ātman, and that Ātman is Brahman.",

"Not two realities. Not a separate little self standing apart from existence.",

"Ātman is Brahman. I am not ultimately separate from the reality I have been searching for."
    ],
    links: [
      { label: "advaitavedanta.in", href: "https://www.advaitavedanta.in/advaita_english" },
      { label: "Advaita Vedanta wiki", href: "https://en.wikipedia.org/wiki/Advaita_Vedanta" },
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
