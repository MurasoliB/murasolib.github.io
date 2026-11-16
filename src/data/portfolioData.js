export const personalInfo = {
  name: "Murasoli Balaji",
  monogram: "MB",
  headline: "IT Undergrad | AI and Full-Stack Builder | Problem Solver",
  tagline: "BUILDING BEYOND THE ORDINARY.",
  heroIntro: "Hello, I'm Murasoli Balaji.",
  location: "Tamil Nadu, India",
  educationInstitute: "Kongu Engineering College",
  educationDegree: "Information Technology Undergraduate",
  aboutHeading: "Curiosity Drives Innovation.",
  aboutDescription: "I'm an Information Technology undergraduate passionate about building intelligent systems, developing meaningful digital experiences, and exploring the intersection of AI and software engineering.",
  philosophy: "I believe great software is where rigorous engineering meets intuitive human experience. Whether architecting database pipelines or training neural workflows, my focus is always on creating solutions that are resilient, scalable, and genuinely impactful.",
  availability: "Open to High-Impact Opportunities & Technical Collaborations",
  email: "balajimurasoli@gmail.com",
  github: "https://github.com/murasolib",
  linkedin: "https://linkedin.com/in/murasolibalaji",
  heroPortrait: "/assets/images/hero-portrait.png",
  aboutPortrait: "/assets/images/about-portrait.png",
};

export const techStackCategories = [
  {
    title: "Programming Languages",
    description: "Core languages for systems, algorithms, and application logic",
    skills: [
      { name: "Java", level: "Core / Backend", icon: "Coffee" },
      { name: "Python", level: "AI / Data / Scripting", icon: "Code2" },
      { name: "JavaScript", level: "ES6+ / Modern Web", icon: "Terminal" },
      { name: "C / C++", level: "Systems & DSA", icon: "Cpu" },
      { name: "SQL", level: "Relational Queries", icon: "Database" },
    ],
  },
  {
    title: "Frontend Development",
    description: "Crafting fluid, accessible, high-performance user interfaces",
    skills: [
      { name: "React", level: "Component Architectures", icon: "Atom" },
      { name: "Tailwind CSS", level: "Modern Design Systems", icon: "Palette" },
      { name: "HTML5 / CSS3", level: "Semantic & Responsive", icon: "Layout" },
      { name: "Framer Motion", level: "Fluid Motion & Micro-interactions", icon: "Sparkles" },
      { name: "Flutter", level: "Cross-Platform Mobile UI", icon: "Smartphone" },
    ],
  },
  {
    title: "Backend & Systems",
    description: "Scalable server architectures and data processing pipelines",
    skills: [
      { name: "Node.js", level: "Event-driven Runtime", icon: "Server" },
      { name: "Express.js", level: "REST API Framework", icon: "Network" },
      { name: "Java JDBC", level: "Enterprise Data Access", icon: "Layers" },
      { name: "RESTful APIs", level: "Service Integration", icon: "Boxes" },
    ],
  },
  {
    title: "Databases & Storage",
    description: "Structured relational models and flexible document stores",
    skills: [
      { name: "MySQL", level: "ACID Relational Modeling", icon: "Database" },
      { name: "MongoDB", level: "Document Store / NoSQL", icon: "HardDrive" },
      { name: "Query Optimization", level: "Indexing & Performance", icon: "Workflow" },
    ],
  },
  {
    title: "AI & Intelligent Systems",
    description: "Harnessing machine intelligence to solve real-world complexities",
    skills: [
      { name: "Artificial Intelligence", level: "Intelligent Systems", icon: "BrainCircuit" },
      { name: "NLP & Voice", level: "Natural Language Interaction", icon: "Mic" },
      { name: "Computer Vision", level: "Image Analysis & Classification", icon: "Scan" },
      { name: "Prompt Engineering", level: "LLM Orchestration & Context", icon: "Cpu" },
    ],
  },
  {
    title: "Tools & Core Foundations",
    description: "Engineering methodologies and industry development workflows",
    skills: [
      { name: "Data Structures & Algo", level: "Problem Solving", icon: "Binary" },
      { name: "Full-Stack Architecture", level: "End-to-End Design", icon: "Layers" },
      { name: "Git & GitHub", level: "Version Control & Collaboration", icon: "GitBranch" },
      { name: "VS Code / Linux", level: "Dev Environment", icon: "TerminalSquare" },
      { name: "Vite / Modern Tooling", level: "Build Systems & Bundling", icon: "Zap" },
    ],
  },
];

