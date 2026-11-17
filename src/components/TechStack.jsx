import React from 'react';
import { motion } from 'framer-motion';
import { skillsList } from '../data/portfolioData';

export default function TechStack() {
  return (
    <section id="stack" className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono text-accent-blue tracking-widest uppercase block mb-3">
            // Technologies
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Technical Stack.
          </h2>
        </div>

        {/* Full-Width Typographic Grid */}
        <div className="space-y-10 divide-y divide-white/5">
          {skillsList.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="pt-10 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
            >
              <div className="md:col-span-3">
                <span className="text-sm font-mono text-content-muted uppercase tracking-wider">
                  {group.category}
                </span>
              </div>
              <div className="md:col-span-9 flex flex-wrap gap-x-6 gap-y-3">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-lg sm:text-xl md:text-2xl font-display text-content-primary hover:text-accent-blue transition-colors duration-200 cursor-default"
                  >
                    {skill}
                    <span className="text-white/10 ml-6 select-none">/</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
