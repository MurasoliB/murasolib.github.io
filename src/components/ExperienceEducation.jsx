import React from 'react';
import { motion } from 'framer-motion';
import { journeyTimeline } from '../data/portfolioData';

export default function ExperienceEducation() {
  return (
    <section id="journey" className="relative py-28 md:py-40 border-t border-white/10 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-20 md:mb-28">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
            <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
              // Trajectory
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
            ACADEMIC & DEV PATH<span className="text-[#FF1493]">.</span>
          </h2>
        </div>

        {/* Minimal Timeline with Generous Whitespace (No Heavy Cards) */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 md:ml-32 space-y-16 md:space-y-20">
          {journeyTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Hot Pink Node Indicator */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#FF1493] ring-4 ring-[#050505]" />

              {/* Period Label on Left (Offset on Desktop) */}
              <div className="md:absolute md:-left-32 md:top-1 md:w-24 md:text-right mb-2 md:mb-0">
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF69B4] font-semibold">
                  {item.period}
                </span>
              </div>

              {/* Clean Typography Body */}
              <div className="space-y-2 max-w-3xl">
                <span className="font-mono text-xs text-white/50 uppercase tracking-wider block">
                  {item.organization}
                </span>

                <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight group-hover:text-[#FF69B4] transition-colors">
                  {item.role}
                </h3>

                <p className="text-base sm:text-lg text-[#B3B3B3] leading-relaxed pt-1 font-light">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}