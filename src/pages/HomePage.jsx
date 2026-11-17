import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderGit2, ArrowRight, ArrowUpRight, Sparkles, Cpu, Layers } from 'lucide-react';
import About from '../components/About';
import TechStack from '../components/TechStack';
import ExperienceEducation from '../components/ExperienceEducation';
import Contact from '../components/Contact';
import { featuredProjects } from '../data/portfolioData';

export default function HomePage() {
  const location = useLocation();

  // Scroll to hash on load or navigation
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
      {/* Top Scroll Anchor */}
      <div id="home" className="h-16" />

      {/* 1. Editorial About & Philosophy */}
      <About />

      {/* 2. Interactive Technology Stack */}
      <TechStack />

      {/* 3. Featured Projects Showcase Banner (Linking to the dedicated Projects Page) */}
      <section id="projects-preview" className="relative py-24 bg-surface/20 border-t border-b border-border-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-accent-blue text-xs uppercase tracking-widest font-mono mb-4">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Engineered Systems</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white">
                Featured Projects.
              </h2>
              <p className="text-content-secondary max-w-xl text-sm sm:text-base mt-2">
                Autonomous voice AI assistants, hydrodynamic flood models, and enterprise database systems.
              </p>
            </div>

            <Link
              to="/projects"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-accent-blue text-white font-semibold text-xs sm:text-sm shadow-glow-blue hover:bg-blue-500 transition-all duration-300 w-fit shrink-0"
            >
              <span>Explore Projects Page</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick Preview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProjects.map((proj) => (
              <Link
                key={proj.id}
                to="/projects"
                className="group p-6 rounded-3xl glass-panel border border-white/5 hover:border-accent-blue/40 hover:shadow-glow-blue transition-all duration-400 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-accent-blue font-bold">{proj.number}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-content-muted border border-white/5">
                      {proj.badge.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white group-hover:text-accent-blue transition-colors mb-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-content-secondary line-clamp-3 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-content-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-accent-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Modern Academic & Development Journey Timeline */}
      <ExperienceEducation />

      {/* 5. Validated Contact Section */}
      <Contact />
    </div>
  );
}
