import React from 'react';
import { motion } from 'framer-motion';
import { journeyTimeline } from '../data/portfolioData';

export default function ExperienceEducation() {
  return (
    <section id="journey" className="relative py-28 md:py-40 border-t border-[rgba(255,255,255,0.12)] overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-20 md:mb-28">
          <span className="font-mono text-xs text-[#FF1493] font-semibold tracking-wider">
            04.
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#666666]">
            // Trajectory
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-[#F5F5F5] ml-auto">
            PATH & TIMELINE<span className="text-[#FF1493]">.</span>
          </h2>
        </div>

        {/* Minimal Vertical Swiss Timeline */}
        <div className="relative border-l border-[rgba(255,255,255,0.12)] ml-4 sm:ml-8 md:ml-36 space-y-16 md:space-y-20">
          {journeyTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Small Hot Pink Marker */}
              <div className="absolute -left-[4.5px] top-2 w-2 h-2 rounded-full bg-[#FF1493] ring-4 ring-[#050505]" />

              {/* Large Period Label on the Left (Offset on Desktop) */}
              <div className="md:absolute md:-left-36 md:top-0 md:w-28 md:text-right mb-2 md:mb-0">
                <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#999999] group-hover:text-[#F5F5F5] transition-colors">
                  {item.period}
                </span>
              </div>

              {/* Content Body */}
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-3 font-mono text-xs text-[#666666]">
                  <span>{item.organization}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#F5F5F5] tracking-tight">
                  {item.role}
                </h3>

                <p className="text-sm sm:text-base text-[#999999] leading-relaxed pt-1">
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
