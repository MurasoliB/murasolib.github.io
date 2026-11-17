import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import About from '../components/About';
import TechStack from '../components/TechStack';
import EditorialProjects from '../components/EditorialProjects';
import ExperienceEducation from '../components/ExperienceEducation';
import Contact from '../components/Contact';
import ProjectModal from '../components/ProjectModal';
import { personalInfo } from '../data/portfolioData';

export default function HomePage() {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="relative z-10 flex flex-col w-full">
      
      {/* ===================================================================
          05. HERO — ASYMMETRICAL FULL-SCREEN EDITORIAL COMPOSITION
         =================================================================== */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full"
      >
        {/* Main Asymmetrical Split: Left Typography / Right Editorial Portrait */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-6">
          
          {/* Left Column (7 cols): Massive Name & Statement */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#999999]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
              <span>// Software & AI Architecture</span>
            </motion.div>

            {/* Huge Two-Line Name Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[8rem] font-display font-black tracking-tighter leading-[0.88] select-none text-[#F5F5F5]"
            >
              MURASOLI<br />
              <span>BALA</span><span className="text-[#FF1493]">JI.</span>
            </motion.h1>

            {/* Introduction & Philosophy Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 max-w-xl"
            >
              <p className="font-mono text-sm sm:text-base text-[#F5F5F5] font-medium tracking-tight">
                IT Undergrad <span className="text-[#FF1493]">·</span> AI & Full-Stack Builder
              </p>
              <p className="text-sm sm:text-base text-[#999999] leading-relaxed">
                Information Technology undergraduate at {personalInfo.educationInstitute}. Architecting autonomous voice assistants, hydrodynamic geospatial simulations, and resilient enterprise data systems.
              </p>
            </motion.div>

            {/* Action Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-8 pt-2 font-mono text-xs uppercase tracking-wider"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 text-[#F5F5F5] hover:text-[#FF1493] transition-colors"
              >
                <span className="border-b border-[#F5F5F5] group-hover:border-[#FF1493] pb-0.5">Explore Projects</span>
                <span className="text-[#FF1493] group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-[#999999] hover:text-[#F5F5F5] transition-colors"
              >
                <span className="border-b border-transparent group-hover:border-[#F5F5F5] pb-0.5">Contact</span>
                <span className="text-[#FF1493] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </motion.div>

          </div>

          {/* Right Column (5 cols): Cinematic High-Contrast Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[420px] lg:max-w-none rounded-xl overflow-hidden border border-[rgba(255,255,255,0.12)] shadow-[0_0_40px_rgba(255,20,147,0.12)] bg-[#0A0A0A] group">
              
              {/* High-Contrast Editorial Portrait */}
              <img
                src="/assets/images/hero-portrait.png"
                alt="Murasoli Balaji - Editorial Portrait"
                className="w-full h-auto aspect-[4/5] object-cover object-top filter grayscale contrast-125 brightness-90 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />

              {/* Seamless Vignette Fading Into Black */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-transparent" />

              {/* Minimal Editorial Annotation */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#999999]">
                <span>// Editorial Capture</span>
                <span className="text-[#FF1493]">{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Minimal Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex items-center justify-between pt-6 border-t border-[rgba(255,255,255,0.12)] font-mono text-[11px] uppercase tracking-widest text-[#666666]"
        >
          <span>Kongu Engineering College</span>
          <div className="flex items-center gap-2 text-[#999999]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
            <span>Scroll to Discover</span>
            <ArrowDown className="w-3 h-3 text-[#FF1493] animate-bounce" />
          </div>
          <span>B.Tech Information Technology</span>
        </motion.div>
      </section>

      {/* ===================================================================
          06. ABOUT — PERSONAL INTRODUCTION (EDITORIAL MAGAZINE SPREAD)
         =================================================================== */}
      <About />

      {/* ===================================================================
          07. TECHNOLOGIES — TYPOGRAPHIC INDEX
         =================================================================== */}
      <TechStack />

      {/* ===================================================================
          08. FEATURED PROJECTS — EDITORIAL CASE STUDIES
         =================================================================== */}
      <EditorialProjects onInspect={(proj) => setSelectedProject(proj)} />

      {/* ===================================================================
          09. JOURNEY — MINIMAL VERTICAL TIMELINE
         =================================================================== */}
      <ExperienceEducation />

      {/* ===================================================================
          10. CONTACT — PERSONAL CONNECTION
         =================================================================== */}
      <Contact />

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}