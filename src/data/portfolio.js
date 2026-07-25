// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA — Edit this file to update content without touching components
// ─────────────────────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: "Pratham Purohit",
  title: "Full-Stack Developer",
  tagline: "Dev by day, Philosopher by night.",
  location: "India",
  email: "prathampurohitonline@outlook.com",
  website: "prathamis.cool",
  linkedin: "linkedin.com/in/prathammpurohit",
  github: "github.com/plutocrate",
  summary:
    "I spend a lot of time trying to understand things.\nPeople. Games. Software. Stories. Why some ideas stay with us and others disappear.\nI build software because it's the easiest way I know to turn those questions into something tangible. Right now that mostly means design and web development, but I'm slowly drifting toward graphics programming and game development.\nEverything else goes here. I hope you enjoy your time here.",
};

// ─────────────────────────────────────────────────────────────────────────────
// AVAILABILITY — small status badge shown under Identity in the About section.
// Update `status` any time your situation changes:
//   "open"    → green dot, e.g. actively looking for roles/freelance
//   "limited" → amber dot, e.g. open but selective / limited bandwidth
//   "closed"  → grey dot,  e.g. not currently looking
// `label` is the short badge text. `note` is optional smaller print under it —
// leave it as "" to hide.
// ─────────────────────────────────────────────────────────────────────────────
export const AVAILABILITY = {
  status: "open",
  chipLabel: "Open to Work",
  label: "Open to full-time roles & freelance work",
  note: "Based in India — open to remote or relocation.",
};

// Add an optional `dateAdded: "26 Jul 2026"` field to any technical skill
// below to make it show up as "✦ NEW SKILL" in the top LATEST ticker
// (see NewsBanner.jsx). Skills without a dateAdded are left out of the feed.
export const SKILLS = {
  technical: [
    { name: "JavaScript / TypeScript", level: 92 },
    { name: "React", level: 90 },
    { name: "Three.js / WebGL", level: 85 },
    { name: "HTML5 / CSS3 / Tailwind", level: 88 },
    { name: "Node.js / Express", level: 80 },
    { name: "GSAP", level: 78 },
    { name: "PostgreSQL / MySQL / MongoDB", level: 72 },
    { name: "Socket.io", level: 75 },
  ],
  domains: [
    "Frontend Development",
    "Full-Stack Engineering",
    "Real-Time Rendering",
    "Canvas API",
    "Browser Simulation",
    "REST APIs",
    "Linux / Nginx",
    "GitHub Actions",
  ],
  soft: [
    "Problem Solving",
    "System Design",
    "Team Collaboration",
    "Technical Support",
    "Communication",
  ],
};

