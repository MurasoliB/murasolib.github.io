import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react';
import { Github } from './Icons';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-surface-card rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Modal Header */}
          <div className="relative p-6 sm:p-8 border-b border-white/10 flex items-start justify-between bg-surface/50">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-accent-blue uppercase tracking-widest">
                  PROJECT {project.number} &bull; {project.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-sm text-content-secondary mt-1">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-surface border border-white/10 text-content-secondary hover:text-white hover:border-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-8">
            {/* Visual Media Showcase */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-background relative aspect-video max-h-[380px]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center filter grayscale contrast-105 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>

            {/* If Project has Flowchart or Architecture diagram */}
            {project.flowchart && (
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-surface p-4">
                <p className="text-xs font-mono text-accent-blue uppercase tracking-wider mb-3">
                  Technical Architecture & Hydrodynamic Flowchart
                </p>
                <img
                  src={project.flowchart}
                  alt="Architecture Flowchart"
                  className="w-full rounded-xl filter invert opacity-90 max-h-[300px] object-contain mx-auto"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-sm font-mono text-accent-blue uppercase tracking-wider mb-2">
                System Overview
              </h4>
              <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Key Engineering Highlights */}
            {project.features && (
              <div>
                <h4 className="text-sm font-mono text-accent-blue uppercase tracking-wider mb-3">
                  Key Technical Features & Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-content-secondary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack Tags */}
            <div>
              <h4 className="text-sm font-mono text-accent-blue uppercase tracking-wider mb-3">
                Technologies & Tools Applied
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-xl bg-surface border border-white/10 text-xs font-mono text-content-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTAs */}
          <div className="p-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-surface/50">
            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-white/10 text-white hover:border-accent-blue/50 text-xs font-semibold transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Code on GitHub</span>
              </a>

              {project.demo && project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue text-white text-xs font-semibold shadow-glow-blue hover:bg-blue-500 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-content-secondary hover:text-white text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
