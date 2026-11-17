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
          className="fixed inset-0 bg-[#050505]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#111111] rounded-3xl border border-[rgba(255,20,147,0.25)] shadow-[0_0_60px_rgba(255,20,147,0.2)] overflow-hidden z-10 my-8"
        >
          {/* Modal Header */}
          <div className="relative p-6 sm:p-8 border-b border-[rgba(255,20,147,0.20)] flex items-start justify-between bg-[#0B0B0B]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-[#FF4FBF] uppercase tracking-widest">
                  PROJECT {project.number} &bull; {project.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-sm text-[#B3B3B3] mt-1">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-[#111111] border border-[rgba(255,20,147,0.20)] text-[#B3B3B3] hover:text-[#FF1493] hover:border-[#FF1493] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-8">
            {/* Visual Media Showcase */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#050505] relative aspect-video max-h-[260px] sm:max-h-[300px]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center filter grayscale contrast-105 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
            </div>

            {/* If Project has Flowchart or Architecture diagram */}
            {project.flowchart && (
              <div className="rounded-2xl overflow-hidden border border-[rgba(255,20,147,0.20)] bg-[#0B0B0B] p-4">
                <p className="text-xs font-mono text-[#FF4FBF] uppercase tracking-wider mb-3">
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
              <h4 className="text-sm font-mono text-[#FF1493] uppercase tracking-wider mb-2">
                System Overview
              </h4>
              <p className="text-sm sm:text-base text-[#B3B3B3] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Key Engineering Highlights */}
            {project.features && (
              <div>
                <h4 className="text-sm font-mono text-[#FF1493] uppercase tracking-wider mb-3">
                  Key Technical Features & Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0B0B0B] border border-[rgba(255,20,147,0.15)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF1493] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#B3B3B3]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack Tags */}
            <div>
              <h4 className="text-sm font-mono text-[#FF1493] uppercase tracking-wider mb-3">
                Technologies & Tools Applied
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-xl bg-[#0B0B0B] border border-[rgba(255,20,147,0.20)] text-xs font-mono text-white hover:border-[#FF1493] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTAs */}
          <div className="p-6 border-t border-[rgba(255,20,147,0.20)] flex flex-wrap items-center justify-between gap-4 bg-[#0B0B0B]">
            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] border border-[rgba(255,20,147,0.30)] text-white hover:border-[#FF1493] hover:text-[#FF1493] text-xs font-semibold transition-all hover:shadow-[0_0_15px_rgba(255,20,147,0.3)]"
              >
                <Github className="w-4 h-4" />
                <span>Source Code on GitHub</span>
              </a>

              {project.demo && project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF1493] text-white text-xs font-semibold shadow-[0_0_20px_rgba(255,20,147,0.4)] hover:bg-[#FF4FBF] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Preview</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[rgba(255,20,147,0.20)] text-[#B3B3B3] hover:text-white hover:border-[#FF1493] text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