export const EXPERIENCE = [
  {
    id: "genesis",
    role: "UIUX Developer",
    company: "Genesis Technologies",
    location: "Indore, MP, India",
    period: "June 2026 - present",
    highlights: [
      "Currently on traninig period",
    ],
  },
  {
    id: "inviolate",
    role: "Junior Web Developer",
    company: "Inviolate Technologies LLP",
    location: "Indore, MP, India",
    period: "Mar 2025 – Nov 2025",
    highlights: [
      "Developed responsive frontend applications using React and TypeScript with REST API integrations.",
      "Designed modular UI component library to standardize interface development across projects.",
      "Built a file-sharing NAS server using Ubuntu and Samba on repurposed hardware with 1TB storage.",
      "Assisted with server setup, service configuration, and system maintenance in Linux environments.",
    ],
  },
  {
    id: "firstuniv",
    role: "Web Developer Intern",
    company: "FirstUniv (formerly AADDOO.AI)",
    location: "Solan, HP, India",
    period: "Aug 2022 – Jan 2023",
    highlights: [
      "Developed modules for a university management system handling student, faculty, and examination workflows.",
      "Designed frontend interfaces for club registration, member management, and administrative dashboards.",
      "Built responsive components using PHP, Bootstrap, AdminLTE3, JavaScript, and jQuery with API-driven data rendering.",
      "Collaborated to implement Program Outcome / Course Outcome evaluation logic and classroom availability detection.",
    ],
  },
  {
    id: "shoolini",
    role: "Technical Assistant",
    company: "Journalism Dept., Shoolini University",
    location: "Solan, HP, India",
    period: "Feb 2022 – Jul 2026",
    highlights: [
      "Managed and maintained the department's digital dashboard for academic announcements and schedules.",
      "Provided technical assistance to faculty and students, troubleshooting classroom systems and academic software.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "babaisyou",
    name: "Baba Is You",
    subtitle: "Web Implementation — Canvas Puzzle Engine",
    period: "Feb 2026",
    description:
      "Engineered a Canvas-based puzzle simulation engine in JavaScript with a Node.js/Express + PostgreSQL backend, deployed on Neon and Railway, serving 200 daily user requests.",
    tags: ["JavaScript", "Canvas API", "Node.js", "Express", "PostgreSQL", "Railway"],
		link:"https://github.com/plutocrate/iluvbaba",
  },
  {
    id: "gtutor",
    name: "GTutor",
    subtitle: "Gesture-Based Guitar Tutor",
    period: "Jan 2026",
    description:
      "Built a real-time browser guitar tutor using React and TypeScript, integrating MediaPipe gesture recognition and Web Audio API signal analysis.",
    tags: ["React", "TypeScript", "MediaPipe", "Web Audio API"],
		link: "https://www.linkedin.com/posts/activity-7437057168048091137-l_Ey?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADauVx0BsN5m4HZ_vmMezRkN9FZRXltun7w",
  },
  {
    id: "mrphony",
    name: "MrPhony",
    subtitle: "ASCII Terrain Strategy Game",
    period: "Mar 2026",
    description:
      "React + TypeScript strategy game converting real-world Uttarakhand topography into ASCII game maps using Claude AI, with automated deployment via GitHub Actions.",
    tags: ["React", "TypeScript", "Claude AI", "GitHub Actions"],
		link: "https://github.com/plutocrate/mrphony",
  },
  {
    id: "beatdancer",
    name: "Beat Dancer",
    subtitle: "Rhythm-Based 3D Dance Game",
    period: "Mar 2026",
    description:
      "Browser-based rhythm game using Three.js and WebGL, integrating Mixamo 3D character animations synchronized with music beats in real time.",
    tags: ["Three.js", "WebGL", "Mixamo", "Web Audio API"],
		link: "https://beatonline-production.up.railway.app/",
  },
  {
    id: "gwent",
    name: "Gwent Multiplayer",
    subtitle: "Online Card Game (Witcher 3 Inspired)",
    period: "Feb 2026",
    description:
      "Real-time multiplayer browser card game using Node.js, Express, and Socket.IO with room-based 1v1 matches and synchronized game state between players.",
    tags: ["Node.js", "Express", "Socket.IO", "Multiplayer"],
		link: "https://gwent-mult-production.up.railway.app/",
  },
];

export const EDUCATION = [
  {
    id: "shoolini",
    degree: "BTech — Computer Science & Engineering",
    institution: "Shoolini University of Biotechnology and Management Sciences",
    location: "Solan, HP, India",
    period: "Jul 2021 – Jun 2025",
    score: "GPA: 6.9 / 10",
  },
];

export const CERTIFICATIONS = [
  { name: "GitHub Actions CI/CD", issuer: "GitHub" },
  { name: "Linux System Administration", issuer: "Self-directed" },
  { name: "REST API Design", issuer: "Self-directed" },
];

export const HOBBIES = ["3D Graphics", "Game Dev", "Open Source", "Linux"];
// NOTE: HOBBIES is no longer rendered in the About section (Interests was
// removed) but is left here in case it's wired up elsewhere later.

// ─────────────────────────────────────────────────────────────────────────────
// LINK COLLECTIONS — powers the About → Links section (replaces Contact).
// Same tabbed layout as Academia: each entry below becomes one tab, `heading`
// is the sub-heading shown above its list, and `links` is rendered in the
// same underline + arrow format used by Chronicles' "Further Reading".
// Add/remove collections or links freely — everything here is data-driven.
// ─────────────────────────────────────────────────────────────────────────────
export const LINK_COLLECTIONS = [
  {
    id: "wikipedia",
    label: "Wiki Trails",
    heading: "Favorite Wikipedia Links",
    links: [
      { label: "Simulation Hypothesis", href: "https://en.wikipedia.org/wiki/Simulation_hypothesis" },
      { label: "Ship of Theseus", href: "https://en.wikipedia.org/wiki/Ship_of_Theseus" },
      { label: "Dunning–Kruger Effect", href: "https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect" },
      { label: "Occam's Razor", href: "https://en.wikipedia.org/wiki/Occam%27s_razor" },
      { label: "The Trolley Problem", href: "https://en.wikipedia.org/wiki/Trolley_problem" },
      { label: "Conway's Game of Life", href: "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" },
      { label: "The Absurd (Camus)", href: "https://en.wikipedia.org/wiki/Absurdism" },
      { label: "Fermi Paradox", href: "https://en.wikipedia.org/wiki/Fermi_paradox" },
    ],
  },
  {
    id: "cs-articles",
    label: "CS Reads",
    heading: "Favorite Computer Science Articles",
    links: [
      { label: "Turing Completeness", href: "https://en.wikipedia.org/wiki/Turing_completeness" },
      { label: "P versus NP Problem", href: "https://en.wikipedia.org/wiki/P_versus_NP_problem" },
      { label: "CAP Theorem", href: "https://en.wikipedia.org/wiki/CAP_theorem" },
      { label: "Byzantine Fault Tolerance", href: "https://en.wikipedia.org/wiki/Byzantine_fault" },
      { label: "Big O Notation", href: "https://en.wikipedia.org/wiki/Big_O_notation" },
      { label: "The Halting Problem", href: "https://en.wikipedia.org/wiki/Halting_problem" },
      { label: "Two Generals' Problem", href: "https://en.wikipedia.org/wiki/Two_Generals%27_Problem" },
      { label: "Rice's Theorem", href: "https://en.wikipedia.org/wiki/Rice%27s_theorem" },
    ],
  },
  {
    id: "favorite-places",
    label: "Web Haunts",
    heading: "Favorite Places on the Internet",
    links: [
      { label: "Hacker News", href: "https://news.ycombinator.com" },
      { label: "Are.na", href: "https://www.are.na" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Wikipedia", href: "https://www.wikipedia.org" },
      { label: "Lobsters", href: "https://lobste.rs" },
      { label: "Reddit", href: "https://www.reddit.com" },
    ],
  },
];

// -------------------------------------
// BLOG
export const BLOG_POSTS = [
{
  id: "15th-blog",
  title: "Look up if you want change.",
  subtitle: "Not metaphorically, I mean actually!",
  date: "1418, 25 July 2026",
  categories: ["reflection"],
  body: [
	"I'm attaching pink floyd's ambience guitar below, listen to it.",
	"Anyways, you know when I'm lost, or when I was lost, lost in myself or lost in the charm or chaos of life, I don't look up, I look at my head level, I look down my phone's screen, or straight to laptop's screen, or just down, very closed range, very.",
	"When I listen to music at nights, I either close my eyes, or use my phone.",
	"But, there was a time, last night I was thinking about it, when I wanted to change, and when I was changing(real change). I used to look far, not metaphorically, but actually used to look far.",
	"I'll look at the distant trees, distant car running on mountains, distant people, distant buildings, building tops, and even the sky!",
	"And yes, when listening to music, looking at the ceiling.",
	"There was even time, I was so alone, I used to talk with the moon, obviously mouth closed, just looking at that amazing celestial body in freezing Himalyan nights(btw my college was in Himachal Pradesh).",
	"This thing hit me last night, and I again started looking far, not in metaphorical sense, but actually(again I'm bringing this up).",
	"Meaning of this journal log/blog -> no meaning. It just maybe made sense to me. Ok untill next time, I want to talk about the women in my life, in past and present, and what I learned from them, the separation, and how I should treat the new woman coming in my life."
  ],
  media: ["/media/far.jpg"],
  link: "",
},
{
  id: "14th-blog",
  title: "My REM talks to me, and it provides me wisdom.",
  subtitle: "This is the first time, I'm documenting it.",
  date: "1245, 19 July 2026",
  categories: ["reflection"],
  body: [
	"I dreamt of my past life, and realised how badly I disconnected from everything, in school I was the happiest(this is what I dream of btw), then how I disconnected from it. That separation was painful, oh god. Next, during COVID, if I observe closely, I was living my happiest time, but I couldn't realise it in the moment, I spent that time in my ex's home, no evil love, no lust, just pure fucking fun. Her family, me and my sister, it was fun. I disconnected from that too, and again god, that separation was painful, really painful that it opened my doorway to esoteric life.",
	"And you know, there's a lot more after that. I think it is human to attach, right? Attach to people, surrounding, place, and a lifestlye?",
	"Now, if you talk about my now, I am really detached from everything, I didn't care, I don't care if someone leaves, or I leave, or something changes, it's just my default to not care.",
	"Even if I dream of that ex, and the moments I was enjoying being a human, those emotions. I wake up, and I analyse my dream instead, rather than trying to contact the people I dreamt of, or the visit the place I dreamt of.",
	"The thing I analyzed is, I don't want absence in life, I want to be present in this world, my happiness lies in being present. I like people, I like what's around me, it's just I switch my life too fast without making myself stable.",
	"Buddha liked absence? Idk, I heard it somewhere. But, I do not. I think my hunt for being absent and detached from the world is the cause of my lonliness, and you know what, I want to grow in life, this is not what I want to be, just a 'thinker'. Just my growth has a different route, I want to make games, I care a lot about the human psychology, collective psychology of characters, how they were, how they are now, not just what they've become, but how they eat now, how they talk with people now, how they stand, how they dress, how they make gestures, how they believe, and what not what not",
	"The summary was my REM told me, what I estimate is a false estimation, it'll actually require a lot of my efforts and hardwork to deliver what I want to, if I keep going like what I'm going like, I'll end up being just more of a thinker not a fucking successful game developer with cult following.",
	"The dream was not even about this thing, but this is what I analyzed lol, ok bye."
  ],
  media: ["/media/gorilla.jpg"],
  link: "",
},
{
  id: "13th-blog",
  title: "No place for non believers",
  subtitle: "people need to share a certian common belief to coexist.",
  date: "1220, 14 July 2026",
  categories: ["reflection"],
  body: [
	"I became a non believer around 2 years ago. Not a non believer of God, a non believer of almost everything. Before that, life was surprisingly simple. Grow, work hard, become wealthy, build something, take revenge against myself for all those years I wasted suffering and wandering. I actually worked hard, real hard. I had good friends, good girls, good sex. Life wasn't exactly unfair to me, and somehow it still kept unfolding it's secrets in front of me.",
    "Something changed though. Now I question almost every model handed to me. Society, authority, success, even my own thoughts. Not because I want to rebel, my mind just refuses to accept things without denying them first. I don't know why, maybe it's just how it works now.",
    "The funny part is, I still want to build. Probably more than ever. I just don't hurry anymore. I don't feel that guilt of missing out. I just like to exist. Which is also fake because I still haven't mastered myself. I still see a beautiful girl and fall for her, what is it now... around the 30th one? And I still end up confessing.",
    "Now I'm lonely. Not because there are no people around me, there are. I just don't fit into where I want to fit anymore. I want conversations about people, art, cinema, games, stories and weird observations. Instead I mostly end up talking about things that don't move me.",
    "And yeah... I still want good booties, good folks and good sex. I'm painfully human after all. Maybe that's the irony."
  ],
  media: ["/media/lastdance.jpeg"],
  link: "",
},
  {
    id: "12th-blog",
    title: "Liberation.",
    subtitle: "What is liberation?",
    date: "1328, 26 April 2026",
    categories: ["reflection"],
    body: [
		"Is liberation rejection or acceptance?",
		"Liberation starts with disgust. I look around, my messed up room, suffocating, lifeless, everything shattered and scattered, but this room gives me everything, a bed to sleep, a roof, washroom to shit in private.",
		"We are all living in a costume, some folks like it, some don't, I'm in the second group, because I lived in lack, real lack of resources, affection, and worldy freedom. Only cool thing I posses at the moment is my head.",
		"I tried to make my life better, make it stable, but the more I own, it ended up owning me and complicating my life.",
		"I owned a job(owning a job, really?). I worked hard to find a job, but that job owned my life, all the things I've ever owned ended up owning me, my emotions they own me, my affection for her is now owning me, my mental illness is owning me.",
		"What do humans like me do? Death is not a cool option imo, I have stories going in my head, I daydream, I luciddream about them.",
		"I want to tell these stories to the world in my own way, but the question is when? Either make your life stable, play safe, take your time, or, do whatever the fuck you want to do, use the resources you already got, really use them, and create.",
		"What if my creativity is not accepted by the world? Ask yourself did you do all these for validation?",
		"Play safe then. Idk man, I don't have answers to all these questions at the moment.",
    ],
		media: ["/media/letgo.jpg"],
    link: "",
  },
  {
    id: "11th-blog",
    title: "How to meditate",
    subtitle: "My previous blogs were uncooked",
    date: "1321, 03 April 2026",
    categories: ["reflection"],
    body: [
      "My previous blogs were not correct, I will contradict myself here.",
			"I said meditation is letting go of thougts, I was wrong. Meditation is noticing your thoughts.",
      "I used to think, we are our thoughts, our wiring of thoughts makes us different, which is correct in most cases, but, thoughts are temporary, really, everything is temporary, real battlefield is inside the head.",
			"Meditation is about looking at your thoughts coming and going. That's it, you can't control your thoughts, they will come, always.",
			"This is more about awareness, and attention. If you realise even your own wiring of system is just a side effect of being a human, you can bend your own reality.",
			"Bending reality? No, not in the way you're thinking, it's not magic, it's just making your life more peaceful by just observing, no magic here, sorry.",
    ],
		media: ["/media/whatis.jpg"],
    link: "",
  },
  {
    id: "10-post",
    title: "Creativity is a constant suffering.",
    subtitle: "I got a fix to it btw.",
    date: "0104, 30 Mar 2026",
    categories: ["reflection"],
    body: [
      "Creativity is a constant slavery your mind imposes on you.",
			"Slavery will never bring you joy, and that's the reason you can't find bliss.",
      "Eastern philosphies had a different way of dealing with it, 'mysticism'.",
			"Buddha left with blissfullness and you're not him, and you don't need to be him.",
			"Creative head calls for creativity, no matter what life gives you, your creativity keeps you in agony, I'm not talking about so called 'creatives', my talk is a little deeper.",
			"They say meditate, let go of thoughts, you don't need to cater every thoughts of yours, like really think about it, what did your creativity bring to 'you'? So maybe just chill out, live with peace, after death is no peace, but, your consicousness is gone, you're gone. So, you gotta create peace right now.",
    ],
		media: ["/media/buddha.jpg"],
    link: "",
  },
  {
    id: "ninth-post",
    title: "Misunderstanding Buddhism",
    subtitle: "And life overall",
    date: "0159, 21 Mar 2026",
    categories: ["reflection"],
    body: [
      "Suffering makes you stronger, too much suffering makes you humble, way too much suffering makes you hubristic.",
			"If you're in an aware loop of 'way too much suffering', you constantly discover deeper dimensions of perception, and weirder sense of life.",
      "That constant discovery of yourself makes you lonelier, and difficult to adapt the innocence around you.",
			"People are naive, they are pre-made, but you're not, that's where your ego kicks in, the worst form of ego; arrogance of justifying your sick life as discovery.",
			"Life is meant to be understood slowly, that's where the fun lies in. Big brain too early... What will you do now? How will you adjust within yourself, when you've known there's no God, or if there is, you do not care?",
			"What will you do now? If you take my advise, live with the rules of society, and nature. You'll be okay again, and trust me you will not loose your 'years of deep research'."
    ],
		media: ["/media/buddhamonkey.jpg"],
    link: "",
  },
  {
    id: "fifth-post",
    title: "Good Night",
    subtitle: "good night",
    date: "17 Mar 2026",
    categories: ["reflection"],
    body: [
      "My insomnia is bad, but I will fix it sooner.",
      "It starts today, I will go to bed right now, it's around 2 AM, very good. Good night folks.",
    ],
		media: ["/media/tedk.jpg"],
    link: "",
  },
  {
    id: "fourth-post",
    title: "Late night jam.",
    subtitle: "",
    date: "16 Mar 2026",
    categories: ["Guitar","Music"],
    body: [
      "In future I'll be giving more time to my music/guitar sessions",
      "For, now I share with you what I practised last night at 4.",
    ],
		media: ["/media/terebinag.mp4","/media/was.gif"],
    link: "",
  },
];
// ---------------------------------------------

// ─────────────────────────────────────────────────────────────────────────────
// ANNOTATION CONFIG
// ─────────────────────────────────────────────────────────────────────────────
export const ANNOTATIONS = [
  {
    // Specs / head level — left side
    id: "about",
    label: "ABOUT",
    description: "Identity & Summary",
    position: [-0.12, 1.70, 0.22],
    cameraTarget: [0, 1.62, 0],
    cameraPosition: [-1.6, 1.75, 1.6],
    side: "left",
  },
  {
    // Consolidates the old Projects / Experience / Skills / Education buttons
    // into one tabbed section — see AcademiaSection.jsx
    // Elbow level — left side
    id: "academia",
    label: "ACADEMIA",
    description: "Projects · Experience · Skills · Education",
    position: [-0.38, 1.16, 0.15],
    cameraTarget: [-0.2, 1.16, 0],
    cameraPosition: [-2.0, 1.26, 1.5],
    side: "left",
  },
  {
    // Knee level — left side
    id: "talk",
    label: "TALK",
    description: "Send a message",
    position: [-0.18, 0.48, 0.15],
    cameraTarget: [0, 0.48, 0],
    cameraPosition: [-2.0, 0.58, 1.8],
    side: "left",
  },
  {
    // New long-form essay page — see ChroniclesSection.jsx / ChronicleOverlay.jsx
    // Specs / head level — right side (mirrors "about")
    id: "chronicles",
    label: "CHRONICLES",
    description: "Long-form essays",
    position: [0.12, 1.70, 0.22],
    cameraTarget: [0, 1.62, 0],
    cameraPosition: [1.6, 1.75, 1.6],
    side: "right",
  },
  {
    // Fist / hand level — right side (arm hangs down)
    id: "blog",
    label: "JOURNAL",
    description: "Thoughts & Writes",
    position: [0.42, 0.85, 0.12],
    cameraTarget: [0.2, 0.85, 0],
    cameraPosition: [2.0, 0.95, 1.5],
    side: "right",
  },
];
