import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-44 border-t border-[rgba(255,20,147,0.20)] overflow-hidden w-full">
      {/* Subtle Pink Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-radial from-[#FF1493]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading with Hot Pink Highlight */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-8 h-[2px] bg-[#FF1493]" />
              <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
                // Profile & Philosophy
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight"
            >
              Curiosity <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF69B4] to-[#FF1493]">Drives</span> Innovation<span className="text-[#FF1493]">.</span>
            </motion.h2>

            {/* Pink Accent Underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[3px] bg-gradient-to-r from-[#FF1493] to-transparent mt-6 shadow-[0_0_10px_#FF1493]"
            />
          </div>

          {/* Right Column: Narrative & Minimal Information Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-[#B3B3B3] text-lg sm:text-xl md:text-2xl leading-relaxed font-light"
            >
              <p className="text-white">
                Information Technology undergraduate at <span className="text-[#FF69B4] font-medium">{personalInfo.educationInstitute}</span>. I focus on the intersection of <span className="text-white font-medium border-b border-[#FF1493]">artificial intelligence</span> and systems engineering — architecting full-stack applications, exploring autonomous agents, and building computational simulations.
              </p>
              <p className="text-[#B3B3B3] text-base sm:text-lg">
                {personalInfo.philosophy}
              </p>
            </motion.div>

            {/* Information Cards with Charcoal Background & Pink Borders */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 pt-10 border-t border-[rgba(255,20,147,0.20)] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs"
            >
              <div className="p-4 rounded-xl bg-[#111111] border border-[rgba(255,20,147,0.20)] hover:border-[#FF1493] transition-colors">
                <span className="text-[#737373] block mb-1">DISCIPLINE</span>
                <span className="text-white font-medium text-sm">Information Tech</span>
              </div>
              <div className="p-4 rounded-xl bg-[#111111] border border-[rgba(255,20,147,0.20)] hover:border-[#FF1493] transition-colors">
                <span className="text-[#737373] block mb-1">INSTITUTION</span>
                <span className="text-white font-medium text-sm">Kongu Engg. College</span>
              </div>
              <div className="p-4 rounded-xl bg-[#111111] border border-[rgba(255,20,147,0.20)] hover:border-[#FF1493] transition-colors">
                <span className="text-[#737373] block mb-1">LOCATION</span>
                <span className="text-white font-medium text-sm">Tamil Nadu, India</span>
              </div>
              <div className="p-4 rounded-xl bg-[#111111] border border-[rgba(255,20,147,0.20)] hover:border-[#FF1493] hover:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all">
                <span className="text-[#737373] block mb-1">STATUS</span>
                <span className="text-[#FF69B4] font-medium text-sm">Open to Projects</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
