import { personalInfo, skillsList, featuredProjects, moreProjects, allProjects } from '../data/portfolioData';

// Candidate models in priority order
const MODEL_CANDIDATES = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash'
];

export function getApiKey() {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey !== 'your_gemini_api_key_here') {
    return envKey;
  }
  if (typeof window !== 'undefined') {
    return window.__PORTFOLIO_GEMINI_KEY__ || localStorage.getItem('portfolio_gemini_key') || '';
  }
  return '';
}

// Comprehensive Ground Truth System Prompt
const SYSTEM_INSTRUCTION = `
You are Portfolio AI, the intelligent, sleek, and friendly virtual assistant embedded in Murasoli Balaji's personal developer portfolio website (https://murasolib.github.io/).
Your role is to guide visitors, recruiters, hiring managers, and engineers who want to learn about Murasoli's identity, technical expertise, engineering projects, and contact channels.

### IDENTITY & BACKGROUND:
- Name: Murasoli Balaji
- Education: Undergraduate studying B.Tech in Information Technology at Kongu Engineering College (Perundurai, Tamil Nadu, India).
- Prior Education: Diploma in Computer Engineering (strong foundation in C/C++, hardware, networking, OS).
- Focus Areas: Full-stack development, artificial intelligence, agentic automation, systems engineering, computational simulations.
- Location: Tamil Nadu, India.
- Availability: Available for innovative development projects, engineering roles, and technical collaborations.

### 4 FEATURED PROJECTS (Main Showcase):
1. ULTRON AI Assistant
   - Tagline: Voice-driven autonomous agent & workflow automation
   - Stack: Python, Artificial Intelligence, NLP, Speech Recognition, Desktop Automation
   - Highlights: Real-time speech input/output, chained multi-step task execution, conversational memory, modular skill system.
   - GitHub: https://github.com/MurasoliB/Ultron-The-AI-Assistant

2. Flood Simulation & GIS
   - Tagline: Hydrodynamic modeling & terrain inundation platform
   - Stack: Python, GIS, Hydrodynamics, Simulation, Data Visualization
   - Highlights: 2D hydrodynamic routing for wave propagation, Digital Elevation Model (DEM) analysis, hazard zoning, evacuation mapping.
   - GitHub: https://github.com/MurasoliB/Flood-Simulation-GIS

3. OralVision AI (Oral Cancer Prediction using AI)
   - Tagline: Deep learning computer vision for histopathological screening & diagnosis
   - Stack: Python, Deep Learning, Computer Vision, TensorFlow, Medical AI, CNN
   - Highlights: Convolutional neural network classification for oral lesions, automated malignancy risk assessment, Grad-CAM visual heatmaps.
   - GitHub: https://github.com/MurasoliB/Oral-Cancer-Prediction-Using-Artificial-Intelligence

4. Student Search via Natural Language
   - Tagline: Groq API powered NL-to-SQL & semantic student retrieval engine
   - Stack: Python, Groq API, NLP, LLM, SQL, LPU Inference
   - Highlights: Natural language converted to structured SQL lookups, sub-second inference via Groq LPU processing, zero-syntax interface.
   - GitHub: https://github.com/MurasoliB/Student-Details-Search-Using-Natural-Language-Query

### MORE PROJECTS (System Archive & Extended Works):
5. Student Academic Evaluation (Java JDBC & MySQL Enterprise evaluation system with ACID integrity).
   - GitHub: https://github.com/MurasoliB/Student_Evaluation_Using_Java_JDBC
6. Centralised Clubs & Cells (College workflow & student activities management, React, Node.js, MySQL/MongoDB).
   - GitHub: https://github.com/MurasoliB/Centralised-Clubs-Cells
7. Global Cold Chain Vaccine Audit (Enterprise Java 25 & MongoDB Atlas GxP compliance telemetry engine).
   - GitHub: https://github.com/MurasoliB/Global-Cold-Chain-Logistics-Vaccine-Temperature-Audit-System

### TECHNICAL SKILLS:
- Programming Languages: Java, Python, JavaScript, C / C++, SQL
- Web & Mobile: React, Node.js, Tailwind CSS, Flutter, REST APIs
- Databases & Systems: MySQL, MongoDB, Java JDBC, Relational Schema Architecture
- AI & Computational Computing: Artificial Intelligence, NLP & Speech, Deep Learning / CNNs, GIS Modeling, Data Structures & Algorithms
- Tools & DevOps: Git, GitHub, Docker, Blender, Postman, Figma, Vite, VS Code

### VERIFIED CONTACT CHANNELS & PROFILES:
- Portfolio Website: https://murasolib.github.io/
- GitHub: https://github.com/murasolib
- LinkedIn: https://www.linkedin.com/in/murasolibalaji
- Direct Email: balajimurasoli@gmail.com
- Outlook: balajimurasoli@outlook.com
- Resume: Direct download button in the Hero section or link to /assets/Murasoli_Balaji_Resume.pdf

### GUIDELINES FOR RESPONSES:
- Tone: Cyberpunk yet warm, polite, professional, concise, and technically accurate.
- Formatting: Use markdown (bold, bullets, clickable markdown links). Keep answers readable and avoid overly verbose walls of text.
- Accuracy: Rely strictly on verified facts above. Never invent awards, companies, or contact information not listed here.
`;

