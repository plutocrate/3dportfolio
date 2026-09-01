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
    title: "The Blocks",
    dek: "How it started",
    date: "02 Sep 2026",
    category: "After Fall",
    status: "In Progress",
    coverImage: "/gallery/Stalker.jpg",
    coverPosition: "",
    music: "/music/stalker.mp3",
    body: [
      "Nobody agrees on when the old world ended. There are dates, somewhere. Buried inside damaged government servers, printed on emergency declarations, recorded in military broadcasts that nobody has listened to in years. There were probably meetings during the first weeks. Men in pressed shirts sitting around tables, pointing at maps, discussing containment zones and casualty projections. There were probably speeches. Promises that the situation was under control. Instructions to remain indoors. Instructions to evacuate. Instructions that contradicted the instructions given the day before. Then the networks began disappearing. Cities stopped answering each other. Governments became smaller and smaller until eventually they became buildings, and buildings became rooms, and rooms became groups of armed people deciding who was allowed inside.",

      "What survived from that time were not records. What survived were memories. Someone remembers watching an ambulance drive past their house for the last time. Someone remembers their father locking the door and saying nobody was coming in. Someone remembers the electricity disappearing in the middle of a television broadcast. Someone remembers being stuck on a highway with thousands of people trying to leave the city at once. Someone remembers the first infected person they ever saw. Most people remember leaving home. Almost nobody remembers believing they would never return.",

      "But the apocalypse did not create the world people had imagined. It did not leave behind empty highways and small groups of survivors wandering through silent cities. This was not a country where the disappearance of ninety percent of the population meant emptiness. Too many people had existed before the world ended. Too many people survived after it.",

      "Millions died. Entire families disappeared. Apartment buildings became graves. Neighbourhoods were abandoned so quickly that food remained on dining tables. But millions remained alive. Hungry, displaced, sick, terrified, and eventually angry. They needed water. They needed food. They needed shelter. And most importantly, they needed somebody to organize them before they began organizing themselves.",

      "The earliest settlements were accidents. Schools became shelters because they had rooms and kitchens. Warehouses became refugee camps because they had walls. Military installations became cities because they were already defended. Government buildings became administrative centers because the people who understood paperwork and logistics already knew where the buildings were. Nobody planned the new civilization. Civilization simply began forming around whatever had survived long enough to be useful.",

      "The problem was that the old cities were still physically there, but civilization was not. Roads existed without transportation systems. Hospitals existed without medicine. Apartments existed without electricity. Water pipes existed without treatment plants. Towers stood over streets where nobody had the resources to maintain them. People slowly understood something that had been invisible before the collapse. A city was never made of buildings. Buildings were only containers. A city was the invisible machinery that kept those containers alive.",

      "The surviving administration eventually accepted something nobody wanted to say aloud. They could not rebuild everything. There was not enough fuel. Not enough trained labour. Not enough electricity. Not enough food. Not enough weapons to defend an entire metropolitan region. The city would have to become smaller before humanity could survive inside it.",

      "The Blocks were born from that decision.",

      "They were not originally districts created for class separation. They were administrative divisions created from the geography of what remained. The Authority studied the surviving region and identified what each part could still provide. Block A contained the healthiest agricultural land and the infrastructure surrounding it. Farms, irrigation routes, storage facilities and settlements capable of producing food. Block D contained the most important surviving water infrastructure: reservoirs, treatment facilities, pumping stations and the routes required to maintain them. Block C contained the administrative and military infrastructure of the old world. Government buildings, communication systems, secured compounds and eventually Parliament itself. Block B contained something less glamorous but equally necessary. Planned housing. Apartment complexes. Government quarters. Schools. Commercial buildings. Dense urban infrastructure capable of holding enormous populations.",

      "The letters were originally meaningless. They were simply labels on logistical maps. A shipment moved from A to C. Personnel were transferred from B to D. Water allocation was calculated for Block B. Agricultural labour was requested in Block A. Nobody imagined that people would eventually be born into these letters.",

      "But temporary divisions became permanent when nobody could rebuild the world that existed before them.",

      "Children grew up inside the Blocks. Families formed local identities. Generations learned different kinds of work. Someone born in Block A understood soil and machinery. Someone raised in Block B understood overcrowding and urban survival. Someone from Block C grew up seeing armed personnel and administrative offices as part of ordinary life. Slowly, the letters stopped being locations. They became identities.",

      "The Authority continued insisting that every Block was equal because every Block depended upon another. Food required water. Water infrastructure required labour. Administration required workers. Workers required housing. It was technically true. It also did not matter. Equality disappears quickly when one district has functioning electricity and another has twelve families sharing a building designed for four.",

      "The old world had built hierarchy around wealth. The new world built it around usefulness.",

      "Nobody officially called it a class system. The Authority called it Allocation Priority. Resource Management. Essential Classification. Civic Contribution. But language could not hide what people saw every day. Some families lived behind secured walls. Some families slept in shifts because there were not enough beds.",

      "A person's Worthiness determined the conditions under which they were allowed to exist. Doctors, engineers, agricultural specialists, mechanics, scientists and skilled administrators received better allocations because replacing them was difficult. Their families benefited from their status. Important officials received private residences. Essential personnel received stable electricity. Certain households had access to medical facilities unavailable to everyone else.",

      "But usefulness was never the only measure. Loyalty mattered. Connections mattered. Political usefulness mattered. A mediocre official with powerful friends could possess more security than a brilliant engineer who had angered the wrong department. Someone capable of manipulating paperwork could become more valuable than someone capable of repairing machinery. Eventually, the population stopped asking what another person owned.",

      "They asked what that person was worth.",

      "Worth determined allocation. Allocation determined life.",

      "Food was rationed. Water was rationed. Medicine was rationed. Electricity was rationed. Employment was rationed. Education was rationed. Even housing was rationed. A family did not necessarily own the place where it slept. It occupied space assigned to it by the system, and the system could change its mind.",

      "Houses built for families became dormitories. Bedrooms were divided by temporary walls. Living rooms contained rows of beds. Balconies became sleeping spaces. Entire apartment buildings developed internal schedules because not everyone could cook, wash or move through the corridors at the same time. A person could spend twenty years living inside a building and still not know the names of everyone sleeping beneath the same roof.",

      "For the lower classes, even a bed was conditional. Lose your employment classification and your allocation could be reassessed. Anger the wrong person and your household could suddenly become too large for the space it occupied. A more valuable worker might require your room. A family could be relocated overnight. A person's sleeping bed could disappear from an administrative register before the person had even returned home.",

      "Some notices were feared more than death. Employment Reassessment. Housing Reduction. Mandatory Relocation. Labour Reassignment.",

      "The Authority never openly described labour reassignment as punishment. Every citizen owed something to civilization, and civilization needed work. Waste needed collecting. Fields needed labourers. Pipes needed repairing. Bodies needed recovering. Walls needed reinforcing. But the distinction between civic service and forced labour became difficult to see when refusing an assignment meant losing food, water or the place where your children slept.",

      "Parliament became the physical center of this world. The building had survived because it had always been designed to protect the people inside it. Security infrastructure made it defensible. Underground facilities made it useful. Government offices became administrative departments for the new civilization. Storage rooms became archives. Secured halls became living quarters. Surrounding buildings were gradually absorbed into a protected administrative zone.",

      "Over time, Parliament stopped resembling a government building. It became a city inside the city.",

      "There was electricity there. Not unlimited, but reliable. There was treated water. Medical care. Education. Sports facilities. Preserved libraries. Old films. Working entertainment systems. Private residences. Children born inside the Parliamentary Zone grew up knowing the apocalypse as history rather than daily experience.",

      "They still understood that the world outside was dangerous. They were taught about infection zones, deserters, ration shortages and population pressure. But understanding hunger and watching your mother divide one meal between five people are not the same experience. A child could read about overcrowding in Block B and then return to a home with their own room.",

      "The children of the Blocks grew differently. They learned ration schedules before calendars. They knew which streets became dangerous after dark. They understood when to remain silent during adult conversations. They learned to recognize uniforms. Some attended improvised schools run by retired teachers. Others learned from parents who themselves had received fragmented education after the collapse. Many children learned practical work before they learned mathematics.",

      "And still, they played.",

      "They played cricket with pieces of wood. They made toys from discarded machinery. They traded bottle caps, ration stamps and fragments of old electronics. They invented games inside parking structures and abandoned courtyards. Civilization had managed to ration food, water and electricity. It had not managed to ration childhood.",

      "Population became another problem the Authority could not solve without becoming something ugly.",

      "During the first years of collapse, nobody controlled anything. People were dying too quickly for governments to worry about birth statistics. But when settlements stabilized, the mathematics became unavoidable. Every new child required food. Water. Housing. Medicine. Education. Eventually employment. The population could grow faster than the infrastructure supporting it.",

      "The Authority introduced reproductive authorization as an emergency measure. Couples required permission to legally have children. Eligibility depended upon housing allocation, employment classification and resource availability. Certain essential professions received greater flexibility. Overcrowded districts faced stricter enforcement.",

      "The policy was explained through mathematics. It was experienced through humiliation.",

      "Families found ways around it. Pregnancies were hidden. Documents were forged. Dead relatives remained alive inside databases long enough for a child to inherit an identity. Some children never entered the system at all. They existed without formal allocation, dependent entirely upon families and whatever informal networks could keep them alive.",

      "Naturally, another economy emerged around reproduction. Permissions could be accelerated. Records could disappear. Medical officials could be bribed. Someone always knew someone who knew someone. The Authority could control resources. It could never completely control desperation.",

      "The ration system became the foundation of the new economy and simultaneously the institution most people hated. Every civilian was theoretically entitled to enough resources for survival, determined by household size, employment and classification. The theory was equality through distribution. The reality was a civilization trying to manage millions of individual needs through damaged infrastructure and exhausted bureaucracy.",

      "The queues became permanent.",

      "People arrived before sunrise carrying identification papers, containers and whatever documentation the department required that week. Families took turns standing in line. Professional queue holders appeared, people who could be paid in ration credits simply to stand in someone else's place. Fights broke out when offices approached closing hours. Security occasionally intervened. More often, it watched.",

      "Reaching the front meant nothing. The shipment could be delayed. A clerk could be absent. A signature could be incorrect. Your allocation could require verification from another department. An office could simply close while you were standing three people away from the counter.",

      "Tomorrow, the queue would be there again.",

      "The failure of the ration system created one of the most successful industries in the new civilization: Ration Credit Companies.",

      "Their business model was simple because desperation was simple. A person might be entitled to thirty ration credits next month but require food today. The company offered twenty-five credits immediately and collected thirty later. The family lost five credits. The family ate.",

      "Over time, these companies evolved into institutions capable of doing everything the official economy could not do quickly. Emergency food advances. Housing credit. Queue services. Resource transfers. Employment-backed loans. A family could trade future electricity allocation for medicine today. A worker could borrow food against an expected promotion. A scavenger could use recovered equipment as collateral.",

      "The Authority insisted ration credits were not currency.",

      "The population had already decided otherwise.",

      "Grey Markets developed wherever the official economy failed to understand human beings. The Authority could distribute enough calories to prevent starvation. It could not explain why someone should not spend their remaining credits on alcohol, gambling, music or an old film projected onto the wall of an abandoned building.",

      "The Grey Markets existed beneath parking structures, inside abandoned metro stations, behind warehouses and sometimes directly beside official buildings whose employees quietly used them. You could find medicine unavailable through legal distribution. Alcohol recovered from forgotten warehouses. Cigarettes preserved from the old world. Batteries. Electronics. Counterfeit documents. Books. Jewellery. Stolen uniforms. Clothes removed from the dead and cleaned well enough to forget where they came from.",

      "There were illegal restaurants. Gambling rooms. Music venues powered by stolen generators. Places where people danced because someone had repaired a speaker system. Places where people drank because the following morning did not look worth being sober for.",

      "The poor were not simply miserable bodies waiting for liberation. They had built their own society inside the larger one. Their own businesses. Their own entertainment. Their own criminals. Their own rules. A man could spend eight hours waiting for food allocation and lose half of it gambling before midnight. The apocalypse had not removed vice from humanity. It had simply given vice different currencies.",

      "The Authority knew the Grey Markets existed. Sometimes it raided them publicly. Sometimes the same officials attending those raids purchased from them privately. Laws were always easiest to enforce against people who lacked the resources to avoid them.",

      "But beyond the walls existed another civilization entirely.",

      "The infected were not the greatest danger outside the city.",

      "They were simply the most obvious one.",

      "A scavenger could understand an infected person. Infection followed patterns. Sound attracted them. Movement attracted them. Groups could be avoided, outrun or eliminated. There were procedures for dealing with them. There were weapons. Routes were marked according to previous encounters. An infected person was dangerous, but an infected person did not negotiate.",

      "Humans did.",

      "The moment a scavenging convoy left the secured boundaries of the Blocks, it became visible to the outside world as something more valuable than the people inside it. Scavengers did not travel empty-handed. They carried fuel. Equipment. Clothing. Medical supplies. Tools. Communication devices. Weapons. Sometimes vehicles. And if they returned successfully, they carried even more.",

      "Every expedition was a moving warehouse travelling through territory that did not belong exclusively to anyone.",

      "There were deserters who had once belonged to the Authority. Soldiers who abandoned their positions during the collapse and never returned. Administrative personnel who disappeared with equipment and information. Entire units that fractured and became independent armed groups. Some had formed settlements. Some survived through raiding. Some claimed they were still fighting for the original ideals of civilization while robbing anyone who crossed their territory.",

      "There were other Authorities too.",

      "The people inside the Blocks often spoke about the Authority as though it was the Authority, singular, the last remaining structure of civilization. Outside the walls, that illusion disappeared quickly. Other cities had organized themselves differently. Other settlements had elected leaders, appointed commanders, formed councils or simply accepted whoever possessed the most weapons. Some controlled water. Some controlled farmland. Some controlled roads. Every organized community eventually developed a reason to call itself legitimate.",

      "And all of them needed resources.",

      "Scavengers entered these territories carrying exactly what everyone needed.",

      "Fuel could power generators for months. A working vehicle could transform a settlement's ability to trade. Medical supplies were worth more than money in places where nobody manufactured them. Weapons and ammunition were obvious targets. Even clothes mattered. Proper boots mattered. Batteries mattered. A convoy returning from a successful recovery mission could become the most valuable thing for hundreds of kilometres.",

      "The scavengers understood that every journey might be watched.",

      "Sometimes they were.",

      "Loners followed roads and abandoned settlements without belonging to any permanent faction. Some traded information. Some acted as guides. Some appeared harmless until the scavengers discovered they had been reporting their routes to someone else. Other groups called themselves thinkers of the new era. They believed humanity had survived the apocalypse only to rebuild the same systems that had destroyed it before. Some rejected centralized authority completely. Some wanted independent communities. Some believed the infected were merely the first consequence of humanity's collapse and not the last.",

      "Some were philosophers.",

      "Some were terrorists.",

      "Sometimes nobody could tell the difference.",

      "The world outside the Blocks was not empty. It was fragmented.",

      "Scavengers moved through a geography of competing hungers.",

      "For this reason, nobody simply became a scavenger.",

      "The Authority had learned long ago that fear was not always the strongest method of control. Fear could make someone obedient, but fear could also make them run. A scavenger standing outside the walls with a loaded weapon and an escape route had very little reason to return to civilization if civilization had given him nothing worth returning for.",

      "So the Authority gave scavengers something.",

      "Before a person became eligible for deep-range scavenging, their life could change dramatically. Their allocation improved. Their housing improved. They were transferred from overcrowded dormitories into better quarters. Reliable food appeared on their table. Access to medicine improved. Suddenly, a person who had spent years surviving inside the lower Blocks could experience something dangerously close to comfort.",

      "They were told it was compensation.",

      "It was investment.",

      "The Authority understood attachment better than it understood loyalty.",

      "Some scavengers were allowed to form families under conditions that would have been impossible for civilians of their previous classification. Housing allocation expanded. Reproductive restrictions became flexible. Introductions were arranged through bureaucratic systems that presented themselves as family programs, compatibility initiatives, social welfare measures. The language was always clean.",

      "The intention was not.",

      "They were given the possibility of a life.",

      "Not a promise of happiness. Something more effective. A home that could be lost. A partner waiting inside it. A child sleeping somewhere behind the walls. A table with enough food for everyone sitting around it.",

      "The Authority did not need to place chains around a scavenger's wrists before sending him outside.",

      "It simply made sure there were chains around everything he loved.",

      "By the time the tenure arrived, the scavenger was no longer the same person who had entered the program. He had a room. Then perhaps a home. Someone knew when he was supposed to return. Someone waited for him. He had possessions. Small things, perhaps, but things that belonged to his life. A child might have been born months earlier. An infant who would not remember his face but whose survival depended upon the allocation attached to his service.",

      "Then the order arrived.",

      "Deep-range assignment.",

      "Refusal was technically possible.",

      "So was losing everything.",

      "The family benefits attached to service could be reassessed. Housing was conditional. Ration priority was conditional. Medical access was conditional. Reproductive authorization did not create permanent rights. Nothing did. A scavenger could refuse the assignment and return to the world he had lived in before: overcrowding, reduced allocation, reassignment and uncertainty.",

      "Or he could leave the walls.",

      "And somewhere behind him would remain the person he loved.",

      "His child.",

      "His home.",

      "His entire reason for returning.",

      "This system produced excellent scavengers.",

      "Not because they were fearless.",

      "Because they were terrified of not coming back.",

      "The Authority never needed to execute many deserters publicly. Every scavenger already understood what abandoning an expedition meant. Somewhere inside the Blocks, someone was attached to their name. Someone's housing allocation depended upon it. Someone's medical priority depended upon it. Someone's future depended upon a man continuing to walk toward the walls rather than away from them.",

      "And yet some still disappeared.",

      "Those were the stories nobody explained properly.",

      "Some scavengers vanished with their equipment and joined outside settlements. Some returned years later as deserters. Some became raiders. Some supposedly established communities beyond official territory. Some simply stopped existing.",

      "The protagonist knew scavengers differently from most people.",

      "He knew what happened to them when they returned.",

      "He was a lawyer before the world ended. Somehow, he remained one afterward.",

      "The old legal system had died, but conflict had survived perfectly. Families still disputed property even when property technically belonged to the Authority. People fought over ration inheritance. Housing allocations were contested. Employment classifications could destroy entire households. The Authority produced regulations constantly because civilization had become too complicated to manage without them.",

      "Every regulation created a loophole.",

      "He lived inside those loopholes.",

      "He was not a revolutionary. He was not secretly preparing to overthrow Parliament. He had represented guilty people because they could afford him. He had helped innocent people because occasionally he believed they deserved help. He had lost cases because the wrong person wanted someone else to lose. He understood the society beneath the official language.",

      "He knew which clerk could accelerate an application. Which ration broker could move credits between accounts. Which official accepted money and which preferred favours. He knew smugglers, scavengers, decomposers and people who technically did not exist inside the official records.",

      "He understood White.",

      "He understood Black.",

      "And he understood that most people survived somewhere in between.",

      "The request that eventually takes him outside begins with something absurdly ordinary.",

      "A package has gone missing.",

      "The person requesting its recovery is important enough within the Authority that refusing does not feel like an option, but the request initially seems simple. The protagonist has connections in the Grey Market. If something valuable disappeared into the illegal economy, he knows where to start looking.",

      "So he does.",

      "He speaks to people who owe him favours. He enters markets where nothing has receipts and nobody remembers a name unless remembering it is profitable. He follows rumours through gambling rooms, abandoned basements and warehouses lit by stolen electricity.",

      "The package was there.",

      "Then it wasn't.",

      "Someone had taken it.",

      "Nobody knew who.",

      "Or nobody wanted to know.",

      "The request becomes pressure. Pressure becomes instruction. Eventually the information points beyond the city walls, toward territories where the Authority's jurisdiction exists only on paper and where the protagonist's knowledge of law is worth less than a weapon.",

      "He is sent with scavengers.",

      "It is supposed to be simple.",

      "Find the package.",

      "Recover it.",

      "Return.",

      "But outside the walls, the rules of his life lose meaning almost immediately.",

      "Nobody asks for identification. Nobody cares about allocation classification. Nobody recognizes Parliament as the center of the world simply because Parliament believes itself to be. A scavenging convoy becomes another faction moving through contested territory. Every settlement watches it differently. Every loner considers what can be gained from it. Every deserter understands what it carries.",

      "The infected are waiting somewhere.",

      "So are the people.",

      "They enter abandoned districts where silence itself begins feeling deliberate. They move through buildings where routes are chosen based on information that may already be months old. A road considered safe last week can belong to another faction today. A settlement offering shelter can become hostile because somebody recognized the uniforms worn by the people travelling with them.",

      "The scavengers begin dying before they find the package.",

      "Not heroically.",

      "Not in ways that become beautiful later.",

      "One person makes a mistake. Someone opens the wrong door. A group is discovered by people who were already watching them. A vehicle fails where nobody can repair it. A route disappears beneath rubble. Somebody decides that the fuel they are carrying is worth more than the lives required to take it.",

      "The protagonist watches men disappear from the expedition.",

      "Men who had spoken about returning home.",

      "Men who had complained about their children.",

      "Men who carried photographs folded inside their clothes.",

      "There are injuries he had never seen inside the Blocks. There are moments where survival stops feeling connected to the package at all. Nobody knows what is inside it. Nobody understands why something so small has become important enough to keep chasing. But going back without it has become impossible.",

      "The package has moved through different hands.",

      "Someone protected it.",

      "Someone killed for it.",

      "Someone lied about where it was.",

      "By the time they finally recover it, nobody celebrates.",

      "It is just a sealed box.",

      "A sealed box that has become heavier than its physical weight.",

      "Getting it back is worse than finding it.",

      "They nearly lose it more than once. They nearly lose themselves with it. There are moments where the protagonist believes they will die somewhere beyond the maps, somewhere so distant that their disappearance will eventually become an administrative entry inside a file.",

      "Missing.",

      "Presumed dead.",

      "Allocation reassessed.",

      "The package remains intact through everything.",

      "Dragged through ruins.",

      "Protected during gunfire.",

      "Carried through places where the men carrying it would have abandoned almost anything else to survive.",

      "Eventually, they return.",

      "There are fewer of them.",

      "The survivors do not ask what is inside.",

      "They are too exhausted to care.",

      "Some are injured. Some have lost friends. Some have returned with nothing except the knowledge that they survived when somebody else did not. The package is still sealed. Its destination is known only to the Authority member who requested it.",

      "The protagonist is instructed to keep it secured until collection.",

      "For the first time since the expedition began, he is alone with it.",

      "The room is quiet.",

      "There are still stains on his clothes that will not wash out. His hands hurt when he closes them. Somewhere outside, civilization continues exactly as it did before. People stand in ration queues. Someone is waiting outside an office that has already closed. Children are playing between overcrowded houses. Generators are turning on and off according to schedule.",

      "The package sits in front of him.",

      "He looks at it for a long time.",

      "Nobody had told him what it contained.",

      "He tells himself it doesn't matter.",

      "But something has changed.",

      "Too many people died without knowing.",

      "Too many people suffered for an object they were never allowed to question.",

      "He remembers the faces of the scavengers.",

      "The things they carried with them.",

      "The homes waiting behind the walls.",

      "The people who would eventually receive a notification explaining that their husband, father, brother or son had fulfilled his service to civilization.",

      "He finds something sharp.",

      "For a moment, his hand does not move.",

      "Then he cuts the seal.",

      "It gives way slowly.",

      "He opens the package.",

      "For several seconds, he does not understand what he is looking at.",

      "Cartons of cigarettes.",

      "Expensive ones.",

      "Perfectly preserved.",

      "He moves one aside.",

      "There are bottles beneath them.",

      "Liquor.",

      "Nothing else.",

      "No medicine.",

      "No intelligence.",

      "No technology.",

      "No documents capable of changing the balance of power.",

      "No weapon.",

      "Nothing that could have justified the journey.",

      "Nothing that could have brought the dead back.",

      "He stands there with the package open in front of him.",

      "Outside the room, somewhere behind walls and checkpoints, the city continues surviving.",

      "He does not move.",

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
