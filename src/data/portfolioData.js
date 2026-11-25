export const personalInfo = {
  name: "Murasoli Balaji",
  monogram: "MB",
  headline: "Full Stack Developer · AI Enthusiast · Software Developer",
  subheadline: "Building intelligent systems and robust digital experiences.",
  location: "Tamil Nadu, India",
  educationInstitute: "Kongu Engineering College",
  educationDegree: "B.Tech in Information Technology",
  diplomaInstitute: "CIT Sandwich Polytechnic College, Coimbatore",
  diplomaDegree: "Diploma in Computer Engineering",
  experience: "4+ Years of Tech Experience",
  aboutHeading: "Curiosity Drives Innovation.",
  aboutDescription:
    "Information Technology undergraduate at Kongu Engineering College. I focus on the intersection of artificial intelligence and systems engineering — architecting full-stack applications, exploring autonomous agents, and building computational simulations.",
  philosophy:
    "Great software combines mathematical precision with intuitive design. Every system should be resilient, scalable, and built with purpose.",
  availability: "Available for innovative projects & collaborations",
  email: "balajimurasoli@gmail.com",
  outlookEmail: "balajimurasoli@outlook.com",
  resumePdf: "/assets/Murasoli_Balaji_Resume.pdf",
  github: "https://github.com/murasolib",
  linkedin: "https://www.linkedin.com/in/murasolibalaji",
  instagram: "https://www.instagram.com/balajimurasoli/",
  youtube: "https://www.youtube.com/@MurasoliBalaji",
};

export const skillsList = [
  { category: "Languages", items: ["Java", "Python", "JavaScript", "C / C++", "SQL"] },
  { category: "Web & Mobile", items: ["React", "Node.js", "Tailwind CSS", "Flutter", "REST APIs"] },
  { category: "Databases", items: ["MySQL", "MongoDB", "Java JDBC", "Schema Design"] },
  { category: "AI & Computing", items: ["Artificial Intelligence", "NLP & Voice", "GIS Modeling", "Data Structures"] },
  { category: "Tooling", items: ["Git", "GitHub", "Docker", "Blender", "Postman", "Figma", "Vite", "VS Code"] },
];

// Main 4 Featured Projects in exact required order
export const featuredProjects = [
  {
    id: "ultron",
    number: "01",
    title: "ULTRON AI Assistant",
    tagline: "Voice-driven autonomous agent & workflow automation",
    description:
      "A personal AI assistant engineered for natural speech interaction, desktop automation, and multi-step task execution with conversational memory.",
    tags: ["Python", "Artificial Intelligence", "NLP", "Speech Recognition", "Automation"],
    image: "/assets/images/ultron-agent-preview.jpg",
    features: [
      "Real-time voice processing and speech feedback",
      "Automated system tasks and application controls",
      "Contextual dialogue memory for chained operations",
      "Modular skill architecture for custom capabilities"
    ],
    github: "https://github.com/MurasoliB/Ultron-The-AI-Assistant",
    badge: "AI & Automation"
  },
  {
    id: "flood-gis",
    number: "02",
    title: "Flood Simulation & GIS",
    tagline: "Hydrodynamic modeling & terrain inundation platform",
    description:
      "A geospatial simulation platform integrating digital elevation models (DEM) and hydrodynamic equations to predict wavefront propagation and evaluate flood hazards.",
    tags: ["Python", "GIS", "Hydrodynamics", "Simulation", "Data Visualization"],
    image: "/assets/images/flood-simulation-preview.jpg",
    flowchart: "/assets/images/flood-flowchart.png",
    features: [
      "2D hydrodynamic routing for dynamic inundation wavefronts",
      "Digital elevation model (DEM) terrain analysis",
      "Critical hazard zoning and evacuation route mapping",
      "Scenario analytics dashboard"
    ],
    github: "https://github.com/MurasoliB/Flood-Simulation-GIS",
    badge: "GIS & Simulation"
  },
  {
    id: "oral-cancer-ai",
    number: "03",
    title: "OralVision AI (Oral Cancer Prediction using AI)",
    tagline: "Deep learning computer vision for histopathological screening & diagnosis",
    description:
      "A clinical-grade diagnostic deep learning system trained on medical oral lesion imagery, utilizing convolutional neural networks for early-stage malignancy classification, lesion segmentation, and risk probability assessment.",
    tags: ["Python", "Deep Learning", "Computer Vision", "TensorFlow", "Medical AI", "CNN"],
    image: "/assets/images/oral-cancer-ai-preview.jpg",
    features: [
      "Convolutional neural network architecture for high-accuracy lesion classification",
      "Automated binary and multi-class histopathological malignancy screening",
      "Grad-CAM visual explainability heatmaps highlighting diagnostic cellular regions",
      "Probability confidence scoring for clinical decision support"
    ],
    github: "https://github.com/MurasoliB/Oral-Cancer-Prediction-Using-Artificial-Intelligence",
    badge: "Medical AI & Vision"
  },
  {
    id: "nl-student-search",
    number: "04",
    title: "Student Search via Natural Language",
    tagline: "Groq API powered NL-to-SQL & semantic student retrieval engine",
    description:
      "An intelligent academic query platform utilizing the Groq API for ultra-fast LPU inference, converting conversational natural language requests into structured database lookups and real-time student record filtering.",
    tags: ["Python", "Groq API", "NLP", "LLM", "SQL", "LPU Inference"],
    image: "/assets/images/nl-student-search-preview.jpg",
    features: [
      "Natural language conversational query translation into structured database lookups",
      "Sub-second LLM inference powered by Groq LPU processing architecture",
      "Semantic filtering across student grades, departments, and academic metrics",
      "Zero-syntax conversational interface eliminating manual SQL query writing"
    ],
    github: "https://github.com/MurasoliB/Student-Details-Search-Using-Natural-Language-Query",
    badge: "NLP & Groq API"
  }
];

