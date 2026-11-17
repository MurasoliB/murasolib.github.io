import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 border-t border-[rgba(255,255,255,0.12)] overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        {/* Section Header: Number & Title */}
        <div className="flex items-baseline gap-4 mb-16 md:mb-24">
          <span className="font-mono text-xs text-[#FF1493] font-semibold tracking-wider">
            01.
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#666666]">
            // About
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-[#F5F5F5] ml-auto">
            A LITTLE ABOUT ME<span className="text-[#FF1493]">.</span>
          </h2>
        </div>

        {/* Editorial Magazine Spread: Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Main Introduction on the Left */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-[#F5F5F5] leading-snug tracking-tight">
              Curiosity drives innovation. I believe high-impact software emerges at the exact boundary of <span className="text-white font-medium underline decoration-[#FF1493] decoration-2 underline-offset-8">mathematical rigor</span> and thoughtful digital execution.
            </p>

            <div className="space-y-5 text-base sm:text-lg text-[#999999] font-normal leading-relaxed max-w-2xl">
              <p>
                {personalInfo.aboutDescription}
              </p>
              <p>
                {personalInfo.philosophy}
              </p>
            </div>
          </motion.div>

          {/* Small Supporting Details on the Right */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 divide-y divide-[rgba(255,255,255,0.12)] border-t border-b border-[rgba(255,255,255,0.12)] font-mono text-xs"
          >
            <div className="py-5 flex items-baseline justify-between gap-4">
              <span className="text-[#666666] uppercase tracking-wider">Institution</span>
              <span className="text-[#F5F5F5] text-right font-medium">{personalInfo.educationInstitute}</span>
            </div>

            <div className="py-5 flex items-baseline justify-between gap-4">
              <span className="text-[#666666] uppercase tracking-wider">Degree</span>
              <span className="text-[#F5F5F5] text-right font-medium">{personalInfo.educationDegree}</span>
            </div>

            <div className="py-5 flex items-baseline justify-between gap-4">
              <span className="text-[#666666] uppercase tracking-wider">Location</span>
              <span className="text-[#F5F5F5] text-right font-medium">{personalInfo.location}</span>
            </div>

            <div className="py-5 flex items-baseline justify-between gap-4">
              <span className="text-[#666666] uppercase tracking-wider">Focus</span>
              <span className="text-[#F5F5F5] text-right font-medium">AI Systems & Full-Stack</span>
            </div>

            <div className="py-5 flex items-baseline justify-between gap-4">
              <span className="text-[#666666] uppercase tracking-wider">Status</span>
              <span className="text-[#FF1493] text-right font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
                Available for Collaborations
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
