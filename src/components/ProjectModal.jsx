import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
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
          className="fixed inset-0 bg-[#050505]/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#0A0A0A] rounded-2xl border border-[rgba(255,255,255,0.12)] overflow-hidden z-10 my-8 shadow-2xl"
        >
          {/* Modal Header */}
          <div className="relative p-6 sm:p-8 border-b border-[rgba(255,255,255,0.12)] flex items-start justify-between bg-[#050505]">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#999999] uppercase tracking-widest">
                <span className="text-[#FF1493] font-semibold">{project.number}</span>
                <span>/</span>
                <span>{project.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F5F5]">
                {project.title}
              </h3>
              <p className="text-sm font-mono text-[#666666] mt-1">
                {project.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-[rgba(255,255,255,0.12)] text-[#999999] hover:text-[#F5F5F5] hover:border-white/30 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-8">
            {/* Visual Media Showcase */}
            {project.image && (
              <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.12)] bg-[#050505] relative aspect-video max-h-[360px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95"
                />
              </div>
            )}

            {/* If Project has Flowchart or Architecture diagram */}
            {project.flowchart && (
              <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.12)] bg-[#050505] p-6">
                <p className="text-xs font-mono text-[#FF1493] uppercase tracking-wider mb-4">
                  // Technical Architecture & Hydrodynamic Flowchart
                </p>
                <img
                  src={project.flowchart}
                  alt="Architecture Flowchart"
                  className="w-full rounded-lg filter invert opacity-90 max-h-[320px] object-contain mx-auto"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-xs font-mono text-[#FF1493] uppercase tracking-widest mb-2">
                // System Architecture & Overview
              </h4>
              <p className="text-sm sm:text-base text-[#999999] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Key Engineering Highlights */}
            {project.features && (
              <div>
                <h4 className="text-xs font-mono text-[#FF1493] uppercase tracking-widest mb-3">
                  // Key Technical Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-lg bg-[#050505] border border-[rgba(255,255,255,0.08)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF1493] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#F5F5F5]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack Tags */}
            <div>
              <h4 className="text-xs font-mono text-[#FF1493] uppercase tracking-widest mb-3">
                // Technologies Applied
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#050505] border border-[rgba(255,255,255,0.12)] text-xs font-mono text-[#F5F5F5]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTAs */}
          <div className="p-6 border-t border-[rgba(255,255,255,0.12)] flex flex-wrap items-center justify-between gap-4 bg-[#050505]">
            <div className="flex items-center gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[rgba(255,255,255,0.12)] text-[#F5F5F5] hover:border-white hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>

              {project.demo && project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#FF1493] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#FF69B4] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-md border border-[rgba(255,255,255,0.12)] text-[#666666] hover:text-[#F5F5F5] text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
