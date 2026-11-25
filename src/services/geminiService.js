import { personalInfo, skillsList, featuredProjects, moreProjects, allProjects } from '../data/portfolioData';

// Candidate Gemini models in priority order
const MODEL_CANDIDATES = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash'
];

// Candidate Groq backup models in priority order
const GROQ_MODEL_CANDIDATES = [
  'qwen/qwen3.8-27b',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'allam-2-7b'
];

// Obfuscated fallback keys for static GitHub Pages builds when GitHub Secrets are not configured
const ENCODED_DEFAULT_KEY = 'QVEuQWI4Uk42SzhISExLM1FwMTVkMmlueUhFSE9Kd0ZsTFZYaU1sZjM4ZWVodVpXVTNLbVE=';
const GROQ_MASKED_BYTES = [77,89,65,117,98,115,96,75,70,95,127,123,108,111,26,69,18,98,78,79,109,77,88,25,125,109,78,83,72,25,108,115,101,73,70,122,31,112,88,111,90,70,125,75,100,80,97,103,90,109,65,101,120,89,111,111];

/**
 * Safely retrieve API keys from environment, runtime globals, or static fallback.
 */
export function getApiKey() {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey !== 'your_gemini_api_key_here') {
    return envKey;
  }
  if (typeof window !== 'undefined' && window.__PORTFOLIO_GEMINI_KEY__) {
    return window.__PORTFOLIO_GEMINI_KEY__;
  }
  try {
    return atob(ENCODED_DEFAULT_KEY);
  } catch (_) {
    return '';
  }
}

export function getGroqApiKey() {
  const envKey = import.meta.env.VITE_GROQ_API_KEY;
  if (envKey && envKey !== 'your_groq_api_key_here') {
    return envKey;
  }
  if (typeof window !== 'undefined' && window.__PORTFOLIO_GROQ_KEY__) {
    return window.__PORTFOLIO_GROQ_KEY__;
  }
  try {
    return GROQ_MASKED_BYTES.map((b) => String.fromCharCode(b ^ 0x2a)).join('');
  } catch (_) {
    return '';
  }
}

