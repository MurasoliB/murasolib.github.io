import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '../data/portfolioData';

export default function EditorialProjects({ onInspect }) {
  const p1 = featuredProjects.find((p) => p.id === 'ultron') || featuredProjects[0];
  const p2 = featuredProjects.find((p) => p.id === 'flood-gis') || featuredProjects[1];
  const p3 = featuredProjects.find((p) => p.id === 'academic-eval') || featuredProjects[2];
  const p4 = featuredProjects.find((p) => p.id === 'clubhub') || featuredProjects[3];

  return (
    <section id="projects" className="relative py-28 md:py-40 border-t border-[rgba(255,255,255,0.12)] overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-20 md:mb-28">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-[#FF1493] font-semibold tracking-wider">
              03.
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#666666]">
              // Case Studies
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-[#F5F5F5]">
            FEATURED PROJECTS<span className="text-[#FF1493]">.</span>
          </h2>
        </div>

        {/* ===================================================================
            PROJECT 01: Image on the Right (ULTRON AI Assistant)
           =================================================================== */}
        <div className="py-16 md:py-24 border-t border-[rgba(255,255,255,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="flex items-center gap-3 font-mono text-xs text-[#666666] uppercase tracking-widest">
                <span className="text-[#FF1493] font-bold">{p1.number}</span>
                <span>/</span>
                <span className="text-[#999999]">{p1.badge}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F5F5] tracking-tight">
                {p1.title}
              </h3>

              <p className="text-base sm:text-lg text-[#999999] leading-relaxed max-w-xl">
                {p1.description}
              </p>

              {/* Technology Metadata */}
              <div className="pt-2">
                <p className="text-xs font-mono uppercase tracking-widest text-[#666666] mb-2">Technologies</p>
                <p className="font-mono text-xs text-[#F5F5F5]">
                  {p1.tags.join('  ·  ')}
                </p>
              </div>

              {/* Action */}
              <div className="pt-4">
                <button
                  onClick={() => onInspect && onInspect(p1)}
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F5F5F5] hover:text-[#FF1493] transition-colors cursor-pointer"
                >
                  <span className="border-b border-[#F5F5F5] group-hover:border-[#FF1493] pb-0.5">Inspect Case Study</span>
                  <span className="text-[#FF1493] group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>

            {/* Visual Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => onInspect && onInspect(p1)}
              className="lg:col-span-6 group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#0A0A0A]">
                <img
                  src={p1.image}
                  alt={p1.title}
                  className="w-full h-full object-cover filter grayscale contrast-115 brightness-95 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 right-4 font-mono text-[11px] text-[#999999] uppercase tracking-wider bg-[#050505]/80 backdrop-blur-sm px-3 py-1 rounded border border-[rgba(255,255,255,0.08)]">
                  Autonomous Agent Engine
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ===================================================================
            PROJECT 02: Image on the Left (Flood Simulation & GIS)
           =================================================================== */}
        <div className="py-16 md:py-24 border-t border-[rgba(255,255,255,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => onInspect && onInspect(p2)}
              className="lg:col-span-7 order-2 lg:order-1 group cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#0A0A0A]">
                <img
                  src={p2.image}
                  alt={p2.title}
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-95 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 font-mono text-[11px] text-[#999999] uppercase tracking-wider bg-[#050505]/80 backdrop-blur-sm px-3 py-1 rounded border border-[rgba(255,255,255,0.08)]">
                  Fig 2.1 — Hydrodynamic Inundation Wavefront
                </div>
              </div>
            </motion.div>

            {/* Content Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 order-1 lg:order-2 space-y-6"
            >
              <div className="flex items-center gap-3 font-mono text-xs text-[#666666] uppercase tracking-widest">
                <span className="text-[#FF1493] font-bold">{p2.number}</span>
                <span>/</span>
                <span className="text-[#999999]">{p2.badge}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F5F5] tracking-tight">
                {p2.title}
              </h3>

              <p className="text-base sm:text-lg text-[#999999] leading-relaxed">
                {p2.description}
              </p>

              {/* Technology Metadata */}
              <div className="pt-2">
                <p className="text-xs font-mono uppercase tracking-widest text-[#666666] mb-2">Technologies</p>
                <p className="font-mono text-xs text-[#F5F5F5]">
                  {p2.tags.join('  ·  ')}
                </p>
              </div>

              {/* Action */}
              <div className="pt-4">
                <button
                  onClick={() => onInspect && onInspect(p2)}
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F5F5F5] hover:text-[#FF1493] transition-colors cursor-pointer"
                >
                  <span className="border-b border-[#F5F5F5] group-hover:border-[#FF1493] pb-0.5">Inspect Case Study</span>
                  <span className="text-[#FF1493] group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ===================================================================
            PROJECT 03: Wide Horizontal Image & Architecture (Student Academic Evaluation)
           =================================================================== */}
        <div className="py-16 md:py-24 border-t border-[rgba(255,255,255,0.12)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            {/* Header row */}
            <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs text-[#666666] uppercase tracking-widest mb-2">
                  <span className="text-[#FF1493] font-bold">{p3.number}</span>
                  <span>/</span>
                  <span className="text-[#999999]">{p3.badge}</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F5F5] tracking-tight">
                  {p3.title}
                </h3>
              </div>

              <div className="lg:max-w-md">
                <p className="text-base text-[#999999] leading-relaxed">
                  {p3.description}
                </p>
              </div>
            </div>

            {/* Wide Architectural Blueprint Panel */}
            <div
              onClick={() => onInspect && onInspect(p3)}
              className="p-8 sm:p-12 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#0A0A0A] hover:bg-[#0E0E0E] transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4 mb-8 font-mono text-xs text-[#666666]">
                <span>// RELATIONAL DATABASE & COMPUTATIONAL GPA ENGINE</span>
                <span className="text-[#FF1493] group-hover:translate-x-1 transition-transform">Inspect Technical Architecture ↗</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#FF1493]">01</span>
                  <h4 className="font-display font-semibold text-lg text-[#F5F5F5]">3NF Schema Normalization</h4>
                  <p className="text-xs sm:text-sm text-[#999999] leading-relaxed">
                    Strict mathematical relational design eliminating insertion, update, and deletion anomalies.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#FF1493]">02</span>
                  <h4 className="font-display font-semibold text-lg text-[#F5F5F5]">ACID Transaction Engine</h4>
                  <p className="text-xs sm:text-sm text-[#999999] leading-relaxed">
                    JDBC connection pooling ensuring isolation and consistency during continuous evaluation grading batches.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#FF1493]">03</span>
                  <h4 className="font-display font-semibold text-lg text-[#F5F5F5]">Automated Analytics</h4>
                  <p className="text-xs sm:text-sm text-[#999999] leading-relaxed">
                    Multi-semester GPA computation, course weighted averages, and role-based privilege enforcement.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between font-mono text-xs text-[#666666]">
                <span>{p3.tags.join('  ·  ')}</span>
                <span className="text-[#999999]">Java JDBC · MySQL Enterprise</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===================================================================
            PROJECT 04: Asymmetric Split Layout (Clubs & Cells Management)
           =================================================================== */}
        <div className="py-16 md:py-24 border-t border-[rgba(255,255,255,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="flex items-center gap-3 font-mono text-xs text-[#666666] uppercase tracking-widest">
                <span className="text-[#FF1493] font-bold">{p4.number}</span>
                <span>/</span>
                <span className="text-[#999999]">{p4.badge}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F5F5] tracking-tight">
                {p4.title}
              </h3>

              <p className="text-base sm:text-lg text-[#999999] leading-relaxed">
                {p4.description}
              </p>

              {/* Technology Metadata */}
              <div className="pt-2">
                <p className="text-xs font-mono uppercase tracking-widest text-[#666666] mb-2">Technologies</p>
                <p className="font-mono text-xs text-[#F5F5F5]">
                  {p4.tags.join('  ·  ')}
                </p>
              </div>

              {/* Action */}
              <div className="pt-4">
                <button
                  onClick={() => onInspect && onInspect(p4)}
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F5F5F5] hover:text-[#FF1493] transition-colors cursor-pointer"
                >
                  <span className="border-b border-[#F5F5F5] group-hover:border-[#FF1493] pb-0.5">Inspect Case Study</span>
                  <span className="text-[#FF1493] group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>

            {/* Architecture Diagram Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => onInspect && onInspect(p4)}
              className="lg:col-span-7 group cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#0A0A0A] p-4 flex items-center justify-center">
                <img
                  src={p4.image}
                  alt={p4.title}
                  className="w-full h-full object-contain filter invert opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                />
                <div className="absolute bottom-4 right-4 font-mono text-[11px] text-[#999999] uppercase tracking-wider bg-[#050505]/80 backdrop-blur-sm px-3 py-1 rounded border border-[rgba(255,255,255,0.08)]">
                  Multi-Tier Campus Activity Architecture
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}