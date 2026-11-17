import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-44 border-t border-white/5 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading & Category */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono text-accent-blue tracking-widest uppercase mb-4"
            >
              // Profile & Philosophy
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight"
            >
              {personalInfo.aboutHeading}
            </motion.h2>
          </div>

          {/* Right Column: Narrative & Meta */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-content-secondary text-lg sm:text-xl md:text-2xl leading-relaxed font-light"
            >
              <p className="text-white">
                {personalInfo.aboutDescription}
              </p>
              <p className="text-content-muted text-base sm:text-lg">
                {personalInfo.philosophy}
              </p>
            </motion.div>

            {/* Wide Meta Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8 font-mono text-xs"
            >
              <div>
                <span className="text-content-muted block mb-1">DISCIPLINE</span>
                <span className="text-white font-medium text-sm">Information Tech</span>
              </div>
              <div>
                <span className="text-content-muted block mb-1">INSTITUTION</span>
                <span className="text-white font-medium text-sm">Kongu Engg. College</span>
              </div>
              <div>
                <span className="text-content-muted block mb-1">LOCATION</span>
                <span className="text-white font-medium text-sm">Tamil Nadu, India</span>
              </div>
              <div>
                <span className="text-content-muted block mb-1">STATUS</span>
                <span className="text-accent-blue font-medium text-sm">Open to Projects</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