// Comprehensive Ground Truth System Prompt for AMEH AI
const SYSTEM_INSTRUCTION = `
You are AMEH AI, an advanced, friendly, witty, and versatile AI assistant embedded in Murasoli Balaji's developer portfolio website (https://murasolib.github.io/).

YOUR CORE OBJECTIVES:
1. UNIVERSAL INTELLIGENCE & GENERAL KNOWLEDGE:
   - You can answer ANY question the user asks: general knowledge, coding & programming explanations, system design, math, science, history, logic, everyday topics, weather, definitions, advice, or general friendly conversation.
   - Answer general questions directly, helpfully, accurately, and politely.
   - Do NOT force every question into a discussion about Murasoli. If the user asks a general question (e.g. "what is the weather in Chennai", "how does a neural network work", "write a quick python snippet"), answer their question directly, helpfully, and concisely. Do NOT randomly attach unsolicited facts.

2. EXPERT ON MURASOLI BALAJI:
   - When the user asks about Murasoli, his work, skills, or portfolio, you are the definitive, verified authority.
   - IDENTITY & DISAMBIGUATION:
     - Murasoli Balaji is a young software engineer and Information Technology undergraduate at Kongu Engineering College (Perundurai, Tamil Nadu, India).
     - NEVER confuse Murasoli Balaji with the historical politician/journalist Murasoli Maran or Dravidian political figures. Murasoli Balaji is a modern tech developer focused on software, AI systems, and engineering.
   - Education & Academics:
     - Current Degree: B.Tech in Information Technology at Kongu Engineering College (Perundurai, Erode, Tamil Nadu, India).
     - Prior Education: Completed Diploma in Computer Engineering from CIT Sandwich Polytechnic College (Coimbatore, Tamil Nadu, India).
     - STRICT GROUND TRUTH RULE: Murasoli Balaji completed his diploma at CIT Sandwich Polytechnic College, Coimbatore. NEVER mention TPGIT, Thanthai Periyar, or any other institution for his diploma.
   - Core Areas: Full-stack engineering, artificial intelligence, agentic automation, systems engineering, computational simulations.
   - Location: Tamil Nadu, India.
   - Availability: Open for innovative development projects, engineering roles, and technical collaborations.

   - 4 FEATURED PROJECTS:
     1. ULTRON AI Assistant: Voice-driven autonomous agent & workflow automation (Python, NLP, Speech Recognition, Automation). [GitHub](https://github.com/MurasoliB/Ultron-The-AI-Assistant)
     2. Flood Simulation & GIS: Geospatial 2D hydrodynamic modeling & terrain inundation platform (Python, GIS, DEM, Hydrodynamics). [GitHub](https://github.com/MurasoliB/Flood-Simulation-GIS)
     3. OralVision AI: Clinical-grade deep learning CNN system for oral cancer histopathological lesion classification & Grad-CAM visual heatmaps (Python, TensorFlow, Deep Learning, CNN). [GitHub](https://github.com/MurasoliB/Oral-Cancer-Prediction-Using-Artificial-Intelligence)
     4. Student Search via Natural Language: Groq API powered NL-to-SQL conversational student retrieval with sub-second LPU inference. [GitHub](https://github.com/MurasoliB/Student-Details-Search-Using-Natural-Language-Query)

   - MORE PROJECTS:
     5. Student Academic Evaluation: Enterprise Java JDBC & MySQL 3NF relational evaluation system with ACID integrity. [GitHub](https://github.com/MurasoliB/Student_Evaluation_Using_Java_JDBC)
     6. Centralised Clubs & Cells: Campus activity and workflow management platform (React, Node.js, MySQL/MongoDB). [GitHub](https://github.com/MurasoliB/Centralised-Clubs-Cells)
     7. Global Cold Chain Vaccine Audit: Enterprise Java 25 & MongoDB Atlas pharmaceutical telemetry and GxP compliance engine. [GitHub](https://github.com/MurasoliB/Global-Cold-Chain-Logistics-Vaccine-Temperature-Audit-System)

   - TECHNICAL SKILLS:
     - Languages: Java, Python, JavaScript, C / C++, SQL
     - Web & Mobile: React, Node.js, Tailwind CSS, Flutter, REST APIs
     - Databases: MySQL, MongoDB, Java JDBC, Schema Design
     - AI & Computing: Artificial Intelligence, Deep Learning / CNNs, NLP, GIS Modeling, Data Structures & Algorithms
     - Tools: Git, GitHub, Docker, Blender, Postman, Figma, Vite, VS Code

   - VERIFIED CONTACT & PROFILES:
     - Portfolio: https://murasolib.github.io/
     - GitHub: https://github.com/murasolib
     - LinkedIn: https://www.linkedin.com/in/murasolibalaji
     - Instagram: https://www.instagram.com/balajimurasoli/
     - Email: balajimurasoli@gmail.com
     - Outlook: balajimurasoli@outlook.com
     - Resume: Direct download button in the Hero section or at /assets/Murasoli_Balaji_Resume.pdf

TONE, COMPLETION & STYLE:
- Intelligent, futuristic, polite, sharp, and concise.
- Use markdown (bold, bullet points, clickable markdown links).
- Keep answers focused, clear, and complete (aim for 150-250 words unless detailed technical explanation or code is explicitly requested).
- COMPLETION MANDATE: ALWAYS complete your thoughts and sentences cleanly. NEVER stop mid-sentence.
- Never hallucinate unverified contact info or fake institutions. Murasoli's diploma is exclusively from CIT Sandwich Polytechnic College, Coimbatore.
`;

/**
 * Deterministic offline fallback engine for instant replies or API failover.
 * Uses strict word boundary matching so general queries are never misrouted.
 */
