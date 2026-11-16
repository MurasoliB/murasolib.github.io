import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Brain, Code, Lightbulb, Compass, Award, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const pillars = [
  {
    icon: Brain,
    title: 'Intelligent Systems',
    description: 'Developing context-aware autonomous agents, voice intelligence, and machine learning models to solve complex operational challenges.',
  },
  {
    icon: Code,
    title: 'Full-Stack Architecture',
    description: 'Engineering responsive, modern web platforms with React and Node.js backed by robust relational and document database systems.',
  },
  {
    icon: Lightbulb,
    title: 'Problem-First Engineering',
    description: 'Approaching real-world problems with algorithmic rigor, whether simulating hydrodynamic flood hazards or streamlining campus workflows.',
  },
  {
    icon: Compass,
    title: 'Continuous Mastery',
    description: 'Relentlessly exploring emerging technologies, deep-diving into Data Structures, and refining system design methodologies.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-surface/50 border-t border-border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Heading Tag */}
        <div className="flex flex-col items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-accent-blue text-xs uppercase tracking-widest font-mono mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>About The Builder</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-6"
          >
            {personalInfo.aboutHeading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary text-lg md:text-xl max-w-3xl leading-relaxed"
          >
            {personalInfo.aboutDescription}
          </motion.p>
        </div>

        {/* Editorial Layout: Image & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Portrait in Foliage with Editorial Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl group">
              <div className="aspect-[4/5] overflow-hidden bg-surface">
                <img
                  src={personalInfo.aboutPortrait}
                  alt="Murasoli Balaji Editorial"
                  className="w-full h-full object-cover object-center filter grayscale contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              </div>

              {/* Inset Quote Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-surface-card/90 backdrop-blur-md border border-white/10">
                <p className="text-xs font-mono text-accent-blue uppercase tracking-wider mb-1">
                  Philosophy
                </p>
                <p className="text-xs text-content-primary italic leading-relaxed">
                  "Where rigorous engineering meets intuitive human experience."
                </p>
              </div>
            </div>

            {/* Ambient Background Glow behind image */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent-violet/20 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Right Column: Detailed Narrative & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Academic Information Card */}
            <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 hover:border-accent-blue/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-accent-blue shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-accent-blue uppercase tracking-wider">
                    Education & Institution
                  </span>
                  <h3 className="text-xl font-display font-bold text-white mt-1">
                    {personalInfo.educationInstitute}
                  </h3>
                  <p className="text-sm font-medium text-content-secondary mt-1">
                    {personalInfo.educationDegree} &bull; {personalInfo.location}
                  </p>
                  <p className="text-sm text-content-muted mt-3 leading-relaxed">
                    Undergraduate studies concentrating on advanced data structures, systems design, artificial intelligence paradigms, and database architectures. Actively engaged in developing student community systems and real-world simulation software.
                  </p>
                </div>
              </div>
            </div>

            {/* Development Philosophy Card */}
            <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 hover:border-accent-violet/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-violet/10 border border-accent-violet/30 flex items-center justify-center text-accent-violet shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-accent-violet uppercase tracking-wider">
                    Engineering Mindset
                  </span>
                  <h3 className="text-xl font-display font-bold text-white mt-1">
                    Deliberate Architecture & Craftsmanship
                  </h3>
                  <p className="text-sm text-content-secondary mt-3 leading-relaxed">
                    {personalInfo.philosophy}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Four Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-surface-card border border-white/5 hover:border-accent-blue/40 hover:shadow-glow-blue transition-all duration-400 group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-accent-blue group-hover:scale-110 group-hover:bg-accent-blue/10 transition-all mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-display font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs text-content-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
