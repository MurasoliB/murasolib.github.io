import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';

const faqItems = [
  {
    number: "01",
    question: "Who is Murasoli Balaji?",
    renderAnswer: () => (
      <div className="space-y-3">
        <p>
          Murasoli Balaji is an Information Technology undergraduate at <strong className="text-white font-medium">Kongu Engineering College</strong> (Perundurai, Erode, Tamil Nadu, India).
        </p>
        <p>
          He is an aspiring full-stack developer, software engineer, and AI enthusiast dedicated to building resilient web platforms, autonomous voice assistants, and applied computational simulations. His development philosophy centers on marrying mathematical precision with clean, user-centric software architecture.
        </p>
      </div>
    ),
  },
  {
    number: "02",
    question: "What is his academic background at Kongu Engineering College?",
    renderAnswer: () => (
      <div className="space-y-3">
        <p>
          Murasoli is currently pursuing his <strong className="text-white font-medium">Bachelor of Technology (B.Tech) in Information Technology</strong> at <span className="text-[#FF69B4]">Kongu Engineering College</span>, an autonomous engineering institution in Tamil Nadu, India.
        </p>
        <p>
          Prior to his undergraduate degree, he completed a <strong className="text-white font-medium">Diploma in Computer Engineering</strong>, which established rigorous technical foundations across low-level programming (C/C++), computer architecture, hardware diagnostics, networking protocols, and systems engineering.
        </p>
      </div>
    ),
  },
  {
    number: "03",
    question: "What programming languages and technologies does Murasoli Balaji use?",
    renderAnswer: () => (
      <div className="space-y-4">
        <p>
          His technical toolkit spans full-stack engineering, databases, and applied intelligent systems:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FF69B4] block mb-1.5 font-semibold">// Languages</span>
            <span className="text-sm text-white/90">Java, Python, JavaScript, C / C++, SQL</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FF69B4] block mb-1.5 font-semibold">// Web &amp; Frameworks</span>
            <span className="text-sm text-white/90">React, Node.js, Tailwind CSS, REST APIs</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FF69B4] block mb-1.5 font-semibold">// Data &amp; Cloud</span>
            <span className="text-sm text-white/90">MySQL, MongoDB Atlas, Java JDBC</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FF69B4] block mb-1.5 font-semibold">// AI &amp; Computing</span>
            <span className="text-sm text-white/90">NLP, Computer Vision, CNNs, GIS Spatial Modeling</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FF69B4] block mb-1.5 font-semibold">// Tooling &amp; Workflow</span>
            <span className="text-sm text-white/90">Git, GitHub, Vite, Postman, Linux</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FF69B4] block mb-1.5 font-semibold">// Core Strengths</span>
            <span className="text-sm text-white/90">DSA, System Architecture, Problem Solving</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "04",
    question: "What notable projects has Murasoli Balaji built?",
    renderAnswer: () => (
      <div className="space-y-4">
        <p>
          Murasoli has architected and deployed several practical software and AI systems:
        </p>
        <ul className="space-y-3 pt-1">
          <li className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF1493]/40 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <strong className="text-white font-medium text-base">ULTRON AI Assistant</strong>
              <a
                href="https://github.com/MurasoliB/Ultron-The-AI-Assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF69B4] hover:text-white"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-sm text-[#B3B3B3]">
              A voice-driven desktop automation agent developed in Python featuring speech recognition, real-time audio synthesis, system command triggers, and conversational context memory.
            </p>
          </li>

          <li className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF1493]/40 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <strong className="text-white font-medium text-base">Flood Simulation &amp; GIS Platform</strong>
              <a
                href="https://github.com/MurasoliB/Flood-Simulation-GIS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF69B4] hover:text-white"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-sm text-[#B3B3B3]">
              Geospatial 2D hydrodynamic wave propagation engine integrating Digital Elevation Models (DEM) to predict water inundation zones and hazard evacuation routes.
            </p>
          </li>

          <li className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF1493]/40 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <strong className="text-white font-medium text-base">Student Academic Evaluation Engine</strong>
              <a
                href="https://github.com/MurasoliB/Student_Evaluation_Using_Java_JDBC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF69B4] hover:text-white"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-sm text-[#B3B3B3]">
              An enterprise evaluation engine written in Java JDBC with a normalized 3NF MySQL relational database, automated GPA computation, and ACID transactional integrity.
            </p>
          </li>

          <li className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF1493]/40 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <strong className="text-white font-medium text-base">Centralised Clubs &amp; Cells</strong>
              <a
                href="https://github.com/MurasoliB/Centralised-Clubs-Cells"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF69B4] hover:text-white"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-sm text-[#B3B3B3]">
              Full-stack campus management portal engineered with React, Node.js, and relational database workflows for club activities, multi-tier approvals, and slot scheduling.
            </p>
          </li>
        </ul>

        <div className="pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#FF1493] hover:text-white transition-colors"
          >
            <span>Explore All Projects in Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    ),
  },
  {
    number: "05",
    question: "Where can I find his source code and professional profiles?",
    renderAnswer: () => (
      <div className="space-y-4">
        <p>
          All genuine source code, ongoing experiments, and professional links are publicly accessible at the following verified destinations:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <a
            href="https://murasolib.github.io/"
            className="group flex flex-col justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF1493] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF69B4] font-semibold">// Official Site</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF1493] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="text-sm font-display font-medium text-white">murasolib.github.io</span>
            <span className="text-[11px] font-mono text-[#B3B3B3] mt-1">Official Portfolio</span>
          </a>

          <a
            href="https://github.com/murasolib"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF1493] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF69B4] font-semibold">// GitHub</span>
              <Github className="w-4 h-4 text-[#FF1493] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-sm font-display font-medium text-white">github.com/murasolib</span>
            <span className="text-[11px] font-mono text-[#B3B3B3] mt-1">Public Code Repositories</span>
          </a>

          <a
            href="https://www.linkedin.com/in/murasolibalaji"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF1493] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF69B4] font-semibold">// LinkedIn</span>
              <Linkedin className="w-4 h-4 text-[#FF1493] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-sm font-display font-medium text-white">linkedin.com/in/murasolibalaji</span>
            <span className="text-[11px] font-mono text-[#B3B3B3] mt-1">Professional Network</span>
          </a>
        </div>
      </div>
    ),
  },
  {
    number: "06",
    question: "Is Murasoli Balaji available for projects and collaborations?",
    renderAnswer: () => (
      <div className="space-y-4">
        <p>
          Yes. Murasoli is open to innovative full-stack development, applied AI engineering projects, technical collaborations, and student developer opportunities.
        </p>
        <p>
          If you have a project idea, technical problem, or engineering opportunity, feel free to reach out directly via the in-browser contact form or send an email:
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF1493] text-white font-semibold hover:bg-[#FF4FBF] shadow-[0_0_20px_rgba(255,20,147,0.4)] transition-all cursor-pointer"
          >
            <span>Open Contact Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/15 text-white hover:border-[#FF1493] hover:text-[#FF69B4] transition-all"
          >
            <span>{personalInfo.email}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    ),
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // Item 0 open by default for immediate preview & crawlers

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-28 md:py-36 border-t border-[rgba(255,20,147,0.20)] overflow-hidden w-full"
      aria-label="Frequently Asked Questions & Personal Brand Knowledge"
    >
      {/* Subtle Ambient Pink Glow (Transparent so BackgroundMesh canvas shines through) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-[#FF1493]/10 via-[#FF69B4]/5 to-transparent rounded-full blur-[160px]" />
        <div className="absolute -bottom-24 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-[#FF4FBF]/8 to-transparent rounded-full blur-[180px]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF1493] shadow-[0_0_8px_#FF1493]" />
              <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase font-semibold">
                // Identity &amp; Knowledge Base
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
              FREQUENT QUESTIONS<span className="text-[#FF1493]">.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#B3B3B3] max-w-md">
            Direct, verified answers regarding engineering background, technical stack, projects, and collaboration opportunities.
          </p>
        </div>

        {/* Cinematic Accordion List with Thin Separators */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const headingId = `faq-heading-${item.number}`;
            const panelId = `faq-panel-${item.number}`;

            return (
              <div key={item.number} className="group transition-colors">
                <h3>
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-7 md:py-8 flex items-center justify-between gap-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1493] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505] rounded-lg transition-all"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-8 min-w-0 pr-4">
                      {/* Monospace Pink Number */}
                      <span className="font-mono text-xs sm:text-sm text-[#FF1493] font-bold shrink-0 tracking-wider">
                        {item.number}
                      </span>
                      {/* Question Heading */}
                      <span className="text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] font-display font-semibold text-white group-hover:text-[#FF69B4] transition-colors leading-snug">
                        {item.question}
                      </span>
                    </div>

                    {/* Circular Expand/Collapse Button Aligned Right */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'rotate-180 border-[#FF1493] bg-[#FF1493]/15 text-[#FF1493] shadow-[0_0_15px_rgba(255,20,147,0.4)]'
                          : 'border-white/15 bg-white/[0.02] text-white/60 group-hover:border-white/30 group-hover:text-white'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4 transition-colors" />
                    </div>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-1 pl-8 sm:pl-16 max-w-4xl text-base sm:text-lg text-[#B3B3B3] leading-relaxed font-light">
                        {item.renderAnswer()}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
