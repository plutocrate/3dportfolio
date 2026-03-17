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
    id: "seventh-post",
    title: "RABID, my spilt keyboard side hustle.",
    subtitle: "Thank you claude.",
    date: "0211, 18 Mar 2026",
    categories: ["sidehustle"],
    body: [
      "I'm working on RABID's website, which is side hustle, where I sell split keyboards, and provide Web Development services.",
      "Anyways, priority at this moment is Python, PowerBI, and SQL. That's gonna land me a job.",
    ],
		media: ["/media/patrick.jpg"],
    link: "rabid.co.in",
  },
  {
    id: "sixth-post",
    title: "No Good Night",
    subtitle: "Sighs, I must build a project first.",
    date: "17 Mar 2026",
    categories: ["reflection"],
    body: [
      "I have high chances of landing a job at Adani, I must make every minute count.",
      "I'm making a data analytics project right now, it's a new domain to me, but I'm doing good, I think I'll make it through.",
    ],
		media: ["/media/shinnerd.jpg"],
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
  {
    id: "third-post",
    title: "I have my IBM assesment test morrow",
    subtitle: "",
    date: "16 Mar 2026",
    categories: ["Reflection"],
    body: [
      "I must be preparing for the coding round, and I will use Javascript as my language.",
      "Time to get my arse back to DSA now.",
    ],
		media: ["/media/gorilla.jpg"],
    link: "",
  },
  {
    id: "second-post",
    title: "It's a good day, today.",
    subtitle: "Just a basic life blog.",
    date: "16 Mar 2026",
    categories: ["Reflection"],
    body: [
      "I'm getting stronger with life, playing guitar, coding everday, learning music... beautiful life it is.",
      "Anways, thanks for your visit here",
    ],
		media: ["/media/basicthru.mp4","/media/peterche.jpg"],
    link: "",
  },
  {
    id: "first-post",
    title: "Why I Build Things That Break",
    subtitle: "On learning by shipping, not studying.",
    date: "16 Mar 2026",
    categories: ["Reflection"],
    body: [
      "Every project I've shipped has had at least one catastrophic failure before it worked. That's not a bug in my process — it's the whole point.",
      "The fastest way I've found to understand a system is to break it intentionally, then fix it. You learn more from a failed deployment at 2am than from any tutorial.",
    ],
		media: ["/media/burn.jpg"],
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