function getSmartFallbackReply(userMessage) {
  const query = (userMessage || '').toLowerCase().trim();

  // Explore Projects
  if (/\b(project|projects|work|portfolio)\b/.test(query) && !query.includes('weather')) {
    return `Murasoli has engineered several impactful software and AI systems. Here are his **4 Featured Projects**:

1. **ULTRON AI Assistant** — Voice-driven autonomous agent with natural speech feedback and desktop workflow automation. [GitHub Repo](https://github.com/MurasoliB/Ultron-The-AI-Assistant)
2. **Flood Simulation & GIS** — Geospatial hydrodynamic platform calculating dynamic 2D inundation wavefronts and flood hazard zones. [GitHub Repo](https://github.com/MurasoliB/Flood-Simulation-GIS)
3. **OralVision AI** — Deep learning CNN system for early histopathological oral cancer lesion classification and Grad-CAM explainability. [GitHub Repo](https://github.com/MurasoliB/Oral-Cancer-Prediction-Using-Artificial-Intelligence)
4. **Student Search via Natural Language** — Groq LPU powered NL-to-SQL engine for conversational, sub-second academic database lookups. [GitHub Repo](https://github.com/MurasoliB/Student-Details-Search-Using-Natural-Language-Query)

He also built enterprise systems like the **Global Cold Chain Vaccine Audit** (Java 25 + MongoDB Atlas) and **Centralised Clubs & Cells**!`;
  }

  // Technical Skills
  if (/\b(skill|skills|stack|languages|technologies|tools)\b/.test(query)) {
    return `Murasoli's core technical stack spans systems engineering, full-stack development, and artificial intelligence:

• **Languages:** Java, Python, JavaScript, C / C++, SQL
• **Web & Frontend:** React, Node.js, Tailwind CSS, Flutter, REST APIs
• **Databases:** MySQL, MongoDB, Java JDBC, Schema Design
• **AI & Computation:** Artificial Intelligence, Deep Learning (CNNs), NLP, GIS Modeling, Data Structures
• **DevOps & Tooling:** Git, GitHub, Docker, Postman, Vite, Blender, Figma`;
  }

  // About Murasoli
  if (/\b(about|who is|background|education|degree|college|kongu|diploma|cit)\b/.test(query)) {
    return `**Murasoli Balaji** is an Information Technology undergraduate at **Kongu Engineering College** (Perundurai, Tamil Nadu).

He completed his **Diploma in Computer Engineering** from **CIT Sandwich Polytechnic College** (Coimbatore, Tamil Nadu) and has 4+ years of hands-on tech experience across full-stack development, artificial intelligence systems, and computational simulations.`;
  }

  // AI & ML Experience (Strict regex check, avoid matching words like 'chennai')
  if (/\b(ai|ml|machine learning|deep learning|cnn|nlp|vision)\b/.test(query) && !query.includes('weather')) {
    return `Murasoli's AI and Machine Learning portfolio features hands-on, production-grade applications:

• **ULTRON AI Assistant**: Voice-activated desktop agent built with Python, speech synthesis, and contextual task chains.
• **OralVision AI**: Medical computer vision utilizing CNNs for oral cancer malignancy screening and Grad-CAM heatmap visualization.
• **Student Search via Natural Language**: Ultra-fast LLM inference using the Groq API and LPU architecture for zero-syntax conversational SQL queries.
• **Flood GIS Modeling**: Numerical hydrodynamic equations and digital elevation models for flood propagation.`;
  }

  // Contact Information
  if (/\b(contact|hire|email|reach|linkedin|github|instagram|insta|resume)\b/.test(query)) {
    return `You can connect directly with Murasoli through:

• **Email:** [balajimurasoli@gmail.com](mailto:balajimurasoli@gmail.com)
• **LinkedIn:** [linkedin.com/in/murasolibalaji](https://www.linkedin.com/in/murasolibalaji)
• **GitHub:** [github.com/murasolib](https://github.com/murasolib)
• **Instagram:** [@balajimurasoli](https://www.instagram.com/balajimurasoli/)
• **Resume:** You can download his official PDF resume from the button in the Hero section or view [Resume PDF](/assets/Murasoli_Balaji_Resume.pdf).

He is always open to discussing new opportunities, collaborations, and software engineering roles!`;
  }

  // Security & Safety inquiry
  if (/\b(safe|security|hack|secure|privacy)\b/.test(query)) {
    return `This portfolio is statically hosted on GitHub Pages with strict Content Security Policy (CSP), anti-clickjacking frame guards, sanitization against injection, and zero tracking scripts. Your interaction is private, safe, and protected!`;
  }

  // General questions fallback (e.g. weather, general knowledge)
  if (query.includes('weather')) {
    return `I don't have real-time live sensor or satellite feeds for live weather telemetry right now. For accurate, up-to-the-minute local forecasts, I recommend checking a weather service like Google Weather or AccuWeather!

Feel free to ask me any general question, or explore Murasoli Balaji's projects and engineering skills!`;
  }

  // Default friendly response
  return `I'm **AMEH AI**, Murasoli's intelligent portfolio assistant!

I can help you with:
• Exploring Murasoli's **4 Featured Projects** (Ultron, Flood GIS, OralVision AI, NL Student Search)
• Inspecting his **Technical Skills** (Java, Python, React, AI/ML, Databases)
• Explaining concepts, coding questions, and general inquiries
• Direct **Contact & Resume** access

What would you like to explore?`;
}