/**
 * Deterministic offline fallback engine for instant replies or API failover
 */
function getSmartFallbackReply(userMessage) {
  const query = userMessage.toLowerCase().trim();

  // Explore Projects
  if (query.includes('explore project') || query.includes('featured project') || query.includes('tell me about his project')) {
    return `Murasoli has engineered several impactful software and AI systems. Here are his **4 Featured Projects**:

1. **ULTRON AI Assistant** — Voice-driven autonomous agent with natural speech feedback and desktop workflow automation. [GitHub Repo](https://github.com/MurasoliB/Ultron-The-AI-Assistant)
2. **Flood Simulation & GIS** — Geospatial hydrodynamic platform calculating dynamic 2D inundation wavefronts and flood hazard zones. [GitHub Repo](https://github.com/MurasoliB/Flood-Simulation-GIS)
3. **OralVision AI** — Deep learning CNN system for early histopathological oral cancer lesion classification and Grad-CAM explainability. [GitHub Repo](https://github.com/MurasoliB/Oral-Cancer-Prediction-Using-Artificial-Intelligence)
4. **Student Search via Natural Language** — Groq LPU powered NL-to-SQL engine for conversational, sub-second academic database lookups. [GitHub Repo](https://github.com/MurasoliB/Student-Details-Search-Using-Natural-Language-Query)

He also built enterprise systems like the **Global Cold Chain Vaccine Audit** (Java 25 + MongoDB Atlas) and **Centralised Clubs & Cells**!`;
  }

  // Technical Skills
  if (query.includes('skill') || query.includes('tech stack') || query.includes('language') || query.includes('technolog')) {
    return `Murasoli's core technical stack spans systems engineering, full-stack development, and artificial intelligence:

• **Languages:** Java, Python, JavaScript, C / C++, SQL
• **Web & Frontend:** React, Node.js, Tailwind CSS, Flutter, REST APIs
• **Databases:** MySQL, MongoDB, Java JDBC, Schema Design
• **AI & Computation:** Artificial Intelligence, Deep Learning (CNNs), NLP, GIS Modeling, Data Structures
• **DevOps & Tooling:** Git, GitHub, Docker, Postman, Vite, Blender, Figma`;
  }

  // About Murasoli
  if (query.includes('about') || query.includes('who is') || query.includes('background') || query.includes('education')) {
    return `**Murasoli Balaji** is an Information Technology undergraduate at **Kongu Engineering College** (Perundurai, Tamil Nadu).

He holds a Diploma in Computer Engineering and specializes in building high-performance full-stack applications, intelligent AI agents, and computational simulations. He is passionate about combining engineering rigor with intuitive user experiences.`;
  }

  // AI & ML Experience
  if (query.includes('ai') || query.includes('ml') || query.includes('machine learning') || query.includes('ultron') || query.includes('oralvision')) {
    return `Murasoli's AI and Machine Learning portfolio features hands-on, production-grade applications:

• **ULTRON AI Assistant**: Voice-activated desktop agent built with Python, speech synthesis, and contextual task chains.
• **OralVision AI**: Medical computer vision utilizing CNNs for oral cancer malignancy screening and Grad-CAM heatmap visualization.
• **Student Search via Natural Language**: Ultra-fast LLM inference using the Groq API and LPU architecture for zero-syntax conversational SQL queries.
• **Flood GIS Modeling**: Numerical hydrodynamic equations and digital elevation models for flood propagation.`;
  }

  // Contact Information
  if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('reach') || query.includes('linkedin') || query.includes('github') || query.includes('resume')) {
    return `You can connect directly with Murasoli through:

• **Email:** [balajimurasoli@gmail.com](mailto:balajimurasoli@gmail.com)
• **LinkedIn:** [linkedin.com/in/murasolibalaji](https://www.linkedin.com/in/murasolibalaji)
• **GitHub:** [github.com/murasolib](https://github.com/murasolib)
• **Resume:** You can download his official PDF resume from the button in the Hero section or view [Resume PDF](/assets/Murasoli_Balaji_Resume.pdf).

He is always open to discussing new opportunities, collaborations, and software engineering roles!`;
  }

  // Ultron specific
  if (query.includes('ultron')) {
    return `**ULTRON AI Assistant** is an autonomous desktop assistant engineered in Python. It features natural voice processing, task automation, and dialog memory to handle multi-step system workflows seamlessly. Check it out on [GitHub](https://github.com/MurasoliB/Ultron-The-AI-Assistant).`;
  }

  // Flood GIS specific
  if (query.includes('flood') || query.includes('gis')) {
    return `The **Flood Simulation & GIS Platform** models 2D hydrodynamic wave propagation over digital elevation terrain (DEM) to predict water levels, map hazard zones, and design rapid evacuation corridors. Source code is available on [GitHub](https://github.com/MurasoliB/Flood-Simulation-GIS).`;
  }

  // Default intelligent assistant reply
  return `I'm **Portfolio AI**, your dedicated guide to Murasoli's portfolio!

Feel free to ask me about:
• His **4 Featured Projects** (Ultron AI, Flood GIS, OralVision AI, NL Student Search)
• His **Technical Skills** (Java, Python, React, AI/ML, Databases)
• His **Academic Background** at Kongu Engineering College
• How to **Contact or Hire** Murasoli

What would you like to explore?`;
}

