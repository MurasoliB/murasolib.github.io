import React from 'react';
import { motion } from 'framer-motion';
import { journeyTimeline } from '../data/portfolioData';

export default function ExperienceEducation() {
  return (
    <section id="journey" className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono text-accent-blue tracking-widest uppercase block mb-3">
            // Milestones
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Academic & Engineering Path.
          </h2>
        </div>

        {/* Wide Timeline Rows */}
        <div className="space-y-12 divide-y divide-white/5">
          {journeyTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="pt-12 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
            >
              <div className="md:col-span-2">
                <span className="text-xs font-mono text-accent-blue tracking-wider uppercase">
                  {item.period}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                  {item.role}
                </h3>
                <p className="text-xs font-mono text-content-muted mt-1">
                  {item.organization}
                </p>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
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
