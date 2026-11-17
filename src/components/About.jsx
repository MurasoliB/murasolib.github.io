import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Minimal Category Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono text-accent-blue tracking-widest uppercase mb-6"
        >
          // Profile & Philosophy
        </motion.div>

        {/* Large Minimal Editorial Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight mb-10"
        >
          {personalInfo.aboutHeading}
        </motion.h2>

        {/* Concise Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-content-secondary text-base sm:text-lg md:text-xl leading-relaxed"
        >
          <p>
            {personalInfo.aboutDescription}
          </p>
          <p className="text-content-muted text-base md:text-lg">
            {personalInfo.philosophy}
          </p>
        </motion.div>

        {/* Minimal Meta Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs"
        >
          <div>
            <span className="text-content-muted block mb-1">DISCIPLINE</span>
            <span className="text-white font-medium">Information Tech</span>
          </div>
          <div>
            <span className="text-content-muted block mb-1">INSTITUTION</span>
            <span className="text-white font-medium">Kongu Engg. College</span>
          </div>
          <div>
            <span className="text-content-muted block mb-1">LOCATION</span>
            <span className="text-white font-medium">Tamil Nadu, India</span>
          </div>
          <div>
            <span className="text-content-muted block mb-1">STATUS</span>
            <span className="text-accent-blue font-medium">Open to Projects</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
