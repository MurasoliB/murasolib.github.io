import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, ArrowUpRight, Maximize2 } from 'lucide-react';
import { Github } from './Icons';

export default function ProjectModal({ project, isOpen, onClose }) {
  // Close on Escape key & freeze background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050505]/90 backdrop-blur-2xl"
        />

        {/* Expansive Full-Webpage-Scale Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-6xl xl:max-w-7xl max-h-[92vh] flex flex-col bg-[#0D0D0D] rounded-3xl border border-white/15 shadow-[0_0_80px_rgba(255,20,147,0.25)] overflow-hidden z-10"
        >
          {/* Sticky Modal Header */}
          <div className="relative px-6 sm:px-10 py-6 border-b border-white/10 flex items-center justify-between bg-[#0A0A0A] shrink-0 z-10">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs mb-1.5">
                <span className="text-[#FF1493] font-bold tracking-widest">{project.number}</span>
                <span className="text-white/20">/</span>
                <span className="px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[#FF69B4] text-[11px] uppercase tracking-wider">
                  {project.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="group flex items-center gap-2 p-2.5 sm:px-4 sm:py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[#B3B3B3] hover:text-white hover:border-[#FF1493] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline text-white/50 group-hover:text-white">
                ESC
              </span>
              <X className="w-5 h-5 text-[#FF1493]" />
            </button>
          </div>

          {/* Modal Body: Spacious 2-Column & High-Res Flowchart Canvas */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 sm:py-10 space-y-12">
            
            {/* Top Grid: Details & Visual Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: System Overview & Tech Specifications */}
              <div className="lg:col-span-6 space-y-8">
                {/* System Overview */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
                    <h4 className="text-xs font-mono text-[#FF69B4] uppercase tracking-widest font-semibold">
                      // System Architecture Overview
                    </h4>
                  </div>
                  <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Key Technical Features */}
                {project.features && (
                  <div>
                    <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-4">
                      Core Engineering Capabilities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#FF1493]/40 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#FF1493] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technology Stack Tags */}
                <div>
                  <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-3">
                    Technologies & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/80 hover:border-[#FF1493] hover:text-[#FF69B4] transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: High-Definition Project Visual Preview */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#050505] relative aspect-[16/10] shadow-2xl group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-50" />
                </div>
              </div>

            </div>

            {/* Architecture Flowchart Section (Expansive Full Width for Maximum Clarity) */}
            {project.flowchart && (
              <div className="rounded-2xl border border-white/15 bg-[#080808] p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF1493] animate-pulse" />
                    <h4 className="text-xs font-mono text-[#FF69B4] uppercase tracking-widest font-semibold">
                      // Hydrodynamic Architecture & Computational Flowchart
                    </h4>
                  </div>
                  <a
                    href={project.flowchart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-[#FF1493] transition-colors"
                  >
                    <span>View Full-Scale Resolution</span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#FF1493]" />
                  </a>
                </div>

                {/* Flowchart Image in Expansive Full Container */}
                <div className="overflow-x-auto rounded-xl bg-[#050505] p-4 sm:p-6 border border-white/5">
                  <img
                    src={project.flowchart}
                    alt="Technical Architecture Flowchart"
                    className="w-full max-w-5xl h-auto filter invert opacity-95 mx-auto rounded-lg"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Sticky Modal Footer Actions */}
          <div className="px-6 sm:px-10 py-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#0A0A0A] shrink-0">
            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF1493] hover:bg-[#FF4FBF] text-white text-xs font-mono font-medium shadow-[0_0_20px_rgba(255,20,147,0.35)] transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {project.demo && project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 hover:border-white text-white text-xs font-mono transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#FF1493]" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-[#FF1493] text-xs font-mono transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