/**
 * Send chat query to Google Gemini API with automatic candidate model failover
 * and intelligent deterministic fallback.
 */
export async function sendChatMessage(messages) {
  const apiKey = getApiKey();
  const lastUserMsg = messages[messages.length - 1]?.text || '';

  // Format conversational contents for Gemini API (only user/model roles)
  const formattedContents = [];
  const recentMessages = messages.slice(-10);

  recentMessages.forEach((msg) => {
    // Only send non-empty user / model messages
    if (msg.text && msg.text.trim()) {
      formattedContents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    }
  });

  // Ensure there's at least one user content
  if (formattedContents.length === 0) {
    formattedContents.push({
      role: 'user',
      parts: [{ text: lastUserMsg || 'Hello' }]
    });
  }

  // Try candidate models
  for (const model of MODEL_CANDIDATES) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 600
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data?.candidates?.[0];
        const text = candidate?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 0) {
          return text.trim();
        }
      } else {
        console.warn(`Gemini model ${model} returned HTTP ${response.status}. Attempting fallback...`);
      }
    } catch (err) {
      console.warn(`Gemini API call failed on ${model}:`, err);
    }
  }

  // If all live API attempts fail (e.g. rate limit, offline, network block), return smart curated fallback
  return getSmartFallbackReply(lastUserMsg);
}
