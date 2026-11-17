export const personalInfo = {
  name: "Murasoli Balaji",
  monogram: "MB",
  headline: "IT Undergrad · AI & Full-Stack Builder",
  subheadline: "Building intelligent systems and robust digital experiences.",
  location: "Tamil Nadu, India",
  educationInstitute: "Kongu Engineering College",
  educationDegree: "B.Tech in Information Technology",
  aboutHeading: "Curiosity Drives Innovation.",
  aboutDescription:
    "Information Technology undergraduate at Kongu Engineering College. I focus on the intersection of artificial intelligence and systems engineering — architecting full-stack applications, exploring autonomous agents, and building computational simulations.",
  philosophy:
    "Great software combines mathematical precision with intuitive design. Every system should be resilient, scalable, and built with purpose.",
  availability: "Available for innovative projects & collaborations",
  email: "balajimurasoli@gmail.com",
  github: "https://github.com/murasolib",
  linkedin: "https://linkedin.com/in/murasolibalaji",
};

export const skillsList = [
  { category: "Languages", items: ["Java", "Python", "JavaScript", "C / C++", "SQL"] },
  { category: "Web & Mobile", items: ["React", "Node.js", "Tailwind CSS", "Flutter", "REST APIs"] },
  { category: "Databases", items: ["MySQL", "MongoDB", "Java JDBC", "Schema Design"] },
  { category: "AI & Computing", items: ["Artificial Intelligence", "NLP & Voice", "GIS Modeling", "Data Structures"] },
  { category: "Tooling", items: ["Git", "GitHub", "Vite", "Linux", "VS Code"] },
];

export const featuredProjects = [
  {
    id: "ultron",
    number: "01",
    title: "ULTRON AI Assistant",
    tagline: "Voice-driven autonomous agent & workflow automation",
    description:
      "A personal AI assistant engineered for natural speech interaction, desktop automation, and multi-step task execution with conversational memory.",
    tags: ["Python", "Artificial Intelligence", "NLP", "Speech Recognition", "Automation"],
    image: "/assets/images/about-portrait.png",
    features: [
      "Real-time voice processing and speech feedback",
      "Automated system tasks and application controls",
      "Contextual dialogue memory for chained operations",
      "Modular skill architecture for custom capabilities"
    ],
    github: "https://github.com/murasolib",
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
    image: "/assets/images/hydrobreak-preview.png",
    flowchart: "/assets/images/flood-flowchart.png",
    features: [
      "2D hydrodynamic routing for dynamic inundation wavefronts",
      "Digital elevation model (DEM) terrain analysis",
      "Critical hazard zoning and evacuation route mapping",
      "Scenario analytics dashboard"
    ],
    github: "https://github.com/murasolib",
    badge: "GIS & Simulation"
  },
  {
    id: "academic-eval",
    number: "03",
    title: "Student Academic Evaluation",
    tagline: "Enterprise Java JDBC & relational evaluation system",
    description:
      "A performance tracking and continuous assessment engine built with Java JDBC and MySQL, ensuring ACID compliance and automated GPA computation.",
    tags: ["Java", "JDBC", "MySQL", "Database Architecture", "Enterprise"],
    image: "/assets/images/tree-portrait.png",
    features: [
      "Normalized 3NF relational schema with transactional integrity",
      "Automated continuous assessment calculation engine",
      "Role-based privilege segregation for faculty and students",
      "Exportable grade records and performance analytics"
    ],
    github: "https://github.com/murasolib",
    badge: "Database System"
  },
  {
    id: "clubhub",
    number: "04",
    title: "Centralised Clubs & Cells",
    tagline: "College student activity & workflow management platform",
    description:
      "A centralized platform streamlining campus club registrations, activity approvals, event scheduling, and administrative tracking.",
    tags: ["React", "Node.js", "MySQL / MongoDB", "REST APIs", "Full-Stack"],
    image: "/assets/images/clubhub-architecture.png",
    features: [
      "Multi-tier approval workflows from coordinators to faculty",
      "Event discovery, slot booking, and attendee logging",
      "Digital activity records replacing manual paperwork",
      "Engagement telemetry and participation tracking"
    ],
    github: "https://github.com/murasolib",
    badge: "Full-Stack"
  }
];

export const journeyTimeline = [
  {
    period: "Present",
    role: "B.Tech in Information Technology",
    organization: "Kongu Engineering College",
    detail: "Studying core computer science, advanced algorithms, database systems, and machine learning while engineering production-grade software."
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
