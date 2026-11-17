import React from 'react';
import { motion } from 'framer-motion';
import { journeyTimeline } from '../data/portfolioData';

export default function ExperienceEducation() {
  return (
    <section id="journey" className="relative py-28 md:py-36 border-t border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono text-accent-blue tracking-widest uppercase block mb-3">
            // Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Academic & Engineering Path.
          </h2>
        </div>

        {/* Minimal Timeline Rows */}
        <div className="space-y-12">
          {journeyTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-8 border-b border-white/5 last:border-b-0"
            >
              <div className="md:col-span-3">
                <span className="text-xs font-mono text-accent-blue tracking-wider uppercase">
                  {item.period}
                </span>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-lg sm:text-xl font-display font-semibold text-white">
                  {item.role}
                </h3>
                <p className="text-xs font-mono text-content-muted mt-0.5 mb-3">
                  {item.organization}
                </p>
                <p className="text-sm text-content-secondary leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
