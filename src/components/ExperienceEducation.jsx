import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, CheckCircle2 } from 'lucide-react';
import { educationTimeline } from '../data/portfolioData';

export default function ExperienceEducation() {
  return (
    <section id="journey" className="relative py-28 bg-background overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-accent-blue text-xs uppercase tracking-widest font-mono mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Technical Trajectory</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4"
          >
            The Engineering Journey.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary max-w-xl text-base md:text-lg"
          >
            Educational foundations at Kongu Engineering College coupled with dedicated self-driven research in intelligent computing and systems development.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical central continuous line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-0.5 bg-gradient-to-b from-accent-blue via-accent-violet to-accent-blue/20 -translate-x-1/2" />

          <div className="space-y-12">
            {educationTimeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Central Node Marker */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-accent-blue flex items-center justify-center z-10 shadow-glow-blue">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-blue animate-pulse" />
                  </div>

                  {/* Spacer for symmetrical side */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Content Card */}
                  <div
                    className={`pl-12 sm:pl-0 sm:w-1/2 ${
                      isEven ? 'sm:pr-12' : 'sm:pl-12'
                    } w-full`}
                  >
                    <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/5 hover:border-accent-blue/30 transition-all duration-300 group">
                      
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-mono font-medium">
                          <Calendar className="w-3 h-3" />
                          <span>{item.year}</span>
                        </span>
                        
                        <span className="text-xs font-mono text-content-muted flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-accent-violet" />
                          <span>{item.location}</span>
                        </span>
                      </div>

                      {/* Title & Institution */}
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-accent-blue transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm font-semibold text-content-primary mt-1">
                        {item.institution}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-content-secondary mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Highlight Tag */}
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                        <Award className="w-4 h-4 text-accent-blue shrink-0" />
                        <span className="text-xs font-mono text-accent-blue">
                          {item.highlight}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