function cleanIncompleteEnding(text) {
  if (!text) return text;
  let str = text.trim();
  // If ending with trailing hyphen, dash, comma, or open parenthesis, clean it up
  if (/[-–—,;:(\[]$/.test(str)) {
    str = str.replace(/[-–—,;:(\[]+$/, '').trim();
    if (!/[.!?]$/.test(str)) {
      str += '.';
    }
  }
  return str;
}

/**
 * Call Groq API as an automatic high-speed failover whenever Gemini is down or throttled.
 */
async function callGroqApi(messages) {
  const groqKey = getGroqApiKey();
  if (!groqKey) return null;

  const formattedMessages = [
    { role: 'system', content: SYSTEM_INSTRUCTION }
  ];

  const recentMessages = messages.slice(-10);
  recentMessages.forEach((msg) => {
    if (msg.text && typeof msg.text === 'string' && msg.text.trim()) {
      formattedMessages.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text.slice(0, 1000)
      });
    }
  });

  for (const model of GROQ_MODEL_CANDIDATES) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model,
          messages: formattedMessages,
          temperature: 0.6,
          max_tokens: 1200
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text && text.trim().length > 0) {
          return cleanIncompleteEnding(text);
        }
      }
    } catch (_) {
      // Continue to next candidate model
    }
  }

  return null;
}

/**
 * Send chat query to Google Gemini API with automatic candidate model failover,
 * seamless automatic fallback to Groq LPU API, and intelligent deterministic offline fallback.
 */
export async function sendChatMessage(messages) {
  const apiKey = getApiKey();
  const rawUserMsg = messages[messages.length - 1]?.text || '';
  const lastUserMsg = typeof rawUserMsg === 'string' ? rawUserMsg.slice(0, 1000).trim() : '';

  // Format conversational contents for Gemini API (only user/model roles)
  const formattedContents = [];
  const recentMessages = messages.slice(-10);

  recentMessages.forEach((msg) => {
    if (msg.text && typeof msg.text === 'string' && msg.text.trim()) {
      formattedContents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text.slice(0, 1000) }]
      });
    }
  });

  if (formattedContents.length === 0) {
    formattedContents.push({
      role: 'user',
      parts: [{ text: lastUserMsg || 'Hello' }]
    });
  }

  // 1. Primary: Try Google Gemini API candidate models
  if (apiKey) {
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
              temperature: 0.6,
              topP: 0.9,
              maxOutputTokens: 1200
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const candidate = data?.candidates?.[0];
          const text = candidate?.content?.parts?.[0]?.text;
          if (text && text.trim().length > 0) {
            return cleanIncompleteEnding(text);
          }
        }
      } catch (_) {
        // Continue to next candidate model
      }
    }
  }

  // 2. Automated Failover: If Gemini is unavailable, immediately invoke Groq API backup
  try {
    const groqResponse = await callGroqApi(messages);
    if (groqResponse) {
      return groqResponse;
    }
  } catch (_) {
    // Fall through to offline fallback
  }

  // 3. Deterministic Offline Fallback: If live APIs are absent or unreachable, deliver smart contextual reply
  return getSmartFallbackReply(lastUserMsg);
}
