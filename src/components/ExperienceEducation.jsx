import React from 'react';
import { motion } from 'framer-motion';
import { journeyTimeline } from '../data/portfolioData';

export default function ExperienceEducation() {
  return (
    <section id="journey" className="relative py-32 md:py-40 border-t border-[rgba(255,20,147,0.20)] overflow-hidden w-full">
      {/* Pink Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-gradient-radial from-[#FF1493]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#FF1493]" />
            <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
              // Trajectory
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Academic & Engineering Path<span className="text-[#FF1493]">.</span>
          </h2>
        </div>

        {/* Vertical Timeline with Pink Line & Glowing Nodes */}
        <div className="relative pl-6 md:pl-10 space-y-16">
          {/* Continuous Pink Timeline Line */}
          <div className="absolute top-2 bottom-2 left-2 md:left-3 w-[2px] bg-gradient-to-b from-[#FF1493] via-[#FF4FBF] to-[#FF1493]/20 shadow-[0_0_8px_rgba(255,20,147,0.4)]" />

          {journeyTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Pink Glowing Node */}
              <div className="absolute -left-[19px] md:-left-[23px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#FF1493] group-hover:bg-[#FF1493] transition-colors shadow-[0_0_12px_#FF1493] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF69B4]" />
              </div>

              {/* Card Container */}
              <div className="p-6 md:p-8 rounded-2xl bg-[#111111] border border-[rgba(255,20,147,0.20)] hover:border-[#FF1493] hover:shadow-[0_0_25px_rgba(255,20,147,0.25)] transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-[#FF69B4] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-[#050505] border border-[rgba(255,20,147,0.25)]">
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-[#B3B3B3]">
                    {item.organization}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white group-hover:text-[#FF69B4] transition-colors">
                  {item.role}
                </h3>

                <p className="text-sm sm:text-base text-[#B3B3B3] leading-relaxed mt-3 font-light">
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
