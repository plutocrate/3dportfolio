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
//     coverImage: "/gallery/whatis.jpg",// OPTIONAL — shown at the top of the list card + overlay
//     coverAspect: "16/9",            // OPTIONAL — overlay hero aspect ratio, see note above
//     coverPosition: "center",        // OPTIONAL — crop focal point, see note above
//     music: "/music/reflection-01.mp3", // OPTIONAL — this chronicle's own soundtrack
//                                      // drop the file into /public/music/
//                                      // and reference it here. Leave blank/omit for silence.
//     body: [                         // array of paragraphs AND inline media, in reading order.
//       "First paragraph...",         // a plain string = a paragraph
//       { type: "image", src: "/gallery/whatis.jpg", caption: "Optional caption", aspect: "3/2", position: "center" },
//                                      // an object = inline media, dropped in right here between
//                                      // paragraphs. `aspect`/`position` are OPTIONAL and work like
//                                      // coverAspect/coverPosition above (image items only — videos
//                                      // always show uncropped so their full frame stays visible).
//       "Second paragraph, appears after the image above...",
//       { type: "video", src: "/gallery/terebinag.mp4" },
//       "Third paragraph...",
//     ],
//     media: [                        // OPTIONAL — extra images / videos shown at the END,
//       { type: "image", src: "/gallery/whatis.jpg", caption: "Optional caption" },  // after everything in `body`. Use the inline
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
    id: "understanding-advaita",
    title: "Advaita Vedanta -- my understanding.",
    dek: "Who the fuck am 'I'?",
    date: "21 Aug 2026",
    category: "Understanding Life",
    status: "In Progress",
    coverImage: "/gallery/faa.jpg",
    coverPosition: "top",
    music: "/music/inter.mp3",
    body: [
      "I've started reading a little about Advaita Vedanta, and the more I think about it, the more I realize that the question isn't really asking for another label. It is asking me to investigate the person who is doing the labeling in the first place.",

      "I normally say I am my name, my body, my history, my personality, my relationships, my ambitions, my failures, my memories. But all of these things are constantly changing.",

      "My body has changed. My opinions have changed. My interests have changed. My relationships have changed. My emotions change every day. Even my idea of who I am keeps changing.",

      "So Advaita asks me to stop for a moment and actually look at my experience.",

      { type: "image", src: "/gallery/meta.jpg", caption: "kundalini", aspect: "3/2", position: "center" },

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

      { type: "image", src: "/gallery/godisyou.jpg", caption: "kundalini", aspect: "3/2", position: "center" },

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

      { type: "image", src: "/gallery/taketime.jpg", caption: "kundalini", aspect: "3/2", position: "top" },

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
    id: "understanding-stoicism",
    title: "Stoicism -- my understanding",
    dek: "What the fuck is in my control?",
    date: "24 Aug 2026",
    category: "Understanding Life",
    status: "In Progress",
    coverImage: "/gallery/stoic_banner.jpg",
    coverPosition: "center",
    music: "/music/greatgig.mp3",
    body: [
      "The space between what happens and what I do",

      "I think I finally understand why Epictetus is useful to me. Stoicism sounded almost too simple at first: what is under your control and what isn't. But the more I look at it, the more I realize the point isn't controlling my life. It's figuring out what the fuck is actually mine in the first place.",

      "Something happens, my mind reacts, then I react to that reaction. I build a story, start believing the story, and suddenly a tiny event becomes a conclusion about my entire life. Someone doesn't reply and I think they don't respect me. I waste three hours and think I'm useless. I become interested in something new and immediately think I've found my real direction. The actual event is usually tiny. The mental chain afterwards is fucking enormous.",

      "I think Epictetus is trying to put a gap in that chain. What actually happened? What did my mind add to it? What part is actually mine? What can I do now?",

      "I used to think control meant controlling outcomes. If I work hard, I should succeed. If I prepare properly, I should get the job. If I care about someone, they should care about me. But reality doesn't work like that. I can prepare for the interview, practice guitar, make the project, treat someone well, and still not control what happens afterwards.",

      "And I don't have to stop caring about the outcome. That's not the point. I can desperately want the job or want my project to succeed. The difference is that I don't confuse wanting something with owning the outcome. I can aim at the target while understanding that the arrow isn't completely mine once it leaves the bow.",

      "I think this also explains my wandering. For a long time I thought I was exploring, but I think a lot of it was escape. I'd get interested in something, get excited, imagine a new direction, and immediately move toward it. Then another thing appeared. Another language, another technology, another project, another philosophy. Because everything was interesting, I could convince myself I was learning and discovering myself.",

      "But maybe I was simply following my reflexes. A thought appeared: 'I should learn this.' I followed it. Something became difficult: 'Maybe I should do something else.' I followed that too. Something became boring or uncomfortable: 'Let's think about something completely different.' Again, I followed it. I wasn't necessarily choosing. I was reacting.",

      "That's the difference between exploration and reflexive movement. Exploration can be deliberate. Escapism is often just movement away from discomfort. It feels like progress because I'm moving, but movement isn't necessarily direction. That's probably one of the most uncomfortable things I've realized.",

      "So now when a new impulse appears, I don't have to kill it. 'I want to learn Rust.' Fine. 'I want to make a guitar tool.' Fine. 'I want to build a game.' Fine. But then I ask: 'Is this an actual decision, or is this just an impression?' If it's worth pursuing, I can choose it deliberately. If it's just my brain looking for an escape, I can let the thought exist without obeying it. I don't need to make my mind silent. I need to stop treating every thought as an instruction.",

      "This is where the terminology finally becomes useful. Epictetus calls the initial appearance of something in the mind a PHANTASIA, an impression. The thought appears, but I don't necessarily have to give it ASSENT, or SYNKATATHESIS. I can stop and say, 'Wait. They haven't replied. That's the fact. The rest is my interpretation.' The thought can appear without becoming a belief. The impulse can appear without becoming an action.",

      "And then there is PROHAIRESIS, roughly my capacity for deliberate choice and judgment. I can't control every impression that enters my mind, but I can work on what I do with it. So the structure becomes: event → impression → examination → assent or rejection → choice → action.",

      "This is where I see the connection with Advaita Vedanta. Advaita asks me: WHO AM I? It makes me look at thoughts, emotions and experiences that constantly change and question whether the changing thing can really be the deepest meaning of 'I'. Stoicism asks something different: WHAT IS MINE TO CHOOSE?",

      "So I can use them as two lenses. Advaita: 'Is this thought actually me?' Stoicism: 'Regardless of whether this thought appeared, what am I going to do?' One investigates identification. The other investigates agency. And I fucking like that combination.",

      "I also think this changes how I understand suffering. Some suffering is unavoidable. Loss happens, rejection happens, failure happens. But there is another layer I manufacture by fighting reality inside my own head. Something happened. I wanted something else to have happened. Reality said no. Then I spent six hours arguing with reality. That's absurd.",

      "The past doesn't negotiate. Another person's decision doesn't negotiate. An outcome that already happened doesn't negotiate. So instead of asking, 'Why did this happen to me?', I can ask, 'Okay. This happened. What remains mine?' Maybe nothing can change the event, but my next action still exists.",

      "I don't want to turn this into another productivity system either. I want to experiment with it. When something disturbs me, I ask: EVENT — what actually happened? IMPRESSION — what did my mind tell me it meant? CONTROL — what part is mine? ASSENT — am I treating my interpretation as fact? CHOICE — what can I do now? REST — what must I leave to reality?",

      "I think that's what this philosophy is giving me. Not control over the world, but control over my participation in it. I can't control what appears in my mind, other people, every event, or every outcome. But I can stop. I can look. I can question the impression. I can choose. And then I can act.",

      "Because maybe my biggest problem wasn't that I had too many thoughts. It was that I treated my thoughts like commands. Every new interest became a possible new direction. Every discomfort needed an escape. Every failure needed a conclusion about who I was. Every uncertainty needed to be solved immediately. So I kept moving, and because I kept moving, I mistook movement for growth.",

      "Maybe some of my wandering was my mind trying to escape the exact things that required me to sit still and choose: the boring work, the uncertainty, the possibility of failure, the possibility that I might have to stay with something long enough to become good at it.",

      "I don't want to kill my curiosity. I don't want to become indifferent. I still want to explore guitar, programming, philosophy, games, mathematics, physics, and whatever genuinely catches me. What I want to change is the relationship. I want to be able to say, 'I'm interested in this,' without immediately saying, 'Therefore I must abandon everything and become this.' I want to be able to say, 'I'm afraid,' without immediately saying, 'Therefore I need to escape.'",

      "Maybe that's how these philosophies are making me more me. Not by giving me a new personality or a perfect answer, but by removing some of the automatic bullshit between what I experience and what I choose.",

      "Advaita is teaching me to question the thing I call 'I.' Epictetus is teaching me to question the thing I call 'my reaction.' And together they're forcing me to see something I had been avoiding: I DON'T HAVE TO OBEY EVERYTHING THAT HAPPENS INSIDE ME.",

      "A thought can be there. A desire can be there. Fear can be there. Restlessness can be there. The urge to run can be there. And I can still remain. Look at it. Understand it. Then choose.",

      "Maybe I don't find direction by following every impulse. Maybe I find it by becoming capable of CHOOSING DESPITE THE IMPULSE. And that doesn't make me less myself. Maybe, for the first time, it is what allows me to actually become myself."


    ],
    links: [
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
  "completed": { label: "Completed", className: "border-emerald-400/25 text-emerald-300/70" },
  "in progress": { label: "In Progress", className: "border-amber-400/25 text-amber-300/70" },
  "draft": { label: "Draft", className: "border-white/12 text-white/35" },
}

export function getStatusMeta(status) {
  const key = (status || "completed").trim().toLowerCase()
  return STATUS_STYLES[key] || { label: status || "Completed", className: STATUS_STYLES.completed.className }
}
