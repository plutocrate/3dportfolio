// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA — Edit this file to update content without touching components
// ─────────────────────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: "Pratham Purohit",
  title: "Full-Stack Developer",
  tagline: "FSDev by day, Philosopher by night.",
  location: "Solan, HP, India",
  email: "prathampurohitonline@outlook.com",
  phone: "+91 93172-77524",
  website: "prathamis.cool",
  linkedin: "linkedin.com/in/prathammpurohit",
  github: "github.com/plutocrate",
  summary:
    "Frontend / Full-Stack Developer with hands-on experience building responsive web interfaces, real-time systems, and browser-based simulations. Skilled in React, TypeScript, Three.js, and Node.js with a passion for creative engineering, graphics programming, and real-world deployment.",
};

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

// -------------------------------------
// BLOG
export const BLOG_POSTS = [
  {
    id: "12th-blog",
    title: "Liberation.",
    subtitle: "What is liberation?",
    date: "1328, 26 April 2026",
    categories: ["reflection"],
    body: [
		"Liberation is not peace. It’s rejection. I was sitting in my room when it hit me.",

"It’s a terrible room—old, suffocating, lifeless. I hate it. And the strange part is… it gives me everything I need. A bed, a roof, a place to stay. So why does it still feel wrong?",

"Because logically, there’s no problem. It works. But something in me just refuses it. And that feeling… felt more honest than logic.",

"That’s when it started to shift. Maybe it’s not about fixing anything. Maybe it’s about seeing what’s actually happening.",

"The room isn’t the problem. Need isn’t the problem. It’s this idea of ‘mine’. The moment I call it my room… I start adjusting to it. I shrink a little. I settle. I become someone who fits inside it.",

"And it’s subtle. You don’t notice it happening. You just slowly become… appropriate. Acceptable. Aligned.",

"And that’s the trap. Not the room—but the agreement. You think you’re just living somewhere, but you’re also becoming someone who belongs there.",

"And it’s not just rooms. It’s everything. Thoughts, identity, beliefs. You hold them, then you start living according to them, and after a point… you don’t even question them.",

"That’s not living. That’s maintenance.",

"And I think liberation starts there. Not with some big idea. Just a quiet disgust. Not anger, not sadness. Just… this isn’t it.",

"And if you stay with that feeling, something changes. You stop trying to fix things. You stop decorating it. You stop trying to make it work.",

"You just… step back from it. Not physically. But internally. You stop belonging to it.",

"And when that happens, things loosen. The room is just a room. Thoughts are just thoughts. Identity stops feeling permanent.",

"And you don’t have to become anything else. You just stop forcing yourself to fit.",

"It feels strange at first. Almost wrong. Because we’re used to holding on, used to shaping ourselves into something stable.",

"But once you see it… even a little… you can’t fully go back.",

"And for me… it goes deeper than just a room.",

"I’ve lived in lack. Real lack. The kind where you start believing peace is something you have to earn… or buy.",

"So I tried. I tried to fit in, to adjust, to build something that looks like stability… something that feels like I’ve finally made it out.",

"But even there… it doesn’t sit right.",

"Because it feels like I’m just trading one cage for another.",

"A better one, maybe. Cleaner. Safer.",

"But still something I have to fit into.",

"And I don’t want that anymore.",

"I don’t want to buy peace. I don’t want to shape myself into something acceptable just to feel okay.",

"I’d rather let it all go wrong than feel that quiet suffocation again.",

"Because underneath all of this… there’s something else in me.",

"These stories. These worlds. Things that keep running in my head whether I want them to or not.",

"They don’t come from that version of me that’s trying to survive or fit in.",

"They show up when I stop holding everything together.",

"And I think I’ve been burying them… just to keep this structure intact.",

"So maybe liberation, for me, is this—",

"Getting out of this costume. Dropping all of it. Even if it looks unstable. Even if it makes no sense to anyone else.",

"And letting whatever is inside… come out the way it wants.",

"Not controlled. Not shaped to fit.",

"Just… real."
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
    id: "about",
    label: "ABOUT",
    description: "Identity & Summary",
    position: [0.12, 1.70, 0.22],
    cameraTarget: [0, 1.62, 0],
    cameraPosition: [1.6, 1.75, 1.6],
    side: "right",
  },
  {
    id: "skills",
    label: "SKILLS",
    description: "React · Three.js · Node",
    position: [0.44, 1.48, 0.12],
    cameraTarget: [0.2, 1.45, 0],
    cameraPosition: [2.0, 1.55, 1.5],
    side: "right",
  },
  {
    id: "projects",
    label: "PROJECTS",
    description: "Baba Is You · GTutor · MrPhony",
    position: [-0.44, 1.48, 0.12],
    cameraTarget: [-0.2, 1.45, 0],
    cameraPosition: [-2.0, 1.55, 1.5],
    side: "left",
  },
  {
    id: "education",
    label: "EDUCATION",
    description: "Shoolini Univ — CSE",
    position: [0.78, 0.92, 0.08],
    cameraTarget: [0.4, 0.95, 0],
    cameraPosition: [2.2, 1.0, 1.6],
    side: "right",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    description: "Inviolate · FirstUniv",
    position: [-0.78, 0.92, 0.08],
    cameraTarget: [-0.4, 0.95, 0],
    cameraPosition: [-2.2, 1.0, 1.6],
    side: "left",
  },
  {
    id: "talk",
    label: "TALK",
    description: "Send a message",
    position: [-0.45, 0.62, 0.12],
    cameraTarget: [0, 0.65, 0],
    cameraPosition: [-2.0, 0.75, 1.8],
    side: "left",
  },
	  {
    id: "blog",
    label: "BLOG",
    description: "Thoughts & Writes",
    position: [0.38, 0.22, 0.12],
    cameraTarget: [0, 0.25, 0],
    cameraPosition: [2.0, 0.45, 1.8],
    side: "right",
  },
];
