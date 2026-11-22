import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowDown, Download, Mail } from 'lucide-react';
import About from '../components/About';
import TechStack from '../components/TechStack';
import ExperienceEducation from '../components/ExperienceEducation';
import FaqSection from '../components/FaqSection';
import Contact from '../components/Contact';
import { featuredProjects, personalInfo } from '../data/portfolioData';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.state?.scrollTo || (location.hash ? location.hash.substring(1) : null);
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    // Remove any # symbol from the URL bar immediately
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [location]);

  return (
    <div className="relative z-10 flex flex-col w-full">
      
      {/* Full-Screen Hero Fold with Hot Pink Glow & Typography */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-between pt-32 pb-20 sm:pb-16 max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full overflow-hidden"
      >
        {/* Subtle Animated Pink Radial Glow */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#FF1493]/15 via-[#FF4FBF]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-[#FF4FBF]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

        {/* Top Tag & Availability */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 relative z-10"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF1493] shadow-[0_0_10px_#FF1493]" />
            <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
              // Software & AI Architecture
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#B3B3B3] px-3.5 py-1.5 rounded-full bg-[#111111] border border-[rgba(255,20,147,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#FF1493] animate-pulse shadow-[0_0_8px_#FF1493]" />
            <span>{personalInfo.availability}</span>
          </div>
        </motion.div>

        {/* Massive Screen-Filling Headline with Hot Pink Accent */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto py-10 relative z-10"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] font-display font-black text-white tracking-tighter leading-[0.88] select-none">
            MURASOLI<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF69B4] to-[#FF1493]">
              BALAJI
            </span>
            <span className="text-[#FF1493] drop-shadow-[0_0_20px_#FF1493]">.</span>
          </h1>
        </motion.div>

        {/* Bottom Wide Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="pt-8 border-t border-[rgba(255,20,147,0.20)] flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10"
        >
          <div className="max-w-xl">
            <p className="text-base sm:text-xl text-white font-light leading-relaxed">
              Full Stack Developer <span className="text-[#FF69B4]">·</span> AI &amp; Software Development
            </p>
            <p className="text-xs sm:text-sm font-mono text-[#B3B3B3] mt-1">
              IT Undergraduate at <span className="text-[#FF69B4]">{personalInfo.educationInstitute}</span> · {personalInfo.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5 font-mono text-xs md:pr-10 lg:pr-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF1493] text-white font-semibold hover:bg-[#FF4FBF] shadow-[0_0_25px_rgba(255,20,147,0.45)] hover:shadow-[0_0_35px_rgba(255,20,147,0.7)] transition-all duration-300 group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={personalInfo.resumePdf}
              download="Murasoli_Balaji_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] border border-[rgba(255,20,147,0.3)] text-white hover:border-[#FF1493] hover:text-[#FF69B4] hover:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all duration-300 group"
              aria-label="Download Resume"
            >
              <Download className="w-4 h-4 text-[#FF1493] group-hover:scale-110 transition-transform" />
              <span>Download Resume</span>
            </a>

            <button
              type="button"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
              }}
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 rounded-full bg-[#111111] border border-[rgba(255,20,147,0.3)] text-white hover:border-[#FF1493] hover:text-[#FF69B4] hover:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all duration-300 group cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#FF1493] group-hover:scale-110 transition-transform" />
              <span>Get in Touch</span>
            </button>
          </div>
        </motion.div>

        {/* Minimal Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 font-mono text-[10px] text-[#B3B3B3] tracking-widest uppercase pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493] animate-ping" />
          <span>Scroll to Discover</span>
        </motion.div>
      </section>

      {/* 1. Profile & Philosophy */}
      <About />

      {/* 2. Technical Stack */}
      <TechStack />

      {/* 3. Wide Selected Works Showcase */}
      <section id="projects-preview" className="relative py-32 border-t border-[rgba(255,20,147,0.20)] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div>
              <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase block mb-3">
                // Selected Works
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                Featured Projects<span className="text-[#FF1493]">.</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#B3B3B3] hover:text-[#FF1493] transition-colors group"
            >
              <span>View All Projects Archive</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Wide Project Rows with Pink Hover Illumination */}
          <div className="divide-y divide-[rgba(255,20,147,0.15)]">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to="/projects"
                className="group py-10 first:pt-0 flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 transition-all hover:bg-[#111111]/40 px-4 -mx-4 rounded-2xl"
              >
                <div className="lg:w-4/12 flex items-baseline gap-6">
                  <span className="font-mono text-xs text-[#FF1493] font-bold">
                    {project.number}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white group-hover:text-[#FF69B4] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-[#B3B3B3] block mt-1">
                      {project.badge}
                    </span>
                  </div>
                </div>

                <div className="lg:w-6/12">
                  <p className="text-sm sm:text-base text-[#B3B3B3] leading-relaxed group-hover:text-white transition-colors">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((t) => (
                      <span key={t} className="text-xs font-mono text-[#737373] group-hover:text-[#B3B3B3] transition-colors">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:w-2/12 flex lg:justify-end items-center">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-[#B3B3B3] group-hover:text-[#FF1493] transition-colors">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Milestones */}
      <ExperienceEducation />

      {/* 5. Frequently Asked Questions & AI Knowledge Graph */}
      <FaqSection />

      {/* 6. Contact */}
      <Contact />
    </div>
  );
}