// Remaining existing projects moved to separate More Projects section
export const moreProjects = [
  {
    id: "academic-eval",
    number: "05",
    title: "Student Academic Evaluation",
    tagline: "Enterprise Java JDBC & relational evaluation system",
    description:
      "A performance tracking and continuous assessment engine built with Java JDBC and MySQL, ensuring ACID compliance and automated GPA computation.",
    tags: ["Java", "JDBC", "MySQL", "Database Architecture", "Enterprise"],
    image: "/assets/images/academic-eval-preview.jpg",
    features: [
      "Normalized 3NF relational schema with transactional integrity",
      "Automated continuous assessment calculation engine",
      "Role-based privilege segregation for faculty and students",
      "Exportable grade records and performance analytics"
    ],
    github: "https://github.com/MurasoliB/Student_Evaluation_Using_Java_JDBC",
    badge: "Database System"
  },
  {
    id: "clubhub",
    number: "06",
    title: "Centralised Clubs & Cells",
    tagline: "College student activity & workflow management platform",
    description:
      "A centralized platform streamlining campus club registrations, activity approvals, event scheduling, and administrative tracking.",
    tags: ["React", "Node.js", "MySQL / MongoDB", "REST APIs", "Full-Stack"],
    image: "/assets/images/clubhub-preview.jpg",
    flowchart: "/assets/images/clubhub-architecture.png",
    features: [
      "Multi-tier approval workflows from coordinators to faculty",
      "Event discovery, slot booking, and attendee logging",
      "Digital activity records replacing manual paperwork",
      "Engagement telemetry and participation tracking"
    ],
    github: "https://github.com/MurasoliB/Centralised-Clubs-Cells",
    badge: "Full-Stack"
  },
  {
    id: "cold-chain-logistics",
    number: "07",
    title: "Global Cold Chain Vaccine Audit",
    tagline: "Enterprise Java 25 & MongoDB Atlas telemetry and GxP compliance engine",
    subtitle: "Enterprise Java 25 & MongoDB Atlas telemetry and GxP compliance engine",
    description:
      "A mission-critical enterprise audit platform engineered in Java 25 and MongoDB Atlas for pharmaceutical cold-chain verification. Features real-time IoT temperature telemetry stream ingestion, continuous excursion detection, Cold Chain Integrity Index (CCII) scoring, and multi-threaded batch compliance grading.",
    tags: ["Java 25", "MongoDB Atlas", "Concurrency", "Multithreading", "GxP Compliance", "Maven"],
    image: "/assets/images/cold-chain-audit-preview.jpg",
    features: [
      "Multi-threaded batch audit engine using Java Callable workers and ExecutorService",
      "Continuous IoT temperature telemetry ingestion with excursion and degree-hour interval analysis",
      "Mathematical Cold Chain Integrity Index (CCII) evaluation with automated GxP grading",
      "MongoDB Atlas cloud database integration with compound indexing and ACID transactional integrity"
    ],
    github: "https://github.com/MurasoliB/Global-Cold-Chain-Logistics-Vaccine-Temperature-Audit-System",
    badge: "Enterprise Java & Cloud"
  }
];

export const allProjects = [...featuredProjects, ...moreProjects];

export const journeyTimeline = [
  {
    period: "Present",
    role: "B.Tech in Information Technology",
    organization: "Kongu Engineering College",
    detail: "Studying core computer science, advanced algorithms, database systems, and machine learning while engineering production-grade software."
  },
  {
    period: "Past",
    role: "Diploma in Computer Engineering",
    organization: "CIT Sandwich Polytechnic College, Coimbatore",
    detail: "Established core engineering foundations across C/C++ programming, computer hardware, operating systems, networking, and applied software development."
  },
  {
    period: "Focus",
    role: "Intelligent Systems & AI",
    organization: "Independent Exploration",
    detail: "Designing autonomous assistants (Ultron AI), natural language understanding pipelines, and automated task execution scripts."
  },
  {
    period: "Research",
    role: "Hydrodynamic Modeling & GIS",
    organization: "Applied Computational Science",
    detail: "Building flood inundation simulations with digital elevation models and wave propagation equations."
  },
  {
    period: "Foundations",
    role: "Enterprise & Full-Stack Systems",
    organization: "Software Architecture",
    detail: "Developing robust Java JDBC database applications, RESTful APIs, and modern responsive web interfaces."
  }
];
