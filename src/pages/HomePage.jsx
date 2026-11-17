import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
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
    <div className="relative z-10 flex flex-col">
      {/* Minimal Top Hero / Intro Header */}
      <section id="home" className="min-h-[55vh] flex flex-col justify-end pb-12 pt-32 max-w-4xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-xs font-mono text-accent-blue tracking-widest uppercase mb-4">
            // Software & AI Builder
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tighter leading-none mb-5">
            {personalInfo.name}<span className="text-accent-blue">.</span>
          </h1>
          <p className="text-base sm:text-xl text-content-secondary max-w-xl leading-relaxed font-light">
            {personalInfo.headline}. {personalInfo.subheadline}
          </p>

          <div className="flex items-center gap-6 mt-8 font-mono text-xs">
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

      {/* 3. Minimal Projects Teaser Row */}
      <section id="projects-preview" className="relative py-28 md:py-36 border-t border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-mono text-accent-blue tracking-widest uppercase block mb-3">
                // Selected Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Featured Projects.
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-content-secondary hover:text-white transition-colors group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Minimal Project Rows */}
          <div className="divide-y divide-white/5">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to="/projects"
                className="group py-8 first:pt-0 flex flex-col md:flex-row md:items-baseline justify-between gap-4 transition-all"
              >
                <div className="md:w-1/3 flex items-baseline gap-4">
                  <span className="font-mono text-xs text-accent-blue">
                    {project.number}
                  </span>
                  <h3 className="text-xl font-display font-semibold text-white group-hover:text-accent-blue transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="md:w-1/2">
                  <p className="text-sm text-content-secondary line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                <div className="md:w-1/6 flex justify-end">
                  <ArrowUpRight className="w-5 h-5 text-content-muted group-hover:text-accent-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
