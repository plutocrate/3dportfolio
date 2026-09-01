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

      { type: "image", src: "/gallery/age_pro.jpg", caption: "Age Progression", aspect: "3/2", position: "center" },

      "I think Epictetus is trying to put a gap in that chain. What actually happened? What did my mind add to it? What part is actually mine? What can I do now?",

      "I used to think control meant controlling outcomes. If I work hard, I should succeed. If I prepare properly, I should get the job. If I care about someone, they should care about me. But reality doesn't work like that. I can prepare for the interview, practice guitar, make the project, treat someone well, and still not control what happens afterwards.",

      "And I don't have to stop caring about the outcome. That's not the point. I can desperately want the job or want my project to succeed. The difference is that I don't confuse wanting something with owning the outcome. I can aim at the target while understanding that the arrow isn't completely mine once it leaves the bow.",

      "I think this also explains my wandering. For a long time I thought I was exploring, but I think a lot of it was escape. I'd get interested in something, get excited, imagine a new direction, and immediately move toward it. Then another thing appeared. Another language, another technology, another project, another philosophy. Because everything was interesting, I could convince myself I was learning and discovering myself.",

      "But maybe I was simply following my reflexes. A thought appeared: 'I should learn this.' I followed it. Something became difficult: 'Maybe I should do something else.' I followed that too. Something became boring or uncomfortable: 'Let's think about something completely different.' Again, I followed it. I wasn't necessarily choosing. I was reacting.",

      "That's the difference between exploration and reflexive movement. Exploration can be deliberate. Escapism is often just movement away from discomfort. It feels like progress because I'm moving, but movement isn't necessarily direction. That's probably one of the most uncomfortable things I've realized.",

      { type: "image", src: "/gallery/boomer.jpg", caption: "Age Progression", aspect: "3/2", position: "center" },

      "So now when a new impulse appears, I don't have to kill it. 'I want to learn Rust.' Fine. 'I want to make a guitar tool.' Fine. 'I want to build a game.' Fine. But then I ask: 'Is this an actual decision, or is this just an impression?' If it's worth pursuing, I can choose it deliberately. If it's just my brain looking for an escape, I can let the thought exist without obeying it. I don't need to make my mind silent. I need to stop treating every thought as an instruction.",

      "This is where the terminology finally becomes useful. Epictetus calls the initial appearance of something in the mind a PHANTASIA, an impression. The thought appears, but I don't necessarily have to give it ASSENT, or SYNKATATHESIS. I can stop and say, 'Wait. They haven't replied. That's the fact. The rest is my interpretation.' The thought can appear without becoming a belief. The impulse can appear without becoming an action.",

      "And then there is PROHAIRESIS, roughly my capacity for deliberate choice and judgment. I can't control every impression that enters my mind, but I can work on what I do with it. So the structure becomes: event → impression → examination → assent or rejection → choice → action.",

      { type: "image", src: "/gallery/resume_gap.jpg", caption: "Age Progression", aspect: "3/2", position: "top" },

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

      { type: "image", src: "/gallery/kafka.jpg", caption: "Age Progression", aspect: "3/2", position: "bottom" },

      "Advaita is teaching me to question the thing I call 'I.' Epictetus is teaching me to question the thing I call 'my reaction.' And together they're forcing me to see something I had been avoiding: I DON'T HAVE TO OBEY EVERYTHING THAT HAPPENS INSIDE ME.",

      "A thought can be there. A desire can be there. Fear can be there. Restlessness can be there. The urge to run can be there. And I can still remain. Look at it. Understand it. Then choose.",

      "Maybe I don't find direction by following every impulse. Maybe I find it by becoming capable of CHOOSING DESPITE THE IMPULSE. And that doesn't make me less myself. Maybe, for the first time, it is what allows me to actually become myself."


    ],
    links: [
    ],
  },
  {
    id: "after-fall",
    title: "The Setting",
    dek: "How it started",
    date: "02 Sep 2026",
    category: "After Fall - Lore Bible",
    status: "In Progress",
    coverImage: "/gallery/Stalker.jpg",
    coverPosition: "",
    music: "/music/stalker.mp3",
    body: [
      "The world did not end when the dead began walking. For a while, people believed that was the end. They watched hospitals overflow, watched soldiers fire into crowds that refused to stay dead, watched entire neighbourhoods sealed behind concrete and fire. Governments appeared on television promising containment until there was no television left. Cities lost electricity one district at a time. Water stopped coming through pipes. Food stopped arriving at stores. The dead became a problem, then a fact of life, and eventually just another thing people learned to avoid. What finally killed the old world was not the infection. It was the realization that nobody was coming to fix anything. There would be no cure announced on the radio. No army large enough to reclaim the country. No government capable of feeding millions of people forever. Civilization did not collapse in a single night. It simply became smaller every day, until one morning people realized they were no longer citizens of a country. They were survivors of whatever happened to be behind the nearest wall.",

      "The city survived because abandoning it was impossible. Too many people remained. Too much infrastructure still existed to simply walk away from. There were buildings, roads, reservoirs, warehouses, hospitals, generators, government offices and thousands of homes. The city had everything required for civilization except the civilization itself. So the remaining authorities began securing what they could. Roads were blocked. Districts were walled. Checkpoints appeared. The infected were pushed outside wherever possible, though outside quickly became a meaningless word. Some places were safer than others. Some had water. Some had land capable of growing food. Some had warehouses full of equipment. Some had government infrastructure that could still be defended. The people did what people always do when survival becomes scarce. They organized themselves around what was useful.",

      "The Blocks were born from that usefulness. They were never meant to be a beautiful new political system. Nobody sat in a room and designed a perfect society after the Fall. The city was simply divided according to what could still sustain life. Block A controlled the most productive agricultural land that could be defended. Block D controlled access to water and the machinery necessary to keep it moving. Block C possessed much of the surviving administrative infrastructure: government buildings, communication facilities, old institutional networks and enough defensible structures to become the center of Authority. Block B had something less glamorous but equally valuable. It had housing. Planned urban colonies, dense residential structures, apartments and streets designed for thousands of ordinary people before the world ended. When millions became thousands and thousands became desperate, empty homes became infrastructure.",

      "At first, the Blocks were simply locations. Then they became jurisdictions. Then identities. A person born in one Block could spend their entire life hearing stories about the others without ever seeing them. Trade between the Blocks became regulated. Movement became regulated. Eventually even the people themselves became regulated. The Authority justified it as necessity. And perhaps, in the beginning, it was. You cannot distribute food to a starving population without knowing how many mouths exist. You cannot maintain a wall if everyone believes defending it is someone else's responsibility. You cannot preserve electricity when a city has become a collection of broken generators and dying machines. Order required counting. Counting required records. Records required offices. Offices required authority. Somewhere along that process, survival stopped being the purpose of the system and became the system's excuse for everything it wanted to become.",

      "The Authority did not call its hierarchy a class system. Class systems belonged to the old world, they said. This was Worthiness. Every citizen possessed a measurable value based on service, education, usefulness, family history, disciplinary record and loyalty. The exact calculation was known only to the departments responsible for calculating it. That was convenient. Worthiness determined almost everything. The amount of food a household received. The quality of their housing. Their access to medicine. Their work assignments. Their ability to travel. Their right to reproduce. Their children's educational opportunities. Even the amount of space they were allowed to occupy while sleeping.",

      "A home was no longer something a person owned. It was an allocation. A family could spend twenty years living in the same apartment and still not possess a single brick of it. The Authority owned the building, the room, the bed, the electricity entering the wall and the water entering the tap. A high-ranking official might occupy an entire house that once belonged to a family of six. An educated technician with valuable skills might receive a private room for himself and his spouse. Below them were workers sharing apartments with other families. Below them were people sleeping in converted offices, schools, warehouses and underground halls. In some parts of Block B, houses designed for a family of four held more than a hundred people. Beds were stacked against walls. Corridors became sleeping spaces. Kitchens disappeared beneath makeshift partitions. Privacy became an old-world luxury people described to children who had never experienced it.",

      "And because a bed was an allocation, it could be revoked. There were families who returned home to find their names removed from the registry outside their door. There were workers whose service rating had fallen and whose rooms had been reassigned before they returned from their shift. There were old people moved out of housing because a younger worker was considered more valuable to the city. People learned not to become emotionally attached to furniture. A chair could belong to you for fifteen years and disappear because someone higher in the hierarchy needed somewhere to sit.",

      "Food worked the same way. Everything worked the same way. Ration was not merely food. Ration was life measured into portions. Water, medicine, fuel, electricity, clothing, housing space, transportation permits, batteries, tools and sometimes even information were distributed through systems of entitlement. Every citizen possessed an account, though the word account suggested something cleaner than what actually existed. People waited in queues that began before sunrise. Entire streets outside distribution offices became temporary settlements every morning. Mothers brought stools. Old men carried bottles to urinate in because leaving the line meant losing their position. Children slept against their parents' legs. People memorized the habits of the clerks behind the windows because knowing which employee took longer breaks could determine whether you received food that day.",

      "The worst part was that reaching the front of the queue did not guarantee anything. A shipment might be delayed. A record might be missing. A supervisor might decide the day's allocation had been reached. The office could simply close. There were people who had waited six hours only to watch a metal shutter come down while they stood three positions away from the window. They would return the next morning and begin again. Sometimes the Authority called this inefficiency. Sometimes corruption. Sometimes an unfortunate consequence of limited resources. Nobody called it what it had become: another form of power. A person who controls the speed at which another person eats eventually controls far more than their hunger.",

      "Naturally, people created ways around it.",

      "The grey economy did not emerge because people were inherently criminal. It emerged because bureaucracy created gaps large enough for human beings to crawl through. Ration Credit Companies appeared throughout the Blocks. They began as small operations run by people with connections inside distribution offices. A worker with an urgent medical requirement could sell his future ration entitlement to receive something immediately. Someone else could purchase the delayed entitlement and collect more later. Soon companies began offering services: immediate ration advances, queue representation, document correction, transfer acceleration, family emergency credits. They took cuts from every transaction. Some were legitimate enough to possess offices and printed documents. Others operated from basements. A woman might surrender three months of future food entitlement because her child needed medicine today. A man might sell his heating allocation to purchase a forged travel permit. People accumulated debt not in money, but in the number of days they would remain hungry in the future.",

      "Currency still existed in fragments, but it had lost its authority. A person could possess a bag full of old notes and still fail to acquire a loaf of bread. Value had returned to usefulness. Fuel. Ammunition. Medicine. Batteries. Alcohol. Cigarettes. Machinery. Information. Human labour. A mechanic capable of repairing a water pump could live better than a man who once owned three companies. A doctor might receive privileges unavailable to an old-world millionaire. Education had become one of the strangest forms of wealth. There were not enough educated people left to replace those who died. Engineers became valuable. Lawyers became valuable. Technicians became valuable. Teachers became valuable. But education alone was not enough. You had to be useful to the Authority, and usefulness could disappear the moment someone more convenient appeared.",

      "The poor still entertained themselves. This was one of the things the old world would have misunderstood about the new one. Poverty did not remove the need for pleasure. It made pleasure more important. There were gambling rooms hidden beneath ration offices. Illegal fighting pits. Alcohol distilled from whatever could ferment. Makeshift cinemas powered by stolen generators. Men betting food credits on card games. Women trading clothing and cosmetics smuggled from abandoned districts. Musicians playing instruments repaired so many times they barely resembled their original shape. People danced in basements while the infected wandered somewhere beyond the walls. Children gathered around old televisions when someone managed to restore power for a few hours. Humanity did not become noble after the Fall. It became itself more honestly.",

      "The children inherited none of the nostalgia their parents carried. To them, the world had always been walls, ration cards and armed guards. They knew the old world only through stories. Some children grew up inside Parliament compounds, where officials still had access to books, education, sports grounds and occasional electricity. They learned history from sanitized records and played games their parents had scavenged from the ruins. Other children learned to recognize the sound of an empty cooking pot. They knew which ration offices were less cruel. They knew how to sleep without occupying too much space. Some could identify a valuable piece of scrap before they could read. The difference between the children of the powerful and the children of the poor was not intelligence. It was imagination. One group was taught to imagine what they might become. The other was taught to imagine what could be taken from them.",

      "Birth became another resource problem. The Authority could not feed unlimited mouths, and so reproduction became regulated. Citizens required approval to have children. Approval depended on Worthiness, housing availability, food projections and service records. Unauthorized pregnancies existed, of course. Everything forbidden continued to exist. Some families hid children for years. Others registered them through forged documents. Some paid enormous debts to have records altered. The poor joked that making a child was free but keeping one required government approval. Nobody found the joke particularly funny when the inspectors arrived.",

      "For those who had no Worthiness, the system possessed another category: labour. A citizen could lose privileges without technically becoming a prisoner. Their housing could be revoked. Their rations reduced. Their work assignment changed. They could be sent into cleaning crews, waste processing, corpse disposal or infrastructure repair. The Authority rarely called it punishment. Punishment suggested wrongdoing. They called it reassignment. A useful word. It allowed a person to lose everything without anyone admitting they had been sentenced to anything.",

      "Death created its own economy. The decomposers worked where others refused to go. They entered buildings filled with bodies, searched abandoned vehicles, processed the dead and examined infected corpses for anything still valuable. Clothing could be cleaned. Metal could be reused. Jewellery could be traded. Watches, tools, identification documents, keys and personal belongings passed through their hands before entering official inventories. Naturally, not everything reached the inventory. A decomposer could discover a gold ring in the morning and his supervisor might never know it existed. Entire grey networks developed around the possessions of dead people. A dead man's wedding ring might travel through five hands before ending up around the neck of someone gambling in Block B.",

      "Beyond the walls existed a world the Authority could not fully describe. Maps from before the Fall had become increasingly useless. Roads were blocked. Bridges had collapsed. Entire settlements had vanished. Other cities had survived under other systems. Some had authorities more organized than the Blocks. Some were controlled by military remnants. Some were ruled by families, religious groups, criminal organizations or people who had simply accumulated enough weapons and followers to call themselves governments. There were deserters: former Authority personnel, soldiers, scavengers and workers who had escaped with knowledge of the system they once served. There were loners who refused every organized society and survived between ruins. There were communities that called themselves the beginning of a new age, thinkers who believed the Fall had proven that governments themselves were diseases. Some preached freedom while robbing scavengers on the roads. Some genuinely built settlements outside every known authority. Some were worse than the infected.",

      "Nobody knew how much existed beyond the territories marked on official maps. The Authority preferred uncertainty. It was easier to control a population that believed the wall separated civilization from madness. The truth was more complicated. There were other civilizations outside. Other economies. Other governments. Other kinds of oppression. And sometimes, something genuinely better. But knowledge travelled slowly, usually through people who had seen things and survived long enough to return.",

      "That responsibility belonged largely to the scavengers.",

      "Scavengers were the veins of the city. They went where the Authority could not. Abandoned towns, warehouses, petrol stations, hospitals, factories, military facilities, residential districts swallowed by vegetation, highways filled with rusting vehicles. They retrieved fuel, machinery, medicine, tools, electrical components, food that had somehow survived, weapons when they found them and thousands of smaller objects that became valuable only because civilization no longer manufactured replacements. They also brought back unnecessary things. Entertainment was a ration too, even if nobody wrote that on official documents. A working projector, an old film reel, musical equipment, a bottle of imported liquor, a carton of cigarettes. The city had learned that a population could survive without pleasure, but it could not be controlled indefinitely without providing some of it.",

      "The infected were dangerous, but experienced scavengers feared humans more. The dead did not negotiate. They did not ask what was inside your vehicle. They did not follow you back to your family. Deserters did. Rival authorities did. Loners watched the roads because they knew scavengers returned carrying things worth stealing. A scavenger expedition leaving the city might carry weapons, fuel and equipment, but an expedition returning carried something more valuable: proof that the journey had succeeded. Trucks loaded with supplies became moving targets. Every abandoned checkpoint could contain an ambush. Every unfamiliar radio signal could belong to someone waiting for them. Sometimes scavengers returned with half their original number. Sometimes they returned without the supplies and had to explain why.",

      "Nobody simply applied to become a scavenger.",

      "The Authority understood human attachment better than it understood loyalty. A desperate man with nothing could disappear. A man who owned nothing had nothing to fear losing. So before the Authority sent a scavenger beyond the walls, it gave him something worth returning to.",

      "Scavenger candidates received privileges. Better housing. Better food. More private space. Their service records improved. Some were given access to social programs unavailable to ordinary workers. They were introduced to women considered compatible. The system called them partnerships when it was feeling civilized. In reality, the Authority had entire departments dedicated to pairing useful people with useful people. A scavenger candidate might spend months believing his life had finally improved. He would move from a room shared with strangers into an apartment with a door that locked. He would eat meat occasionally. He would sleep beside someone he loved. He would begin planning things again. Perhaps a child would be approved. Perhaps one would be born anyway.",

      "And then his tenure would arrive.",

      "By that time, leaving was no longer simple. Outside the wall was dangerous, but staying behind was impossible. The apartment belonged to the Authority. The food belonged to the Authority. His wife's status was connected to his service. His child's future was calculated against his performance. He could desert, of course. People did. But deserters rarely disappeared alone. The Authority did not need to threaten a scavenger directly when his entire life had already been placed on the table.",

      "The city did not chain scavengers to the walls. It taught them to chain themselves.",

      "The lawyer understood all of this better than most people. He had spent his life reading the language the Authority used to disguise its intentions. Before the Fall, law had been a profession. After the Fall, it became something closer to archaeology. Old legal concepts survived in fragments. Contracts still existed. Property disputes still existed despite almost nobody truly owning property. Crimes still required definitions. Debts required witnesses. Death required documentation. The Authority needed people capable of making its decisions sound legitimate, and the lawyer was useful enough to survive comfortably but not useful enough to become important.",

      "He was not a hero. He had represented people he knew were guilty. He had helped families navigate the bureaucracy while accepting payment from those who could afford him. He knew officials in Block B. He knew people in the Grey Market. He knew which crimes were forgiven when committed by the right person and which mistakes could destroy someone who had no connections. He had seen the city from above and below. He had eaten at tables where people discussed population projections while drinking something imported from outside the walls, and he had stood in ration queues beside people who had not eaten properly in days.",

      "He survived because he understood that morality had become expensive.",

      "The journey began with a package.",

      "A member of the Authority needed something retrieved. The lawyer was approached because of his connections. It was not an official request at first. The package had supposedly passed through the Grey Market before disappearing. Someone had stolen it. Someone else claimed to have sold it. Names appeared and disappeared. By the time the lawyer understood the situation, the request had stopped sounding like a favour.",

      "He searched Block B. He spoke to traders, smugglers, ration brokers and people who survived by knowing things they should not know. Nothing. Eventually the information pointed beyond the walls. A group carrying the package had been seen moving through territory contested by deserters and another faction whose name changed depending on who you asked. The Authority needed someone familiar with the package, someone capable of identifying it, and someone expendable enough that their death would not create administrative complications.",

      "The lawyer was attached to a scavenger expedition.",

      "They were not soldiers. Soldiers protected the city. Scavengers were sent away from it.",

      "The journey was longer than anyone expected. Roads had become traps. Buildings became temporary shelters and then killing grounds. The infected followed sound, but people followed opportunity. They lost supplies. They were forced to abandon vehicles. At one point they discovered evidence of another group and spent an entire night without lighting a fire because nobody knew whether the strangers had continued moving or were watching them from somewhere beyond the trees. There were moments when the lawyer believed they would not return. Moments when returning stopped being a plan and became a story people told themselves because the alternative was too frightening to consider.",

      "They found the package because someone had paid for it with blood.",

      "It had changed hands. Deserters had taken it. Someone had taken it from them. A confrontation became an ambush. An ambush became something worse. By the time the scavengers recovered it, the expedition was no longer the group that had left the city. People were injured. People were gone. One of them had spent the journey talking about returning to his wife and the child he had barely known long enough to watch grow. Another had carried a photograph inside a waterproof pouch and checked it every night before sleeping. There had been arguments, fear, hunger and the particular silence that follows violence when nobody wants to look at what has been left behind.",

      "And still they carried the package.",

      "It was sealed tightly. Heavy enough to matter. Important enough that multiple groups had killed for it. Important enough for an Authority member to force civilians beyond the walls. Important enough for scavengers to die retrieving it.",

      "Nobody knew what was inside.",

      "The Authority member had never said.",

      "They carried it back through the same broken world they had barely survived crossing. Every kilometre became more difficult because now they had something worth protecting. By the time the walls appeared again, the lawyer had begun to understand why scavengers sometimes returned and refused to speak about what they had seen. There were experiences that did not become memories properly. They remained somewhere inside the body instead.",

      "Inside the city, the surviving scavengers were separated for medical examination and debriefing. The lawyer remained with the package longer than he was supposed to. It was waiting to be collected. That was all. Another piece of paperwork. Another delivery. Another transaction between people powerful enough to request things and people weak enough to retrieve them.",

      "He looked at it for a long time.",

      "Then he cut it open.",

      "The first thing he saw was the cigarettes.",

      "There were entire cartons of them, packed carefully beneath layers of protective wrapping. Imported brands. Perfectly preserved. The kind of thing that had become almost mythical in the Blocks. Things people occasionally heard about but rarely saw. Things traded between powerful people behind closed doors.",

      "For a few seconds, he did not understand.",

      "Then he removed another layer.",

      "There were bottles beneath them.",

      "Liquor.",

      "He stood there with the package open in front of him, surrounded by the smell of dust, dried blood and whatever remained on his clothes from the journey outside. Somewhere beyond the room, people were processing the dead. Somewhere a scavenger's family still did not know he would not be coming home. Somewhere a three-month-old child would eventually grow old enough to ask why their father had left and why he never returned.",

      "He looked down at the cigarettes again.",

      "Then at the bottles.",

      "And understood what they had gone outside for.",

      "To be contd."
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
