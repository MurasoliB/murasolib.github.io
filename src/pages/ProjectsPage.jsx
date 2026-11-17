import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Info } from 'lucide-react';
import { Github } from '../components/Icons';
import { featuredProjects, personalInfo } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen pt-32 pb-28 z-10">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Back Link */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-content-muted hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-20">
          <span className="text-xs font-mono text-accent-blue tracking-widest uppercase block mb-3">
            // Archive
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight mb-4">
            Projects & Architecture.
          </h1>
          <p className="text-content-secondary max-w-xl text-base sm:text-lg">
            Engineering software systems across autonomous voice AI, computational fluid dynamics, and enterprise data models.
          </p>
        </div>

        {/* Projects Showcase Cards */}
        <div className="space-y-24 mb-28">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group border-b border-white/5 pb-20 last:border-b-0"
            >
              {/* Top Meta Line */}
              <div className="flex items-center justify-between text-xs font-mono text-content-muted mb-4">
                <span className="text-accent-blue">{project.number}</span>
                <span>{project.badge}</span>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
                {project.title}
              </h2>
              <p className="text-sm font-mono text-content-secondary mb-6">
                {project.tagline}
              </p>

              {/* Visual Preview */}
              <div
                onClick={() => setSelectedProject(project)}
                className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-accent-blue/40 transition-all cursor-pointer mb-8"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-95 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-white border border-white/10">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Description & Technical Tags */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8">
                  <p className="text-sm sm:text-base text-content-secondary leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-content-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 flex md:justify-end gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:border-accent-blue/50 text-white text-xs font-mono transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-accent-blue" />
                    <span>Deep Dive</span>
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-accent-blue hover:text-white text-xs font-mono font-medium transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal Footer Contact Link */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <span className="text-content-muted">
            Have questions about system implementations?
          </span>
          <Link to="/#contact" className="text-white hover:text-accent-blue transition-colors">
            Get in Touch →
          </Link>
        </div>

      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
