import React from 'react';
import { motion } from 'framer-motion';
import { skillsList } from '../data/portfolioData';

export default function TechStack() {
  return (
    <section id="stack" className="relative py-28 md:py-36 border-t border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono text-accent-blue tracking-widest uppercase block mb-3">
            // Technologies
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Technical Stack.
          </h2>
        </div>

        {/* Minimal Typographic Grid */}
        <div className="space-y-8 divide-y divide-white/5">
          {skillsList.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="pt-8 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
            >
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-content-muted uppercase tracking-wider">
                  {group.category}
                </span>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-base sm:text-lg text-content-primary hover:text-accent-blue transition-colors duration-200 cursor-default"
                  >
                    {skill}
                    <span className="text-white/10 ml-4 select-none">/</span>
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
