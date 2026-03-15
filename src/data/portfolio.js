// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA — Edit this file to update content without touching components
// ─────────────────────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: "Manas Purohit",
  title: "Software Engineer",
  tagline: "GenAI · LLMs · Agentic-AI · Full Stack",
  location: "Indore, MP",
  email: "manaspurohit00@gmail.com",
  phone: "+91 62327-62572",
  website: "manaspurohit28.com",
  linkedin: "linkedin.com/in/Manaspurohit28",
  summary:
    "A versatile Software Engineer with hands-on experience in GenAI tools, LLMs, Agentic-AI frameworks, and RAG systems. Fast vibe-coding learning style with strong problem-solving. Passionate about exploring emerging technologies and building impactful, real-world solutions.",
};

export const SKILLS = {
  technical: [
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 82 },
    { name: "C / C++", level: 75 },
    { name: "HTML / CSS", level: 85 },
    { name: "LangChain", level: 80 },
    { name: "Ollama", level: 75 },
    { name: "Flask", level: 70 },
    { name: "MySQL", level: 72 },
  ],
  domains: [
    "Generative AI",
    "LLMs",
    "Agentic AI",
    "RAG Systems",
    "Machine Learning",
    "Web Development",
    "Data Science",
    "Computer Vision",
  ],
  soft: [
    "Communication",
    "Teamwork",
    "Public Relations",
    "Time Management",
    "Strategy Building",
  ],
};

export const EXPERIENCE = [
  {
    id: "tcs",
    role: "Software Intern",
    company: "Tata Consultancy Services (TCS)",
    location: "Indore, MP",
    period: "Mar 2025 – Jul 2025",
    highlights: [
      "Developed a GenAI RAG evaluator and resume ranking tool using LLMs and embeddings.",
      "Researched GenAI tools, frameworks, and advanced evaluation techniques.",
    ],
  },
  {
    id: "allsoft",
    role: "Software Engineer Intern",
    company: "AllSoft Solutions",
    location: "Ajitgarh, Punjab",
    period: "Jan 2025 – May 2025",
    highlights: [
      "Built XGBoost model to accurately forecast retail sales.",
      "Improved retail planning through data-driven forecasting insights.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "deeprag",
    name: "DeepRAG",
    subtitle: "RAG Testing Application",
    period: "Apr 2025 – Jul 2025",
    description:
      "An AI-powered RAG and LLM testing tool to ensure robust and reliable generative AI systems.",
    tags: ["Python", "LangChain", "LLMs", "RAG", "GenAI"],
    accent: "#ffffff",
  },
  {
    id: "bloomnet",
    name: "BloomNet",
    subtitle: "Flower Classification System",
    period: "Oct 2024 – Nov 2024",
    description:
      "A CNN-based flower image classifier using MobileNet, achieving an accuracy of 89.9%.",
    tags: ["Python", "TensorFlow", "MobileNet", "CNN", "CV"],
    accent: "#cccccc",
  },
  {
    id: "libratrack",
    name: "LibraTrack",
    subtitle: "E-Book Tracking System",
    period: "Jul 2024 – Sep 2024",
    description:
      "A web-based e-library platform for efficient multi-user resource management.",
    tags: ["JavaScript", "HTML/CSS", "MySQL", "Flask"],
    accent: "#aaaaaa",
  },
];

export const EDUCATION = [
  {
    id: "svvv",
    degree: "BTech — Computer Science Engineering",
    institution: "Shri Vaishnav Vidyapeeth Vishwavidyalaya",
    location: "Indore",
    period: "Jul 2021 – Jun 2025",
    score: "CGPA: 7.71 / 10",
  },
  {
    id: "sps12",
    degree: "Higher School Certificate (CBSE 12)",
    institution: "Standard Public School",
    location: "Indore",
    period: "Apr 2020 – May 2021",
    score: "80.0%",
  },
  {
    id: "sps10",
    degree: "Senior School Certificate (CBSE 10)",
    institution: "Standard Public School",
    location: "Indore",
    period: "Apr 2018 – May 2019",
    score: "81.4%",
  },
];

export const CERTIFICATIONS = [
  { name: "The Joy of Computing using Python", issuer: "NPTEL" },
  { name: "Cloud Application Developer", issuer: "IBM" },
  { name: "The Ultimate MySQL Crash Course", issuer: "Udemy" },
  { name: "Enhancing Soft Skills and Personality", issuer: "NPTEL" },
];

export const HOBBIES = ["Photography", "Videography", "Traveling", "Gaming"];

// ─────────────────────────────────────────────────────────────────────────────
// ANNOTATION CONFIG — maps body regions to portfolio sections
// Each entry defines: which section to open, camera target, label position
// ─────────────────────────────────────────────────────────────────────────────
export const ANNOTATIONS = [
  {
    id: "about",
    label: "ABOUT",
    description: "Identity & Summary",
    // Face / goggle region — model center, head height
    position: [0.12, 1.70, 0.22],
    cameraTarget: [0, 1.62, 0],
    cameraPosition: [1.6, 1.75, 1.6],
    side: "right",
  },
  {
    id: "skills",
    label: "SKILLS",
    description: "Python · AI · Web",
    // Right shoulder — A-pose arm raises to ~1.48 height
    position: [0.44, 1.48, 0.12],
    cameraTarget: [0.2, 1.45, 0],
    cameraPosition: [2.0, 1.55, 1.5],
    side: "right",
  },
  {
    id: "projects",
    label: "PROJECTS",
    description: "DeepRAG · BloomNet · LibraTrack",
    // Left shoulder
    position: [-0.44, 1.48, 0.12],
    cameraTarget: [-0.2, 1.45, 0],
    cameraPosition: [-2.0, 1.55, 1.5],
    side: "left",
  },
  {
    id: "education",
    label: "EDUCATION",
    description: "SVVV — CSE · CGPA 7.71",
    // Right wrist — A-pose arm extends to ~0.95 height at x~0.75
    position: [0.78, 0.92, 0.08],
    cameraTarget: [0.4, 0.95, 0],
    cameraPosition: [2.2, 1.0, 1.6],
    side: "right",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    description: "TCS · AllSoft",
    // Left wrist
    position: [-0.78, 0.92, 0.08],
    cameraTarget: [-0.4, 0.95, 0],
    cameraPosition: [-2.2, 1.0, 1.6],
    side: "left",
  },
];
