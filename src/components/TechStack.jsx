import React from 'react';
import { motion } from 'framer-motion';

const techGroups = [
  {
    category: 'LANGUAGES',
    number: '01',
    skills: ['Java', 'Python', 'JavaScript', 'C / C++', 'SQL'],
  },
  {
    category: 'WEB & MOBILE',
    number: '02',
    skills: ['React', 'Node.js', 'Tailwind CSS', 'Flutter', 'REST APIs'],
  },
  {
    category: 'DATABASES',
    number: '03',
    skills: ['MySQL', 'MongoDB', 'Java JDBC', 'Schema Design'],
  },
  {
    category: 'AI & COMPUTING',
    number: '04',
    skills: ['Artificial Intelligence', 'NLP & Voice', 'GIS Modeling', 'Data Structures'],
  },
  {
    category: 'TOOLING',
    number: '05',
    skills: ['Git', 'GitHub', 'Docker', 'Blender', 'Postman', 'Figma', 'Vite', 'VS Code'],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative py-28 md:py-40 border-t border-white/10 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-16 md:mb-24">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
            <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
              // Technical Arsenal
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
            STACK & DISCIPLINES<span className="text-[#FF1493]">.</span>
          </h2>
        </div>

        {/* Aesthetic Typographic Index with Hairline Dividers (No Heavy Cards) */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {techGroups.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="py-8 md:py-12 flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 group hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-colors"
            >
              {/* Category Label */}
              <div className="lg:w-3/12 flex items-baseline gap-3 shrink-0">
                <span className="font-mono text-xs text-[#FF1493] font-semibold">
                  {group.number}
                </span>
                <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
                  —
                </span>
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                  {group.category}
                </h3>
              </div>

              {/* Minimal Aesthetic Typography Flow */}
              <div className="lg:w-9/12 flex flex-wrap items-baseline gap-x-5 sm:gap-x-8 gap-y-3">
                {group.skills.map((skill, sIdx) => (
                  <React.Fragment key={skill}>
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white/60 hover:text-white hover:text-[#FF1493] transition-all duration-200 cursor-default select-none">
                      {skill}
                    </span>
                    {sIdx < group.skills.length - 1 && (
                      <span className="text-sm font-mono text-white/20 select-none">
                        /
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}