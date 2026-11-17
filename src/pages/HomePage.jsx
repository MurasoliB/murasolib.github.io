import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowDown } from 'lucide-react';
import About from '../components/About';
import TechStack from '../components/TechStack';
import ExperienceEducation from '../components/ExperienceEducation';
import Contact from '../components/Contact';
import { featuredProjects, personalInfo } from '../data/portfolioData';

export default function HomePage() {
  const location = useLocation();

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
      
      {/* Full-Screen Hero / Intro Fold */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-between pt-32 pb-14 max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full"
      >
        {/* Top Tag & Availability */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <span className="text-xs font-mono text-accent-blue tracking-widest uppercase">
            // Software & AI Architecture
          </span>

          <div className="flex items-center gap-2 font-mono text-xs text-content-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{personalInfo.availability}</span>
          </div>
        </motion.div>

        {/* Massive Screen-Filling Typography */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto py-12"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] font-display font-black text-white tracking-tighter leading-[0.85] select-none">
            MURASOLI<br />BALAJI<span className="text-accent-blue">.</span>
          </h1>
        </motion.div>

        {/* Bottom Wide Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <p className="text-base sm:text-xl text-content-primary font-light leading-relaxed">
              {personalInfo.headline}.
            </p>
            <p className="text-xs sm:text-sm font-mono text-content-muted mt-1">
              {personalInfo.educationInstitute} · {personalInfo.location}
            </p>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-white hover:text-accent-blue transition-colors group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-white/20">|</span>
            <Link
              to="/#contact"
              className="text-content-muted hover:text-white transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 1. Profile & Philosophy */}
      <About />

      {/* 2. Technical Stack */}
      <TechStack />

      {/* 3. Wide Selected Works Showcase */}
      <section id="projects-preview" className="relative py-32 border-t border-white/5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div>
              <span className="text-xs font-mono text-accent-blue tracking-widest uppercase block mb-3">
                // Selected Works
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                Featured Projects.
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-content-secondary hover:text-white transition-colors group"
            >
              <span>View All Projects Archive</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Wide Project Rows */}
          <div className="divide-y divide-white/5">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to="/projects"
                className="group py-10 first:pt-0 flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 transition-all"
              >
                <div className="lg:w-4/12 flex items-baseline gap-6">
                  <span className="font-mono text-xs text-accent-blue font-bold">
                    {project.number}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white group-hover:text-accent-blue transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-content-muted block mt-1">
                      {project.badge}
                    </span>
                  </div>
                </div>

                <div className="lg:w-6/12">
                  <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((t) => (
                      <span key={t} className="text-xs font-mono text-content-muted">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:w-2/12 flex lg:justify-end items-center">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-content-muted group-hover:text-accent-blue transition-colors">
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

      {/* 5. Contact */}
      <Contact />
    </div>
  );
}