export const featuredProjects = [
  {
    id: "ultron",
    number: "01",
    title: "ULTRON AI ASSISTANT",
    subtitle: "Context-Aware Voice & Intelligent Autonomous Assistant",
    description: "An intelligent personal AI assistant engineered for natural voice interaction, multimodal commands, automated workflow execution, and personalized assistance. Bridges human intent with desktop automation through voice synthesis and contextual reasoning.",
    tags: ["Python", "Artificial Intelligence", "Speech Recognition", "Automation", "NLP"],
    image: "/assets/images/about-portrait.png",
    fallbackColor: "from-blue-600/30 to-violet-600/20",
    features: [
      "Real-time voice processing and natural human-like speech feedback",
      "Automated desktop workflows, application controls, and routine tasks",
      "Contextual dialogue memory allowing natural continuous conversations",
      "Modular skill architecture for expanding AI integrations"
    ],
    github: "https://github.com/murasolib",
    demo: "#",
    badge: "AI & Automation"
  },
  {
    id: "flood-gis",
    number: "02",
    title: "FLOOD SIMULATION & GIS",
    subtitle: "Hydrodynamic Modeling & Terrain Inundation Visualizer",
    description: "A comprehensive flood simulation and geospatial visualization platform. Incorporates terrain digital elevation models (DEM), hydrodynamic flow equations, and inundation wave-front tracking to analyze flood risks and support disaster evacuation planning.",
    tags: ["GIS Analytics", "Hydrodynamic Modeling", "Python", "Data Visualization", "Simulation"],
    image: "/assets/images/hydrobreak-preview.png",
    flowchart: "/assets/images/flood-flowchart.png",
    fallbackColor: "from-cyan-600/30 to-blue-600/20",
    features: [
      "Avulsion routing and 2D hydrodynamics for dynamic water wavefront propagation",
      "High-precision digital elevation model (DEM) terrain processing and contour mapping",
      "Predictive inundation zones with evacuation timing and critical hazard levels",
      "Interactive data dashboard for scenario comparisons and dam break analysis"
    ],
    github: "https://github.com/murasolib",
    demo: "#",
    badge: "GIS & Scientific Computing"
  },
  {
    id: "academic-eval",
    number: "03",
    title: "STUDENT ACADEMIC & CONTINUOUS EVALUATION SYSTEM",
    subtitle: "Enterprise Java JDBC & Relational Database Architecture",
    description: "An academic management and continuous evaluation platform built with Java JDBC and MySQL. Automates continuous internal assessment (CIA) grading, student performance metrics tracking, attendance records, and faculty reporting with strict ACID transactional integrity.",
    tags: ["Java", "JDBC", "MySQL", "Enterprise Software", "Relational Architecture"],
    image: "/assets/images/tree-portrait.png",
    fallbackColor: "from-emerald-600/30 to-blue-600/20",
    features: [
      "Robust relational database schema normalized to 3NF for zero data redundancy",
      "Automated continuous evaluation algorithm calculating cumulative GPA & metrics",
      "Role-based privilege segregation for students, mentors, and administrators",
      "Clean desktop GUI with reliable JDBC connection pooling and report generation"
    ],
    github: "https://github.com/murasolib",
    demo: "#",
    badge: "Enterprise Database System"
  },
  {
    id: "clubhub",
    number: "04",
    title: "CENTRALISED CLUBS & CELL MANAGEMENT SYSTEM",
    subtitle: "Unified Campus Student Activity & Workflow Engine",
    description: "A centralized platform engineered to streamline college club operations, student activity registrations, venue requisitions, and administrative approvals. Eliminates fragmented spreadsheets and bureaucratic delays through a unified transparent portal.",
    tags: ["Full-Stack", "React", "Node.js", "MySQL / MongoDB", "Workflow Automation"],
    image: "/assets/images/clubhub-architecture.png",
    fallbackColor: "from-violet-600/30 to-pink-600/20",
    features: [
      "Multi-tier approval workflow connecting club coordinators with faculty heads",
      "Real-time event discovery, slot booking, and attendee registration system",
      "Automated certificate distribution and digital participation logs",
      "Interactive analytics dashboard detailing student engagement metrics"
    ],
    github: "https://github.com/murasolib",
    demo: "#",
    badge: "Full-Stack Web Platform"
  }
];

export const educationTimeline = [
  {
    year: "Current / Ongoing",
    title: "B.Tech in Information Technology",
    institution: "Kongu Engineering College",
    location: "Perundurai, Tamil Nadu, India",
    description: "Deepening knowledge in Data Structures, Advanced Algorithms, Database Management Systems, Computer Networks, and Artificial Intelligence. Actively building production-grade software and engaging in technical development initiatives.",
    highlight: "Core IT Engineering & AI Foundations"
  },
  {
    year: "Systems & AI Focus",
    title: "AI Systems & Autonomous Assistants",
    institution: "Independent Exploration & Research",
    location: "Tamil Nadu, India",
    description: "Architected ULTRON AI, researching voice recognition engines, natural language understanding pipelines, and desktop workflow automation scripts.",
    highlight: "Intelligent Agent Architectures"
  },
  {
    year: "Computational Modeling",
    title: "Hydrodynamics & Geospatial Analytics",
    institution: "Applied Scientific Computing",
    location: "Kongu Engineering College",
    description: "Engineered GIS flood inundation models, analyzing hydrodynamic equations and terrain elevation matrices to predict wave-front propagation.",
    highlight: "Environmental Simulation & GIS"
  },
  {
    year: "Full-Stack Foundations",
    title: "Enterprise Application Development",
    institution: "Software Development Journey",
    location: "Kongu Engineering College",
    description: "Implemented enterprise-grade Java JDBC applications and modern full-stack web platforms, mastering relational database normalization and responsive UI systems.",
    highlight: "Enterprise Architecture & Full-Stack"
  }
];
