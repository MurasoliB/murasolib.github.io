import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FolderGit2, ArrowLeft, ArrowUpRight, ExternalLink, Info, Sparkles, Filter } from 'lucide-react';
import { Github } from '../components/Icons';
import { featuredProjects, personalInfo } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filterOptions = ['All', 'AI & Automation', 'GIS & Scientific Computing', 'Enterprise Database System', 'Full-Stack Web Platform'];

  const filteredProjects = activeFilter === 'All'
    ? featuredProjects
    : featuredProjects.filter((p) => p.badge === activeFilter);

  return (
    <div className="relative min-h-screen pt-28 pb-24 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Navigation & Back Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-white/10 text-content-secondary hover:text-white hover:border-accent-blue/40 text-xs font-mono transition-all duration-300 w-fit"
          >
            <ArrowLeft className="w-4 h-4 text-accent-blue" />
            <span>Back to Overview</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            <span className="text-xs font-mono text-content-muted">
              {featuredProjects.length} PRODUCTION REPOSITORIES
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-accent-blue text-xs uppercase tracking-widest font-mono mb-4"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Dedicated Architectural Showcase</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white mb-4"
          >
            Featured Projects<span className="text-accent-blue">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary max-w-2xl text-base sm:text-lg leading-relaxed"
          >
            A comprehensive catalog of engineered systems, autonomous AI assistants, hydrodynamic flood models, and enterprise database software built by <span className="text-white font-medium">{personalInfo.name}</span>.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap mb-14">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                activeFilter === opt
                  ? 'bg-accent-blue text-white shadow-glow-blue border border-accent-blue'
                  : 'bg-surface-card/60 text-content-secondary border border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Projects Grid / Large Showcase Cards */}
        <div className="space-y-24 mb-24">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Visual Media Card */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-accent-blue/40 shadow-2xl transition-all duration-500 cursor-pointer bg-surface-card"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-85" />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-transparent opacity-40" />

                        {/* Top Badges */}
                        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-content-primary">
                            {project.badge}
                          </span>
                          <span className="text-xl font-display font-black text-white/30 group-hover:text-accent-blue/80 transition-colors">
                            {project.number}
                          </span>
                        </div>

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/40 backdrop-blur-xs">
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-blue text-white font-medium text-xs shadow-glow-blue">
                            <span>Inspect Architecture & Details</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Information Column */}
                  <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-accent-blue font-semibold tracking-widest uppercase">
                        PROJECT {project.number}
                      </span>
                      <span className="h-px w-8 bg-accent-blue/40" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mb-2">
                      {project.title}
                    </h2>

                    <p className="text-sm font-medium text-content-secondary mb-4 italic">
                      {project.subtitle}
                    </p>

                    <p className="text-content-secondary text-sm sm:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 mb-6">
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 shrink-0" />
                          <span className="text-xs sm:text-sm text-content-secondary">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-xl bg-surface-card border border-white/5 text-xs font-mono text-content-secondary"
                        >
                          {t}
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
          </AnimatePresence>
        </div>

        {/* Bottom Banner: Connect / Back to Home */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/10 text-center flex flex-col items-center">
          <Sparkles className="w-8 h-8 text-accent-blue mb-4 animate-pulse" />
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-3">
            Interested in Collaborating on a Project?
          </h3>
          <p className="text-sm text-content-secondary max-w-lg mb-6">
            Whether you need autonomous AI integrations, full-stack systems, or computational models, feel free to reach out.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/#contact"
              className="px-6 py-3 rounded-2xl bg-accent-blue text-white font-semibold text-xs sm:text-sm shadow-glow-blue hover:bg-blue-500 transition-all"
            >
              Initiate Transmission
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-2xl bg-surface border border-white/10 text-content-primary hover:text-white text-xs sm:text-sm transition-all"
            >
              Back to Overview
            </Link>
          </div>
        </div>

      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
