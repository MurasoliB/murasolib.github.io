import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, ArrowUpRight, CheckCircle, Info } from 'lucide-react';
import { Github } from './Icons';
import { featuredProjects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative py-28 bg-surface/30 overflow-hidden border-t border-border-subtle">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-accent-blue/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-accent-violet/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-accent-blue text-xs uppercase tracking-widest font-mono mb-4"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Curated Showcase</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4"
          >
            Featured Projects.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary max-w-2xl text-base md:text-lg"
          >
            Engineered software systems spanning autonomous AI assistants, hydrodynamic flood modeling, enterprise database platforms, and campus workflow automation.
          </motion.p>
        </div>

        {/* Large Project Showcase Cards */}
        <div className="space-y-24">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Visual Image Card (Order changes on even/odd for rhythm) */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-accent-blue/40 shadow-2xl transition-all duration-500 cursor-pointer"
                  >
                    {/* Aspect Frame */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-card">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />

                      {/* Film Vignette & Lighting Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-transparent opacity-40" />

                      {/* Top Badges */}
                      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                        <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-content-primary">
                          {project.badge}
                        </span>
                        <span className="text-xl font-display font-black text-white/30 group-hover:text-accent-blue/80 transition-colors">
                          {project.number}
                        </span>
                      </div>

                      {/* Hover Pill CTA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/40 backdrop-blur-xs">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-blue text-white font-medium text-xs shadow-glow-blue">
                          <span>Inspect Architecture & Details</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editorial Information Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-accent-blue font-semibold tracking-widest uppercase">
                      PROJECT {project.number}
                    </span>
                    <span className="h-px w-8 bg-accent-blue/40" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm font-medium text-content-secondary mb-4 italic">
                    {project.subtitle || project.tagline}
                  </p>

                  <p className="text-content-secondary text-sm sm:text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="space-y-2 mb-6">
                    {project.features.slice(0, 2).map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 shrink-0" />
                        <span className="text-xs sm:text-sm text-content-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-xl bg-surface-card border border-white/5 text-xs font-mono text-content-secondary hover:text-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue/15 border border-accent-blue/40 text-accent-blue hover:bg-accent-blue hover:text-white text-xs font-semibold shadow-glow-blue transition-all duration-300"
                    >
                      <Info className="w-4 h-4" />
                      <span>Deep Dive</span>
                    </button>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-card border border-white/10 text-content-primary hover:text-white hover:border-white/20 text-xs font-semibold transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Deep Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
