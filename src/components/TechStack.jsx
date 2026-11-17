import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Terminal,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Smartphone,
  Server,
  Workflow,
  BrainCircuit,
  Binary,
  GitBranch,
  TerminalSquare,
  Zap,
  Coffee,
} from 'lucide-react';
import { skillsList } from '../data/portfolioData';

// Map skill names to icons
const skillIcons = {
  Java: Coffee,
  Python: Code2,
  JavaScript: Terminal,
  'C / C++': Cpu,
  SQL: Database,
  React: Layers,
  'Node.js': Server,
  'Tailwind CSS': Sparkles,
  Flutter: Smartphone,
  'REST APIs': Workflow,
  MySQL: Database,
  MongoDB: Database,
  'Java JDBC': Layers,
  'Schema Design': Workflow,
  'Artificial Intelligence': BrainCircuit,
  'NLP & Voice': Sparkles,
  'GIS Modeling': Cpu,
  'Data Structures': Binary,
  Git: GitBranch,
  GitHub: GitBranch,
  Vite: Zap,
  Linux: TerminalSquare,
  'VS Code': Terminal,
};

export default function TechStack() {
  return (
    <section id="stack" className="relative py-32 md:py-40 border-t border-[rgba(255,20,147,0.20)] overflow-hidden w-full">
      {/* Subtle Pink Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-radial from-[#FF1493]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#FF1493]" />
            <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
              // Technologies
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Technical Arsenal<span className="text-[#FF1493]">.</span>
          </h2>
          <p className="text-[#B3B3B3] text-base mt-2">
            Languages, frameworks, and engineering tools leveraged for production systems.
          </p>
        </div>

        {/* Categories with Charcoal Cards & Thin Pink Borders */}
        <div className="space-y-12">
          {skillsList.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF1493] shadow-[0_0_6px_#FF1493]" />
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF69B4]">
                  {group.category}
                </h3>
              </div>

              {/* Grid of Skill Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.items.map((skill) => {
                  const Icon = skillIcons[skill] || Code2;
                  return (
                    <div
                      key={skill}
                      className="group p-5 rounded-2xl bg-[#111111] border border-[rgba(255,20,147,0.20)] hover:border-[#FF1493] hover:shadow-[0_0_20px_rgba(255,20,147,0.4)] hover:scale-[1.03] transition-all duration-300 flex items-center gap-3.5 cursor-default"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#050505] border border-[rgba(255,20,147,0.25)] flex items-center justify-center text-[#FF1493] group-hover:text-white group-hover:bg-[#FF1493] group-hover:shadow-[0_0_12px_#FF1493] transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-display font-medium text-white group-hover:text-[#FF69B4] transition-colors">
                        {skill}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
