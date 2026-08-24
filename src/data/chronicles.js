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
    id: "on-philosophy-and-life",
    title: "Advaita Vedanta -- my understanding.",
    dek: "Who the fuck am 'I'?",
    date: "21 Aug 2026",
    category: "Understanding 'I'",
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
    dek: "The space between what happens and what I do.",
    date: "24 Aug 2026",
    category: "Understanding 'I'",
    status: "In Progress",
    coverImage: "/gallery/stoic_banner.jpg",
    coverPosition: "center",
    music: "/music/greatgig.mp3",
    body: [
      "I think I finally understand why Epictetus is useful to me. At first, Stoicism sounded almost too simple. What is under your control and what isn't. Fine. I've heard versions of that a hundred times. But when I actually started looking at what he was saying, I realized that the simplicity is kind of deceptive. The whole thing is not really about controlling my life. It is about figuring out what the fuck is actually mine in the first place.",

      "Something happens, and almost immediately my mind produces a reaction to it. Then I react to that reaction. Then I build a story around it. Then I start believing the story. And before I know it, something that happened five minutes ago has turned into a conclusion about my entire life. Someone doesn't reply to me, and suddenly I'm thinking they don't respect me. I don't work for three hours, and suddenly I'm thinking I'm useless. I become interested in something new, and suddenly I think I have discovered the thing I was supposed to do all along. Something doesn't work out, and suddenly I'm questioning the entire direction of my life. The actual event is usually tiny. The mental chain afterwards is fucking enormous.",

      "I think Epictetus is trying to put a gap in that chain. Something happens, my mind reacts, and before I immediately believe that reaction, I stop. What actually happened? What did my mind add to it? What part of this is actually mine? And what can I do now? That sounds small, but I think this is one of the most practical philosophical ideas I've encountered so far.",

      "I used to think that having control meant controlling outcomes. If I work hard, I should succeed. If I prepare properly, I should get the job. If I care about someone, they should care about me. If I make a good plan, the plan should work. But reality doesn't work like that. I can prepare for a job interview. I cannot control whether they hire me. I can practice guitar. I cannot control whether somebody else becomes better than me. I can write something good. I cannot control whether people like it. I can treat someone well. I cannot control what they feel about me. I can make a plan. I cannot control whether reality decides to fuck it up.",

      "And this is where the distinction starts becoming useful. There are things that belong to my agency: my choices, my effort, my judgments, my actions, the way I respond. And then there are things that don't completely belong to me: other people's decisions, outcomes, luck, the past, circumstances, reputation, external events. I don't have to stop caring about the second category. That's not the point. I can still desperately want the job. I can still want the song to sound good. I can still want somebody to like me. I can still want my project to succeed. The difference is that I don't confuse wanting something with owning the outcome. I can want the target while understanding that the arrow isn't completely mine once it leaves the bow. That distinction is fucking important.",

      "I think this also explains something about my own wandering. For a long time, I thought I was exploring. Maybe sometimes I was. But I think a lot of it was actually escape. I'd get interested in something, get excited, imagine a new direction, and immediately start moving toward it. Then another thing would appear. Then another. A new language, a new technology, a new project, a new philosophy, a new idea. And because every new thing was interesting, I could convince myself that I was learning, exploring, discovering myself. But there is another possibility. Maybe I was simply following my reflexes.",

      "A thought appeared: 'I should learn this.' I followed it. Another thought appeared: 'Maybe this is what I should actually be doing.' I followed that. Something became difficult: 'Maybe I should do something else.' I followed that. Something became boring: 'This isn't for me.' I followed that. Something made me uncomfortable: 'Let's think about something completely different.' I followed that too. I wasn't necessarily choosing. I was reacting.",

      "And there is a huge difference between exploration and reflexive movement. Exploration can be deliberate. Escapism is often just movement away from discomfort. The moment something becomes difficult, uncertain, boring, painful, or frightening, I can generate another interesting thought and run toward it. It feels like progress because I'm moving. But movement isn't necessarily direction. That might be one of the most uncomfortable things I've realized.",

      "Epictetus gives me a way to experiment with this. When a new impulse appears, I don't have to kill it. I don't have to say, 'No, I am not allowed to be interested in this.' I can simply write it down. 'I want to learn Rust.' Fine. 'I want to make a guitar tool.' Fine. 'I want to study philosophy.' Fine. 'I want to build a game.' Fine. But then I ask: 'Is this an actual decision, or is this just an impression?' If it's worth pursuing, I can decide to pursue it deliberately. If it is simply my brain looking for an escape from something difficult, I can let the thought exist without obeying it. That's a very different relationship with my own mind. I don't need to make my mind silent. I need to stop treating every thought as an instruction.",

      "This is where Epictetus' terminology finally becomes useful. He calls the initial appearance of something in the mind a **phantasia**, an impression. Something happens, and an impression appears. Someone doesn't reply: 'Maybe they don't care.' I fail at something: 'I'm fucking terrible.' I discover a new technology: 'This is what I should be doing.' Again, an impression. The interesting part is that the appearance of the impression isn't necessarily under my control. Thoughts appear. Feelings appear. Impulses appear. But I don't necessarily have to give them my **assent**.",

      "The Stoic term for this is **synkatathesis**, assent. The impression says: 'They don't respect you.' And I can immediately believe it. Or I can stop and say: 'Wait. They haven't replied. That's the fact. The rest is my interpretation.' That tiny gap is where the philosophy becomes practical. The thought can appear without becoming a belief. The impulse can appear without becoming an action. The emotion can appear without becoming a command.",

      "And this is where Epictetus' idea of **prohairesis** becomes important. Prohairesis is roughly my capacity for deliberate choice and judgment — the part of me that can decide how I will respond. I cannot control every impression that enters my mind. But I can work on what I do with it. So the structure becomes: event → impression → examination → assent or rejection → choice → action. That is the machinery I want to become conscious of.",

      "And this is where I see a connection with Advaita Vedanta. Advaita asked me a completely different question: **Who am I?** It made me look at the thoughts, emotions, sensations and experiences that constantly change and ask whether the changing thing can really be the deepest meaning of 'I'. Stoicism isn't trying to take me toward the same conclusion. Epictetus is not asking me to discover some ultimate Self behind experience. He is asking me: **What is mine to choose?**",

      "Advaita makes me step back from identification with the contents of experience. Stoicism makes me examine how I respond to those contents. So I don't think I need to choose one and reject the other. I can use them as two different lenses. When a thought appears, Advaita can make me ask: 'Is this thought actually me?' Stoicism can then make me ask: 'Regardless of whether this thought appeared, what am I going to do?' One investigates identification. The other investigates agency. One says: 'Don't confuse the changing contents of experience with the Self.' The other says: 'Don't surrender your capacity for choice to every impression.' That combination is actually very interesting to me.",

      "I can imagine the two philosophies sitting beside each other whenever my mind starts running. Something happens. My mind immediately produces a story. Advaita: 'Look at that. A thought has appeared. Is that actually what I am?' Stoicism: 'Fine. The thought appeared. Do I assent to it? What is actually within my agency?' Then I can return to reality. Not to another thought about reality. Reality. What is happening? What can I do? Do it.",

      "I also think this changes how I understand suffering. I don't think suffering is simply something that happens to me. Of course, some suffering is unavoidable. Life can fuck you up in ways you never asked for. Loss happens. Rejection happens. Failure happens. Uncertainty happens. But there is another layer of suffering that I manufacture by fighting reality inside my own head. Something happened. I wanted something else to have happened. Reality says no. Then I spend six hours arguing with reality. That's absurd.",

      "The past doesn't negotiate. Another person's decision doesn't negotiate. An outcome that already happened doesn't negotiate. So instead of asking: 'Why did this happen to me?' I can sometimes ask: 'Okay. This happened. What remains mine?' Maybe nothing can be changed about the event. But my next action still exists. That is where I want to put my attention.",

      "I don't want to turn this into another productivity system either. I don't want to wake up tomorrow with a notebook full of 'Control what you can control' and then use philosophy as another way of beating myself over the head. That would completely miss the point. The experiment is much simpler. When something disturbs me, I write: **EVENT:** What actually happened? **IMPRESSION:** What did my mind immediately tell me it meant? **CONTROL:** What part is actually mine? **ASSENT:** Am I treating my interpretation as a fact? **CHOICE:** What can I deliberately do now? **REST:** What must I leave to reality?",

      "For example: 'Someone didn't reply.' Event: They didn't reply. Impression: They don't care about me. Control: I can send one reasonable follow-up. I cannot control their response. Assent: I don't actually know that they don't care. Choice: Send the message if appropriate, then continue my day. Rest: Their response belongs to them.",

      "Or: 'I wasted three hours.' Event: I spent three hours doing something useless. Impression: I'm useless and I'm fucking my life up. Control: What I do with the next hour. Assent: The conclusion about my entire character isn't contained in the fact that I wasted three hours. Choice: Stop wasting the next hour. Rest: The previous three hours are gone.",

      "Or: 'I suddenly want to abandon what I'm doing and start something else.' Event: I became interested in something new. Impression: This must be the direction I've been looking for. Control: Whether I act on the impulse. Assent: Not yet. Choice: Finish what I committed to first, then evaluate the new idea deliberately. Rest: I don't need to resolve my entire life tonight.",

      "That's the kind of experiment I want. Not suppression. Not detachment from everything. Just a little more distance between impulse and action.",

      "I think that's what this philosophy is giving me. Not control over the world. Control over my participation in the world. I can't control what appears in my mind. I can't control every event. I can't control other people. I can't guarantee outcomes. But there is a part of the process where I can stop. I can look. I can question the impression. I can decide whether to assent. I can choose. And then I can act. That might be enough.",

      "Because I think one of my biggest problems wasn't that I had too many thoughts. It was that I treated my thoughts like commands. I thought every new interest needed to become a new direction. Every discomfort needed an escape. Every failure needed an explanation about who I was. Every uncertainty needed to be solved immediately. Every painful thought needed another thought to cover it. So I kept moving. And because I kept moving, I mistook movement for growth.",

      "Maybe some of my wandering was actually my mind trying to escape the exact things that would have required me to sit still and choose. The boring work. The uncertainty. The possibility of failure. The possibility that I might have to stay with one thing long enough to become good at it. The possibility that there isn't going to be some magical moment where I finally 'figure myself out.'",

      "I don't want to become someone who has no desires. I don't want to become indifferent. I don't want to stop being curious. I don't want to kill the part of me that wants to explore guitar, programming, philosophy, games, mathematics, physics, or whatever else genuinely catches my attention. That curiosity is part of me too. What I want to change is the relationship.",

      "I want to be able to say: 'I am interested in this,' without immediately saying, 'Therefore I must abandon everything and become this.' I want to be able to say: 'I am afraid,' without immediately saying, 'Therefore I need to escape.' I want to be able to say: 'I failed,' without immediately saying, 'Therefore I am a failure.' I want to be able to say: 'I don't know,' without immediately filling the silence with another plan.",

      "Maybe that's where these philosophies are beginning to make me more me. Not by giving me a new personality. Not by giving me a perfect answer. But by removing some of the automatic bullshit between what I experience and what I choose.",

      "Advaita is teaching me to question the thing I call 'I.' Epictetus is teaching me to question the thing I call 'my reaction.' And together they are forcing me to look at something I had been avoiding: **I don't have to obey everything that happens inside me.**",

      "A thought can be there. A desire can be there. Fear can be there. Restlessness can be there. The urge to run can be there. And I can still remain. Look at it. Understand it. Then choose.",

      "Maybe that's what I've been missing. I kept trying to find the right direction by following every feeling that appeared. Maybe I don't find direction by following every impulse. Maybe I find it by becoming capable of **choosing despite the impulse**.",

      "And that doesn't make me less myself. Maybe, for the first time, it is what allows me to actually become myself."

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
