import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 border-t border-white/10 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading with Hot Pink Highlight */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
              <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
                // Profile &amp; Background
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight"
            >
              About <span className="text-[#FF69B4]">Murasoli</span> Balaji<span className="text-[#FF1493]">.</span>
            </motion.h2>
          </div>

          {/* Right Column: Narrative & Minimal Hairline Metadata */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-[#B3B3B3] text-lg sm:text-xl md:text-2xl leading-relaxed font-light"
            >
              <p className="text-white">
                Information Technology undergraduate at <span className="text-[#FF69B4] font-medium">{personalInfo.educationInstitute}</span>, Tamil Nadu, India. I specialize in <span className="text-white font-medium border-b border-[#FF1493]">full-stack development</span>, artificial intelligence, and systems engineering — architecting resilient web applications, exploring autonomous agents, and building computational simulations.
              </p>
              <p className="text-[#B3B3B3] text-base sm:text-lg">
                With a foundational Diploma in Computer Engineering and ongoing B.Tech studies, my focus bridges core computer science principles with hands-on software development across Java, Python, React, and modern database architectures.
              </p>
              <p className="text-[#B3B3B3] text-base sm:text-lg">
                {personalInfo.philosophy}
              </p>
            </motion.div>

            {/* Aesthetic Hairline Metadata Strip (No Heavy Chunky Cards) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 pt-8 border-t border-white/10 divide-y divide-white/10 font-mono text-xs"
            >
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="text-white/40 uppercase tracking-widest">Discipline</span>
                <span className="text-white font-medium">B.Tech Information Technology</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="text-white/40 uppercase tracking-widest">Past Education</span>
                <span className="text-white font-medium">Diploma in Computer Engineering (CIT Sandwich Polytechnic College)</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="text-white/40 uppercase tracking-widest">Experience</span>
                <span className="text-[#FF69B4] font-medium">4+ Years of Tech Experience</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="text-white/40 uppercase tracking-widest">Institution</span>
                <span className="text-white font-medium">{personalInfo.educationInstitute}</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="text-white/40 uppercase tracking-widest">Location</span>
                <span className="text-white font-medium">{personalInfo.location}</span>
              </div>
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="text-white/40 uppercase tracking-widest">Status</span>
                <span className="text-[#FF69B4] font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493] animate-pulse" />
                  Available for Collaborations & Projects
                </span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}