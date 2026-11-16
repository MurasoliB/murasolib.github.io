import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Terminal,
  Cpu,
  Database,
  Atom,
  Palette,
  Layout,
  Sparkles,
  Smartphone,
  Server,
  Network,
  Layers,
  Boxes,
  HardDrive,
  Workflow,
  BrainCircuit,
  Mic,
  Scan,
  Binary,
  GitBranch,
  TerminalSquare,
  Zap,
  Coffee,
  CheckCircle,
} from 'lucide-react';
import { techStackCategories } from '../data/portfolioData';

// Map icon strings to Lucide components
const iconMap = {
  Coffee,
  Code2,
  Terminal,
  Cpu,
  Database,
  Atom,
  Palette,
  Layout,
  Sparkles,
  Smartphone,
  Server,
  Network,
  Layers,
  Boxes,
  HardDrive,
  Workflow,
  BrainCircuit,
  Mic,
  Scan,
  Binary,
  GitBranch,
  TerminalSquare,
  Zap,
};

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...techStackCategories.map((c) => c.title)];

  const filteredCategories =
    selectedCategory === 'All'
      ? techStackCategories
      : techStackCategories.filter((c) => c.title === selectedCategory);

  return (
    <section id="skills" className="relative py-28 bg-background overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-accent-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-accent-blue text-xs uppercase tracking-widest font-mono mb-4"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4"
          >
            The Engineering Stack.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary max-w-2xl text-base md:text-lg"
          >
            A curated inventory of programming languages, modern frameworks, data architectures, and AI tools used to engineer resilient digital systems.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                selectedCategory === cat
                  ? 'bg-accent-blue text-white shadow-glow-blue border border-accent-blue'
                  : 'bg-surface-card/60 text-content-secondary border border-white/5 hover:text-white hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {filteredCategories.map((category, catIdx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: catIdx * 0.05 }}
                className="rounded-3xl glass-panel p-6 md:p-8 border border-white/5 hover:border-white/15 transition-all"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/5 gap-2">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-blue" />
                      {category.title}
                    </h3>
                    <p className="text-xs text-content-secondary mt-1">
                      {category.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-content-muted">
                    {category.skills.length} TECHNOLOGIES
                  </span>
                </div>

                {/* Skills Interactive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.skills.map((skill) => {
                    const IconComponent = iconMap[skill.icon] || Code2;
                    return (
                      <div
                        key={skill.name}
                        className="group relative p-4 rounded-2xl bg-surface-card border border-white/5 hover:border-accent-blue/50 hover:shadow-glow-blue hover:scale-[1.03] transition-all duration-300 flex flex-col items-start justify-between cursor-default"
                      >
                        {/* Glow corner accent */}
                        <div className="absolute top-0 right-0 w-12 h-12 bg-accent-blue/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-accent-blue group-hover:text-white group-hover:bg-accent-blue/20 transition-all mb-4">
                          <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-accent-blue transition-colors">
                            {skill.name}
                          </h4>
                          <span className="text-[11px] font-mono text-content-muted block mt-0.5 group-hover:text-content-secondary transition-colors">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
