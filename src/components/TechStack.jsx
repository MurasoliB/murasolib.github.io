import React from 'react';
import { motion } from 'framer-motion';

const techCategories = [
  {
    number: '01',
    label: 'LANGUAGES',
    items: ['Java', 'Python', 'JavaScript', 'C / C++', 'SQL'],
  },
  {
    number: '02',
    label: 'WEB & MOBILE',
    items: ['React', 'Node.js', 'Tailwind CSS', 'Flutter', 'REST APIs'],
  },
  {
    number: '03',
    label: 'DATABASES',
    items: ['MySQL', 'MongoDB', 'Java JDBC', 'Schema Design'],
  },
  {
    number: '04',
    label: 'AI & COMPUTING',
    items: ['Artificial Intelligence', 'NLP & Voice', 'GIS Modeling', 'Data Structures'],
  },
  {
    number: '05',
    label: 'TOOLING & DEV',
    items: ['Git', 'GitHub', 'Vite', 'Linux', 'VS Code'],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative py-28 md:py-40 border-t border-[rgba(255,255,255,0.12)] overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-16 md:mb-24">
          <span className="font-mono text-xs text-[#FF1493] font-semibold tracking-wider">
            02.
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#666666]">
            // Arsenal
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-[#F5F5F5] ml-auto">
            TECHNOLOGY INDEX<span className="text-[#FF1493]">.</span>
          </h2>
        </div>

        {/* Sophisticated Typographic Index */}
        <div className="border-t border-[rgba(255,255,255,0.12)]">
          {techCategories.map((cat, idx) => (
            <motion.div
              key={cat.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group py-8 md:py-12 border-b border-[rgba(255,255,255,0.12)] flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 transition-colors hover:bg-[#0A0A0A]/50 -mx-4 px-4 rounded-lg"
            >
              {/* Category Identifier */}
              <div className="lg:w-3/12 flex items-baseline gap-3 shrink-0">
                <span className="font-mono text-xs text-[#FF1493] font-semibold tracking-wider">
                  {cat.number}
                </span>
                <span className="font-mono text-xs text-[#666666] tracking-widest uppercase">
                  —
                </span>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#F5F5F5] font-medium">
                  {cat.label}
                </h3>
              </div>

              {/* Large Typographic Technology Names */}
              <div className="lg:w-9/12 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-3">
                {cat.items.map((tech, techIdx) => (
                  <React.Fragment key={tech}>
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium text-[#999999] hover:text-[#F5F5F5] hover:text-white transition-colors duration-200 cursor-default select-none">
                      {tech}
                    </span>
                    {techIdx < cat.items.length - 1 && (
                      <span className="text-sm font-mono text-[#444444] select-none">
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
