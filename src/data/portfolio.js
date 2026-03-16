// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA — Edit this file to update content
// ─────────────────────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: "Arshad Jamal",
  title: "AI/ML Engineer & Backend Developer",
  tagline: "Python · GenAI · Multi-Agent · FastAPI",
  location: "Hyderabad, Telangana",
  email: "arshad.jamal.co@gmail.com",
  phone: "+91 95341-61220",
  website: "github.com/arshadjamal",
  linkedin: "linkedin.com/in/arshadjamal",
  summary:
    "Python-focused AI/ML practitioner with 2 International Exchange experiences, strong expertise in Backend Development and Generative AI. Proven experience building scalable AI applications using Python, FastAPI, and SQL. Expert in orchestrating multi-agent workflows and deploying real-world solutions.",
};

export const SKILLS = {
  technical: [
    { name: "Python",              level: 95 },
    { name: "FastAPI / Flask",     level: 88 },
    { name: "PyTorch / TensorFlow",level: 84 },
    { name: "LangChain / LangGraph",level: 88 },
    { name: "SQL / PostgreSQL",    level: 80 },
    { name: "Docker / MLOps",      level: 78 },
    { name: "CrewAI / Autogen",    level: 82 },
    { name: "C++ / R",             level: 60 },
  ],
  domains: [
    "Generative AI",
    "Multi-Agent Systems",
    "RAG Pipelines",
    "MLOps",
    "Backend Development",
    "Deep Learning",
    "Data Science",
    "LLM Orchestration",
  ],
  soft: [
    "Problem Solving",
    "System Design",
    "Research",
    "Cross-Cultural Collaboration",
    "Communication",
  ],
};

export const EXPERIENCE = [
  {
    id: "zsapiens",
    role: "Data Science Intern",
    company: "Z Sapiens",
    location: "Remote",
    period: "Feb 2025 – Aug 2025",
    highlights: [
      "Developed Sutradhar, a GenAI-powered orchestration platform automating academic resource curation from faculty-defined natural language prompts.",
      "Engineered a multi-agent system in Python and LangChain with specialized tool-equipped agents orchestrated by a central planner.",
      "Implemented an end-to-end RAG pipeline integrating Astra DB for heterogeneous content with high-relevance, low-latency semantic retrieval.",
      "Contributed to backend integration using Python and FastAPI ensuring seamless communication between AI agents and the user interface.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "a2a",
    name: "A2A-ADK-MCP",
    subtitle: "Multi-Agent Protocol System",
    period: "Sep 2025",
    description:
      "Engineered a multi-agent system implementing core A2A and MCP standards. Architected a host_agent for task orchestration, dynamically discovering and delegating to specialized A2A-compatible agents built using Google's ADK.",
    tags: ["Python", "A2A", "MCP", "Google ADK", "Multi-Agent"],
  },
  {
    id: "genai-orchestration",
    name: "GenAI Orchestrator",
    subtitle: "Multi-Agent AI Orchestration Framework",
    period: "Jul 2025",
    description:
      "Designed and deployed a multi-agent AI orchestration system using Python, FastAPI, and LangChain. Delivered multi-interface accessibility — web dashboard, Typer-based CLI, and YAML-driven evaluation suite, improving developer efficiency by 35%.",
    tags: ["Python", "FastAPI", "LangChain", "REST API", "CLI"],
  },
  {
    id: "nyc-cab",
    name: "NYC Cab MLOps",
    subtitle: "Real-Time Demand Prediction Pipeline",
    period: "Apr 2025",
    description:
      "Built an end-to-end MLOps pipeline using MLflow, AWS EC2, and Docker to forecast taxi demand. Improved forecast model MAPE by 18% and deployment speed by 40%. Implemented automated model drift detection reducing performance degradation by 30%.",
    tags: ["Python", "MLflow", "Docker", "AWS EC2", "MLOps"],
  },
];

export const EDUCATION = [
  {
    id: "shoolini",
    degree: "BTech — Computer Science (AI & ML)",
    institution: "Shoolini University",
    location: "Solan, India",
    period: "Aug 2021 – Jun 2025",
    score: "GPA: 8.5 / 10",
  },
  {
    id: "ankara",
    degree: "International Exchange Program",
    institution: "Ankara University",
    location: "Turkey",
    period: "Feb 2023 – Jul 2023",
    score: "GPA: 6.9",
  },
  {
    id: "asia",
    degree: "International Exchange Program",
    institution: "Asia University",
    location: "Taiwan",
    period: "Aug 2023 – Jul 2024",
    score: "GPA: 8.5",
  },
];

export const CERTIFICATIONS = [
  { name: "Honours Award from Director General EME",         issuer: "2019" },
  { name: "Meta's XR Startup Program — FITT IIT Delhi",     issuer: "IIT Delhi" },
  { name: "HTML, CSS, JavaScript for Web Dev",               issuer: "Coursera" },
  { name: "Advanced Algorithms and Complexity",              issuer: "Coursera" },
  { name: "Model United Nations — Consolation Prize",        issuer: "Hyderabad" },
];

export const HOBBIES = ["AI Research", "Open Source", "Travel", "MUN"];

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
    description: "Python · GenAI · MLOps",
    position: [0.44, 1.48, 0.12],
    cameraTarget: [0.2, 1.45, 0],
    cameraPosition: [2.0, 1.55, 1.5],
    side: "right",
  },
  {
    id: "projects",
    label: "PROJECTS",
    description: "A2A · GenAI · NYC Cab",
    position: [-0.44, 1.48, 0.12],
    cameraTarget: [-0.2, 1.45, 0],
    cameraPosition: [-2.0, 1.55, 1.5],
    side: "left",
  },
  {
    id: "education",
    label: "EDUCATION",
    description: "Shoolini · Ankara · Asia Univ",
    position: [0.78, 0.92, 0.08],
    cameraTarget: [0.4, 0.95, 0],
    cameraPosition: [2.2, 1.0, 1.6],
    side: "right",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    description: "Z Sapiens · Sutradhar",
    position: [-0.78, 0.92, 0.08],
    cameraTarget: [-0.4, 0.95, 0],
    cameraPosition: [-2.2, 1.0, 1.6],
    side: "left",
  },
  {
    id: "talk",
    label: "TALK",
    description: "Send a message",
    position: [-0.45, 0.38, 0.12],
    cameraTarget: [0, 0.4, 0],
    cameraPosition: [-2.0, 0.6, 1.8],
    side: "left",
  },
];
